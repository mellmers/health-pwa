import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
});

class Anmelden extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Anmelden
                </Typography>
            </React.Fragment>
        );
    }
}

Anmelden.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Anmelden);
