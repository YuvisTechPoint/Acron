import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = db.getServices();
  return NextResponse.json({ success: true, services });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: "Service name is required" }, { status: 400 });
    }
    let saved;
    if (body.id) {
      saved = db.updateService(body.id, body);
      platformStore.updateService(body.id, body);
    } else {
      const newService = {
        ...body,
        id: `srv-${Date.now()}`,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };
      saved = db.insertService(newService);
      platformStore.addService(newService);
    }
    return NextResponse.json({
      success: true,
      message: "Service saved to database and synchronized in real-time",
      service: saved,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save service" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing service id" }, { status: 400 });
    }
    db.deleteService(id);
    platformStore.deleteService(id);
    return NextResponse.json({ success: true, message: `Service ${id} deleted` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete service" }, { status: 500 });
  }
}
