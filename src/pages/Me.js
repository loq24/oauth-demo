import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Me extends Component{
    renderUserData(user){
        return(
            <div>
                <p>User Details:</p>
                <div className="codeblock">
                    {JSON.stringify(user, null, 4)}
                </div>
            </div>
        );
    }

    render(){
        const { loggedInUser } = this.props;
        return(
            <div className="authenticated-view">
                <p>You are successfully authenticated!</p>
                <div className="user-details">
                    { !loggedInUser && <p style={{color: 'orange'}}>Fetching user data...</p> }
                    { loggedInUser && this.renderUserData(loggedInUser)}
                </div>
                <button onClick={()=> this.props.logoutUser()}>Log Out</button>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        loggedInUser: state.auth.loggedInUser
    };
}

export default connect(mapStateToProps, actions)(Me);