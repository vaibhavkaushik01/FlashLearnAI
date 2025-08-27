import express from "express"

const router = express.Router();

    //get pdf data from req
    //use getDataFromPdf function to parse data into json or text
    //send data along with prompt to callGoogleGemini
    //send the response send by model back to frontend

router.post("/quiz",(req,res)=>{
    res.send("quiz generation");
});


router.post("/summary",(req,res)=>{
    res.send("summraize pdf");
});


router.post("flashcards",(req,res)=>{
    res.send("flashcards");
});


export default router;