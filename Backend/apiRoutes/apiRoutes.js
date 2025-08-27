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
        
        const userPrompt = "make 5 quiz multiple choice questions with 4 choices from this file";

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

        const userPrompt = "summarize the text in 100 words";

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
        
        const userPrompt = "make 3 flash cards for main topics for quick definitions and main points";

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