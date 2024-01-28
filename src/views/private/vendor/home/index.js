import React, { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../../components/atoms/customButton';
import Pagination from '../../../../components/cells/customPagination.js';
import { getAllProducts } from '../../../../redux/action';

export default function VendorHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("userInfo"))
  const userId = user?._id
  // const categoryId = useSelector(state => state?.categoryIdReducer?.categoryId)
  // const searchString = useSelector(state => state?.searchedValueReducer)
  const [itemPerPage, setItemPerPage] = useState(5)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(itemPerPage);
  const [currentPage, setCurrentPage] = useState(1)
  const productData = useSelector(state => state?.productsReducer?.payload)
  const data = productData?.result || [];
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
    // dispatch(deleteProduct({ id }))
  }

  const updateUser = (id) => {
    // navigate(`update/${id}`);
  }
  useEffect(() => {
    dispatch(getAllProducts({ skip, limit, userId}))
  }, [limit, skip])
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
            <Pagination currentPage={currentPage} itemsPerPage={itemPerPage} pageCount={Math.ceil(productData?.count / itemPerPage)} setSkip={setSkip} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </section>
    </>
  )
}
