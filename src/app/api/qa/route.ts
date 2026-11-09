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
      id: body.id || `QA-${Date.now()}`,
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
      updatedAt: new Date().toISOString(),
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
      estimatedTurnaround: "1-2 Business Days",
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
    const all = searchParams.get("all") === "true";

    let questions = db.getQuestions();
    if (!all) {
      questions = questions.filter((q) => q.isPublic || q.isPublished);
    }

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

// PATCH /api/qa - Moderation: Answer, edit, or toggle publication
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id;
    if (!id) {
      return NextResponse.json({ error: "Missing question id" }, { status: 400 });
    }

    const updates: Partial<QuestionAnswer> = {};
    if (body.answer !== undefined) updates.answer = body.answer;
    if (body.answeredBy !== undefined) updates.answeredBy = body.answeredBy;
    if (body.isPublic !== undefined) {
      updates.isPublic = Boolean(body.isPublic);
      updates.isPublished = Boolean(body.isPublic);
    }
    if (body.status !== undefined) {
      updates.status = body.status;
    } else if (body.answer) {
      updates.status = "answered";
    }

    const saved = db.updateQuestion(id, updates);
    if (body.answer) {
      platformStore.answerQuestion(
        id,
        body.answer,
        body.answeredBy || "Adv. Debjani Sen",
        body.isPublic ?? true
      );
    }

    db.insertAuditLog(
      "QA_QUESTION_ANSWERED",
      body.answeredBy || "Admin",
      `Moderation update applied to question query ${id}.`
    );

    return NextResponse.json({
      success: true,
      message: "Question answer and publication status updated in real-time.",
      question: saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update question", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/qa - Remove question from moderation queue
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing question id" }, { status: 400 });
    }

    db.deleteQuestion(id);
    platformStore.deleteQuestion(id);
    db.insertAuditLog("QA_QUESTION_DELETED", "Admin", `Question query ${id} removed from queue.`);

    return NextResponse.json({
      success: true,
      message: `Question ${id} successfully removed.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete question", details: error.message },
      { status: 500 }
    );
  }
}
