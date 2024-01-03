import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminRoutes, routes } from "../../../shared/Constant";
import CustomButton from "../../../components/atoms/customButton";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/action";
import {toast} from "react-toastify"
import './style.css'
export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        dispatch(logoutUser({handleResponse}))
    }
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
    
    return (
        <>
            {/*admin navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar_update">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"> Hi Admin </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/dashboard" activeclassname="active" >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/category" activeclassname="active" >
                                    Create Category
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/allProducts" activeclassname="active" >
                                    View Products
                                </NavLink>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/product" activeclassname="active" >
                                    Create Product
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/allUsers" activeclassname="active" >
                                    Users
                                </NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>

                        <div>
                            <CustomButton className="btn btn-outline-success" type="button" onClick={handleLogout}> Logout </CustomButton>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}