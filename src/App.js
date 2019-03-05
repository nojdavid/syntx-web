import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import Forecast from './components/forecast';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: {
        value: ''
      },
      forecast: {}
    };
  }

  handleChange = (event) => {
    this.setState({
      input: {
        value: event.target.value
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { input } = this.state;
    this.getForecast(input.value);
  };

  getForecast = async (location) => {
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:5000' + `?location=${location}`,
      headers: {
        'Authorization': 'Bearer 123',
        'Content-Type': 'application/json;charset=UTF-8',
      }
    });

    this.setState({
      forecast: result.data
    })
  };

  render() {
    const { input, forecast } = this.state;
    const { consolidated_weather, title } = forecast || {};

    return (
      <div className="app">
        <header className="app-header">
          Syntx Forecast App
        </header>
        <div className='content'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Input city name or zip code:
              <input type="text" value={input.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <div className='title'>{title}</div>
          <div className='forecasts'>
            {
              consolidated_weather == null ? (
                <div>Enter a valid city or zip code</div>
              ) :  (
                consolidated_weather.map((weather, index) => (
                  <Forecast key={index} weather={weather}/>
                ))
               )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
