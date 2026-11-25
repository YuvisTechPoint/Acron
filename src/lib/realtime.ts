"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { platformStore } from "./store";
import {
  SiteConfig,
  CustomService,
  FaqItem,
  BlogPost,
  TeamMemberItem,
  ChambersPrinciple,
  ServiceRequest,
  POSHCase,
  QuestionAnswer,
  PaymentTransaction,
  ScriptTag,
  LegalRule,
  SystemSettings,
  CatalogueFeeItem,
  DeliveryTask,
  DirectoryItem,
  HelpdeskTicket,
  KbArticle,
  CourtHoliday,
  LegalWatchItem,
  LegalTemplateItem,
  LegalPrecedentItem,
  LmsCourse,
  MediaVaultItem,
  NotificationLogItem,
  PaymentLinkItem,
  AdminUserItem,
  SurveyItem,
  AuditLogEntry,
  SeoSettings,
  SeoRedirectItem,
  PageContentItem,
  AIFeatureDefinition,
  SLOMonitorMetric,
  TrustDPIARecord,
  SubProcessorItem,
  Organization,
  ICMember,
  SopItem,
  GoLiveChecklistItem,
  OpsTelemetryData,
  PageSectionItem,
} from "./types";

export type RealtimeSyncStatus = "connected" | "connecting" | "disconnected";

let currentStatus: RealtimeSyncStatus = "connecting";
let lastSyncTimestamp: Date | null = null;
const statusListeners = new Set<() => void>();

function notifyStatusChange() {
  statusListeners.forEach((fn) => {
    try {
      fn();
    } catch {}
  });
}

let syncDebounceTimer: NodeJS.Timeout | null = null;

export function syncBackendDatabase() {
  if (syncDebounceTimer) return;
  syncDebounceTimer = setTimeout(async () => {
    syncDebounceTimer = null;
    try {
      const res = await fetch("/api/sync");
      if (res.ok) {
        const json = await res.json();
        if (json && json.data) {
          platformStore.hydrateFromDatabase(json.data);
        }
        lastSyncTimestamp = new Date();
        currentStatus = "connected";
        notifyStatusChange();
      }
    } catch {
      currentStatus = "disconnected";
      notifyStatusChange();
    }
  }, 50);
}

export async function manualSyncBackend(): Promise<boolean> {
  try {
    const res = await fetch("/api/sync");
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        platformStore.hydrateFromDatabase(json.data);
      }
      lastSyncTimestamp = new Date();
      currentStatus = "connected";
      notifyStatusChange();
      return true;
    }
    currentStatus = "disconnected";
    notifyStatusChange();
    return false;
  } catch {
    currentStatus = "disconnected";
    notifyStatusChange();
    return false;
  }
}

/**
 * Real-time SSE Connection Status Hook
 * Returns active connection state, last synchronized timestamp, and manual sync action.
 */
export function useRealtimeConnectionStatus() {
  const [status, setStatus] = useState<RealtimeSyncStatus>(currentStatus);
  const [lastSync, setLastSync] = useState<Date | null>(lastSyncTimestamp);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    const listener = () => {
      setStatus(currentStatus);
      setLastSync(lastSyncTimestamp);
    };
    statusListeners.add(listener);
    ensureGlobalSSE();
    return () => {
      statusListeners.delete(listener);
    };
  }, []);

  const triggerManualSync = useCallback(async () => {
    setIsSyncing(true);
    await manualSyncBackend();
    setIsSyncing(false);
  }, []);

  return {
    status,
    isConnected: status === "connected",
    lastSync,
    isSyncing,
    manualSync: triggerManualSync,
  };
}

// Universal Tab Singleton SSE Manager to prevent HTTP/1.1 connection limit exhaustion (max 6 connections)
let globalEventSource: EventSource | null = null;
let sseSubscriberCount = 0;
let initialSyncDone = false;

