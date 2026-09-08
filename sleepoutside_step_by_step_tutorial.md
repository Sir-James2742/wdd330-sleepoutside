# ⛺ SleepOutside: Step-by-Step Self-Paced Course Guide

Welcome to the **SleepOutside** self-paced web development course guide! This tutorial guides you step-by-step through constructing the SleepOutside e-commerce web application from scratch up to its current state.

---

## 📋 Course Overview & Prerequisites

### Prerequisites
* **Node.js** (v18.x or higher) installed on your system.
* Basic understanding of HTML5, CSS3, and ES6 JavaScript (modules, `async/await`, `fetch`).
* Code editor (VS Code, Antigravity IDE, etc.).

---

## 🚀 Module 1: Environment Setup & Tooling Configuration

### Step 1.1: Initialize Project Directory & Node Package
Open your terminal, create the project directory, and initialize a new `package.json` file.

```bash
mkdir wdd330-sleepoutside
cd wdd330-sleepoutside
npm init -y
```

---

### Step 1.2: Install Developer Dependencies
Install Vite (development server/bundler), ESLint (code linter), Prettier (code formatter), and Jest (testing framework).

```bash
npm install -D vite@^5.4.7 eslint@^8.56.0 eslint-config-prettier@^8.10.0 eslint-plugin-import@^2.29.1 jest@^29.7.0 prettier@^3.2.5
```

---

