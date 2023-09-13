import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Typography, withStyles} from "@material-ui/core";

import Divider from '@material-ui/core/Divider';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from "@material-ui/core/Switch";

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import InvertedColorsIcon from '@material-ui/icons/InvertColors';
import {logout} from "../../redux/actions/ApplicationActions";
import API from "../../utils/API";
const styles = theme => ({
    label: {
        display: 'inline-block'
    }
});

class Sidebar extends React.Component {

    state = {
        isDarkTheme: this.props.isDarkTheme,
    };

    handleChange = (event) => {
        this.setState({ isDarkTheme: event.target.checked });

        if (this.props.onChangeTheme) {
            this.props.onChangeTheme(event.target.checked);
        }
    };

    logout = () => {
        API.getInstance().logout();
    };

    render() {
        const {classes, open, user} = this.props;
        return (
            <React.Fragment>
                <List>
                    <ListItem button component={Link} to="/dashboard">
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    {/*<ListItem button component={Link} to="/anmelden">
                        <ListItemIcon>
                            <AccountBoxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Anmelden"/>
                    </ListItem>*/}
                    <ListItem button component={Link} to="/daten">
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Daten erfassen"/>
                    </ListItem>
                    <ListItem button component={Link} to="/report">
                        <ListItemIcon>
                            <BarChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Statistik"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    { open && user && user.name ? (
                        <React.Fragment>
                            <ListItem>
                                <ListItemText
                                    primary="Eingeloggt als:"
                                    secondary={user.name}
                                />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard" onClick={this.logout.bind(this)}>
                                <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Abmelden"/>
                            </ListItem>
                        </React.Fragment>
                    ) : null}
                    <ListItem>
                        <ListItemIcon>
                            <InvertedColorsIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography
                                className={classes.label}
                                component="label"
                                htmlFor="isDarkTheme"
                            >
                                Light
                            </Typography>
                            <Switch
                                checked={this.state.isDarkTheme}
                                color="primary"
                                id="isDarkTheme"
                                onChange={this.handleChange.bind(this)}
                                inputProps={{'aria-label': 'primary checkbox'}}
                                value="isDarkTheme"
                            />
                            <Typography
                                className={classes.label}
                                component="label"
                                htmlFor="isDarkTheme"
                            >
                                Dark
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <InfoIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Version" secondary={process.env.APP_VERSION}/>
                    </ListItem>
                </List>
            </React.Fragment>
        );
    }
}

Sidebar.propTypes = {
    onChangeTheme: PropTypes.func,
    isDarkTheme: PropTypes.bool,
    open: PropTypes.bool
};

function mapStateToProps(state) {
    return { user: state.application.user };
}

export default withStyles(styles)(connect(mapStateToProps)(Sidebar));
