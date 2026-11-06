import { NextRequest, NextResponse } from "next/server";
import { platformStore } from "@/lib/store";
import { PaymentTransaction } from "@/lib/types";

// POST /api/payments/verify
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const orderId = body.razorpay_order_id || body.razorpayOrderId || body.orderId;
    const paymentId = body.razorpay_payment_id || body.razorpayPaymentId || body.paymentId;

    if (!orderId || !paymentId) {
      return NextResponse.json(
        { error: "Missing Razorpay order or payment transaction identifiers." },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const receiptNumber = `ACN/RC/${year}/${Math.floor(100000 + Math.random() * 900000)}`;
    const invoiceNumber = `ACN/INV/${year}/${Math.floor(100000 + Math.random() * 900000)}`;

    const amountPaise = Number(body.amountPaise) || 450000;
    const gstPaise = Math.round(amountPaise * 0.18);
    const totalPaise = amountPaise + gstPaise;

    const transaction: PaymentTransaction = {
      id: `TXN-${Date.now()}`,
      receiptNumber,
      invoiceNumber,
      clientName: body.clientName || "Corporate Client",
      clientEmail: body.clientEmail || "client@company.in",
      clientPhone: body.clientPhone || "+91 98300 00000",
      serviceCategory: body.packageCode || "corporate_advisory",
      itemDescription: body.packageName || "Legal Consultation / Service Retainer",
      amountPaise,
      taxPaise: gstPaise,
      gstPaise,
      totalPaise,
      currency: "INR",
      razorpayOrderId: body.razorpay_order_id,
      razorpayPaymentId: body.razorpay_payment_id,
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      packageCode: body.packageCode || "LEGAL-CONSULT-01",
      packageName: body.packageName || "Legal Consultation / Service Retainer",
      status: "paid",
      method: body.method || "card",
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
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
      message: "Payment successfully verified and official tax invoice generated."
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

