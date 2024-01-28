import React, { useEffect } from "react";
import './style.css'
import CustomButton from "../../../../../../../components/atoms/customButton";
import { useNavigate } from "react-router-dom";
import { routes, userRoutes } from "../../../../../../../shared/Constant";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../../../../../../redux/action";

export default function SuccessPage() {

    const navigate = useNavigate();
    localStorage.removeItem("persist:root")
    const dispatch = useDispatch()
    const handleBackToHome = ()=>{
    navigate(routes.USER+"/"+userRoutes.DASHBOARD)
    }

    useEffect(()=>{
        dispatch(emptyCart({}))
    })
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col successPage d-flex flex-column">
                            <div>
                                <CustomButton type="button" className="btn btn-info" onClick={handleBackToHome}>BackToHome</CustomButton>
                            </div>
                            <div className="printer-top"></div>

                            <div className="paper-container">
                                <div className="printer-bottom"></div>

                                <div className="paper">
                                    <div className="main-contents">
                                        <div className="success-icon">&#10004;</div>
                                        <div className="success-title">
                                            Payment Complete
                                        </div>
                                        <div className="success-description">
                                            Thank you for completing the payment! You will shortly receive an email of your payment.
                                        </div>
                                        <div className="order-details">
                                            <div className="order-number-label">Transaction ID</div>
                                            <div className="order-number">123456789</div>
                                            <div className="complement">Thank You!</div>
                                        </div>
                                    </div>
                                    <div className="jagged-edge"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )

}