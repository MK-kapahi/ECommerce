import React, { useState } from "react";
import CustomInputFields from "../../../components/atoms/customInput";
import CustomButton from "../../../components/atoms/customButton";
import { ERROR_MESSAGES, REGEX } from "../../../shared/Constant";
import './style.css'
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../../redux/action";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const initialFeilds = {
    name: "",
    email: " ",
    password: ""
}
const errorInitialFeilds =
{
    nameError: "",
    emailError: "",
    passwordError: "",
    error: ""
}
export default function SignUp() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const invalidCharacterForEmail = "!#$%^&*()_-+=~`,<>/?;:'{}[]\\|\"\"";
    const arrOfInvalidChForEmail = invalidCharacterForEmail.split("");

    const [fields, setFields] = useState(initialFeilds);
    const [errorFields, setErrorFields] = useState(errorInitialFeilds);
    const validateInput = (field, value, MINLENGTH, errMsg, setErrorState) => {
        switch (field) {
            case "name":
                if (value.length > MINLENGTH) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                } else {
                    setErrorState(initialFeilds);
                    setFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;
            case 'email':
                if (value.length > MINLENGTH) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                } else if (value.split("").some((val) => arrOfInvalidChForEmail.some((item) => item === val))) {
                    setErrorState({ [field]: ERROR_MESSAGES.CANT_ENTER_NUMBER });
                } else {
                    setErrorState(initialFeilds);
                    setFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            case 'password':
                if (value.length > MINLENGTH) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                }
                else {

                    setErrorState(initialFeilds);
                    setFields((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            default:
                setErrorState();
                setFields((prevFields) => ({ ...prevFields, [field]: value }));
                break;
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            email,
            password
        } = fields;

        const isEmailValid = REGEX.EMAIL.test(email);
        const isPasswordValid = REGEX.PASSWORD.test(password);
        const isAllFieldsFilled =
            name.trim() === "" &&
            email.trim() === "" &&
            password.trim() === "";

        if (isAllFieldsFilled) {
            setErrorFields({ err: ERROR_MESSAGES.ENTER_ALL_FIELDS });
            return;
        }


        if (!isEmailValid) {
            setErrorFields({ "email": ERROR_MESSAGES.ENTER_VALID_EMAIL });
            return;
        }

        if (!isPasswordValid) {
            setErrorFields({ "password": ERROR_MESSAGES.ENTER_VALID_PASSWORD })
            return;
        }


        const data =
        {
            name: name,
            email: email,
            password: password
        }

        dispatch(createAccount({ data , AccountCreateResponse }))
        resetForm();
    }
    const navigateToLogin = () => {
        navigate("/login")
    }

    const resetForm = () =>{
        setFields(initialFeilds);
        setErrorFields(errorInitialFeilds);
    }

    const AccountCreateResponse = (response) =>{
        console.log(response)
        if(response.status === 200)
        {

            toast.success("Account Create Successfullly "
            , {
                position: toast.POSITION.TOP_RIGHT,
            })
        }

        else
        {
            toast.error(response.response.data.message
            , {
                position: toast.POSITION.TOP_RIGHT,
            })
        }

    }
    return (
        <>
            <section className="signUp-section">
                <div className="container">

                    <div className="row main-w3layouts wrapper">
                        <h1> SignUp Form</h1>
                        <div className="main-agileinfo">
                            <div className="agileits-top">
                                <form>
                                    <CustomInputFields className="text" value={fields.name} type="text" name="Username" placeholder="Username" required onChange={(e) => validateInput("name", e.target.value, 40, ERROR_MESSAGES, setErrorFields)} />
                                    {errorFields.name ? <label className="text-danger">{errorFields.name}</label> : null}
                                    <CustomInputFields className="text email" value={fields.email} type="email" name="email" placeholder="Email" required onChange={(e) => validateInput("email", e.target.value, 40, ERROR_MESSAGES, setErrorFields)} />
                                    {errorFields.email ? <label className="text-danger">{errorFields.email}</label> : null}
                                    <CustomInputFields className="text" value={fields.password} type="password" name="password" placeholder="Password" required onChange={(e) => validateInput("password", e.target.value, 40, ERROR_MESSAGES, setErrorFields)} />
                                    {errorFields.password ? <label className="text-danger">{errorFields.password}</label> : null}
                                    <CustomButton type="button" className="btn btn-info text registerButton" onClick={handleSubmit} > Register </CustomButton>
                                    {errorFields.err ? <h5 className="text-danger">{errorFields.err}</h5> : null}
                                </form>
                                <p> Already have account  <CustomButton className="loginBtn" onClick={navigateToLogin}>Login</CustomButton> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}