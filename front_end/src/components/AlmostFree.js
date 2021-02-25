import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AlmostFree(props) {

    const cart = useSelector((state) => state.cart);
    const newPrice = 100 - (cart.totalPrice * .865);
    
    if (cart.totalPrice < 100 && cart.totalPrice > 49.99) {
    return (
        <div className="almost-free">
            <Link to="/">
                <p>You'll Get Free Shipping For Adding Just ${newPrice.toFixed(2)} Worth Of Products!</p>
            </Link>
        </div>
    )
    } else {
        return null
    }
}
    

