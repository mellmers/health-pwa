import {createMuiTheme} from "@material-ui/core";
import {green, orange} from "@material-ui/core/colors";

const themeDefault = {
    palette: {
        primary: green,
        secondary: orange,
        accent: orange,
    },
    typography: {
        useNextVariants: true,
    },
};

export const themeLight = createMuiTheme({
    ...themeDefault,
    palette: {
        ...themeDefault.palette,
        primary: {
            ...themeDefault.palette.primary,
            contrastText: "#fff"
        },
        type: 'light',
    }
});

export const themeDark = createMuiTheme({
    ...themeDefault,
    palette: {
        ...themeDefault.palette,
        primary: {
            ...themeDefault.palette.primary,
            contrastText: "#fff"
        },
        type: 'dark',
    }
});