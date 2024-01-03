import { ActionStates } from "../action/actionState"


const initialProducts = {

}

export const SET_PRODUCTS_REDUCER = (state = initialProducts, action) => {

    switch (action?.type) {
        case ActionStates.SET_ALL_PRODUCTS:
            return {
                ...state, ...action
            }
        default:
            return state
    }

}