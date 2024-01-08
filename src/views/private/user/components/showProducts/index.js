import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getAllProducts } from "../../../../../redux/action";
import './style.css'
import Pagination from "../../../../../components/cells/customPagination.js";
import CustomButton from "../../../../../components/atoms/customButton/index.js";

export default function ProductsView() {
    const cartData = localStorage.getItem("persist")? JSON.parse(localStorage.getItem("persist")) : '';

    const product = useSelector(state => state?.productsReducer?.payload)
    const data = product?.result || [];
    const [itemPerPage, setItemPerPage] = useState(6)
    const [skip, setSkip] = useState(0)
    const [cartList, setCartList] = useState(cartData)
    const [limit, setLimit] = useState(itemPerPage);
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();
    const handleAddToCart = (element) => {
        setCartList((prevFeilds) => ([...prevFeilds, element]))
        dispatch(addToCart({ cartList })) 
    }
    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    };
    useEffect(() => {
        dispatch(getAllProducts({ skip, limit }))
    }, [skip, limit])
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col product-card-wrapper">
                            {data?.map((element) => {
                                return (
                                    <div className="card product_card">
                                        <div className="card__body">
                                            <div className="half">
                                                <div className="featured_text">
                                                    <p className="sub">{truncateDescription(element?.title, 10)}</p>
                                                    <p className="price">$ {element?.price}</p>
                                                </div>
                                                <div className="image">
                                                    <img src={element?.image} alt="" />
                                                </div>
                                            </div>
                                            <div className="half">
                                                <div className="description">
                                                    <p>{truncateDescription(element.description, 50)}</p>
                                                </div>
                                                <span className="stock"><i className="fa fa-pen"></i> In stock</span>
                                                <div className="reviews">
                                                    <ul className="stars">
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><i className="fa fa-star"></i></li>
                                                        <li><i className="fa fa-star-o"></i></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card__footer">
                                            {/* <div className="recommend">
                                                <p>Recommended by</p>
                                                <h3>Andrew Palmer</h3>
                                            </div> */}
                                            <div className="action">
                                                <CustomButton type="button" onClick={() => handleAddToCart(element)} >Add to cart </CustomButton>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Pagination currentPage={currentPage} itemsPerPage={itemPerPage} pageCount={Math.ceil(product?.count / itemPerPage)} setSkip={setSkip} setCurrentPage={setCurrentPage} />
                </div>

            </section>
        </>
    )
}