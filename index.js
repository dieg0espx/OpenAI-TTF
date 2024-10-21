const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');
const cors = require('cors');
const app = express();
const PORT = 4000;
const IP_ADDRESS = '10.2.122.241'

// Configure OpenAI API

const openaiApiKey = process.env.SECRET_KEY;

const openaiClient = new openai.OpenAI({ apiKey: openaiApiKey });

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://chatbot-ttf.vercel.app/', // Replace with your actual Vercel frontend domain
}));
app.use(express.json());

// Define API endpoint
app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt);
    try {
        const response = await openaiClient.completions.create({
            model: "gpt-3.5-turbo-instruct", 
            prompt: prompt, 
            max_tokens: 2000,
        });
        const generatedText = response.choices[0].text;
        res.status(200).json(generatedText.trimStart());
    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).json({ error: 'An error occurred while generating text' });
    }


});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
