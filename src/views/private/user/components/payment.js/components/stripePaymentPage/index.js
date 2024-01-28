import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import './style.css'
import {
    PaymentElement,
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { cartRoutes, routes } from "../../../../../../../shared/Constant";
import { editOrderStatus } from "../../../../../../../redux/action";
import { useDispatch } from "react-redux";


export function StripePaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const client = location.state?.data || [];
    const address = location.state?.userAddress;
    console.log(address)
    const orderId = location.state?.orderId
    const User = location.state?.userDetails
    const options = {
        clientSecret: client.clientSecret,
    };

    const clientSecret = client.clientSecret
    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: User.name,
                            email: User.email,
                            address: {
                                city: address.City,
                                country: address.Country,
                                line1: address.Line1,
                                line2: address.Line2,
                                postal_code: address.PostalCode,
                                state: address.State,
                            },
                        },
                    },
                }
            );

            if (confirmError) {
                console.log(orderId)
                console.error("Error confirming payment:", confirmError.message);
                navigate("/" + cartRoutes.ERROR_PAGE, { state: { id: orderId } })
                toast.error(confirmError.message, {
                    position: toast.POSITION.TOP_RIGHT
                })

            } else if (paymentIntent.status === "succeeded") {
                console.log(paymentIntent)
                navigate("/success-Page")

                const status = false;
                const id = orderId
                dispatch(editOrderStatus({id , status}))
                console.log("Payment succeeded!");
            }
        };

        return (
            <>
                <form onSubmit={handleSubmit} className="stripeCardForm d-flex flex-column justify-content-center">
                    <CardElement />
                    <button type="submit" disabled={!stripe} className="btn btn-primary">
                        Pay
                    </button>
                </form>
            </>
        );
    };

    const stripePromise = loadStripe('pk_test_51OOKRCSHn7J9oTBWzgz8K57nmzi9cqDhPdUZHQnMT4ZM05tL8lv0nh8bmQirHx24NW9YHN8sJeec3xSS5YZTRUJm0010vdSORf');

    return (
        <>
            <section className="stripe-container">
                <div className="container">
                    <div className="row gap-5">
                        <h3>
                            Add Card Details
                        </h3>
                        <Elements stripe={stripePromise} options={options} >
                            <CheckoutForm />
                        </Elements>
                    </div>
                </div>
            </section>
        </>
    )
}