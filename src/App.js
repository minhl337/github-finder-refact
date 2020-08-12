import React from 'react';
import './App.css';
import axios from 'axios';
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

  // async componentDidMount() {
  //   // axios
  //   //   .get('https://api.github.com/users')
  //   //   .then((res) => console.log(res.data));

  //   this.setState({
  //     loading: true,
  //   });
  //   const res = await axios.get(
  //     `https://api.github.com/users?clinet_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );

  //   this.setState({
  //     users: res.data,
  //     loading: false,
  //   });
  // }
  // Search Github Users

  const getInfo = async (username) => {
    setState({
      ...state,
      loading: true,
    });
    const user = await axios.get(`https://api.github.com/users/${username}`);
    const repos = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    setState({
      ...state,
      user: user.data,
      loading: false,
      repos: repos.data,
    });
  };

  // const getRepos = async (username) => {
  //   const res = await axios.get(
  //     `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
  //   );
  //   setState({
  //     ...state,
  //     repos: res.data,
  //     loading: false,
  //   });
  // };

  const clearUsers = () => {
    setState({
      ...state,
      users: [],
      loading: false,
    });
  };

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
                    <Search
                      clearUsers={clearUsers}
                      showClear={state.users.length > 0 ? true : false}
                      setAlert={setAlert}
                    />
                    <Users loading={state.loading} users={state.users} />
                  </>
                )}
              />

              <Route exact path={'/about'} component={About} />
              <Route
                exact
                path={'/user/:login'}
                render={(props) => (
                  <User
                    {...props}
                    getInfo={getInfo}
                    user={state.user}
                    loading={state.loading}
                    // getRepos={getRepos}
                    repos={state.repos}
                  />
                )}
              />
            </Switch>
          </div>
        </>
      </Router>
    </GithubState>
  );
};

export default App;
