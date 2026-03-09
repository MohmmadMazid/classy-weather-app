
import React from "react";
import Weather from "./Weather";
// function getWeatherIcon(wmoCode) {
//   const icons = new Map([
//     [[0], "☀️"],
//     [[1], "🌤"],
//     [[2], "⛅️"],
//     [[3], "☁️"],
//     [[45, 48], "🌫"],
//     [[51, 56, 61, 66, 80], "🌦"],
//     [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
//     [[71, 73, 75, 77, 85, 86], "🌨"],
//     [[95], "🌩"],
//     [[96, 99], "⛈"],
//   ]);
//   const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
//   if (!arr) return "NOT FOUND";
//   return icons.get(arr);
// }

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { location: "New Delhi",loading:false ,displayLocation:"",weather:{}}
        // normal or reqular function should be bind here
        this.fetchWeather = this.fetchWeather.bind(this)
        this.convertToFlag = this.convertToFlag.bind(this)
    }


    handleInputValue = (e) => {
        this.setState({ location: e.target.value })
    }

    convertToFlag(countryCode) {
        const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }

    async fetchWeather() {
        try {
            this.setState({loading:true})
            // 1) Getting location (geocoding)
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
            );
            const geoData = await geoRes.json();
            console.log(geoData);

            if (!geoData.results) throw new Error("Location not found");

            const { latitude, longitude, timezone, name, country_code } =
                geoData.results.at(0);
                this.setState({displayLocation:`${name} ${this.convertToFlag(country_code)}`})

            // 2) Getting actual weather
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
            );
            const weatherData = await weatherRes.json();
            // console.log(weatherData.daily);
            this.setState({weather:weatherData.daily})
        } catch (err) {
            console.err(err);
        }finally{
            this.setState({loading:false})
        }
    }


    render() {

        return (

            <div className="app">
                <h1>Classy Weather</h1>
                <div>
                    {/* <input type="text" placeholder="search for the location..." value={this.state.location} onChange={(e)=>this.setState({location:e.target.value})} /> */}
                    <input type="text" placeholder="search for the location..." value={this.state.location} onChange={this.handleInputValue} />
                </div>
                <button onClick={this.fetchWeather}>get weather</button>
                {this.state.loading?<p className="loader">Loading...</p>:""}
                {this.state.weather.weathercode && <Weather weather={this.state.weather} location={this.state.displayLocation} />   }

            </div>
        )
    }
}

export default App;