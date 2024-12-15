import { suits, values, valueOrder } from './constants.js'; 

// Function to create a card element
export function createCardElement(value, suit) {
    const card = document.createElement('div');
    card.className = 'card'; // Add a class name to the card for css
    card.draggable = true; // Makes the card draggable
    card.textContent = `${value} ${suit}`;
    card.dataset.value = value; // Save the card value
    card.dataset.suit = suit; // Save the card suit
    card.id = `${value}${suit}`;  // Create an ID for the card
    return card;
}

// Function to create a full deck of cards
export function generateDeck(deckElement) {
    console.log('Generating deck...');
    suits.forEach(suit => { // Loop through the suits
        values.forEach(value => { // Loop through the card values
            const card = createCardElement(value, suit);
            deckElement.appendChild(card); 
        });
    });
}

// Function to sort the cards in a container (either in the deck or suit sections)
export function sortCards(container) {
    const cards = Array.from(container.querySelectorAll('.card'));
    cards.sort((a, b) => { // Sort the cards by suit and value
        if (a.dataset.suit === b.dataset.suit) { 
            return valueOrder[a.dataset.value] - valueOrder[b.dataset.value]; // Sort by value
        }
        return suits.indexOf(a.dataset.suit) - suits.indexOf(b.dataset.suit); // Sort by suit
    });
    cards.forEach(card => container.appendChild(card));
}
