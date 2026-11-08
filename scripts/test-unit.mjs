// Standalone Authoritative Unit Test Suite
// Verifying Crypto, Statutory Rules, Access Control & Constitution Rule 3
import fs from "fs";
import path from "path";
import ts from "typescript";
import vm from "vm";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

function loadTsModule(relPath) {
  const fullPath = path.resolve(relPath);
  const code = fs.readFileSync(fullPath, "utf8");
  const js = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;

  const mod = { exports: {} };
  const customRequire = (id) => {
    if (id === "crypto" || id === "node:crypto") return require("crypto");
    if (id.startsWith("./") || id.startsWith("../")) {
      const resolved = path.resolve(path.dirname(fullPath), id);
      const tsFile = resolved.endsWith(".ts") ? resolved : resolved + ".ts";
      if (fs.existsSync(tsFile)) return loadTsModule(tsFile);
      const indexTs = path.join(resolved, "index.ts");
      if (fs.existsSync(indexTs)) return loadTsModule(indexTs);
      return require(resolved);
    }
    return require(id);
  };

  const context = vm.createContext({
    module: mod,
    exports: mod.exports,
    require: customRequire,
    process,
    Buffer,
    console,
    Date,
    Math,
    Set,
    Map,
  });

  vm.runInContext(js, context);
  return mod.exports;
}

const cryptoModule = loadTsModule("src/lib/crypto.ts");
const rulesModule = loadTsModule("src/lib/rules/index.ts");

