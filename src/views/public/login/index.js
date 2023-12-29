import React, { useState } from "react";
import CustomInputFields from "../../../components/atoms/customInput";
import "./style.css"
import CustomButton from "../../../components/atoms/customButton";
import { useNavigate } from "react-router-dom";
import { ERROR_MESSAGES, REGEX, URL, adminRoutes, routes } from "../../../shared/Constant";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../../redux/action";

const initialFeilds = {
    email: "",
    password: "",
}
const errorInitialFeilds =
{
    emailError: "",
    passwordError: "",
    error: ""
}
export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const invalidCharacterForEmail = "!#$%^&*()_-+=~`,<>/?;:'{}[]\\|\"\"";
    const arrOfInvalidChForEmail = invalidCharacterForEmail.split("");

    const [fields, setFields] = useState(initialFeilds);
    const [errorFields, setErrorFields] = useState(errorInitialFeilds);

    const validateInput = (field, value, MINLENGTH, errMsg, setErrorState) => {
        switch (field) {
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
            email,
            password
        } = fields;

        const isEmailValid = REGEX.EMAIL.test(email);
        const isPasswordValid = REGEX.PASSWORD.test(password);
        const isAllFieldsFilled =
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
            email: email,
            password: password
        }

        dispatch(LoginUser({ data , loginResponse }))
    }
    const navigateToRegister = () => {
        navigate("/signUp")
    }
    const loginResponse = (res) => {
        console.log(res);
        if (res.status === 200) {
            if (res.data.data.role === 1) {
              
                navigate("/"+routes.ADMIN+adminRoutes.DASHBOARD)
            }
        }
    }
    return (
        <>
            <section className="bg">
                <div className="container">
                    <div className="row">
                        <div className="form-signin">

                            <h1 className="h3">Login</h1>

                            <form className="form" >
                                <div className="form-floating">
                                    <CustomInputFields type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={(e) => validateInput("email", e.target.value, 40, ERROR_MESSAGES, setErrorFields)} />
                                    <label htmlFor="floatingInput">Email address</label>
                                    {errorFields.email ? <label className="text-danger">{errorFields.email}</label> : null}
                                </div>
                                <div className="form-floating">
                                    <CustomInputFields type="password" className="form-control" id="floatingPassword" placeholder="Password" required onChange={(e) => validateInput("password", e.target.value, 40, ERROR_MESSAGES, setErrorFields)} />
                                    <label htmlFor="floatingPassword">Password</label>
                                    {errorFields.password ? <label className="text-danger">{errorFields.password}</label> : null}
                                </div>

                                <div className="checkbox mb-3">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" value="1" name="remember_me" id="rememberMeSwitch" />
                                        <label className="form-check-label" htmlFor="rememberMeSwitch"> Remember me</label>
                                    </div>

                                </div>
                                {errorFields.err ? <h5 className="text-danger">{errorFields.err}</h5> : null}
                                <CustomButton className="w-100 btn btn-lg" type="submit" onClick={handleSubmit} >Login</CustomButton>
                            </form>
                            <p> Don't have an account </p>
                            <CustomButton className="btn btn-info" onClick={navigateToRegister} >SignUp</CustomButton>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}