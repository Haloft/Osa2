import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country }) => {
    const [weather, setWeather] = useState([])
   
    

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=cb2afde3045d5627fc2a5948321c8538&query= ${country.capital}`)
            .then(response => {
                setWeather(response.data.current);
                
            })
    }, [])

    return (
        <div>
            <h2>{country.name}</h2>
            <p> capital {country.capital}</p>
            <p> population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map(langu => <li key={langu.name}>{langu.name}</li>)}
            </ul>
            <img src={country.flag} width="100" alt="flag" />
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {weather.temperature} Celsius </p>
            <img src={weather.weather_icons} alt="icon" />
            <p>Wind: {weather.wind_speed} kph direction {weather.wind_dir} </p>
        </div>



    )



}







export default Country
