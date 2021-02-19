import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";

const reducres = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
  reducres,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
