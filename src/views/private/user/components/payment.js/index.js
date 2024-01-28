import React from "react";
import { useDispatch, useSelector } from "react-redux"
import './style.css'
// import { pay, stripePayment } from "../../../../Redux/Actions"
import { useLocation, useNavigate, } from "react-router-dom"
import { useEffect, useState } from "react";
import { addAddress, editCart, getAddress, payByPaypal, stripePayment } from "../../../../../redux/action";
import Cart from "../cart";
import { IMAGEURL } from "../../../../../shared/Constant";
import CustomButton from "../../../../../components/atoms/customButton";
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
    const location = useLocation();
    const id = currentUser._id
    const address = useSelector(state => state?.addressReducer?.payload)
    const orderId = location.state?.orderId

    const [showButtom, setShowButton] = useState(true)
    const [formFields, setFormFeilds] = useState(initialFormFields)
    const [err, setErr] = useState(formErrorsInitialState)
    const data = useSelector(state => state?.cartReducer);
    const cartElement = data ? data : []
    const [userAddessData, setUserAddressData] = useState([])
    const priceOfItem = location.state?.priceOfItem || null;

    const proceedToPay = () => {
        dispatch(payByPaypal({ priceOfItem, handleResponse }))
    }
    const handleResponse = (res) => {
        console.log(res.data.links[1].href)
        const link = res.data.links[1].href
        window.location.href = link;
    }

    const handleStripeResponse = (res) => {
        if (res) {
            console.log(orderId)
            navigate("/stripePage", { state: { data: res.data, userAddress: userAddessData  , userDetails : currentUser , orderId : orderId} })
        }
    }

    const proceedToPayByStripe = () => {
        dispatch(stripePayment({ priceOfItem, currentUser, userAddessData, handleStripeResponse }))

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

    const calculateSubtotal = () => {
        let amount = 0
        if (!cartElement) {
            return
        }
        data.map((element) => {
            amount += parseInt(element.price) * element.quantity
        })
        return amount
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
            city: city,
            country: country,
            line1: line1,
            line2: line2,
            postalCode: postalCode,
            state: state,
        }
        setUserAddressData(data)
        dispatch(addAddress({ data, id }));
        document.getElementById("submit").style.display = "none"
        setShowButton(false)
        resetForm()
    }


    const resetForm = () => {
        setFormFeilds(initialFormFields)
        setErr(formErrorsInitialState)
    }
    const removeFromCart = (id) => {

        const index = data.findIndex((element) => element._id == id._id);
        const tempData = [...data]
        tempData.splice(index, 1);
        console.log(tempData)
        dispatch(editCart({ tempData }))
    }

    const handleCartDetailsPageNavigate = () => {
        navigate("/cart")
    }
    useEffect(() => {
        dispatch(getAddress({ id }))
        if (address) {
            setShowButton(false)
            setFormFeilds({
                city: address.city,
                country: address.country,
                line1: address.line1,
                line2: address.line2,
                postalCode: address.postalCode,
                state: address.state
            }) 
            setUserAddressData(address)
        }

    }, [])
    return (
        <>
            <section className="paymentPage miniCart-container">
                <div className="container ">
                    <div className="row">
                        <div className="col-lg-7 d-flex  align-items-center">
                            <form className="shipping-details-form">
                                <div className="heading">
                                    <h2> Shipping Details</h2>
                                </div>
                                <div className="mb-3 row d-flex justify-content-evenly">
                                    <label className="col-sm-2 col-form-label label">City </label>
                                    <input type="text" placeholder="city......" className="form-control input-text" value={formFields.city} onChange={(e) => validateInput('city', e.target.value)} disabled={address ? true : false} ></input>
                                </div>
                                <div className="mb-3 row d-flex justify-content-evenly">
                                    <label className="col-sm-2 col-form-label label">Country</label>
                                    <input type="text" placeholder="country......" className="form-control input-text" value={formFields.country} onChange={(e) => validateInput('country', e.target.value)} disabled={address ? true : false} ></input>
                                </div>
                                <div className="mb-3 row d-flex justify-content-evenly">
                                    <label className="col-sm-2 col-form-label label"> Line1 </label>
                                    <input type="text" placeholder="line1......" className="form-control input-text" value={formFields.line1} onChange={(e) => validateInput("line1", e.target.value)} disabled={address ? true : false} ></input>
                                </div>
                                <div className="mb-3 row d-flex justify-content-evenly">
                                    <label className="col-sm-2 col-form-label label"> Line2 </label>
                                    <input type="text" placeholder="line2......" className="form-control input-text" value={formFields.line2} onChange={(e) => validateInput("line2", e.target.value)} disabled={address ? true : false} ></input>
                                </div>
                                <div className="mb-3 row d-flex justify-content-evenly">
                                    <label className="col-sm-2 col-form-label label"> PostalCode </label>
                                    <input type="text" placeholder="Postal Code......" className="form-control input-text" value={formFields.postalCode} onChange={(e) => validateInput("postalCode", e.target.value)} disabled={address ? true : false} ></input>
                                </div>
                                <div className="mb-3 row d-flex justify-content-evenly">
                                    <label className="col-sm-2 col-form-label label"> State </label>
                                    <input type="text" placeholder="state......" className="form-control input-text" value={formFields.state} onChange={(e) => validateInput("state", e.target.value)} disabled={address ? true : false} ></input>
                                </div>
                                <div className="d-flex justify-content-center">
                                    {err.err ? <h5 className="text-danger">{err.err}</h5> : null}
                                </div>


                                {
                                    !showButtom ? (
                                        <>
                                            <div className="mb-3 row d-flex justify-content-around paymentMethod" id="paymentMethod">

                                                {/* <button type="button" className="buy_button btn btn-primary" onClick={proceedToPay} id="paymentMethodPaypal">
                                                    pay by paypal
                                                </button> */}
                                                <button type="button" className="buy_button btn btn-primary" onClick={proceedToPayByStripe} id="paymentMethodStripe">
                                                    pay by stripe
                                                </button>
                                            </div>
                                        </>
                                    ) : (<div className="mb-3 row d-flex justify-content-center">
                                        <button type="submit" onClick={handleSubmit} id="submit" className="btn btn-primary submitButton">
                                            Submit
                                        </button>
                                    </div>)

                                }

                            </form>
                        </div>

                        <div className=" col-lg-3 minicart">
                            <div className="minicart--item-container">
                                <span className="minicart--item-count" style={{ fontWeight: 600 }}>
                                    {cartElement.length} items
                                </span>{" "}
                                in your cart!
                            </div>
                            <hr />
                            <ul>
                                {cartElement.map((item, index) => (
                                    <li className="minicart--item" key={index}>
                                        <div className="placeholder d-flex ">
                                            <div className="product_display d-flex flex-column">
                                                <img src={IMAGEURL + item.image}></img>
                                                <p className="material">
                                                    <span style={{ fontWeight: 600 }}>Quantity:</span> {item.quantity}
                                                </p>
                                            </div>
                                            <div className="product_discription">

                                                <h2 className="title">{item.title}</h2>
                                                <p className="price">${item.price} USD</p>
                                                <p className="remove">
                                                    <CustomButton type="button" onClick={() => removeFromCart(item)}>  Remove from cart</CustomButton>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <div className="minicart--subtotal">
                                <p className="minicart--subtotal-title">Subtotal</p>
                                <p className="minicart--subtotal-amount">${calculateSubtotal()}</p>
                            </div>
                            <CustomButton type="button" className="cartDetailsButton" onClick={handleCartDetailsPageNavigate}>View Cart Details</CustomButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}