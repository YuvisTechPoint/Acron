"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  CheckCircle2,
  ThumbsUp,
  Plus,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { QuestionAnswer } from "@/lib/types";

export default function PublicQAPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New question form state
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [category, setCategory] = useState<any>("posh_law");
  const [questionText, setQuestionText] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const questions = platformStore.getQuestions().filter((q) => q.isPublic);

  const filtered = questions.filter((q) => {
    const matchesCategory = selectedCategory === "ALL" || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.answer && q.answer.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const created = platformStore.addQuestion(
      authorName,
      authorEmail,
      category,
      questionText
    );
    setSubmittedRef(created.refNumber);
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-accent font-bold">
              Public Legal Repository
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
              Verified Legal Q&amp;A Knowledge Base
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Explore authoritative legal answers drafted and reviewed by senior counsel at Acorn Legal Consultants. Got a question? Submit it for confidential review.
            </p>
          </div>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setSubmittedRef(null);
            }}
            className="px-5 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Ask a Legal Question</span>
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-ink-secondary absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search legal questions, statutory terms (e.g. 90-day inquiry, conciliation, Calcutta High Court)..."
              className="w-full text-xs pl-10 pr-4 py-3 bg-surface border border-border rounded-card focus:outline-none focus:border-primary text-ink"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: "ALL", label: "All Questions" },
              { id: "posh_law", label: "POSH Law & Redressal" },
              { id: "employment", label: "Employment & Labour" },
              { id: "contracts", label: "Commercial Contracts" },
              { id: "litigation", label: "Litigation & Tribunals" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-ink hover:bg-surface-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Q&A Accordion List */}
        <div className="space-y-6">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-surface rounded-card p-6 border border-border shadow-card space-y-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      Q
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-ink">
                        {item.question}
                      </h3>
                      <div className="text-[11px] text-ink-secondary mt-1 flex items-center gap-3">
                        <span className="font-mono">{item.refNumber}</span>
                        <span>&bull;</span>
                        <span className="capitalize">{item.category.replace(/_/g, " ")}</span>
                        <span>&bull;</span>
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>

                {item.answer && (
                  <div className="bg-white p-5 rounded border border-border-subtle space-y-3 text-xs leading-relaxed text-ink">
                    <div className="flex items-center gap-2 text-accent font-bold text-[11px] uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Verified Counsel Answer</span>
                    </div>

                    <p className="whitespace-pre-line text-ink-secondary">
                      {item.answer}
                    </p>

                    <div className="pt-3 border-t border-border-subtle flex flex-col sm:flex-row justify-between sm:items-center text-[11px] text-ink-secondary gap-2">
                      <div>
                        Answered by: <strong className="text-ink">{item.answeredBy}</strong> on {formatDate(item.answeredAt)}
                      </div>

                      <button
                        onClick={() => platformStore.upvoteQuestion(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-border rounded hover:bg-surface-muted transition-colors text-ink font-semibold"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-primary" />
                        <span>Helpful ({item.upvotes})</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-surface rounded-card border border-border text-ink-secondary text-xs">
              No matching questions found. Be the first to ask!
            </div>
          )}
        </div>

        {/* Modal: Ask Question */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white max-w-lg w-full rounded-card p-6 shadow-modal border border-border">
              {submittedRef ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-ink">
                    Question Submitted for Counsel Review
                  </h3>
                  <div className="inline-block bg-surface px-4 py-2 rounded font-mono text-xs font-bold text-primary">
                    Reference: {submittedRef}
                  </div>
                  <p className="text-xs text-ink-secondary max-w-sm mx-auto leading-relaxed">
                    Thank you. Your question has been routed to our Legal Admin Desk. Approved answers are published directly to this public repository.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary-hover"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuestion} className="space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <h3 className="font-serif font-bold text-base text-ink">
                      Submit a Question for Acorn Legal Counsel
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="text-ink-secondary hover:text-ink"
                    >
                      &times;
                    </button>
                  </div>

                  <div>
                    <label className="block font-semibold text-ink mb-1">Your Name / Title (Can be pseudonymous) *</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. HR Manager / Senior Architect"
                      className="w-full px-3 py-2 border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-ink mb-1">Your Email (Kept Strictly Confidential) *</label>
                    <input
                      type="email"
                      required
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="w-full px-3 py-2 border border-border rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-ink mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded"
                    >
                      <option value="posh_law">POSH Law &amp; IC Redressal</option>
                      <option value="employment">Employment &amp; Labour Law</option>
                      <option value="contracts">Contracts &amp; Commercial</option>
                      <option value="litigation">Litigation &amp; High Court</option>
                      <option value="property">Real Estate &amp; Property Title</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-ink mb-1">Your Legal Question *</label>
                    <textarea
                      required
                      rows={4}
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="State your statutory or procedural question clearly..."
                      className="w-full px-3 py-2 border border-border rounded"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border border-border rounded text-ink"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-wider rounded"
                    >
                      Submit Question
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

