import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from "@material-ui/core/Input";

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
        email: '',
        password: '',
        showPassword: false
    };

    handleChange(prop, event) {
        this.setState({[prop]: event.target.value});
    }

    handleClickShowPassword() {
        this.setState({showPassword: !this.state.showPassword});
    };

    onSubmit(event) {
        event.preventDefault();
        const {email, password} = this.state;
        console.log(email, password);

    }

    render() {
        const {classes} = this.props;
        const {email, password, showPassword} = this.state;

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
                <Button type="submit" variant="contained" color="primary" size="large" className={classes.button}>
                    {/*<SaveIcon className={classes.rightIcon} />*/}
                    Anmelden
                </Button>
            </form>
        );
    }
}

Anmelden.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Anmelden);
