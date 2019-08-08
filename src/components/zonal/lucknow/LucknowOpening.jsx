import React, { Component } from 'react';
import Parallax from 'parallax-js';
import gate from '../src/img/lucknow.png';
import cloud from '../src/img/cloud.png';
import '../src/css/LucknowOpening.css';
import logo from '../src/img/logo.png'; 
import iitrlogo from '../src/img/iitrlogo.png';
import { Link } from 'react-router-dom' ;
import arrow from '../src/img/arrow.svg';

export default class LucknowOpening extends Component {
    componentDidMount()
    {
        const scene = document.getElementById('lucknow-zonals-parallax');
        if (scene) {
            this.parallaxInstance = new Parallax(scene);
        }
    }
    componentWillUnmount() {
        if (this.parallaxInstance) {
            this.parallaxInstance.destroy()
        }
    }
    scrollToRegister = () => {
        const height = window.innerHeight
        const push = 1*height
        window.scroll({top: push, behavior: "smooth"});
    }
    render() {
        return (
            <div className="main-zonals-div">
                <div style={{display:'flex'}}>
                    <div data-depth="0">
                        <Link to="/"><img src={logo} className="zonals-lucknow-side-logo" alt="logo"/></Link>
                        </div> <div data-depth="0">
                        <img src={iitrlogo} className="zonals-lucknow-iitrlogo" alt="iitrlogo" />
                    </div>
                </div>
                    <div data-depth="0" className="zonals-parallax-layer7">
                        <div className="zonals-parallax-layer7-main-child-lucknow">
                            <div className="zonals-layer7-arrowmove">
                                <img src={arrow} onClick={() => this.scrollToRegister()} className="zonals-layer7-downarrow" alt="arrow"/>
                            </div>
                        </div>
                    </div>
                <div id="lucknow-zonals-parallax" className="zonals-scene">

                    <div className="zonals-parallax-layer1">
                    </div>


                    <div data-depth="0" className="zonals-gate-div zonals-parallax-layer2">
                        <div className="zonals-parallax-layer2-main-child-lucknow">
                            <div className="parallax-layer2-child-lucknow">
                                <img src={gate} alt="lucknowgate" data-hover-only="true"  className="zonals-lucknow-gate"/>
                                <h1 className="zonals-layer2-h1">LUCKNOW ZONALS</h1>
                            </div>
                        </div>
                    </div>

                    <div  data-depth="0.4" className="zonals-parallax-layer4">
                        <div className="zonals-parallax-layer4-main-child-lucknow">
                            <div data-depth="0.4" className="parallax-layer4-child-lucknow"> 
                                <img src={cloud} alt="cloud"  className="zonals-cloud-one"/>
                            </div>
                        </div>
                    </div>

                    <div  data-depth="0.6" className="zonals-parallax-layer5">
                        <div className="zonals-parallax-layer5-main-child-lucknow">
                            <div data-depth="0.6" className="parallax-layer5-child-lucknow"> 
                                <img src={cloud} alt="cloud"  className="zonals-cloud-three"/>
                            </div>
                        </div>
                        <div  data-depth="0.3" className="zonals-parallax-layer6">
                            <div className="zonals-parallax-layer6-main-child-lucknow">
                                <div data-depth="0.4" className="parallax-layer6-child-lucknow"> 
                                    <img src={cloud} alt="cloud"  className="zonals-cloud-six"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

