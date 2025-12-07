import { paramsType } from "@repo/types/types";

export const HTTP_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/v1"
    : "https://full-stack-assignment-kppp.onrender.com/api/v1";

// for docker
// export const HTTP_URL = "http://server:4000/api/v1";

export function parseBotResponse(rawString: string): {
  relatedTo: paramsType;
  message: string | any[];
} | null {
  if (!rawString || typeof rawString !== "string") return null;

  try {
    let cleaned = rawString.trim();

    // Remove markdown fences
    cleaned = cleaned.replace(/```json|```/g, "").trim();

    /**
     * FIX #1: Handle double-encoded JSON safely
     * If it starts & ends with quotes, it's stringified JSON
     */
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = JSON.parse(cleaned);
    }

    /**
     * FIX #2: Extract JSON object
     */
    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) return null;

    const sliced = cleaned.slice(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(sliced);

    /**
     * FIX #3: Allow message to be string OR array
     */
    if (
      (typeof parsed.relatedTo === "string" || parsed.relatedTo === null) &&
      (typeof parsed.message === "string" || Array.isArray(parsed.message))
    ) {
      return {
        relatedTo: parsed.relatedTo,
        message: parsed.message,
      };
    }

    return null;
  } catch (err) {
    console.error("parseBotResponse error:", err);
    return null;
  }
}
