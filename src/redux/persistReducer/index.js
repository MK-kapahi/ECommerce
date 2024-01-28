import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../rootReducers";


const persistConfig = {
    key: 'root',
    storage,
    whitelist : ["cartReducer"]
  }
 const persistedReducer = persistReducer(persistConfig , rootReducer)

 export default persistedReducer;