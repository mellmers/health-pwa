import {ACTION_APPLICATION_CHANGE_THEME, ACTION_APPLICATION_LOGIN} from "../../utils/constants";

export const initialState = {
    isDarkTheme: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_APPLICATION_CHANGE_THEME:
            return {
                ...state,
                isDarkTheme: action.isDarkTheme
            };
        case ACTION_APPLICATION_LOGIN:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}