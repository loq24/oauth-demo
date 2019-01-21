import { AUTH_USER, UNAUTH_USER, CURRENT_USER } from '../actions';

export default function(state = {}, action){
    switch(action.type){
        case AUTH_USER:
            return {...state, signInError: '', authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false, loggedInUser: '' ,};    
        case CURRENT_USER:
            return {...state, loggedInUser: action.payload};
        default:
            return state;
    }
}