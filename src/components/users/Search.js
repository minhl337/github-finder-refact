import React from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ setAlert, clearUsers, showClear }) => {
  const githubContext = React.useContext(GithubContext);

  const [state, setState] = React.useState({
    text: '',
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (state.text) {
      githubContext.searchUsers(state.text);
    } else {
      setAlert('Search field cannot be blank', 'light');
    }
  };

  const clear = () => {
    clearUsers();
    setState({ text: '' });
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={state.text}
          onChange={handleChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clear}>
          Clear
        </button>
      )}
    </div>
  );
};
Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