function ensureGlobalSSE() {
  if (typeof window === "undefined" || !("EventSource" in window)) return;

  // Proactive initial sync to guarantee fresh database state on cold page loads
  if (!initialSyncDone) {
    initialSyncDone = true;
    syncBackendDatabase();
  }

  sseSubscriberCount++;
  if (globalEventSource) return;

  try {
    globalEventSource = new EventSource("/api/sync/stream");
    globalEventSource.onopen = () => {
      currentStatus = "connected";
      lastSyncTimestamp = new Date();
      notifyStatusChange();
    };
    globalEventSource.addEventListener("connected", () => {
      currentStatus = "connected";
      lastSyncTimestamp = new Date();
      notifyStatusChange();
    });
    globalEventSource.addEventListener("mutation", () => {
      syncBackendDatabase();
    });
    globalEventSource.onerror = () => {
      // Native browser EventSource automatically attempts exponential reconnection
      currentStatus = "disconnected";
      notifyStatusChange();
    };
  } catch {
    currentStatus = "disconnected";
    notifyStatusChange();
  }
}

function releaseGlobalSSE() {
  sseSubscriberCount--;
  if (sseSubscriberCount <= 0) {
    sseSubscriberCount = 0;
    if (globalEventSource) {
      globalEventSource.close();
      globalEventSource = null;
      currentStatus = "disconnected";
      notifyStatusChange();
    }
  }
}

/**
 * Universal Real-time Store & Database Subscriber Hook
 * Listens to:
 * 1. Same-window CustomEvent ('acorn:store_update')
 * 2. Cross-tab BroadcastChannel ('acorn_realtime_sync')
 * 3. Shared Singleton Server-Sent Events (SSE) live database mutation stream
 * 4. Native localStorage 'storage' event fallback
 */
export function useRealtimeStore<T>(key: string, getter: () => T): T {
  const [data, setData] = useState<T>(getter);

  const refresh = useCallback(() => {
    setData(getter());
  }, [getter]);

  useEffect(() => {
    platformStore.setMounted(true);
    refresh();

    // 1. Same-window event listener (fired immediately after database hydration & local mutations)
    const handleLocalUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; value: unknown }>;
      if (!customEvent.detail || customEvent.detail.key === key || customEvent.detail.key === "all") {
        refresh();
      }
    };
    window.addEventListener("acorn:store_update", handleLocalUpdate);

    // 2. Cross-tab BroadcastChannel listener
    let bc: BroadcastChannel | null = null;
    if ("BroadcastChannel" in window) {
      try {
        bc = new BroadcastChannel("acorn_realtime_sync");
        bc.onmessage = (event) => {
          if (!event.data || event.data.key === key || event.data.key === "all") {
            refresh();
          }
        };
      } catch {}
    }

    // 3. Shared Singleton SSE Connection
    ensureGlobalSSE();

    // 4. Fallback native storage event listener
    const handleStorage = (e: StorageEvent) => {
      if (!e.key || e.key === `acorn_${key}`) {
        refresh();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("acorn:store_update", handleLocalUpdate);
      window.removeEventListener("storage", handleStorage);
      if (bc) {
        bc.close();
      }
      releaseGlobalSSE();
    };
  }, [key, refresh]);

  return data;
}

/**
 * Real-time Site Configuration Hook
 * Synchronizes firm branding, hero copy, contact info, live ticker, and disclaimers.
 */
export function useRealtimeSiteConfig(): SiteConfig {
  const getter = useCallback(() => platformStore.getSiteConfig(), []);
  return useRealtimeStore<SiteConfig>("site_config", getter);
}

/**
 * Real-time Practice Areas & Custom Services Hook
 */
export function useRealtimeServices(includeInactive = false): CustomService[] {
  const getter = useCallback(
    () => (includeInactive ? platformStore.getServices() : platformStore.getServices().filter((s) => s.isActive)),
    [includeInactive]
  );
  return useRealtimeStore<CustomService[]>("custom_services", getter);
}

