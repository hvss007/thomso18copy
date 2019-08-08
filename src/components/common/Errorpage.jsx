import React from 'react';
import Errorsvg from './Errorsvg';
import './404page.css';
export default class Errorpage extends React.Component{
    render(){
        return (
            <div className="permission_denied">
            <div id="particles-js"></div>
            <div className="denied__wrapper">
                <h1>404</h1>
                <h3>LOST IN <span>SPACE</span> Thomso.in? Hmm, looks like that page doesn't exist.</h3>
                <Errorsvg />    
                <a href=""><button className="denied__link">Go Home</button></a>
            </div>
            </div>
        )
    }
}