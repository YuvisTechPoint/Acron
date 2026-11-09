// Programmatic route and link verification crawler
import { spawn } from "child_process";
import fs from "fs";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

let serverProc = null;

async function ensureServerRunning(url) {
  try {
    const res = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(1000) });
    if (res.status === 200) return null;
  } catch {}

  const serverScript = fs.existsSync(".next/standalone/server.js")
    ? [".next/standalone/server.js"]
    : ["node_modules/next/dist/bin/next", "start", "-p", "3000"];

  console.log(`Starting standalone server via node ${serverScript.join(" ")}...`);
  const child = spawn("node", serverScript, {
    stdio: "ignore",
    env: { ...process.env, PORT: "3000" },
  });

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const res = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(500) });
      if (res.status === 200) {
        console.log("Server is ready for verification.\n");
        return child;
      }
    } catch {}
  }
  return child;
}

// List of all 88 primary routes
const ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/advisory",
  "/services/legal-documentation",
  "/services/dispute-resolution",
  "/services/representation",
  "/services/corporate-commercial",
  "/services/posh-compliance",
  "/posh",
  "/posh/start",
  "/posh/file",
  "/posh/file/sign",
  "/posh/file/done",
  "/posh/respondent",
  "/posh/respondent/reply",
  "/posh/respondent/status",
  "/posh/concern",
  "/posh/retaliation",
  "/posh/my-case",
  "/posh/my-case/docs",
  "/posh/my-case/interim",
  "/posh/my-case/request",
  "/posh/my-case/support",
  "/posh/ic",
  "/posh/ic/declarations",
  "/posh/ic/guide",
  "/posh/ic/cases/ACN-POSH-2026-0041",
  "/posh/ic/cases/ACN-POSH-2026-0041/triage",
  "/posh/ic/cases/ACN-POSH-2026-0041/conciliation",
  "/posh/ic/cases/ACN-POSH-2026-0041/notices",
  "/posh/ic/cases/ACN-POSH-2026-0041/hearings",
  "/posh/ic/cases/ACN-POSH-2026-0041/evidence",
  "/posh/ic/cases/ACN-POSH-2026-0041/report",
  "/posh/ic/cases/ACN-POSH-2026-0041/interim",
  "/posh/ic/cases/ACN-POSH-2026-0041/close",
  "/posh/org",
  "/posh/org/ic",
  "/posh/org/policies",
  "/posh/org/notices",
  "/posh/org/training",
  "/posh/org/actions",
  "/posh/org/reports",
  "/posh/org/prevention",
  "/posh/org/plan",
  "/posh/org/support",
  "/posh/portal",
  "/posh/admin",
  "/posh/admin/compliance",
  "/posh/admin/intake",
  "/posh/admin/analytics",
  "/posh/admin/cases",
  "/posh/admin/orgs",
  "/posh/admin/panel",
  "/posh/admin/retention",
  "/posh/admin/aftercare",
  "/posh/admin/breakglass",
  "/blog",
  "/blog/posh-annual-report-district-officer-west-bengal-guide",
  "/blog/remote-work-hybrid-workplace-posh-jurisdiction",
  "/blog/real-estate-title-due-diligence-kolkata-rajarhat-wbrera",
  "/faq",
  "/request-service",
  "/contact",
  "/pay",
  "/pay/status/test-12345",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/cookies",
  "/refund-policy",
  "/design-system",
  "/practice-areas",
  "/qa",
  "/verify",
  "/verify/CERT-ACORN-2026-884",
  "/help",
  "/help/directory",
  "/governance/charters",
  "/governance/pathways",
  "/governance/sectors",
  "/lp/posh-training",
  "/admin",
  "/admin/login",
  "/admin/requests",
  "/admin/requests/req-1",
  "/admin/cases",
  "/admin/payments",
  "/admin/payment-links",
  "/admin/subscriptions",
  "/admin/directory",
  "/admin/catalogue",
  "/admin/kb",
  "/admin/lms/courses",
  "/admin/scripts",
  "/admin/legal/rules",
  "/admin/legal/templates",
  "/admin/legal/watch",
  "/admin/legal/calendars",
  "/admin/ops",
  "/admin/ops/gate",
  "/admin/ops/dr",
  "/admin/ops/sop",
  "/admin/site",
  "/admin/seo",
  "/admin/notifications",
  "/admin/audit",
  "/admin/users",
  "/admin/reports",
  "/admin/surveys",
  "/admin/helpdesk",
  "/admin/media",
  "/admin/pages",
  "/admin/posts",
  "/admin/questions",
  "/admin/faq",
  "/admin/services",
  "/admin/settings",
  "/posh/org/sso",
  "/posh/org/integrations",
  "/admin/ai",
  "/posh/ic/cases/ACN-POSH-2026-0041/ai-assistant",
  "/posh/org/benchmarks",
  "/posh/org/early-warnings",
  "/posh/channels",
  "/posh/anonymous",
  "/posh/ic/cases/ACN-POSH-2026-0041/hearings/vhr-0041-01/room",
  "/posh/signatures",
  "/posh/org/audit-packs",
  "/admin/legal/register",
  "/admin/ops/reliability",
  "/posh/assisted-intake",
  "/posh/org/api-keys",
  "/posh/org/webhooks",
  "/posh/org/branding",
  "/posh/org/surveys",
  "/admin/trust",
  "/sitemap.xml",
  "/robots.txt",
];

