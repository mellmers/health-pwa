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

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    button: {
        width: '100%',
        marginBottom: 25
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
        sendingData: false
    };

    handleChange (prop, event) {
        this.setState({[prop]: event.target.value});
    }

    onSubmit (event) {
        event.preventDefault();

        if (this.props.user) {
            this.setState({disabled: true, sendingData: true});

            const {weight, fat, muscle, visceralFat} = this.state;

            API.getInstance().fetch('/balancedata', 'POST', {
                weight: weight,
                fat: fat,
                muscle: muscle,
                visceralFat: visceralFat
            }).then(result => {
                let snackbarSettings = {};

                if (result.status === 'error') {
                    snackbarSettings = {
                        open: true,
                        message: result.message,
                        variant: 'error'
                    };
                } else if (result.status === 'success') {
                    snackbarSettings = {
                        open: true,
                        message: 'Daten gespeichert!',
                        variant: 'success'
                    };
                } else {
                    console.log('We have a problem here, bro.');
                }

                this.props.dispatch(snackbar(snackbarSettings));
                this.setState({sendingData: false});
            });
        } else {
            this.props.dispatch(snackbar({
                open: true,
                message: 'Du musst dich erst einloggen!',
                variant: 'error'
            }));
        }
    }

    resetForm() {
        this.setState({
            disabled: false,
            weight: '',
            fat: '',
            muscle: '',
            visceralFat: ''
        });
    }

    render() {
        const {classes} = this.props;
        const {disabled, weight, fat, muscle, visceralFat, sendingData} = this.state;

        let resetBtn = null;
        if (disabled && !sendingData) {
            resetBtn = <Button variant="outlined" color="primary" size="large" className={classes.button} onClick={this.resetForm.bind(this)}>Zurücksetzen</Button>
        }

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
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    type="number"
                    required
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
                />
                <Button type="submit" variant="contained" color="primary" size="large" className={classes.button} disabled={disabled}>
                    <SaveIcon className={classes.rightIcon} />
                    {sendingData ? 'Wird gespeichert ...' : 'Speichern'}
                </Button>

                {resetBtn}
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
