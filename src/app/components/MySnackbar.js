import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {withStyles} from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: '#43a047',
    },
    error: {
        backgroundColor: '#d32f2f',
    },
    info: {
        backgroundColor: '#1976d2',
    },
    warning: {
        backgroundColor: '#ffa000',
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: 5,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    snackbar: {
        marginBottom: 24
    }
});

class MySnackbar extends React.Component {

    render() {
        const { autoHideDuration, classes, className, includeCloseBtn, message, onClose, open, variant, ...other } = this.props;
        let Icon = null;
        if (variant) {
            Icon = variantIcon[variant];
        }
        return (
            <Snackbar
                className={classes.snackbar}
                autoHideDuration={autoHideDuration || 3000}
                onClose={onClose}
                open={open}
            >
                <SnackbarContent
                    className={classNames(classes[variant], className)}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            {Icon ? <Icon className={classNames(classes.icon, classes.iconVariant)}/> : null}
                            {message}
                        </span>
                    }
                    action={ includeCloseBtn ? [
                        <IconButton key="close" aria-label="Schließen" color="inherit" onClick={onClose}>
                            <CloseIcon className={classes.icon}/>
                        </IconButton>,
                    ] : null}
                    {...other}
                />
            </Snackbar>
        );
    }
}

MySnackbar.propTypes = {
    autoHideDuration: PropTypes.number,
    classes: PropTypes.object,
    className: PropTypes.string,
    includeCloseBtn: PropTypes.bool,
    message: PropTypes.node,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
};

export default withStyles(styles)(MySnackbar);