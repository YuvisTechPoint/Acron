import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";
import { generateReferenceNumber } from "@/lib/utils";
import { ServiceRequest } from "@/lib/types";

export const dynamic = "force-dynamic";

// POST /api/requests - Submit new legal service request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = body.name || body.fullName || body.clientName;
    const email = body.email;
    const practiceArea = body.practiceArea || body.serviceCategory || body.serviceRequested || "General Advisory";
    const description = body.description || body.briefDescription || body.message || "Consultation request";

    if (!name || !email || !practiceArea || !description) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, practiceArea, description" },
        { status: 400 }
      );
    }

    const referenceNumber = generateReferenceNumber("SR");
    const newRequest: ServiceRequest = {
      id: `SR-${Date.now()}`,
      refNumber: referenceNumber,
      referenceNumber,
      fullName: name,
      name: name,
      email: email,
      phone: body.phone || "",
      organization: body.organization || "",
      serviceCategory: practiceArea,
      practiceArea: practiceArea,
      subject: body.subject || `Legal Inquiry: ${practiceArea}`,
      description: description,
      status: "NEW",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      urgency: body.urgency || "standard",
      preferredChannel: "phone",
      preferredMode: body.preferredMode || "ONLINE_VC",
    };

    const saved = db.insertServiceRequest(newRequest);
    platformStore.addServiceRequest(newRequest);
    db.insertAuditLog(
      "SERVICE_REQUEST_SUBMITTED",
      body.email,
      `New service request ${referenceNumber} saved in database for practice area ${practiceArea}`
    );

    return NextResponse.json({
      success: true,
      referenceNumber,
      id: saved.id,
      refNumber: referenceNumber,
      message: "Your consultation request has been successfully recorded in the chambers database.",
      disclaimer: "Under Bar Council of India rules, submission of this request does not establish an advocate-client relationship."
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process service request", details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/requests - List service requests
export async function GET(req: NextRequest) {
  try {
    const requests = db.getServiceRequests();
    return NextResponse.json({
      success: true,
      count: requests.length,
      requests,
      database: "connected",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch service requests", details: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/requests - Update service request status and notes
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, note } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing request id" }, { status: 400 });
    }
    const updated = db.updateServiceRequest(id, { status }, note);
    if (status) {
      platformStore.updateServiceRequestStatus(id, status, note);
    }
    return NextResponse.json({
      success: true,
      message: "Request status updated in database and synchronized",
      request: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update service request", details: error.message },
      { status: 500 }
    );
  }
}
