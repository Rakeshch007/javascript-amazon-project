import {products} from "../data/products.js";
import {cart, addToCart, productData} from "../data/cart.js";

let productsHtml ='';

products.forEach((product)=>{
    const html =`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents/100}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div data-product-id="${product.id}" class="added-to-cart js-added-message-div">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button data-price = "${product.priceCents}" data-product-id="${product.id}"  data-product-name="${product.name}" class="add-to-cart-button button-primary js-add-cart-button">
            Add to Cart
          </button>
        </div>`
    productsHtml+=html;
});

const productsGridElement= document.querySelector('.js-grid-div');
productsGridElement.innerHTML=productsHtml;

const addButtonElements= document.querySelectorAll('.js-add-cart-button');




function renderCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity;
    });

    const divQuantityElement = document.querySelector('.js-cart-quantity');
    divQuantityElement.innerHTML = cartQuantity

}

addButtonElements.forEach((addButton)=>{
    addButton.addEventListener("click",()=>{
    
        addToCart(addButton);
       
        renderCartQuantity();



      const divAddElements = document.querySelectorAll('.js-added-message-div');
        
      divAddElements.forEach((addMessageElement)=>{
            if(productData.productId === addMessageElement.dataset.productId){
                    addMessageElement.style.opacity =1;
                    setTimeout(() => {
                        addMessageElement.style.opacity=0;
                    }, 1200);
            }

      });


        console.log(cart);
    } );
    
});


