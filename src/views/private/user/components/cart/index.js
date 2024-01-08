import React from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../../../../components/atoms/customButton";
import './style.css'
import { useNavigate } from "react-router-dom";

export default function Cart() {

    const navigate = useNavigate()
    const data = useSelector(state => state?.cartReducer)

    const navigateTiPaymentPage = (price) => {
        console.log(price)
        navigate("/user/buyProduct", { priceOfItem: price })
       }
    console.log(data)
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div>
                            <div className="shopping-cart">

                                <div className="title">
                                    Shopping Bag
                                </div>

                                {data?.map((element) => {
                                    return (
                                        <div className="item d-flex">
                                            <div className="buttons">
                                                <span className="delete-btn"></span>
                                                <span className="like-btn"></span>
                                            </div>

                                            <div className="image">
                                                <img src={element?.image} alt="" />
                                            </div>
                                            <div className="d-flex flex-column cart-description">

                                                <div className="description">
                                                    <span>{element?.description}</span>
                                                </div>

                                                <div className="quantity d-flex">
                                                    <p> Quantity : </p>
                                                    <div className="d-flex">
                                                        <button className="plus-btn" type="button" name="button" >
                                                            +
                                                        </button>
                                                        <input type="text" name="name" value="1" />
                                                        <button className="minus-btn" type="button" name="button">
                                                            -
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="total-price">{element?.price}</div>
                                                <div className="">
                                                    <CustomButton className="btn btn-danger" > Delete Item </CustomButton>
                                                    <CustomButton className="btn btn-info" onClick={()=>navigateTiPaymentPage(element.price)}> Buy Now </CustomButton>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}