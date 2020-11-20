import React, { Component } from 'react';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  state = {
    shows: [],
    loading: true,
    searchTerm: '',
    currentPage: 0
  }

  componentDidMount() {
    const endpoint = `https://api.tvmaze.com/shows?page=0`;
    this.fetchItems(endpoint);
  }

  searchItems = (searchTerm) => {

    const { currentPage } = this.state;
    let endpoint = '';

    //Set state before starting search 
    this.setState({
      shows: [],
      loading: false,
      searchTerm
    })

    // Checks if user input box if there is something it will search for it otherwise it shows current page
    if (searchTerm === "") {
      endpoint = `https://api.tvmaze.com/shows?page=${currentPage}`;
    } else {
      endpoint = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  }

  //This method will be triggered when we click to load more button
  loadMoreItems = () => {
    const { currentPage } = this.state;
    let endpoint = '';
    this.setState({ loading: true })
    endpoint = `http://api.tvmaze.com/shows?page=${currentPage + 1}`;
    this.fetchItems(endpoint);
  }

  fetchItems = async endpoint => {
    const { shows, searchTerm } = this.state;

    try {
      //Fetch data form API 
      let result = await (await fetch(endpoint)).json();

      //Shows and search returns different object it will check and converts it the same format
      if (searchTerm) {
        const unNestedResult = [];
        result.map((element, i) => (
          unNestedResult[i] = element.show
        ))
        result = unNestedResult;
      }

      // Set the result to shows state by parsing it
      this.setState({
        shows: [...shows, ...result],
      })
    } catch (error) {
      console.log("API errors ", error);
    }
  }



  render() {
    const { shows, loading, searchTerm } = this.state;
    return (
      <div>
        <SearchBar callback={this.searchItems} />
        <div className="home-grid">
          <FourColGrid
            header={searchTerm ? 'Search Result' : 'Popular Movies'}
            loading
            shows
          >
            {shows.map((element, i) => (
              <div className="ShowThumb">
                {
                  <Link to={{ pathname: `/${element.id}` }}>
                    <img className="clickable" src={element.image ? element.image.medium : './images/no_image.jpg'} alt="ShowThumb" />
                  </Link>
                }
              </div>
            ))}
          </FourColGrid>
          {loading ?
            <div className="loadMoreBtn" onClick={this.loadMoreItems}>
              <p>Load More</p>
            </div> : null}
        </div>
      </div>
    )
  }
}

export default Home;
