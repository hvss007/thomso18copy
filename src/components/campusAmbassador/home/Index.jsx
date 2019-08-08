import React from 'react';
import { Link } from 'react-router-dom' ;
import { SectionsContainer, Section } from 'react-fullpage';
import {Helmet} from 'react-helmet';
import Wisca from '../../ca/login/Wisca.jsx';
import Roles from '../../ca/login/Roles.jsx';
import Contact from '../../ca/login/Contact.jsx';
import CalandingNavbar from "../../ca/login/CaLanding";
import arrow from '../../ca/login/src/img/arrow.svg';
import '../../ca/login/src/css/Main.css';

export default class HomeIndex extends React.Component {

    componentWillMount() {
        window.location.hash = "";
    }

    render() {
        let options = {
            sectionClassName: 'section',
            anchors: ['home', 'Wisca', 'Roles', 'Contact'],
            delay: 1000,
            scrollBar: false,
            navigation: false,
            verticalAlign: false,
            sectionaddingTop: '0px',
            slidesNavPosition: 'bottom',
            arrowNavigation: true,
        };
        return (
            <div className="ca-opening-middlesection">
                <Helmet>
                    <meta keywords="" description="Become the Campus Ambassador your college and represent IIT Roorkee by greeting visitors to
                    the campus. Role of CA includes active social media presence, ground publicity and involvement in
                    activities.
                    Perks include a certificate of appreciation, to Thomso&#39;18 merchandise, gifts and goodies." />
                </Helmet>
                <CalandingNavbar className={(window.location.hash === "#Wisca" || window.location.hash === "#Roles" || window.location.hash === "#Contact") ? 'ca-landing-heading ca-landing-heading-dark' : 'ca-landing-heading'} />
                <SectionsContainer {...options}>
                    <div className="ca-opening-child-middle">
                        <Section>
                            <div className="ca-opening-button-parent">
                                <div>
                                    {this.props.facebook===true ? 
                                    <Link to="/campus/login">
                                        <button className="ca-opening-button">Login</button>
                                    </Link>
                                        :
                                    <Link to="/CampusAmbassador/login">
                                        <button className="ca-opening-button">Login</button>
                                    </Link>
                                        }
                                    {this.props.facebook===true ? 
                                    <Link to="/campus/register">
                                        <button className="ca-opening-button">Register</button>
                                    </Link>
                                        :
                                        <Link to="/CampusAmbassador/register" style={{marginLeft: '3vw'}}>
                                            <button className="ca-opening-button">Register</button>
                                        </Link>
                                        }
                                </div>
                                <div>
                                    <a href="#Wisca" address="true">
                                        <img src={arrow} className="ca-opening-downarrow" alt=
                                            "a" />
                                    </a>
                                </div>
                            </div>
                        </Section>
                    </div>
                    <div className="Ca-login-Section-Parent">
                        <Section>
                            <Wisca />
                        </Section>
                    </div>
                    <div className="Ca-login-Section-Parent">
                        <Section>
                            <Roles />
                        </Section>
                    </div>
                    <div className="Ca-login-Section-Parent">
                        <Section>
                            <Contact />
                        </Section>
                    </div>
                </SectionsContainer>
            </div>
        );
    }
}

HomeIndex.defaultProps = {
    facebook: false
} 
