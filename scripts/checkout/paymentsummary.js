import {cart, renderCartQuantity, removeFromCart, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
//import {products} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import {deliveryOptions} from "../../data/delivery.js";
import { fromOrderSummary } from "./ordersummary.js";
import { products } from "../../data/product-backend.js";

export function renderPaymentSummary(){
    
    let totalItemsCost = 0;
    let shippingCosts=0;
    cart.forEach((itemInCart)=>{

        const productId = itemInCart.id;
        let matchingProduct;

        products.forEach((product)=>{
            if(product.id === productId){
                matchingProduct = product;
            }
        });
       totalItemsCost+=itemInCart.quantity*matchingProduct.priceCents;

       let deliveryOption;
       deliveryOptions.forEach((option)=>{
           if(option.deliveryOptionId === itemInCart.deliveryId){
               deliveryOption=option;
           }
       }); 

       shippingCosts+=deliveryOption.shippingPrice;


    });
    let totalBeforeTax = totalItemsCost+shippingCosts;
    
    
    
    totalItemsCost = Number(formatCurrency(totalItemsCost));
    shippingCosts=Number(formatCurrency(shippingCosts));
   
    let tax =totalBeforeTax*0.1;
    let totalOrderAfterTax = formatCurrency(totalBeforeTax+tax);
    totalBeforeTax = formatCurrency(totalBeforeTax);
    tax=formatCurrency(tax);
  
    
  
 

    let html =`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${totalItemsCost}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingCosts}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalOrderAfterTax}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
        document.querySelector('.js-payment-summary').innerHTML = html;
}