### Step 1.3: Update `package.json`
Update your [package.json](file:///home/thehyphen/byui/wdd330-sleepoutside/package.json) file with scripts for running, building, linting, formatting, and testing your application:

```json
{
  "name": "outside",
  "version": "2.0.0",
  "description": "Boilerplate for WDD 330 SleepOutside project",
  "main": "main.js",
  "scripts": {
    "start": "vite",
    "build": "vite build --emptyOutDir",
    "lint": "eslint *.js src/**/*.js",
    "format": "prettier --ignore-path ./.gitignore --write \"./**/*.{html,json,js,ts,css}\"",
    "test": "jest"
  },
  "devDependencies": {
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^8.10.0",
    "eslint-plugin-import": "^2.29.1",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "vite": "^5.4.7"
  },
  "babel": {
    "presets": [
      "@babel/preset-env"
    ]
  }
}
```

---

### Step 1.4: Configure Vite Multi-Page Build ([`vite.config.js`](file:///home/thehyphen/byui/wdd330-sleepoutside/vite.config.js))
Create `vite.config.js` in the root directory. This configures Vite to serve from `src/` and bundle multiple HTML entry points into `dist/`.

```javascript
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product1: resolve(
          __dirname,
          "src/product_pages/cedar-ridge-rimrock-2.html",
        ),
        product2: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
        product3: resolve(
          __dirname,
          "src/product_pages/northface-alpine-3.html",
        ),
        product4: resolve(
          __dirname,
          "src/product_pages/northface-talus-4.html",
        ),
      },
    },
  },
});
```

---

### Step 1.5: Configure ESLint & Prettier
Create `.eslintrc.json` in the root directory:

```json
{
  "plugins": ["import"],
  "extends": ["eslint:recommended", "plugin:import/errors", "prettier"],
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": [1, { "argsIgnorePattern": "res|next|^err" }],
    "arrow-body-style": [2, "as-needed"],
    "no-console": 1,
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "import/extensions": 0
  }
}
```

Create `.prettierrc`:
```json
{}
```

Create `.gitignore`:
```gitignore
node_modules
dist
.DS_Store
```

---

## 📁 Module 2: Project Architecture & Static Assets Setup

### Step 2.1: Create Directory Structure
Run the following commands to set up the project folder structure:

```bash
mkdir -p src/css src/js src/json src/cart src/checkout src/product_pages src/images src/test
```

---

### Step 2.2: Add Catalog Mock Data ([`src/json/tents.json`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/json/tents.json))
Create `src/json/tents.json` with sample product objects:

```json
[
  {
    "Id": "880RR",
    "Name": "Ajax Tent - 3-Person, 3-Season",
    "NameWithoutBrand": "Ajax Tent - 3-Person, 3-Season",
    "Brand": { "Name": "Marmot" },
    "Image": "images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
    "FinalPrice": 199.99,
    "Colors": [{ "ColorName": "Pale Pumpkin/Terracotta" }],
    "DescriptionHtmlSimple": "<p>Get out and enjoy nature with Marmot's Ajax tent...</p>"
  },
  {
    "Id": "985RF",
    "Name": "Talus Tent - 4-Person, 3-Season",
    "NameWithoutBrand": "Talus Tent - 4-Person, 3-Season",
    "Brand": { "Name": "The North Face" },
    "Image": "images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
    "FinalPrice": 199.99,
    "Colors": [{ "ColorName": "Golden Oak/Saffron Yellow" }],
    "DescriptionHtmlSimple": "<p>Enjoy spacious outdoor living...</p>"
  }
]
```

*(You can add `backpacks.json` and `sleeping-bags.json` in the `src/json/` directory following the same schema).*

---

### Step 2.3: Create Main stylesheet ([`src/css/style.css`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/css/style.css))
Create `src/css/style.css` to define layout CSS variables, product cards, logo styling, and grid displays:

```css
:root {
  --font-body: Arial, Helvetica, sans-serif;
  --font-headline: Haettenschweiler, "Arial Narrow Bold", sans-serif;
  --primary-color: #f0a868;
  --secondary-color: #525b0f;
  --tertiary-color: #8a470c;
  --light-grey: #d0d0d0;
  --dark-grey: #303030;
  --font-base: 18px;
  --small-font: 0.8em;
  --large-font: 1.2em;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: var(--font-body);
  font-size: var(--font-base);
  color: var(--dark-grey);
}

header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
}

.logo {
  line-height: 60px;
  display: flex;
  font-size: 30px;
  font-family: var(--font-headline);
}

.logo img { width: 60px; height: 60px; }
.logo a { text-decoration: none; color: var(--font-body); }

.highlight { color: var(--tertiary-color); }
.divider { border-bottom: 2px solid var(--primary-color); }

button {
  padding: 0.5em 2em;
  background-color: var(--secondary-color);
  color: white;
  margin: auto;
  display: block;
  border: 0;
  font-size: var(--large-font);
  cursor: pointer;
}

.cart svg { width: 25px; }

.product-list {
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  justify-content: center;
}

.product-card {
  flex: 1 1 45%;
  margin: 0.25em;
  padding: 0.5em;
  border: 1px solid var(--light-grey);
  max-width: 250px;
}

.product-detail {
  padding: 1em;
  max-width: 500px;
  margin: auto;
}

.cart-card {
  display: grid;
  grid-template-columns: 25% auto 15%;
  font-size: var(--small-font);
  align-items: center;
}
```

---

## ⚙️ Module 3: Core JavaScript Data & Utility Layer

### Step 3.1: Create LocalStorage & DOM Utilities ([`src/js/utils.mjs`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/js/utils.mjs))
Create `src/js/utils.mjs` to encapsulate shared helper functions:

```javascript
// Wrapper for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to localstorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Helper to set both click and touch listeners
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
```

---

### Step 3.2: Create Product Data Fetcher Service ([`src/js/ProductData.mjs`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/js/ProductData.mjs))
Create `src/js/ProductData.mjs` to fetch and search JSON data:

```javascript
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
```

---

## 🖥️ Module 4: Page Controllers & Interactivity

### Step 4.1: Product Page Handler ([`src/js/product.js`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/js/product.js))
Create `src/js/product.js` to link the "Add to Cart" button to local storage:

```javascript
import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
```

---

### Step 4.2: Shopping Cart Renderer ([`src/js/cart.js`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/js/cart.js))
Create `src/js/cart.js` to render saved cart items onto the screen:

```javascript
import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) return;

  // Supports array of items or single item object
  const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
  const htmlItems = itemsArray.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

renderCartContents();
```

---

### Step 4.3: Create Main Script Placeholder ([`src/js/main.js`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/js/main.js))
Create an empty file `src/js/main.js`.

---

## 🌐 Module 5: Views & HTML Templates

### Step 5.1: Create Homepage ([`src/index.html`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/index.html))
Create `src/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sleep Outside | Home</title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <header class="divider">
      <div class="logo">
        <img src="/images/noun_Tent_2517.svg" alt="tent image for logo" />
        <a href="index.html"> Sleep<span class="highlight">Outside</span></a>
      </div>
      <div class="cart">
        <a href="cart/index.html">🛒 Cart</a>
      </div>
    </header>
    <main class="divider">
      <section class="products">
        <h2>Top Products</h2>
        <ul class="product-list">
          <li class="product-card">
            <a href="product_pages/marmot-ajax-3.html">
              <h3 class="card__brand">Marmot</h3>
              <h2 class="card__name">Ajax Tent - 3-Person, 3-Season</h2>
              <p class="product-card__price">$199.99</p>
            </a>
          </li>
        </ul>
      </section>
    </main>
    <footer>&copy;2025 ⛺ SleepOutside</footer>
  </body>
</html>
```

---

### Step 5.2: Create Product Detail Page ([`src/product_pages/marmot-ajax-3.html`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/product_pages/marmot-ajax-3.html))
Create `src/product_pages/marmot-ajax-3.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Sleep Outside | Marmot Ajax 3 person tent</title>
    <link rel="stylesheet" href="../css/style.css" />
    <script src="../js/product.js" type="module"></script>
  </head>
  <body>
    <header class="divider">
      <div class="logo">
        <a href="../index.html"> Sleep<span class="highlight">Outside</span></a>
      </div>
    </header>
    <main class="divider">
      <section class="product-detail">
        <h3>Marmot</h3>
        <h2>Ajax Tent - 3-Person, 3-Season</h2>
        <p class="product-card__price">$199.99</p>
        <p class="product__color">Pale Pumpkin/Terracotta</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="880RR">Add to Cart</button>
        </div>
      </section>
    </main>
    <footer>&copy;NOT a real business</footer>
  </body>
</html>
```

---

### Step 5.3: Create Cart View ([`src/cart/index.html`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/cart/index.html))
Create `src/cart/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Sleep Outside | Cart</title>
    <link rel="stylesheet" href="/css/style.css" />
    <script src="../js/cart.js" type="module"></script>
  </head>
  <body>
    <header class="divider">
      <div class="logo">
        <a href="/index.html"> Sleep<span class="highlight">Outside</span></a>
      </div>
    </header>
    <main class="divider">
      <section class="products">
        <h2>My Cart</h2>
        <ul class="product-list"></ul>
      </section>
    </main>
  </body>
</html>
```

---

### Step 5.4: Create Checkout View Stub ([`src/checkout/index.html`](file:///home/thehyphen/byui/wdd330-sleepoutside/src/checkout/index.html))
Create `src/checkout/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Sleep Outside | Checkout</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <main class="divider">
      <section class="products">
        <h2>Review & Place your Order</h2>
      </section>
    </main>
  </body>
</html>
```

---

## 🏃 Module 6: Testing & Production Build

### Step 6.1: Start Local Development Server
Run the Vite development server:

```bash
npm run start
```
* Navigate to `http://localhost:5173/` in your web browser.

---

### Step 6.2: Format Code & Check Linting
Run Prettier and ESLint to verify code quality:

```bash
npm run format
npm run lint
```

---

### Step 6.3: Build for Production
Bundle your code into the `dist/` folder:

```bash
npm run build
```

---

🎉 **Congratulations!** You have built the SleepOutside web application starter codebase from scratch up to its current working checkpoint.
