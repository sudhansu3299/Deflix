import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import './Home.css';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
      autoplay: 1,
  }
}

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      videos: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://dether.herokuapp.com/videos');
      const data = await response.json();
      this.setState({ videos: [...data] });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App-header">
        <Header />
        <Nav />

        <div className="container">
          <div className="row">
            <span className="second">New Movies</span>
            <div className = "row__posters">
              {this.state.videos.map(video =>
                <div className="col-md-4" key={video.id}>
                <Link to={`/player/${video.id}`}>
                  <div className="card border-0">
                    <video
                      crossOrigin = 'anonymous'
                      allow="autoplay"
                      loop
                      poster={`https://dether.herokuapp.com/video/${video.id}/poster`}
                      // muted="muted"
                      onMouseOver={event => event.target.play()}
                      onMouseOut={event => event.target.load()}
                      src={`https://dether.herokuapp.com/trailer/${video.id}`}  >
                    </video>
                    <div className="card-body">
                      <p>{video.name}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
              </div>
              )}
            </div>

          <div className="row">
            <span className="second">New Songs</span>
            <div className = "row__posters">
              {this.state.videos.map(video =>
                <div className="songs" key={video.id}>
                <Link to={`/player/${video.id}`}>
                  <div className="card border-0">
                    <img 
                      src={`https://cdn.wallpapersafari.com/99/34/Tg0CIa.jpg`} 
                      alt={video.name} 
                      // onMouseOver = {() => onMouseOver(video)}
                      className = {"row__poster"}
                    />
                    <div className="card-body">
                      <p>{video.name}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
                {/* {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts}/> } */}
              </div>
              )}
              </div>
            </div>
          </div>

          <div className="row">
            <span className="second">Gameplay</span>
            <div className = "row__posters">
              {this.state.videos.map(video =>
                <div className="col-md-4" key={video.id}>
                <Link to={`/player/${video.id}`}>
                  <div className="card border-0">
                    <img 
                      src={`https://cdn.wallpapersafari.com/99/34/Tg0CIa.jpg`} 
                      alt={video.name} 
                      // onMouseOver = {() => onMouseOver(video)}
                      className = {"row__posterLarge"}
                    />
                    <div className="card-body">
                      <p>{video.name}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
                {/* {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts}/> } */}
              </div>
              )}
            </div>
            </div>
        </div>
        <Footer />
      </div>
    )
  }
}
