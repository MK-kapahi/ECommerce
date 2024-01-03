

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts, getUsersData } from "../../../../../redux/action";
import CustomButton from "../../../../../components/atoms/customButton";
import { useNavigate } from "react-router-dom";

export default function ShowProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productData = useSelector(state => state?.productsReducer?.payload)
    const data = productData || [];
    const HeadingArray = {
        TITLE: {
            title: "Title",
            value: "title"
        },
        DESCRIPTION: {
            title: "Description",
            value: "description"
        },
        PRICE: {
            title: "Price",
            value: "price"
        },
        QUANTITY:
        {
            title: "Quantity",
            value: "quantity"
        },

        CATEGORY:
        {
            title: "Category",
            value: "category"
        },
        ACTION:
        {
            title: "Action"
        }
    };

    const deleteSelectedUser = (id) => {
       dispatch(deleteProduct({id}))
    }

    const updateUser = (id) => {
        navigate(`update/${id}`);
    }
    useEffect(() => {
        dispatch(getAllProducts({}))
    }, [])
    return (
        <>

            <section>
                <div className="container">

                    <div className="row">
                        <div className="col d-flex justify-content-center w-100">
                            <table className="table  table-warning ">
                                <thead className='table table-success'>
                                    <tr>
                                        {Object.values(HeadingArray).map((heading) => {
                                            return (
                                                <th >
                                                    <div className='d-flex '>
                                                        {heading.title}
                                                    </div>
                                                </th>
                                            )
                                        })}

                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((val) => {
                                        return (
                                            <tr key={val._id}>
                                                <td>{val.title}</td>
                                                <td>{val.description}</td>
                                                <td>{val.price}</td>
                                                <td>{val.quantity}</td>
                                                <td>{val?.categoryId?.categoryName}</td>
                                                <td> <div className="d-flex justify-content-between ">
                                                    <CustomButton className="btn btn-danger" onClick={() => deleteSelectedUser(val._id)}> Delete</CustomButton>
                                                    {/* <button onClick={() => deleteSelectedUser(val._id)}>
                                                        Delete
                                                    </button> */}
                                                    <CustomButton className="btn btn-primary" onClick={() => updateUser(val._id)}> Update </CustomButton>

                                                </div> </td>
                                            </tr>
                                        );
                                    })}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}