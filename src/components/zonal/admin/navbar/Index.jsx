import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

export default class Navbar extends React.Component{
render(){
    return(
      <div className="zonals-admin-nav">
        <ul>
          <li><Link to="/zonals/admin/">Home</Link></li>
          <li><Link to="/zonals/admin/delhi">Delhi</Link></li>
          <li><Link to="/zonals/admin/jaipur">Jaipur</Link></li>
          <li><Link to="/zonals/admin/lucknow">Lucknow</Link></li>
          <li><Link to="/zonals/admin/logout">Logout</Link></li>
        </ul>
      </div>
    )
  }
}