import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { platformStore } from "@/lib/store";

const RAZORPAY_WEBHOOK_SECRET =
  process.env.RAZORPAY_WEBHOOK_SECRET ||
  process.env.RAZORPAY_KEY_SECRET ||
  "default_razorpay_webhook_secret";

// In-memory set for webhook deduplication / idempotency
const processedEvents = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    // 1. Signature Verification
    if (!signature || typeof signature !== "string") {
      return NextResponse.json(
        { error: "Missing Razorpay webhook signature header" },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const eventId = payload.event_id || payload.id || `evt_${Date.now()}`;
    const eventType = payload.event;

    // 2. Idempotency Check
    if (processedEvents.has(eventId)) {
      return NextResponse.json({
        received: true,
        idempotentDuplicate: true,
        eventId,
      });
    }
    processedEvents.add(eventId);

    // 3. Process Payment Events
    if (eventType === "payment.captured" || eventType === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id || payload.payload?.order?.entity?.id;
      const paymentId = paymentEntity?.id;
      const amountPaise = paymentEntity?.amount || 0;

      if (paymentId) {
        const payments = platformStore.getPayments();
        const existing = payments.find(
          (p) => p.paymentId === paymentId || p.razorpayPaymentId === paymentId
        );

        if (existing) {
          existing.status = "paid";
          existing.paidAt = new Date().toISOString();
        }

        // Audit log with SHA-256 HMAC chaining
        platformStore.addAuditLog(
          "WEBHOOK_PAYMENT_CAPTURED",
          "Razorpay_Webhook",
          `Payment ${paymentId} captured for Order ${orderId || "N/A"}. Amount: ₹${(amountPaise / 100).toFixed(2)}.`
        );
      }
    } else if (eventType === "payment.failed") {
      const paymentEntity = payload.payload?.payment?.entity;
      const paymentId = paymentEntity?.id;
      platformStore.addAuditLog(
        "WEBHOOK_PAYMENT_FAILED",
        "Razorpay_Webhook",
        `Payment attempt ${paymentId || "N/A"} failed via gateway webhook.`
      );
    }

    return NextResponse.json({
      received: true,
      event: eventType,
      eventId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
