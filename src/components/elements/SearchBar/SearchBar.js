import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

class SearchBar extends Component {
  state = {
    value: ''
  }
  // Every time after inserting input we should rest timeout
  timeout = null;

  doSearch = (event) => {
    const { callback } = this.props;

    this.setState({ value: event.target.value })
    clearTimeout(this.timeout);
    // Set a timeout to wait for the user to stop writing
    this.timeout = setTimeout(() => {
      callback(this.state.value);
    }, 500);
  }

  render() {
    const { value } = this.state;

    return (
      <div className="tvm-searchbar">
        <div className="tvm-searchbar-content">
          <FontAwesome className="tvm-fa-search" name="search" size="2x" />
          <input
            type="text"
            className="tvm-searchbar-input"
            placeholder="Search"
            onChange={this.doSearch}
            value={value}
          />
        </div>
      </div>
    )
  }
}


export default SearchBar;