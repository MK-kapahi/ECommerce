// reducers.js
import { ActionStates } from '../action/actionState';

const initialState = {
    value: '',
};

const SEARCHED_VALUE_REDUCER = (state = initialState, action) => {
    switch (action.type) {
        case ActionStates.SET_SEARCHED_VALUE:
            return {
                ...state,
                value: action?.payload,
            };
        // ... handle other actions
        default:
            return state;
    }
};

export default SEARCHED_VALUE_REDUCER;