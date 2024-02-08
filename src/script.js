fetch('product.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Check if the fetched data contains the "products" array
        if (data.hasOwnProperty('products') && Array.isArray(data.products)) {
            // Create product cards for each product in the "products" array
            const productCardsContainer = document.getElementById('product-cards');
            data.products.forEach(product => {
                const productCard = createProductCard(product);
                productCardsContainer.appendChild(productCard);
            });
        } else {
            throw new Error('Fetched data does not contain the "products" array');
        }
    })
    .catch(error => console.error('Error fetching product data:', error));


// Function to create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('w-full', 'max-w-sm');

    const imgLink = document.createElement('a');
    imgLink.href = product.image;
    const img = document.createElement('img',);
    img.classList.add('p-8', 'rounded');
    img.src = product.image;
    img.alt = 'product image';
    imgLink.appendChild(img);
    card.appendChild(imgLink);
    const textContainer = document.createElement('div');
    textContainer.classList.add('px-5', 'pb-5');

    const nameLink = document.createElement('a');
    nameLink.href = '#';
    const name = document.createElement('h5');
    name.classList.add('text-xl', 'font-bold', 'tracking-tight', 'text-slate-800', 'dark:text-black');
    name.textContent = product.name;
    nameLink.appendChild(name);
    textContainer.appendChild(nameLink);

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('flex', 'items-center', 'justify-between');
    const price = document.createElement('span');
    price.classList.add('text-3xl', 'font-bold', 'text-slate-600', 'dark:text-black');
    price.textContent = '$' + product.price;
    priceContainer.appendChild(price);
    const addToCartLink = document.createElement('a');
    addToCartLink.href = '#';
    addToCartLink.classList.add('text-white', 'bg-blue-700', 'hover:bg-blue-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-blue-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'dark:bg-blue-600', 'dark:hover:bg-blue-700', 'dark:focus:ring-blue-800');
    addToCartLink.textContent = 'Add to cart';
    priceContainer.appendChild(addToCartLink);
    textContainer.appendChild(priceContainer);

    card.appendChild(textContainer);

    return card;
}