import { Routes, Route, useNavigate, Redirect, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "../../views/public/login";

import 'react-toastify/dist/ReactToastify.css';
import SignUp from "../../views/public/signup";
import { adminRoutes, cartRoutes, routes, userRoutes, vendorRoutes } from "../../shared/Constant";
import AdminHome from "../../views/private/admin/home";
import CreateCategory from "../../views/private/vendor/components/createCategory/index.js";
import CreateProduct from "../../views/private/vendor/components/createProduct"
import Cookies from "universal-cookie";
import Navbar from "../../views/private/navbar";
import ShowUsers from "../../views/private/admin/components/showUsers";
import ShowProducts from "../../views/private/admin/components/showProducts";
import EditUser from "../../views/private/admin/components/showUsers/components/editUser";
import EditProduct from "../../views/private/admin/components/showProducts/components/editProduct";
import UserHome from "../../views/private/user/home";
import Cart from "../../views/private/user/components/cart";
import Footer from "../../views/private/footer";
import { PaymentPage } from "../../views/private/user/components/payment.js";
import { ProcessPage } from "../../views/private/user/components/payment.js/components/processingPage/index.js";
import { StripePaymentPage } from "../../views/private/user/components/payment.js/components/stripePaymentPage/index.js";
import SuccessPage from "../../views/private/user/components/payment.js/components/sucessPaymentPage/index.js";
import ProductDisplay from "../../views/private/user/components/showProducts/components/productDisplay/index.js";
import SearchedProducts from "../../views/private/user/components/searchedProducts/index.js";
import NoRole from "../../views/private/noRole/index.js";
import ErrorPaymentPage from "../../views/private/user/components/payment.js/components/errorPaymentPage/index.js";
import ProfilePage from "../../views/private/user/components/profilePage/index.js";
import ShowOrders from "../../views/private/admin/components/showOrders/index.js";
import VendorHome from "../../views/private/vendor/home/index.js";


export default function PublicRoutes() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    let token = cookies.get('token');
    const location = useLocation();
    let user = JSON.parse(localStorage.getItem("userInfo"))
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [isVendor, setIsVendor] = useState(false)
    const isProcessingPage = location.pathname === "/processing-page";
    const isSuccessPage = location.pathname === "/success-Page";
    const isStripePage = location.pathname === "stripePage";
    const isErrorPage = location.pathname === "/" + cartRoutes.ERROR_PAGE
    useEffect(() => {


        if (token) {
            setIsAuthenticated(true);
            if (user) {
                if (user?.role == 1) {

                    setIsAdmin(true)
                }
                if (user?.role == 2) {
                    setIsUser(true)
                }
                if (user?.role === 3) {
                    setIsVendor(true)
                }
            }
        }

        else {
            setIsAuthenticated(false);
            navigate('/login')
        }
    }, [token]);
    return (
        <>
            {isAuthenticated && !isProcessingPage && !isStripePage && !isSuccessPage && !isErrorPage && <Navbar />}
            <Routes>
                <Route exact path={routes.LOGIN} element={<Login />}></Route>
                <Route exact path={routes.SIGNUP} element={<SignUp />}></Route>
                {isAdmin && < Route path={routes.ADMIN}>

                    <Route exact path={adminRoutes.DASHBOARD} element={<AdminHome />} />
                    <Route exact path={adminRoutes.USERS} element={<ShowUsers />}>
                    </Route>
                    <Route exact path={adminRoutes.ORDERS} element={<ShowOrders></ShowOrders>}></Route>
                    <Route exact path={adminRoutes.UPDATE} element={<EditUser />}></Route>
                    <Route exact path={adminRoutes.PRODUCTS} element={<ShowProducts />}></Route>
                    <Route exact path={adminRoutes.UPDATE_PRODUCT} element={<EditProduct></EditProduct>}></Route>
                </Route>
                }
                {
                    isUser && <Route path={routes.USER}>
                        <Route exact path={userRoutes.DASHBOARD} element={<UserHome />} />
                        <Route exact path={userRoutes.SINGLE_PRODUCT} element={<ProductDisplay></ProductDisplay>}></Route>
                        <Route eact path={userRoutes.SEARCHED_PRODUCTS} element={<SearchedProducts></SearchedProducts>}></Route>
                        <Route eact path={userRoutes.PROFILE} element={<ProfilePage />}></Route>
                    </Route>
                }
                <Route path={routes.CART}>
                    <Route exact path="" element={<Cart></Cart>}></Route>
                </Route>
                <Route exact path={cartRoutes.BUY} element={<PaymentPage />}></Route>
                <Route exact path={cartRoutes.PROCESSING_PAGE} element={<ProcessPage></ProcessPage>}></Route>
                <Route exact path="stripePage" element={<StripePaymentPage></StripePaymentPage>}></Route>
                <Route exact path={cartRoutes.SUCCESS_PAGE} element={<SuccessPage></SuccessPage>}></Route>
                <Route exact path={routes.NO_ROLE} element={<NoRole></NoRole>}></Route>
                <Route exact path={cartRoutes.ERROR_PAGE} element={<ErrorPaymentPage></ErrorPaymentPage>}></Route>

                {isVendor && <Route path={routes.VENDOR} >
                    <Route exact path={vendorRoutes.DASHBOARD} element={<VendorHome></VendorHome>}></Route>
                    <Route exact path={vendorRoutes.CREATE_CATEGORY} element={<CreateCategory />} />
                    <Route exact path={vendorRoutes.CREATE_PRODUCT} element={<CreateProduct />} />
                </Route>
                }
            </Routes>
            {isAuthenticated && !isProcessingPage && !isStripePage && !isSuccessPage && !isErrorPage && <Footer />}
        </>

    )
}