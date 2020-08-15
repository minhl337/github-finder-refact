import React from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = React.useContext(GithubContext);
  const alertContext = React.useContext(AlertContext);

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
      alertContext.removeAlert();
    } else {
      alertContext.setAlert('Search field cannot be blank', 'light');
    }
  };

  const clear = () => {
    githubContext.clearUsers();
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
      {githubContext.users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
