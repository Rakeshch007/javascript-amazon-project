export let cart =JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart =[];
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function renderCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity;
    });

    return cartQuantity;
}

export let productData={};

export function addToCart(addButton){
    productData=addButton.dataset;

    let isProductAlreadyIncart = false;

    const selectElement= document.querySelector(`.js-select-quantity${productData.productId}`);
    const quantity = Number(selectElement.value);
    cart.forEach((product, index)=>{
       
        if(product.id === productData.productId){
            isProductAlreadyIncart=true;
            cart[index].quantity+=quantity;
        }
    });
    if(!isProductAlreadyIncart){
        cart.push({id:productData.productId, quantity:quantity}); 
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