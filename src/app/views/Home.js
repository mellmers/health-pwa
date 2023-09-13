import React from 'react';
import { renderRoutes } from "react-router-config";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';

import {login, snackbar} from "../../redux/actions/ApplicationActions";

import API from '../../utils/API';
import {themeDark, themeLight} from "../../utils/theme";

import Sidebar from '../components/Sidebar';
import MySnackbar from '../components/MySnackbar';
import Anmelden from "./Anmelden";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    rootNoLogin: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    circularProgress: {
        color: '#127d00'
    },
    loading: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#ddd url(https://source.unsplash.com/random/1920x1080)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        [theme.breakpoints.down('xs')]: {
            backgroundImage: 'url(https://source.unsplash.com/random/600x800)',
        },
        [theme.breakpoints.down('md')]: {
            backgroundImage: 'url(https://source.unsplash.com/random/1280x720)',
        },
        [theme.breakpoints.up('xl')]: {
            backgroundImage: 'url(https://source.unsplash.com/random/4096x2160)',
        },
    },
    loadingTitle: {
        color: '#fff',
        textShadow: '2px 1px 5px #000',
        marginBottom: 25
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    },
});

class Home extends React.Component {
    state = {
        isDarkTheme: true,
        loading: true,
        drawerOpen: false
    };

    componentDidMount() {
        API.createInstance(this.props.dispatch);

        if (this.props.location && this.props.location.pathname === "/") {
            this.props.history.push("/daten");
        }

        let open = localStorage.getItem('drawerOpen');
        if (open !== null) {
            open = open === 'true';
        } else if (window.outerWidth >= 600) {
            open = true;
        } else {
            open = false;
        }

        this.setState({
            isDarkTheme: localStorage.getItem('isDarkTheme') !== 'false',
            loading: false,
            drawerOpen: open
        });

        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.props.dispatch(login(user));
        }
    }

    handleDrawerOpen = () => {
        localStorage.setItem('drawerOpen', 'true');
        this.setState({drawerOpen: true});
    };

    handleDrawerClose = () => {
        localStorage.setItem('drawerOpen', 'false');
        this.setState({drawerOpen: false});
    };

    handleSnackbarClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.props.dispatch(snackbar({open: false}));
    }

    handleChangeTheme = isDarkTheme => {
        this.setState({isDarkTheme: isDarkTheme});
        localStorage.setItem('isDarkTheme', isDarkTheme);
    };

    render() {
        const {classes, user, snackbar} = this.props;
        const {isDarkTheme, loading, drawerOpen} = this.state;
        return (
            <MuiThemeProvider theme={isDarkTheme ? themeDark : themeLight}>
                <CssBaseline/>
                <div className={classNames(classes.root, !user && classes.rootNoLogin)}>
                    {
                        loading ?
                            <div className={classes.loading}>
                                <Typography
                                    component="h1"
                                    variant="h3"
                                    color="inherit"
                                    noWrap
                                    className={classes.loadingTitle}
                                >
                                    Health App
                                </Typography>
                                <CircularProgress className={classes.circularProgress} />
                            </div>
                            : ( user ?
                            <React.Fragment>
                                <AppBar
                                    position="absolute"
                                    className={classNames(classes.appBar, drawerOpen && classes.appBarShift)}
                                >
                                    <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
                                        <IconButton
                                            color="inherit"
                                            aria-label="Menü"
                                            onClick={this.handleDrawerOpen}
                                            className={classNames(
                                                classes.menuButton,
                                                drawerOpen && classes.menuButtonHidden,
                                            )}
                                        >
                                            <MenuIcon/>
                                        </IconButton>
                                        <Typography
                                            component="h1"
                                            variant="h6"
                                            color="inherit"
                                            noWrap
                                            className={classes.title}
                                        >
                                            Health App
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Drawer
                                    variant="permanent"
                                    classes={{
                                        paper: classNames(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
                                    }}
                                    open={drawerOpen}
                                >
                                    <div className={classes.toolbarIcon}>
                                        <Typography variant="h6">
                                            Menü
                                        </Typography>
                                        <IconButton onClick={this.handleDrawerClose}>
                                            <ChevronLeftIcon/>
                                        </IconButton>
                                    </div>
                                    <Divider/>
                                    <Sidebar onChangeTheme={this.handleChangeTheme.bind(this)} isDarkTheme={isDarkTheme} open={drawerOpen} />
                                </Drawer>
                                <main className={classes.content}>
                                    {renderRoutes(this.props.route.routes)}
                                </main>
                            </React.Fragment> : <Anmelden/> )
                    }

                    <MySnackbar
                        autoHideDuration={snackbar.autoHideDuration}
                        message={snackbar.message}
                        onClose={this.handleSnackbarClose.bind(this)}
                        open={snackbar.open}
                        variant={snackbar.variant}
                        includeCloseBtn={snackbar.closeBtn}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        user: state.application.user,
        snackbar: state.application.snackbar
    };
}
export default withStyles(styles)(connect(mapStateToProps)(Home));
