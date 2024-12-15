import { sortCards } from './deck.js';
import { arrangeInColumns } from './layout.js';
import { saveCardState } from './state.js';

export function enableDragAndDrop(deckElement) {
    const suitSections = document.querySelectorAll('.suit-section'); 

    // Handle the start of dragging a card
    document.addEventListener('dragstart', event => {
        if (event.target.classList.contains('card')) {
            // Save the value and suit of the card being dragged
            event.dataTransfer.setData('value', event.target.dataset.value);
            event.dataTransfer.setData('suit', event.target.dataset.suit);
            event.target.classList.add('dragging'); 
        }
    });

    // This handles the end of dragging a card
    document.addEventListener('dragend', event => {
        if (event.target.classList.contains('card')) {
            event.target.classList.remove('dragging'); // Removes the dragging class once the drag ends
        }
    });

    // Make the suit sections droppable areas
    suitSections.forEach(section => {
        section.addEventListener('dragover', event => {
            event.preventDefault();
            section.classList.add('over'); 
        });

        section.addEventListener('dragleave', () => {
            section.classList.remove('over'); 
        });

        section.addEventListener('drop', event => {
            event.preventDefault(); 
            const draggedCardSuit = event.dataTransfer.getData('suit'); // Get the suit of the dragged card
            const sectionSuit = section.id; // Get the ID of the suit section 

            // If the dragged card's suit matches the section's suit, drop the card there
            if (draggedCardSuit === sectionSuit) {
                const card = document.querySelector('.card.dragging');
                section.appendChild(card); 
                sortCards(section); // Sort the cards in the suit section after dropping them
                arrangeInColumns(section, Array.from(section.querySelectorAll('.card'))); // Put the cards in columns
            }
            section.classList.remove('over'); 
        });
    });

    // Make the deck a drop target as well
    deckElement.addEventListener('dragover', event => {
        event.preventDefault(); 
        deckElement.classList.add('over'); 
    });

    deckElement.addEventListener('dragleave', () => {
        deckElement.classList.remove('over'); 
    });

    deckElement.addEventListener('drop', async (event) => {
        event.preventDefault(); 
        const card = document.querySelector('.card.dragging'); 
        deckElement.appendChild(card); // Add the card back to the deck
        const state = {}; // This prepares to save the state (apparently)
        sortCards(deckElement); 
        deckElement.classList.remove('over'); 
        await saveCardState(state); // This then saves the current state of the cards
    });
}
