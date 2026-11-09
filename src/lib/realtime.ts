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
} from "./types";

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
      }
    } catch {}
  }, 50);
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
    globalEventSource.addEventListener("mutation", () => {
      syncBackendDatabase();
    });
    globalEventSource.onerror = () => {
      // Native browser EventSource automatically attempts exponential reconnection
    };
  } catch {}
}

function releaseGlobalSSE() {
  sseSubscriberCount--;
  if (sseSubscriberCount <= 0) {
    sseSubscriberCount = 0;
    if (globalEventSource) {
      globalEventSource.close();
      globalEventSource = null;
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
