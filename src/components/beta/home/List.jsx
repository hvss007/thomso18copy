import React, { Component } from "react";
import { Link } from 'react-router-dom';

import AuthService from "../../../handlers/main/AuthService";
import "./src/css/List.css";

class List extends Component {
    constructor() {
        super();
        this.state = {
            activeStateLink: window.location.pathname.substring(1),
            isAuthenticated: false
        };
        this.setActiveLink = this.setActiveLink.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
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
    }
    setActiveLink(state) {
        this.setState({
            activeStateLink: state
        })

    }
    render() {
        return (
            <ul className="beta-home-list">
                <li>
                    <Link to="/main" className={(this.state.activeStateLink === "main") ? "list-spons-link" : null}
                        onClick={() => {
                            this.setActiveLink("main")
                        }}>
                        {this.state.isAuthenticated ? 'DASHBOARD' : 'REGISTER'}
                    </Link>
                </li>
                {this.props.events === "true" ? null : <li>
                    <Link to="/events" className={(this.state.activeStateLink === "events") ? "list-spons-link" : null}
                        onClick={() => {
                            this.setActiveLink("events")
                        }}>
                        EVENTS
                     </Link>
                </li>}
                <li>
                    <Link to="/onlineevents" className={(this.state.activeStateLink === "onlineevents") ? "list-quiz-link" : null}
                        onClick={() => {
                            this.setActiveLink("onlinevents");
                        }}>
                        ONLINE EVENTS
                    </Link>
                </li>
                {this.props.events === "true" ? null : <li>
                    <Link to="/mun" className={(this.state.activeStateLink === "mun") ? "list-zonals-link" : null}
                        onClick={() => {
                            this.setActiveLink("mun")
                        }}>
                        IITR MUN
                    </Link>
                </li>}
                {this.props.events === "true" ? null : <li>
                    <Link to="../campusambassador" className={(this.state.activeStateLink
                        === "list-ca-link") ? "list-ca-link" : null}
                        onClick={() => {
                            this.setActiveLink("list-ca-link")
                        }}>
                        CAMPUS AMBASSADOR
                    </Link>
                </li>}
                {/*       <li>
          <a href="">ZONALS</a>
        </li>*/}

                {/*<li>
          <a href="">OFFINE EVENTS</a>
        </li>*/}
                {/* <li>
          <a href="">TEAM CONTACT</a>
        </li>*/}
                {this.props.events === "true" ? null : <li>
                    <Link to="/associate" className={(this.state.activeStateLink === "linkAssociate") ? "list-spons-link" : null}
                        onClick={() => {
                            this.setActiveLink("linkAssociate")
                        }}>
                        ASSOCIATE WITH US
                     </Link>
                </li>}
                {this.props.events === "true" ? null : <li>
                    <Link to="/zonals" className={(this.state.activeStateLink === "zonals") ? "zonals" : null}
                        onClick={() => {
                            this.setActiveLink("zonals")
                        }}>
                        ZONALS
                     </Link>
                </li>}
                {this.props.events === "true" ? null : <li>
                    <Link to="/payment" className={(this.state.activeStateLink === "linkpayment") ? "list-payment-a" : null}
                        onClick={() => {
                            this.setActiveLink("payment")
                        }}>
                        PAYMENT
            </Link>
                </li>}
                {this.props.events === "true" ? null : <li>
                    <Link to="/whythomso" className={(this.state.activeStateLink === "linkBlog") ? "list-blog-link" : null}
                        onClick={() => {
                            this.setActiveLink("linkBlog")
                        }}>
                        WHY THOMSO
                    </Link>
                </li>}
                {this.props.events === "true" ? null : <li>
                    <Link to="/whythomso#faqs" className={(this.state.activeStateLink === "faqs") ? "faqs" : null}
                        onClick={() => {
                            this.setActiveLink("faqs")
                        }}>
                        FAQS
                    </Link>
                </li>}


                {/* <li>
          <a href="">FAQs</a>
        </li>*/}
            </ul>
        );
    }
}

export default List;
