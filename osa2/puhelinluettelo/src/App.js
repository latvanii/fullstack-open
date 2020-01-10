import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

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

      <form onSubmit={addPerson}>
        <div>name: <input 
          value={newName} 
          onChange={handleNameChange} 
          />
        </div>
        <div>number: <input 
          value={newNumber} 
          onChange={handleNumberChange} 
        />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <form>
        <div>search: <input
          value={newSearchTerm}
          onChange={handleSearchTermChange}
          />
        </div>
      </form>
      <Persons />
      
    </div>
  )

}

export default App
