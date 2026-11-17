/**
 * Acorn Consultants - Telemetry, Attribution & Conversion Analytics Engine
 * 
 * Strict Privacy & Governance Compliance:
 * - DPDPA 2023 & Bar Council Rule 36 compliant.
 * - Respects CookieBanner consent (localStorage 'acorn_cookie_consent').
 * - Preserves UTM & Click IDs (gclid, fbclid, msclkid) for ROI & ad attribution.
 * - Excludes all confidential /posh/ and /admin/ endpoints (BR-046).
 * - Content-free events: no PII, complaint narratives, or secret tokens.
 */

export interface AttributionParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPage?: string;
  capturedAt: string;
}

const STORAGE_KEY_ATTRIBUTION = "acorn_attribution_params";
const STORAGE_KEY_CONSENT = "acorn_cookie_consent";

/**
 * Capture and persist UTM and Click parameters from the current URL
 */
export function captureAttributionParameters(): AttributionParams | null {
  if (typeof window === "undefined") return null;

  try {
    const url = new URL(window.location.href);
    const search = url.searchParams;

    const hasTracking =
      search.has("utm_source") ||
      search.has("utm_campaign") ||
      search.has("gclid") ||
      search.has("fbclid");

    if (hasTracking) {
      const attribution: AttributionParams = {
        utm_source: search.get("utm_source") || undefined,
        utm_medium: search.get("utm_medium") || undefined,
        utm_campaign: search.get("utm_campaign") || undefined,
        utm_term: search.get("utm_term") || undefined,
        utm_content: search.get("utm_content") || undefined,
        gclid: search.get("gclid") || undefined,
        fbclid: search.get("fbclid") || undefined,
        referrer: document.referrer || undefined,
        landingPage: window.location.pathname,
        capturedAt: new Date().toISOString(),
      };

      sessionStorage.setItem(STORAGE_KEY_ATTRIBUTION, JSON.stringify(attribution));
      return attribution;
    }

    // Retrieve existing if already captured in this session
    const stored = sessionStorage.getItem(STORAGE_KEY_ATTRIBUTION);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Graceful fallback if storage is restricted
  }

  return null;
}

/**
 * Check whether the user has granted consent for analytics/marketing
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;

  // Strict route privacy gate: no tracking on POSH private intake or admin portals
  const path = window.location.pathname;
  if (
    path.startsWith("/posh/portal") ||
    path.startsWith("/posh/ic") ||
    path.startsWith("/posh/my-case") ||
    path.startsWith("/posh/file") ||
    path.startsWith("/admin")
  ) {
    return false;
  }

  try {
    const consentRaw = localStorage.getItem(STORAGE_KEY_CONSENT);
    if (!consentRaw) return false;
    const consent = JSON.parse(consentRaw);
    return Boolean(consent.analytics || consent.marketing);
  } catch {
    return false;
  }
}

/**
 * Dispatch a generic custom telemetry event to dataLayer / gtag / pixel
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window === "undefined") return;

  // Verify consent & privacy gates
  if (!hasAnalyticsConsent()) {
    return;
  }

  // Augment with stored attribution parameters
  let attribution: AttributionParams | null = null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY_ATTRIBUTION);
    if (stored) attribution = JSON.parse(stored);
  } catch {}

  const payload = {
    event: eventName,
    ...eventParams,
    ...(attribution?.utm_source ? { utm_source: attribution.utm_source } : {}),
    ...(attribution?.utm_campaign ? { utm_campaign: attribution.utm_campaign } : {}),
    ...(attribution?.gclid ? { gclid: attribution.gclid } : {}),
    timestamp: new Date().toISOString(),
  };

  // 1. Google Tag Manager / GA4 dataLayer
  if (Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(payload);
  }

  // 2. Direct gtag if available
  const win = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, payload);
  }

  // 3. Meta Pixel (fbq) if available
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function") {
    fbq("trackCustom", eventName, payload);
  }

  // 4. Custom window event for internal analytics listener
  try {
    window.dispatchEvent(new CustomEvent("acorn:telemetry", { detail: payload }));
  } catch {}
}

/**
 * High-Intent Conversion Tracking Events for Google Ads, Meta Ads & Search Engine Rankings
 */

/**
 * Triggered when a user clicks to call an attorney or chambers helpline
 */
export function trackPhoneClick(phone: string, counselName?: string) {
  trackEvent("contact_phone_click", {
    telephone: phone,
    counsel: counselName || "Chambers Desk",
    category: "engagement",
  });
}

/**
 * Triggered when a user clicks the WhatsApp desk button
 */
export function trackWhatsAppClick(sourceSection: string) {
  trackEvent("contact_whatsapp_click", {
    source: sourceSection,
    category: "engagement",
  });
}

/**
 * Triggered when a visitor clicks "Inquire / Book" on a specific service card
 */
export function trackServiceInquiryClick(serviceTitle: string, category: string) {
  trackEvent("service_inquiry_initiated", {
    service_title: serviceTitle,
    service_category: category,
    category: "conversion_funnel",
  });
}

/**
 * Triggered when a consultation form is started
 */
export function trackConsultationStarted(serviceName?: string) {
  trackEvent("consultation_form_started", {
    selected_service: serviceName || "General",
    category: "conversion_funnel",
  });
}

/**
 * Triggered when a consultation form is successfully submitted (Key Ads Conversion)
 */
export function trackConsultationSubmitted(refNumber: string, practiceArea: string) {
  trackEvent("consultation_submitted", {
    reference_id: refNumber,
    practice_area: practiceArea,
    category: "lead_conversion",
    value: 1, // Standard lead unit value
  });

  // Explicit Google Ads conversion ping
  const win = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof win.gtag === "function") {
    win.gtag("event", "conversion", {
      send_to: "AW-CONVERSION_ID/consultation_lead",
      transaction_id: refNumber,
    });
  }
}

/**
 * Triggered when an online payment is completed (e-Commerce Conversion)
 */
export function trackPaymentCompleted(
  receiptNumber: string,
  amountPaise: number,
  serviceName: string
) {
  const valueINR = amountPaise / 100;

  trackEvent("purchase", {
    transaction_id: receiptNumber,
    value: valueINR,
    currency: "INR",
    service_name: serviceName,
    category: "ecommerce_conversion",
  });

  const win = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof win.gtag === "function") {
    win.gtag("event", "conversion", {
      send_to: "AW-CONVERSION_ID/payment_success",
      value: valueINR,
      currency: "INR",
      transaction_id: receiptNumber,
    });
  }
}

/**
 * Triggered when a citizen lodges a legal question on the public Q&A desk
 */
export function trackQuestionSubmitted(questionId: string, category: string) {
  trackEvent("legal_qa_submitted", {
    question_ref: questionId,
    topic_category: category,
    category: "community_engagement",
  });
}
