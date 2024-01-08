import { ActionStates } from "../action/actionState";


const cartRegister  = [
    
];

export const SET_CART_ELEMENTS_REDUCER = (state = cartRegister, action) => {
    switch (action?.type) {
        case ActionStates.SET_CART_ELEMENTS:
            return [
                ...state, ...action?.payload
            ]

        default:
            return state
    }

         
}