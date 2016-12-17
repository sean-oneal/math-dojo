import React from 'react';

const Alerts = function(props) {

  const alertToDisplay = props.alert;

  if (alertToDisplay === 'unsuccessfulregister') {
    return (
      <div onClick={() => props.dismiss()} className="alert alert-warning">
        <strong>Sorry</strong> This username already exists. Please try another username.
      </div>
    );
  } else if (alertToDisplay === 'unsuccessfulsignin') {
    return (
      <div onClick={() => props.dismiss()} className="alert alert-danger">
        <strong>Warning!</strong> Username and Password do not match our records. Try again.
      </div>
    );
  } else if (alertToDisplay === 'invalidformsubmission') {
    return (
      <div onClick={() => props.dismiss()} className="alert alert-danger">
        Please fill out all the required fields!
      </div>
    );
  }
};

export { Alerts };