/**
 * Real-time FAQs Hook
 */
export function useRealtimeFaqs(): FaqItem[] {
  const getter = useCallback(() => platformStore.getFaqs(), []);
  return useRealtimeStore<FaqItem[]>("platform_faqs", getter);
}

/**
 * Real-time Blog & Insights Posts Hook
 */
export function useRealtimePosts(): BlogPost[] {
  const getter = useCallback(() => platformStore.getBlogs(), []);
  return useRealtimeStore<BlogPost[]>("blogs", getter);
}

/**
 * Real-time Chambers Team Profiles Hook
 */
export function useRealtimeTeam(): TeamMemberItem[] {
  const getter = useCallback(() => platformStore.getTeamMembers(), []);
  return useRealtimeStore<TeamMemberItem[]>("team_members", getter);
}

/**
 * Real-time Client Service Requests Hook
 */
export function useRealtimeRequests(): ServiceRequest[] {
  const getter = useCallback(() => platformStore.getServiceRequests(), []);
  return useRealtimeStore<ServiceRequest[]>("service_requests", getter);
}

/**
 * Real-time POSH Cases & Dockets Hook
 */
export function useRealtimeCases(): POSHCase[] {
  const getter = useCallback(() => platformStore.getCases(), []);
  return useRealtimeStore<POSHCase[]>("cases", getter);
}

/**
 * Real-time Q&A Queue Hook
 */
export function useRealtimeQuestions(): QuestionAnswer[] {
  const getter = useCallback(() => platformStore.getQuestions(), []);
  return useRealtimeStore<QuestionAnswer[]>("qa_list", getter);
}

/**
 * Real-time Payment Transactions Hook
 */
export function useRealtimePayments(): PaymentTransaction[] {
  const getter = useCallback(() => platformStore.getPayments(), []);
  return useRealtimeStore<PaymentTransaction[]>("payments", getter);
}

/**
 * Real-time Injected Third-party Scripts & Pixel Tags Hook
 */
export function useRealtimeScripts(): ScriptTag[] {
  const getter = useCallback(() => platformStore.getScripts(), []);
  return useRealtimeStore<ScriptTag[]>("scripts", getter);
}

/**
 * Real-time Statutory Legal Rules Hook
 */
export function useRealtimeLegalRules(): LegalRule[] {
  const getter = useCallback(() => platformStore.getLegalRules(), []);
  return useRealtimeStore<LegalRule[]>("legal_rules", getter);
}

/**
 * Real-time System Infrastructure & Gateway Settings Hook
 */
export function useRealtimeSystemSettings(): SystemSettings {
  const getter = useCallback(() => platformStore.getSystemSettings(), []);
  return useRealtimeStore<SystemSettings>("system_settings", getter);
}

/**
 * Real-time Payment Fee Catalogue Hook
 */
export function useRealtimeCatalogue(): CatalogueFeeItem[] {
  const getter = useCallback(() => platformStore.getCatalogueItems(), []);
  return useRealtimeStore<CatalogueFeeItem[]>("catalogue_items", getter);
}

/**
 * Real-time Delivery & Fulfillment Tasks Hook
 */
export function useRealtimeDeliveryTasks(): DeliveryTask[] {
  const getter = useCallback(() => platformStore.getDeliveryTasks(), []);
  return useRealtimeStore<DeliveryTask[]>("delivery_tasks", getter);
}

/**
 * Real-time Statutory Directory & Helplines Hook
 */
export function useRealtimeDirectory(): DirectoryItem[] {
  const getter = useCallback(() => platformStore.getDirectory(), []);
  return useRealtimeStore<DirectoryItem[]>("directory_items", getter);
}

/**
 * Real-time Helpdesk & Support Tickets Hook
 */
export function useRealtimeHelpdeskTickets(): HelpdeskTicket[] {
  const getter = useCallback(() => platformStore.getHelpdeskTickets(), []);
  return useRealtimeStore<HelpdeskTicket[]>("helpdesk_tickets", getter);
}

