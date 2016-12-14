import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

var StudentListItem = (props) => (
  <div className="col-sm-3 col-md-2">
    <Link to='/user'>{props.student}</Link>
  </div>
);

export {StudentListItem};
