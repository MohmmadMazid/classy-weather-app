
import React from "react";
import Dates from "./Date";


class Weather extends React.Component{


    render(){
        const   {temperature_2m_max:max,temperature_2m_min:min,time:dates,weathercode:codes}=this.props.weather;
        return(
            <div>
                <h2>Weather {this.props.location}</h2>
                <ul className="weather">
                    {dates.map((date,i)=>{
                        return <Dates date={date} max={max.at(i)} min={min.at(i)} codes={codes.at(i)} isToday={i===0} key={date}/>
                    })}
                </ul>
            </div>
        )
    }
}

export default Weather;