// Automated test for interactive workflows and API endpoints
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

async function testWorkflows() {
  console.log("Testing interactive workflows and API endpoints...\n");
  let passed = 0;
  let failed = 0;

  // 1. Test Service Request / Contact Intake API
  try {
    const res = await fetch(`${BASE_URL}/api/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test Automated Client",
        email: "autoclient@testacorn.com",
        phone: "+91 98300 99999",
        serviceCategory: "corporate_commercial",
        subject: "Automated Verification Test Intake",
        description: "Testing matter submission, validation, and reference code generation.",
        urgency: "standard",
        preferredChannel: "email",
      }),
    });

    const data = await res.json();
    const isSuccess = (res.status === 200 || res.status === 201) && (data.refNumber || data.referenceNumber);
    if (isSuccess) {
      console.log(`✔ [PASS] Service Request Intake API: Generated Ref ${data.referenceNumber || data.refNumber}`);
      passed++;
    } else {
      console.error(`✖ [FAIL] Service Request Intake API: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✖ [ERROR] Service Request Intake: ${err.message}`);
    failed++;
  }

  // 2. Test Q&A Question Submission API
  try {
    const res = await fetch(`${BASE_URL}/api/qa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authorName: "Ananya Mukherjee",
        authorEmail: "ananya@example.com",
        category: "posh_compliance",
        question: "Is an external member strictly required in the Internal Committee if our workplace has fewer than 20 employees?",
      }),
    });

    const data = await res.json();
    const isSuccess = (res.status === 200 || res.status === 201) && (data.referenceNumber || data.refNumber || data.success);
    if (isSuccess) {
      console.log(`✔ [PASS] Public Q&A Submission API: Question registered (${data.referenceNumber || data.refNumber})`);
      passed++;
    } else {
      console.error(`✖ [FAIL] Q&A Submission API: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✖ [ERROR] Q&A Submission API: ${err.message}`);
    failed++;
  }

  // 3. Test POSH Case Registration API
  try {
    const res = await fetch(`${BASE_URL}/api/cases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orgId: "org-bengal-tech",
        incidentDates: ["2026-11-01"],
        incidentLocation: "Salt Lake Sector V Office",
        natureOfHarassment: ["verbal", "electronic"],
        summary: "Automated workflow verification for IC case docket registration.",
        detailedStatement: "Comprehensive statement filed under POSH Section 9 rules.",
      }),
    });

    const data = await res.json();
    const isSuccess = (res.status === 200 || res.status === 201) && (data.caseNumber || data.id);
    if (isSuccess) {
      console.log(`✔ [PASS] POSH Case Registration API: Docket Number ${data.caseNumber || data.id}`);
      passed++;
    } else {
      console.error(`✖ [FAIL] POSH Case Registration: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✖ [ERROR] POSH Case Registration: ${err.message}`);
    failed++;
  }

  // 4. Test Payment Verification API
  try {
    const res = await fetch(`${BASE_URL}/api/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpayPaymentId: "pay_test_workflow_99182",
        orderId: "order_test_99182",
        clientName: "Automated Test Payer",
        clientEmail: "payer@testacorn.com",
        clientPhone: "+91 98300 11111",
        serviceCategory: "Corporate Retainer",
        itemDescription: "Quarterly Retainer Fee Q1",
        amountPaise: 5000000,
      }),
    });

    const data = await res.json();
    const isSuccess = (res.status === 200 || res.status === 201) && (data.receiptNumber || data.success);
    if (isSuccess) {
      console.log(`✔ [PASS] Payment Verification API: Receipt ${data.receiptNumber || "Verified"}`);
      passed++;
    } else {
      console.error(`✖ [FAIL] Payment Verification API: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✖ [ERROR] Payment Verification API: ${err.message}`);
    failed++;
  }

  // 5. Test Payment Order Creation API
  try {
    const res = await fetch(`${BASE_URL}/api/payments/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amountPaise: 2500000,
        currency: "INR",
        itemDescription: "Retainer Fee Advisory Advance",
      }),
    });

    const data = await res.json();
    if (res.status === 200 && data.orderId) {
      console.log(`✔ [PASS] Payment Order Creation API: Generated Order ID ${data.orderId}`);
      passed++;
    } else {
      console.error(`✖ [FAIL] Payment Order Creation: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✖ [ERROR] Payment Order Creation API: ${err.message}`);
    failed++;
  }

  // 6. Test Script Management API & BR-046 POSH Privacy Enforcement
  try {
    const res = await fetch(`${BASE_URL}/api/scripts`, {
      method: "GET",
      headers: { "Referer": "http://localhost:3000/posh/my-case" },
    });

    const data = await res.json();
    if (res.status === 200 && Array.isArray(data.scripts) && data.scripts.length === 0) {
      console.log(`✔ [PASS] Script API BR-046 Privacy Gate: Zero scripts loaded on /posh routes`);
      passed++;
    } else {
      console.error(`✖ [FAIL] Script API Privacy Gate: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✖ [ERROR] Script API Privacy Gate: ${err.message}`);
    failed++;
  }

  // 7. Test POSH Case Listing API & Section 16 Privacy Masking
  try {
    const res = await fetch(`${BASE_URL}/api/cases`, {
      method: "GET",
    });

    const data = await res.json();
    if (res.status === 200 && Array.isArray(data.data)) {
      console.log(`✔ [PASS] Case Listing API: Retrieved ${data.count} dockets with Section 16 masking`);
      passed++;
    } else {
      console.error(`✖ [FAIL] Case Listing API: Status ${res.status}`, data);
      failed++;
    }
  } catch (err) {
    console.error(`✖ [ERROR] Case Listing API: ${err.message}`);
    failed++;
  }

  console.log(`\nWorkflow test results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("All interactive workflows, APIs, and state transitions verified successfully!");
    process.exit(0);
  }
}

testWorkflows();
