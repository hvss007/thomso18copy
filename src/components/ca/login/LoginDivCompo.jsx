import React from "react";

import './src/css/LoginDivCompo.css';
export default class LoginDivCompo extends React.Component{

  render(){
    return(
    <div>

      <div className="login-diva">

      <div className="login-divb">
        <img src={this.props.image} alt="logindiv"/>
      </div>
      <div className="login-divc">
         {this.props.data}
      </div>
    </div>

    </div>
  );
  }
}
