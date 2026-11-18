// Programmatic route and link verification crawler
import { spawn } from "child_process";
import fs from "fs";
import crypto from "crypto";

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SESSION_SECRET ||
  "acorn-legal-consultants-session-hmac-sha256-key-2026-kolkata-chambers";

function generateAdminToken() {
  const now = Date.now();
  const sessionId = crypto.randomBytes(12).toString("hex");
  const payload = {
    email: "admin@acornlegal.in",
    name: "Adv. Subhasish Mukherjee",
    role: "super_admin",
    chamber: "Kolkata Chambers",
    sessionId,
    createdAt: now,
    expiresAt: now + 86400 * 1000,
  };
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sigHex = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(b64Payload)
    .digest("hex");
  return `acorn_sess_${b64Payload}.${sigHex}`;
}

const TEST_PORT = process.env.PORT || "3005";
let BASE_URL = process.env.TEST_BASE_URL || `http://localhost:${TEST_PORT}`;

let serverProc = null;

async function ensureServerRunning(url) {
  if (process.env.TEST_BASE_URL) {
    try {
      const res = await fetch(`${process.env.TEST_BASE_URL}/api/health`, { signal: AbortSignal.timeout(3000) });
      if (res.status === 200) {
        BASE_URL = process.env.TEST_BASE_URL;
        return null;
      }
    } catch {}
  }

  // Check if live server is already active on port 3000 or 3001 (with retries)
  for (let attempt = 0; attempt < 4; attempt++) {
    for (const host of ["127.0.0.1", "localhost"]) {
      for (const port of ["3000", "3001"]) {
        try {
          const res = await fetch(`http://${host}:${port}/api/health`, { signal: AbortSignal.timeout(4000) });
          if (res.status === 200) {
            BASE_URL = `http://${host}:${port}`;
            return null;
          }
        } catch {}
      }
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, 800));
  }

  try {
    const res = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(3000) });
    if (res.status === 200) return null;
  } catch {}

  const serverScript = fs.existsSync(".next/standalone/server.js")
    ? [".next/standalone/server.js"]
    : ["node_modules/next/dist/bin/next", "start", "-p", TEST_PORT];

  console.log(`Starting Acorn production server on port ${TEST_PORT}...`);
  const child = spawn("node", serverScript, {
    stdio: "ignore",
    env: { ...process.env, PORT: TEST_PORT },
  });

  for (let i = 0; i < 50; i++) {
    await new Promise((r) => setTimeout(r, 400));
    try {
      const res = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(800) });
      if (res.status === 200) {
        console.log(`Acorn server is ready on port ${TEST_PORT} for verification.\n`);
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
  "/services/check-bounce",
  "/services/advisory",
  "/services/legal-documentation",
  "/services/dispute-resolution",
  "/services/representation",
  "/services/corporate-commercial",
  "/services/posh-compliance",
  "/services/real-estate-property",
  "/services/employment-labour",
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
  "/admin/delivery",
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
  const testAdminToken = generateAdminToken();
  const authHeaders = {
    Cookie: `acorn_admin_session=${testAdminToken}; acorn_posh_session=${testAdminToken}; acorn_session=${testAdminToken}`,
    Authorization: `Bearer ${testAdminToken}`,
  };

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    try {
      const res = await fetch(url, { headers: authHeaders });
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
    let success = false;
    let lastErr = null;
    let status = 0;

    for (let attempt = 1; attempt <= 2 && !success; attempt++) {
      try {
        const res = await fetch(`${BASE_URL}${link}`, {
          method: "GET",
          headers: authHeaders,
          signal: AbortSignal.timeout(30000),
        });
        status = res.status;
        if (res.status === 200 || res.status === 304 || res.status === 307 || res.status === 308) {
          success = true;
          linkPassed++;
          process.stdout.write(`✔ [LINK ${res.status}] ${link}\n`);
        }
      } catch (err) {
        lastErr = err;
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
    }

    if (!success) {
      linkFailed++;
      if (lastErr) {
        console.error(`✖ Failed to reach internal link: ${link} (${lastErr.message})`);
      } else {
        console.error(`✖ Broken internal link: ${link} returned HTTP ${status}`);
      }
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

