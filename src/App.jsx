import React from "react";
import Weather from "./Weather";
import Input from "./Input";
class App extends React.Component {
  state = {
    location: "",
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
    if (this.state.location.length <= 3) return this.setState({ weather: "" }); // because of this line component will unmount function will runn when the length of the location will be less then then the 3 or equal to three
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

  // this is the component did mount method for the class based coponents it will executed at the time when the component will
  //  inialy painted by the browser or we can say the it will run when we open the application in browser

  // this function will works like useEffect ,like when we pass useEffect dipendency array empty that mean that useEffect will
  // run only the initial render then it will not run again
  // this function also will run same
  // useEffecct - []
  componentDidMount() {
    // now we do not need to fetch the data at the initial render because we are not passing any value initialy
    // this.fetchWeather();
    this.setState({
      location: JSON.parse(localStorage.getItem("location")) || "",
    });
  }

  // this function will  similar to the useEffect when we pass the dependency arry sum satate then whenever the state or dependency array will change
  // that mean useEffect will run again
  // this function will work similar whenever the previous satate will change then componnetDidUpdate function will run
  // useEffecct - [prevprops ,prevstate]

  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
      localStorage.setItem("location", JSON.stringify(this.state.location));
    }
  }
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
        {/* <button onClick={this.fetchWeather}>get weather</button> */}
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
