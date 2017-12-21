import React, { Component } from 'react';
import './Info.css';
import { connect } from 'react-redux';

class Info extends Component {

    render() {
        return (
            <div className="Info__main">
                <a href={process.env.REACT_APP_LOGOUT} className="button">Log Out</a>
                <div>{JSON.stringify(this.props.user, null, 3)}</div>
            </div>
        )
    }
}

function mapStateToProps({ user }) {
    return { user }
}

export default connect(mapStateToProps)(Info);