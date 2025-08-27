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

export async function callGoogleGeminiPassingPDF({userPrompt,filePath}) {
    try {
        const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});
        const contents = [
            { text: userPrompt },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(fs.readFileSync(filePath)).toString("base64")
                }
            }
        ];
    
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents
        });
    
        return response.text;
        
    } catch(err){
        console.log(err.message);
        return err.message;
    }
}
