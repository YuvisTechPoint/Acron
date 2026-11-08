import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";
import { generateReferenceNumber } from "@/lib/utils";
import { QuestionAnswer } from "@/lib/types";

export const dynamic = "force-dynamic";

// POST /api/qa - Submit a new question
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = body.name || body.authorName || body.askedByName;
    const email = body.email || body.authorEmail || body.askedByEmail;
    const question = body.question;

    if (!name || !email || !question) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, question" },
        { status: 400 }
      );
    }

    const referenceNumber = generateReferenceNumber("QA");
    const newQuestion: QuestionAnswer = {
      id: `QA-${Date.now()}`,
      refNumber: referenceNumber,
      referenceNumber,
      authorName: name,
      authorEmail: email,
      askedByName: name,
      askedByEmail: email,
      question: body.question,
      category: body.category || "corporate",
      status: "pending_review",
      isPublic: false,
      isPublished: false,
      views: 0,
      upvotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = db.insertQuestion(newQuestion);
    platformStore.addQuestion(newQuestion);
    db.insertAuditLog(
      "QA_QUESTION_SUBMITTED",
      email,
      `New legal query ${referenceNumber} saved in database for moderation.`
    );

    return NextResponse.json({
      success: true,
      referenceNumber,
      id: saved.id,
      refNumber: referenceNumber,
      message: "Your query has been recorded in the database and submitted for legal editorial review.",
      estimatedTurnaround: "1-2 Business Days"
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to submit legal query", details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/qa - Get published Q&As
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let questions = db.getQuestions().filter((q) => q.isPublic || q.isPublished);

    if (category && category !== "all") {
      questions = questions.filter((q) => q.category === category);
    }

    if (search) {
      const qLower = search.toLowerCase();
      questions = questions.filter(
        (q) => q.question.toLowerCase().includes(qLower) || (q.answer && q.answer.toLowerCase().includes(qLower))
      );
    }

    return NextResponse.json({
      success: true,
      count: questions.length,
      questions,
      database: "connected",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch legal questions", details: error.message },
      { status: 500 }
    );
  }
}
