

import rootReducer from "./rootReducers";

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import Saga from "./saga";



const composeEnhancers = compose;

const sagaMiddleware = createSagaMiddleware();

const Store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(Saga);
export default Store;