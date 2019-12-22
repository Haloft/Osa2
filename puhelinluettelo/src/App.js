import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'
import PersonForm from './components/PersonForm';
import Notification from './components/Notification'
import Filter from './components/Filter';
import './index.css'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })

  }, [])


  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const rows = () => personsToShow.map(person =>
    <Person
      key={person.id}
      person={person}
      delPerson={() => delPerson(person.id)}
    />

  )

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.name === newName)
    const notexists = { ...exists, number: newNumber }

    exists !== undefined ? updPerson(notexists) : createPerson()
  }

  const createPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,

    }
    personService
      .create(personObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewNumber("")
        setNewName("")
        setSuccessMessage(
          `${newName} added`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log('fail')
        setErrorMessage(
          `${newName} wasn't added, there was an error. Please try again.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })


  }

  const updPerson = (changedPerson) => {
    console.log(changedPerson)
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(changedPerson.id, changedPerson)
        .then(returnedNote => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedNote))
          setNewName("")
          setNewNumber("")
          setSuccessMessage(
            `${newName}'s number was changed`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== changedPerson.id))
          console.log('fail')
          setErrorMessage(
            `${newName}'s number wasn't updated, there was an error.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const delPerson = id => {
    console.log(id)
    const persona = persons.find(p => p.id === id)
    console.log(persona)
    window.confirm(`Delete '${persona.name}' ?`)

    personService
      .deletePerson(id)
      .then(res => {
        console.log(res)
        setPersons(persons.filter(p => id !== p.id))
        setSuccessMessage(
          `${persona.name} was deleted`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== id))
        console.log('fail')
        setErrorMessage(
          `${persona.name} was already deleted from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage}
        errorMessage={errorMessage} />
      <Filter
        handleFilter={handleFilter}
        newFilter={newFilter}
      />

      <form onSubmit={addPerson}>
        <h2>Add a New</h2>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handlePersonChange={handlePersonChange}
          handleNumberChange={handleNumberChange}
          newNumber={newNumber}
        />

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {rows()}
      </div>
    </div>
  )

}


export default App