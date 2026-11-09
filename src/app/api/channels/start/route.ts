import { NextRequest, NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

// ============================================================================
// OMNICHANNEL INTAKE ENDPOINT (PRD v3.0 US-268)
// Zero-Narrative Template Initiation via SMS, WhatsApp & IVR Missed Call
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { channel, phoneNumber, preferredLanguage = "EN", requestType = "COUNSELLOR_CALLBACK", narrative } = body;

    // Strict privacy rule: Reject any narrative content via external messaging channels
    if (narrative && String(narrative).trim().length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "PRD v3.0 US-268 Zero-Narrative Gate: Factual case narrative cannot be transmitted via unencrypted third-party messaging channels. Please request a secure one-time link or counsellor callback.",
        },
        { status: 400 }
      );
    }

    if (!phoneNumber || !channel) {
      return NextResponse.json(
        { success: false, error: "Missing mandatory channel or phoneNumber parameter" },
        { status: 400 }
      );
    }

    // Mask phone number for logging (never store or return raw PII)
    const cleanPhone = String(phoneNumber).replace(/\s+/g, "");
    const maskedPhone =
      cleanPhone.length > 6
        ? `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 7)}••••${cleanPhone.slice(-2)}`
        : "+91 ••••••••••";

    const sessionToken = `tok_omni_${Math.random().toString(36).substring(2, 10)}${Date.now().toString().slice(-4)}`;

    if (requestType === "COUNSELLOR_CALLBACK") {
      // Create intake ticket in store
      platformStore.addAssistedIntake({
        counsellorName: "Intake Triage Desk (Trained Counsel)",
        callerChannel: channel === "WHATSAPP" ? "PHONE" : channel === "SMS" ? "PHONE" : "PHONE",
        callerPhoneMasked: maskedPhone,
        callerPreferredChannel: channel === "WHATSAPP" ? "WHATSAPP" : "EMAIL",
        incidentSummary: "Caller initiated statutory request via omnichannel gateway. Awaiting confidential intake interview.",
        readBackConfirmed: false,
        status: "PENDING_IC_ALLOCATION",
      });
    }

    platformStore.addAuditLog(
      "OMNICHANNEL_GATEWAY",
      "posh_admin",
      "OMNICHANNEL_INTAKE_INITIATED",
      "system",
      sessionToken,
      `Initiated ${channel} intake dispatch for masked recipient ${maskedPhone}. Zero narrative transmitted.`
    );

    // Counsel-approved neutral statutory confirmation messages (No alarming language)
    const templateResponses: Record<string, string> = {
      EN: "Acorn Legal Assistance: Your request has been acknowledged. A confidential counsellor will reach out via your chosen safe channel within 2 hours.",
      BN: "একর্ন লিগ্যাল সহায়তা: আপনার অনুরোধ নথিবদ্ধ হয়েছে। আগামী ২ ঘণ্টার মধ্যে একজন পরামর্শদাতা আপনার সাথে যোগাযোগ করবেন।",
      HI: "एकोर्न लीगल सहायता: आपका अनुरोध दर्ज कर लिया गया है। अगले 2 घंटे के भीतर एक गोपनीय परामर्शदाता आपसे संपर्क करेंगे।",
    };

    return NextResponse.json({
      success: true,
      channel,
      recipientMasked: maskedPhone,
      requestType,
      confirmationMessage: templateResponses[preferredLanguage] || templateResponses.EN,
      secureAccessUrl:
        requestType === "ENCRYPTED_LINK"
          ? `https://acornlegal.in/posh/file?t=${sessionToken}`
          : undefined,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process omnichannel initiation" },
      { status: 500 }
    );
  }
}

