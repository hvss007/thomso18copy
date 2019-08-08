import React, { Component } from 'react';
import nucleya from './src/img/nucleya.jpg';
import farhan  from './src/img/farhan.jpg';
import sunidhi from './src/img/sunidhi.jpg';
import './src/css/Celebrity.css';
class Celebrity extends Component {
    constructor(props)
    {
        super(props);
        this.state=
        {
            farhan:true,
            nucleya:false,
            sunidhi:false
        }
    }
    render() {
        return (
            <div className="beta-home-celebrityMain">
                <div className="beta-home-hoverEffect">
                    <img src={farhan} alt="Farhan" className="beta-home-celebImage"/>
                    <p className="beta-home-farhan">FARHAN AKHTAR</p>
                    <div className="beta-home-middle">
                        <div className="beta-home-text">"I have done a lot of shows.This is one of those that  I'd remember for a lifetime."</div>
                    </div>
                </div>
                <div className="beta-home-hoverEffect">
                    <img src={nucleya} alt="nucleya" className="beta-home-celebImage"/>
                    <p className="beta-home-nucleya">NUCLEYA</p>
                    <div className="beta-home-middle">
                            <div className="beta-home-text">"The energy of the crowd kept me charged. Loved the electrifying atmosphere of IIT roorkee"</div>
                    </div>
                </div> 
                <div className="beta-home-hoverEffect"> 
                    <img src={sunidhi} alt="sunidhi" className="beta-home-celebImage"/>
                    <p className="beta-home-sunidhi">SUNIDHI CHAUHAN</p>
                    <div className="beta-home-middle">
                            <div className="beta-home-text">"It was a lovely experience.The crowd was great."</div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default Celebrity;
