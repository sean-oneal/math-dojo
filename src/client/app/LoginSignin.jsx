import React from 'react';
import {render} from 'react-dom';
import Axios from '../../../node_modules/axios/lib/axios.js'; 
import {AvatarChoices} from './AvatarChoices.jsx';
import {Link} from 'react-router';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      avatarChoices: []
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  login(username, password) {
    Axios.post('http://localhost:3000/login', {
      username: username,
      password: password,
    })
  }

  register(username, password, url) {
    Axios.post('http://localhost:3000/signup', {
      username: username,
      password: password,
      imageUrl: url,
    })
  }

  getAvatars() {
    var context = this;
    Axios.get('https://www.googleapis.com/customsearch/v1?key=' + window.GMAP_KEY + '&cx=009407302250325958776:7xs2zpwdaho&q=happy%20cat&searchType=image&imgSize=small')
    .then(function(res) {
      context.setState({avatarChoices: res.data.items});
    });
  }

  render () {
    let displayChoices = this.state.avatarChoices.length > 0 ? <AvatarChoices register={this.register} avatarChoices={this.state.avatarChoices}/> : <div></div>
    return (
      <div className="container" onSubmit={this.handleSubmit}>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Arena">Battle!</Link></li>
        </ul>
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label className="sr-only">Username</label>
          <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autoFocus/>
          <label className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          <button onClick={() => this.login(document.getElementById('inputUsername').value, document.getElementById('inputPassword').value)} className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
          <button onClick={() => this.getAvatars()} className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>

        {displayChoices}

      </div>
    )
  }
}

export {Login}






