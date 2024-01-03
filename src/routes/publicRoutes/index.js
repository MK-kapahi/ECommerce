import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "../../views/public/login";

import 'react-toastify/dist/ReactToastify.css';
import SignUp from "../../views/public/signup";
import { adminRoutes, routes } from "../../shared/Constant";
import AdminHome from "../../views/private/admin/home";
import CreateCategory from "../../views/private/admin/components/createCategory";
import CreateProduct from "../../views/private/admin/components/createProduct";
import Cookies from "universal-cookie";
import Navbar from "../../views/private/navbar";
import ShowUsers from "../../views/private/admin/components/showUsers";
import ShowProducts from "../../views/private/admin/components/showProducts";
import EditUser from "../../views/private/admin/components/showUsers/components/editUser";
import EditProduct from "../../views/private/admin/components/showProducts/components/editProduct";


export default function PublicRoutes() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    let token = cookies.get('token');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {

        if (token) {

            navigate("/admin/dashboard")
            setIsAuthenticated(true);
        }

        else {

            setIsAuthenticated(false);
            navigate('/login')

        }
    }, [token]);
    return (
        <>


            {isAuthenticated && <Navbar />}
            <Routes>
                <Route exact path={routes.LOGIN} element={<Login />}></Route>
                <Route exact path={routes.SIGNUP} element={<SignUp />}></Route>
                <Route path={routes.ADMIN}>
                    <Route exact path={adminRoutes.DASHBOARD} element={<AdminHome />} />
                    <Route exact path={adminRoutes.CREATE_CATEGORY} element={<CreateCategory />} />
                    <Route exact path={adminRoutes.CREATE_PRODUCT} element={<CreateProduct />} />
                    <Route exact path={adminRoutes.USERS} element={<ShowUsers />}>
                    </Route>
                    <Route exact path={adminRoutes.UPDATE} element={<EditUser />}></Route>
                    <Route exact path={adminRoutes.PRODUCTS} element={<ShowProducts />}></Route>
                    <Route exact path={adminRoutes.UPDATE_PRODUCT} element = {<EditProduct></EditProduct>}></Route>
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