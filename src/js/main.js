import  ProductData  from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

const productData = new ProductData();

const productList = new ProductList(
    'camping',
    productData,
    document.querySelector('#product-list')
);
loadHeaderFooter();
productList.init();