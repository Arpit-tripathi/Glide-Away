


import { GoogleGenAI } from "@google/genai";

async function sendMessage(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const tools = [{ googleSearch: {} }];
  const config = {
    thinkingConfig: { thinkingBudget: -1 },
    tools,
  };

  const model = "gemini-2.5-pro";
  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  try {
    const stream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let finalText = "";
    for await (const chunk of stream) {
      finalText += chunk.text;
    }

    return finalText;
  } catch (error) {
    console.error("Error during Gemini stream:", error);
    throw error;
  }
}

export default { sendMessage };
