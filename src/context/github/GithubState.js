import React from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_INFO } from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = React.useReducer(GithubReducer, initialState);

  // search users
  const searchUsers = async (text) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // clear users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  // get info
  const getInfo = async (username) => {
    setLoading();

    const user = await axios.get(`https://api.github.com/users/${username}`);
    const repos = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );

    dispatch({
      type: GET_INFO,
      payload: {
        user: user.data,
        repos: repos.data,
      },
    });
  };

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getInfo,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
