import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function POST(
  req: Request,
  { params }: { params: { feature: string } }
) {
  try {
    const { feature } = params;
    const body = await req.json();

    // Check Kill Switch
    const features = platformStore.getAIFeatures();
    const matched = features.find((f) => f.featureKey === feature);

    if (matched?.killSwitchActive) {
      return NextResponse.json(
        { error: `AI Feature '${matched.name}' has been disabled by Administrative Kill Switch.` },
        { status: 503 }
      );
    }

    // Party Consent Gate
    if (matched?.partyConsentRequired && !body.partyConsentConfirmed) {
      return NextResponse.json(
        { error: "BR-075 Violation: Party written opt-in required before executing case AI assist." },
        { status: 403 }
      );
    }

    // Process feature
    if (feature === "timeline_synthesizer") {
      return NextResponse.json({
        success: true,
        feature: matched?.name,
        result: [
          { date: "12 Aug 2026", event: "Project sprint kickoff meeting in 3rd Floor conference hall." },
          { date: "18 Aug 2026", event: "Late-night Slack direct message exchange cited in statement." },
          { date: "24 Aug 2026", event: "Managerial 1-on-1 performance discussion." },
          { date: "01 Sept 2026", event: "Formal grievance submitted to Internal Committee." },
        ],
        verificationNotice: "Synthesized neutrally without credibility assessment per BR-078.",
      });
    }

    if (feature === "natural_justice_checklist_verifier") {
      return NextResponse.json({
        success: true,
        feature: matched?.name,
        checks: [
          { rule: "7-Day Advance Notice of Oral Hearing", status: "PASS", detail: "Notice issued 10 days prior." },
          { rule: "Documentary Evidence Disclosure to Respondent", status: "PASS", detail: "Exhibits shared via masked portal." },
          { rule: "Cross-Examination Opportunity Recorded", status: "PENDING", detail: "Hearing #2 scheduled for witness review." },
          { rule: "Quorum Compliance (>= 3 members, >= 50% women)", status: "PASS", detail: "3 members confirmed, PO present." },
        ],
      });
    }

    return NextResponse.json({
      success: true,
      feature: matched?.name || feature,
      message: "AI analysis completed within Acorn zero-egress environment.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "AI gateway processing failure" }, { status: 500 });
  }
}

