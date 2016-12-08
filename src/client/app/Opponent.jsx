import React from 'react';

var Opponent = (props) => (
  <div>
    <div>
      <img src={props.opponentImage}></img>
    </div>
    FITE ME BRO: {props.opponent}
  </div>
)

export {Opponent};