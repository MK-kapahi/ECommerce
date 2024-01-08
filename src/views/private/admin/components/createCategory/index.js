import React, { useState } from "react";
import CustomInputFields from "../../../../../components/atoms/customInput";
import CustomButton from "../../../../../components/atoms/customButton";
import './style.css'
import { ERROR_MESSAGES } from "../../../../../shared/Constant";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../../../redux/action";
import { toast } from "react-toastify";

const createCategoryFormInputField = {
    category: ""
}
const FormError = {
    error: ""
}
export default function CreateCategory() {

    const [formField, setFormFeild] = useState(createCategoryFormInputField)
    const [categoryError, setCategoryError] = useState(FormError);
    const dispatch = useDispatch()

    const validateInput = (field, value, MINLENGTH, errMsg, setCategoryError) => {
        switch (field) {
            case "category":
                if (value.length > MINLENGTH) {
                    setCategoryError((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                } else {
                    setCategoryError(categoryError);
                    setFormFeild((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            category
        } = formField


        const isCategoryFilled = category.trim() === "";



        if (isCategoryFilled) {
            setCategoryError({ error: ERROR_MESSAGES.ENTER_ALL_FIELDS })
            return
        }

        const data = 
        {
            name : category
        }

        dispatch(addCategory({data , handleResponse}))

        resetForm()

    }

    const resetForm = () =>{
        setFormFeild(createCategoryFormInputField)
    }
    const handleResponse = (response) =>{
        if (response.status === 200) {

            toast.success("category Added Sucessfully ", {
                position: toast.POSITION.TOP_RIGHT,
            })
        }
    }
    return (
        <>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="createCategoryForm">
                            <h3 className="category_heading"> Add Category</h3>
                            <form>
                                <div className="d-flex">

                                    <label className="category-lable">Enter Category</label>
                                    <CustomInputFields type="text" value={formField.category} placeholder="smartphone..." className="form-control" onChange={(e) => validateInput("category", e.target.value, 30, ERROR_MESSAGES, setCategoryError)}  ></CustomInputFields>
                                </div>
                                    {categoryError.error ? <h5 className="text-danger">{categoryError.error}</h5> : null}
                                <CustomButton type="submit" className="btn btn-primary" onClick={handleSubmit}> Add </CustomButton>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}