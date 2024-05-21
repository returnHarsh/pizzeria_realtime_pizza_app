const CalculateTotalPrice = (cart)=>{
    let totalPrice = 0;

    cart.map(e=>{
        totalPrice += e.itemPrice;
    })

    return totalPrice;

}

export default CalculateTotalPrice;