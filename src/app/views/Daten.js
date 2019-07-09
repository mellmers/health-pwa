import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
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
        name: '',
        weight: '',
        fat: '',
        muscle: '',
        visceralFat: '',
        snackbarOpen: false
    };

    handleChange (prop, event) {
        this.setState({[prop]: event.target.value});
    }

    handleClose(event, reason) {
        console.log(reason);
        if (reason === 'clickaway') {
            return;
        }
        this.setState({snackbarOpen: false});
    }

    onSubmit (event) {
        event.preventDefault();
        this.setState({snackbarOpen: true});
    }

    render() {
        const {classes} = this.props;
        const {name, weight, fat, muscle, visceralFat, snackbarOpen} = this.state;

        return (
            <form noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Daten erfassen
                </Typography>
                <TextField
                    id="name"
                    className={classes.textField}
                    variant="outlined"
                    label="Name"
                    value={name}
                    onChange={this.handleChange.bind(this, 'name')}
                />
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
                />
                <TextField
                    id="visceralFat"
                    className={classes.textField}
                    variant="outlined"
                    label="Viszeraler Fettwert"
                    value={visceralFat}
                    onChange={this.handleChange.bind(this, 'visceralFat')}
                />
                <Button type="submit" variant="contained" color="primary" size="large" className={classes.button}>
                    <SaveIcon className={classes.rightIcon} />
                    Speichern
                </Button>

                <MySnackbar
                    message={
                        "Gespeichert!"
                    }
                    onClose={this.handleClose.bind(this)}
                    open={snackbarOpen}
                    variant="success"
                    includeCloseBtn
                />
                {/*<Snackbar*/}
                    {/*autoHideDuration={4000}*/}
                    {/*className={classes.snackbar}*/}
                    {/*onClose={this.handleClose.bind(this)}*/}
                    {/*open={snackbarOpen}*/}
                {/*>*/}
                    {/*<SnackbarContent*/}
                        {/*className={classes.snackbarContent}*/}
                        {/*message={*/}
                            {/*"Gespeichert!"*/}
                        {/*}*/}
                    {/*/>*/}
                {/*</Snackbar>*/}
            </form>
        );
    }
}

Daten.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Daten);
