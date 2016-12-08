import React from 'react';
import {render} from 'react-dom';

class Login extends React.Component {
  constructor() {
    super();
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  login(username, password) {
    console.log(username);
    console.log(password);

  }

  register(username, password) {
    console.log(username);
    console.log(password);
  }

  render () {
    return (
      <div className="container" onSubmit={this.handleSubmit}>
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label className="sr-only">Username</label>
          <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autoFocus/>
          <label className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          <button onClick={() => this.login(document.getElementById('inputUsername').value, document.getElementById('inputPassword').value)} className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
          <button onClick={() => this.register(document.getElementById('inputUsername').value, document.getElementById('inputPassword').value)} className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    )
  }
}

render(<Login />, document.getElementById('login'));