/**
 * Real-time Knowledge Base Articles Hook
 */
export function useRealtimeKbArticles(): KbArticle[] {
  const getter = useCallback(() => platformStore.getKbArticles(), []);
  return useRealtimeStore<KbArticle[]>("kb_articles", getter);
}

/**
 * Real-time Court Holidays & Calendars Hook
 */
export function useRealtimeCourtHolidays(): CourtHoliday[] {
  const getter = useCallback(() => platformStore.getHolidays(), []);
  return useRealtimeStore<CourtHoliday[]>("court_holidays", getter);
}

/**
 * Real-time Legal Precedents & Regulatory Watch Hook
 */
export function useRealtimeLegalWatch(): LegalWatchItem[] {
  const getter = useCallback(() => platformStore.getLegalWatchItems(), []);
  return useRealtimeStore<LegalWatchItem[]>("legal_watch_items", getter);
}

/**
 * Real-time Legal Templates CMS Hook
 */
export function useRealtimeLegalTemplates(): LegalTemplateItem[] {
  const getter = useCallback(() => platformStore.getLegalTemplates(), []);
  return useRealtimeStore<LegalTemplateItem[]>("legal_templates", getter);
}

/**
 * Real-time Judicial Authorities Register Hook
 */
export function useRealtimeLegalPrecedents(): LegalPrecedentItem[] {
  const getter = useCallback(() => platformStore.getLegalPrecedents(), []);
  return useRealtimeStore<LegalPrecedentItem[]>("legal_precedents", getter);
}

/**
 * Real-time LMS Courses & Training Curriculum Hook
 */
export function useRealtimeLmsCourses(): LmsCourse[] {
  const getter = useCallback(() => platformStore.getLmsCourses(), []);
  return useRealtimeStore<LmsCourse[]>("lms_courses", getter);
}

/**
 * Real-time Media Vault Hook
 */
export function useRealtimeMediaVault(): MediaVaultItem[] {
  const getter = useCallback(() => platformStore.getMediaVault(), []);
  return useRealtimeStore<MediaVaultItem[]>("media_vault", getter);
}

/**
 * Real-time Notification Logs Hook
 */
export function useRealtimeNotificationLogs(): NotificationLogItem[] {
  const getter = useCallback(() => platformStore.getNotificationLogs(), []);
  return useRealtimeStore<NotificationLogItem[]>("notification_logs", getter);
}

/**
 * Real-time Payment Links Generator Hook
 */
export function useRealtimePaymentLinks(): PaymentLinkItem[] {
  const getter = useCallback(() => platformStore.getPaymentLinks(), []);
  return useRealtimeStore<PaymentLinkItem[]>("payment_links", getter);
}

/**
 * Real-time Admin Users & Staff RBAC Hook
 */
export function useRealtimeAdminUsers(): AdminUserItem[] {
  const getter = useCallback(() => platformStore.getAdminUsers(), []);
  return useRealtimeStore<AdminUserItem[]>("admin_users", getter);
}

/**
 * Real-time Workplace Climate Surveys Hook
 */
export function useRealtimeSurveys(): SurveyItem[] {
  const getter = useCallback(() => platformStore.getSurveys(), []);
  return useRealtimeStore<SurveyItem[]>("surveys", getter);
}

/**
 * Real-time Cryptographic Audit Trail Hook
 */
export function useRealtimeAuditLogs(): AuditLogEntry[] {
  const getter = useCallback(() => platformStore.getAuditLogs(), []);
  return useRealtimeStore<AuditLogEntry[]>("audit_logs", getter);
}

/**
 * Real-time Global SEO Settings Hook
 */
export function useRealtimeSeoSettings(): SeoSettings {
  const getter = useCallback(() => platformStore.getSeoSettings(), []);
  return useRealtimeStore<SeoSettings>("seo_settings", getter);
}

