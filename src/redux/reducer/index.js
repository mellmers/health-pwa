import { combineReducers } from "redux";
import Application, { initialState as AppInitialState } from "./application";

export default combineReducers({
    application: Application
});

export const initialState = {
    ...AppInitialState
};