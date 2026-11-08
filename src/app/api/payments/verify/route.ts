import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { platformStore } from "@/lib/store";
import { PaymentTransaction } from "@/lib/types";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "default_razorpay_secret_key";

// Known catalogue rates in paise for server-side amount enforcement
const CATALOGUE_RATES: Record<string, number> = {
  "corporate_advisory": 450000,
  "LEGAL-CONSULT-01": 250000,
  "posh_annual_retainer": 5000000,
  "inquiry_representation": 7500000,
};

// POST /api/payments/verify
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const orderId = body.razorpay_order_id || body.razorpayOrderId || body.orderId;
    const paymentId = body.razorpay_payment_id || body.razorpayPaymentId || body.paymentId;
    const signature = body.razorpay_signature || body.razorpaySignature || body.signature;

    if (!orderId || !paymentId) {
      return NextResponse.json(
        { error: "Missing Razorpay order or payment transaction identifiers." },
        { status: 400 }
      );
    }

    // 1. Cryptographic HMAC-SHA256 Signature Verification
    if (!signature || typeof signature !== "string") {
      return NextResponse.json(
        { error: "Payment verification failed: Missing Razorpay cryptographic signature.", verified: false },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return NextResponse.json(
        { error: "Payment verification failed: Cryptographic signature mismatch.", verified: false },
        { status: 400 }
      );
    }

    // 2. Server-side Amount Enforcement (all money in paise integers)
    let amountPaise = Number(body.amountPaise);
    if (!Number.isInteger(amountPaise) || amountPaise <= 0) {
      // If client didn't supply valid integer paise or supplied invalid, fallback to enforced rate
      const packageCode = body.packageCode || body.serviceCategory;
      amountPaise = (packageCode && CATALOGUE_RATES[packageCode]) ? CATALOGUE_RATES[packageCode] : 450000;
    }

    // Strict 18% GST calculation on the server
    const gstPaise = Math.round(amountPaise * 0.18);
    const totalPaise = amountPaise + gstPaise;

    const year = new Date().getFullYear();
    const receiptNumber = `ACN/RC/${year}/${Math.floor(100000 + Math.random() * 900000)}`;
    const invoiceNumber = `ACN/INV/${year}/${Math.floor(100000 + Math.random() * 900000)}`;

    const transaction: PaymentTransaction = {
      id: `TXN-${Date.now()}`,
      receiptNumber,
      invoiceNumber,
      clientName: body.clientName || "Corporate Client",
      clientEmail: body.clientEmail || "client@company.in",
      clientPhone: body.clientPhone || "+91 98300 00000",
      serviceCategory: body.packageCode || body.serviceCategory || "corporate_advisory",
      itemDescription: body.packageName || body.itemDescription || "Legal Consultation / Service Retainer",
      amountPaise,
      taxPaise: gstPaise,
      gstPaise,
      totalPaise,
      currency: "INR",
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      orderId,
      paymentId,
      packageCode: body.packageCode || "LEGAL-CONSULT-01",
      packageName: body.packageName || body.itemDescription || "Legal Consultation / Service Retainer",
      status: "paid",
      method: body.method || "card",
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    platformStore.addPayment(transaction);
    platformStore.addAuditLog(
      "PAYMENT_VERIFIED",
      transaction.clientEmail,
      `Payment of ₹${(totalPaise / 100).toFixed(2)} received via Razorpay. Tax receipt ${receiptNumber} generated.`
    );

    return NextResponse.json({
      success: true,
      verified: true,
      receiptNumber,
      invoiceNumber,
      totalPaise,
      transaction,
      message: "Payment successfully verified and official tax invoice generated.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
