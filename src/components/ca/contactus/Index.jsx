import React from 'react';
import "./css/contactus.css";
import gmail from "../../beta/home/src/img/gmail.png";
import call from "../../beta/home/src/img/call.png"

export default class ContactIndex extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        return (
            <div className="ca-contact-parent">
                <div className="ca-contact-child">
                    <div className="ca-contact-child-first">
                        <div className="ca-contact-child-wrapper flex_column">
                            <div className="ca-contact-image_one">
                            </div>
                            <div className="ca-contact-details">
                                <div className="ca-contact-details-name">
                                    <h2>Harshit kanakariya</h2>
                                </div>
                                <div className="ca-contact-details-post">
                                    <h2>PUBLIC RELATIONS</h2>
                                </div>
                                <div className="ca-contact-details-gmail">
                                    <img src={gmail} alt="email"/>
                                    <span>harshit.thomso@gmail.com</span>
                                </div>
                                <div className="ca-contact-details-call">
                                    <img src={call} alt="mobile"/>
                                    <span>+91-9340043505</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ca-contact-child-second">
                        <div className="ca-contact-child-wrapper flex_column">
                            <div className="ca-contact-image_two">
                            </div>
                            <div className="ca-contact-details">
                                <div className="ca-contact-details-name">
                                    <h2>Rohit Niranjan</h2>
                                </div>
                                <div className="ca-contact-details-post">
                                    <h2>PUBLIC RELATIONS</h2>
                                </div>
                                <div className="ca-contact-details-gmail">
                                    <img src={gmail} alt="email"/>
                                    <span>niranjan98.thomso@gmail.com</span>
                                </div>
                                <div className="ca-contact-details-call">
                                    <img src={call} alt="mobile"/>
                                    <span>+91-7023511775</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(this.props.userData && this.props.userData.gender === "female") ?
                        <div className="ca-contact-child-third">
                            <div className="ca-contact-child-wrapper flex_column">
                                <div className="ca-contact-image_three">
                                </div>
                                <div className="ca-contact-details">
                                    <div className="ca-contact-details-name">
                                        <h2>Nikhil Mehra</h2>
                                    </div>
                                    <div className="ca-contact-details-post">
                                        <h2>TECHNICAL HEAD</h2>
                                    </div>
                                    <div className="ca-contact-details-gmail">
                                        <img src={gmail} alt="email"/>
                                        <span>nikhil.thomso@gmail.com</span>
                                    </div>
                                    <div className="ca-contact-details-call">
                                        <img src={call} alt="mobile"/>
                                        <span>+91-9116891112</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="ca-contact-child-fourth">
                            <div className="ca-contact-child-wrapper flex_column">
                                <div className="ca-contact-image_four">
                                </div>
                                <div className="ca-contact-details">
                                    <div className="ca-contact-details-name">
                                        <h2>Prashant Verma</h2>
                                    </div>
                                    <div className="ca-contact-details-post">
                                        <h2>TECHNICAL HEAD</h2>
                                    </div>
                                    <div className="ca-contact-details-gmail">
                                        <img src={gmail} alt="email"/>
                                        <span>prashant.thomso@gmail.com</span>
                                    </div>
                                    <div className="ca-contact-details-call">
                                        <img src={call} alt="mobile"/>
                                        <span>+91-8840592467</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
