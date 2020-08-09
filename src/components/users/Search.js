import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.text) {
      this.props.searchUsers(this.state.text);
    } else {
      this.props.setAlert('Search field cannot be blank', 'light');
    }
  };

  clearUsers = () => {
    this.setState({
      text: '',
    });
    this.props.clearUsers();
  };

  render() {
    const { showClear } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {showClear && (
          <button className='btn btn-light btn-block' onClick={this.clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

// const Search = () => {
//   const [state, setState] = React.useState({
//     text: '',
//   });

//   const handleChange = (e) => {
//     setState({
//       ...state,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <form className='form'>
//         <input
//           type='text'
//           name='text'
//           placeholder='Search Users...'
//           value={state.text}
//           onChange={handleChange}
//         />
//         <input
//           type='submit'
//           value='Search'
//           className='btn btn-dark btn-block'
//         />
//       </form>
//     </div>
//   );
// };

export default Search;
