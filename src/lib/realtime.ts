"use client";

import { useEffect, useState, useCallback } from "react";
import { platformStore } from "./store";
import {
  SiteConfig,
  CustomService,
  FaqItem,
  BlogPost,
  TeamMemberItem,
  ChambersPrinciple,
} from "./types";

/**
 * Universal Real-time Store Subscriber Hook
 * Listens to:
 * 1. Same-window CustomEvent ('acorn:store_update')
 * 2. Cross-tab BroadcastChannel ('acorn_realtime_sync')
 * 3. Native localStorage 'storage' event fallback
 */
export function useRealtimeStore<T>(key: string, getter: () => T): T {
  const [data, setData] = useState<T>(getter);

  const refresh = useCallback(() => {
    setData(getter());
  }, [getter]);

  useEffect(() => {
    refresh();

    // 1. Same-window event listener
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

    // 3. Fallback native storage event listener
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
export function useRealtimeServices(): CustomService[] {
  const getter = useCallback(() => platformStore.getServices().filter((s) => s.isActive), []);
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
 * Broadcast an update manually if required
 */
export function triggerRealtimeSync(key: string = "all") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("acorn:store_update", { detail: { key } }));
  if ("BroadcastChannel" in window) {
    try {
      const bc = new BroadcastChannel("acorn_realtime_sync");
      bc.postMessage({ key, timestamp: Date.now() });
      bc.close();
    } catch {}
  }
}
