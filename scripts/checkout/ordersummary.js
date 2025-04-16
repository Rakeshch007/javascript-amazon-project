import {cart, renderCartQuantity, removeFromCart, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
//import {products} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import {deliveryOptions} from "../../data/delivery.js";
import { renderPaymentSummary } from "./paymentsummary.js";
import { middleHeaderElement } from "./checkout.js";
import { products } from "../../data/product-backend.js";



export function fromOrderSummary(){
    console.log('this is from order summary');
}

export function renderOrderSummary(){


    let cartItemsHtml = ``;

    cart.forEach((itemInCart)=>{

        const productId = itemInCart.id;
        let matchingProduct;

        products.forEach((product)=>{
            if(product.id === productId){
                matchingProduct = product;
            }
        });
    
        let deliveryOption;
        deliveryOptions.forEach((option)=>{
            if(option.deliveryOptionId === itemInCart.deliveryId){
                deliveryOption=option;
            }
        }); 

        const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');

        
        const html = `  <div class="cart-item-container js-item-container-${productId}">
                                <div class="delivery-date">
                                    Delivery date: ${dateString}
                                    </div>

                                    <div class="cart-item-details-grid">
                                        <img class="product-image"
                                            src="${matchingProduct.image}">

                                    <div class="cart-item-details">
                                        <div class="product-name">
                                            ${matchingProduct.name}
                                        </div>
                                        <div class="product-price">
                                            ${formatCurrency(matchingProduct.priceCents)}
                                            
                                        </div>
                                        <div class="product-quantity">
                                            <span>
                                                Quantity: <span class="quantity-label js-quantity-label-${productId}">${itemInCart.quantity}</span>
                                            </span>
                                            <span data-product-id = ${productId} class="update-quantity-link link-primary js-update-span">
                                                Update
                                            </span>
                                            <input class="quantity-input js-input-quantity-${productId}">
                                            <span data-product-id = ${productId} class="save-quantity-link link-primary js-save-span">Save
                                            </span>
                                            <span data-product-id = ${productId} class="delete-quantity-link link-primary js-delete-span">
                                                Delete 
                                            </span>
                                        </div>
                                    </div>

                                    <div class="delivery-options">
                                        <div class="delivery-options-title">
                                            Choose a delivery option:
                                            ${deliveryOptionsHtml(matchingProduct, itemInCart)}
                                        </div>
                                    
                                    </div>
                                </div>
                        </div>`;
        cartItemsHtml +=html;
    });

    document.querySelector(".js-order-summary-div").innerHTML = cartItemsHtml;


    const deleteSpanElements = document.querySelectorAll(".js-delete-span");

    deleteSpanElements.forEach((deleteLink)=>{
        deleteLink.addEventListener("click", ()=>{
        
        const productId = deleteLink.dataset.productId;
        removeFromCart(productId);
        const itemTobeDeleted= document.querySelector(`.js-item-container-${productId}`);
        itemTobeDeleted.remove();
        middleHeaderElement.innerHTML = `Checkout (<a class="return-to-home-link"
        href="amazon.html">${renderCartQuantity()} items</a>)`;   
        console.log(cart);
        renderOrderSummary();
        renderPaymentSummary();
            
        
        
        });
    });

    const updateSpanElements=document.querySelectorAll(".js-update-span");
    updateSpanElements.forEach((updateLink)=>{
        updateLink.addEventListener("click", ()=>{
            const productId=updateLink.dataset.productId;
            const container=document.querySelector(`.js-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
        });
    
    });

    const saveSpanElements = document.querySelectorAll('.js-save-span');
    saveSpanElements.forEach((saveLink)=>{
        saveLink.addEventListener("click", ()=>{
            
            const productId=saveLink.dataset.productId;
            const inputQuantityElement=document.querySelector(`.js-input-quantity-${productId}`);
            const newQuantity = inputQuantityElement.value;
            console.log(newQuantity);
            updateQuantity(productId, newQuantity);
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
            middleHeaderElement.innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${renderCartQuantity()} items</a>)`; 

            const container=document.querySelector(`.js-item-container-${productId}`);
            container.classList.remove('is-editing-quantity');
        })
    });

    function deliveryOptionsHtml(matchingProduct, cartItem){
        
        let html = ``;
        deliveryOptions.forEach((option)=>{
            const isChecked = cartItem.deliveryId === option.deliveryOptionId;
            const today = dayjs();
            const deliveryDate = today.add(option.deliveryDate, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = option.shippingPrice === 0?"FREE":`$${formatCurrency(option.shippingPrice)} - ` ;
            html+=`
                    <div data-product-id = ${cartItem.id} data-delivery-id=${option.deliveryOptionId} class="delivery-option js-radio-delivery">
                        <input type="radio" ${isChecked?'checked':''}
                            class="delivery-option-input "
                            name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                ${dateString}
                            </div>
                            <div class="delivery-option-price">
                                ${priceString} Shipping
                            </div>
                        </div>
                    </div>
            `;


        });
    return html;
    }


    document.querySelectorAll('.js-radio-delivery')
        .forEach((element)=>{
            element.addEventListener('click', ()=>{
                const {productId, deliveryId} = element.dataset;
                updateDeliveryOption(productId, deliveryId);
                console.log(cart);
                renderOrderSummary();
                renderPaymentSummary();

            });
        
            

        });


}