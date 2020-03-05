import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

// import SimpleLineChart from '../components/SimpleLineChart';
// import SimpleTable from '../components/SimpleTable';

import API from '../../utils/API';

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
});

class Report extends React.Component {

    state = {
        balanceData: null
    };

    componentDidMount() {
        const {user} = this.props;

        if (user) {
            API.getInstance()._fetch('/users/balancedata', 'GET', null, null, {
                "Authorization": "Bearer " + user.token
            }).then(result => {
                if (result && result.status === "success") {
                    this.setState({ balanceData: result.data.balanceData });
                }
            });
        }
    }

    render() {
        const {classes} = this.props;

        let data = this.state.balanceData;

        if (data) {
            data.forEach((e, i) => {
                data[i].createdAt = new Date(e.createdAt).toLocaleDateString();
            });
        }

        return (
            <React.Fragment>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Statistik
                </Typography>
                <div className={classes.appBarSpacer}/>
                <Typography component="div" className={classes.chartContainer}>
                    <ResponsiveContainer width="99%" height={320}>
                        <ComposedChart data={data}>
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="createdAt"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="weight" name="Gewicht" stroke="#343aec"/>
                            <Line type="monotone" dataKey="visceralFat" name="Viszeraler Fettwert" stroke="#d4b000"/>
                        </ComposedChart>
                    </ResponsiveContainer>
                </Typography>
                <Typography component="div" className={classes.chartContainer}>
                    <ResponsiveContainer width="99%" height={320}>
                        <ComposedChart data={data}>
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="createdAt"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar stackId="stacked" barSize={15} dataKey="fat" name="Fett" stroke="##810000" fill="#b80000"/>
                            <Bar stackId="stacked" dataKey="muscle" name="Muskeln" stroke="#37873b" fill="#4caf50"/>
                        </ComposedChart>
                    </ResponsiveContainer>
                </Typography>
                <Typography component="div" className={classes.chartContainer}>
                    <ResponsiveContainer width="99%" height={320}>
                        <ComposedChart data={data}>
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="createdAt"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar stackId="stacked" barSize={5} dataKey="fat" name="Fett" stroke="##810000" fill="#b80000"/>
                            <Bar stackId="stacked" dataKey="muscle" name="Muskeln" stroke="#37873b" fill="#4caf50"/>
                            <Line type="monotone" dataKey="weight" name="Gewicht" stroke="#A1A1A1" />
                            <Line type="monotone" dataKey="visceralFat" name="Viszeraler Fettwert" stroke="#d4b000"/>
                        </ComposedChart>
                    </ResponsiveContainer>
                </Typography>
                {/*<div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Orders
                </Typography>
                <Typography component="div" className={classes.chartContainer}>
                    <SimpleLineChart />
                </Typography>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h4" gutterBottom component="h2">
                    Products
                </Typography>
                <div className={classes.tableContainer}>
                    <SimpleTable/>
                </div>*/}
            </React.Fragment>
        );
    }
}

Report.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { user: state.application.user };
}

export default withStyles(styles)(connect(mapStateToProps)(Report));
