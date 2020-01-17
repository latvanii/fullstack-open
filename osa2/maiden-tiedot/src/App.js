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
  const [countriesToShow, setCountriesToShow] = useState([])


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
      var array = [...countriesToShow]; // make a separate copy of the array
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
