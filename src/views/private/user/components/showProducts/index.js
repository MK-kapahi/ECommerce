import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, editCart, getAllProducts } from "../../../../../redux/action";
import './style.css'
import Pagination from "../../../../../components/cells/customPagination.js";
import CustomButton from "../../../../../components/atoms/customButton/index.js";
import { IMAGEURL } from "../../../../../shared/Constant.js";
import { useNavigate } from "react-router-dom";

export default function ProductsView({ categoryId, searchString }) {

    const navigate = useNavigate()
    const product = useSelector(state => state?.productsReducer?.payload)
    const cartData = useSelector(state => state?.cartReducer)
    const data = product?.result || [];
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

    const [itemPerPage, setItemPerPage] = useState(6)
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(itemPerPage);
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();
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

    const handleNavigateToProductDisplay = (element) => {
        navigate("/user/show-product", { state: { product: element } })
    }
    useEffect(() => {
        dispatch(getAllProducts({ skip, limit, searchString, categoryId }))
    }, [skip, limit, searchString, categoryId])
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col d-flex flex-wrap l4 m8 s12 offset-m2 offset-l4">
                            {data?.map((element) => {

                                return (<div className="product-card">
                                    <div className="card  z-depth-4">
                                        <div className="card-image">
                                            <a href="#" className="btn-floating btn-large price waves-effect waves-light brown darken-3">${element.price}</a>

                                            <img src={IMAGEURL + element?.image} alt="product-img" style={{ width: '320px', height: '250px' }} />
                                            <p className="card-title product_card_title"> {element?.title}</p>
                                        </div>
                                        <ul className="card-action-buttons">
                                            {/* <li><a href="https://www.facebook.com/sharer/sharer.php?u=https://codepen.io/lybete/full/jBMNzM/" target="_blank" class="btn-floating waves-effect waves-light white"><FontAwesomeIcon icon={faCoffee}>share</FontAwesomeIcon></a>
                                            </li>
                                            <li><a className="btn-floating waves-effect waves-light red accent-2"><i class="material-icons like">favorite_border</i></a>
                                            </li>
                                            <li><a id="buy" className="btn-floating waves-effect waves-light blue"><i class="material-icons buy">add_shopping_cart</i></a>
                                            </li> */}
                                        </ul>
                                        <div className="card-content">
                                            <div className="row">
                                                <div className="col s12 product-description">
                                                    <p>
                                                        <strong>Description:</strong> <br />
                                                        {truncateDescription(element.description, 60)}
                                                    </p>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="action">
                                                    {
                                                        itemAddedToCart(element._id) ? (<CustomButton className="btn btn-danger remove-Cart-button" type="button" onClick={() => handleRemoveFromCart(element)} >Remove from cart </CustomButton>) : (<CustomButton type="button" onClick={() => handleAddToCart(element)} className="button">Add to cart </CustomButton>)
                                                    }
                                                </div>
                                                {/* <div style={{ width: "95%", margin: "auto" }}>
                                                    <div className="chip">Dessert</div>
                                                    <div className="chip">French</div>
                                                    <div className="chip">Sweet</div>
                                                    <div className="chip">Chocolate</div>
                                                    <div className="chip"><a href="#">More...</a></div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                                // return (
                                //     <div className="card product_card">
                                //         <div className="card__body">
                                //             <div className="half">
                                //                 <div className="featured_text" >
                                //                     <p className="sub" onClick={()=>handleNavigateToProductDisplay(element)} > {element?.title} </p>
                                //                     <p className="price">$ {element?.price}</p>
                                //                 </div>
                                //                 <div className="image-card">
                                //                     <img src={IMAGEURL + element.image} alt=""   style={{ width: '320px', height: '250px' }}  />
                                //                 </div>
                                //             </div>
                                //             <div className="half">
                                //                 <div className="description">
                                //                     <p>{truncateDescription(element.description, 50)}</p>
                                //                 </div>
                                //                 <div className="description">
                                //                     <p>Category : {element.categoryId.categoryName}</p>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //         <div className="card__footer d-flex justify-content-center">
                                //             <div className="action">
                                //                 {
                                //                     itemAddedToCart(element._id) ? (<CustomButton className="btn btn-danger remove-Cart-button" type="button" onClick={() => handleRemoveFromCart(element)} >Remove from cart </CustomButton>) : (<CustomButton type="button" onClick={() => handleAddToCart(element)} className="button">Add to cart </CustomButton>)
                                //                 }
                                //             </div>
                                //         </div>
                                //     </div>
                                // )
                            })}
                        </div>
                    </div>
                    <Pagination currentPage={currentPage} itemsPerPage={itemPerPage} pageCount={Math.ceil(product?.count / itemPerPage)} setSkip={setSkip} setCurrentPage={setCurrentPage} />
                </div>

            </section>
        </>
    )
}