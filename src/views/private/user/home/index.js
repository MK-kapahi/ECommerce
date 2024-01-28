import React from "react";
import "./style.css"
import ProductsView from "../components/showProducts";
import { useSelector } from "react-redux";

export default function UserHome() {

    const categoryId = useSelector(state => state?.categoryIdReducer.categoryId)
    const searchString = useSelector(state => state?.searchedValueReducer)
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div>
                               <ProductsView categoryId={categoryId} searchString={searchString}></ProductsView>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}