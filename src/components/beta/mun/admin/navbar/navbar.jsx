import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';

export default class Navbar extends React.Component{
render(){
    return(
      <div className="ca-admin-nav">
        <ul>
          <li>
            <Link to="/mun/admin/">
              Home
            </Link>
          </li>
          <li><Link to="/mun/admin/logout">Logout</Link></li>
        </ul>
      </div>
    )
  }
}