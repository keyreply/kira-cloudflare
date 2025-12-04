import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
// Note: In a real production app, this key should be in an environment variable
// and calls should ideally be proxied through a backend to protect the key.
// For this demo, we'll check if a key is provided in .env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI = null;
let model = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-pro" });
}

export const generateGeminiResponse = async (prompt, context = '') => {
    if (!model) {
        console.warn("Gemini API Key not found. Returning mock response.");
        return null; // Signal to use fallback mock response
    }

    try {
        const fullPrompt = `
      Context: You are Kira, an AI assistant for a business dashboard.
      Current Page Context: ${context}
      
      User Query: ${prompt}
      
      Please provide a helpful, professional, and concise response.
      If the user asks to analyze data, pretend you have access to the page data.
    `;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
};
