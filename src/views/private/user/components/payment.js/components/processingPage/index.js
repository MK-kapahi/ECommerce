import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../../../../../service/socket";
import './style.css'

export function ProcessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('paymentResponse', (res) => {
      console.log(res)
      if (res.status == 'COMPLETED') {
        navigate('/sucess-Page')
      }
    })
  }, [])
  return (<>
    <section className="processingSection">

      <div className="container">

        <h1>Processing Your payment</h1>
        <span className="loader"></span>
      </div>
    </section>
  </>)
}