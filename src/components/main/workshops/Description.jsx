import React, { Component } from 'react'
import cross from './src/img/cross.png'
import './src/css/WorkshopsIndex.css'

class Description extends Component {

    render() {
        return (
            <div className="workshops-description-one">
                <div className="workshops-description-child">
                    <img src={cross} alt="close" onClick={this.props.closeDescription}/>
                    <p className="description-workshops">{this.props.description}</p>
                    {this.props.price && this.props.price !== "Free" ? <a href="https://www.thecollegefever.com/events/thomso#thomso-workshop" target="_blank" rel="noopener noreferrer" className="paynow-button-workshops">
                        PAY NOW
                    </a> : null}
                </div>
            </div>
        )
    }
}

export default Description
