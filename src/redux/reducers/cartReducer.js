import { ActionStates } from "../action/actionState";


const cartData = localStorage.getItem("persist") ? JSON.parse(localStorage.getItem("persist")) : [];

export const SET_CART_ELEMENTS_REDUCER = (state = cartData, action) => {
    switch (action?.type) {
        case ActionStates.SET_CART_ELEMENTS:
            return [
                ...state, action?.payload
            ]

        case ActionStates.SET_EDITED_CART:
            return [
                ...action?.payload?.tempData
            ]

            case ActionStates.INCREMENT_QUANTITY:
                console.log(  action?.payload)
                const { itemId } = action?.payload;
                return state.map(item =>
                    item._id === itemId
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                );
      
            case ActionStates.DECREMENT_QUANTITY:
                console.log(  action?.payload)
                const { itemId: decItemId } = action?.payload;
                return state.map(item =>
                    item._id === decItemId && item.quantity > 1
                      ? { ...item, quantity: item.quantity - 1 }
                      : item
                );

            case ActionStates.EMPTY_CART : 
            return [
                
            ]    
        default:
            return state
    }


}