import type { Json } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

export type Level = "alta" | "media" | "baixa";

export type LeadAnalysis = {
  priority: Level;
  intent: Level;
  urgency: Level;
  summary: string;
  reasons: string[];
  next_action: string;
  draft_message: string;
  confidence: number;
};

export type AnalysisHistoryEntry = {
  id: string;
  analysis: LeadAnalysis;
  createdAt: string;
  approvedAt: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseAnalysis(value: unknown): LeadAnalysis | null {
  if (!isRecord(value)) return null;
  const { priority, intent, urgency, summary, reasons, next_action, draft_message, confidence } = value;
  if (!["alta", "media", "baixa"].includes(String(priority))
    || !["alta", "media", "baixa"].includes(String(intent))
    || !["alta", "media", "baixa"].includes(String(urgency))
    || typeof summary !== "string"
    || !Array.isArray(reasons)
    || !reasons.every((reason) => typeof reason === "string")
    || typeof next_action !== "string"
    || typeof draft_message !== "string"
    || typeof confidence !== "number") return null;
  return { priority: priority as Level, intent: intent as Level, urgency: urgency as Level, summary, reasons, next_action, draft_message, confidence };
}

function toJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}

export async function saveLeadAnalysis(leadId: string, analysis: LeadAnalysis) {
  const id = crypto.randomUUID();
  const { data, error } = await supabase.from("lead_interactions").insert({
    lead_id: leadId,
    interaction_type: "ai_analysis_generated",
    interaction_data: toJson({ analysis_id: id, analysis, approval_status: "pending" }),
  }).select("created_at").single();
  if (error) throw error;
  return { id, analysis, createdAt: data.created_at, approvedAt: null } satisfies AnalysisHistoryEntry;
}

export async function approveLeadAnalysis(leadId: string, entry: AnalysisHistoryEntry) {
  if (entry.approvedAt) return entry;
  const approvedAt = new Date().toISOString();
  const { error } = await supabase.from("lead_interactions").insert({
    lead_id: leadId,
    interaction_type: "ai_recommendation_approved",
    interaction_data: toJson({ analysis_id: entry.id, approved_at: approvedAt, priority: entry.analysis.priority }),
  });
  if (error) throw error;
  return { ...entry, approvedAt };
}

export async function loadLeadAnalysisHistory(leadIds: string[]) {
  const historyByLead = new Map<string, AnalysisHistoryEntry[]>();
  if (leadIds.length === 0) return historyByLead;

  const { data, error } = await supabase
    .from("lead_interactions")
    .select("id, lead_id, interaction_type, interaction_data, created_at")
    .in("lead_id", leadIds)
    .in("interaction_type", ["ai_analysis_generated", "ai_recommendation_approved"])
    .order("created_at", { ascending: true });
  if (error) throw error;

  const approvals = new Map<string, string>();
  for (const row of data ?? []) {
    const details = row.interaction_data;
    if (row.interaction_type === "ai_recommendation_approved" && isRecord(details)
      && typeof details.analysis_id === "string") {
      approvals.set(details.analysis_id, typeof details.approved_at === "string" ? details.approved_at : row.created_at);
    }
  }

  for (const row of data ?? []) {
    if (row.interaction_type !== "ai_analysis_generated" || !isRecord(row.interaction_data)) continue;
    const details = row.interaction_data;
    const analysis = parseAnalysis(details.analysis);
    if (!analysis || typeof details.analysis_id !== "string") continue;
    const entry: AnalysisHistoryEntry = {
      id: details.analysis_id,
      analysis,
      createdAt: row.created_at,
      approvedAt: approvals.get(details.analysis_id) ?? null,
    };
    const entries = historyByLead.get(row.lead_id) ?? [];
    entries.push(entry);
    historyByLead.set(row.lead_id, entries);
  }
  return historyByLead;
}

export function whatsappDraftUrl(phone: string | null | undefined, message: string) {
  const digits = phone?.replace(/\D/g, "") ?? "";
  if (digits.length < 10 || digits.length > 15) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
