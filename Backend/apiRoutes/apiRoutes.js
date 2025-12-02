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

router.post("/",upload.single('File'),async (req,res)=>{
  const filePath = path.join(process.env.UPLOAD_DIR_PATH , req.file.filename);
  const quiz = await genQuiz(filePath);
  const summaryText = await genSummary(filePath);
  const flashCards = await genFlashCards(filePath);
  //now delete file from drive
  deleteFileAfterProcessing(filePath);
  return res.json({quiz,summaryText,flashCards});
})

const genQuiz = async (filePath)=>{
    try{
        const userPrompt = `make 5 quiz multiple choice questions with 4 choices from this file and return the response in following json format
        {
    title: "Machine Learning Fundamentals Quiz",
    totalQuestions: 5,
    questions: [
      {
        question: "What is the primary difference between supervised and unsupervised learning?",
        options: [
          "Supervised learning uses labeled data, unsupervised doesn't",
          "Supervised learning is faster than unsupervised learning",
          "Unsupervised learning is more accurate than supervised learning",
          "There is no difference between the two approaches"
        ],
        correctAnswer: 0,
        explanation: "Supervised learning requires labeled training data to learn patterns, while unsupervised learning finds patterns in data without labels."
      },
      {
        question: "Which of the following is NOT a common activation function in neural networks?",
        options: [
          "ReLU (Rectified Linear Unit)",
          "Sigmoid",
          "Tanh",
          "Linear Regression"
        ],
        correctAnswer: 3,
        explanation: "Linear Regression is a machine learning algorithm, not an activation function. ReLU, Sigmoid, and Tanh are all common activation functions."
      },
      {
        question: "What is the purpose of feature engineering in machine learning?",
        options: [
          "To increase the size of the dataset",
          "To select and transform variables for better model performance",
          "To reduce computational costs only",
          "To visualize data patterns"
        ],
        correctAnswer: 1,
        explanation: "Feature engineering involves selecting, modifying, or creating features (variables) to improve model performance and accuracy."
      },
      {
        question: "Which technique is used to prevent overfitting in neural networks?",
        options: [
          "Increasing the learning rate",
          "Adding more hidden layers",
          "Dropout regularization",
          "Using smaller datasets"
        ],
        correctAnswer: 2,
        explanation: "Dropout is a regularization technique that randomly sets some neurons to zero during training to prevent overfitting."
      },
      {
        question: "What is deep learning primarily characterized by?",
        options: [
          "Using only linear algorithms",
          "Multi-layer neural networks with many hidden layers",
          "Working only with small datasets",
          "Requiring no computational power"
        ],
        correctAnswer: 1,
        explanation: "Deep learning uses neural networks with multiple hidden layers (typically 3 or more) to learn complex patterns in data."
      }
    ]
  };
    `;

        const modelResp = await callGoogleGeminiPassingPDF({userPrompt,filePath});
        console.log(modelResp);

        return modelResp;
    } catch (err){
        return err.message;
    }
}


const genSummary = async (filePath)=>{
    try{
        const userPrompt = `summarize the document and return response in following json format
        {
      title: "Machine Learning Fundamentals",
      summary: 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. Key concepts include supervised learning, unsupervised learning, and reinforcement learning.

Key topics covered:
• Supervised Learning: Uses labeled data to train algorithms
• Unsupervised Learning: Finds patterns in data without labels  
• Neural Networks: Inspired by biological neural networks
• Deep Learning: Uses multi-layer neural networks
• Feature Engineering: Selecting and transforming variables

Applications include image recognition, natural language processing, recommendation systems, and predictive analytics. The field requires understanding of statistics, linear algebra, and programming.',
      readTime: "5 min read",
      keyPoints: ["Supervised vs Unsupervised Learning", "Neural Networks", "Deep Learning", "Feature Engineering"],
      pages: 45
    }
        `;

        const modelResp = await callGoogleGeminiPassingPDF({userPrompt,filePath});
        console.log(modelResp);

        return modelResp;
    } catch (err){
        return err.message;
    }
};


const genFlashCards = async (filePath)=>{
    try{
        const userPrompt = `make 3 flash cards for main topics for quick definitions and main points and return the response in following format
      {
        front: "What is Machine Learning?",
        back: "Machine Learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to identify patterns in data and make predictions or decisions.",
        category: "Fundamentals"
      }
        `;

        const modelResp = await callGoogleGeminiPassingPDF({userPrompt,filePath});
        console.log(modelResp);

        return modelResp;
    } catch (err){
        return err.message;
    }
};


export default router;
