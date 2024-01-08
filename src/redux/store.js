
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import Saga from "./saga";
import persistedReducer from "./persistReducer";
import { persistStore } from "redux-persist";

const composeEnhancers = compose;

const sagaMiddleware = createSagaMiddleware();

export const Store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
export const persistor  = persistStore(Store)
sagaMiddleware.run(Saga);
