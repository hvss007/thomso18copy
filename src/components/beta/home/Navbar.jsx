import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../../handlers/main/AuthService";
import List from "./List";
import "./src/css/Navbar.css";

import FetchApi from '../../../utils/FetchAPI';

import img from "./src/img/logo.png";
// import boy from "../../campusAmbassador/sidebar/img/boy.png";
// import girl from "../../campusAmbassador/sidebar/img/girl.png";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
            hamburger: true,
            isAuthenticated: false,
            activeState: window.location.pathname.substring(1),
            imageData: [],
            displayNavbar: true
        };
        this.setActive = this.setActive.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/main/getImage', null, token)
                .then(r => {
                    if (r && r.data && r.data.body) {
                        this.setState({ imageData: r.data.body });
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }

        if (this.props.detail && this.props.detail.subevents) {
            const filteredData = this.props.detail.subevents.filter(e => e.id === this.props.id);
            if (filteredData) {
                this.setState({ data: filteredData[0], isAuthenticated });
            } else {
                this.setState({ isAuthenticated })
            }
        } else if (isAuthenticated) {
            this.setState({ isAuthenticated })
        }
        window.addEventListener('keyup', this.handleKeys, false)
    }
    handleKeys = e => {
        if (e.keyCode === 27) {
            this.toggleNavbar()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeys)
    }
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
            hamburger: !this.state.hamburger
        });
    }
    setActive(state) {
        this.setState({
            activeState: state
        });
    }
    toggleNavbar() {
        this.setState({
            displayNavbar: !this.state.displayNavbar
        })
    }
    render() {
        let verified = this.state.imageData.verified;
        // let imageUrl = '/img/ProfileImage/' + this.state.imageData.image;
        let imageUrl;
        if (this.state.imageData && this.state.imageData.image) {
            imageUrl = '/uploads/img/ProfileImage/' + this.state.imageData.image
        }
        if (process.env.REACT_APP_SERVER_ENVIORNMENT === 'dev') {
            imageUrl = 'https://localhost:' + process.env.REACT_APP_SERVER_PORT + imageUrl
        }
        return (
            <div className="navbar-the-parent-div">
                <div className={this.state.displayNavbar ? 'new-navbar-i' : 'new-navbar-i span-cross'} onClick={this.toggleNavbar}>
                    <span><i>border</i></span>
                    <span><i>border</i></span>
                    <span><i>border</i></span>
                </div>
                <div>
                    <div style={{ height: '100vh', position: 'fixed' }} className={this.state.displayNavbar ? 'hideNavbar' : 'new-navbar-lists-child'}>
                       <li>
                            <Link to="/main" className={(this.state.activeState === "main") ? "linkSponsors" : null}
                                onClick={() => {
                                    this.setActive("main");
                                }}>{verified ? (this.state.imageData && this.state.imageData.image) ? <img className="navbar-user-image" src={imageUrl} alt="DASHBOARD" /> : 'DASHBOARD' : <span><span className="events-navbar-new">REGISTER</span></span>}</Link>

                        </li>
                        {this.props.events === true ? null : <li >
                            <Link to="/events" className={(this.state.activeState === "#") ? "linkEvents" : null}
                                onClick={() => {
                                    this.setActive("#");
                                }}><span className="events-navbar-new">EVENTS</span></Link>
                        </li>}
                        <li className="dropdown">
                            <Link to="/onlineevents" className={(this.state.activeState === "onlineevents") ? "linkonline" : null}
                                onClick={() => {
                                    this.setActive("ongoingevents")
                                }}>ONGOING EVENTS </Link>
                        </li>
                        {this.props.events === true ? null : <li className="dropdown">
                            <Link to="/mun" className={(this.state.activeState === "mun") ? "mun" : null}
                                onClick={() => {
                                    this.setActive("mun");
                                }}>IITR MUN</Link>
                        </li>}
                        {this.props.events === true ? null : <li >
                            <Link to="/campusambassador/" className={(this.state.activeState === "campusambassador/") ? "linkCaportal " : null}
                                onClick={() => {
                                    this.setActive("linkCaportal");
                                }}>
                                CAMPUS AMBASSADOR
                            </Link>
                        </li>}
                        {this.props.events === true ? null : <li>
                            <Link to="/associate" className={(this.state.activeState === "linkAssociate") ? "linkSponsors" : null}
                                onClick={() => {
                                    this.setActive("linkAssociate");
                                }}>ASSOCIATE WITH US</Link>
                        </li>}
                        {this.props.events === true ? null : <li className="dropdown">
                            <Link to="/zonals/home" className={(this.state.activeState === "lucknow") ? "linkLucknow" : null}
                                onClick={() => {
                                    this.setActive("lucknow");
                                }}>ZONALS</Link>
                        </li>}
                         <li>
                            <Link to="/payment" className={(this.state.activeState === "payment") ? "payment" : null}
                                onClick={() => {
                                    this.setActive("payment");
                                }}>PAYMENT</Link>
                        </li>
                        {/*    <li>
                        <Link to="" className={(this.state.activeState === "linkTeam") ? "linkTeam" : null}
                        onClick={() => {
                                        this.setActive("linkTeam");
                        }}>TEAM CONTACT</Link>
                        </li>*/}
                        {this.props.events === true ? null : <li>
                            <Link to="/whythomso" className={(this.state.activeState === "linkBlog") ? "linkBLog" : null}
                                onClick={() => {
                                    this.setActive("linkBlog");
                                }}>WHY THOMSO</Link>
                        </li>}
                        <li>
                            <a href="/whythomso#faqs" rel="noopener noreferrer" className={(this.state.activeState === "faq") ? "faq" : null}
                                onClick={() => {
                                    this.setActive("faq");
                                }}>FAQS</a>
                        </li>
                        {/* <li>
                        <Link to="" className={(this.state.activeState === "linkFaq") ? "linkFaq" : null}
                        onClick={() => {
                                        this.setActive("linkFaq");
                        }}>FAQs</Link>
                        </li>*/}
                    </div>
                </div>
                <div className="beta-navbar-contain">
                    <div className={this.state.hamburger ? "beta-home-navbar" : "beta-home-navbar beta-navbar-overlay beta-navbar-navbarToggle"} id={(this.props.background === true) ? "background-image-gradient" : null}>
                        <div style={{ display: this.props.logohide ? 'none' : 'block' }} className="beta-navbar-t-logo">
                            <Link to="/"> <img src={img} alt="" /></Link>
                        </div>
                        <div className="beta-navbar-t-ctos">
                            <div className="beta-navbar-toggle">
                                <div className={this.state.hamburger ? "beta-navbar-navtoggle fa fa-bars beta-navbar-navtoggle-both" : "fa fa-bars beta-navbar-navtoggle beta-navbar-navtoggle-mobile"} onClick={this.toggleHidden.bind(this)}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className={this.state.isHidden ? "list_" : "list_ beta-navbar-active"}>
                                {!this.state.isHidden && <List events={this.props.events === true ? true : null} />}
                            </div>
                            <div className="beta-navbar-int-ctos">
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}
export default Navbar
