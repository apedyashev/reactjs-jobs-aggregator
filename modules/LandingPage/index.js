import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {RaisedButton} from 'material-ui/lib'

import JobsList from '../JobsPage/components/JobsList'
import './less/style';

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {jobs} = this.props;
        return (
            <div>
                <div>Landing {jobs.length}</div>
                <JobsList />
            </div>
        );
    }
}


function mapStateToProps(state) {
    const jobs = state.entities.jobs || [];
    return {
        jobs
    };
}

export default connect(mapStateToProps, {

})(LandingPage);
