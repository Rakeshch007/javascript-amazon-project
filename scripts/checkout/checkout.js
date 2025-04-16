import {renderCartQuantity} from "../../data/cart.js";

import { renderOrderSummary } from "./ordersummary.js";
import { renderPaymentSummary } from "./paymentsummary.js";
import "../../data/cart-class.js";
import { loadProducts, loadProductsFetch  } from "../../data/product-backend.js";
import "../../data/product-backend.js";



export const middleHeaderElement= document.querySelector(".js-header-middle-section");
middleHeaderElement.innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${renderCartQuantity()} items</a>)`;

/*
loadProductsFetch().then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});  

*/

async function loadPage(){
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();


/*
new Promise((resolve)=>{
    loadProducts(resolve);

}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

*/

/* loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

*/






