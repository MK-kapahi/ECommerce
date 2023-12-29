import { ActionStates } from "./actionState"

export const LoginUser = (payload) =>{
  
    return {
      type: ActionStates.LOGIN,
      payload
    }
  }
  
export const createAccount = (payload) =>{
  return {
    type : ActionStates.CREATE_ACCOUNT ,
    payload
  }
}

export const getCategory = () =>{
  return {
    type : ActionStates.GET_CATEGORY
  }

}

export const setCategory = () =>{
  return {
    type : ActionStates.SET_CATEGORY, 
    payload
  }

}