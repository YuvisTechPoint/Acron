"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { useRealtimeQuestions } from "@/lib/realtime";
import { formatDate } from "@/lib/utils";
import { QuestionAnswer } from "@/lib/types";

export default function AdminQAQueuePage() {
  const [selectedQA, setSelectedQA] = useState<QuestionAnswer | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [answeredBy, setAnsweredBy] = useState("Adv. Debjani Sen, Head of POSH Practice");
  const [publishPublic, setPublishPublic] = useState(true);

  const questions = useRealtimeQuestions();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQA || !answerText.trim()) return;

    platformStore.answerQuestion(
      selectedQA.id,
      answerText,
      answeredBy,
      publishPublic
    );

    try {
      await fetch("/api/qa", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedQA.id,
          answer: answerText,
          answeredBy,
          isPublic: publishPublic,
        }),
      });
    } catch {}

    // Refresh
    const updated = platformStore.getQuestions();
    const refreshed = updated.find((q) => q.id === selectedQA.id);
    if (refreshed) setSelectedQA({ ...refreshed });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this question from moderation queue?")) {
      platformStore.deleteQuestion(id);
      try {
        await fetch(`/api/qa?id=${id}`, { method: "DELETE" });
      } catch {}
      setSelectedQA(null);
    }
  };

  return (
    <div className="bg-surface min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Knowledge Moderation
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink mt-0.5">
                Legal Q&amp;A Moderation Queue
              </h1>
            </div>
          </div>

          <Link
            href="/qa"
            className="text-xs text-primary font-semibold hover:underline"
          >
            View Public FAQ Page &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question List */}
          <div className="lg:col-span-6 bg-white rounded-card border border-border overflow-hidden shadow-card text-xs">
            <div className="p-4 bg-surface border-b border-border font-bold text-ink text-xs uppercase tracking-wider">
              Submitted Questions ({questions.length})
            </div>

            <div className="divide-y divide-border-subtle">
              {questions.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedQA(q);
                    setAnswerText(q.answer || "");
                    setPublishPublic(q.isPublic);
                  }}
                  className={`p-4 hover:bg-surface cursor-pointer transition-colors space-y-1.5 ${
                    selectedQA?.id === q.id ? "bg-primary-light/40" : ""
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] text-ink-secondary font-mono">
                    <span>{q.refNumber}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      q.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {q.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="font-semibold text-ink leading-snug">
                    {q.question}
                  </div>
                  <div className="text-[11px] text-ink-secondary flex justify-between">
                    <span>From: {q.authorName}</span>
                    <span>Category: {q.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Answer Editor */}
          <div className="lg:col-span-6 bg-white rounded-card p-6 border border-border shadow-card space-y-4 text-xs">
            {selectedQA ? (
              <form onSubmit={handleSaveAnswer} className="space-y-4">
                <div className="border-b border-border pb-3">
                  <div className="text-[11px] font-mono text-primary font-bold">{selectedQA.refNumber}</div>
                  <h3 className="font-serif font-bold text-base text-ink mt-1">
                    {selectedQA.question}
                  </h3>
                  <div className="text-[11px] text-ink-secondary mt-1">
                    Submitted by: <strong>{selectedQA.authorName}</strong> ({selectedQA.authorEmail}) on {formatDate(selectedQA.createdAt)}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-ink mb-1">
                    Verified Legal Answer (Published on Public FAQ) *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Provide authoritative statutory analysis with specific sections of the Act."
                    className="w-full px-3 py-2 border border-border rounded"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-ink mb-1">Answered By (Counsel Name &amp; Title):</label>
                  <input
                    type="text"
                    value={answeredBy}
                    onChange={(e) => setAnsweredBy(e.target.value)}
                    className="w-full px-3 py-1.5 border border-border rounded"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 font-semibold text-ink cursor-pointer">
                    <input
                      type="checkbox"
                      checked={publishPublic}
                      onChange={(e) => setPublishPublic(e.target.checked)}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span>Publish publicly to Searchable Knowledge Base</span>
                  </label>
                </div>

                {savedSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Answer saved and synchronized in real-time.</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-wider rounded transition-colors"
                  >
                    Save Answer &amp; Update Public FAQ
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedQA.id)}
                    className="p-2.5 border border-border text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-16 text-ink-secondary">
                Select a question from the list to draft and publish an answer.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

