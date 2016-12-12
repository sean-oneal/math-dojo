import React from 'react';
import { Navbar } from './Navbar.jsx';
import { Topbar } from './Topbar.jsx';


var Chart = (props) => (
  <div>

    <Topbar signOut={() => this.signOut()}/>

    <div className="container-fluid">
      <div className="row">

        <Navbar />

        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

          <h1 className="page-header">Chart</h1>

          <div className="row placeholders">

          </div>
            <div className="jumbotron">
            <h1>Let's build some charts yo</h1>
            </div>

        </div>
      </div>
    </div>
  </div>
);

export {Chart};