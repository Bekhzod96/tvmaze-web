import React, { Component } from 'react';
import './Show.css';

class Show extends Component {
  state = {
    show: null,
    title: '',
    loading: true,
    description: '',
    image: null,
    genres: null,
    originalLink: '',
    rating: '',
    episodes: ''

  }

  // Component will be mounted on when it loads
  componentDidMount() {
    const { showId } = this.props.match.params;
    let showEndpoint = `http://api.tvmaze.com/shows/${showId}`;
    let episodesEndpoint = `http://api.tvmaze.com/shows/${showId}/episodes`;
    this.fetchItems(showEndpoint);
    this.fetchEpisodes(episodesEndpoint);

  }

  fetchItems = async showEndpoint => {

    try {
      const result = await (await fetch(showEndpoint)).json();
      const cleanText = result.summary.replace(/<\/?[^>]+(>|$)/g, "");

      this.setState({
        loading: false,
        show: result,
        description: cleanText,
        image: result.image,
        title: result.name,
        genres: result.genres,
        originalLink: result.officialSite,
        rating: result.rating.average,

      })
    } catch (error) {
      console.log("Shows API error: ", error);
    }
  }

  fetchEpisodes = async episodesEndpoint => {

    try {
      const resultEpi = await (await fetch(episodesEndpoint)).json();
      this.setState({
        episodes: resultEpi
      })
    } catch (error) {
      console.log("Episode API error : ", error);
    }
  }

  render() {
    const { show, description, image, title, genres, originalLink, rating, episodes } = this.state;

    return (
      <div >
        {show ?
          < div >
            <div className="showInfo"
              style={{
                background: image ? `linear-gradient(to bottom, rgba(0,0,0,0)
                39%,rgba(0,0,0,0)
                41%,rgba(0,0,0,0.65)
                100%),
                url('${image.original}'), #1c1c1c` : '#000'
              }}
            >

              <div className="showInfo-content">
                <div className="showInfo-image">
                  <img src={image ? image.medium : './images/no_image.jpg'} alt="ShowThumb" />
                  <a href={originalLink}><div className="show-watch-btn">Watch</div></a>
                  <div className="episode-number"><p>Number of Episode</p><h1>#{episodes.length}</h1></div>
                </div>

                <div className="showInfo-text">
                  <div className="show-rating">
                    <h1>{title}</h1>
                    <h1>{rating}</h1></div>

                  <p className=' show-genres' >{genres[0]} {genres[1]} {genres[2]}</p>
                  <p>{description}</p>

                </div>
              </div>
            </div >
          </div>
          : <h1>No movie found</h1>
        }
      </div>
    )
  }
}

export default Show;