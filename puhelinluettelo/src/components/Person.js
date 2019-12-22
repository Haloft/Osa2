import React from 'react'

const Person = ( props ) => {
  return (
   <span> {props.person.name} {props.person.number} {props.person.id} <button onClick={props.delPerson}>Poista</button><br /> </span>
  )
}

export default Person