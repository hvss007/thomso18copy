import React, { Component } from 'react'
import Navbar from '../../beta/home/Navbar.jsx'
import './src/css/mrmissIndex.css'
import mrmiss from './src/img/mrmissthomso.jpg'

class MemeIndex extends Component {
    render() {
        return (
            <div>
                <Navbar background="true"/>
                <div className="mrmiss-image">
                    <div>
                        <img className="mrmiss-image-child" src={mrmiss} alt="Mr and Miss thomso poster" />
                        <a href="https://drive.google.com/file/d/1B9qCT4fdnxjr_25m0pxWhAYjrHzZyCaA/view" rel="noopener noreferrer" target="_blank">
                            <p className="mrmiss-online-events-rulebook">
                                RuleBook
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default MemeIndex
