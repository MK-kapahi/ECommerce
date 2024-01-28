import React, { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, editCart, getAllProducts } from "../../../../../redux/action";
import Pagination from "../../../../../components/cells/customPagination.js";
import CustomButton from "../../../../../components/atoms/customButton/index.js";
import { IMAGEURL } from "../../../../../shared/Constant.js";
import { useNavigate } from "react-router-dom";

export default function SearchedProducts() {


    const product = useSelector(state => state?.productsReducer?.payload)
    const cartData = useSelector(state => state?.cartReducer)
    const data = product?.result || [];
    const navigate = useNavigate();
    const searchString = useSelector(state => state?.searchedValueReducer)

    const [itemPerPage, setItemPerPage] = useState(6)
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(itemPerPage);
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()
    const itemAddedToCart = (id) => {
        if (!cartData) {
            return
        }

        const filteredData = cartData?.filter((element) => {
            if (element._id === id) {
                return element
            }
        })
        if (filteredData.length === 1) {
            return true
        }

        else {
            return false
        }
    }

    const handleAddToCart = (element) => {
        element.quantity = 1;
        dispatch(addToCart({ element }))
    }
    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    };
    const handleRemoveFromCart = (id) => {

        const index = cartData.findIndex((element) => element._id == id._id);
        const tempData = [...cartData]
         tempData.splice(index, 1);
        dispatch(editCart({ tempData }))
    }

    const handleNavigateToProductDisplay = (element)=>{
         navigate("/user/show-product" , {state : {product : element}})
    }
    useEffect(() => {
        dispatch(getAllProducts({ skip, limit, searchString }))
    }, [skip, limit, searchString])
    return (<>
        <section>
            <div className="container">
                <div className="row">
                    <div className="col product-card-wrapper">
                        {data?.map((element) => {
                            return (
                                <div className="card product_card">
                                    <div className="card__body">
                                        <div className="half">
                                            <div className="featured_text" >
                                                <p className="sub" onClick={() => handleNavigateToProductDisplay(element)} >{truncateDescription(element?.title, 15)}</p>
                                                <p className="price">$ {element?.price}</p>
                                            </div>
                                            <div className="image-card">
                                                <img src={IMAGEURL + element.image} alt=""  style={{ width: '320px', height: '250px' }} />
                                            </div>
                                        </div>
                                        <div className="half">
                                            <div className="description">
                                                <p>{truncateDescription(element.description, 50)}</p>
                                            </div>
                                            <div className="description">
                                                <p>Category : {element.categoryId.categoryName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card__footer">
                                        <div className="action">
                                            {
                                                itemAddedToCart(element._id) ? (<CustomButton className="btn btn-danger remove-Cart-button" type="button" onClick={() => handleRemoveFromCart(element)} >Remove from cart </CustomButton>) : (<CustomButton type="button" onClick={() => handleAddToCart(element)}  className="button" >Add to cart </CustomButton>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Pagination currentPage={currentPage} itemsPerPage={itemPerPage} pageCount={Math.ceil(product?.count / itemPerPage)} setSkip={setSkip} setCurrentPage={setCurrentPage} />
            </div>

        </section >
    </>)
}