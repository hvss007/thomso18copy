import React, { Component } from 'react'
import Navbar from '../../beta/home/Navbar.jsx'
import './src/css/CupidIndex.css'
import cupid from './src/img/cupid.jpg'

class CupidIndex extends Component {
    render() {
        return (
            <div>
                <Navbar background="true"/>
                <div className="cupid-image">
                    <div>
                        <img className="cupid-image-child" src={cupid} alt="cupid-poster" />
                        <a href="https://drive.google.com/file/d/1Z71Z6z24APrI0zFKd-dTudy9EgZ9x11w/view" rel="noopener noreferrer" target="_blank">
                            <p className="cupid-online-events-rulebook">
                                RuleBook
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default CupidIndex
