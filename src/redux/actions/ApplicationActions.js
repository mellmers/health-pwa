import {
    ACTION_APPLICATION_CHANGE_THEME,
    ACTION_APPLICATION_LOGIN,
    ACTION_APPLICATION_LOGOUT,
    ACTION_APPLICATION_SNACKBAR
} from "../../utils/constants";

export const changeTheme = (isDarkTheme) => ({
    type: ACTION_APPLICATION_CHANGE_THEME,
    isDarkTheme: isDarkTheme
});
export const login = (user) => ({
    type: ACTION_APPLICATION_LOGIN,
    user: user
});
export const logout = () => ({
    type: ACTION_APPLICATION_LOGOUT,
    user: null
});
export const snackbar = (settings) => ({
    type: ACTION_APPLICATION_SNACKBAR,
    settings: settings
});