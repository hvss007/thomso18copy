import React, { Component } from 'react';
import Parallax from 'parallax-js';
import gate from '../src/img/indiagate.png';
import cloud from '../src/img/cloud.png';
import '../src/css/DelhiOpening.css';
import logo from '../src/img/logo.png'; 
import iitrlogo from '../src/img/iitrlogo.png';
import { Link } from 'react-router-dom' ;
export default class ChandigadhOpening extends Component {
    componentDidMount() {
        const scene = document.getElementById('delhi-zonals-parallax');
        if (scene) {
            this.parallaxInstance = new Parallax(scene);
        }
    }
    componentWillUnmount() {
        if (this.parallaxInstance) {
            this.parallaxInstance.destroy()
        }
    }
    render() {
        return (
            <div className="main-zonals-delhi-div">
                <div style={{display:'flex'}}>
                    <div data-depth="0">
                        <Link to="/"><img src={logo} className="zonals-delhi-side-logo" alt="logo"/></Link>
                    </div>
                    <div data-depth="0">
                        <img src={iitrlogo} className="zonals-delhi-iitrlogo" alt="iitrlogo" />
                    </div>
                </div>
                <div id="delhi-zonals-parallax" className="zonals-scene">

                    <div className="zonals-parallax-delhi-layer1">
                    </div>

                    <div  data-depth="0.3" className="zonals-parallax-delhi-layer3">
                        <div className="zonals-parallax-delhi-layer3-main-child">
                            <div className="parallax-delhi-layer3-child"> 
                                <img src={cloud} alt="cloud"  className="zonals-delhi-cloud-two"/>
                            </div>
                        </div>
                    </div>

                    <div data-depth="0" className="zonals-delhi-gate-div zonals-parallax-delhi-layer2 layer">
                        <div className="zonals-parallax-delhi-layer2-main-child">
                            <div className="parallax-delhi-layer2-child">
                                <img src={gate} alt="indiagate" data-hover-only="true"  className="zonals-india-gate"/>
                                <h1 className="zonals-delhi-layer2-h1">CHANDIGADH ZONALS</h1>
                            </div>
                        </div>
                    </div>

                    <div  data-depth="0.4"className="zonals-parallax-delhi-layer4">
                        <div className="zonals-parallax-delhi-layer4-main-child">
                            <div data-depth="0.4" className="parallax-delhi-layer4-child"> 
                                <img src={cloud} alt="cloud"  className="zonals-delhi-cloud-one"/>
                            </div>
                        </div>
                    </div>

                    <div  data-depth="0.6"className="zonals-parallax-delhi-layer5">
                        <div className="zonals-parallax-delhi-layer5-main-child">
                            <div data-depth="0.6" className="parallax-delhi-layer5-child"> 
                                <img src={cloud} alt="cloud"  className="zonals-delhi-cloud-three"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

