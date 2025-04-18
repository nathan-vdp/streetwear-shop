let products;

fetch('product.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.hasOwnProperty('products') && Array.isArray(data.products)) {
            products = data.products;

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

function createImageElement(product) {
    const imgLink = document.createElement('a');
    imgLink.href = product.image;
    const img = document.createElement('img');
    img.classList.add('p-8', 'rounded');
    img.src = product.image;
    img.alt = 'product image';
    imgLink.appendChild(img);
    return imgLink;
}

function createNameElement(product) {
    const nameLink = document.createElement('a');
    nameLink.href = '#';
    const name = document.createElement('h5');
    name.classList.add('text-xl', 'font-bold', 'tracking-tight', 'text-slate-800', 'dark:text-black');
    name.textContent = product.name;
    nameLink.appendChild(name);
    return nameLink;
}

function createPriceElement(product) {
    const price = document.createElement('span');
    price.classList.add('text-3xl', 'font-bold', 'text-slate-600', 'dark:text-black');
    price.textContent = '$' + product.price;
    return price;
}

function createAddToCartElement() {
    const addToCartLink = document.createElement('a');
    addToCartLink.href = '#';
    addToCartLink.classList.add('text-white', 'bg-grey-500', 'hover:bg-blue-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-blue-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'dark:bg-blue-600', 'dark:hover:bg-blue-700', 'dark:focus:ring-blue-800');
    addToCartLink.textContent = 'Add to cart';
    return addToCartLink;
}

function createDescriptionElement(product) {
    const description = document.createElement('div');
    description.classList.add('absolute', 'inset-0', 'bg-white', 'flex', 'items-center', 'justify-center', 'opacity-0', 'group-hover:opacity-100', 'transition-opacity', 'duration-200', "font-semibold");
    description.textContent = product.description;
    return description;
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('w-full', 'max-w-sm', 'relative', 'group');
    card.id = `product-${product.name.replace(/ /g, '-')}`;
    card.classList.add('product-card');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('relative');

    imageContainer.appendChild(createImageElement(product));
    imageContainer.appendChild(createDescriptionElement(product));

    card.appendChild(imageContainer);

    const textContainer = document.createElement('div');
    textContainer.classList.add('px-5', 'pb-5');

    textContainer.appendChild(createNameElement(product));

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('flex', 'items-center', 'justify-between');

    priceContainer.appendChild(createPriceElement(product));
    priceContainer.appendChild(createAddToCartElement(product));

    textContainer.appendChild(priceContainer);

    card.appendChild(textContainer);

    return card;
}

let cart = [];

function addToCart(product) {
    cart.push(product);
}

function createAddToCartElement(product) {
    const addToCartContainer = document.createElement('div');
    addToCartContainer.classList.add('flex', 'items-center');

    const sizeDropdown = document.createElement('select');
    const sizes = product.sizes; // Veronderstel dat het product een 'sizes' array heeft met beschikbare maten
    sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeDropdown.appendChild(option);
    });

    addToCartContainer.appendChild(sizeDropdown);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('ml-3', 'px-2', 'py-2', 'bg-blue-600', 'text-white', 'rounded-md', 'hover:bg-blue-600', 'focus:outline-none', 'focus:ring', 'focus:ring-blue-300');
    addToCartButton.addEventListener('click', function () {
        const selectedSize = sizeDropdown.value;
        addToCart({ ...product, size: selectedSize });
    });

    addToCartContainer.appendChild(addToCartButton);

    return addToCartContainer;
}

// Functie om producten te filteren en weer te geven
function filterProducts(products) {
    const selectedType = filterType.value;

    const filteredProducts = products.filter(product => {
        return selectedType === 'all' || product.type === selectedType;
    });

    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const allProductCards = document.querySelectorAll('.product-card');
    allProductCards.forEach(card => {
        card.style.display = 'none';
    });

    filteredProducts.forEach(product => {
        const productCard = document.getElementById(`product-${product.name.replace(/ /g, '-')}`);
        if (productCard) {
            productCard.style.display = 'block';
        }
    });
}

filterType.addEventListener('change', () => filterProducts(products));