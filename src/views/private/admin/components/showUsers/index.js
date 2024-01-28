import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsersData } from "../../../../../redux/action";
import CustomButton from "../../../../../components/atoms/customButton";
import { useNavigate } from "react-router-dom";
import AssignRoleModal from "./components/AssignRoleModal";

export default function ShowUsers() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showAssignRolrModal , setShowAssignRolrModal] = useState(false);
    const [assignRoleUserId , setAssignRoleUserId] = useState("");
    const userdata = useSelector(state => state?.registerReducer?.payload)
    const searchString = useSelector(state => state?.searchedValueReducer)
    console.log(userdata)
    const data = userdata || [];
    const HeadingArray = {
        NAME: {
            title: "Name",
            value: "name"
        },
        EMAIL: {
            title: "Email",
            value: "email"
        },
        ROLE: {
            title: "Role",
            value: "Role"
        },
        ACTION:
        {
            title: "Action"
        }
    };

    const deleteSelectedUser = (id) => {
       dispatch(deleteUser({id}))
    }

    const updateUser = (id) => {
        navigate(`update/${id}`)

    }

    const handleShowAssignRoleModal = (id) =>{
        setAssignRoleUserId(id)
        setShowAssignRolrModal(true)
    }
    useEffect(() => {
        dispatch(getUsersData({searchString}))
    }, [searchString])
    return (
        <>
         <AssignRoleModal show={showAssignRolrModal} setShow={setShowAssignRolrModal} userId={assignRoleUserId} />
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
                                            <tr key={val.id}>
                                                <td>{val.name}</td>
                                                <td>{val.email}</td>
                                                <td>{val.role}</td>
                                                <td> <div className="d-flex justify-content-between ">
                                                    <CustomButton className="btn btn-danger" onClick={() => deleteSelectedUser(val._id)}> Delete</CustomButton>
                                                    <CustomButton  type="button" className="btn btn-info" onClick={()=>handleShowAssignRoleModal(val._id)}>Assign Role</CustomButton>
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