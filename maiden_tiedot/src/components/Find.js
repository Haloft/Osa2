import React from 'react'

const Find = (props) => {
    return (
        <div>
            Find countries <input
            value = {props.finder}
            onChange={props.handleCountry} 
            />
        </div> 
    )



}
export default Find
