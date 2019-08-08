import React, { Component } from 'react';
import "./economichost.css"
import ecologo from "./economical.png"

export default class EconomicIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="economichost-parent">
                <a href="https://www.economicalhost.com/" target="_blank" rel="noopener noreferrer">
                    <img src={ecologo} className="eco-logo-image" alt="economicalhost.com" />
                </a>
            </div>
        );
    }
}
