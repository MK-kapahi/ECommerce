import { ActionStates } from "./actionState"

export const LoginUser = (payload) => {

  return {
    type: ActionStates.LOGIN,
    payload
  }
}

export const logoutUser = (payload) =>{
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

export const getAllProducts = (payload) =>{
  return {
    type : ActionStates.GET_ALL_PRODUCTS,
    payload
  }
}

export const setAllProdcts = (payload) =>{
  return {
    type : ActionStates.SET_ALL_PRODUCTS , 
    payload
  }
}

export const getUser = (payload) =>{
  
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

export const getProduct = (payload) =>{
  
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

export const updateUser = (payload) =>{
  return {
    type: ActionStates.UPDATE_USER ,
    payload
  }
}
export const updateProduct= (payload) =>{
  return {
    type: ActionStates.UPDATE_PRODUCT ,
    payload
  }
}

export const deleteProduct= (payload) =>{
  return {
    type: ActionStates.DELETE_PRODUCT ,
    payload
  }
}

export const deleteUser= (payload) =>{
  return {
    type: ActionStates.DELETE_USER ,
    payload
  }
}
