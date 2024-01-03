import { ActionStates } from "../action/actionState";


const ProjectRegister = {};

export const SET_SINGLE_PRODUCT_REDUCER = (state = ProjectRegister, action) => {
    switch (action?.type) {
        case ActionStates.SET_PRODUCT:
            return {
                ...state, ...action
            }

        default:
            return state
    }

         
}