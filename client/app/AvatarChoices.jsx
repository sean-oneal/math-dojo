import React from 'react';

var AvatarChoices = (props) => (
  <div className="container">
          <h1>Pick an Avatar</h1>
          <div className="avatarRow">
            {props.avatarChoices.map((avatar) => 
              <div className="item">
                <div className="well"> 
                  <img onClick={() => props.register(document.getElementById('inputUsername').value, document.getElementById('inputPassword').value, avatar.link)} src={avatar.link}></img>
                </div>
              </div>
            )}
          </div>
  </div>
);

export {AvatarChoices};