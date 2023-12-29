import { combineReducers } from "redux";
import { SET_CATEGORY_REDUCER } from "../reducers/setCategoryReducer";




const appReducer = combineReducers({
  categoryReducer : SET_CATEGORY_REDUCER
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;