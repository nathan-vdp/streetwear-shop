// Fetch the JSON data
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        // Create product cards
        const productCardsContainer = document.getElementById('product-cards');
        data.products.forEach(product => {
            const productCard = createProductCard(product);
            productCardsContainer.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Function to create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.img;
    img.alt = product.name;
    card.appendChild(img);

    const name = document.createElement('h2');
    name.textContent = product.name;
    card.appendChild(name);

    const type = document.createElement('p');
    type.textContent = 'Type: ' + product.type;
    card.appendChild(type);

    const color = document.createElement('p');
    color.textContent = 'Color: ' + product.color;
    card.appendChild(color);

    const sizes = document.createElement('p');
    sizes.textContent = 'Sizes: ' + product.sizes.join(', ');
    card.appendChild(sizes);

    const description = document.createElement('p');
    description.textContent = 'Description: ' + product.description;
    card.appendChild(description);

    const quantity = document.createElement('p');
    quantity.textContent = 'Quantity: ' + product.quantity;
    card.appendChild(quantity);

    return card;
}