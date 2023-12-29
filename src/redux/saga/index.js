import axios from "axios";
import { takeLatest, put, all } from "redux-saga/effects";
import { ActionStates } from "../../redux/action/actionState";
import { URL, apiEndPoint } from "../../shared/Constant";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCategory, setCategory } from "../action";
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

function* categoryList({ payload }) {
    try {
        const response = yield axios.post(URL + apiEndPoint.REGISTER, payload?.data, option)
        console.log(response)
       yield put(setCategory(response.data))

    } catch (error) {
        console.log(error)
    }
}
function* Saga() {
    yield all([
        takeLatest(ActionStates.LOGIN, login),
        takeLatest(ActionStates.CREATE_ACCOUNT, registerUser),
        takeLatest(ActionStates.GET_CATEGORY , categoryList)
    ])
}

export default Saga;