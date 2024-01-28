import { ActionStates } from "../action/actionState";


const orderReducer = {};

export const SET_ORDER_REDUCER = (state = orderReducer, action) => {
    switch (action?.type) {
        case ActionStates.SET_ORDERS:
            return {
                ...state, ...action
            }

        default:
            return state
    }

         
}