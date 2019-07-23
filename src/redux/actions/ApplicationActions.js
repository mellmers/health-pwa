import {ACTION_APPLICATION_CHANGE_THEME, ACTION_APPLICATION_LOGIN} from "../../utils/constants";

export const changeTheme = (isDarkTheme) => ({
    type: ACTION_APPLICATION_CHANGE_THEME,
    isDarkTheme: isDarkTheme
});
export const login = (user) => ({
    type: ACTION_APPLICATION_LOGIN,
    user: user
});