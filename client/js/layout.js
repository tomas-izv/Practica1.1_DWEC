// Function to arrange cards in columns within a section
export function arrangeInColumns(section, cards) {
    const columns = [[], [], []];

    // distribution of the cards into the columns
    cards.forEach((card, index) => {
        if (index < 5) columns[0].push(card); 
        else if (index < 10) columns[1].push(card); 
        else columns[2].push(card); 
    });

    // Creating a wrapper for the columns and add it to the section
    const columnWrapper = document.createElement('div');
    columnWrapper.classList.add('columns'); 
    section.appendChild(columnWrapper); // add the wrapper to the section

    // Create each column and add the cards
    columns.forEach(col => {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column'); 
        col.forEach(card => columnDiv.appendChild(card)); 
        columnWrapper.appendChild(columnDiv); 
    });
}
