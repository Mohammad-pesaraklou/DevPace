import { onCLS, onINP, onLCP, onFCP, onTTFB } from "web-vitals/attribution";
import { AnalyticsService } from "../services/analytics";

export function initWebVitalsReporter(): void {
  onLCP((metric) => {
    const debugTarget = metric.attribution?.target || "Unknown LCP Element";

    AnalyticsService.sendEvent({
      eventName: metric.name,
      value: metric.value,
      id: metric.id,
      debugTarget,
    });
  });

  onINP((metric) => {
    // Extract what the user interacted with (e.g. "button#submit-form")
    const debugTarget =
      metric.attribution?.interactionTarget || "Unknown Interaction";

    AnalyticsService.sendEvent({
      eventName: metric.name,
      value: metric.value,
      id: metric.id,
      debugTarget: `${metric.attribution?.interactionType} on ${debugTarget}`,
    });
  });

  onCLS((metric) => {
    const debugTarget =
      metric.attribution?.largestShiftTarget || "Unknown Shift";

    AnalyticsService.sendEvent({
      eventName: metric.name,
      value: metric.value,
      id: metric.id,
      debugTarget,
    });
  });

  onTTFB((metric) => {
    AnalyticsService.sendEvent({
      eventName: metric.name,
      value: metric.value,
      id: metric.id,
    });
  });

  onFCP((metric) => {
    AnalyticsService.sendEvent({
      eventName: metric.name,
      value: metric.value,
      id: metric.id,
    });
  });
}
