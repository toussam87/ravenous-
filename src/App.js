import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './components/util/Yelp';


class App extends Component {
  constructor() {
    super();
    this.state = {
      businesses: []
    };
    this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy){
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({
        businesses: businesses
      })
    });
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchBar={this.state.searchBar} />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
