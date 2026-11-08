import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET() {
  const faqs = platformStore.getFaqs();
  return NextResponse.json({ success: true, faqs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.question || !body.answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }
    let saved;
    if (body.id) {
      saved = platformStore.updateFaq(body.id, body);
    } else {
      saved = platformStore.addFaq(body);
    }
    return NextResponse.json({
      success: true,
      message: "FAQ saved and synchronized in real-time",
      faq: saved,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing FAQ id" }, { status: 400 });
    }
    platformStore.deleteFaq(id);
    return NextResponse.json({ success: true, message: `FAQ ${id} deleted` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete FAQ" }, { status: 500 });
  }
}
