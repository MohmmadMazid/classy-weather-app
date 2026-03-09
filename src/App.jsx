import React from "react";
import Weather from "./Weather";
import Input from "./Input";
class App extends React.Component {
  state = {
    location: "New Delhi",
    loading: false,
    displayLocation: "",
    weather: {},
  };

  // you does not need to initialize the state inside the constructor method modern js provide the new way to initialize the satate without using the constructor method
  handleInputValue = (e) => {
    this.setState({ location: e.target.value });
  };
  convertToFlag = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  fetchWeather = async () => {
    try {
      this.setState({ loading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`,
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${this.convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
      );
      const weatherData = await weatherRes.json();
      // console.log(weatherData.daily);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          {/* <input type="text" placeholder="search for the location..." value={this.state.location} onChange={(e)=>this.setState({location:e.target.value})} /> */}
          {/* <input type="text" placeholder="search for the location..." value={this.state.location} onChange={this.handleInputValue} /> */}
          <Input
            location={this.state.location}
            setLocation={this.handleInputValue}
          />
        </div>
        <button onClick={this.fetchWeather}>get weather</button>
        {this.state.loading ? <p className="loader">Loading...</p> : ""}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
