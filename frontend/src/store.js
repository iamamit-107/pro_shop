import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducres = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducres,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
