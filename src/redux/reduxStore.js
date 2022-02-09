import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { categoryReducer } from "./categoryReducer";
import thunk from "redux-thunk";
import { cartReducer } from "./cartReducer";
import { commonReducer } from "./commonReducer";
import { productReducer } from "./productReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    common: commonReducer,
    category: categoryReducer,
    cart: cartReducer,
    product: productReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

export const persistor = persistStore(store);
export default store;
