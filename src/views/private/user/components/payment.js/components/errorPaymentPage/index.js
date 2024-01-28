import React from 'react'
import CustomButton from '../../../../../../../components/atoms/customButton'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { editOrderStatus } from '../../../../../../../redux/action';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes, userRoutes } from '../../../../../../../shared/Constant';

export default function ErrorPaymentPage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const id = location?.state?.id;

    const handleTryAgain = () =>{
     navigate(routes.CART)
    }
    const handleCancelPayment = () =>{
       const status = true;
      dispatch(editOrderStatus({id , status}))
      navigate(routes.USER+"/"+userRoutes.DASHBOARD)
    }
    return (
        <>
            <section>
                <div className='container'>
                    <div className='row'>
                        <div className="container-errorPage">
                            <div className="ui middle aligned center aligned grid">
                                <div className="ui eight wide column">

                                    <form className="ui large form">

                                        <div className="ui icon negative message">
                                            <i className="warning icon"></i>
                                            <div className="content">
                                                <div className="header">
                                                    Oops! Something went wrong.
                                                </div>
                                                <p>While trying to reserve money from your account</p>
                                            </div>

                                        </div>

                                      <div className='d-flex justify-content-center gap-4'>
                                        <CustomButton type="button" className="ui large teal submit fluid button" onClick={handleTryAgain} >Try Again </CustomButton>
                                        <CustomButton type="button" className="ui large teal submit fluid button" onClick={handleCancelPayment} > cancel Payment</CustomButton>
                                      </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
