import React from 'react'

const PersonForm = (props) => {
  return (
        <div> 
            name: <input
            value={props.newName}
            onChange={props.handlePersonChange} />
        <br />
            number: <input
            value={props.newNumber}  
            onChange={props.handleNumberChange}
            />
            
        </div>
  )
}

export default PersonForm