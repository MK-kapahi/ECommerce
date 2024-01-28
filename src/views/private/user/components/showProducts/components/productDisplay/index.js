import React, { useEffect } from "react";
import './style.css'
import { useLocation, useNavigate } from "react-router-dom";
import { IMAGEURL } from "../../../../../../../shared/Constant";
import CustomButton from "../../../../../../../components/atoms/customButton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, editCart, getAllProducts } from "../../../../../../../redux/action";

export default function ProductDisplay() {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector(state => state?.productsReducer?.payload)
    const cartData = useSelector(state => state?.cartReducer)
    const productData = location.state.product
    console.log(product)

    const categoryId = productData.categoryId._id;

    const itemAddedToCart = (id) => {
        if (!cartData) {
            return
        }

        const filteredData = cartData?.filter((element) => {
            if (element._id === id) {
                return element
            }
        })
        if (filteredData.length === 1) {
            return true
        }

        else {
            return false
        }
    }
    const handleBackToProductsPage = () => {
        navigate("/user/dashboard")
    }
    const showSizes = () => {
        if (productData.categoryId.categoryName === "tops" && productData.categoryId.categoryName === "womens-dresses") {
            return true
        }

        else { return false }

    }

    const handleAddToCart = () => {
        const element = productData
        element.quantity = 1;
        dispatch(addToCart({ element }))
    }
    const handleRemoveFromCart = () => {
        const index = cartData.findIndex((element) => element._id === productData._id);
        const tempData = [...cartData]
        tempData.splice(index, 1);
        dispatch(editCart({ tempData }))
    }

    useEffect(() => {
        dispatch(getAllProducts({ categoryId }))
    }, [])
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="container mt-5 mb-5">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-10">
                                    <div className="card">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="images p-3">
                                                    <div className="text-center p-4"> <img id="main-image" src={IMAGEURL + productData?.image} width="250" /> </div>
                                                    <div className="thumbnail text-center"> <img onclick="change_image(this)" src={IMAGEURL + productData?.image} width="70" /> <img onclick="change_image(this)" src={IMAGEURL + productData?.image} width="70" /> </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="product p-4">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center"> <i className="fa fa-long-arrow-left"></i> <span className="ml-1" onClick={handleBackToProductsPage}>Back</span> </div> <i className="fa fa-shopping-cart text-muted"></i>
                                                    </div>
                                                    <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">Orianz</span>
                                                        <h5 className="text-uppercase">{productData?.title}</h5>
                                                        <div className="price d-flex flex-row align-items-center"> <span className="act-price">${productData.price}</span>
                                                            {/* <div className="ml-2"> <small className="dis-price">$59</small> <span>40% OFF</span> </div> */}
                                                        </div>
                                                    </div>
                                                    <p className="about">{productData?.description}</p>
                                                    {showSizes() ? (<div className="sizes mt-5">
                                                        <h6 className="text-uppercase">Size</h6> <label className="radio"> <input type="radio" name="size" value="S" checked /> <span>S</span> </label> <label className="radio"> <input type="radio" name="size" value="M" /> <span>M</span> </label> <label className="radio"> <input type="radio" name="size" value="L" /> <span>L</span> </label> <label className="radio"> <input type="radio" name="size" value="XL" /> <span>XL</span> </label> <label className="radio"> <input type="radio" name="size" value="XXL" /> <span>XXL</span> </label>
                                                    </div>) : " "}
                                                    <div className="cart mt-4 align-items-center">
                                                        {/* <CustomButton className="btn btn-danger text-uppercase mr-2 px-4" onClick={handleAddToCart}> Add to cart</CustomButton> */}
                                                        {
                                                            itemAddedToCart(productData._id) ? (<CustomButton className="btn btn-danger remove-Cart-button" type="button" onClick={handleRemoveFromCart} >Remove from cart </CustomButton>) : (<CustomButton className="btn btn-danger text-uppercase mr-2 px-4" onClick={handleAddToCart}> Add to cart</CustomButton>)
                                                        }
                                                        <i className="fa fa-heart text-muted"></i> <i className="fa fa-share-alt text-muted"></i> </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="related-products">
                                <h3 className="text-uppercase">Related Products</h3>
                                <div className="row justify-content-evenly">
                                    {product?.result?.map((relatedProduct) => (

                                        relatedProduct._id == productData._id ? null :(
                                        <div key={relatedProduct.id} className="col-md-4 mb-4 relatedProduct-card">
                                            <div className="card">
                                                <img src={IMAGEURL + relatedProduct.image} className="card-img-top" alt={relatedProduct.title} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{relatedProduct.title}</h5>
                                                    <p className="card-text">${relatedProduct.price}</p>
                                                    <CustomButton className="btn btn-danger text-uppercase" onClick={() => handleAddToCart(relatedProduct)}>Add to cart</CustomButton>
                                                </div>
                                            </div>
                                        </div>)
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}