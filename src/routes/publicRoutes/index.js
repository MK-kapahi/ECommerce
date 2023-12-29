import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "../../views/public/login";

import 'react-toastify/dist/ReactToastify.css';
import SignUp from "../../views/public/signup";
import {  adminRoutes, routes } from "../../shared/Constant";
import AdminHome from "../../views/private/admin/home";
import CreateCategory from "../../views/private/admin/components/createCategory";
import CreateProduct from "../../views/private/admin/components/createProduct";


export default function PublicRoutes() {
    // const cookies = new Cookies();
    // const navigate = useNavigate();
    // let token = cookies.get('token');
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // useEffect(() => {
    //     if (token) {
    //         navigate('/home')
    //         setIsAuthenticated(true);
    //     }

    //     else {
    //         setIsAuthenticated(false);
    //         navigate('/login')
    //         socket.emit('logout')
    //     }
    // }, [token]);
    return (
        <>


            {/* {isAuthenticated && <Navbar />} */}
            <Routes>
                <Route exact path={routes.LOGIN} element={<Login />}></Route>
                <Route exact path={routes.SIGNUP} element={<SignUp />}></Route>
                <Route path={routes.ADMIN}>
                <Route exact path={adminRoutes.DASHBOARD} element={<AdminHome/>}/>
                <Route exact path={adminRoutes.CREATE_CATEGORY} element={<CreateCategory/>}/>
                <Route exact path={adminRoutes.CREATE_PRODUCT} element={<CreateProduct />}/>
                </Route>
                {/* <Route exact path='/home' element={<Home />}></Route>
                <Route exact path='/applyFilter' element={<FilterPage />} > </Route>
                <Route exact path='/chat' element={< ChatRoom />} > </Route>
                <Route exact path='/update/:id' element={<UpdateUser />}></Route>
                <Route exact path='/products' element={<Product />}></Route>
                <Route exact path='/buyProduct' element={<PaymentPage />}></Route> */}
            </Routes>
            {/* {isAuthenticated && <Footer />} */}
        </>

    )
}