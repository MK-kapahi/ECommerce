import React from "react";
import { useDispatch } from "react-redux"
import './style.css'
// import { pay, stripePayment } from "../../../../Redux/Actions"
import { useLocation, useNavigate, } from "react-router-dom"
import { useEffect, useState } from "react";
const initialFormFields = {
    city: "",
    country: "",
    line1: "",
    line2: "",
    postalCode: "",
    state: "",
}
const formErrorsInitialState = {
    err: "",
};
export function PaymentPage() {

    const currentUser = JSON.parse(localStorage.getItem('userInfo'));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showButtom, setShowButton] = useState(true)


    const [formFields, setFormFeilds] = useState(initialFormFields)
    const [err, setErr] = useState(formErrorsInitialState)
    const [userData, setUserData] = useState([])
    const location = useLocation();
    const priceOfItem = location.state?.priceOfItem || null;
    const Product = location.state?.product
    const proceedToPay = () => {
        // dispatch(pay({ priceOfItem, handleResponse }))
    }
    const handleResponse = (res) => {
        console.log(res.data.links[1].href)
        const link = res.data.links[1].href
        window.location.href = link;
    }

    const handleStripeResponse = (res) => {
        console.log(res)
        if (res) {
            navigate("/stripePage", { state: { data: res.data, user: userData } })
        }
    }

    const proceedToPayByStripe = () => {
        // dispatch(stripePayment({ Product, currentUser, userData, handleStripeResponse }))

    }

    const validateInput = (field, value) => {
        switch (field) {
            case "city":
                setFormFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                break;

            case "country":

                setFormFeilds((prevFields) => ({ ...prevFields, [field]: value }));

                break;

            case "line1":
                setFormFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                break;

            case "line2":
                setFormFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                break;

            case "postalCode":
                if (!Number(value)) {
                    return;
                }
                else {

                    setFormFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                    break;
                }


            case "state":
                setFormFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                break;


            default:
                setFormFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            city,
            country,
            line1,
            line2,
            postalCode,
            state
        } = formFields;

        //Validation checks
        const isAllFieldsFilled =
            city.trim() === "" &&
            country.trim() === "" &&
            line1.trim() === "" &&
            line2.trim() === "" &&
            postalCode.trim() === "" &&
            state.trim() === "";
        if (isAllFieldsFilled) {
            setErr({ err: "All fields are compulsory" });
            return;
        }

        const data = {
            City: city,
            Country: country,
            Line1: line1,
            Line2: line2,
            PostalCode: postalCode,
            State: state,
        }
        setUserData(data)

        document.getElementById("submit").style.display = "none"
        setShowButton(false)
        resetForm()
    }

    const resetForm = () => {
        setFormFeilds(initialFormFields)
        setErr(formErrorsInitialState)
    }
    useEffect(() => {
    })
    return (
        <>
            <section className=" paymentPage">
                <div className="container ">
                    <div className="row">
                        <div className="col">
                            <div className="heading">
                                <h2> Payment Gateway </h2>
                            </div>
                            <form>
                                <div className="mb-3 row d-flex">
                                    <label className="col-sm-2 col-form-label">City </label>
                                    <input type="text" placeholder="city......" className="form-control input-text" value={formFields.city} onChange={(e) => validateInput('city', e.target.value)} ></input>
                                </div>
                                <div className="mb-3 row d-flex ">
                                    <label className="col-sm-2 col-form-label">country</label>
                                    <input type="text" placeholder="country......" className="form-control input-text" value={formFields.country} onChange={(e) => validateInput('country', e.target.value)} ></input>
                                </div>
                                <div className="mb-3 row d-flex">
                                    <label className="col-sm-2 col-form-label"> line1 </label>
                                    <input type="text" placeholder="line1......" className="form-control input-text" value={formFields.line1} onChange={(e) => validateInput("line1", e.target.value)} ></input>
                                </div>
                                <div className="mb-3 row d-flex">
                                    <label className="col-sm-2 col-form-label"> line2 </label>
                                    <input type="text" placeholder="line2......" className="form-control input-text" value={formFields.line2} onChange={(e) => validateInput("line2", e.target.value)} ></input>
                                </div>
                                <div className="mb-3 row d-flex">
                                    <label className="col-sm-2 col-form-label"> PostalCode </label>
                                    <input type="text" placeholder="Postal Code......" className="form-control input-text" value={formFields.postalCode} onChange={(e) => validateInput("postalCode", e.target.value)} ></input>
                                </div>
                                <div className="mb-3 row d-flex">
                                    <label className="col-sm-2 col-form-label"> state </label>
                                    <input type="text" placeholder="state......" className="form-control input-text" value={formFields.state} onChange={(e) => validateInput("state", e.target.value)} ></input>
                                </div>
                                <div className="d-flex justify-content-center">
                                    {err.err ? <h5 className="text-danger">{err.err}</h5> : null}
                                </div>


                                {
                                    !showButtom ? (
                                        <>
                                            <div className="mb-3 row d-flex justify-content-around paymentMethod" id="paymentMethod">

                                                <button type="button" className="buy_button btn btn-primary" onClick={proceedToPay} id="paymentMethodPaypal">
                                                    pay by paypal
                                                </button>
                                                <button type="button" className="buy_button btn btn-primary" onClick={proceedToPayByStripe} id="paymentMethodStripe">
                                                    pay by stripe
                                                </button>
                                            </div>
                                        </>
                                    ) : (<div>
                                        <button type="submit" onClick={handleSubmit} id="submit" className="btn btn-primary">
                                            submit
                                        </button>
                                    </div>)

                                }

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}