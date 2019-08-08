import React, { Component } from 'react';
import './src/css/Footer.css';
import fblogo from './src/img/fbicon.png';
import inlogo from './src/img/igicon.png';
import ytlogo from './src/img/yticon.png';
import iglogo from './src/img/inicon.png';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            days:0
        };
    }

    componentDidMount() {
        const countDownDate = new Date("Oct 27, 2018 00:00:00").getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        if (days < 0) {
          days = 0;
        }
        this.setState({ days })
    }
    

    render() {
        return (
            <div className="beta-footer-main">
                <div className="beta-footer-countdown">
                    <p className="beta-footer-thomso common-cursor">THOMSO'18 COUNTDOWN</p><br />
                    <p className="daysleft common-cursor"><span className="beta-footer-days">{this.state.days}</span> <span className="beta-footer-left">DAYS LEFT</span></p>
                </div>
                <div className="beta-footer-icons">
                    <p className="beta-footer-follow common-cursor">FOLLOW US </p>
                    <div className="beta-footer-mainIcons">
                        <div className="beta-footer-fbdiv">  <a href="https://www.facebook.com/thomsoiitroorkee/" target="_blank" rel="noopener noreferrer"> <img src={fblogo} className="beta-footer-iconsImage" alt="fblogo" /></a></div>
                        <div className="beta-footer-instadiv"><a href="https://www.instagram.com/thomso.IITR/" target="_blank" rel="noopener noreferrer"><img src={inlogo} className="beta-footer-iconsImage" alt="inlogo" /></a></div>
                        <div className="beta-footer-ytdiv"><a href="https://www.youtube.com/user/iitrthomso" target="_blank" rel="noopener noreferrer"><img src={ytlogo} className="beta-footer-iconsImage" alt="ytlogo" /></a></div>
                        <div className="beta-footer-linkediv"><a href="https://www.linkedin.com/company/thomso-iit-roorkee-official" target="_blank" rel="noopener noreferrer"> <img src={iglogo} className="beta-footer-iconsImage" alt="lilogo" /></a></div>
                    </div> 
                </div>
            </div>
        );
    }
}

export default Footer;
