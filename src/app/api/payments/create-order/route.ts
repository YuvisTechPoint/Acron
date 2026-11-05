import { NextRequest, NextResponse } from "next/server";
import { generateReferenceNumber } from "@/lib/utils";

// POST /api/payments/create-order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.amountPaise || body.amountPaise <= 0) {
      return NextResponse.json(
        { error: "Invalid amount: amountPaise must be greater than 0" },
        { status: 400 }
      );
    }

    const orderId = `order_${Math.random().toString(36).substring(2, 14)}`;
    const receiptRef = generateReferenceNumber("RCP");

    return NextResponse.json({
      success: true,
      orderId,
      amountPaise: body.amountPaise,
      currency: "INR",
      receiptRef,
      keyId: "rzp_test_AcornMock2026",
      message: "Razorpay order created successfully."
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

