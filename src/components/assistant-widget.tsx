"use client";

import React from "react";
import dynamic from "next/dynamic";

const LegalGuidanceAssistant = dynamic(
  () => import("./legal-guidance-assistant").then((mod) => mod.LegalGuidanceAssistant),
  { ssr: false }
);

/**
 * Public Statutory Guidance Assistant
 * Complies with strict statutory safety rules:
 * - Informational only (Bar Council Rule 36 compliant)
 * - Zero personal legal advice
 * - Zero storage of user factual narratives
 * - Red-team narrative detection with safe redirect to confidential intake
 */
export function AssistantWidget() {
  return <LegalGuidanceAssistant />;
}
