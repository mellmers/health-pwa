import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {createGenerateClassName} from '@material-ui/core/styles';
import ReduxClient from '@pawjs/redux/client';
import ReduxReducers, {initialState as ReduxInitialState} from './redux/reducer';

export default class Client {

    constructor({addPlugin}) {
        const reduxClient = new ReduxClient({addPlugin});
        reduxClient.setReducers(ReduxReducers);
        addPlugin(reduxClient);
    }

    apply(clientHandler) {
        clientHandler.hooks.beforeRender.tapPromise('RemoveCSS', async (app) => {

            // Create a new class name generator.
            const generateClassName = createGenerateClassName();

            app.children = (
                <JssProvider generateClassName={generateClassName}>
                    {app.children}
                </JssProvider>
            );
        });


        clientHandler.hooks.renderComplete.tap('RemoveCSSElement', () => {
            const jssStyles = document.getElementById('jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        });


        clientHandler.hooks.reduxInitialState.tapPromise("ReduxInitialState", async ({getInitialState, setInitialState}) => {
            const initialState = Object.assign({}, getInitialState(), {});
            // You can also wait for something async to happen
            // await fetch("/api/counter/details") and add it to the initial state if needed
            setInitialState(initialState);
        });
    }
}