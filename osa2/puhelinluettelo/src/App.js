import React, { useState, useEffect } from 'react'
import axios from 'axios'


const NewPersonForm = ({handleNameChange, handleNumberChange, addPerson}) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input 
        onChange={handleNameChange} 
        />
      </div>
      <div>number: <input 
        onChange={handleNumberChange} 
      />
      </div>
      <button type="submit">add</button>
    </form>

  )
}

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

  const [persons, setPersons] = useState([])


  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])


  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearchTerm, setSearchTerm ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const PersonRow = (props) => {
    return(
    <div> {props.name}: {props.number}</div>
    )
  }

  const Persons = () => {
    const filtered_persons = persons.filter(person => person.name.toLowerCase().includes(newSearchTerm.toLowerCase()))
    return(
      filtered_persons.map(person =>
        <PersonRow 
            key={person.name}
            name={person.name}
            number={person.number}
        />
    )
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <SearchForm handleSearchTermChange={handleSearchTermChange}/>
      <Persons />
      
    </div>
  )

}

export default App
