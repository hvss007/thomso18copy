import React from 'react';

import './Footer.css';
import fblogo from '../../beta/home/src/img/fbicon.png';
import inlogo from '../../beta/home/src/img/igicon.png';
import ytlogo from '../../beta/home/src/img/yticon.png';
import iglogo from '../../beta/home/src/img/inicon.png';


export default class Footer extends React.Component{
    render(){
        return(
            <div>
                <div className="quizardy-footer">
                    <div className="quizardy-footer-address">
                        <b>Address</b><br/>
                        <br/>Thomso Office<br/>
                        Multi Activity Center,<br/>
                      Indian Institute of Technology,<br/>
                      Roorkee<br/>
            </div>
            <div className="quizardy-footer-logo quizardy-footer-mobile">
                <div className="quizardy-footer-icons">
                    <div className="quizardy-footer-follow common-cursor"><b>Follow Us </b></div>
                    <div className="quizardy-footer-mainIcons">
                        <div className="quizardy-footer-fbdiv">  <a href="https://www.facebook.com/thomsoiitroorkee/" target="_blank" rel="noopener noreferrer"> <img src={fblogo} className="quizardy-footer-iconsImage" alt="fblogo" /></a></div>
                        <div className="quizardy-footer-instadiv"><a href="https://www.instagram.com/thomso.IITR/" target="_blank" rel="noopener noreferrer"><img src={inlogo} className="quizardy-footer-iconsImage" alt="inlogo" /></a></div>
                        <div className="quizardy-footer-ytdiv"><a href="https://www.youtube.com/user/iitrthomso" target="_blank" rel="noopener noreferrer"><img src={ytlogo} className="quizardy-footer-iconsImage" alt="ytlogo" /></a></div>
                        <div className="quizardy-footer-linkediv"><a href="https://www.linkedin.com/company/thomso-iit-roorkee-official" target="_blank" rel="noopener noreferrer"> <img src={iglogo} className="quizardy-footer-iconsImage" alt="lilogo" /></a></div>
                    </div>
                </div>
            </div>
            <div className="quizardy-footer-contact">
                <div className="quizardy-footer-contact-heading">
                    <b>Contact</b>
                </div>
            <div className="quizardy-footer-contact-info">
                <div className="quizardy-footer-contact1">
                    <br/>
                    Pulkit
                    <br/>9610493299
                </div>
                <div className="quizardy-footer-contact2">
                    <br/>
                    Chandini
                    <br/>7740949800
                </div>
            </div>
            </div>

            </div>
            <div className="quizardy-footer-logo quizardy-footer-desktop">
                <div className="quizardy-footer-icons">
                    <div className="quizardy-footer-follow common-cursor"><b>Follow Us </b></div>
                    <div className="quizardy-footer-mainIcons">
                        <div className="quizardy-footer-fbdiv">  <a href="https://www.facebook.com/thomsoiitroorkee/" target="_blank" rel="noopener noreferrer"> <img src={fblogo} className="quizardy-footer-iconsImage" alt="fblogo" /></a></div>
                        <div className="quizardy-footer-instadiv"><a href="https://www.instagram.com/thomso.IITR/" target="_blank" rel="noopener noreferrer"><img src={inlogo} className="quizardy-footer-iconsImage" alt="inlogo" /></a></div>
                        <div className="quizardy-footer-ytdiv"><a href="https://www.youtube.com/user/iitrthomso" target="_blank" rel="noopener noreferrer"><img src={ytlogo} className="quizardy-footer-iconsImage" alt="ytlogo" /></a></div>
                        <div className="quizardy-footer-linkediv"><a href="https://www.linkedin.com/company/thomso-iit-roorkee-official" target="_blank" rel="noopener noreferrer"> <img src={iglogo} className="quizardy-footer-iconsImage" alt="lilogo" /></a></div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
