import axios from "axios";
import { takeLatest, put, all } from "redux-saga/effects";
import { ActionStates } from "../../redux/action/actionState";
import { URL, apiEndPoint } from "../../shared/Constant";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllProducts, getUsersData, setAddress, setAllProdcts, setCartElements, setCategory, setEditedCartElements, setOrders, setProduct, setUser, setUserData } from "../action";
const option = {
    withCredentials: 'include',
}

function* login({ payload }) {
    try {

        console.log(URL + apiEndPoint.LOGIN)
        const res = yield axios.post(URL + apiEndPoint.LOGIN, payload?.data, option)
        console.log(res?.data)
        if (res.status === 200) {
            payload?.loginResponse(res)

            const stringifiedObj = JSON.stringify(res?.data?.data)

            localStorage.setItem(
                "userInfo",
                stringifiedObj
            )
            // socket.connect();
        }
    }

    catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
    }
}

function* registerUser({ payload }) {
    try {
        const response = yield axios.post(URL + apiEndPoint.REGISTER, payload?.data, option)
        console.log(response)
        payload?.AccountCreateResponse(response)
    } catch (error) {
        payload?.AccountCreateResponse(error)
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error)
    }
}

function* categoryAdd({ payload }) {
    try {
        const response = yield axios.post(URL + apiEndPoint.CREATE_CATEGORY, payload?.data, option)
        console.log(response)
        payload?.handleResponse(response)
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error)
    }
}

function* categoryList({ payload }) {
    try {
        const response = yield axios.get(URL + apiEndPoint.GET_CATEGORY, option)
        console.log(response)
        yield put(setCategory(response.data))

    } catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error)
    }
}

function* addProduct({ payload }) {
    console.log(payload)
    try {
        const response = yield axios.post(URL + apiEndPoint.ADD_PRODUCT, payload?.formData, option)
        console.log(response)
        payload?.handleResponse(response)
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error)
    }
}
function* logout({ payload }) {
    try {
        const response = yield axios.delete(URL + apiEndPoint.LOGOUT, option)
        console.log(response)
        payload?.handleResponse(response)
        localStorage.clear()
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error)
    }
}

function* getUser(payload) {
    try {
        const res = yield axios.get(
            URL + apiEndPoint.GET_USERS + "?char=" + `${payload?.searchString?.value || ""}`, option
        );
        console.log(res)
        yield put(setUserData(res?.data));
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error, "error in getting User")
    }
}

function* getProduct({ payload }) {
    try {
        const res = yield axios.get(
            URL + apiEndPoint.GET_PRODUCT + "?limit=" + payload?.limit + "&skip=" + payload?.skip + '&char=' + `${payload?.searchString?.value || ""}` + '&categoryId=' + `${payload?.categoryId || ""}` + '&userId=' + `${payload?.userId || ""}`, option
        );
        yield put(setAllProdcts(res?.data));
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error, "error in getting User")
    }
}

function* getUserById({ payload }) {

    try {
        const res = yield axios.get(URL + apiEndPoint.FIND_USER + payload?.id, option)
        yield put(setUser(res?.data))
    }
    catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error)
    }
}
function* getProductById({ payload }) {

    try {
        const res = yield axios.get(URL + apiEndPoint.FIND_PRODUCT + payload?.id, option)
        yield put(setProduct(res?.data))
    }
    catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error)
    }
}

function* updateUser(payload) {
    try {
        const res = yield axios.put(URL + apiEndPoint.UPDATE + "/" + payload?.payload?.id, payload?.payload?.data, option)
        console.log(res)
        if (res.status === 200) {
            payload?.payload?.EditUserResponse(res)
        }

    }
    catch (error) {
        console.log(error, "error in adding user")
    }


}

function* deleteUser(payload) {
    try {
        const res = yield axios.delete(URL + apiEndPoint.DELETE + "/" + payload?.payload?.id, option);
        console.log(res, "user data")

        if (res.status === 200) {
            yield put(getUsersData({}))
            toast.success("User Deleted Successfully ", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }
    catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error, "error in adding user")
    }
}

function* deleteProduct(payload) {
    try {
        const res = yield axios.delete(URL + apiEndPoint.DELETE_PRODUCT + "/" + payload?.payload?.id, option);
        console.log(res, "product data")

        if (res.status === 200) {
            yield put(getAllProducts())
            toast.success("product Deleted sucessfully ", {
                position: toast.POSITION.TOP_RIGHT,
            })
        }
    }
    catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error, "error in adding user")
    }
}

