import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';

export default class Navbar extends React.Component{
render(){
    return(
      <div className="ca-admin-nav">
        <ul>
          <li>
            <Link to="/ca/admin/"
              //  className="active"
            >
              Home
            </Link>
          </li>
          <li><Link to="/ca/admin/ideas">Ideas</Link></li>
          <li><Link to="/ca/admin/tempideas">New Ideas</Link></li>
          <li><Link to="/ca/admin/temp">Temp Registrations</Link></li>
          <li><Link to="/ca/admin/logout">Logout</Link></li>
        </ul>
      </div>
    )
  }
}