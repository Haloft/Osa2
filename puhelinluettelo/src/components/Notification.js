import React from 'react'

const Notification = (props) => {
  if(props.successMessage) {
  console.log(props.successMessage)
    if (props.successMessage === null) {
      return null
    }else{
  
    return (
      <div className="success">
        {props.successMessage}
      </div>
    )
  }
}else {
  if(props.errorMessage === null) {
    return null

  }else {
  return (
    <div className="error">
      {props.errorMessage}
    </div>
  )
}
}
}
  

export default Notification