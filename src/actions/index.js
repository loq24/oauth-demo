import axios from  'axios';
import jsCookie from 'js-cookie';

const clientID = `118444589`;
const clientSecret = `9776B508F2F5B5E8662DE1EDEE4943D3AE1F7F5227DFCCBB16F96B1F3BF25335`;
const hostURl = `https://api.lougiequisel.com`;

const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const CURRENT_USER = 'CURRENT_USER';

const authenticationTokenHeader = () =>{
    const base64encodedClientIDSecret = `QUlJVHRKUWRPMmtkYjEwYW1nWFhBRkRwR0dVdVVFNnZtT3BReGczbQ==:aW96dHF6RU5RQktxZ29RWDRLclpveHZMbFZDU2JGZXQ0T1h2bkJpZQ==`;
    return { headers: { Authorization: `Bearer ${base64encodedClientIDSecret}`} };
}

const requestTokenHeader = () =>{
    return { headers: { Authorization: `Bearer ${jsCookie.set('_oath_token')}`} };   
}

export function fetchAccessToken(code, redirectURl){
    return dispatch => {
        axios.post(`${hostURl}/api/access_token`, {grant_type: `authorization_code`, code: code, client_id: clientID, client_secret: clientSecret, redirect_uri: redirectURl}, authenticationTokenHeader())
        .then(response => {
            jsCookie.set('_oath_token', response.data.access_token, { expires: 1 });
            dispatch(fetchUserDetails());
        })
        .catch(error => console.log('Error details', error));
    }
}

export function fetchUserDetails(){
    return dispatch => {
        axios.get(`${hostURl}/api/me`, requestTokenHeader())
            .then(response => {
                console.log('Me', response);
                dispatch({ type: AUTH_USER });
                dispatch({
                    type: CURRENT_USER,
                    payload: response.data
                });
            })
            .catch(error => logoutUser());
    }
}

export function logoutUser(){
    jsCookie.remove('_oath_token');
    return { type: UNAUTH_USER};
}

export { clientID, clientSecret, hostURl, AUTH_USER, UNAUTH_USER, CURRENT_USER };