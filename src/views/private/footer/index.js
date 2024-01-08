import React from "react";
import './style.css'

export default function Footer() {
    return (<>
        <div className="width-100 margin-top-50 footer">
            <div className="container d-flex justify-content-between">
                <div className="width-25">
                    <h2 className="quicklink-heading">Account Detail</h2>
                    <ul className="quicklink-menu">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Search</a></li>
                        <li><a href="#">Cart</a></li>
                        <li><a href="#">Checkout</a></li>
                    </ul>
                </div>
                <div className="width-25">
                    <h2 className="quicklink-heading">Quick Link</h2>
                    <ul className="quicklink-menu">
                        <li><a href="#">My Profile</a></li>
                        <li><a href="#">Change Password</a></li>
                        <li><a href="#">Order History</a></li>
                        <li><a href="#">My Whislist</a></li>
                        <li><a href="#">My Cashback</a></li>
                    </ul>
                </div>
                <div className="width-25">
                    <h2 className="quicklink-heading">Quick Link</h2>
                    <ul className="quicklink-menu">
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Faq</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Download App</a></li>
                        <li><a href="#">Refer & Earn Cashback</a></li>
                    </ul>
                </div>
                <div className="width-25">
                    <h2 className="quicklink-heading">GET IN TOUCH</h2>
                    <ul className="get-in-touch">
                        <li><i className="fa fa-envelope-o" aria-hidden="true"></i> E-MAIL:<a href="#" className="footer-e-mail"> info@dezven.com</a></li>
                        <li><i className="fa fa-headphones" aria-hidden="true"></i> WHATS-APP: +91 -123 456 789</li>
                        <li><i className="fa fa-fax" aria-hidden="true"></i> CONTACT NO.: +91 -(123)-4567890</li>
                        <li><i className="fa fa-globe" aria-hidden="true"></i> WEBSITE:<a href="#" className="footer-website"> https://www.dezven.com</a></li>
                    </ul>
                    {/* <ul class="social-media">
                        <li><a href="#"><img src="images/icon-facebook.png"/></a></li>
                        <li><a href="#"><img src="images/icon-twitter.png"/></a></li>
                        <li><a href="#"><img src="images/icon-linkedin.png"/></a></li>
                        <li><a href="#"><img src="images/icon-instagram.png"/></a></li>
                    </ul> */}
                </div>
            </div>
        </div>
    </>)

}