import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ERROR_MESSAGES , REGEX } from "../../../../../../../shared/Constant";
import { getUser } from "../../../../../../../redux/action";
import CustomButton from "../../../../../../../components/atoms/customButton";
import CustomInputFields from "../../../../../../../components/atoms/customInput";
import { toast } from "react-toastify";
import { updateUser } from "../../../../../../../redux/action";
import './style.css'


const initialFeilds = {
    name: "",
    email: " ",
}
const errorInitialFeilds =
{
    nameError: "",
    emailError: "",
    error: ""
}
export default function EditUser() {
    const invalidCharacterForEmail = "!#$%^&*()_-+=~`,<>/?;:'{}[]\\|\"\"";
    const arrOfInvalidChForEmail = invalidCharacterForEmail.split("");

    const [fields, setFields] = useState(initialFeilds);
    const [errorFields, setErrorFields] = useState(errorInitialFeilds);
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const data = useSelector(state => state?.userReducer?.payload)
    console.log(data)
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
        } = fields;

        const isEmailValid = REGEX.EMAIL.test(email);
          const isAllFieldsFilled =
            name.trim() === "" &&
            email.trim() === "";
        if (isAllFieldsFilled) {
            setErrorFields({ err: ERROR_MESSAGES.ENTER_ALL_FIELDS });
            return;
        }


        if (!isEmailValid) {
            setErrorFields({ "email": ERROR_MESSAGES.ENTER_VALID_EMAIL });
            return;
        }

        const data =
        {
            name: name,
            email: email,
        }

        dispatch(updateUser({id ,data , EditUserResponse}))
        resetForm();
    }

    const resetForm = () => {
        setFields(initialFeilds);
        setErrorFields(errorInitialFeilds);
    }

    const EditUserResponse = (response) => {
        console.log(response)
        if (response.status === 200) {

            toast.success("User Edited  Successfullly "
                , {
                    position: toast.POSITION.TOP_RIGHT,
                })
        }

        else {
            toast.error(response.response.data.message
                , {
                    position: toast.POSITION.TOP_RIGHT,
                })
        }
    }

    useEffect(() => {
       dispatch(getUser({id}))
        setFields({
            name : data?.name, 
            email : data?.email
        })
    }, [])
    return (
        <>
            <section className="editFormSection">
                <div className="container">

                    <div className="row main-w3layouts wrapper editFormWrapper">
                        <div className="main-agileinfo">
                            <div className="agileits-top">
                                <form>
                                    <CustomInputFields className="text" value={fields?.name} type="text" name="Username" placeholder="Username" required onChange={(e) => validateInput("name", e.target.value, 40, ERROR_MESSAGES, setErrorFields)} />
                                    {errorFields.name ? <label className="text-danger">{errorFields?.name}</label> : null}
                                    <CustomInputFields className="text email" value={fields?.email} type="email" name="email" placeholder="Email" required onChange={(e) => validateInput("email", e.target.value, 40, ERROR_MESSAGES, setErrorFields)} />
                                    {errorFields.email ? <label className="text-danger">{errorFields?.email}</label> : null}
                                    <CustomButton type="button" className="btn btn-info text registerButton" onClick={handleSubmit} > Update  </CustomButton>
                                    {errorFields.err ? <h5 className="text-danger">{errorFields.err}</h5> : null}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>)

}