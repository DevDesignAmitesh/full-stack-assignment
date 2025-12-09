import { paramsType } from "@repo/types/types";

export const HTTP_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/v1"
    : "https://full-stack-assignment-kppp.onrender.com/api/v1";

// for docker
// export const HTTP_URL = "http://server:4000/api/v1";

export function parseBotResponse(rawString: string):
  | {
      relatedTo: paramsType;
      message: string | any[];
    }[]
  | null {
  if (!rawString || typeof rawString !== "string") return null;

  try {
    let cleaned = rawString.trim();

    // Remove markdown fences
    cleaned = cleaned.replace(/```json|```/g, "").trim();

    // Handle double-encoded JSON
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = JSON.parse(cleaned);
    }

    // Parse JSON
    const parsed = JSON.parse(cleaned);

    // ✅ NEW: ensure it's an array
    if (!Array.isArray(parsed)) return null;

    // Validate each item
    return parsed.filter(
      (item) =>
        (typeof item.relatedTo === "string" || item.relatedTo === null) &&
        (typeof item.message === "string" || Array.isArray(item.message))
    );
  } catch (err) {
    console.error("parseBotResponse error:", err);
    return null;
  }
}
