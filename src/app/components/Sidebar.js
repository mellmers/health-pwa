import React from 'react';
import PropTypes from 'prop-types';

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
import InfoIcon from '@material-ui/icons/Info';
import InvertedColorsIcon from '@material-ui/icons/InvertColors';

const styles = theme => ({
    label: {
        display: 'inline-block'
    }
});

class Sidebar extends React.Component {

    state = {
        colorMode: true,
    };

    handleChange = (event) => {
        this.setState({ colorMode: event.target.checked });

        if (this.props.onChangeTheme) {
            this.props.onChangeTheme(event.target.checked);
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <List>
                    <ListItem button component="a" href="/dashboard">
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    <ListItem button component="a" href="/anmelden">
                        <ListItemIcon>
                            <AccountBoxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Anmelden"/>
                    </ListItem>
                    <ListItem button component="a" href="/daten">
                        <ListItemIcon>
                            <AssignmentIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Daten erfassen"/>
                    </ListItem>
                    <ListItem button component="a" href="/report" disabled>
                        <ListItemIcon>
                            <BarChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Report"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <InfoIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Version" secondary={process.env.APP_VERSION}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <InvertedColorsIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography
                                className={classes.label}
                                component="label"
                                htmlFor="colorMode"
                            >
                                Light
                            </Typography>
                            <Switch
                                checked={this.state.colorMode}
                                color="primary"
                                id="colorMode"
                                onChange={this.handleChange.bind(this)}
                                inputProps={{'aria-label': 'primary checkbox'}}
                                value="colorMode"
                            />
                            <Typography
                                className={classes.label}
                                component="label"
                                htmlFor="colorMode"
                            >
                                Dark
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </React.Fragment>
        );
    }
}

Sidebar.propTypes = {
    onChangeTheme: PropTypes.func
};
export default withStyles(styles)(Sidebar);