
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
    // In a real app, you might want to handle this more gracefully.
    // For this prototype, we'll throw an error if the key is missing.
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Summarizes the provided email body using the Gemini Flash model.
 * @param emailBody - The full text content of the email.
 * @returns A promise that resolves to a string containing the summary.
 */
export const summarizeEmail = async (emailBody: string): Promise<string> => {
  try {
    const prompt = `Summarize the following email in one or two sentences, capturing the main point and any call to action:\n\n---\n\n${emailBody}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error summarizing email with Gemini:", error);
    // Re-throw a more user-friendly error message
    throw new Error("Failed to connect to the AI service.");
  }
};
