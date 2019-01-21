import React from 'react';
import ReactDOM from 'react-dom';

import jsCookie from 'js-cookie';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import { fetchUserDetails, AUTH_USER } from './actions';
import reducers from './reducers';
import RequireAuth from './components/auth/require_auth';
import UnRequireAuth from './components/auth/unrequire_auth';

import './styles/';
import Main from './pages/Main';
import Me from './pages/Me';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = jsCookie.get('_oath_token');
if(token){
    store.dispatch({ type: AUTH_USER });
    store.dispatch(fetchUserDetails());
}

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
            <Switch>
                <Route path="/" exact component={UnRequireAuth(Main)} />
                <Route path="/me" exact component={RequireAuth(Me)} />
            </Switch>
        
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
