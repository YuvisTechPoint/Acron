import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET() {
  const team = platformStore.getTeamMembers();
  return NextResponse.json({ success: true, team });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }
    let saved;
    if (body.id) {
      saved = platformStore.updateTeamMember(body.id, body);
    } else {
      saved = platformStore.addTeamMember(body);
    }
    return NextResponse.json({
      success: true,
      message: "Counsel profile saved and synchronized in real-time",
      member: saved,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save counsel profile" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing member id" }, { status: 400 });
    }
    platformStore.deleteTeamMember(id);
    return NextResponse.json({ success: true, message: `Counsel profile ${id} deleted` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete counsel profile" }, { status: 500 });
  }
}
