import { NextRequest, NextResponse } from "next/server";
import { platformStore } from "@/lib/store";
import { generateReferenceNumber } from "@/lib/utils";
import { ServiceRequest } from "@/lib/types";

// POST /api/requests - Submit new legal service request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.practiceArea || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, practiceArea, description" },
        { status: 400 }
      );
    }

    const referenceNumber = generateReferenceNumber("SR");
    const newRequest: ServiceRequest = {
      id: `SR-${Date.now()}`,
      referenceNumber,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      organization: body.organization || "",
      practiceArea: body.practiceArea,
      description: body.description,
      status: "NEW",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      urgency: body.urgency || "NORMAL",
      preferredMode: body.preferredMode || "ONLINE_VC",
    };

    platformStore.addServiceRequest(newRequest);
    platformStore.addAuditLog(
      "SERVICE_REQUEST_SUBMITTED",
      body.email,
      `New service request ${referenceNumber} received for practice area ${body.practiceArea}`
    );

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: "Your legal service request has been registered with Acorn Legal Consultants.",
      request: newRequest
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/requests - List all service requests (Admin)
export async function GET(req: NextRequest) {
  try {
    const requests = platformStore.getServiceRequests();
    return NextResponse.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

