import { combineReducers } from "redux"
import userAuthReducer from "./userAuthReducer"
// import 

const myReducer = combineReducers({
    user: userAuthReducer
});

export default myReducer; 


