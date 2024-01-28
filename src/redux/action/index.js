import { ActionStates } from "./actionState"

export const LoginUser = (payload) => {

  return {
    type: ActionStates.LOGIN,
    payload
  }
}

export const logoutUser = (payload) => {
  return {
    type: ActionStates.LOGOUT,
    payload
  }
}

export const createAccount = (payload) => {
  return {
    type: ActionStates.CREATE_ACCOUNT,
    payload
  }
}

export const getCategory = (payload) => {
  return {
    type: ActionStates.GET_CATEGORY,
    payload
  }

}

export const setCategory = (payload) => {
  return {
    type: ActionStates.SET_CATEGORY,
    payload
  }

}

export const addCategory = (payload) => {
  return {
    type: ActionStates.ADD_CATEGORY,
    payload
  }

}

export const createProduct = (payload) => {
  console.log(payload)
  return {
    type: ActionStates.CREATE_PRODUCT,
    payload
  }
}

export const getUsersData = (payload) => {
  return {
    type: ActionStates.GET_ALL_USERS_DATA,
    payload
  }
}

export const setUserData = (payload) => {
  return {
    type: ActionStates.SET_USER_DATA,
    payload
  }
}

export const getAllProducts = (payload) => {
  console.log(payload)
  return {
    type: ActionStates.GET_ALL_PRODUCTS,
    payload
  }
}

export const setAllProdcts = (payload) => {
  return {
    type: ActionStates.SET_ALL_PRODUCTS,
    payload
  }
}

export const getUser = (payload) => {

  return {
    type: ActionStates.GET_USER,
    payload
  }
}

export const setUser = (payload) => {
  return {
    type: ActionStates.SET_USER,
    payload
  }
}

export const getProduct = (payload) => {

  return {
    type: ActionStates.GET_PRODUCT,
    payload
  }
}

export const setProduct = (payload) => {
  return {
    type: ActionStates.SET_PRODUCT,
    payload
  }
}

export const updateUser = (payload) => {
  return {
    type: ActionStates.UPDATE_USER,
    payload
  }
}
export const updateProduct = (payload) => {
  return {
    type: ActionStates.UPDATE_PRODUCT,
    payload
  }
}

export const deleteProduct = (payload) => {
  return {
    type: ActionStates.DELETE_PRODUCT,
    payload
  }
}

export const deleteUser = (payload) => {
  return {
    type: ActionStates.DELETE_USER,
    payload
  }
}

export const addToCart = (payload) => {
  return {
    type: ActionStates.ADD_TO_CART,
    payload
  }
}

export const setCartElements = (payload) => {
  return {
    type: ActionStates.SET_CART_ELEMENTS,
    payload
  }
}

export const setEditedCartElements = (payload) => {
  return {
    type: ActionStates.SET_EDITED_CART,
    payload
  }
}

export const payByPaypal = (payload) => {
  return {
    type: ActionStates.PAYPAL_PAYMENT,
    payload
  }
}
export const stripePayment = (payload) => {
  return {
    type: ActionStates.STRIPE_PAYMENT,
    payload
  }
}

export const confirmStripePayment = (payload) => {
  return {
    type: ActionStates.CONFIRM_STRIPE_PAYMENT,
    payload
  }
}

export const editCart = (payload) => {
  return {
    type: ActionStates.EDIT_CART,
    payload
  }
}

export const setCategoryId = (payload) => {
  console.log(payload)
  return {
    type: ActionStates.SET_CATEGORY_ID,
    payload,
  };
};

export const setSearchedValue = (value) => {
  return {
    type: ActionStates.SET_SEARCHED_VALUE,
    payload: value,
  };
}


export const incrementQuantity = (payload) => {
  return {
    type: ActionStates.INCREMENT_QUANTITY,
    payload
  };
}

export const decrementQuantity = (payload) => {
  return {
    type: ActionStates.DECREMENT_QUANTITY,
    payload
  };
}

export const emptyCart = (payload) => {
  return {
    type: ActionStates.EMPTY_CART,
    payload
  }
}

export const requestOrder = (payload) => {
  return {
    type: ActionStates.REQUEST_ORDER,
    payload
  }
}

export const addAddress = (payload) => {
  return {
    type: ActionStates.ADD_ADDRESS,
    payload
  }
}

export const getAddress = (payload) => {
  return {
    type: ActionStates.GET_ADDRESS,
    payload
  }
}

export const setAddress = (payload) => {
  return {
    type: ActionStates.SET_ADDRESS,
    payload
  }
}

export const assignRole = (payload) => {
  return {
    type: ActionStates.ASSIGN_ROLE,
    payload
  }
}

export const editOrderStatus = (payload) => {
  return {
    type: ActionStates.EDIT_ORDER_STATUS,
    payload
  }
}

export const getOrders = (payload) => {
  return {
    type: ActionStates.GET_ORDERS,
    payload
  }
}

export const setOrders = (payload) => {
  return {
    type: ActionStates.SET_ORDERS,
    payload
  }
}

