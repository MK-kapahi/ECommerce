// reducers.js
import { ActionStates } from '../action/actionState';

const initialState = {
    categoryId: '',
};

const CAREGORY_ID_REDUCER = (state = initialState, action) => {
    switch (action.type) {
        case ActionStates.SET_CATEGORY_ID:
            return {
                ...state,
                categoryId: action.payload,
            };
        // ... handle other actions
        default:
            return state;
    }
};

export default CAREGORY_ID_REDUCER;
