import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import API from '../../utils/API';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        marginLeft: 5
    },
});

class Dashboard extends React.Component {

    state = {
        balanceData: null
    };

    componentDidMount() {
        const {user} = this.props;

        if (user) {
            API.getInstance().fetch('/users/balancedata').then(result => {
                if (result && result.status === "success") {
                    this.setState({ balanceData: result.data.balanceData });
                }
            });
        }
    }

    renderLastMeasures() {
        let table = null,
            rows = [],
            lastWeight = null,
            lastFat = null,
            lastMuscle = null,
            lastVisceral = null;
        const {balanceData} = this.state,
            {classes} = this.props,
            iconUp = <TrendingUpIcon className={classes.icon} color="primary"/>,
            iconDown = <TrendingDownIcon className={classes.icon} color="error"/>,
            iconNeutral = <TrendingFlatIcon className={classes.icon}/>;

        if (balanceData) {
            balanceData.forEach(data => {
                const {createdAt, weight, fat, muscle, visceralFat} = data;

                rows.unshift(
                    <TableRow key={createdAt}>
                        <TableCell component="th" scope="row">
                            {new Date(createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell><div className={classes.cell}>{weight} {lastWeight ? lastWeight === weight ? iconNeutral : (lastWeight < weight ? iconDown : iconUp) : null}</div></TableCell>
                        <TableCell><div className={classes.cell}>{fat} {lastFat ? lastFat === fat ? iconNeutral : (lastFat < fat ? iconDown : iconUp) : null}</div></TableCell>
                        <TableCell><div className={classes.cell}>{muscle} {lastMuscle ? lastMuscle === muscle ? iconNeutral : (lastMuscle < muscle ? iconUp : iconDown) : null}</div></TableCell>
                        <TableCell><div className={classes.cell}>{visceralFat} {lastVisceral ? lastVisceral === visceralFat ? iconNeutral : (lastVisceral < visceralFat ? iconDown : iconUp) : null}</div></TableCell>
                    </TableRow>
                );

                lastWeight = weight;
                lastFat = fat;
                lastMuscle = muscle;
                lastVisceral = visceralFat;
            });

            table = (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Gewicht (kg)</TableCell>
                            <TableCell>Fettanteil (%)</TableCell>
                            <TableCell>Muskelanteil (%)</TableCell>
                            <TableCell>Viszeraler Fettwert</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            );
        }

        return table;
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Übersicht
                </Typography>

                {this.renderLastMeasures()}
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { user: state.application.user };
}

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
