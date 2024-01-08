import { combineReducers } from "redux";
import { SET_CATEGORY_REDUCER } from "../reducers/setCategoryReducer";
import { SET_USER_REDUCER } from "../reducers/setUserReducer";
import { SET_PRODUCTS_REDUCER } from "../reducers/setProductReducer";
import { SET_SINGLE_PRODUCT_REDUCER } from "../reducers/setAProduct";
import { SET_SINGLE_USER_REDUCER } from "../reducers/setAUser";
import { SET_CART_ELEMENTS_REDUCER } from "../reducers/cartReducer";
const appReducer = combineReducers({
  categoryReducer : SET_CATEGORY_REDUCER,
  registerReducer: SET_USER_REDUCER,
  productsReducer : SET_PRODUCTS_REDUCER, 
  userReducer : SET_SINGLE_USER_REDUCER , 
  singleProductReducer : SET_SINGLE_PRODUCT_REDUCER,
  cartReducer : SET_CART_ELEMENTS_REDUCER
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;