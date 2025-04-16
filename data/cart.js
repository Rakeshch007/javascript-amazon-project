

export let cart =JSON.parse(localStorage.getItem('cart'));
    if(!cart){
        cart =[];
    }


function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function renderCartQuantity(){
    let cartQuantity = 0;
    cart =JSON.parse(localStorage.getItem('cart'));
    cart.forEach((cartItem)=>{
        cartQuantity+=Number(cartItem.quantity);
    });

    return cartQuantity;
}

export let productData={};

export function addToCart(productId){
    // productData=addButton.dataset;

    let isProductAlreadyIncart = false;

    const selectElement= document.querySelector(`.js-select-quantity${productId}`);
    const quantity = Number(selectElement.value);
    cart.forEach((product, index)=>{
       
        if(product.id === productId){
            isProductAlreadyIncart=true;
            cart[index].quantity+=quantity;
        }
    });
    if(!isProductAlreadyIncart){
        cart.push({id:productId, 
            quantity:quantity, 
            deliveryId: 1
        }); 
    }
    saveToStorage();
}


export function removeFromCart(productId){
    const newTempCart = [];
    cart.forEach((cartItem)=>{
        if(cartItem.id !== productId){
            newTempCart.push(cartItem);
        }
    });
    cart = newTempCart;
    saveToStorage();
}

export function updateQuantity(productId, newQuantity){
    cart.forEach((cartItem)=>{
        if(cartItem.id === productId){
            cartItem.quantity = newQuantity;
        }
    });
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryId){
    cart.forEach((item)=>{
        if(item.id===productId){
            item.deliveryId = Number(deliveryId);
        }
    });
    saveToStorage();
}