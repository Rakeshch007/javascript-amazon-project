export let cart =[{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2
    },
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1
    }
];



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
}