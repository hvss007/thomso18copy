import React from "react";

import './src/css/LoginCompo.css';
export default class LoginCompo extends React.Component{

  render(){
    return(
    <div>

      <div className="login-div2">

      <div className="login-div3">
        <img src={this.props.image} alt="div3image"/>
      </div>
      <div className="login-div4">
       <p className="login-para">{this.props.heading}</p> {this.props.data}
      </div>
    </div>

    </div>
  );
  }
}
