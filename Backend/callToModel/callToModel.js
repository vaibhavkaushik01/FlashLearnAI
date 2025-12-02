import { GoogleGenAI} from "@google/genai";
import dotenv from "dotenv";
import * as fs from "fs";
//make and export a function that connects with llm model with prompt as input and return model's response

dotenv.config({path : "../.env"}); //important to give path of .env if not in same folder

//const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});

export async function callGoogleGemini(userPrompt){
    const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: userPrompt,
        });
        console.log(response.text);
        return response.text;
    }
    catch(error){
        console.log(error)
    }
}

export async function callGoogleGeminiPassingPDF({ userPrompt, filePath }) {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const contents = [
            { text: `${userPrompt}\nPlease respond ONLY with valid JSON, without any extra characters, comments, or markdown formatting.` },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(fs.readFileSync(filePath)).toString("base64")
                }
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            generationConfig: {
                responseFormat: { type: "application/json" }
            }
        });

        const responseText = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        try {
            return JSON.parse(responseText);
        } catch (err) {
            try {
            const { jsonrepair } = await import('jsonrepair');
            const repaired = jsonrepair(responseText);
            return JSON.parse(repaired);
            } catch (repairErr) {
            console.log("jsonrepair failed:", repairErr.message);
            console.log("Raw response:", responseText);
            return { error: "Invalid JSON response", raw: responseText };
            }
        }
    } catch (err) {
        console.log(err.message);
        return { error: err.message };
    }
}
