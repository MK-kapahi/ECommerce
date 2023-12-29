import React, { useState } from "react";
import CustomInputFields from "../../../../../components/atoms/customInput";
import { useSelector } from "react-redux";
import CustomButton from "../../../../../components/atoms/customButton";
import { ERROR_MESSAGES } from "../../../../../shared/Constant";

const productFormInitialValue = {
    productTitle: "",
    productDescription: "",
    productPrice: "",
    productQuantity: 0,
    productImage: "",
    categoryId: ""

}

const productFormError = {
    productTitle: "",
    productDescription: "",
    productPrice: "",
    productQuantity: 0,
    productImage: "",
    categoryId: "",
    error: ""
}
export default function CreateProduct() {

    const [productFeilds, setProductFeilds] = useState(productFormInitialValue);
    const data = useSelector(state => state)
    const [productFeildsError, setProductFeildsError] = useState(productFormError)
    const [uploadpic, setUploadpic] = useState(null);
    const [categoryId, setcategoryId] = useState("")
    const validateInput = (field, value, MINLENGTH, errMsg, setErrorState) => {
        switch (field) {
            case "productTitle":
                if (value.length > MINLENGTH) {
                    setProductFeildsError((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                } else {
                    setProductFeildsError(productFormError);
                    setProductFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;
            case 'productDescription':
                if (value.length > MINLENGTH) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                } else {
                    setErrorState(productFormError);
                    setProductFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;

            case 'productPrice':
                if (value.length > MINLENGTH) {
                    setErrorState((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                }
                else {

                    setErrorState(productFormError);
                    setProductFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;


            case 'productQuantity':
                if (value.length > MINLENGTH) {
                    setProductFeildsError((prevState) => ({ ...prevState, [field]: errMsg.ENTER_BELOW_LENGTH_LIMIT(MINLENGTH) }));
                }
                else {

                    setProductFeildsError(productFormError);
                    setProductFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                }
                break;
            default:
                setProductFeildsError(productFormError);
                setProductFeilds((prevFields) => ({ ...prevFields, [field]: value }));
                break;
        }

    }

    const handelImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setUploadpic(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            p_title,
            p_description,
            p_price,
            p_quantity
        }  = productFeilds


        const formData = new FormData();
        formData.append("p_title", p_title)
        formData.append("p_description", p_description)
        formData.append("p_price", p_price)
        formData.append("p_qantity", p_quantity)
        formData.append('file', uploadpic)
        formData.append("category_id", categoryId)

    }

    const handleSelectedData = (e) => {
        console.log(e.target.value);
        setcategoryId(e.target.value)
    }
    return (
        <>
            <section>
                <div className="conatiner">
                    <div className="row">
                        <div >
                            <form encType='multipart/form-data' >

                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label" >Title </label>
                                    <div className="col-sm-10">
                                        <CustomInputFields type="text" className="form-control" id="staticEmail" value={productFeilds.productTitle} placeholder="abc..." onChange={(e) => validateInput("productTitle", e.target.value, 15, ERROR_MESSAGES, setProductFeildsError)} ></CustomInputFields>

                                    </div>
                                    {productFeildsError.productTitle ? <label name="text-danger">{productFeildsError.productTitle}</label> : null}
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Description </label>
                                    <div className="col-sm-10">
                                        <CustomInputFields type="email" className="form-control" id="staticEmail1" value={productFeilds.productDescription} placeholder="......" onChange={(e) => validateInput("productDescription", e.target.value, 30, ERROR_MESSAGES, setProductFeildsError)} ></CustomInputFields>
                                    </div>
                                    {productFeildsError.productDescription ? <label className="text-danger">{productFeildsError.productDescription}</label> : null}
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <CustomInputFields type="text" className="form-control" id="inputPassword" value={productFeilds.productPrice} onChange={(e) => validateInput("productPrice", e.target.value, 8, ERROR_MESSAGES,  setProductFeildsError)}></CustomInputFields>

                                    </div>
                                    {productFeildsError.productPrice ? <label Name="text-danger">{productFeildsError.productPrice}</label> : null}
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail2" className="col-sm-2 col-form-label">Contact</label>
                                    <div className="col-sm-10">
                                        <CustomInputFields type="number" className="form-control" id="staticEmail2" value={productFeilds.productQuantity} placeholder="91......" onChange={(e) => validateInput("contact", e.target.value, 10, ERROR_MESSAGES,  setProductFeildsError)}></CustomInputFields>

                                    </div>
                                    {productFeildsError.productQuantity ? <label className="text-danger">{productFeildsError.productQuantity}</label> : null}
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail5" className="col-sm-2 col-form-label">Image</label>
                                    <div className="col-sm-10">
                                        <CustomInputFields type="file" className="form-control" id="staticEmail5" value={productFeilds.productImage} onChange={handelImageChange} ></CustomInputFields>

                                    </div>
                                    {productFeildsError.productImage ? <label className="text-danger">{productFeildsError.productImage}</label> : null}
                                </div>
                                <div className="mb-3 row">
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Category
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" onChange={handleSelectedData}>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    {productFeildsError.error ? <h5 className="text-danger">{productFeildsError.error}</h5> : null}
                                </div>

                                <div className="mb-3 row button" >
                                    <CustomButton className="btn btn-primary col-sm-4 btn-submit" onClick={handleSubmit} >submit </CustomButton>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}