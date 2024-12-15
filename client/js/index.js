import { generateDeck } from "./deck.js";
import { enableDragAndDrop } from './dragDrop.js';
import { fetchCardState, saveCardState } from './state.js';

// Set up the deck and add it to the page
const deckElement = document.getElementById('deck');
generateDeck(deckElement);

// Enable drag-and-drop feature for the deck
enableDragAndDrop(deckElement);

// Fetch the saved card state when the page loads again
async function loadCardState() {
    const state = await fetchCardState(); // Get the saved state from the server
    if (Object.keys(state).length > 0) {
        Object.entries(state).forEach(([cardId, sectionId]) => {
            const card = document.getElementById(cardId);  // Find the card by its ID
            if (card) {
                const section = document.getElementById(sectionId); // Find the section by its Id
                if (section) {
                    section.appendChild(card); // This puts the card in the correct section
                }
            }
        });
    }
}

// Load the saved card state when the page is loaded
window.addEventListener('load', loadCardState);

// Save the state whenever a card is dropped
async function updateCardState() {
    const state = {};
    document.querySelectorAll('.suit-section').forEach(section => {
        section.querySelectorAll('.card').forEach(card => {
            state[card.id] = section.id; 
        });
    });
    await saveCardState(state); // Send the updated state to the server
}

document.addEventListener('drop', updateCardState);