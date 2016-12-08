import React from 'react';

var AvatarChoices = (props) => (
  <div className="container">
          <h1>Pick an Avatar</h1>
          <div className="row">
            {props.avatarChoices.map((avatar) => 
              <div className="item">
                <div className="well"> 
                  <img src={avatar.link}></img>
                </div>
              </div>
            )}
          </div>
  </div>
);

export {AvatarChoices};