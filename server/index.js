import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import fetch from 'node-fetch'; // Import node-fetch


dotenv.config()


const app = express()
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}))
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Cloud'
    })
})

app.post('/', async (req, res) => {
    const { message } = req.body;
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json();
        res.status(200).send(data);

    } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
    }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))