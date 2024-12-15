import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

let cardState = {}; // This holds the current state of the cards

app.use(cors()); 
app.use(express.json());

// This is to get the current state of the cards
app.get('/getCardState', (req, res) => {
    res.json(cardState);
});

// And this is to save the current state of the cards
app.post('/saveCardState', (req, res) => {
    cardState = req.body;
    res.sendStatus(200);
});

app.listen(PORT, () => console.log('Server running on http://localhost:${PORT}'));
