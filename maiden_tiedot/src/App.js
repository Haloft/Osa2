import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import Countries from './components/Countries'
import Find from './components/Find'
import axios from 'axios'



const App = () => {
  const [countries, setCountries] = useState([])
  const [finder, setFinder] = useState('')




  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')

      .then(response => {
        setCountries(response.data);

      })
  }, [])


  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(finder.toLowerCase()))



  const rows = () => {
    if (countriesToShow.length === 1) {
      return (
        <div>
          {countriesToShow.map(country => <Country key={country.alpha2Code} country={country} />)}
        </div>)
    } else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
      return (
        <div>
          {countriesToShow.map(country => <Countries key={country.alpha2Code} country={country.name} handleClick={handleClick}
          />)}
        </div>
      )
    } else {
      return (
        <div>
          Too many matches, specify another filter.
           </div>
      )
    }

  }

  const handleCountry = (event) => {
    setFinder(event.target.value);
    console.log(event.target.value)

  }

  const handleClick = (event) => {
    setFinder(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>

      <Find
        handleCountry={handleCountry}
        finder={finder}

      />

      {rows()}

    </div>
  );

}

export default App