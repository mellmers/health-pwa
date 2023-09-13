import {
    ACTION_APPLICATION_CHANGE_THEME,
    ACTION_APPLICATION_LOGIN,
    ACTION_APPLICATION_LOGOUT,
    ACTION_APPLICATION_SNACKBAR
} from "../../utils/constants";

export const initialState = {
    isDarkTheme: true,
    user: null,
    snackbar: {
        autoHideDuration: 5000,
        message: '',
        open: false,
        variant: 'success',
        closeBtn: true
    }
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
        case ACTION_APPLICATION_LOGOUT:
            return {
                ...state,
                user: action.user
            };
        case ACTION_APPLICATION_SNACKBAR:
            return {
                ...state,
                snackbar: {...initialState.snackbar, ...action.settings}
            };
        default:
            return state;
    }
}