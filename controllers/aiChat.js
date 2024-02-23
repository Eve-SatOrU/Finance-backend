const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
// env
require('dotenv').config();

// key
// const API_KEY = process.env.API_KEY;
const API_KEY = "AIzaSyCv_qMP4SUN6GHzmEA7a25lwEqnRAQcZlg";
const MODEL_NAME = "gemini-1.0-pro";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

exports.Askai = async (req, res) => {
    const { userMessage } = req.body;
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: 'Unauthorized - User not in session' });
        }
    

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(userMessage);
        const response = result.response;
        const botResponse = response.text();

        res.json({ botResponse });
    } catch (error) {
        console.error('Error communicating with Google Generative AI:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};