import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';

import API from "../../utils/API";

import MySnackbar from "../components/MySnackbar";

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    button: {
        width: '100%'
    },
    rightIcon: {
        marginRight: 15,
    },
    textField: {
        flexBasis: 200,
        marginTop: 8,
        marginBottom: 16,
        width: '100%'
    },
});

class Daten extends React.Component {

    state = {
        disabled: false,
        weight: '',
        fat: '',
        muscle: '',
        visceralFat: '',
        snackbarMessage: '',
        snackbarOpen: false,
        snackbarVariant: 'success'
    };

    handleChange (prop, event) {
        this.setState({[prop]: event.target.value});
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({snackbarOpen: false});
    }

    onSubmit (event) {
        event.preventDefault();

        if (this.props.user) {
            this.setState({disabled: true});

            const {weight, fat, muscle, visceralFat} = this.state;

            API.getInstance()._fetch('/balancedata', 'POST', {
                weight: weight,
                fat: fat,
                muscle: muscle,
                visceralFat: visceralFat
            }, null, {
                "Authorization": "Bearer " + this.props.user.token
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
                        snackbarMessage: 'Daten gespeichert!',
                        snackbarVariant: 'success'
                    };
                } else {
                    console.log('We have a problem here, bro.');
                }

                this.setState({
                    ...newState,
                    disabled: false
                });
            });
        } else {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Du musst dich erst einloggen!',
                snackbarVariant: 'error'
            });
        }
    }

    render() {
        const {classes} = this.props;
        const {weight, fat, muscle, visceralFat, snackbarMessage, snackbarOpen, snackbarVariant} = this.state;

        return (
            <form autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Daten erfassen
                </Typography>
                <TextField
                    id="weight"
                    className={classes.textField}
                    variant="outlined"
                    label="Gewicht"
                    value={weight}
                    onChange={this.handleChange.bind(this, 'weight')}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                    }}
                    type="number"
                    required
                />
                <TextField
                    id="fat"
                    className={classes.textField}
                    variant="outlined"
                    label="Fettanteil"
                    value={fat}
                    onChange={this.handleChange.bind(this, 'fat')}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    type="number"
                    required
                />
                <TextField
                    id="muscle"
                    className={classes.textField}
                    variant="outlined"
                    label="Muskelanteil"
                    value={muscle}
                    onChange={this.handleChange.bind(this, 'muscle')}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    type="number"
                    required
                />
                <TextField
                    id="visceralFat"
                    className={classes.textField}
                    variant="outlined"
                    label="Viszeraler Fettwert"
                    value={visceralFat}
                    onChange={this.handleChange.bind(this, 'visceralFat')}
                    type="number"
                    required
                />
                <Button type="submit" variant="contained" color="primary" size="large" className={classes.button}>
                    <SaveIcon className={classes.rightIcon} />
                    Speichern
                </Button>

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

Daten.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { user: state.application.user };
}

export default withStyles(styles)(connect(mapStateToProps)(Daten));
