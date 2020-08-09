import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';

import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  };

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
  searchUsers = async (text) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );

    this.setState({
      users: res.data.items,
      loading: false,
      alert: null,
    });
  };

  getUser = async (username) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(`https://api.github.com/users/${username}`);
    this.setState({
      user: res.data,
      loading: false,
    });
  };

  getRepos = async (username) => {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    this.setState({
      repos: res.data,
      loading: false,
    });
  };

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
    });
  };

  setAlert = (message, type) => {
    this.setState({
      alert: {
        message,
        type,
      },
    });
    setTimeout(
      () =>
        this.setState({
          alert: null,
        }),
      5000
    );
  };

  render() {
    const { users, loading, user, repos } = this.state;
    return (
      <Router>
        <>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
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
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getRepos={this.getRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </>
      </Router>
    );
  }
}

export default App;
