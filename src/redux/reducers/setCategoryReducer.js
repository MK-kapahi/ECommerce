import { ActionStates } from "../action/actionState";

const initialRegister = {};

export const SET_CATEGORY_REDUCER = (state = initialRegister, action) => {
    switch (action?.type) {
        case ActionStates.SET_CATEGORY:
            return {
                ...state, ...action
            }
        default:
            return state
    }  
}