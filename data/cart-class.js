
class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
       
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItems =JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
            this.cartItems =[];
        }
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId){
        
    
        let isProductAlreadyIncart = false;
    
        // const selectElement= document.querySelector(`.js-select-quantity${productId}`);
        // const quantity = Number(selectElement.value);
        const quantity = 1;
        this.cartItems.forEach((product, index)=>{
           
            if(product.id === productId){
                isProductAlreadyIncart=true;
                this.cartItems[index].quantity+=quantity;
            }
        });
        if(!isProductAlreadyIncart){
            this.cartItems.push({id:productId, quantity:quantity, deliveryId: 1}); 
        }
        this.saveToStorage();
    }

    removeFromCart(productId){
        const newTempCart = [];
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.id !== productId){
                newTempCart.push(cartItem);
            }
        });
         this.cartItems=newTempCart;
        this.saveToStorage();
    }
    
}

const cart1 = new Cart('cart-class');
console.log(cart1);
cart1.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
console.log(cart1);
