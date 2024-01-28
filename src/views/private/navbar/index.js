import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { adminRoutes, cartRoutes, routes, userRoutes, vendorRoutes } from "../../../shared/Constant";
import CustomButton from "../../../components/atoms/customButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCategory, logoutUser, setCategoryId, setSearchedValue } from "../../../redux/action";
import { toast } from "react-toastify"
import './style.css'
import CustomSearchBar from "../../../components/cells/customSearchBar";
export default function Navbar() {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(state => state?.categoryReducer?.payload)
    const [searchValue, setSearchValue] = useState("")
    let user = JSON.parse(localStorage.getItem("userInfo"))
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [isVendor, setIsVendor] = useState(false)
    const handleLogout = () => {
        localStorage.clear()
        dispatch(logoutUser({ handleResponse }))
    }
    useEffect(() => {
        if (user?.role === 1) {

            setIsAdmin(true)
        }
        if (user?.role === 2) {
            setIsUser(true)
        }

        if (user?.role === 3) {
            setIsVendor(true)
        }
        dispatch(getCategory({}))
    }, [])
    const handleResponse = (response) => {
        navigate('/login')
        if (response.status === 200) {

            toast.success("logout  Successfullly "
                , {
                    position: toast.POSITION.TOP_RIGHT,
                })
        }

        else {
            toast.error(response.response.data.message
                , {
                    position: toast.POSITION.TOP_RIGHT,
                })
        }
    }
    const handleSelectedData = (e) => {
        dispatch(setCategoryId(e.target.value));
    }

    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
        dispatch(setSearchedValue(e.target.value))
    }
    const handleSearch = () => {

        if (location.pathname == "/user/searched-Produc") {
            if (searchValue.length === 0) {
                return
            }

        }
        if (searchValue.length === 0) {
            toast.warning("please enter the value to search for "
                , {
                    position: toast.POSITION.TOP_RIGHT,
                })
            return
        }
        navigate("/user/searched-Product")
    }

    const moveToProfilePage = () => {
        navigate(routes.USER + "/" + userRoutes.PROFILE)
    }
    const isShowProductsPage = location.pathname === "/admin/allProducts";
    const isUserShowProductsPage = location.pathname === "/user/dashboard";
    const isShowUsersPage = location.pathname === "/admin/allUsers";
    const isShippingPage = location.pathname === "/shipping-details";
    const isCartPage = location.pathname === "/cart";
    const isSearchedProductPage = location.pathname === "/user/searched-Product"

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-lg">
                    <div className="d-flex justify-content-between me-4">

                        <div className="image-container">

                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAA2FBMVEX///+y5/oAru4aTX4QSXwAQnjM1N47Yow/ZI3y9PcAPHX0/P4oWIa84/kARnusucmLnrWcrL8ArO+azeOG1fb4+vtbd5pzyfPl9f1WhagAM3CW1vWM0vVtxfPc4um57/95kKq9x9Pn6+8AL29wiKVEcpqi1+sktfBfwfNumrlDu/HP8PzE7fsAsPlObpTa8fuExeqGt9Fizfqq3fdfkLKj4vmQ3Pdu0fZ/1f40wfM3wv8YuvxTyP6u1erP5O7J5/gAkcwAnt48gKsQdatituEhq98cPW15qcWH3b/ZAAAP/ElEQVR4nN2dC3uiutaAvaBW8VJRKh2tt1OLgxeqjm0t7Xbv83X2/P9/9EESEMxKAgJaz9rPM7tthORNVlZuK8tM5nIim9mIspcvWFyeREf5tjiyNj+FxRbz2+FosxNRbJlr6qWLHxDz1GbBMvtGjXNabwk2zqUZXJHjNQuWb0Jzcs8PyuzSHI7EVrFvRJMYi01zaaOWIIttBi5r1BJlubCJ1gbhCxrqoyfRaPN9Lb5s2hHkZZudi4HMyCS17vpdz51ZdGPd3orbJhqNXHvQFUU5N0suZ+dpvIpxooyeZlu/AIgn0xcRTISZzf7Dq6jzUrjZvbeFNGGNgLlT3DeHgUkQ2HuVLqQJ2W20d/edi1DlFH1IYX2KTjh003ehpoVSNHm6wO+z3l/nmkwkk7VQjc3kY1G7qAkfTCqFSA+na1SCaaB82oe/zF6mFsHSRVZgHgZmS2rHeAmo5dbJRXkHWpfAMGsKw3ToOZU2RTm9BZ6ck/6qrEXz7BBNoxmY5eOI/AXBGKfD0D1WW1s0TEbuEU17EY2eYhvQRRkoxywEZpckjIxh1kdPYr208xI1jXA5ID+gN1ndo7+r7VzyMK8or/XxO4n65QQsYvM8R6ZMmR4XjcBQf48FgxWKgslscNO8ippGZJ432JocN0xG7bCKdDqM2kV5TakymQauUVGnETSN3EGWX6fsnvqQPAxuAcCoEGuub+MZtJmBtYnKWUV6rPSARWscGAW2kFg/rLYIht80GzxcvlAJuFMqlPrFgqmhmjP2VMIMm4AH4dKG1zTaG4LR6dcTNU4BJqfXqOaWcTkM4VqAt71hThlaRmBym0Rh9niKtKGS5A1aFuripQBHz2q4y3Rp3j2eRyULY75jGCg7VHcdEQxHz+QeXicDc7isk69i1RKFmWGYLjTTwXMqsZ4xYbQHeMR0YJBGvCcLY34oaLYBjKdoCFLEyxq2ntVwL+8BSdt0YJy3Wj2oO2G1fj1Zz8iIbGUhGFxT0CLidBgNL2khGPMDrdrWJ8MQLYOm+e5gDano6TDyGndz6FE8bzOE9ozVaWZYyzpQGtZhehoVD6bDhskiW2S9CTsNI1c8hllbEIZpGmLDwI9qeMUp1jM4U7y8UHRwYt1jZ3s6DO+tmY4z41XEkwDYnGmoYZU1lCazVwBxYEh7g9WXJZNNEQyc7xyv70AtIwvQVGBywEwzc6hbAcsWXqHxtIysZCEjGgeG2EgQJrNDW147gZ5tYXOGtzDXoA4SmHbCMFmFORTbQxvevxMZZ9CczdGzC2gq6e7YWinBADNNW2TEoogmmyBMG1cE3Gom2uewXhKGGVgcmIxdgfZ/OwEMaJvXC+fRD7hMM7y+2CYMM7Mc3YbWAI5s8ar6FBiylITN9gyd18C5xoPhZGoquAZPgHGKqyiMStrjeSbYU7uoAuHBwhaVA2ObX+dZ0EjGhskpcP/P7LHZBm1olz0HRQWesmFknGkKMKjyGS1Tw+8FW6bHSct4WyEPcMvwYPanw+x478UbpmCfIVPfHKMaMntcS+Ac1cRp4LTZy/QUmLVjmpUd+F5SYHBNaOLpLdMC4IbLvUNqWMMGAFxB2VMSNFiIpprgOPOCYOBxBs+T4ALXSFoO1jMtRwTojSoBVeBHc6EmZyCMiWcA4CC/xZlCHcM7G4IVSSVKaLc5/eIZOdhSviAVxdMZRbANwJib6cyOrBlegakS1TwvDnAjZJPzkumThbaX9glkSsojmpvB2u1UvzMHoDfl1wqzwGi3yE2mN2/3lgdDHy3UfN4sfzEyFc9mYBhyZE51R61zyDOntANpswNnjh5M5M3B0cOuJj1oeHyJdtoRDdn1DuEQwNg4IyqhvNd8H5Bn65y/vItXzUuVazui9J4a+tynZNNfC6jEvl1luWsFEvVP+dBxynuSqbIWLpthFq8JlNzr3nSO7VVZ23fd+tOJUiz07kyzk2Rz33H9Egy32ORR+0Fz3/Nq/sF78bpmp2bs1M2Hm6jjlyjK9NPUyrbYjz7niPKKt5qY7gCzD69Mu06v2+32PrwCGduu1zj61E7s7NwGUd5N2WsE/GjvkGqzmO6Rq11ko9Pb9DqG64phPX961kXRv55t+TK8R8VKxj7XVGsHDyAiBw3JlHtHiV6aPWXzqVQwNZfr2Pntp4zUhzE5eoASdfHuLOcYQK0ZQU12MzEcbdd6kOOWYiBjbvboJFS8Z1R3+yn0aO6r7PS8KZ0UloV7drb6O0fjKOs96pzaxqCKpDyQqbT2CaDatUC6tdlRFhTLcxlVoV0Riv/PWP75bwgW7qlmM/9//1gBHGVhdV3FVM12oEjKwtgcqsZ8VgJ+ULa+PJueiZJrvwOpi3++/lK9tN2R26Gl/J2fhHA/5boCNKW8jaMsFlh7F4uF3g60pDl1/ogTlaO0zPg5tzg86kdxpNzyUhd+FFRNtd3C/+jf1bwUBoZ7eN7M5/P//rt8et0Zjry+AFOfGk58fYGqZdz6+vptS6dFDeq29Fso8ev5s0ylyVn7vb9/G7/X7Z+Vf/OhYPj+5w5Mvn7H+0hcCeH/3qjkw8GYYWAu63CvNgvhYAR+p9cFI/A9vy4YgVvTVcGIHM6uCkbkb3ZNMEJPwGuCEfppXxHMXFjIK4IR+zVfD0yIe4FXAxPmmsbVwIS513AtMKEun34LmEyTzJodOVnJzgqj9osjhjzWHZjSypHWE3DhMdy9prPBjBu3d8sqQ/JY0M+l+5+rpyMH55A3zs4EozaWVXuBLjEkfxD0y2QVULewNxvPA9NfFur5CCLVJ08HmtA3z88CUywUoqA4UqiuorbLeWAaBclVIUmqS3W4kewUv85JLk2EOCdngCmS8klStbREUpUAluodSrupuh+/WUVkOQNMf4Jbol4aNkbFviNNmqZebaKkYrE5vMEPSJNWxFvNqcOUb0lp70ZjlWRTbkoSxeJurKljPOzYNL8i3tBOHWZ0g8otDfu+P6qN6o+KX0oN/ybheFjHegntK3IkbZgxaZjhOPj3PlY4T4IFGD8i81cZRsssbZj+0mkYaVmM+FgJTXAq0WI03KYLo45KzsCfb0bNYORMPfM/otSBav6UUoUpN7GVjdgwbtMUhuGfkGeDn+m2zHiItOxxLP5oUMpDp9fUJ6EfkGfZbNowyMrWbyM/qOKDgVLoz9ssqbcMMkv1ZvQnMUw17MedSGrfHCYfFgZFhfvmMCFbhoRSwzDSclRMR0Z3UvowMonWh2Hy+VJaglbE6cK4LB4Maz0bW/Lpw3hxrlyYdCVNGPUQEfL6YXzRLa9ezbQsDVO6SUlSNgB+lms3zcH4lukPmvU0YYLhYK8b5ij4oAtDu+kkI3wYZ7hjOV2EgJGzRzB/Lgdjtg3dsnSjDW6Li2HU45jDgz9o8XTT5zwURzgwW93C/nMLHboqKobRsscwK7Q5Xx3FKbG839QYhw5smJfFwacRuqgnhKEj9Q5aJTSundBDD2/tWcqCcQGFCbM9eEsqOcWiL+MIYejA1oPsBA0EjzE6Dbr8vniNBCMTZ1XiCQ7cYBPBQCGUB/f4BC7y9slByB20SDBYyfS37Rb7R9NBQkQwUExYbM7y0u3pIw2JgxAJBvlpo6sCJBQIdXNLAAPGth5k0Z67dHO6CTCnttpbsI8+AwbfPXvDrbHOQZcLBTBwsN7BH7zlfht5a8uT/dt0zbgbSMPI5mxmogBAVtv+cTbDl030jfOjT9f4MIyg44Mt2qav3jVPtwGyxjoOpmDkruNVjLu9jryPfb98+O6M8WGoMcZrGmcDpVStxjHPLKFgtovjELe+X/0Xbrgw1OB/oJmg84N6rMEmJIy6A+47+MAOl/K4MOyQ0O7AKUU9DjkFhhuwVwkNw2KxZUVcJCrLYsIzzmgwoVuG+7UWK3JiWpCGo2J/XE5M+jCMTksUGMEXKPwpkfPqQqF69zi8TUqGNxIAo7zR0cQfIsDwtAy1zaTuehPUC4VKgSMVQXpApDwEA4xK3QgwwvD2rV/5SO4tUSRpGPFXWzytSpWUcJKGCROA/2l1U6kDniDfDeZ47Q/LYPD8a1LN121x9B3/a//f92/B9bWSmN2EfAA9XU8DRtT/DzjZp9bq5z1H7vCgtByy5B6lV/GnqynARPl6iwFfnpy1qVRiLxmKN+jov4U+fA+NMzFh9iG+FiGkrEoCmP4SrZCQg1UqMMl8T48jeD+nzvEfGd85E9fCz9RgEmMh62zpjr3TVkY+SQgmHTVLDiaLYR7ZMOqtY94L99cA8wsZq2OXKz8M8Ze5ApgnZHmrt+y1gtpw7LFU+mTDAGFcuii+wblhJngLlL015bpltQAYEodoRz2trY9ic50FpoVGkWqDs89WRKujAgiDo+lT22QkHoj1FmYPIDEWvMbmDTO2bUYDTeXPAIDZK054udyC7My4grXPHwTnLC2Djw243nBjdJAJw8hufJSgkGWz78sczgLzB8227rgwwzyyzRAMiWkHiz8m5XlgkGXmjJmuK3N9AsLIW9a3XAXC1JwHBg8zXD9FMtCUsvR0xqHZTMFv2rGMQCD3c8zNnu6RZR7yDg3UBoLJb0CYjDzrGfpxn7GMt+AXz54FZhLipI3Y5qcBCOOcG9Y23YBsasenzhyYWVJLgBa+ptDgw6CNq8IKbhkk6pFQH0hoccYTspUrONDFbuaFFb04Cy+x9wB40sKCLXO1Me6zZVzEHjO/Wq3VJA0Pjbgok8oPRyrkvhX+jSUV4pn1o1I52gRMBiaeBXiaxNpRSxomVqcZrKCLVZeDCbvXxIAp/e/AOBY2Ko3PqzFxGDnG145nnW111k1egQhgZOZtn5NPzkLhRJW/0OW+O55p1rrTKSN2c7owkcSeL+OVCdd5Tu5a9rQMCi0qgompZ1GFrLK4MOhrWhQL9iHgH50n/G3KoVj4tzT2eLEM38U8yUMjFfHKx73ZhOL1LwywZdQm92YT26shPRZ30TmEd9mcYLTg10K5TVpgRpFL6Fvuo7Bkyk20Icja/5h3u4zL/n0056gwL6udq2n8aqM2SqI9Q1gaonua57HOwS6AVwMSdzcHkD72gitw6uAcTXPUncuMu818wdc7+Xebz9A0lJ0d3aCZGn8/50jKj2SCx23P1JuGHjPkIZltLkM7To6W+JEK33E0/uqZL9CQMSZFk+ql26LQx2hcvC2RGXqBu9OYSVvR4IlJ0V3Z1e3F9n9E4q65Q1y7T9U8sxw1R6esU6XlSGjOU5zUsONdjJb5iDiSdCdmSVHRePGUisNqIQpOoToMd28kpdkzPzbUePRYrRTCrL2leqGSf2yEda9MhUYYU2VcbN4tq+KrkNWbx+Yo/JiUhhEIE7NLHTsxckTS748jzeOSNwIh44+lIknTXJIlaZrLsiRLc2mWBGkEkbrPJMnYtO/Bksx4Iwg6fkaJv8MRJSxc2hJzl3OuXTgwalBkM0bjfB8Vc+Xkxplr344l4/ScU3wE+N8Dkar8PxKQRDKFJoN9AAAAAElFTkSuQmCC"></img>
                        </div>

                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {
                                    isVendor && !isUser && !isAdmin ? (<>
                                        <NavLink className="nav-link" to={routes.VENDOR+"/"+vendorRoutes.DASHBOARD} activeclassname="active" >
                                            Home
                                        </NavLink>
                                    </>) : " "
                                }
                                {isUser ?

                                    (<>
                                        <NavLink className="nav-link" to="/user/dashboard" activeclassname="active" >
                                            Home
                                        </NavLink>
                                    </>) : " "
                                }
                            </li>
                            <li className="nav-item">
                                {isVendor && !isUser && !isAdmin   ? (<>
                                    <NavLink className="nav-link" to={routes.VENDOR+"/"+vendorRoutes.CREATE_CATEGORY} activeclassname="active" >
                                        Create Category
                                    </NavLink>
                                </>) : ""
                                }
                            </li>
                            <li className="nav-item">
                                {isAdmin && !isUser && !isVendor ? (<>
                                    <NavLink className="nav-link" to="/admin/allProducts" activeclassname="active" >
                                        All Products
                                    </NavLink>
                                </>) : ""
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    isVendor && !isUser && !isAdmin ? (<>
                                        <NavLink className="nav-link" to={routes.VENDOR+"/"+vendorRoutes.CREATE_PRODUCT} activeclassname="active" >
                                            Create Product
                                        </NavLink>
                                    </>) : " "
                                }
                                {
                                    isAdmin ?
                                        (<>
                                            <NavLink className="nav-link" to={routes.ADMIN + "/" + adminRoutes.ORDERS} activeclassname="active" >
                                                Orders
                                            </NavLink>
                                        </>) : ""

                                }
                                {isUser ?

                                    (<>
                                        <NavLink className="nav-link" to="/cart" activeclassname="active" >
                                            Cart
                                        </NavLink>
                                    </>) : " "
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    isAdmin ? (<>
                                        <NavLink className="nav-link" to="/admin/allUsers" activeclassname="active" >
                                            Users
                                        </NavLink>
                                    </>) : ""
                                }
                            </li>
                            {isShowProductsPage || isUserShowProductsPage ?
                                (<li className="nav-item dropdown">
                                    <select className="form-select" aria-label="Default select example" onChange={handleSelectedData}>
                                        {/* <option selected value="0-150">Select Age </option> */}
                                        <option value="">Select Category </option>
                                        {data?.map((element) => {
                                            return (

                                                <>
                                                    <option value={element._id}>{element.categoryName}</option>
                                                </>

                                            )
                                        })}

                                    </select>
                                </li>) : " "
                            }

                        </ul>
                        <div>
                            <a className="navbar-brand name" onClick={moveToProfilePage} href="#"> {isAdmin ? "" : `${user?.name}`} </a>
                        </div>
                        {
                            isShowProductsPage || isShowUsersPage || isUserShowProductsPage || isShippingPage || isCartPage || isSearchedProductPage ? (<CustomSearchBar onChange={handleInputChange} onClick={handleSearch} />) : " "
                        }
                        <div>
                            <CustomButton className="btn btn-outline-primary" type="button" onClick={handleLogout}> Logout </CustomButton>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}