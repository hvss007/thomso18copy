import React from "react";
import { Link } from "react-router-dom";

import { addCATopic } from '../../../utils/firebasePush';
import FetchApi from '../../../utils/FetchAPI';
import AuthService from '../../../handlers/main/AuthService';

// import UpdateImage from './UpdateImage'

import "./css/style.css";

import Profile from "./Svg/Profile"
import Workshop from "./Svg/Workshop"
import Events from "../../campusAmbassador/sidebar/Svg/Events"
import Contact from "../../campusAmbassador/sidebar/Svg/Contact"
import Logout from "../../campusAmbassador/sidebar/Svg/Logout"
import Home from "./Svg/Home"
import Post from "./Svg/Post"
import Bulb from "./Svg/Bulb"
import boy from "./img/boy.png";
import girl from "./img/girl.png";
import Payment from "../../campusAmbassador/sidebar/Svg/Paysvg"

let addTopicTimeout;

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            referral: 'AVSHFSAD',
            activeState: window.location.pathname.substring(6),
            errors: '',
            user: '',
            file: '',
            imagePreviewUrl: '',
            disabled: true,
            days: 0
        };
        this.Auth = new AuthService();
        if (!window.location.pathname.substring(6)) {
            this.state = {
                activeState: "profile"
            };
        }
    }
    componentWillMount() {
        if (process.env.REACT_APP_SERVER_ENVIORNMENT === "dev" && this.props.userData && this.props.userData.image) {
            this.setState({ user: 'https://localhost:' + process.env.REACT_APP_SERVER_PORT + '/uploads/img/ProfileImage/' + this.props.userData.image })
        }
        else if (this.props.userData && this.props.userData.image) {
            this.setState({ user: '/uploads/img/ProfileImage/' + this.props.userData.image })
        }
        else {
            if (this.props.userData.gender === "male") { this.setState({ user: boy }) }
            else { this.setState({ user: girl }) }
        }
        clearTimeout(addTopicTimeout)
    }

    componentDidMount() {
        addTopicTimeout = setTimeout(() => {
            addCATopic('tempCA');
        }, 2000)

        const countDownDate = new Date("Oct 27, 2018 00:00:00").getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        if (days < 0) {
            days = 0;
        }
        this.setState({ days })
    }

    setActive(state) {
        this.setState({ activeState: state });
    }

    copytoclipboard = () => {
        let Field = this.state.referral;
        Field.execCommand('copy');
        Field.remove()
    }

    triggerFileSelect = () => {
        const button = document.getElementById("updateimage-file-input")
        if (button) {
            button.click()
        }
    }

    handleImageChange(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file) {
            if (file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png") {
                this.setState({errors: 'Image Format not supported' })
            } else if (file.size < 101200) {
                reader.onloadend = (e) => {
                    const img = document.createElement("img");
                    img.onload = () => {
                        const data = {
                            image: reader.result,
                            format: file.type
                        }
                        const token = this.Auth.getToken()
                        if (data.image && data.format) {
                            this.setState({ disabled: true, errors: '' })
                            FetchApi('post', '/api/main/updateImage', data, token)
                                .then(res => {
                                    if (res && res.data && res.data.success && res.data.body) {
                                        if (process.env.REACT_APP_SERVER_ENVIORNMENT === "dev") {
                                            this.setState({ user: 'https://localhost:' + process.env.REACT_APP_SERVER_PORT + res.data.body +'?'+ new Date().getTime(), errors: "", disabled: false })
                                        }
                                        else {
                                            this.setState({ user: res.data.body +'?'+ new Date().getTime(), disabled: false })
                                        }
                                    }
                                    else {
                                        this.setState({ disabled: false, errors: 'Unable to upload' })
                                    }
                                })
                                .catch(err => {
                                    this.setState({ disabled: false, errors: 'Image too Large' })
                                });
                        }
                    
                    }
                    img.src = e.target.result;
                }
                reader.readAsDataURL(file)
            } else {
                reader.onloadend = (e) => {
                    const img = document.createElement("img");
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
        
                        const MAX_WIDTH = 300;
                        const MAX_HEIGHT = 300;
        
                        let width = img.width;
                        let height = img.height;
        
                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx2 = canvas.getContext("2d");
                        ctx2.drawImage(img, 0, 0, width, height);
                        const dataurl = canvas.toDataURL("image/png");

                        const data = {
                            image: dataurl,
                            format: "image/png"
                        }
                        const token = this.Auth.getToken()
                        if (data.image && data.format) {
                            this.setState({ disabled: true, errors: '' })
                            FetchApi('post', '/api/main/updateImage', data, token)
                                .then(res => {
                                    if (res && res.data && res.data.success && res.data.body) {
                                        if (process.env.REACT_APP_SERVER_ENVIORNMENT === "dev") {
                                            this.setState({ user: 'https://localhost:' + process.env.REACT_APP_SERVER_PORT + res.data.body +'?'+ new Date().getTime(), errors: "", disabled: false })
                                        }
                                        else {
                                            this.setState({ user: res.data.body +'?'+ new Date().getTime(), disabled: false })
                                        }
                                    }
                                    else {
                                        this.setState({ disabled: false, errors: 'Unable to upload' })
                                    }
                                })
                                .catch(err => {
                                    this.setState({ disabled: false, errors: 'Image too Large' })
                                });
                        }
                    }
                    img.src = e.target.result;
                }
                reader.readAsDataURL(file)
            }
        }
    }

    render() {
        let { user, disabled } = this.state
        return (
<div>
    <div
        id="mySidenav"
        className="sidenav"
        style={{ backgroundColor: 'white' }}
    >
        <div className="main-sidebar-user">
            <div className="main-sidebar-user-child">
                <div className="upload-image-parent-div">
                    <img src={user} className="image" alt="User" onClick={() => this.triggerFileSelect()}/>
                </div>
            </div>
            <div className="main-sidebar-user-details">
                <div className="text">{this.props.userData ? this.props.userData.name : "User"}</div>
                <div className="cname">{this.props.userData ? this.props.userData.college : "-"}</div>
                <div>
                    <form>
                        <div>
                            <input
                                className="updateimage-file-input"
                                id="updateimage-file-input"
                                name="file"
                                type="file"
                                onChange={(e) => this.handleImageChange(e)}
                                accept=""
                                disabled={disabled}
                            />
                        </div>
                    </form>
                    <small>{this.state.errors}</small>
                </div>
            </div>
        </div>
        <div className="main-sidebar-line">
        </div>
      <div className="main-sidebar-contents">
          <Link
              to="/main/"
              className={
                  (this.state.activeState === "profile")
                      ? "sideNavItem activeSideItem"
                      : "sideNavItem"
              }
              onClick={() => {
                  this.setActive("profile");
              }}
          >
              <div className="main-sidebar-profile flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Profile />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      PROFILE
                  </div>
              </div>
          </Link>
          <Link
              to="/events"
              className="sideNavItem"
          >
              <div className="main-sidebar-events flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Events />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      EVENTS
                  </div>
              </div>
          </Link>
          <Link
              to="/main/contact"
              className={
                  this.state.activeState === "contact"
                      ? "sideNavItem activeSideItem"
                      : "sideNavItem"
              }
              onClick={() => {
                  this.setActive("contact");
              }}
          >
              <div className="main-sidebar-contactus flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Contact />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      CONTACT US
                  </div>
              </div>
          </Link>
          <Link
              to="/main/post"
              className={
                  (this.state.activeState === "post")
                      ? "sideNavItem activeSideItem"
                      : "sideNavItem"
              }
              onClick={() => {
                  this.setActive("post");
              }}
          >
              <div className="main-sidebar-profile flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Post />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      RECENT UPDATES
                  </div>
              </div>
          </Link>
          <Link
              to="/main/zonals"
              className={
                  (this.state.activeState === "zonals")
                      ? "sideNavItem activeSideItem"
                      : "sideNavItem"
              }
              onClick={() => {
                  this.setActive("zonals");
              }}
          >
              <div className="main-sidebar-ideas flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Bulb />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      ZONALS
                  </div>
              </div>
          </Link>
          <Link
              to="/"
              className="sideNavItem"
          >
              <div className="main-sidebar-profile flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Home />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      HOME
                  </div>
              </div>
          </Link>
          <Link
              to="/main/workshops"
              className={
                  this.state.activeState === "workshops"
                      ? "sideNavItem activeSideItem"
                      : "sideNavItem"
              }
              onClick={() => {
                  this.setActive("workshops");
              }}
          >
              <div className="main-sidebar-workshop flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Workshop />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      WORKSHOPS
                  </div>
              </div>
          </Link>
          <Link
              to="/main/payment"
              className={
                  this.state.activeState === "payment"
                      ? "sideNavItem activeSideItem"
                      : "sideNavItem"
              }
              onClick={() => {
                  this.setActive("payment");
              }}
          >
              <div className="main-sidebar-payment flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Payment />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      PAYMENT
                  </div>
              </div>
          </Link>
          <Link
              to="/main/certificates"
              className={
                  this.state.activeState === "certificates"
                      ? "sideNavItem activeSideItem"
                      : "sideNavItem"
              }
              onClick={() => {
                  this.setActive("certificates");
              }}
          >
              <div className="main-sidebar-payment flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Payment />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      CERTIFICATES
                  </div>
              </div>
          </Link>
          <Link
              to="/main/logout"
              className={
                  this.state.activeState === "logout"
                      ? "sideNavItem activeSideItem"
                      : "sideNavItem"
              }
              onClick={() => {
                  this.setActive("logout");
              }}
          >
              <div className="main-sidebar-logout flex_row">
                  <div className="main-sidebar-svg-logo">
                      <Logout />
                  </div>
                  <div className="main-sidebar-navitem-name">
                      LOGOUT
                  </div>
              </div>
          </Link>
      </div>
  </div>
      </div >
  );
  }
  }
