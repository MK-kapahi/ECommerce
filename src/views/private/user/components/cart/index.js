import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import CustomButton from "../../../../../components/atoms/customButton";
import './style.css'
import { useNavigate } from "react-router-dom";
import { decrementQuantity, editCart, editQuantity, incrementQuantity, requestOrder } from "../../../../../redux/action";
import { IMAGEURL, adminRoutes, routes, userRoutes } from "../../../../../shared/Constant";

export default function Cart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showLoader , setShowLoader ]= useState(false)
    const data = useSelector(state => state?.cartReducer);
    const cartElement = data ? data : []
    const [price, setPrice] = useState(0);
    let user = JSON.parse(localStorage.getItem("userInfo"))

    const navigateTiPaymentPage = (price) => {
        setShowLoader(true)
        const id = user._id
        console.log(cartElement)
        dispatch(requestOrder({ cartElement, id , handleOrderPlaced}))
    }

    const handleOrderPlaced = (response) => {
        if (response) {
            const order_Id = response.data._id
            setShowLoader(false)
            navigate("/shipping-details", { state: { priceOfItem: price , orderId : order_Id} })
        }

    }
    const handleIncrement = (itemId, itemPrice) => {

        dispatch(incrementQuantity({ itemId }));
        setPrice((prevPrice) => prevPrice + parseInt(itemPrice));

    }
    const handleDecrement = (itemId, itemPrice, itemQuantity, element) => {
        if (itemQuantity === 1) {
            handleRemoveFromCart(element)
            return
        }
        setPrice((prevPrice) => prevPrice - parseInt(itemPrice));
        dispatch(decrementQuantity({ itemId }))

    }

    const calculatePrice = () => {
        let amount = price
        if (!cartElement) {
            return
        }
        data.map((element) => {
            amount += parseInt(element.price) * element.quantity
        })
        setPrice(amount)
    }

    const handleRemoveFromCart = (id) => {
        let amount = 0
        const index = data.findIndex((element) => element._id === id._id);
        const tempData = [...data]
        tempData.splice(index, 1);
        dispatch(editCart({ tempData }))
        tempData.map((element) => {
            amount = amount + parseInt(element.price)
            console.log(amount)
        })
        setPrice(amount)
    }

    const navigateToHome = () => {
        navigate(routes.USER + "/" + userRoutes.DASHBOARD)
    }
    useEffect(() => {
        calculatePrice()
    }, [])

    return (
        <>
            <section>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col d-flex justify-content-center">
                            <div className="shopping-cart d-flex flex-row-reverse ">
                                <div className="topbar d-flex ">
                                    <div className="sidebar d-flex justify-content-between flex-column position-fixed">

                                        <p> Total Price : {price}</p>
                                        {
                                            price > 0 ? (<CustomButton className="btn btn-info" onClick={() => navigateTiPaymentPage(price)}> Buy Now </CustomButton>) : " "
                                        }

                                        <CustomButton className="btn btn-outline-warning" onClick={navigateToHome}> Continue Shoping </CustomButton>

                                    </div>
                                </div>
                                <div>
                                    {data.length > 0 ? (cartElement?.map((element) => {

                                        return (
                                            <div className="product-item-card">
                                                <h3> {element.title}</h3>
                                                <div className="item d-flex justify-content-between">
                                                    <div className="image d-flex flex-column ">
                                                        <img src={IMAGEURL + element.image} alt="" />
                                                        <div className="quantity d-flex">
                                                            <p> Quantity : </p>
                                                            <div className="d-flex">


                                                                <CustomButton className="minus-btn" type="button" name="button" onClick={() => handleDecrement(element._id, element.price, element.quantity, element)}> - </CustomButton>

                                                                <p>{element.quantity}</p>
                                                                <CustomButton className="plus-btn" type="button" name="button" onClick={() => handleIncrement(element._id, element.price)} > + </CustomButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column cart-description">

                                                        <div className="description">
                                                            <span>{element?.description}</span>
                                                        </div>



                                                        <div className="total-price"> Price :  ${element?.price}</div>
                                                        <div className="">
                                                            <CustomButton className="btn btn-danger" onClick={() => handleRemoveFromCart(element._id)}> Delete Item </CustomButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })) : " No items in the cart "
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { showLoader ?  (<div className="loading">Loading&#8230;</div>) : null}
            </section>

        </>
    )
}