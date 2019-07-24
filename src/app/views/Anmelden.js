import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import API from '../../utils/API';
import MySnackbar from '../components/MySnackbar';

import {login} from '../../redux/actions/ApplicationActions';

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    textField: {
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        width: 350,
        maxWidth: '100%'
    },
});

class Anmelden extends React.Component {

    state = {
        disabled: false,
        email: '',
        password: '',
        showPassword: false,
        snackbarMessage: '',
        snackbarOpen: false,
        snackbarVariant: 'success'
    };

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({snackbarOpen: false});
    }

    handleChange(prop, event) {
        this.setState({[prop]: event.target.value});
    }

    handleClickShowPassword() {
        this.setState({showPassword: !this.state.showPassword});
    };

    onSubmit(event) {
        event.preventDefault();
        const {email, password} = this.state;

        this.setState({disabled: true});

        API.getInstance().login({
            email: email,
            password: password
        }).then(result => {
            let newState = {};

            if (result.status === 'error') {
                newState = {
                    snackbarOpen: true,
                    snackbarMessage: result.message,
                    snackbarVariant: 'error'
                };
            } else if (result.status === 'success') {
                newState = {
                    snackbarOpen: true,
                    snackbarMessage: 'Erfolgreich eingeloggt!',
                    snackbarVariant: 'success'
                };

                this.props.dispatch(login({
                    ...result.data.user,
                    expiresIn: result.data.expiresIn,
                    token: result.data.token
                }));
            } else {
                console.log('We have a problem here, bro.');
            }

            this.setState({
                ...newState,
                disabled: false
            });
        });
    }

    render() {
        const {classes} = this.props;
        const {disabled, email, password, showPassword, snackbarMessage, snackbarOpen, snackbarVariant} = this.state;

        console.log(this.props.user);

        return (
            <form autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Anmelden
                </Typography>
                <TextField
                    id="email"
                    className={classes.textField}
                    variant="outlined"
                    type="email"
                    label="E-Mail"
                    value={email}
                    onChange={this.handleChange.bind(this, 'email')}
                />
                <TextField
                    id="password"
                    className={classes.textField}
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    label="Passwort"
                    value={password}
                    onChange={this.handleChange.bind(this, 'password')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword.bind(this)}>
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button type="submit" variant="contained" color="primary" size="large" disabled={disabled}>{disabled ? 'Anmeldung läuft ...' : 'Anmelden'}</Button>

                <MySnackbar
                    message={snackbarMessage}
                    onClose={this.handleClose.bind(this)}
                    open={snackbarOpen}
                    variant={snackbarVariant}
                    includeCloseBtn
                />
            </form>
        );
    }
}

Anmelden.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { user: state.application.user };
}

export default withStyles(styles)(connect(mapStateToProps)(Anmelden));
