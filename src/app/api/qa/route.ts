import { NextRequest, NextResponse } from "next/server";
import { platformStore } from "@/lib/store";
import { generateReferenceNumber } from "@/lib/utils";
import { QuestionAnswer } from "@/lib/types";

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
      authorName: body.name || "Anonymous",
      authorEmail: body.email || "",
      askedByName: body.name,
      askedByEmail: body.email,
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

    platformStore.addQuestion(newQuestion);
    platformStore.addAuditLog(
      "QA_QUESTION_SUBMITTED",
      body.email,
      `New legal query ${referenceNumber} submitted for moderation.`
    );

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: "Your question has been received. Our legal research team will review and formulate a response.",
      question: newQuestion
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/qa - List questions (published only by default)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get("status");
    const categoryParam = searchParams.get("category");

    let questions = platformStore.getQuestions();

    if (statusParam === "all") {
      // Return all for admin
    } else {
      questions = questions.filter((q) => q.isPublic || q.isPublished || q.status === "published" || q.status === "answered");
    }

    if (categoryParam) {
      questions = questions.filter((q) => q.category.toLowerCase() === categoryParam.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

