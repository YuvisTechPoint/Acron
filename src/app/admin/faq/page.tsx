"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Plus,
  Search,
  Trash2,
  Edit2,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  X,
  Filter,
  Eye,
  Check,
} from "lucide-react";
import { platformStore } from "@/lib/store";
import { FaqItem } from "@/lib/types";

const CATEGORIES = [
  "All Categories",
  "POSH Compliance",
  "Commercial Contracts",
  "Dispute Resolution",
  "Corporate Advisory",
  "Chambers Practice",
];

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    category: "POSH Compliance",
    question: "",
    answer: "",
    showOnHomepage: false,
    order: 1,
  });

  const loadData = () => {
    setFaqs(platformStore.getFaqs());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const openAddModal = () => {
    setEditingFaq(null);
    setFormData({
      category: "POSH Compliance",
      question: "",
      answer: "",
      showOnHomepage: false,
      order: faqs.length + 1,
    });
    setShowModal(true);
  };

  const openEditModal = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFormData({
      category: faq.category,
      question: faq.question,
      answer: faq.answer,
      showOnHomepage: faq.showOnHomepage,
      order: faq.order,
    });
    setShowModal(true);
  };

  const handleToggleHomepage = (faq: FaqItem) => {
    platformStore.updateFaq(faq.id, { showOnHomepage: !faq.showOnHomepage });
    loadData();
    triggerToast(`FAQ homepage visibility toggled to ${!faq.showOnHomepage ? "Featured" : "Hidden"}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert("Question and Answer are required.");
      return;
    }

    if (editingFaq) {
      platformStore.updateFaq(editingFaq.id, {
        category: formData.category,
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        showOnHomepage: formData.showOnHomepage,
        order: Number(formData.order) || 1,
      });
      triggerToast("FAQ successfully updated.");
    } else {
      platformStore.addFaq({
        category: formData.category,
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        showOnHomepage: formData.showOnHomepage,
        order: Number(formData.order) || 1,
      });
      triggerToast("New FAQ created and published.");
    }

    setShowModal(false);
    loadData();
  };

  const handleDelete = (faq: FaqItem) => {
    if (confirm(`Are you sure you want to delete this FAQ: "${faq.question.slice(0, 50)}..."?`)) {
      platformStore.deleteFaq(faq.id);
      loadData();
      triggerToast("FAQ deleted successfully.");
    }
  };

  const filteredFaqs = faqs
    .filter((f) => {
      const matchCat = categoryFilter === "All Categories" || f.category === categoryFilter;
      const matchSearch =
        searchTerm === "" ||
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => a.order - b.order);

  const homepageCount = faqs.filter((f) => f.showOnHomepage).length;

  return (
    <div className="bg-ivory-50 min-h-screen py-8 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-700 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brass-500" />
            <span>Back to Firm Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono bg-navy-50 text-navy-800 border border-navy-200 px-2 py-0.5 rounded">
              Statutory Knowledge Engine &bull; Section 14
            </span>
          </div>
        </div>

        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-card border border-border shadow-card">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-navy-700 font-bold">
              <HelpCircle className="w-4 h-4 text-brass-500" />
              <span>Public FAQs &amp; Statutory Guidance CMS</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink-950 mt-1">
              Chambers &amp; Practice FAQs
            </h1>
            <p className="text-xs text-ink-secondary mt-1">
              Manage statutory advisory questions, legal procedure explanations, and homepage featured FAQ highlights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/faq"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-border rounded-btn text-xs font-semibold hover:bg-ivory-50 text-navy-700 transition"
            >
              <span>View Public /faq</span>
              <ExternalLink className="w-3.5 h-3.5 text-brass-500" />
            </Link>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy-700 hover:bg-blue-600 text-white text-xs font-bold rounded-btn transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-btn text-xs flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{toastMsg}</span>
          </div>
        )}

        {/* Summary Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-card border border-border shadow-card flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-ink-secondary uppercase tracking-wider block">
                Total Practice FAQs
              </span>
              <span className="font-serif text-2xl font-bold text-ink-950">{faqs.length}</span>
            </div>
            <div className="p-3 bg-navy-50 rounded-card text-navy-700">
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-card border border-border shadow-card flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-ink-secondary uppercase tracking-wider block">
                Homepage Featured FAQs
              </span>
              <span className="font-serif text-2xl font-bold text-amber-700">{homepageCount}</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-card text-amber-600">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-card border border-border shadow-card flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-ink-secondary uppercase tracking-wider block">
                Active Categories
              </span>
              <span className="font-serif text-2xl font-bold text-blue-700">
                {new Set(faqs.map((f) => f.category)).size}
              </span>
            </div>
            <div className="p-3 bg-blue-50 rounded-card text-blue-600">
              <Filter className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search questions or legal answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-btn text-xs focus:outline-none focus:border-navy-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-ink-secondary font-medium">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-btn text-xs transition font-medium ${
                  categoryFilter === cat
                    ? "bg-navy-700 text-white font-bold"
                    : "bg-ivory-100 hover:bg-border text-ink-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Table / List */}
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <div className="p-4 border-b border-border bg-ivory-50 flex items-center justify-between">
            <span className="text-xs font-bold text-ink-950 uppercase tracking-wider">
              FAQ Records ({filteredFaqs.length})
            </span>
            <span className="text-[11px] text-ink-secondary">
              Ordered by statutory priority sequence
            </span>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center text-ink-secondary space-y-3">
              <HelpCircle className="w-8 h-8 text-ink-muted mx-auto" />
              <p className="text-sm font-medium">No FAQs match your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("All Categories");
                }}
                className="text-xs text-navy-700 font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="p-5 hover:bg-ivory-50/50 transition flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] bg-ivory-200 px-2 py-0.5 rounded text-ink-secondary">
                        Order #{faq.order}
                      </span>
                      <span className="text-[11px] font-semibold bg-navy-50 text-navy-800 border border-navy-200 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                      {faq.showOnHomepage && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Homepage Featured</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-base text-ink-950 leading-snug">
                      {faq.question}
                    </h3>

                    <p className="text-xs text-ink-secondary leading-relaxed line-clamp-3">
                      {faq.answer}
                    </p>

                    <div className="text-[10px] text-ink-muted">
                      Last revised: {new Date(faq.updatedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    <button
                      onClick={() => handleToggleHomepage(faq)}
                      title={faq.showOnHomepage ? "Remove from Homepage" : "Feature on Homepage"}
                      className={`p-2 rounded border text-xs flex items-center gap-1.5 transition ${
                        faq.showOnHomepage
                          ? "bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100"
                          : "bg-white border-border text-ink-secondary hover:bg-ivory-100"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-[11px] font-semibold">
                        {faq.showOnHomepage ? "Featured" : "Feature"}
                      </span>
                    </button>

                    <button
                      onClick={() => openEditModal(faq)}
                      className="p-2 bg-white border border-border rounded hover:bg-navy-50 text-navy-700 transition"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(faq)}
                      className="p-2 bg-white border border-border rounded hover:bg-red-50 text-red-600 transition"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for Add / Edit */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-card border border-border shadow-raised max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-5 border-b border-border flex items-center justify-between bg-ivory-50 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-navy-700" />
                  <h3 className="font-serif font-bold text-base text-ink-950">
                    {editingFaq ? "Edit Statutory FAQ" : "Create New Practice FAQ"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-border rounded text-ink-secondary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-ink-950 block mb-1">
                      Legal Practice Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700 bg-white"
                    >
                      <option value="POSH Compliance">POSH Compliance</option>
                      <option value="Commercial Contracts">Commercial Contracts</option>
                      <option value="Dispute Resolution">Dispute Resolution</option>
                      <option value="Corporate Advisory">Corporate Advisory</option>
                      <option value="Chambers Practice">Chambers Practice</option>
                      <option value="Real Estate & Title">Real Estate &amp; Title</option>
                      <option value="Employment & Labour">Employment &amp; Labour</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-ink-950 block mb-1">Display Order</label>
                    <input
                      type="number"
                      min={1}
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                      className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700"
                    />
                    <span className="text-[10px] text-ink-muted">Lower numbers appear first.</span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">
                    Question / Inquiry Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. When is an employer statutorily required to constitute an Internal Committee?"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-ink-950 block mb-1">
                    Definitive Legal Answer &amp; Precedents <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Provide authoritative statutory advisory citing specific sections, provisions, or Calcutta High Court / Supreme Court precedents..."
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    className="w-full p-2.5 border border-border rounded-btn focus:outline-none focus:border-navy-700 leading-relaxed font-sans"
                  />
                  <span className="text-[10px] text-ink-muted">
                    Always respect BCI advertising guidelines: informational and objective, no guarantees or solicitations.
                  </span>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.showOnHomepage}
                      onChange={(e) => setFormData({ ...formData, showOnHomepage: e.target.checked })}
                      className="w-4 h-4 text-navy-700 rounded border-border focus:ring-navy-700"
                    />
                    <div>
                      <span className="font-bold text-ink-950 block">Feature on Homepage</span>
                      <span className="text-[10px] text-ink-muted block">
                        If checked, this question will appear in the FAQ accordion on the main landing page.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-border rounded-btn text-ink-secondary hover:bg-ivory-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-navy-700 hover:bg-blue-600 text-white rounded-btn font-bold transition shadow-sm"
                  >
                    {editingFaq ? "Save Changes" : "Publish FAQ"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
