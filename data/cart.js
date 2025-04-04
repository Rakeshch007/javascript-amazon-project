export const cart =[];

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
        cart.push({id:productData.productId, productName: productData.productName, quantity:quantity}); 
    }
}