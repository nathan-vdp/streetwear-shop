let products;

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
            // Sla de productgegevens op in de variabele
            products = data.products;

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
    const addToCartLink = document.createElement('a');
    addToCartLink.href = '#';
    addToCartLink.classList.add('text-white', 'bg-grey-500', 'hover:bg-blue-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-blue-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'dark:bg-blue-600', 'dark:hover:bg-blue-700', 'dark:focus:ring-blue-800');
    addToCartLink.textContent = 'Add to cart';
    addToCartLink.addEventListener('click', function (event) {
        event.preventDefault();
        addToCart(product);
    });
    return addToCartLink;
}

const navLinks = document.querySelectorAll('#navbar ul li a');

navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        navLinks.forEach(function (link) {
            link.classList.remove('active');
        });

        this.classList.add('active');

        window.location = this.href;
    });
});

// Functie om producten te filteren en weer te geven
function filterProducts(products) {
    const selectedType = filterType.value;

    const filteredProducts = products.filter(product => {
        const matchesType = selectedType === 'all' || product.type === selectedType;
        return matchesType;
    });

    // Weergeef de gefilterde producten
    displayProducts(filteredProducts);
}

// Functie om producten weer te geven
function displayProducts(products) {
    // Leeg de container voordat je nieuwe producten toevoegt
    productContainer.innerHTML = '';

    // Voeg elk product toe aan de container
    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

// Voeg een event listener toe aan de select elementen
filterType.addEventListener('change', () => filterProducts(products));

// Typed.js
var typed = new Typed('.typed', {
    strings: ['Clothing', 'Techwear'],
    typeSpeed: 100,
    backSpeed: 100,
    loop: false,
    showCursor: false,
});