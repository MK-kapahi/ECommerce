import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAddress, getOrders } from '../../../../../redux/action';

export default function ShowOrders() {
    let user = JSON.parse(localStorage.getItem("userInfo"))
    const id = user?._id
    const dispatch = useDispatch();
    const order = useSelector(state => state?.orderReducer?.payload)
    const HeadingArray = {
        Total_Products: {
            title: "Total_Product",
            value: "title"
        },
        Product_Name: {
            title: "Product Name ",
            value: "description"
        },
        PRICE: {
            title: "Price",
            value: "price"
        },
        USER:
        {
            title: "User",
            value: "user"
        },

        ORDER_STATUS:
        {
            title: "Order Status",
            value: "category"
        },
        PAYMENT_STATUS:
        {
            title: "Payment Status",
            value: "category"
        },
    };
    useEffect(() => {
        dispatch(getOrders({ id }))
    })
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

                                    {order?.map((val) => {
                                        return (
                                            <tr key={val._id}>
                                                <td>{val.product.length}</td>
                                                <td>{val?.product.map((element) => {
                                                    return element?.title + ","
                                                })}</td>
                                                <td>{val?.product.reduce((acc, obj) => {
                                                    const price = obj?.price ? parseInt(obj.price, 10) : 0;

                                                    // Accumulate the total price
                                                    return acc + price;
                                                }, 0)}</td>
                                                <td>{val?.userId?.name}</td>
                                                <td>{val?.orderStatus}</td>
                                                <td>{val?.paymentStatus}</td>
                                                {/* <td> <div className="d-flex justify-content-between ">
                                                    <CustomButton className="btn btn-danger" onClick={() => deleteSelectedUser(val._id)}> Delete</CustomButton>
                                                    <button onClick={() => deleteSelectedUser(val._id)}>
                                                        Delete
                                                    </button>
                                                    <CustomButton className="btn btn-primary" onClick={() => updateUser(val._id)}> Update </CustomButton>

                                                </div> </td> */}
                                            </tr>
                                        );
                                    })}


                                </tbody>
                            </table>
                        </div>
                        {/* <Pagination currentPage={currentPage} itemsPerPage={itemPerPage} pageCount={Math.ceil(productData?.count / itemPerPage)} setSkip={setSkip} setCurrentPage={setCurrentPage} /> */}
                    </div>
                </div>
            </section>
        </>
    )
}
