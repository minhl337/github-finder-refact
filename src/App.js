import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';

import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';

const App = (props) => {
  const [state, setState] = React.useState({
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  });

  const setAlert = (message, type) => {
    setState({
      ...state,
      alert: {
        message,
        type,
      },
    });
    setTimeout(
      () =>
        setState({
          ...state,
          alert: null,
        }),
      5000
    );
  };

  return (
    <GithubState>
      <Router>
        <>
          <Navbar />
          <div className='container'>
            <Alert alert={state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <>
                    <Search setAlert={setAlert} />
                    <Users />
                  </>
                )}
              />

              <Route exact path={'/about'} component={About} />
              <Route
                exact
                path={'/user/:login'}
                render={(props) => <User {...props} />}
              />
            </Switch>
          </div>
        </>
      </Router>
    </GithubState>
  );
};

export default App;
