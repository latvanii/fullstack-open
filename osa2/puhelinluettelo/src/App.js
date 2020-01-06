import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
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
    console.log(persons)
  }
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }



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
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      {/*TODO */}
    </div>
  )

}

export default App
