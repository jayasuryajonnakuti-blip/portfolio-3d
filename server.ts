import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Chat Endpoint (Multi-turn)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    const chat = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        ...(history || []).map((h: any) => ({
          role: h.role,
          parts: [{ text: h.content }]
        })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: "You are the AI Portfolio Assistant for this 3D portfolio. You are helpful, professional, and can answer questions about the portfolio owner's skills, experience, and projects. Keep responses concise and engaging.",
      }
    });

    const result = await chat;
    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
