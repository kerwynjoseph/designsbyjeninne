// Placeholder image management
// Centralizes placeholder SVG/gradient references so real images can be swapped in one place per item

export type PlaceholderType = "portrait" | "landscape-wide" | "square" | "hero";

const placeholders: Record<PlaceholderType, { width: number; height: number; blurDataURL: string }> = {
  portrait: {
    width: 400,
    height: 600,
    blurDataURL:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Crect fill='%23101010' width='400' height='600'/%3E%3C/svg%3E",
  },
  "landscape-wide": {
    width: 1200,
    height: 600,
    blurDataURL:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect fill='%23101010' width='1200' height='600'/%3E%3C/svg%3E",
  },
  square: {
    width: 500,
    height: 500,
    blurDataURL:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Crect fill='%23101010' width='500' height='500'/%3E%3C/svg%3E",
  },
  hero: {
    width: 1920,
    height: 1080,
    blurDataURL:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23050505' width='1920' height='1080'/%3E%3C/svg%3E",
  },
};

export function getPlaceholder(type: PlaceholderType) {
  return placeholders[type] || placeholders.square;
}

// Placeholder image URL generator (SVG with subtle gradient and monogram)
export function getPlaceholderImageUrl(type: PlaceholderType): string {
  const dims = placeholders[type];
  const isDark = true;
  const bgColor = isDark ? "%23101010" : "%23f5f1e8";
  const gradColor1 = "%23ffd766";
  const gradColor2 = "%23d4af37";

  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${dims.width} ${dims.height}'%3E%3Crect fill='${bgColor}' width='${dims.width}' height='${dims.height}'/%3E%3Crect fill='url(%23grad)' width='${dims.width}' height='${dims.height}' opacity='0.08'/%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${gradColor1};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${gradColor2};stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='48' fill='${gradColor1}' text-anchor='middle' dominant-baseline='middle' opacity='0.15'%3EDJ%3C/text%3E%3C/svg%3E`;
}
