import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loaderReducer from "./loaderReducer";
import products from "./productsReducer";
import categories from "./categoryReducer";
import cart from './cartReducer'

export default combineReducers({
    authReducer,
    loaderReducer,
    products,
    categories,
    cart
})

// to combine two seperate reducers we need to use a function called combineReducers provided by redux
// this combineReducers just accepts object as a parameter and returns a new reducer . it combines all the reducers together.

//combineReducers function = Turns an object whose values are different reducer functions, into a single reducer function. It will call every child reducer, and gather their results into a single state object, whose keys correspond to the keys of the passed reducer functions.