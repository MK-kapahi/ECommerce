import React, { useEffect } from 'react'
import "./styleProfile.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAddress, getOrders } from '../../../../../redux/action';
import { IMAGEURL } from '../../../../../shared/Constant';

export default function ProfilePage() {
    let user = JSON.parse(localStorage.getItem("userInfo"))
    const id = user?._id
    const dispatch = useDispatch();
    const address = useSelector(state => state?.addressReducer?.payload)
    const order = useSelector(state => state?.orderReducer?.payload)
    useEffect(() => {
        dispatch(getOrders({}))
        dispatch(getAddress({ id }))
    }, [])
    return (
        <><section>
            <div className='container'>
                <div className='row'>
                    <div>
                        <div className="container-card">
                            <div className="card-profile d-flex flex-column justify-content-around">
                                <p className="card__name">{user?.name}</p>
                                <div className='d-flex justify-content-around'>

                                    <img src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no" alt="Person" class="card__image" />
                                    <div className='address-info'>
                                        <div className='d-flex flex-column justify-content-center mt-4 gap-4'>
                                            <p> Address </p>
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">City</th>
                                                        <th scope="col">State</th>
                                                        <th scope="col">Country</th>
                                                        <th scope="col">Postal Code </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">{address?.city}</th>
                                                        <td>{address?.state}</td>
                                                        <td>{address?.country}</td>
                                                        <td>{address?.postalCode}</td>
                                                    </tr>

                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col order-section d-flex flex-column gap-4 justify-content-center '>
                        <h5>
                            Your Orders
                        </h5>
                        <ul className='order-list d-flex align-content-center flex-column flex-wrap'>
                            {order?.map((singleOrder) => (
                                <li key={singleOrder._id} className='order-list-item'>
                                    <div className='order-id'>
                                        Order Id : {singleOrder._id}
                                    </div>
                                    <ul className='product-list'>
                                        {singleOrder?.product?.map((element, index) => (
                                            <li key={index} className='product-list-item'>
                                                <div className="images d-flex justify-content-center">
                                                    <img src={IMAGEURL + element.image} alt={element.title} />
                                                </div>
                                                <div className="product-details">
                                                    <p>{element?.title}</p>
                                                    <h2 className='price'>${element?.price}</h2>
                                                    <p className="desc">{element?.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className='order-status'>
                                        Order Status : {singleOrder.orderStatus}
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section >
        </>
    )
}
