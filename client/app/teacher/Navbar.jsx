import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

var Navbar = () => (
  <div className="col-sm-3 col-md-2 sidebar">
    <ul className="nav nav-sidebar">
      <li><Link to='teacherdashboard'>Dashboard</Link></li>
    </ul>
  </div>
);

export {Navbar};
