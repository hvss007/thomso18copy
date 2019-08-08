import React, { Component } from 'react'
import './src/css/WorkshopsIndex.css'

class CardIndex extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="workshops-parent-child" onClick={this.props.showDescription}>
                    <div className="workshops-main-child-one">
                        <img src={`/img/main/workshops/${this.props.workshopImage}`}alt="Avatar"/>
                        <div className="workshops-container-one">
                            <h4><b>{this.props.heading}</b></h4> 
                            <p className="workshops-price-card">{this.props.price}</p> 
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CardIndex
