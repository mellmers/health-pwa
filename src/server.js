import React from 'react';
import FavIcon from './resources/img/favicon.ico';
import {SheetsRegistry} from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {createGenerateClassName, MuiThemeProvider,} from '@material-ui/core/styles';
import {themeLight} from './utils/theme';
import ApiMiddleware from './api/index';
import ReduxServer from "@pawjs/redux/server";
import ReduxReducers, {initialState as ReduxInitialState} from './redux/reducer';

export default class Server {

    constructor({ addMiddleware, addPlugin }) {
        addMiddleware(ApiMiddleware);

        const reduxServer = new ReduxServer({addPlugin});
        reduxServer.setReducers(ReduxReducers);
        addPlugin(reduxServer);
    }

    apply(serverHandler) {
        serverHandler.hooks.beforeAppRender.tapPromise('AddCSS', async (app, req, res) => {
            const sheetsRegistry = new SheetsRegistry();

            // Create a sheetsManager instance.
            const sheetsManager = new Map();

            // Create a new class name generator.
            const generateClassName = createGenerateClassName();
            app.children = (
                <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                    <MuiThemeProvider theme={themeLight} sheetsManager={sheetsManager}>
                        {app.children}
                    </MuiThemeProvider>
                </JssProvider>
            );
            res.locals.sheetsRegistry = sheetsRegistry;
        });


        serverHandler.hooks.beforeHtmlRender.tapPromise('AppendCSSText', async (app, req, res) => {
            if (res.locals.sheetsRegistry && res.locals.sheetsRegistry.toString) {
                const css = res.locals.sheetsRegistry.toString();
                app.htmlProps.footer.push(<style key="server-css" id="jss-server-side" dangerouslySetInnerHTML={{__html: css}}/>);
            }
            app.htmlProps.head.push(
                <link key="favicon" rel="shortcut icon" type="image/x-icon" href={FavIcon}/>,
            );
            return app;
        });

        serverHandler.hooks.reduxInitialState.tapPromise("AppInitialState", async ({getInitialState, setInitialState}) => {
            const initialState = Object.assign({}, getInitialState(), {});
            // You can also wait for something async to happen
            // await fetch("/api/counter/details") and add it to the initial state if needed
            setInitialState(initialState);
        });
    }
}
