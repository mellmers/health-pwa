import {ACTION_APPLICATION_CHANGE_THEME} from "../../utils/constants";

export const changeTheme = (isDarkTheme) => ({
    type: ACTION_APPLICATION_CHANGE_THEME,
    isDarkTheme: isDarkTheme
});