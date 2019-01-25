import React, { Component } from 'react';
import { connect } from 'react-redux';
import jsCookie from 'js-cookie';
import * as actions from '../actions';
import '../styles/Main.css';

const getParameterByName = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticating: false,
            userDetails: null
        }       

        this.redirectURl = `http://localhost:3000`;
    }

    componentDidMount(){
        const code = getParameterByName('code') || null;
        const token = jsCookie.get('_oath_token');
        if(code && !token){
            this.setState({ isAuthenticating: true });
            this.props.fetchAccessToken(code, this.redirectURl);
        }
    }

    render() {
        const { isAuthenticating } = this.state
        return (
            <div className="default-view">
                <p className="graytext">API URL: {actions.hostURl}</p>
                <a href={`${actions.hostURl}/api/authorize?response_type=code&client_id=${actions.clientID}&redirect_uri=${this.redirectURl}`}>
                    <button>{isAuthenticating ? `Authenticating...` : `Authenticate`}</button>
                </a>
            </div>
        );
    }
}

export default connect(null, actions)(Main);
