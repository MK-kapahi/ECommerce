import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../../../../../service/socket";

export function ProcessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('paymentResponse', (res) => {
      console.log(res)
      if(res.status == 'COMPLETED')
      {
        navigate('/sucessPage')
      }
    })
  }, [])
  return (<>
    <h1>Processing Your payment</h1>

  </>)
}