/**
 * Real-time SEO URL 301 Redirects Hook
 */
export function useRealtimeSeoRedirects(): SeoRedirectItem[] {
  const getter = useCallback(() => platformStore.getSeoRedirects(), []);
  return useRealtimeStore<SeoRedirectItem[]>("seo_redirects", getter);
}

/**
 * Real-time Static Page Content Hook
 */
export function useRealtimePages(): PageContentItem[] {
  const getter = useCallback(() => platformStore.getAllPages(), []);
  return useRealtimeStore<PageContentItem[]>("static_pages", getter);
}

/**
 * Real-time AI Capability Register Hook
 */
export function useRealtimeAIFeatures(): AIFeatureDefinition[] {
  const getter = useCallback(() => platformStore.getAIFeatures(), []);
  return useRealtimeStore<AIFeatureDefinition[]>("ai_features", getter);
}

/**
 * Real-time SRE SLO Monitor Metrics Hook
 */
export function useRealtimeSLOMetrics(): SLOMonitorMetric[] {
  const getter = useCallback(() => platformStore.getSLOMetrics(), []);
  return useRealtimeStore<SLOMonitorMetric[]>("slo_metrics", getter);
}

/**
 * Real-time DPIA & Trust Records Hook
 */
export function useRealtimeTrustDPIA(): TrustDPIARecord[] {
  const getter = useCallback(() => platformStore.getTrustDPIARecords(), []);
  return useRealtimeStore<TrustDPIARecord[]>("trust_dpia_records", getter);
}

/**
 * Real-time Sub-processors Register Hook
 */
export function useRealtimeSubProcessors(): SubProcessorItem[] {
  const getter = useCallback(() => platformStore.getSubProcessors(), []);
  return useRealtimeStore<SubProcessorItem[]>("sub_processors", getter);
}

/**
 * Real-time Organizations Directory Hook
 */
export function useRealtimeOrganizations(): Organization[] {
  const getter = useCallback(() => platformStore.getOrganizations(), []);
  return useRealtimeStore<Organization[]>("organizations", getter);
}

/**
 * Real-time IC Members Roster Hook
 */
export function useRealtimeICMembers(orgId?: string): ICMember[] {
  const getter = useCallback(() => platformStore.getICMembers(orgId), [orgId]);
  return useRealtimeStore<ICMember[]>("ic_members", getter);
}

/**
 * Real-time SOP Recurrence Register Hook
 */
export function useRealtimeSopRegister(): SopItem[] {
  const getter = useCallback(() => platformStore.getSopRegister(), []);
  return useRealtimeStore<SopItem[]>("sop_register", getter);
}

/**
 * Real-time Go-Live Verification Gate Hook
 */
export function useRealtimeGoLiveGate(): GoLiveChecklistItem[] {
  const getter = useCallback(() => platformStore.getGoLiveGate(), []);
  return useRealtimeStore<GoLiveChecklistItem[]>("golive_gate", getter);
}

/**
 * Real-time Ops Command Centre Telemetry Hook
 */
export function useRealtimeOpsTelemetry(): OpsTelemetryData {
  const getter = useCallback(() => platformStore.getOpsTelemetry(), []);
  return useRealtimeStore<OpsTelemetryData>("ops_telemetry", getter);
}

/**
 * Real-time Homepage Sections Layout Hook
 */
export function useRealtimePageSections(): PageSectionItem[] {
  const getter = useCallback(() => platformStore.getPageSections(), []);
  return useRealtimeStore<PageSectionItem[]>("page_sections", getter);
}

/**
 * Generic Real-time Persistent Collection Hook
 * Ensures every console module syncs across tabs and persists to /api/sync.
 */
export function useRealtimeCollection<T>(key: string, seed: T): T {
  const getter = useCallback(() => platformStore.getCollectionState<T>(key, seed), [key, seed]);
  return useRealtimeStore<T>(key, getter);
}

