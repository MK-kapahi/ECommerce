import { useState } from "react";
export const ERROR_MESSAGES = {
  ENTER_ALL_FIELDS: "All fields are mandatory",
  ENTER_VALID_LENGTH: "enter Name with atleast more than 2 character",
  ENTER_BELOW_LENGTH_LIMIT: (length) => (`Enter Character less than ${length + 1} only`),
  SELECT_IMAGE: " IMAGE SHOULD BE SELECTED",
  ENTER_VALID_EMAIL: "Enter valid email",
  ENTER_AGE_IN_RANGE: "Enter age between 0-100 and numeric value",
  ENTER_NUMBER_ONLY: "Enter number only ",
  ENTER_VALID_CONTACT_NUMBER: "Enter a valid conatct nuber",
  ENTER_ALPHABETS_ONLY: "Enter alphabets only (do not Enter numeric value , special character or space bar",
  ENTER_VALID_PASSWORD: "",
  SELECT_CATEGORY: "SELECT CATEGORY"
}

export const REGEX = {
  USERNAME: /^[a-zA-Z,'.\-\s]*$/,
  EMAIL: /[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}/,
  PASSWORD: /^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
  PHONE: /^[6-9]\\d{9}$/,
};

export const IMAGEURL = "http://localhost:8000/api/v1/image/"
export const URL = process.env.REACT_APP_API_BASE_URL
export const apiEndPoint =
{
  LOGIN: "login",
  REGISTER: "register",
  GET_USERS: "users",
  POST: "addUser",
  UPLOADIMAGE: "upload",
  DELETE: "deleteUser",
  DELETE_PRODUCT: "deleteProduct",
  UPDATE: "updateUser",
  UPDATE_PRODUCT: "updateProduct",
  FIND_USER: "getAUser/",
  FIND_PRODUCT: "getAProduct/",
  LOGOUT: "logout",
  DATA: "getData",
  FILTER: "filter",
  SEARCH_USER: "searchUser/",
  CREATE_CATEGORY: "createCategory",
  GET_CATEGORY: "getCategory",
  ADD_PRODUCT: "createProduct",
  GET_PRODUCT: "getProduct",
  PAYPAL_PAY: "payment/",
  STRIPE_PAY: "paymentByStripe",
  CONFIRM_STRIPE_PAVMENT: "paymentConfirm",
  CREATE_ORDER: "createOrder",
  CREATE_ADDRESS: "createAddress",
  GET_ADDRESS: "getAddress/",
  CHANGE_ROLE: "changeRole/",
  EDIT_STATUS: "editStatus/",
  ORDERS: "getOrders"
}



export const routes = {
  LOGIN: "/login",
  SIGNUP: "/signUp",
  ADMIN: "/admin",
  USER: "/user",
  CART: "/cart",
  NO_ROLE: "/no-role",
  VENDOR: "/vendor"
}

export const userRoutes = {
  DASHBOARD: "dashboard",
  PRODUCT: "showProducts",
  SINGLE_PRODUCT: "show-product",
  SEARCHED_PRODUCTS: "searched-Product",
  PROFILE: "profile"
}

export const adminRoutes = {
  DASHBOARD: "dashboard",
  CREATE_CATEGORY: "category",
  CREATE_PRODUCT: "product",
  ORDERS: "orders",
  USERS: "allUsers",
  PRODUCTS: "allProducts",
  UPDATE: "allUsers/update/:id",
  UPDATE_PRODUCT: "allProducts/update/:id",

}

export const cartRoutes = {
  BUY: "shipping-details",
  PROCESSING_PAGE: "/processing-page",
  SUCCESS_PAGE: "success-Page",
  ERROR_PAGE: "error-Page"
}

export const vendorRoutes = {
  DASHBOARD: "dashboard",
  CREATE_CATEGORY: "category",
  CREATE_PRODUCT: "product",
}
