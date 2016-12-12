import React from 'react';

var Navbar = () => (
  <div className="col-sm-3 col-md-2 sidebar">
    <ul className="nav nav-sidebar">
      <li className="active"><a href="#">Overview <span className="sr-only">(current)</span></a></li>
      <li><a href="#">Reports</a></li>
      <li><a href="#">Analytics</a></li>
      <li><a href="#">Export</a></li>
    </ul>
  </div>
);

export {Navbar};