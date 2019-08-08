import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { mobilecarousel } from "./mobilecarousel.js";
import "./mobilecarousel.css"
import LeftArrow from "./leftarrow"
import RightArrow from "./rightarrow"
import Farhan from "../carousel/src/svg/Farhan"
import Nucleya from "../carousel/src/svg/Nucleya"
import Shaan from "../carousel/src/svg/Shaan"
import Sonu from "../carousel/src/svg/Sonu"
import Sunidhi from "../carousel/src/svg/Sunidhi"

export default class MobileCarousel extends Component {
    state = {}
    componentDidMount() {
        mobilecarousel();
    }

    render() {
        return (
            <div className="simple-slider">
                <div className="slider-container">
                    <div className="slider-inner">
                        <div className="slider-slide">
                            <div className="slider-slide-child-farhan">
                                <Sunidhi />
                            </div>
                        </div>
                        <div className="slider-slide">
                            <div className="slider-slide-child-farhan">
                                <Shaan />
                            </div>
                        </div>
                        <div className="slider-slide">
                            <div className="slider-slide-child-farhan">
                                <Farhan />
                            </div>
                        </div>
                        <div className="slider-slide">
                            <div className="slider-slide-child-farhan">
                                <Nucleya />
                            </div></div>
                        <div className="slider-slide">
                            <div className="slider-slide-child-farhan">
                                <Sonu />
                            </div>
                        </div>
                        <div className="slider-slide">
                            <Link to="/whythomso#previous">
                                <div className="slider-slide-child-see-more">
                                    See More Artists
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="slider-dots">
                </div>
                <a className="leftarrow slider-previous">
                    <LeftArrow />
                </a>
                <a className="rightarrow slider-next">
                    <RightArrow />
                </a>
            </div>
        );
    }
}
