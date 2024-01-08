import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
    PaymentElement,
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from "react-router-dom";
import { errorFunction } from "../../../../Shared/Context";


export function StripePaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const client = location.state?.data || [];
    const user = location.state?.user;
    const options = {
        // passing the client secret obtained from the server
        clientSecret: client.clientSecret,
    };

    const clientSecret = client.clientSecret
    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();
            // Confirm the payment with the card element
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },

                }
            );

            if (confirmError) {
                console.error("Error confirming payment:", confirmError.message);
                navigate("/buyProduct")
                errorFunction(confirmError.message)
            } else if (paymentIntent.status === "succeeded") {
                navigate("/sucessPage")
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
            <section>
                <div className="container">
                    <div className="row">

                        <Elements stripe={stripePromise} options={options} >
                            <CheckoutForm />
                        </Elements>
                    </div>
                </div>
            </section>
        </>
    )
}