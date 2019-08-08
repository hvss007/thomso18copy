import React from 'react'
import './TeamIndex.css'
import Navbar from '../beta/home/Navbar.jsx'

export default class ComingSoonIndex extends React.Component{
    render(){
        return (
            <div>
                <Navbar/>
                <div className="team-main-div">
                    Coming Soon
                </div>
            </div>
        )
    }
}
