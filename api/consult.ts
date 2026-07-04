import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, systemContext } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: "GEMINI_API_KEY environment variable is missing. Configure it in Vercel Environment Variables.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemInstruction = systemContext || `You are the AI Twin & Senior Architecture Assistant for Mohamed Moez Challouf, an elite ERP & Manufacturing Software Engineer / Full-Stack Laravel Developer based in Sousse, Tunisia.
You speak with high technical precision, deep authority on industrial software engineering (Laravel, Filament, Livewire, MES, barcode systems, MySQL, PLC/conveyor integrations, Llama 3.2 vision AI).
When answering questions from CTOs, plant managers, recruiters, or fellow engineers:
- Use clear industrial analogies and technical depth.
- Detail Mohamed's proven achievements scaling digital infrastructure across 4 factories, 127+ Eloquent models, 2,000+ daily scans, AI barcode inventory automation, and zero-downtime manufacturing deployments.
- Be concise, well-structured, and highly analytical.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    return res.json({
      reply: response.text,
    });
  } catch (error: any) {
    console.error("AI MES Consult Error:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while analyzing the system request.",
    });
  }
}
