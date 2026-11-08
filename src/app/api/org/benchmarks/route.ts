import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const segment = searchParams.get("segment") || undefined;
  
  const allBenchmarks = platformStore.getPeerBenchmarks();
  
  // Enforce BR-090: Benchmarks displayed only for peer groups of >= 10 orgs
  const compliantBenchmarks = allBenchmarks.map((bm) => {
    if (bm.orgCount < 10) {
      return {
        ...bm,
        medianResolutionDays: null,
        conciliationRatePct: null,
        annualTrainingPct: null,
        retaliationIndex: null,
        suppressionNotice: "BR-090 Suppression: Cohort has fewer than 10 organizations.",
      };
    }
    return bm;
  });

  return NextResponse.json({
    success: true,
    benchmarks: compliantBenchmarks,
    rule: "BR-090 Quartile Privacy Guarantee Active",
  });
}

