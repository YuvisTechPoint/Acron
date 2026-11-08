import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET() {
  const services = platformStore.getServices();
  return NextResponse.json({ success: true, services });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title && !body.name) {
      return NextResponse.json({ error: "Service title or name is required" }, { status: 400 });
    }
    let saved;
    if (body.id) {
      platformStore.updateService(body.id, body);
      saved = body;
    } else {
      saved = platformStore.addService(body);
    }
    return NextResponse.json({
      success: true,
      message: "Service saved and synchronized in real-time",
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
    platformStore.deleteService(id);
    return NextResponse.json({ success: true, message: `Service ${id} deleted` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete service" }, { status: 500 });
  }
}
