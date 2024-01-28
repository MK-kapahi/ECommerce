import { ActionStates } from "../action/actionState";


const addressReducer = {};

export const SET_ADDRESS_REDUCER = (state = addressReducer, action) => {
    switch (action?.type) {
        case ActionStates.SET_ADDRESS:
            return {
                ...state, ...action
            }

        default:
            return state
    }

         
}