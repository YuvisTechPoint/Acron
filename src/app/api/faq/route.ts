import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const faqs = db.getFaqs();
  return NextResponse.json({ success: true, faqs, faq: faqs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.question) {
      return NextResponse.json({ error: "Question text is required" }, { status: 400 });
    }
    let saved;
    if (body.id) {
      saved = db.updateFaq(body.id, body);
      platformStore.updateFaq(body.id, body);
    } else {
      const newFaq = {
        id: `faq-${Date.now()}`,
        category: body.category || "General",
        question: body.question,
        answer: body.answer || "",
        showOnHomepage: Boolean(body.showOnHomepage),
        order: Number(body.order) || 1,
        updatedAt: new Date().toISOString(),
      };
      saved = db.insertFaq(newFaq);
      platformStore.addFaq(newFaq);
    }
    return NextResponse.json({
      success: true,
      message: "FAQ query saved to database and synchronized in real-time",
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
    db.deleteFaq(id);
    platformStore.deleteFaq(id);
    return NextResponse.json({ success: true, message: `FAQ ${id} deleted` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete FAQ" }, { status: 500 });
  }
}
