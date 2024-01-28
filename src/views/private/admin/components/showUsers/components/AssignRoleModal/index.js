import React, { useState } from 'react'
import CustomModal from '../../../../../../../components/atoms/customModal'
import { useDispatch } from 'react-redux'
import { assignRole } from '../../../../../../../redux/action'

export default function AssignRoleModal({ show, setShow, userId }) {

  const dispatch = useDispatch()
  const [role , setRole] = useState(0)
  const handleClose = () => {
    setShow(false)
  }

  const modalContent = [
    {
      LABEL: "ADMIN",
      VALUE: 1
    },
    {
      LABEL: "USER",
      VALUE: 2
    },
    {
      LABEL: "VENDOR",
      VALUE: 3
    }
  ]

  const handleRoleValue = (e)=>{
    console.log(e.target.value)
    setRole(e.target.value)
  }

  const onSubmit = () =>{
    dispatch(assignRole({role , userId}))
    setShow(false)
  }
  return (
    <CustomModal show={show} handleClose={handleClose}  handleSubmit={onSubmit}>
      <>
        <div>
          <h3> Assign Role</h3>
          <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleRoleValue}>
            <option value={0}>Open this select menu</option>
            {
              modalContent.map((element) => {
                return(

                  <option value={element.VALUE}>{element.LABEL}</option>
                )
              })
            }
          </select>
        </div>
      </>
    </CustomModal>
  )
}
