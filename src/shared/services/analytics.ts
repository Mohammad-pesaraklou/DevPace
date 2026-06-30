// services/analytics.ts

interface AnalyticsPayload {
  eventName: string;
  value: number;
  id: string;
  debugTarget?: string;
}

export const AnalyticsService = {
  sendEvent({ eventName, value, id, debugTarget }: AnalyticsPayload): void {
    if (typeof window !== "undefined" && (window as any).gtag) {
      // GA4 event structure
      (window as any).gtag("event", eventName, {
        event_category: "Web Vitals",
        event_label: id,
        value:
          eventName === "CLS" ? Math.round(value * 1000) : Math.round(value),
        debug_target: debugTarget || "N/A", // Tracking the exact offending element
        non_interaction: true,
      });
    } else {
      console.log(`[Analytics Debug] ${eventName}:`, {
        value,
        id,
        debugTarget,
      });
    }
  },
};
