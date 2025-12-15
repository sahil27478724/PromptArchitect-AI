import { GoogleGenAI } from "@google/genai";
import { AppState, InputType } from "../types";
import { SYSTEM_ARCHITECT_PROMPT } from "../constants";

// Initialize the API client
// Note: We use the browser-compatible GoogleGenAI client.
// The API key is injected via process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArchitectPrompt = async (state: AppState): Promise<string> => {
  try {
    const parts: any[] = [];

    // 1. Add the User Intent & Configuration as text
    let userPromptText = `
    TARGET TOOL: ${state.selectedTool}
    INPUT TYPE: ${state.inputType}
    USER INTENT: ${state.intent}
    QUALITY LEVEL: ${state.quality}
    USER CONSTRAINTS: ${state.constraints || "None provided"}
    
    TASK: Analyze the provided input(s) and generate a PROMPT optimized for the TARGET TOOL.
    `;

    if (state.inputType === InputType.TEXT) {
      userPromptText += `\nINPUT TEXT/IDEA: ${state.textInput}`;
    }

    parts.push({ text: userPromptText });

    // 2. Add Primary Image if applicable
    if (state.inputType !== InputType.TEXT && state.primaryFile) {
      parts.push({
        inlineData: {
          mimeType: state.primaryFile.mimeType,
          data: state.primaryFile.base64
        }
      });
    }

    // 3. Add Secondary Images if applicable
    if (state.inputType !== InputType.TEXT && state.secondaryFiles.length > 0) {
      state.secondaryFiles.forEach(file => {
        parts.push({
          inlineData: {
            mimeType: file.mimeType,
            data: file.base64
          }
        });
      });
    }

    // 4. Call Gemini Model
    // Using gemini-2.5-flash for a balance of speed and multimodal capability.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_ARCHITECT_PROMPT,
        temperature: 0.2, // Low temperature for deterministic, structural adherence
      },
      contents: {
        role: 'user',
        parts: parts
      }
    });

    return response.text || "Failed to generate prompt. Please try again.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Analysis failed. Please check your inputs and try again.");
  }
};