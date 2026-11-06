import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadInput = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(20).optional().or(z.literal("")),
  lifeStage: z.string().max(40).optional(),
  goals: z.array(z.string().max(50)).max(10).optional(),
  challenges: z.string().max(2000).optional(),
  riskAppetite: z.enum(["conservative", "moderate", "aggressive"]).optional(),
  timeline: z.enum(["asap", "1_month", "3_months", "exploring"]).optional(),
});

function scoreLead(input: z.infer<typeof LeadInput>): number {
  let s = 30;
  if (input.timeline === "asap") s += 35;
  else if (input.timeline === "1_month") s += 25;
  else if (input.timeline === "3_months") s += 15;
  if ((input.goals?.length ?? 0) >= 2) s += 10;
  if (input.challenges && input.challenges.length > 80) s += 10;
  if (input.phone) s += 10;
  if (input.riskAppetite === "aggressive") s += 5;
  return Math.min(s, 100);
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => LeadInput.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const lead_score = scoreLead(data);

    // Generate intent summary via Groq API
    let intent_summary: string | null = null;
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      try {
        const { generateText } = await import("ai");
        const { createGroqProvider } = await import("./ai-gateway.server");
        const provider = createGroqProvider(apiKey);
        const model = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";
        const result = await generateText({
          model: provider(model),
          prompt: `You are a senior financial advisor in India. Read this prospect's intake and write a 2-3 sentence brief for the advisor. Be specific, mention amounts/goals, and suggest the next conversation topic.\n\nLife stage: ${data.lifeStage ?? "unknown"}\nGoals: ${(data.goals ?? []).join(", ") || "not specified"}\nChallenges: ${data.challenges ?? "not specified"}\nRisk appetite: ${data.riskAppetite ?? "unknown"}\nTimeline: ${data.timeline ?? "unknown"}\nLead score: ${lead_score}/100`,
        });
        intent_summary = result.text.slice(0, 1000);
      } catch (err) {
        console.error("intent_summary generation failed", err);
      }
    }

    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        life_stage: data.lifeStage ?? null,
        goals: data.goals ?? null,
        challenges: data.challenges ?? null,
        risk_appetite: data.riskAppetite ?? null,
        timeline: data.timeline ?? null,
        lead_score,
        intent_summary,
      })
      .select("id, lead_score")
      .single();

    if (error) {
      console.error("lead insert failed", error);
      throw new Error("Could not save your request. Please try again.");
    }
    return { id: row.id, leadScore: row.lead_score };
  });
