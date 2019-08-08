import React, { Component } from 'react';
import './src/css/Footfall.css';
import diagram from './src/img/diagram.png';
class Footfall extends Component {
    render() {
        return (
            <div className="beta-main-footfall"> 
                <div className="beta-footfall-box">
                    <img src={diagram} className="beta-footfall-aboveImage" alt="---------" />
                    <span className="beta-footfall-first">150+</span><br/>
                    <span className="beta-footfall-second">EVENTS</span>
                    <img src={diagram} className="beta-footfall-downImage beta-footfall-hide" alt="---------" />
                </div> 
                <div className="beta-footfall-box">
                    <img src={diagram} className="beta-footfall-aboveImage" alt="---------" />
                    <span className="beta-footfall-first">800+</span> <br/>
                    <span className="beta-footfall-second">COLLEGES</span>
                    <img src={diagram} className="beta-footfall-downImage beta-footfall-hide" alt="---------" />
                </div> 
                <div className="beta-footfall-box">
                    <img src={diagram} className="beta-footfall-aboveImage" alt="---------" />
                    <span className="beta-footfall-first">100K+</span><br/>
                    <span className="beta-footfall-second">FOOTFALLS</span>
                    <img src={diagram} className="beta-footfall-downImage" alt="---------" />
                </div> 
            </div>
        );
    }
}

export default Footfall;
