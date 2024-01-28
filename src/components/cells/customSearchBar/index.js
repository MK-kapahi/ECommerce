import React from "react";
import CustomButton from "../../atoms/customButton";
import CustomInputFields from "../../atoms/customInput";
import { useLocation } from "react-router-dom";
export default function CustomSearchBar({ onChange , onClick }) {

    const location = useLocation();
    const isShippingPage = location.pathname === "/shipping-details";
    const isCartPage = location.pathname ==="/cart"
    const isSearchedProductPage = location.pathname ==="/user/searched-Product"

    return (
        <>
            <form className="d-flex">

                <CustomInputFields className="form-control me-3 ms-auto" type="search" placeholder="Search" aria-label="Search" onChange={onChange} />
               { isShippingPage || isCartPage || isSearchedProductPage ? (<CustomButton className="btn btn-outline-warning" type="button" onClick={onClick}>
                    Search
                </CustomButton>) : " "}

            </form>
        </>
    )
}