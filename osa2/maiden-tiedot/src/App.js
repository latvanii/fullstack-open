import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

  const CountryRow = (props) => {
    return(
    <div> {props.name}</div>
    )
  }

  const CountryAllData = ({country}) => {
      return (
      <div>
          <h2>{country.name}</h2>
          <div>capital: {country.capital}</div>
          <div>population: {country.population}</div>
          <h3>languages</h3>
          <div>{country.languages.map(lang => <div>{lang.name}</div>)}</div>
          <img 
              src={country.flag}
              width='200'
          />

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
            filtered_countries.map(country =>
            <CountryRow 
                key={country.numericCode}
                name={country.name}
            />
            )
        )
    }
    if(filtered_countries.length === 1){
        return(
            filtered_countries.map(country =>
            <CountryAllData 
                key={country.numericCode}
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
      <ShowCountries />
      
    </div>
  )

}

export default App
