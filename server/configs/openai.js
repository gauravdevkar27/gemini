import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.GROK_API,
    // baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    baseURL: "https://api.groq.com/openai/v1",
});
if (!process.env.GEMINI_API_KEY) {
    console.warn("API_KEY is not set. Please check your .env file.");
}
export default openai;