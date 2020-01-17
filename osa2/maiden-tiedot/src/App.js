import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { weather_api_key } from './secrets.json'; // Relative path to your File

const SearchForm = ({ handleSearchTermChange }) => {
  return (
    <form>
    <div>searching: <input
      onChange={handleSearchTermChange}
      />
    </div>
  </form>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weather, setWeather] = useState([])


  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])


  const [ newSearchTerm, setSearchTerm ] = useState('')
  
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addToCountriesToShow = (name) => {
    if(countriesToShow.includes(name)){
      var array = [...countriesToShow]; 
      var index = array.indexOf(name)
      if (index !== -1) {
        array.splice(index, 1);
        setCountriesToShow(array);
      }
    
    }
    else{
      setCountriesToShow(countriesToShow.concat(name))
    }
  }

  const ShowButton = (props) => {
    const name = props.name
    return(
      <button onClick={() => addToCountriesToShow(name)}>
        {countriesToShow.includes(name) ? 'hide' : 'show'}
      </button>
    )
  }


  const CountryRow = ({country}) => {
    return(
    <div> 
      {country.name} <ShowButton name={country.name}/>
      {countriesToShow.includes(country.name) &&
        <CountryAllData country={country} />
      }
    </div>
    )
  }

  const ShowLanguages = ({country}) => {
  const languages = country.languages.map((lang, index) => <li key={index}> {lang.name}</li>)
    return(
      <div>
        <h3>languages</h3>
        {languages}
      </div>
    )
  }

  const CountryAllData = ({country}) => {
      return (
      <div>
          <h2>{country.name}</h2>
          <div>capital: {country.capital}</div>
          <div>population: {country.population}</div>
          <ShowLanguages country={country}/>
          <img 
              src={country.flag}
              width='200'
              alt='flag'
          />
          <ShowWeather name = {country.capital}/>

      </div>
      )
  }



  const addWeather = (city) => {
    const existing_cities = weather.map(w => w.city)

    if (existing_cities.includes(city)){
      console.log(`${city} is already fetched`)
      return
    }
    axios
      .get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${city}`)
      .then(response => {
        const new_weather = {
          city: city,
          current_weather: response.data.current
        }
      setWeather(weather.concat(new_weather))
      console.log(`got weather for ${city}`)
    })
  }

  const getCurrentWeather = (city) => {
    const cityWeather = weather.filter(w => w.city ===city)
    console.log(cityWeather)
    return cityWeather
  }

  const ShowWeather = ({name}) => {
    addWeather(name)
    const currentWeather = getCurrentWeather(name)
    if (currentWeather.length !==1){
      return(
        <div></div>
      )
    }
    const localWeather = currentWeather[0].current_weather
    return (
    <div>
      Current temperature in {name}: {localWeather.temperature} °C
    </div>
    )

  }

  const ShowCountries = () => {
    const filtered_countries = countries.filter(country => country.name.toLowerCase().includes(newSearchTerm.toLowerCase()))
    if(filtered_countries.length > 10){
        return (
        <div>Write more!</div>
        )
    }

    if(filtered_countries.length > 1){
        return(
            filtered_countries.map((country, index) =>
            <CountryRow 
                key={index}
                country={country}
            />
            )
        )
    }

    if(filtered_countries.length === 1){
        return(
            filtered_countries.map((country, index) =>
            <CountryAllData 
                key={index}
                country={country}
            />
            )
        )
    }

    return (<div>No countries found</div>)
  }

  return (
    <div>
      <h2>Countries</h2>
      <SearchForm handleSearchTermChange={handleSearchTermChange}/>
      <ShowCountries/>      
    </div>
  )

}

export default App
