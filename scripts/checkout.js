import {cart, renderCartQuantity, removeFromCart} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";



const middleHeaderElement= document.querySelector(".js-header-middle-section");
middleHeaderElement.innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${renderCartQuantity()} items</a>)`

let cartItemsHtml = ``;
cart.forEach((itemInCart)=>{

    const productId = itemInCart.id;
    let matchingProduct;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });
  
    
    const html = `  <div class="cart-item-container js-item-container-${productId}">
                            <div class="delivery-date">
                                Delivery date: Tuesday, June 21
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
                                            Quantity: <span class="quantity-label">${itemInCart.quantity}</span>
                                        </span>
                                        <span class="update-quantity-link link-primary">
                                            Update
                                        </span>
                                        <span data-product-id = ${productId} class="delete-quantity-link link-primary js-delete-span">
                                            Delete 
                                        </span>
                                    </div>
                                </div>

                                <div class="delivery-options">
                                    <div class="delivery-options-title">
                                         Choose a delivery option:
                                    </div>
                                    <div class="delivery-option">
                                        <input type="radio" checked
                                            class="delivery-option-input"
                                            name="delivery-option-${matchingProduct.id}">
                                    <div>
                                        <div class="delivery-option-date">
                                             Tuesday, June 21
                                        </div>
                                        <div class="delivery-option-price">
                                             FREE Shipping
                                        </div>
                                    </div>
                                 </div>
                                 <div class="delivery-option">
                                        <input type="radio"
                                            class="delivery-option-input"
                                            name="delivery-option-${matchingProduct.id}">
                                    <div>
                                        <div class="delivery-option-date">
                                             Wednesday, June 15
                                        </div>
                                        <div class="delivery-option-price">
                                             $4.99 - Shipping
                                        </div>
                                    </div>
                                 </div>
                                 <div class="delivery-option">
                                        <input type="radio"
                                            class="delivery-option-input"
                                            name="delivery-option-${matchingProduct.id}">
                                    <div>
                                        <div class="delivery-option-date">
                                        Monday, June 13
                                        </div>
                                        <div class="delivery-option-price">
                                        $9.99 - Shipping
                                        </div>
                                    </div>
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
        console.log(cart);
        const itemTobeDeleted= document.querySelector(`.js-item-container-${productId}`);
        itemTobeDeleted.remove();
        middleHeaderElement.innerHTML = `Checkout (<a class="return-to-home-link"
        href="amazon.html">${renderCartQuantity()} items</a>)`;   
    
      
    });
});