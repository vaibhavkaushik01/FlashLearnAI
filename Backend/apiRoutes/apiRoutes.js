import express from "express"
import path from "path"
import dotenv from "dotenv";

import { callGoogleGemini, callGoogleGeminiPassingPDF} from "../callToModel/callToModel.js";
import { upload } from "../multer/multerfilehandling.js";
import { deleteFileAfterProcessing } from "../utilFunctions/utilFunctions.js";

const router = express.Router();
dotenv.config({path : "../.env"});

//get pdf data from req
//use getDataFromPdf function to parse data into json or text
//send data along with prompt to callGoogleGemini
//send the response send by model back to frontend

router.post("/quiz",upload.single('File'),async (req,res)=>{
    try{
        const filePath = path.join(process.env.UPLOAD_DIR_PATH , req.file.filename);
        
        const userPrompt = `You are given the content of a PDF file. From this input, 
        generate a quiz in JSON format. Output should have the following structure:
            {
              "ques1": {
                "problem_statement": "Question text here",
                "options": ["option1", "option2", "option3", "option4"],
                "ans": "correct option here"
              },
              "ques2": {
                "problem_statement": "Question text here",
                "options": ["option1", "option2", "option3", "option4"],
                "ans": "correct option here"
              }
            }
            Guidelines:
                Generate 2 quiz questions only and only generate question from relevant and important topics.
                Don't mention that you are providing information from pdf in json and output should only contain json object nothing else.
                Use only the information from the PDF to create the questions.
                Each question must have exactly 4 options.
                The "ans" field must exactly match one of the options.
                Keep the question text concise but clear.
                Do not add any explanation or text outside of the JSON structure.
        `;

        const modelResp = await callGoogleGeminiPassingPDF({userPrompt,filePath});
        console.log(modelResp);

        //now delete file from drive
        deleteFileAfterProcessing(filePath);

        res.send(modelResp);
    } catch (err){
        res.send(err.message);
    }
});


router.post("/summary",upload.single('File'),async (req,res)=>{
    try{
        const filePath = path.join(process.env.UPLOAD_DIR_PATH , req.file.filename);

        const userPrompt = `Summarize the given pdf file make it one page maximum and include
        all major topics and important topics`;

        const modelResp = await callGoogleGeminiPassingPDF({userPrompt,filePath});
        console.log(modelResp);

        //now delete file from drive
        deleteFileAfterProcessing(filePath);

        res.send(modelResp);
    } catch (err){
        res.send(err.message);
    }
});


router.post("/flashcards",upload.single('File'),async (req,res)=>{
    try{
        const filePath = path.join(process.env.UPLOAD_DIR_PATH , req.file.filename);
        
        const userPrompt = `You are given the content of a PDF file. From this input, 
        generate flashcards in JSON format. Output should have the following structure:
            {
              "flashcard1": {
                "front": "Term or Question",
                "back": {
                  "definition": "A short and clear explanation or description of the concept.",
                  "key_points": [
                    "First key point or fact about the concept.",
                    "Second key point or fact about the concept.",
                    "Third key point or fact about the concept."
                  ],
                  "examples": [
                    "Example 1 related to the concept.",
                    "Example 2 related to the concept."
                  ]
               }
              },
              "flashcard2": {
                "front": "Another Term or Question",
                "back": {
                  "definition": "A short explanation.",
                  "key_points": [
                    "Important detail 1.",
                    "Important detail 2."
                  ],
                  "examples": [
                    "Example A."
                  ]
                }
              }
            }
            Guidelines:
                Generate 2  flashcards from relevant and important topics only.
                If a topic is large make different flash card for its subtopics.
                Don't mention that you are providing information from pdf in json and output should only contain json object nothing else.
                Use only the information from the PDF.
                Omit examples field if not present in pdf.
                Keep the question text concise but clear.
                Do not add any explanation or text outside of the JSON structure.
        `;

        const modelResp = await callGoogleGeminiPassingPDF({userPrompt,filePath});
        console.log(modelResp);

        //now delete file from drive
        deleteFileAfterProcessing(filePath);

        res.send(modelResp);
    } catch (err){
        res.send(err.message);
    }
});


export default router;
