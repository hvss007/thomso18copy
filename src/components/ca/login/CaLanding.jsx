import React from 'react';
import logoca from './src/img/logo.png';
import "./src/css/calanding.css";
import { Link } from 'react-router-dom' ;

export default class CalandingNavbar extends React.Component {
    render() {
        return (
            <div>
                <div className={this.props.className}>
                    <div className="calanding-logo">
                        <Link to="/"><img src={logoca} alt="calanding-logo" /></Link>
                    </div>
                    <div className="vertical_line">
                    </div>
                    <div className="ca-landing-ca common-cursor">
                        <h2>Campus<br /> Ambassador</h2>
                    </div>
                </div>
            </div>
        );
    }
}
