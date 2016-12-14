import React from 'react';

var Alerts = function(props) {
  
  const alertToDisplay = props.alert; 

  if (alertToDisplay === 'unsuccessfulregister') {
    return (
      <div onClick={() => props.dismiss()} className="alert alert-warning">
        <strong>Sorry</strong> This username already exists. Please try another username.
      </div>
    )
  } else if (alertToDisplay === 'unsuccessfulsignin') {
    return (
      <div onClick={() => props.dismiss()} className="alert alert-danger">
        <strong>Warning!</strong> Username and Password do not match our records. Try again.
      </div>   
    );
  }
}

export {Alerts};