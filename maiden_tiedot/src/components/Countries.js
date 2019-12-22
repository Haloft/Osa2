import React from 'react'



const Countries = (props) => {
    console.log('menee maihin')
    console.log(props.country)
    return (
  <div>
            {props.country} {<button value={props.country} onClick={props.handleClick}>show</button>}
            
            
            
        </div>
        )
    }

  
 
  



export default Countries
