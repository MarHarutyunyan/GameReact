import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { mainReducer } from "./mainReducer";
import {styleReducer} from "./styleReducer";

const rootReducer = combineReducers({
    main: mainReducer,
    style:styleReducer
})
export const store = createStore(rootReducer, composeWithDevTools());
