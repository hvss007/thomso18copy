import React from 'react';
import '../src/css/Footer.css';
import fblogo from '../src/img/fbicon.png';
import inlogo from '../src/img/igicon.png';
import ytlogo from '../src/img/yticon.png';
import iglogo from '../src/img/inicon.png';
export default class Footer extends React.Component {
    render() {
        return (
            <div className="zonals-footer-main-div">
                <div className="zonals-footer-address">
                    <p style={{margin:'0'}}>
                        <span className="address-name-zonals">Address</span><br/>
                        Thomso Office <br />
                        Multi Activity Center, <br />
                        Indian Institute Of Technology, <br />Roorkee
                    </p>
                </div>
            <div className="zonals-footer-follow ">
                <div className="zonals-footer-text-p">
                    FOLLOW US
                </div>
                <div className="zonals-footer-mainIcons">
                    <div className="zonals-footer-fbdiv">  <a href="https://www.facebook.com/thomsoiitroorkee/" target="_blank" rel="noopener noreferrer"> <img src={fblogo} className="zonals-footer-iconsImage" alt="fblogo" /></a></div>
                    <div className="zonals-footer-instadiv"><a href="https://www.instagram.com/thomso.IITR/" target="_blank" rel="noopener noreferrer"><img src={inlogo} className="zonals-footer-iconsImage" alt="inlogo" /></a></div>
                    <div className="zonals-footer-ytdiv"><a href="https://www.youtube.com/user/iitrthomso" target="_blank" rel="noopener noreferrer"><img src={ytlogo} className="zonals-footer-iconsImage" alt="ytlogo" /></a></div>
                    <div className="zonals-footer-linkediv"><a href="https://www.linkedin.com/company/thomso-iit-roorkee-official" target="_blank" rel="noopener noreferrer"> <img src={iglogo} className="zonals-footer-iconsImage" alt="lilogo" /></a></div>
                </div> 
            </div>
            <div className="zonals-footer-contact">
                <div className="zonals-contact-name">
                    <div>
                        CONTACT
                    </div>
                </div>
                {this.props.city === 'lucknow' ?
                    <div className="zonals-contact-person">
                        <div className="zonals-contact-person-child">
                            <div>
                                Rohit
                            </div>
                            <div>
                            +91-7023511775
                            </div>
                        </div>
                        <div className="zonals-contact-person-child">
                            <div>
                                Arihant
                            </div>
                            <div>
                                +91-9479714596
                            </div>
                        </div>
                    </div>
                    : null
                }
                {this.props.city === 'jaipur' ?
                    <div className="zonals-contact-person">
                        <div className="zonals-contact-person-child">
                            <div>
                                Rohit
                            </div>
                            <div>
                            +91-7023511775
                            </div>
                        </div>
                        <div className="zonals-contact-person-child">
                            <div>
                                Harshit
                            </div>
                            <div>
                            +91-9340043505
                            </div>
                        </div>
                    </div>
                    : null
                }
                {this.props.city === 'delhi' ?
                    <div className="zonals-contact-person">
                        <div className="zonals-contact-person-child">
                            <div>
                                Harshit
                            </div>
                            <div>
                            +91-9340043505
                            </div>
                        </div>
                        <div className="zonals-contact-person-child">
                            <div>
                                Abhay
                            </div>
                            <div>
                                +91-9131700765
                            </div>
                        </div>
                    </div>
                    : null
                }
                {this.props.city === 'chandigadh' ?
                    <div className="zonals-contact-person">
                        <div className="zonals-contact-person-child">
                            <div>
                                Harshit
                            </div>
                            <div>
                            +91-9340043505
                            </div>
                        </div>
                        <div className="zonals-contact-person-child">
                            <div>
                                Abhay
                            </div>
                            <div>
                                +91-9131700765
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
            </div>
        );
    }
}

