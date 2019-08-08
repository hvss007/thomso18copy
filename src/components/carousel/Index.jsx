import React, { Component } from 'react';
import carousel from "./carousel.js";
import { Link } from "react-router-dom";
import "./carousel.css"
import LeftArrow from "./leftarrow"
import RightArrow from "./rightarrow"
import Farhan from "./src/svg/Farhan"
import Nucleya from "./src/svg/Nucleya"
import Shaan from "./src/svg/Shaan"
import Sonu from "./src/svg/Sonu"
import Sunidhi from "./src/svg/Sunidhi"

export default class Carousel extends Component {
    state = {}
    componentDidMount() {
        carousel();
    }
    render() {
        return (
            <div className="carousel-parent">
                <div className="leftarrow" style={{
                }}>
                    <LeftArrow />
                </div>
                <div className="card-carousel">

                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "Loved the exhilarating atmosphere at IIT Roorkee"
                            </p>
                            <Sunidhi />

                        </div>
                    </div>
                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "it was an amazing expreience here"
                            </p>
                            <Shaan />
                        </div>
                    </div>
                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "The energy of the crowd kept me charged"
                            </p>
                            <Farhan />
                        </div>
                    </div>
                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "Didn’t expect so much fun at a technical institute"
                            </p>
                            <Nucleya />
                        </div>
                    </div>
                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "The Junta at IITR was so dynamic"
                            </p>
                            <Sonu />
                        </div>
                    </div>
                    <div className="my-card">
                        <Link to="/whythomso">
                            <div className="my-card-link">
                                <p>See more artists</p>
                            </div>
                        </Link>
                    </div>

                </div>
                <div className="rightarrow" style={{
                }}>
                    <RightArrow />
                </div>
            </div>
        );
    }
}
