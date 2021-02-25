import React from 'react'
import { useSelector } from 'react-redux';

export default function AlmostFree(props) {

    const cart = useSelector((state) => state.cart);
    const newPrice = 100 - cart.totalPrice;
    
    if (cart.totalPrice < 100 && cart.totalPrice > 49.99) {
    return (
        <div className="almost-free">
            <p>You'll Get Free Shipping For Adding Just ${newPrice.toFixed(2)} Worth Of Products!</p>
        </div>
    )
    } else {
        return null
    }
}
    

