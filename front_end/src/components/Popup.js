import React from 'react'

export default function Popup()  {  
    
    const closePopUp = (e) => {
        e.preventDefault();
        const popup = document.getElementById("popup");
        popup.style.display = "none";
      };
    
    return (
        <form onSubmit={closePopUp} className="popup" id="popup">
            <div className="popup-inner">
                <div className="popup-title">
                    <h1>GET THESE DEALS NOW</h1>
                </div>
                <button type="submit">Close</button>  
                <h1>Hi, welcome to the Steel | Line, a Pittsburgh sports-based e-commerce site! Here are some things for you to know.</h1>
                <ul>
                    <li>
                        User email is suzy@example.com, and the password is '1234'. 
                    </li>
                    <li>
                        The Admin email is !!!!!!, and the password is '!!!!!' .
                        <p>Because of potential abuse, please email me JohnsAWebDev@gmail.com for the email and pass.</p>
                    </li>
                    <li>
                        The PayPal login is yourname@personal.example.com and the password is 'hirejohn'.
                        <p>CAREFUL TO NOT USE YOUR OWN REAL PAYPAL</p>
                    </li>
                </ul>  
                <h1>Here are some things to try!</h1>
                <ul>
                    <li>
                        Click around, search for items, put stuff in your cart, shop, check out, put in your shipping, send payment, log out, sign in, & create a profile!
                    </li>
                    <li>
                        Get your cart above $50 but below $100.
                    </li>
                    <li>
                        Look for the Almost Sold Out and Sold Out banners.
                    </li>
                    <li>
                        As an Admin, create a new product. *COMING SOON* Upload your own photo!
                    </li>
                    <li>
                        Try out the mobile version!
                    </li>
                    <li>
                        As Admin, you can also remove users and products.
                        <p>This is purely for demonstratable purposes, please do not delete users or products</p>
                    </li>
                    <li>
                        Leave a review!
                    </li>
                    <li>
                        Find the 404 page.
                    </li>
                    <li>
                        If You Find Any Bugs, Please <a href="mailto:johnsawebdev@gmail.com?subject=Steel Line Bug">Email them to me.</a>  
                    </li>
                </ul>
                <button type="submit">X</button>  
            </div>
        </form>
    )
}
