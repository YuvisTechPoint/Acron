import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const faqList = db.getQuestions().filter((q) => q.isPublic);
  return NextResponse.json({ success: true, faq: faqList });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.question) {
      return NextResponse.json({ error: "Question text is required" }, { status: 400 });
    }
    const newQuestion = {
      ...body,
      id: `qa-${Date.now()}`,
      refNumber: `ACN-QA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      isPublic: true,
      isPublished: true,
    };
    const saved = db.insertQuestion(newQuestion);
    platformStore.addQuestion(newQuestion);
    return NextResponse.json({
      success: true,
      message: "FAQ query saved to database and synchronized",
      faq: saved,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save question" }, { status: 500 });
  }
}
