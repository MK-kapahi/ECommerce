import React from "react";
import CustomButton from "../../atoms/customButton";
import CustomInputFields from "../../atoms/customInput";
export default function CustomSearchBar() {

    return (
        <>
            <form className="d-flex">

                <CustomInputFields className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> 
                <CustomButton className="btn btn-outline-success" type="submit" >
                    Search
                </CustomButton>

            </form>
        </>
    )
}