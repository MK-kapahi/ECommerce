import axios from "axios";
import { takeLatest, put, all } from "redux-saga/effects";
import { ActionStates } from "../../redux/action/actionState";
import { URL, apiEndPoint } from "../../shared/Constant";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCategory, getUsersData, setAllProdcts, setCategory, setProduct, setUser, setUserData } from "../action";
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
        toast.error(error.data.message, {
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
        console.log(error)
    }
}

function* categoryAdd({ payload }) {
    try {
        const response = yield axios.post(URL + apiEndPoint.CREATE_CATEGORY, payload?.data, option)
        console.log(response)
        payload?.handleResponse(response)
    } catch (error) {
        console.log(error)
    }
}

function* categoryList({ payload }) {
    try {
        const response = yield axios.get(URL + apiEndPoint.GET_CATEGORY, option)
        console.log(response)
        yield put(setCategory(response.data))

    } catch (error) {
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
        console.log(error)
    }
}

function* getUser(payload) {
    try {
        const res = yield axios.get(
            URL + apiEndPoint.GET_USERS, option
        );
        console.log(res)
        yield put(setUserData(res?.data));
    } catch (error) {
        console.log(error, "error in getting User")
    }
}

function* getProduct({ payload }) {
    try {
        const res = yield axios.get(
            URL + apiEndPoint.GET_PRODUCT, option
        );
        yield put(setAllProdcts(res?.data));
    } catch (error) {
        console.log(error, "error in getting User")
    }
}

function* getUserById({ payload }) {

    try {
        const res = yield axios.get(URL + apiEndPoint.FIND_USER + payload?.id, option)
        console.log(res)
        yield put(setUser(res?.data))
    }
    catch (error) {
        console.log(error)
    }
}
function* getProductById({ payload }) {

    try {
        const res = yield axios.get(URL + apiEndPoint.FIND_PRODUCT + payload?.id, option)
        console.log(res)
        yield put(setProduct(res?.data))
    }
    catch (error) {
        console.log(error)
    }
}

function* updateUser(payload) {
    try {
        const res = yield axios.put(URL + apiEndPoint.UPDATE + "/" + payload?.payload?.id, payload?.payload?.data, option)
        if (res.status === 200) {

            // payload?.payload?.success("User Updated Successfully")
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
            payload?.payload?.success("User Deleted Successfully ")
        }
    }
    catch (error) {
        payload?.payload?.errorfunction("User Deleted Successfully ")
        console.log(error, "error in adding user")
    }
}

function* deleteProduct(payload) {
    try {
        const res = yield axios.delete(URL + apiEndPoint.DELETE_PRODUCT + "/" + payload?.payload?.id, option);
        console.log(res, "product data")

        if (res.status === 200) {
            yield put(getUsersData({}))
            payload?.payload?.success("User Deleted Successfully ")
        }
    }
    catch (error) {
        payload?.payload?.errorfunction("User Deleted Successfully ")
        console.log(error, "error in adding user")
    }
}

function* updateProduct(payload) {
    try {
        const res = yield axios.put(URL + apiEndPoint.UPDATE_PRODUCT + "/" + payload?.payload?.id, payload?.payload?.formData, option)
        console.log(res)
        if (res.status === 200) {

            // payload?.payload?.success("User Updated Successfully")
        }

    }
    catch (error) {
        console.log(error, "error in updating  user")
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
        takeLatest(ActionStates.UPDATE_PRODUCT, updateProduct)
    ])
}

export default Saga;