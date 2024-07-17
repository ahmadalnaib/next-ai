require('dotenv').config(); // Load environment variables
const express = require('express');
 const fetch=require('node-fetch');

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Use the API key from .env

const app = express();
const port = 5050;

app.use(express.json());

app.post("/chat/completions", async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`, // Corrected to use template literals properly
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: req.body.message,
        }
      ]
    }),
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    res.send(data.choices[0].message.content);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});