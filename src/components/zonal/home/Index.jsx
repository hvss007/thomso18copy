import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./css/mainzonals.css";
import Navbar from "../../beta/home/Navbar";

export default class HomeIndex extends Component {
    render() {
        return (
            <div className="zonals-mainpage-parent">
                <Navbar />
                <div className="zonals-mainpage-parent-child">
                    <div className="zonals-mainpage-cards">
                        <Link to="/zonals/jaipur">
                            <div className="zonals-mainpage-cards-image-jaipur">
                            </div>
                        </Link>
                        <div className="zonals-mainpage-cards-title">
                            Jaipur Zonals
                        </div>
                        {/* <div className="zonals-mainpage-cards-button">
                            <Link to="/zonals/jaipur">
                                Register
                            </Link>
                        </div> */}
                        <div className="zonals-mainpage-cards-text">
                                SUCCESSFULLY ORGANIZED.
                        </div>
                    </div>
                    
                    <div className="zonals-mainpage-cards">
                        {/* <Link to="/zonals/chandigadh"> */}
                            <div className="zonals-mainpage-cards-image-bhopal">
                            </div>
                        {/* </Link> */}
                        <div className="zonals-mainpage-cards-title">
                            Bhopal Zonals
                        </div>
                        {/* <div className="zonals-mainpage-cards-button">
                            <Link to="/zonals/chandigadh">
                                    Register
                            </Link>
                        </div> */}
                        <div className="zonals-mainpage-cards-text">
                            SUCCESSFULLY ORGANIZED.
                        </div>
                    </div>

                    
                </div>
                <div className="zonals-mainpage-parent-child">
                    <div className="zonals-mainpage-cards">
                        <Link to="/zonals/delhi">
                            <div className="zonals-mainpage-cards-image-delhi">
                            </div>
                        </Link>
                        <div className="zonals-mainpage-cards-title">
                            Delhi Zonals
                        </div>
                        <div className="zonals-mainpage-cards-text">
                                SUCCESSFULLY ORGANIZED.
                        </div>
                    </div>

                    <div className="zonals-mainpage-cards">
                    <Link to="/zonals/lucknow">
                        <div className="zonals-mainpage-cards-image-lucknow">
                        </div>
                    </Link>
                        <div className="zonals-mainpage-cards-title">
                            Lucknow Zonals
                        </div>
                        <div className="zonals-mainpage-cards-text">
                                SUCCESSFULLY ORGANIZED.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
