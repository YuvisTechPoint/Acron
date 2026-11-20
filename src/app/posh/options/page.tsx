"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Scale,
  Building2,
  PhoneCall,
  AlertTriangle,
  HelpCircle,
  FileText,
  Clock,
  ArrowRight,
  ExternalLink,
  HeartHandshake,
  CheckCircle2,
  Lock,
  Compass,
} from "lucide-react";

interface RemedyRoute {
  code: string;
  title: string;
  forum: string;
  category: "workplace" | "criminal" | "judicial" | "statutory" | "care";
  whoMayUse: string;
  whatItDoes: string;
  timeline: string;
  cost: string;
  contact: string;
  externalLink?: string;
  internalLink?: string;
  mandatoryNotice: string;
}

const REMEDY_ROUTES: RemedyRoute[] = [
  {
    code: "REM-01",
    title: "Internal Committee (IC) Statutory Inquiry",
    forum: "Establishment Internal Committee (POSH Act 2013, Sec. 4, 9–13)",
    category: "workplace",
    whoMayUse: "Any woman who works in, or visits, an establishment with 10 or more employees (regular, contract, intern, visitor).",
    whatItDoes: "Statutory conciliation upon request (without monetary settlement); civil-inquiry powers; recommendations for disciplinary action, interim relief, and compensation.",
    timeline: "Complaint within 3 months (extendable by 3 months for cause); inquiry completed within 90 days; report within 10 days.",
    cost: "Free of cost. Statutory obligation of the employer.",
    contact: "Chambers POSH Secretariat / Designated Presiding Officer",
    internalLink: "/posh/file",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-02",
    title: "District Local Committee (LC)",
    forum: "Office of the District Officer / Local Committee (Sec. 5–7)",
    category: "statutory",
    whoMayUse: "Women in workplaces with fewer than 10 employees, domestic workers, unorganised sector workers, or complaints directly against the employer.",
    whatItDoes: "Vested with identical inquiry powers as an IC; exercises district-wide statutory jurisdiction.",
    timeline: "Nodal Officer forwards within 7 days (Supreme Court 2024 orders); same 90-day inquiry limitation.",
    cost: "Free of cost. State administrative redressal.",
    contact: "District Collectorate / Block Nodal Officer",
    internalLink: "/help/directory",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-03",
    title: "SHe-Box Portal (Central Government)",
    forum: "Ministry of Women and Child Development (Central Redressal)",
    category: "statutory",
    whoMayUse: "Women employees in central government, state government, or private sector organisations nationwide.",
    whatItDoes: "Direct online registration portal that automatically routes the formal complaint to the competent IC/LC and tracks response compliance.",
    timeline: "Monitored dashboard with statutory turnaround alerts.",
    cost: "Free of cost.",
    contact: "shebox.nic.in",
    externalLink: "https://shebox.wcd.gov.in",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-04",
    title: "Police Complaint & Bharatiya Nyaya Sanhita (BNS)",
    forum: "Jurisdictional Police Station / Mahila Police Thana (BNS Sec. 74–79)",
    category: "criminal",
    whoMayUse: "Aggrieved woman; employer has a statutory duty under Sec. 19 to assist with FIR registration if she so requests.",
    whatItDoes: "Registration of First Information Report (FIR), criminal investigation, forensic preservation, and judicial prosecution for offences against women.",
    timeline: "Immediate registration; IC proceedings run parallel and are not delayed by criminal investigation unless stayed by court.",
    cost: "State prosecution — no fee.",
    contact: "Emergency: 112 | Women Helpline: 1090 / 181",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-05",
    title: "Employer Disciplinary Service Proceedings",
    forum: "Service Rules / Model Standing Orders / Disciplinary Authority",
    category: "workplace",
    whoMayUse: "Employees in organisations with governed service rules, on the recommendation of the IC.",
    whatItDoes: "Written reprimand, withholding of increments/promotions, suspension, termination, or deduction from salary.",
    timeline: "Employer is statutorily mandated to implement recommendations within 60 days of report receipt (Sec. 13(4)).",
    cost: "Internal organizational proceeding.",
    contact: "Competent Disciplinary Authority",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-06",
    title: "Statutory Appeal Against IC / LC Recommendations",
    forum: "Appellate Authority under Service Rules or Industrial Tribunal / Court (Sec. 18)",
    category: "judicial",
    whoMayUse: "Either complainant or respondent aggrieved by recommendations or non-implementation.",
    whatItDoes: "Judicial review of procedural irregularities, violation of natural justice, or perverse findings.",
    timeline: "Must be filed within 90 days of the recommendations (Sec. 18(2)).",
    cost: "Tribunal court fees applicable.",
    contact: "High Court / Industrial Tribunal registry",
    internalLink: "/contact",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-07",
    title: "Constitutional Writ Petition (Articles 226 & 32)",
    forum: "High Court of Judicature / Supreme Court of India",
    category: "judicial",
    whoMayUse: "Parties challenging arbitrary state action, public employer failures, or jurisdictional defects.",
    whatItDoes: "High prerogative writs (Certiorari, Mandamus) quashing unlawful proceedings, enforcing committee constitution, and granting interim stays.",
    timeline: "Expedited filing; limitation dependent on cause of action.",
    cost: "Standard High Court litigation schedule.",
    contact: "Chambers Appellate Litigation Desk",
    internalLink: "/contact",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-08",
    title: "Civil Suit for Damages, Defamation & Injunction",
    forum: "City Civil Court / Principal District Judge",
    category: "judicial",
    whoMayUse: "Either party claiming civil damages, reputational injury, or statutory breach of confidentiality (Sec. 16/17).",
    whatItDoes: "Monetary compensation, permanent injunctions, and declaratory relief.",
    timeline: "Governed by the Limitation Act, 1963.",
    cost: "Ad-valorem court fees.",
    contact: "Chambers Civil Litigation Department",
    internalLink: "/contact",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-09",
    title: "Labour Court & Industrial Dispute Redressal",
    forum: "Labour Court / Industrial Tribunal (Industrial Disputes Act, 1947)",
    category: "judicial",
    whoMayUse: "Workmen alleging retaliation, unfair dismissal, or adverse job modification following a grievance.",
    whatItDoes: "Reinstatement with back wages, quashing of retaliatory termination, conciliation orders.",
    timeline: "Statutory dispute reference timelines apply.",
    cost: "Nominal tribunal charges.",
    contact: "Chambers Labour Advisory",
    internalLink: "/contact",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-10",
    title: "National & State Commissions for Women (NCW)",
    forum: "National Commission for Women / State Commission",
    category: "statutory",
    whoMayUse: "Any aggrieved woman, or registered representative on her behalf, or taken suo motu.",
    whatItDoes: "Investigatory inquiries, summoning authorities, recommending criminal action, monitoring systemic compliance.",
    timeline: "Ongoing statutory grievance desk.",
    cost: "Free of cost.",
    contact: "ncw.nic.in | 7827170170 (24x7 Helpline)",
    externalLink: "http://ncw.nic.in",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-11",
    title: "NALSA Free Legal Aid & DLSA Clinics",
    forum: "National & State / District Legal Services Authorities",
    category: "care",
    whoMayUse: "Women (statutorily entitled to free legal aid under Section 12 of the Legal Services Authorities Act, 1987).",
    whatItDoes: "Assignment of free legal counsel, paralegal assistance, drafting support, and representation before ICs, LCs, and courts.",
    timeline: "Immediate assignment through front offices.",
    cost: "100% Free of cost for women.",
    contact: "NALSA Helpline: 15100 (Pan-India)",
    externalLink: "https://nalsa.gov.in",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-12",
    title: "Women's 24x7 Emergency Helplines & One Stop (Sakhi) Centres",
    forum: "National Emergency Network (MoWCD & MHA)",
    category: "care",
    whoMayUse: "Any woman in immediate distress, danger, or requiring crisis intervention.",
    whatItDoes: "Immediate police dispatch, integrated medical aid, emergency shelter, psycho-social counselling, and legal facilitation under one roof.",
    timeline: "Instant 24x7 response.",
    cost: "Free of cost.",
    contact: "Dial 181 (Women's Helpline) | 112 (Emergency)",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-13",
    title: "Tele-MANAS & Trauma-Informed Psychological Support",
    forum: "Ministry of Health & Family Welfare / Certified Counsellors",
    category: "care",
    whoMayUse: "Complainants, respondents, witnesses, or IC members facing psychological distress or secondary trauma.",
    whatItDoes: "Free tele-mental health consultations, professional psychiatric referral, crisis debriefing. Strictly confidential with zero case data stored.",
    timeline: "Available 24 hours a day, 365 days a year.",
    cost: "Free of cost.",
    contact: "Tele-MANAS Toll-Free: 14416 / 1800 891 4416",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-14",
    title: "National Cyber Crime Reporting Portal",
    forum: "Indian Cybercrime Coordination Centre (I4C), MHA",
    category: "criminal",
    whoMayUse: "Anyone experiencing cyber harassment, cyber stalking, non-consensual image sharing, voyeurism, or digital intimidation.",
    whatItDoes: "Anonymous or formal complaint lodging, takedown notices to social platforms and digital intermediaries under IT Act Sec. 79.",
    timeline: "Preserve metadata, URL, screenshots, and device logs immediately.",
    cost: "Free of cost.",
    contact: "cybercrime.gov.in | Cyber Helpline: 1930",
    externalLink: "https://cybercrime.gov.in",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-15",
    title: "District Officer Compliance Inspection & Penal Action",
    forum: "Office of the District Magistrate / Collector (Sec. 20–26)",
    category: "statutory",
    whoMayUse: "Employees or stakeholders reporting employer failure to constitute an IC or submit statutory annual returns.",
    whatItDoes: "Regulatory inspection of records, summoning registers, imposition of statutory fines up to ₹50,000 (doubled for repeat), cancellation of business licenses.",
    timeline: "Annual inspection and reporting audits.",
    cost: "Public compliance duty.",
    contact: "Designated District Officer (Collectorate)",
    internalLink: "/help/directory",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-16",
    title: "Corporate Board & Audit Committee Whistle-Blower Desk",
    forum: "Companies Act 2013, Sec. 177 / SEBI (LODR) Regulations",
    category: "workplace",
    whoMayUse: "Employees and directors of corporate entities where leadership or IC composition is compromised.",
    whatItDoes: "Independent Board scrutiny, mandatory reporting in Director's Report, forensic governance review.",
    timeline: "Quarterly Audit Committee oversight; annual public disclosure.",
    cost: "Internal governance mechanism.",
    contact: "Chambers Corporate Governance Desk",
    internalLink: "/contact",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
  {
    code: "REM-17",
    title: "Statutory Medical Treatment & Medicolegal Care",
    forum: "Government Hospital / Certified Healthcare Facilities",
    category: "care",
    whoMayUse: "Any woman where physical violence, assault, or bodily trauma has occurred or is threatened.",
    whatItDoes: "Immediate free medical care, injury documentation (MLC report), evidence preservation pursuant to Section 357C CrPC / BNSS.",
    timeline: "Immediate emergency access required.",
    cost: "Statutorily free in government and private hospitals.",
    contact: "Emergency: 108 / 112",
    mandatoryNotice: "Using the Internal Committee does not remove your right to approach the police or a court.",
  },
];

export default function PoshOptionsPage() {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredRoutes = REMEDY_ROUTES.filter((route) => {
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "workplace" && route.category === "workplace") ||
      (selectedTab === "criminal" && route.category === "criminal") ||
      (selectedTab === "judicial" && route.category === "judicial") ||
      (selectedTab === "statutory" && route.category === "statutory") ||
      (selectedTab === "care" && route.category === "care");

    const matchesSearch =
      searchQuery.trim() === "" ||
      route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.forum.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.whatItDoes.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-ivory-50 text-ink pt-28 pb-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-navy-700/70 mb-3">
            <Link href="/" className="hover:underline">Chambers</Link>
            <span>/</span>
            <Link href="/posh" className="hover:underline">POSH Redressal</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Remedies & Legal Pathways</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ivory-300">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-navy-100 text-navy-800 border border-navy-200 mb-3">
                <Scale className="w-3.5 h-3.5 text-navy-700" />
                PRD Section 8.34 & Phase 7 Statutory Blueprint
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-navy-950 tracking-tight font-normal">
                Remedies & Statutory Pathways Directory
              </h1>
              <p className="mt-2 text-sm sm:text-base text-ink-muted max-w-3xl leading-relaxed">
                A calm, objective, plain-language catalogue of all 17 legal remedies and relief forums available under Indian law. No route is ranked or preselected. You are fully entitled to select the pathway that suits your circumstances.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/posh/file"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium bg-navy-700 hover:bg-navy-800 text-white shadow-sm transition-colors"
              >
                <span>Proceed to IC Intake</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Universal Statutory Neutrality Banner */}
        <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-md mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Statutory Independence & Universal Non-Exclusivity Notice
              </p>
              <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                <strong>&ldquo;Using the Internal Committee does not remove your right to approach the police or a court.&rdquo;</strong> All statutory forums under Indian jurisprudence operate independently. Pursuing an organizational inquiry never impairs or extinguishes your constitutional, civil, or criminal rights.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-ivory-200/60 rounded-lg border border-ivory-300">
            {[
              { id: "all", label: "All 17 Pathways" },
              { id: "workplace", label: "Internal Committee & Workplace" },
              { id: "criminal", label: "Police & Criminal Law" },
              { id: "judicial", label: "Courts & Appellate Forums" },
              { id: "statutory", label: "Commissions & Regulators" },
              { id: "care", label: "Emergency & Helplines" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  selectedTab === tab.id
                    ? "bg-navy-700 text-white shadow-sm"
                    : "text-ink-muted hover:text-navy-900 hover:bg-ivory-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forum, statute or remedy..."
              className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-ivory-300 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-700 focus:border-navy-700"
            />
          </div>
        </div>

        {/* Pathways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.code}
              className="bg-white border border-ivory-300 rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-ivory-100 text-navy-800 border border-ivory-300">
                    {route.code}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-ink-muted/80 font-mono">
                    {route.category}
                  </span>
                </div>

                <h3 className="font-serif text-lg text-navy-950 font-semibold leading-snug mb-1">
                  {route.title}
                </h3>
                <p className="text-xs text-navy-700 font-medium mb-3">
                  {route.forum}
                </p>

                <div className="space-y-2 text-xs text-ink/80 pt-2 border-t border-ivory-200">
                  <div>
                    <span className="font-medium text-navy-900 block">Who may use it:</span>
                    <span className="text-ink-muted">{route.whoMayUse}</span>
                  </div>
                  <div>
                    <span className="font-medium text-navy-900 block">Relief / Statutory Powers:</span>
                    <span className="text-ink-muted">{route.whatItDoes}</span>
                  </div>
                  <div>
                    <span className="font-medium text-navy-900 block">Statutory Timeline:</span>
                    <span className="text-ink-muted flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-navy-700 shrink-0" />
                      {route.timeline}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-navy-900 block">Financial Cost:</span>
                    <span className="text-ink-muted">{route.cost}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-ivory-200">
                <p className="text-[10px] text-amber-800 bg-amber-50/60 p-1.5 rounded mb-3 leading-tight border border-amber-200/50">
                  {route.mandatoryNotice}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-muted font-mono truncate max-w-[150px]">
                    {route.contact}
                  </span>
                  {route.internalLink ? (
                    <Link
                      href={route.internalLink}
                      className="inline-flex items-center gap-1 text-navy-700 hover:text-navy-900 font-medium"
                    >
                      <span>Access</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ) : route.externalLink ? (
                    <a
                      href={route.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-navy-700 hover:text-navy-900 font-medium"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-ink-muted">Inquire via Chambers</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky Neutrality & Counsel Verification Footer */}
        <div className="mt-12 bg-white border border-ivory-300 rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-serif text-base text-navy-950 font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-navy-700" />
                Statutory Directory Governed Under Acorn Fiduciary Standards
              </h4>
              <p className="text-xs text-ink-muted max-w-2xl leading-relaxed">
                All statutory directories undergo rolling 180-day counsel audits. This platform provides objective information; it never acts as legal advice, never pre-selects forums, and does not replace the judicial discretion of an inquiry committee.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/help/directory"
                className="px-4 py-2 border border-ivory-300 hover:bg-ivory-100 rounded text-xs font-medium text-navy-800 transition-colors"
              >
                Emergency Helplines
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded text-xs font-medium transition-colors"
              >
                Contact Chambers Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
