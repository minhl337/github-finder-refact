import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'HAAAAA',
    };
  }

  static defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github',
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  handleClick() {
    this.setState({
      title: 'beans',
    });
  }
  render() {
    return (
      <div>
        <nav className='navbar bg-primary'>
          <h1>
            <i className={this.props.icon}></i> {this.state.title}
          </h1>
          <button onClick={() => this.handleClick()}>BEANS</button>
        </nav>
      </div>
    );
  }
}

export default Navbar;
