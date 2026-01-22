
import { GoogleGenAI, Type } from "@google/genai";
import { PhishingAnalysis, RiskLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SCHEMA = {
  type: Type.OBJECT,
  properties: {
    riskPercentage: { type: Type.NUMBER, description: "Risk score from 0 to 100" },
    level: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
    analysis: { type: Type.STRING, description: "Detailed AI explanation of the analysis" },
    vulnerabilities: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of specific vulnerabilities or red flags found"
    }
  },
  required: ["riskPercentage", "level", "analysis", "vulnerabilities"]
};

export const analyzeLink = async (url: string): Promise<PhishingAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this bank-related URL for phishing vulnerabilities and suspicious patterns: ${url}. 
      Check for domain spoofing, unusual TLDs, known phishing signatures, and deceptive structures.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: SCHEMA
      }
    });

    return JSON.parse(response.text.trim()) as PhishingAnalysis;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return fallbackResponse;
  }
};

export const analyzeMessage = async (message: string): Promise<PhishingAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this communication (SMS/Email) purportedly from a bank for phishing attempts: "${message}". 
      Look for: artificial urgency, threats of account closure, requests for sensitive credentials (PIN, OTP, passwords), 
      unusual sender phrasing, and suspicious calls to action.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: SCHEMA
      }
    });

    return JSON.parse(response.text.trim()) as PhishingAnalysis;
  } catch (error) {
    console.error("AI Message Analysis Error:", error);
    return fallbackResponse;
  }
};

const fallbackResponse: PhishingAnalysis = {
  riskPercentage: 50,
  level: RiskLevel.MEDIUM,
  analysis: "Unable to reach the AI engine for real-time analysis. Please exercise caution.",
  vulnerabilities: ["AI connection timeout", "Manual verification recommended"]
};
