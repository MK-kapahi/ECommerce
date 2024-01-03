import { ActionStates } from "../action/actionState"



const initialStateForRegister = {
}
export const SET_USER_REDUCER = (state = initialStateForRegister, action) => {
    console.log(action)
    switch (action?.type) {
        case ActionStates.SET_USER_DATA:
            return {
                ...state, ...action
            }

        default:
            return state
    }


}