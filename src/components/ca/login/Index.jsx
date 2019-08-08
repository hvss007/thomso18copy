import React from 'react';
import Wisca from './Wisca.jsx';
import Roles from './Roles.jsx';
import Contact from './Contact.jsx';
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import CalandingNavbar from "./CaLanding";
import { SectionsContainer, Section } from 'react-fullpage';
import arrow from './src/img/arrow.svg';
import './src/css/Main.css';
export default class LoginIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            facebook: true
        }
        this.Auth = new AuthService();
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    componentDidMount() {
        if (window.FB) {
            window.FB.init({
                appId: process.env.REACT_APP_FB_ID,
                status: true,
                xfbml: true
            });
        }
    }

    facebookLogin() {
        // let props = this.props;
        if (window.FB) {
            window.FB.login(response => {
                window.FB.api('/me?fields=id, name, email, picture.type(large), link', res => {
                    let accessToken = response.authResponse.accessToken;
                    let { id, name, email, link } = res;
                    let image = res.picture.data.url;
                    let data = { id, name, image, accessToken, link };
                    if (email !== undefined) {
                        data['email'] = email
                    }
                    this.updateCheckUser(data)
                })
            }, { scope: 'user_likes, email, user_posts, user_link' });
        }
    }

    updateCheckUser(data) {
        FetchApi('POST', '/api/ca/auth/fblogin', data)
            .then(r => {
                console.log(r)
                if (r && r.data && r.data.body) {
                    if (r.data.body.created) {
                        // Set isAuthenticated
                        this.Auth.setToken(r.data.token)
                        this.props.updateRoutes(true)
                        this.props.setUserData(r.data.body)
                    } else {
                        // Pass data to parent
                        this.Auth.setTempToken(r.data.token)
                        this.props.setUserData(r.data.body)
                        this.props.history.push('/ca/register')
                    }
                }
            })
            .catch(e => console.log(e));
    }
    componentWillMount() {
        window.location.hash = "#home";
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
                <CalandingNavbar className={(window.location.hash === "#Wisca" || window.location.hash === "#Roles" || window.location.hash === "#Contact") ? 'ca-landing-heading ca-landing-heading-dark' : 'ca-landing-heading'} />
                <SectionsContainer {...options}>
                    <div className="ca-opening-child-middle">
                        <Section>
                            <div className="ca-opening-button-parent">
                                {/* <div className="inconvi">
                                    <p className="sorry">Sorry for the inconvenience. We are facing some technical issues due to Facebook policy changes. Kindly enter email/FacebookID and we'll grant you the access.</p>
                                    <form className="formEmail">
                                        <input type="text" placeholder="EmailID" />
                                        <input type="text" placeholder="https://www.facebook.com" />
                                    </form>
                                </div> */}
                                <button className="ca-opening-button" onClick={() => this.facebookLogin()}>Login/Register</button>
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