function* updateProduct(payload) {
    try {
        const res = yield axios.put(URL + apiEndPoint.UPDATE_PRODUCT + "/" + payload?.payload?.id, payload?.payload?.formData, option)
        console.log(res)
        if (res.status === 200) {

            payload?.payload?.handleResponse(res)
        }

    }
    catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error, "error in updating  user")
    }
}
function* cartElements({ payload }) {
    yield put(setCartElements(payload?.element))
    toast.success("Element Added to cart", {
        position: toast.POSITION.TOP_RIGHT,
    }
    )
}
function* editCartElements({ payload }) {
    yield put(setEditedCartElements(payload))
    toast.success("Element Removed from cart", {
        position: toast.POSITION.TOP_RIGHT,
    })
}

function* payPaypal({ payload }) {
    console.log(payload)
    const res = yield axios.post(URL + apiEndPoint.PAYPAL_PAY + payload?.priceOfItem, null, option)
    payload?.handleResponse(res)
    console.log(res)
}

function* payByStripe({ payload }) {
    console.log(payload)
    try {

        const res = yield axios.post(URL + apiEndPoint.STRIPE_PAY, { product: payload?.priceOfItem, User: payload?.currentUser, userAddress: payload?.userAddessData }, option)
        payload?.handleStripeResponse(res)
        console.log(res)
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
        })
        console.log(error)
    }
}

function* confirmPayment({ payload }) {
    console.log(payload)
    const res = yield axios.post(URL + apiEndPoint.CONFIRM_STRIPE_PAVMENT, { data: payload }, option)
    console.log(res)
}

function* createOrder({ payload }) {
    console.log(payload)
    try {

        const res = yield axios.post(URL + apiEndPoint.CREATE_ORDER, { product: payload?.cartElement, userId: payload?.id }, option)
        console.log(res)
        payload?.handleOrderPlaced(res)
    } catch (error) {
        console.log(error)
    }
}

function* createAddress({ payload }) {
    try {
        const res = yield axios.post(URL + apiEndPoint.CREATE_ADDRESS, { address: payload?.data, userId: payload?.id }, option)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

function* getAddress({ payload }) {
    try {
        const res = yield axios.get(URL + apiEndPoint.GET_ADDRESS + payload?.id, option)
        console.log(res)

        yield put(setAddress(res?.data))

    } catch (error) {
        console.log(error)
    }
}

function* changeRole({ payload }) {
    try {
        console.log(payload)
        const response = yield axios.put(URL + apiEndPoint.CHANGE_ROLE + payload?.userId, { role: payload?.role }, option)
        toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT,
        })
        yield put(getUsersData({}))
    } catch (error) {
        console.log(error)
    }
}

function* editOrderStatus({ payload }) {
    console.log(payload)
    try {
        const response = yield axios.put(URL + apiEndPoint.EDIT_STATUS + payload?.id, { orderStatus: payload?.status }, option)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

function* getOrders({ payload }) {
    try {
        console.log(payload)
        const response = yield axios.get(URL + apiEndPoint.ORDERS +"?limit=" + payload?.limit + "&skip=" + payload?.skip , option)
        // console.log(response)
        yield put(setOrders(response.data))
    } catch (error) {
        console.log(error)
    }
}
function* Saga() {
    yield all([
        takeLatest(ActionStates.LOGIN, login),
        takeLatest(ActionStates.CREATE_ACCOUNT, registerUser),
        takeLatest(ActionStates.GET_CATEGORY, categoryList),
        takeLatest(ActionStates.ADD_CATEGORY, categoryAdd),
        takeLatest(ActionStates.CREATE_PRODUCT, addProduct),
        takeLatest(ActionStates.LOGOUT, logout),
        takeLatest(ActionStates.GET_ALL_USERS_DATA, getUser),
        takeLatest(ActionStates.GET_ALL_PRODUCTS, getProduct),
        takeLatest(ActionStates.GET_PRODUCT, getProductById),
        takeLatest(ActionStates.GET_USER, getUserById),
        takeLatest(ActionStates.UPDATE_USER, updateUser),
        takeLatest(ActionStates.DELETE_USER, deleteUser),
        takeLatest(ActionStates.DELETE_PRODUCT, deleteProduct),
        takeLatest(ActionStates.UPDATE_PRODUCT, updateProduct),
        takeLatest(ActionStates.ADD_TO_CART, cartElements),
        takeLatest(ActionStates.PAYPAL_PAYMENT, payPaypal),
        takeLatest(ActionStates.STRIPE_PAYMENT, payByStripe),
        takeLatest(ActionStates.CONFIRM_STRIPE_PAYMENT, confirmPayment),
        takeLatest(ActionStates.EDIT_CART, editCartElements),
        takeLatest(ActionStates.REQUEST_ORDER, createOrder),
        takeLatest(ActionStates.ADD_ADDRESS, createAddress),
        takeLatest(ActionStates.GET_ADDRESS, getAddress),
        takeLatest(ActionStates.ASSIGN_ROLE, changeRole),
        takeLatest(ActionStates.EDIT_ORDER_STATUS, editOrderStatus),
        takeLatest(ActionStates.GET_ORDERS, getOrders)
    ])
}

export default Saga;