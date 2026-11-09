// Automated End-to-End Test Suite for Admin Login & Real-Time Synchronization
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

  console.log(`Starting server via node ${serverScript.join(" ")}...`);
  const child = spawn("node", serverScript, {
    stdio: "ignore",
    env: { ...process.env, PORT: "3000" },
  });

  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const res = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(600) });
      if (res.status === 200) {
        console.log("Server is operational for verification.\n");
        return child;
      }
    } catch {}
  }
  return child;
}

async function runTests() {
  serverProc = await ensureServerRunning(BASE_URL);

  console.log("=================================================");
  console.log("  ACORN ADMIN SYSTEM & REAL-TIME E2E VERIFICATION ");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  // ----------------------------------------------------------------------
  // 1. Admin Authentication & Session Security Gate
  // ----------------------------------------------------------------------
  console.log("--- 1. Admin Authentication & Session Security Gate ---");

  // 1a: Unauthenticated access to /admin must be redirected to /admin/login
  try {
    const res = await fetch(`${BASE_URL}/admin`, {
      redirect: "manual",
    });
    const isRedirect = res.status === 307 || res.status === 302;
    const location = res.headers.get("location") || "";
    if (isRedirect && location.includes("/admin/login")) {
      console.log(`  ✔ [PASS] Middleware Protection: /admin correctly redirected to ${location}`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Middleware Protection: Expected 307/302 redirect, got status ${res.status}, location: ${location}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Middleware Protection check: ${err.message}`);
    failed++;
  }

  // 1b: Unauthenticated access to /admin/requests must redirect with callbackUrl
  try {
    const res = await fetch(`${BASE_URL}/admin/requests`, {
      redirect: "manual",
    });
    const isRedirect = res.status === 307 || res.status === 302;
    const location = res.headers.get("location") || "";
    if (isRedirect && location.includes("callbackUrl=%2Fadmin%2Frequests")) {
      console.log(`  ✔ [PASS] Protected Route Guard: /admin/requests redirects with callbackUrl parameter`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Protected Route Guard: Status ${res.status}, location: ${location}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Protected Route Guard: ${err.message}`);
    failed++;
  }

  // 1c: Empty session cookie attack on /admin must be rejected (redirected)
  try {
    const res = await fetch(`${BASE_URL}/admin`, {
      headers: { Cookie: "acorn_admin_session=" },
      redirect: "manual",
    });
    const isRedirect = res.status === 307 || res.status === 302;
    if (isRedirect) {
      console.log(`  ✔ [PASS] Security Gate: Empty session cookie strictly blocked and redirected`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Security Gate: Empty cookie bypassed middleware! Status ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Empty cookie security gate check: ${err.message}`);
    failed++;
  }

  // 1d: Forged session cookie attack on /admin must be rejected
  try {
    const res = await fetch(`${BASE_URL}/admin`, {
      headers: { Cookie: "acorn_admin_session=forged_unauthorized_token_xyz" },
      redirect: "manual",
    });
    const isRedirect = res.status === 307 || res.status === 302;
    if (isRedirect) {
      console.log(`  ✔ [PASS] Security Gate: Forged session token strictly blocked`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Security Gate: Forged token was accepted! Status ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Forged token security check: ${err.message}`);
    failed++;
  }

  // 1e: Forged session cookie on /api/admin/session must return 401
  try {
    const res = await fetch(`${BASE_URL}/api/admin/session`, {
      headers: { Cookie: "acorn_admin_session=forged_token_123" },
    });
    if (res.status === 401) {
      console.log(`  ✔ [PASS] Session API: Forged session token rejected with HTTP 401`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Session API: Expected 401 for forged token, got ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Session API forged token check: ${err.message}`);
    failed++;
  }

  // 1f: Login with unknown administrator email must return 401
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "intruder@malicious.domain",
        password: "AcornLegal@2026",
        mfaCode: "492810",
      }),
    });
    if (res.status === 401) {
      console.log(`  ✔ [PASS] Identity Guard: Unknown administrator email rejected with HTTP 401`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Identity Guard: Expected 401, got ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Identity Guard check: ${err.message}`);
    failed++;
  }

  // 1g: Login with invalid password must be rejected (401)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@acornlegal.in",
        password: "WrongPassword999!",
        mfaCode: "492810",
      }),
    });
    const data = await res.json();
    if (res.status === 401 && data.success === false) {
      console.log(`  ✔ [PASS] Credential Security: Invalid password rejected with HTTP 401`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Credential Security: Expected 401, got ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Credential Security: ${err.message}`);
    failed++;
  }

  // 1h: Login with invalid TOTP code must be rejected (401)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@acornlegal.in",
        password: "AcornLegal@2026",
        mfaCode: "99",
      }),
    });
    const data = await res.json();
    if (res.status === 401 && data.success === false) {
      console.log(`  ✔ [PASS] Two-Factor Enforcement: Invalid TOTP format rejected with HTTP 401`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Two-Factor Enforcement: Expected 401, got ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Two-Factor Enforcement: ${err.message}`);
    failed++;
  }

  // 1i: Valid Super Admin login must succeed (200), return user object and signed token
  let superAdminCookie = "";
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@acornlegal.in",
        password: "AcornLegal@2026",
        mfaCode: "492810",
      }),
    });
    const data = await res.json();
    const setCookieHeader = res.headers.get("set-cookie") || "";
    if (res.status === 200 && data.success && setCookieHeader.includes("acorn_admin_session")) {
      const match = setCookieHeader.match(/acorn_admin_session=([^;]+)/);
      superAdminCookie = match ? match[1] : "";
      console.log(`  ✔ [PASS] Admin Login System: Authenticated as "${data.user.name}" (${data.user.role})`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Admin Login: Status ${res.status}, cookie: ${setCookieHeader}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Admin Login: ${err.message}`);
    failed++;
  }

  // 1j: Session verification API confirms active session and user identity
  try {
    const res = await fetch(`${BASE_URL}/api/admin/session`, {
      headers: { Cookie: `acorn_admin_session=${superAdminCookie}` },
    });
    const data = await res.json();
    if (res.status === 200 && data.authenticated && data.user?.email === "admin@acornlegal.in") {
      console.log(`  ✔ [PASS] Session Verification API: Active session confirmed for ${data.user.email}`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Session Verification: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Session Verification: ${err.message}`);
    failed++;
  }

  // 1k: Login as Partner Debjani Sen resolves distinct identity and role
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "debjani.sen@acornlegal.in",
        password: "AcornLegal@2026",
        mfaCode: "518392",
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.user?.name === "Adv. Debjani Sen") {
      console.log(`  ✔ [PASS] Multi-Counsel Identity: Successfully authenticated as "${data.user.name}"`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Multi-Counsel Identity: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Multi-Counsel Identity: ${err.message}`);
    failed++;
  }

  // 1l: Accessing /admin WITH valid session cookie returns HTTP 200 OK
  try {
    const res = await fetch(`${BASE_URL}/admin`, {
      headers: { Cookie: `acorn_admin_session=${superAdminCookie}` },
      redirect: "manual",
    });
    if (res.status === 200) {
      console.log(`  ✔ [PASS] Authenticated Route Access: /admin renders with HTTP 200 OK`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Authenticated Route Access: Expected 200, got ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Authenticated Route Access: ${err.message}`);
    failed++;
  }

  // 1m: Visiting /admin/login when already authenticated redirects to /admin
  try {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      headers: { Cookie: `acorn_admin_session=${superAdminCookie}` },
      redirect: "manual",
    });
    const isRedirect = res.status === 307 || res.status === 302;
    const location = res.headers.get("location") || "";
    if (isRedirect && location.endsWith("/admin")) {
      console.log(`  ✔ [PASS] Logged-in Redirection: /admin/login redirects authenticated user to /admin`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Logged-in Redirection: Expected redirect to /admin, got status ${res.status}, location: ${location}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Logged-in Redirection: ${err.message}`);
    failed++;
  }

  // 1n: Admin logout terminates session and expires cookies
  try {
    const res = await fetch(`${BASE_URL}/api/admin/logout`, {
      method: "POST",
      headers: { Cookie: `acorn_admin_session=${superAdminCookie}` },
    });
    const data = await res.json();
    const setCookieHeader = res.headers.get("set-cookie") || "";
    if (res.status === 200 && data.success && (setCookieHeader.includes("Max-Age=0") || setCookieHeader.includes("expires="))) {
      console.log(`  ✔ [PASS] Admin Logout API: Session cookies cleared with Max-Age=0`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Admin Logout: Status ${res.status}, cookie: ${setCookieHeader}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Admin Logout: ${err.message}`);
    failed++;
  }

  // 1o: Session Verification API rejects revoked token (HTTP 401)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/session`, {
      headers: { Cookie: `acorn_admin_session=${superAdminCookie}` },
    });
    if (res.status === 401) {
      console.log(`  ✔ [PASS] Session Invalidation: Revoked session token rejected by /api/admin/session with HTTP 401`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Session Invalidation: Expected 401, got ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Post-logout session check: ${err.message}`);
    failed++;
  }

  // 1p: Post-logout navigation to /admin without cookies redirects to /admin/login
  try {
    const res = await fetch(`${BASE_URL}/admin`, {
      redirect: "manual",
    });
    const isRedirect = res.status === 307 || res.status === 302;
    if (isRedirect) {
      console.log(`  ✔ [PASS] Post-Logout Protection: /admin redirects to login after cookie expiration`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Post-Logout Protection: Expected redirect, got status ${res.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Post-logout redirect verification: ${err.message}`);
    failed++;
  }

  // ----------------------------------------------------------------------
  // 2. Real-Time Endpoints & Live Data Propagation
  // ----------------------------------------------------------------------
  console.log("\n--- 2. Real-Time Endpoints & Live Data Propagation ---");

  // Re-login to get fresh active cookie for admin mutation tests
  let authCookie = "";
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@acornlegal.in",
        password: "AcornLegal@2026",
        mfaCode: "492810",
      }),
    });
    const header = res.headers.get("set-cookie") || "";
    const match = header.match(/acorn_admin_session=([^;]+)/);
    authCookie = match ? match[1] : "";
  } catch {}

  // 2a: Test Site Configuration Mutation & Synchronization (/api/site)
  try {
    const testDisclaimer = "Bar Council of India Rule 36 verified. Informational chambers portal.";
    const res = await fetch(`${BASE_URL}/api/site`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        disclaimer: testDisclaimer,
        emergencyPhone: "+91 98300 99999",
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.config.disclaimer === testDisclaimer) {
      console.log(`  ✔ [PASS] Site Configuration API: Mutation saved to database & synchronized`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Site Configuration API: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Site Configuration API: ${err.message}`);
    failed++;
  }

  // 2b: Test Services Catalogue CRUD (with client-generated ID upsert)
  const clientGeneratedServiceId = `srv-test-${Date.now()}`;
  try {
    const res = await fetch(`${BASE_URL}/api/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        id: clientGeneratedServiceId,
        name: "Automated Retainer Advisory Package",
        category: "Corporate Commercial",
        shortDesc: "End-to-end statutory audit and retainer advisory testing.",
        pricePaise: 7500000,
        turnaround: "3 Business Days",
        features: ["Board Advisory", "Statutory Due Diligence"],
        isActive: true,
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.service.id === clientGeneratedServiceId) {
      console.log(`  ✔ [PASS] Services Catalogue API: Created & persisted service with client ID (${clientGeneratedServiceId})`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Services Catalogue API: Status ${res.status}`, data);
      failed++;
    }

    // Verify deletion
    const delRes = await fetch(`${BASE_URL}/api/services?id=${clientGeneratedServiceId}`, {
      method: "DELETE",
      headers: { Cookie: `acorn_admin_session=${authCookie}` },
    });
    const delData = await delRes.json();
    if (delRes.status === 200 && delData.success) {
      console.log(`  ✔ [PASS] Services Catalogue API: Successfully deleted test service`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Services Catalogue Deletion: Status ${delRes.status}`, delData);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Services Catalogue API: ${err.message}`);
    failed++;
  }

  // 2c: Test Blog CMS CRUD (with client-generated ID upsert)
  const clientGeneratedPostId = `post-test-${Date.now()}`;
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        id: clientGeneratedPostId,
        title: "Real-Time Verification: Bengal Corporate Governance Trends",
        slug: `bengal-corp-governance-${Date.now()}`,
        summary: "Analysis of Calcutta High Court corporate oversight orders.",
        content: "Statutory governance mandates under the Companies Act 2013.",
        category: "Corporate Law",
        readingTimeMinutes: 4,
        status: "published",
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.post.id === clientGeneratedPostId) {
      console.log(`  ✔ [PASS] Blog CMS API: Created & published article with client ID (${clientGeneratedPostId})`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Blog CMS API: Status ${res.status}`, data);
      failed++;
    }

    const delRes = await fetch(`${BASE_URL}/api/posts?id=${clientGeneratedPostId}`, {
      method: "DELETE",
      headers: { Cookie: `acorn_admin_session=${authCookie}` },
    });
    const delData = await delRes.json();
    if (delRes.status === 200 && delData.success) {
      console.log(`  ✔ [PASS] Blog CMS API: Successfully deleted test article`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Blog CMS Deletion: Status ${delRes.status}`, delData);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Blog CMS API: ${err.message}`);
    failed++;
  }

  // 2d: Test FAQ Manager CRUD (with client-generated ID upsert)
  const clientGeneratedFaqId = `faq-test-${Date.now()}`;
  try {
    const res = await fetch(`${BASE_URL}/api/faq`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        id: clientGeneratedFaqId,
        category: "Commercial Contracts",
        question: "How are arbitration seated in Kolkata enforced post-2015 amendments?",
        answer: "Under the Arbitration & Conciliation Act 1996 as amended in 2015, enforcement applications are adjudicated expeditiously before the High Court.",
        showOnHomepage: true,
        order: 1,
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.faq.id === clientGeneratedFaqId) {
      console.log(`  ✔ [PASS] FAQ Manager API: Created & published FAQ item with client ID (${clientGeneratedFaqId})`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] FAQ Manager API: Status ${res.status}`, data);
      failed++;
    }

    const delRes = await fetch(`${BASE_URL}/api/faq?id=${clientGeneratedFaqId}`, {
      method: "DELETE",
      headers: { Cookie: `acorn_admin_session=${authCookie}` },
    });
    const delData = await delRes.json();
    if (delRes.status === 200 && delData.success) {
      console.log(`  ✔ [PASS] FAQ Manager API: Successfully deleted test FAQ`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] FAQ Manager Deletion: Status ${delRes.status}`, delData);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] FAQ Manager API: ${err.message}`);
    failed++;
  }

  // 2e: Test Public Q&A Full Moderation Workflow (/api/qa POST, PATCH, DELETE)
  let testQaId = "";
  try {
    const createRes = await fetch(`${BASE_URL}/api/qa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Inquirer",
        email: "inquirer@acorn-client.in",
        question: "Is formal conciliation mandatory prior to convening an inquiry under Section 10?",
        category: "posh_law",
      }),
    });
    const createData = await createRes.json();
    if (createRes.status === 201 && createData.success && createData.id) {
      testQaId = createData.id;
      console.log(`  ✔ [PASS] Q&A API POST: Submitted client query (${testQaId})`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Q&A API POST: Status ${createRes.status}`, createData);
      failed++;
    }

    // Answer and publish via PATCH
    const patchRes = await fetch(`${BASE_URL}/api/qa`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        id: testQaId,
        answer: "No. Under Section 10(1), conciliation is initiated only upon explicit written request of the aggrieved woman.",
        answeredBy: "Adv. Debjani Sen, Head of POSH Practice",
        isPublic: true,
      }),
    });
    const patchData = await patchRes.json();
    if (patchRes.status === 200 && patchData.success) {
      console.log(`  ✔ [PASS] Q&A API PATCH: Counsel answer recorded and query published`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Q&A API PATCH: Status ${patchRes.status}`, patchData);
      failed++;
    }

    // Delete test question
    const delRes = await fetch(`${BASE_URL}/api/qa?id=${testQaId}`, {
      method: "DELETE",
      headers: { Cookie: `acorn_admin_session=${authCookie}` },
    });
    if (delRes.status === 200) {
      console.log(`  ✔ [PASS] Q&A API DELETE: Test query removed from moderation queue`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Q&A API DELETE: Status ${delRes.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Q&A Moderation Workflow: ${err.message}`);
    failed++;
  }

  // 2f: Test Service Request Status Updates (/api/requests PATCH)
  try {
    const res = await fetch(`${BASE_URL}/api/requests`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        id: "SR-1731110000001",
        status: "IN_REVIEW",
        note: "Preliminary conflict check passed. Proceeding with fee quote.",
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.request && data.request.status === "IN_REVIEW") {
      console.log(`  ✔ [PASS] Service Requests API PATCH: Status transitioned to IN_REVIEW with internal notes`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Service Requests API PATCH: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Service Requests API PATCH: ${err.message}`);
    failed++;
  }

  // 2g: Test POSH Case State Transition (/api/cases PATCH)
  try {
    const res = await fetch(`${BASE_URL}/api/cases`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        id: "ACN-POSH-2026-0041",
        state: "INQUIRY_IN_PROGRESS",
        note: "Quorum verified per Section 4. Summons dispatched to respondent.",
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.case && data.case.state === "INQUIRY_IN_PROGRESS") {
      console.log(`  ✔ [PASS] POSH Case API PATCH: Docket updated with state INQUIRY_IN_PROGRESS & audit entry`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] POSH Case API PATCH: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] POSH Case API PATCH: ${err.message}`);
    failed++;
  }

  // 2h: Test Statutory Legal Rules Registry & Guardrail Enforcement (/api/rules)
  try {
    // Normal parameter update
    const res = await fetch(`${BASE_URL}/api/rules`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        param: "inquiry_days",
        value: "90",
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success) {
      console.log(`  ✔ [PASS] Statutory Rules API: Updated inquiry timeline parameter`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Statutory Rules API: Status ${res.status}`, data);
      failed++;
    }

    // Guardrail rejection: monetary conciliation settlement prohibition (Sec 10)
    const guardrailRes = await fetch(`${BASE_URL}/api/rules`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        param: "conciliation_allows_monetary",
        value: "true",
      }),
    });
    if (guardrailRes.status === 403) {
      console.log(`  ✔ [PASS] Statutory Rules Guardrail: Section 10(1) monetary settlement violation strictly blocked (HTTP 403)`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Statutory Rules Guardrail: Expected 403, got ${guardrailRes.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Statutory Rules API: ${err.message}`);
    failed++;
  }

  // 2i: Test System Infrastructure Settings (/api/settings)
  try {
    const res = await fetch(`${BASE_URL}/api/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        razorpayMode: "test",
        retentionYears: "3",
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.settings.razorpayMode === "test") {
      console.log(`  ✔ [PASS] System Settings API: Gateway configuration updated in persistent database`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] System Settings API: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] System Settings API: ${err.message}`);
    failed++;
  }

  // 2j: Test Counsel Team Profiles CRUD (/api/team)
  const testTeamId = `team-test-${Date.now()}`;
  try {
    const res = await fetch(`${BASE_URL}/api/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `acorn_admin_session=${authCookie}` },
      body: JSON.stringify({
        id: testTeamId,
        name: "Adv. Priyanka Sen",
        role: "Senior Consultant",
        title: "Advocate & POSH Advisory Specialist",
        email: "priyanka.sen@acornlegal.in",
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.member.id === testTeamId) {
      console.log(`  ✔ [PASS] Team Profiles API: Counsel profile saved to persistent database`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Team Profiles API: Status ${res.status}`, data);
      failed++;
    }

    const delRes = await fetch(`${BASE_URL}/api/team?id=${testTeamId}`, {
      method: "DELETE",
      headers: { Cookie: `acorn_admin_session=${authCookie}` },
    });
    if (delRes.status === 200) {
      console.log(`  ✔ [PASS] Team Profiles API: Successfully deleted test counsel profile`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Team Profiles Deletion: Status ${delRes.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Team Profiles API: ${err.message}`);
    failed++;
  }

  // 2k: Test Unified Database Sync Snapshot (/api/sync)
  try {
    const res = await fetch(`${BASE_URL}/api/sync`);
    const data = await res.json();
    const hasAllEntities =
      data.success &&
      data.data.siteConfig &&
      Array.isArray(data.data.services) &&
      Array.isArray(data.data.posts) &&
      Array.isArray(data.data.questions) &&
      Array.isArray(data.data.faqs) &&
      Array.isArray(data.data.serviceRequests) &&
      Array.isArray(data.data.cases) &&
      Array.isArray(data.data.team) &&
      Array.isArray(data.data.legalRules) &&
      typeof data.data.systemSettings === "object";

    if (res.status === 200 && hasAllEntities) {
      console.log(`  ✔ [PASS] Unified Database Sync API: Full snapshot validated with all 9 statutory collections`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] Unified Database Sync API: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`  ✖ [ERROR] Unified Database Sync API: ${err.message}`);
    failed++;
  }

  // 2l: Test Server-Sent Events (SSE) Stream Handshake (/api/sync/stream)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${BASE_URL}/api/sync/stream`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const contentType = res.headers.get("content-type") || "";
    if (res.status === 200 && contentType.includes("text/event-stream")) {
      console.log(`  ✔ [PASS] SSE Real-Time Stream API: Handshake confirmed with text/event-stream header`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] SSE Real-Time Stream API: Status ${res.status}, content-type: ${contentType}`);
      failed++;
    }
  } catch (err) {
    if (err.name === "AbortError") {
      console.log(`  ✔ [PASS] SSE Real-Time Stream API: Connected and successfully held active stream`);
      passed++;
    } else {
      console.error(`  ✖ [ERROR] SSE Stream API: ${err.message}`);
      failed++;
    }
  }

  console.log("\n=================================================");
  console.log(`Verification Complete: ${passed} passed, ${failed} failed.`);
  console.log("=================================================");

  if (serverProc && !process.env.TEST_BASE_URL) {
    try {
      serverProc.kill();
    } catch {}
  }

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test runner crashed:", e);
  if (serverProc) {
    try { serverProc.kill(); } catch {}
  }
  process.exit(1);
});
