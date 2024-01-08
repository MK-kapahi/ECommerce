import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { adminRoutes, routes } from "../../../shared/Constant";
import CustomButton from "../../../components/atoms/customButton";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/action";
import { toast } from "react-toastify"
import './style.css'
import CustomSearchBar from "../../../components/cells/customSearchBar";
export default function Navbar() {

    const location = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("userInfo"))
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const handleLogout = () => {
        localStorage.clear()
        dispatch(logoutUser({ handleResponse }))
    }
    useEffect(() => {
        if (user?.role === 1) {

            setIsAdmin(true)
        }
        else {
            setIsUser(true)

        }
    }, [])
    const handleResponse = (response) => {
        console.log(response)
        navigate('/login')
        if (response.status === 200) {

            toast.success("logout  Successfullly "
                , {
                    position: toast.POSITION.TOP_RIGHT,
                })
        }

        else {
            toast.error(response.response.data.message
                , {
                    position: toast.POSITION.TOP_RIGHT,
                })
        }
    }


    const isShowProductsPage = location.pathname === "/admin/allProducts";
    const isUserShowProductsPage = location.pathname === "/user/showProducts";
    const isShowUsersPage = location.pathname === "/admin/allUsers";

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar_update">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"> {isAdmin ? "Hi Admin" : `Hi ${user?.name}`} </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={isAdmin ? "/admin/allProducts" : "/user/dashboard"} activeclassname="active" >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                {isAdmin ? (<>
                                    <NavLink className="nav-link" to="/admin/category" activeclassname="active" >
                                        Create Category
                                    </NavLink>
                                </>) : ""
                                }
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={isAdmin ? "/admin/allProducts" : "/user/showProducts"} activeclassname="active" >
                                    All Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                {
                                    isAdmin ? (<>
                                        <NavLink className="nav-link" to="/admin/product" activeclassname="active" >
                                            Create Product
                                        </NavLink>
                                    </>) :(<>
                                        <NavLink className="nav-link" to="/user/cart" activeclassname="active" >
                                          Cart
                                        </NavLink>
                                    </>)
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    isAdmin ? (<>
                                        <NavLink className="nav-link" to="/admin/allUsers" activeclassname="active" >
                                            Users
                                        </NavLink>
                                    </>) : ""
                                }
                            </li>
                        </ul>
                        {
                            isShowProductsPage || isShowUsersPage || isUserShowProductsPage ? (<CustomSearchBar />) : " "
                        }
                        <div>
                            <CustomButton className="btn btn-outline-success" type="button" onClick={handleLogout}> Logout </CustomButton>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}