import express from "express";
import dotenv from "dotenv";

import apiRoutes from "./apiRoutes/apiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }))

app.get("/",(req,res)=>{
    res.send("FlashLearnAI Landing Page");
});

app.use("/api/generate",apiRoutes);

app.listen(PORT, async ()=>{
    console.log(`Server active at port : ${PORT}`);
});