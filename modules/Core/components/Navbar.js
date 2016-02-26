import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux';
import {AppBar} from 'material-ui/lib'
import {Tab} from 'material-ui/lib'
import {Tabs} from 'material-ui/lib'

import { Link } from 'react-router';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleTabActive = this.handleTabActive.bind(this);
    }

    handleTabActive(tab) {
        this.props.push(`/${tab.props.value}`);
    }

    render() {
        const {currentPath} = this.props;
        let navbar = (
            <Tabs inkBarStyle={{backgroundColor: '#FFF59D'}}
                className="nav-items"
                valueLink={{
                    value: currentPath,
                    requestChange: ()=> {}
                }}>
                <Tab  label="Login"
                    value="login"
                    className="item"
                    onActive={this.handleTabActive}
                />
                <Tab label="Register"
                    value="register"
                    className="item"
                    onActive={this.handleTabActive}
                />
            </Tabs>
        );
        if (this.props.isUserLogged) {
            navbar = (
                <Tabs inkBarStyle={{backgroundColor: '#FFF59D'}}
                    className="nav-items"
                    valueLink={{
                        value: currentPath,
                        requestChange: ()=> {}
                    }}>
                    <Tab label="Dashboard"
                        value="jobs"
                        className="item"
                        onActive={this.handleTabActive}
                    />
                    <Tab label="Statistics"
                        value="statistics"
                        className="item"
                        onActive={this.handleTabActive}
                    />
                </Tabs>
            );
        }

        const appBarTitle = (
            <Link to={`/`}>Jobs Aggregator</Link>
        );
        return (
            <AppBar showMenuIconButton={false}
                className="app-bar"
                title={appBarTitle}>
                {navbar}
            </AppBar>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
    };
}

export default connect(mapStateToProps, {
    push,
    //sendLogout,
    //loadLoggedUser
})(Navbar);