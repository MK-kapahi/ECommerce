import { ActionStates } from "../action/actionState";


const UserRegister = {};

export const SET_SINGLE_USER_REDUCER = (state = UserRegister, action) => {
    switch (action?.type) {
        case ActionStates.SET_USER:
            return {
                ...state, ...action
            }

        default:
            return state
    }

         
}