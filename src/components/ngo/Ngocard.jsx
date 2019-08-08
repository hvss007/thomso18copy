import React, { Component } from 'react'
import './src/css/Ngocard.css'

class NgoIndex extends Component {
    render() {
        return (
            <div className="ngo-card-main-div">
                <img className="ngo-card-image" src={`/img/main/workshops/${this.props.ngoImage}`} alt='social' />
                <h2>{this.props.heading}</h2>
                <p>{this.props.content}</p>
            </div>
        )
    }
}

export default NgoIndex