async function main() {
  serverProc = await ensureServerRunning(BASE_URL);
  console.log(`Starting crawl of ${ROUTES.length} routes on ${BASE_URL}...\n`);
  let passed = 0;
  let failed = 0;
  const discoveredLinks = new Set();

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    try {
      const res = await fetch(url, { headers: { "User-Agent": "RouteCrawler/1.0" } });
      const html = await res.text();
      const hasCaseNotFound = route.includes("/posh/ic/cases/") && (html.includes("Case not found") || html.includes("Case docket not found"));

      if (res.status === 200 && !hasCaseNotFound) {
        passed++;
        process.stdout.write(`✔ [${res.status}] ${route}\n`);
        
        // Extract internal links from HTML (pages only, skip API, static assets, streams)
        const matches = html.matchAll(/href="(\/[a-zA-Z0-9_\-\/#]*)"/g);
        for (const match of matches) {
          const href = match[1].split("#")[0]; // remove hash anchor
          if (
            href &&
            href !== "" &&
            !href.startsWith("/_next") &&
            !href.startsWith("/api") &&
            !href.includes("stream") &&
            !href.endsWith(".png") &&
            !href.endsWith(".jpg") &&
            !href.endsWith(".svg") &&
            !href.endsWith(".ico")
          ) {
            discoveredLinks.add(href);
          }
        }
      } else {
        failed++;
        if (hasCaseNotFound) {
          console.error(`✖ [DEFECT] ${route}: Page rendered empty 'Case not found' error!`);
        } else {
          console.error(`✖ [${res.status}] ${route}`);
        }
      }
    } catch (err) {
      failed++;
      console.error(`✖ [ERROR] ${route}: ${err.message}`);
    }
  }

  console.log(`\nCrawl complete: ${passed} passed, ${failed} failed out of ${ROUTES.length} target routes.`);

  console.log(`\nVerifying ${discoveredLinks.size} discovered internal links...`);
  let linkPassed = 0;
  let linkFailed = 0;

  for (const link of discoveredLinks) {
    try {
      const res = await fetch(`${BASE_URL}${link}`, {
        method: "GET",
        headers: { "User-Agent": "RouteCrawler/1.0" },
        signal: AbortSignal.timeout(5000),
      });
      if (res.status === 200 || res.status === 304 || res.status === 307 || res.status === 308) {
        linkPassed++;
      } else {
        linkFailed++;
        console.error(`✖ Broken internal link: ${link} returned HTTP ${res.status}`);
      }
    } catch (err) {
      linkFailed++;
      console.error(`✖ Failed to reach internal link: ${link} (${err.message})`);
    }
  }

  console.log(`\nInternal link verification: ${linkPassed} valid, ${linkFailed} broken.`);

  if (serverProc) {
    serverProc.kill();
  }

  if (failed > 0 || linkFailed > 0) {
    console.error("\nVerification FAILED.");
    process.exit(1);
  } else {
    console.log("\nAll routes and internal links are 100% operational!");
    process.exit(0);
  }
}

main();

