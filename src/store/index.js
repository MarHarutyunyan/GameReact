import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { characterReducer } from "./characterReducer";
import {uiReducer} from "./uiReducer";

const rootReducer = combineReducers({
    character: characterReducer,
    ui:uiReducer
})
export const store = createStore(rootReducer, composeWithDevTools());