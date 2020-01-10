import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' , id: 1}
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const PersonRow = (props) => {
    return(
    <div> name: {props.name}</div>
    )
  }

  const persons_to_show = () => persons.map(person =>
        <PersonRow 
            key={person.name}
            name={person.name}
        />
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
      name: <input 
          value={newName} 
          onChange={handleNameChange} 
          />
        
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons_to_show()}
      
    </div>
  )

}

export default App
