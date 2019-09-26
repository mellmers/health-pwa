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

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
});

class Dashboard extends React.Component {

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

    renderLastMeasures() {
        let table = null;
        const {balanceData} = this.state;

        if (balanceData) {
            table = (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell align="right">Gewicht (kg)</TableCell>
                            <TableCell align="right">Fettanteil (%)</TableCell>
                            <TableCell align="right">Muskelanteil (%)</TableCell>
                            <TableCell align="right">Viszeraler Fettwert</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {balanceData.map(data => (
                            <TableRow key={data.createdAt}>
                                <TableCell component="th" scope="row">
                                    {new Date(data.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell align="right">{data.weight}</TableCell>
                                <TableCell align="right">{data.fat}</TableCell>
                                <TableCell align="right">{data.muscle}</TableCell>
                                <TableCell align="right">{data.visceralFat}</TableCell>
                            </TableRow>
                        ))}
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
