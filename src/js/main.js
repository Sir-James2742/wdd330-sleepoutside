import { ProductData } from './ProductData.mjs';
import { productList } from './ProductList.mjs';
const productData = new ProductData();
const productList = new ProductList('camping', productData, document.querySelector('#product-list'));