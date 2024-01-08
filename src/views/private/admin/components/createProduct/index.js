import React, { useEffect, useState } from "react";
import CustomInputFields from "../../../../../components/atoms/customInput";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../../../components/atoms/customButton";
import { ERROR_MESSAGES } from "../../../../../shared/Constant";
import { createProduct, getCategory } from "../../../../../redux/action";
import './style.css'
import { toast } from "react-toastify";

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
    const dispatch = useDispatch();
    const data = useSelector(state => state?.categoryReducer?.payload)
    const categories = data || [];
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


                setProductFeildsError(productFormError);
                setProductFeilds((prevFields) => ({ ...prevFields, [field]: value }));

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

    // Reset Form
    const resetForm = () => {
        setProductFeilds(productFormInitialValue);
        setProductFeilds(productFormError);
        setUploadpic("")
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(uploadpic)
        const {
            productTitle,
            productDescription,
            productPrice,
            productQuantity
        } = productFeilds


        const isAllFieldsFilled =
            productTitle.trim() === "" &&
            productDescription.trim() === "" &&
            productPrice.trim() === "";


        if (isAllFieldsFilled) {
            setProductFeildsError({ error: ERROR_MESSAGES.ENTER_ALL_FIELDS });
            return;
        }

        if (!uploadpic) {
            setProductFeildsError({ error: ERROR_MESSAGES.SELECT_IMAGE })
            return;
        }
        if (!categoryId) {
            setProductFeildsError({ error: ERROR_MESSAGES.SELECT_CATEGORY })
            return;
        }
        const formData = new FormData();
        formData.append("productTitle", productTitle)
        formData.append("productDescription", productDescription)
        formData.append("productPrice", productPrice)
        formData.append("productQuantity", productQuantity)
        formData.append('file', uploadpic)
        formData.append("category_id", categoryId)

        dispatch(createProduct({ formData, handleResponse }))
        resetForm()

    }

    const handleSelectedData = (e) => {
        console.log(e.target.value)
        setcategoryId(e.target.value)
    }

    const handleResponse = (response) => {
        console.log(response)
        if (response.status === 200) {

            toast.success("Product Added sucessfully  Successfullly "
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
        dispatch(getCategory({}))

    }, [])
    return (
        <>
            <section>
                <div className="conatiner">
                    <div className="row">
                        <div className="productForm" >
                            <h3> Add Product </h3>
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
                                        <CustomInputFields type="text" className="form-control" id="staticEmail1" value={productFeilds.productDescription} placeholder="......" onChange={(e) => validateInput("productDescription", e.target.value, 30, ERROR_MESSAGES, setProductFeildsError)} ></CustomInputFields>
                                    </div>
                                    {productFeildsError.productDescription ? <label className="text-danger">{productFeildsError.productDescription}</label> : null}
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Price</label>
                                    <div className="col-sm-10">
                                        <CustomInputFields type="text" className="form-control" id="inputPassword" value={productFeilds.productPrice} onChange={(e) => validateInput("productPrice", e.target.value, 8, ERROR_MESSAGES, setProductFeildsError)}></CustomInputFields>

                                    </div>
                                    {productFeildsError.productPrice ? <label Name="text-danger">{productFeildsError.productPrice}</label> : null}
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail2" className="col-sm-2 col-form-label">Quantity</label>
                                    <div className="col-sm-10">
                                        <CustomInputFields type="number" className="form-control" id="staticEmail2" value={productFeilds.productQuantity} placeholder="91......" onChange={(e) => validateInput("productQuantity", e.target.value, 10, ERROR_MESSAGES, setProductFeildsError)}></CustomInputFields>

                                    </div>
                                    {productFeildsError.productQuantity ? <label className="text-danger">{productFeildsError.productQuantity}</label> : null}
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail5" className="col-sm-2 col-form-label">Image</label>
                                    <div className="col-sm-10">
                                        <CustomInputFields type="file" className="form-control" id="staticEmail5" onChange={handelImageChange} ></CustomInputFields>

                                    </div>
                                    {productFeildsError.productImage ? <label className="text-danger">{productFeildsError.productImage}</label> : null}
                                </div>
                                <div className="mb-3 row justify-content-center">
                                    <div className="dropdown col-6">
                                        <select className="form-select" aria-label="Default select example" onChange={handleSelectedData}>
                                            <option value="0-150">Select Category </option>
                                            {categories.map((element) => {
                                                return (

                                                    <>
                                                        <option value={element._id}>{element.categoryName}</option>
                                                    </>

                                                )
                                            })}

                                        </select>

                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    {productFeildsError.error ? <h5 className="text-danger">{productFeildsError.error}</h5> : null}
                                </div>

                                <div className="mb-3 row button justify-content-center" >
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