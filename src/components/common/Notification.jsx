import React from 'react';

import { firebaseInit } from '../../utils/firebasePush';

import './Notification.css';


export default class FakeNotification extends React.Component{
  constructor() {
    super();
    this.state = {
      show: false
    };
  }
 
  componentWillMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
      firebaseInit();
    } else if (Notification.permission === "default") {
      this.setState({show: true})
    }
  }

  render(){
    return(
      <div>
        {this.state.show ?
          <div className="Notification-div-O">
            <div className="Notification-div-S"></div>
            <div className="Notification-div-C">
              <div className="Notification-div-T">
                <h1>Notification</h1><p> Press 'Allow' to continue </p>
              </div>
              <div className="Notification-div-A">
                <button type="button"  onClick={() => this.setState({show: false})}>Deny</button>
                <button type="button"  onClick={() => {
                  this.setState({show: false})
                  firebaseInit()
                  }}>Allow</button>
              </div>
            </div>
        </div>
        : null
      }
    </div>
  );
  }
}