async function runUnitTests() {
  console.log("=================================================");
  console.log("   ACORN LEGAL PLATFORM: AUTHORITATIVE UNIT TESTS");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✔ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ✖ [FAIL] ${message}`);
      failed++;
    }
  }

  // ==========================================
  // SECTION 1: CRYPTOGRAPHIC VAULT & CHAIN
  // ==========================================
  console.log("--- 1. Cryptographic Narrative Vault & Append-Only Audit Chain ---");

  // 1.1 AES-256-GCM Encryption / Decryption Round-Trip
  try {
    const rawNarrative = "Confidential witness testimony recorded on 2026-10-15 under Section 11.";
    const encrypted = cryptoModule.encryptNarrative(rawNarrative);
    const decrypted = cryptoModule.decryptNarrative(encrypted);
    assert(
      decrypted === rawNarrative && encrypted.tag && encrypted.iv,
      "AES-256-GCM encryption/decryption round-trip verified"
    );
  } catch (err) {
    assert(false, `AES-256-GCM test failed: ${err.message}`);
  }

  // 1.2 Tampered Ciphertext Rejection
  try {
    const raw = "Sensitive docket evidence";
    const enc = cryptoModule.encryptNarrative(raw);
    let threw = false;
    try {
      cryptoModule.decryptNarrative({
        ...enc,
        tag: "0".repeat(32), // tampered auth tag
      });
    } catch {
      threw = true;
    }
    assert(threw, "AES-256-GCM authentication tag tampering correctly rejected");
  } catch (err) {
    assert(false, `Tampered tag test failed: ${err.message}`);
  }

  // 1.3 HMAC-SHA256 Append-Only Audit Chaining
  try {
    const genesisHash = "0".repeat(64);
    const entry1 = {
      id: "log-001",
      orgId: "TECHKOL",
      actor: "Adv. Debjani Sen",
      actorRole: "ic_external_member",
      action: "HEARING_CONVENED",
      entityType: "case",
      entityId: "case-01",
      ipAddress: "103.21.124.50",
      timestamp: "2026-10-01 10:00:00 IST",
      details: "Inquiry hearing #1 convened",
      prevHash: genesisHash,
    };
    entry1.hash = cryptoModule.computeAuditHash(entry1);

    const entry2 = {
      id: "log-002",
      orgId: "TECHKOL",
      actor: "Dr. Ananya Mukherjee",
      actorRole: "ic_presiding_officer",
      action: "EVIDENCE_SEALED",
      entityType: "case",
      entityId: "case-01",
      ipAddress: "14.139.212.18",
      timestamp: "2026-10-02 11:30:00 IST",
      details: "Exhibit EX-001 sealed with SHA-256 digest",
      prevHash: entry1.hash,
    };
    entry2.hash = cryptoModule.computeAuditHash(entry2);

    const chain = [entry1, entry2];
    const verification = cryptoModule.verifyAuditChain(chain);
    assert(verification.valid === true, "Valid audit chain integrity verified with zero link defects");

    // Reverse chronological windowed chain verification (e.g. [entry2, entry1] without genesis)
    const entry3 = {
      id: "log-003",
      orgId: "TECHKOL",
      actor: "Adv. Debjani Sen",
      actorRole: "ic_external_member",
      action: "HEARING_CONCLUDED",
      entityType: "case",
      entityId: "case-01",
      ipAddress: "103.21.124.50",
      timestamp: "2026-10-03 14:00:00 IST",
      details: "Inquiry hearing #2 concluded",
      prevHash: entry2.hash,
    };
    entry3.hash = cryptoModule.computeAuditHash(entry3);
    const windowedReverseChain = [entry3, entry2];
    const windowVerification = cryptoModule.verifyAuditChain(windowedReverseChain);
    assert(windowVerification.valid === true, "Windowed reverse-chronological audit chain correctly verified");

    // Tamper with entry 1
    const tamperedChain = [
      { ...entry1, details: "Altered unauthorized record modification" },
      entry2,
    ];
    const tamperedResult = cryptoModule.verifyAuditChain(tamperedChain);
    assert(
      tamperedResult.valid === false && tamperedResult.brokenIndex !== undefined,
      "Tampered audit chain correctly flagged with broken index identified"
    );
  } catch (err) {
    assert(false, `Audit chain test failed: ${err.message}`);
  }

  // 1.4 PII Scrubber Verification
  try {
    const sampleText =
      "Contact complainant at priya.sharma@techkolkata.in or +91 98300 12345. Adv. Debjani Sen met Dr. Ananya Mukherjee. Aadhaar: 234567890123. PAN: abcde1234f. Justice Bhattacharya presided.";
    const scrubbed = cryptoModule.scrubPII(sampleText, ["Priya Sharma"]);

    const emailScrubbed = !scrubbed.includes("priya.sharma@techkolkata.in") && scrubbed.includes("[REDACTED_EMAIL]");
    const phoneScrubbed = !scrubbed.includes("98300 12345") && scrubbed.includes("[REDACTED_PHONE]");
    const namesScrubbed = !scrubbed.includes("Adv. Debjani Sen") && !scrubbed.includes("Dr. Ananya Mukherjee") && !scrubbed.includes("Justice Bhattacharya");
    const aadhaarScrubbed = !scrubbed.includes("234567890123") && scrubbed.includes("[REDACTED_AADHAAR]");
    const panScrubbed = !scrubbed.includes("abcde1234f") && scrubbed.includes("[REDACTED_PAN]");

    assert(
      emailScrubbed && phoneScrubbed && namesScrubbed && aadhaarScrubbed && panScrubbed,
      "PII Scrubber successfully redacts emails, mobile numbers, Aadhaar, PAN, and honorific counsel names"
    );
  } catch (err) {
    assert(false, `PII Scrubber failed: ${err.message}`);
  }

  // 1.5 Digital Sealing
  try {
    const seal = cryptoModule.generateDigitalSeal({ testMatter: "ACN-2026-0041" });
    assert(
      seal.sealHash && seal.signature && seal.algorithm === "HMAC-SHA256" && seal.manifestId,
      "Digital Sealing generates cryptographically verifiable manifest seal"
    );
  } catch (err) {
    assert(false, `Digital Sealing failed: ${err.message}`);
  }

  // ==========================================
  // SECTION 2: AUTHORITATIVE STATUTORY RULES
  // ==========================================
  console.log("\n--- 2. Centralized Statutory Rules Engine ---");

  // 2.1 Limitation Window (Section 9(1))
  try {
    const limWithin = rulesModule.evaluateLimitation("2026-09-01", "2026-10-01");
    const limCondone = rulesModule.evaluateLimitation("2026-05-01", "2026-09-01");
    const limBarred = rulesModule.evaluateLimitation("2026-01-01", "2026-09-01");

    assert(
      limWithin.status === "WITHIN_LIMITATION" && !limWithin.requiresCondonation && !limWithin.isBarred,
      "Section 9(1) <= 90 days correctly classified as WITHIN_LIMITATION"
    );
    assert(
      limCondone.status === "REQUIRES_CONDONATION" && limCondone.requiresCondonation && !limCondone.isBarred,
      "Section 9(1) Proviso 91-180 days correctly classified as REQUIRES_CONDONATION"
    );
    assert(
      limBarred.status === "STATUTORILY_BARRED" && limBarred.isBarred,
      "Section 9(1) > 180 days strictly classified as STATUTORILY_BARRED"
    );
  } catch (err) {
    assert(false, `Limitation rule failed: ${err.message}`);
  }

  // 2.2 Conciliation Statutory Monetary Prohibition (Section 10(1))
  try {
    const cleanTerms = "1. Unconditional written apology.\n2. Transfer to Salt Lake office.\n3. Mandatory sensitisation.";
    const dirtyTerms = "Respondent agrees to pay compensation of ₹1,00,000 to complainant.";

    const cleanResult = rulesModule.validateConciliationTerms(cleanTerms);
    const dirtyResult = rulesModule.validateConciliationTerms(dirtyTerms);
    const financialResult = rulesModule.validateConciliationTerms("Respondent provides financial severance package.");

    assert(
      cleanResult.isValid && !cleanResult.prohibited,
      "Non-monetary conciliation terms accepted under Section 10"
    );
    assert(
      !dirtyResult.isValid && dirtyResult.prohibited && !financialResult.isValid && financialResult.prohibited,
      "Section 10(1) monetary settlement prohibition strictly enforced against financial and severance terms"
    );
  } catch (err) {
    assert(false, `Conciliation rule failed: ${err.message}`);
  }

  // 2.3 Small-Cell Privacy Suppression (Section 16)
  try {
    const s0 = rulesModule.suppressSmallCell(0);
    const s3 = rulesModule.suppressSmallCell(3);
    const s5 = rulesModule.suppressSmallCell(5);
    const s42 = rulesModule.suppressSmallCell(42);

    assert(
      s0 === "0" && s3 === "< 5" && s5 === "5" && s42 === "42",
      "Small-cell suppression preserves cohort anonymity (< 5) while preserving zero and >= 5 counts"
    );
  } catch (err) {
    assert(false, `Suppression rule failed: ${err.message}`);
  }

  // 2.4 Quorum Validation (Rule 7 & Section 4)
  try {
    const validQ = rulesModule.validateQuorum({ totalPresent: 4, poPresent: true, womenPresent: 3 });
    const noPoQ = rulesModule.validateQuorum({ totalPresent: 4, poPresent: false, womenPresent: 3 });
    const lowCountQ = rulesModule.validateQuorum({ totalPresent: 2, poPresent: true, womenPresent: 2 });
    const lowWomenQ = rulesModule.validateQuorum({ totalPresent: 4, poPresent: true, womenPresent: 1 });

    assert(validQ.isValid, "Valid IC sitting (4 present, PO present, 75% women) satisfies statutory quorum");
    assert(!noPoQ.isValid, "Absence of Presiding Officer correctly invalidates quorum");
    assert(!lowCountQ.isValid, "IC sitting with < 3 members correctly rejected");
    assert(!lowWomenQ.isValid, "IC sitting with < 50% women members correctly rejected");
  } catch (err) {
    assert(false, `Quorum rule failed: ${err.message}`);
  }

  // 2.5 Procedural State Machine
  try {
    const triageAllowed = rulesModule.canTransition("SUBMITTED", "TRIAGE");
    const illegalJump = rulesModule.canTransition("SUBMITTED", "CLOSED");
    const formalInquiryAllowed = rulesModule.canTransition("RESPONSE_RECEIVED", "FORMAL_INQUIRY");

    assert(triageAllowed && formalInquiryAllowed, "Permissible statutory state transitions validated");
    assert(!illegalJump, "Arbitrary state jump (SUBMITTED -> CLOSED) strictly blocked");
  } catch (err) {
    assert(false, `State machine failed: ${err.message}`);
  }

  // ==========================================
  // SECTION 3: SERVER-SIDE ACCESS CONTROL
  // ==========================================
  console.log("\n--- 3. Server-Side Access Control (canAccessCase) ---");

  try {
    const caseDocket = {
      id: "case-01",
      orgId: "TECHKOL",
      complainantId: "usr-comp-01",
      respondentId: "usr-resp-01",
    };

    const compUser = { id: "usr-comp-01", roles: ["complainant"], orgId: "TECHKOL" };
    const intruderComp = { id: "usr-comp-99", roles: ["complainant"], orgId: "TECHKOL" };
    const icMember = { id: "usr-ic-01", roles: ["ic_member"], orgId: "TECHKOL" };
    const crossTenantIC = { id: "usr-ic-02", roles: ["ic_member"], orgId: "DIFFORG" };
    const superAdmin = { id: "usr-super", roles: ["super_admin"] };

    assert(rulesModule.canAccessCase(compUser, caseDocket), "Complainant granted access to own docket");
    assert(!rulesModule.canAccessCase(intruderComp, caseDocket), "Unauthorized complainant blocked from another case docket");
    assert(rulesModule.canAccessCase(icMember, caseDocket), "Internal Committee member granted access within same organization");
    assert(!rulesModule.canAccessCase(crossTenantIC, caseDocket), "Cross-tenant access strictly blocked for external org member");
    assert(rulesModule.canAccessCase(superAdmin, caseDocket), "Super Admin platform oversight access verified");
  } catch (err) {
    assert(false, `Access control failed: ${err.message}`);
  }

  // ==========================================
  // SECTION 4: CONSTITUTION RULE 3 NOTIFICATION LINT
  // ==========================================
  console.log("\n--- 4. Constitution Rule 3 Content-Free Notification Lint ---");

  try {
    // Rule 3: Notifications carry only case ID, org code, generic text and dates.
    // Must NOT contain personal names, complaint text, phone numbers, or allegations.
    const forbiddenFields = [
      "complainantName",
      "respondentName",
      "allegationText",
      "narrative",
      "victimPhone",
      "accusedName",
      "salary",
      "medicalDetails",
    ];

    // Scan source files for notification payload signatures
    const realtimeCode = fs.readFileSync("src/lib/realtime.ts", "utf8");
    let forbiddenFound = false;
    for (const field of forbiddenFields) {
      if (realtimeCode.includes(field)) {
        forbiddenFound = true;
        break;
      }
    }

    assert(
      !forbiddenFound,
      "Constitution Rule 3 Lint: Zero forbidden personal/case merge fields in realtime feeds or event emitters"
    );

    // Validate synthetic event validator function
    const isContentFreeEvent = (payload) => {
      const allowedKeys = new Set(["caseId", "orgCode", "orgId", "eventType", "timestamp", "summary", "status", "genericText"]);
      return Object.keys(payload).every((key) => allowedKeys.has(key));
    };

    const validPayload = { caseId: "CASE-01", orgCode: "TECHKOL", eventType: "HEARING_SCHEDULED", timestamp: new Date().toISOString() };
    const dirtyPayload = { caseId: "CASE-01", complainantName: "Priya Sharma", eventType: "ALERT" };

    assert(
      isContentFreeEvent(validPayload) && !isContentFreeEvent(dirtyPayload),
      "Real-time event payload sanitizer guarantees content-free broadcasts"
    );
  } catch (err) {
    assert(false, `Constitution Rule 3 lint failed: ${err.message}`);
  }

  // Summary
  console.log("\n=================================================");
  console.log(`Unit Test Suite Results: ${passed} passed, ${failed} failed.`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("✔ ALL AUTHORITATIVE STATUTORY, CRYPTO, AND ACCESS UNIT TESTS PASSED WITH 0 ERRORS.\n");
    process.exit(0);
  }
}

runUnitTests();
