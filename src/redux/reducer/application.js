import {ACTION_APPLICATION_CHANGE_THEME} from "../../utils/constants";

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
        default:
            return state;
    }
}