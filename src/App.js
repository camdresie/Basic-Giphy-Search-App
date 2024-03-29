import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import apiKey from '../config';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    }
  } 

  componentDidMount() {
    this.performSearch();
  }

  // componentDidMount() {
  //   fetch('http://api.giphy.com/v1/gifs/trending?api_key=')
  //     .then( response => response.json())
  //     .then( responseData => {
  //       this.setState({ gifs: responseData.data });
  //     })
  //     .catch(error => {
  //       console.log('Error fetching and parsing data', error)
  //     });
  // }

  performSearch = (query = 'funny dogs') => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=${apiKey}`)
      .then(response => {
        this.setState({
          gifs: response.data.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() { 
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
