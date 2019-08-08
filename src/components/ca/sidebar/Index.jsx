import React from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import boy from "./img/boy.png";
import like from "./img/like.png"
import share from "./img/share.png"
import score from "./img/star.png"
import Post from "./Svg/Post"
import Referral from "./Svg/Referral"
import Leader from "./Svg/Leader"
import Guide from "./Svg/Guide"
import Contact from "./Svg/Contact"
import Logout from "./Svg/Logout"
import Bulb from "./Svg/Bulb"
import Hand from "./Svg/Hand"

// import logoUser from '../common/images/user.svg';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referral: 'AVSHFSAD',
      activeState: window.location.pathname.substring(4),
      days: 0
    };
    if (!window.location.pathname.substring(4)) {
      this.state = {
        activeState: "home"
      };
    }
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

  setActive(state) {
    this.setState({ activeState: state });
  }

  copytoclipboard = () => {
    let Field = this.state.referral;
    Field.execCommand('copy');
    Field.remove()
  }
  render() {
    return (
      <div>
        <div
          id="mySidenav"
          className="sidenav"
          style={(this.props.userData && this.props.userData.gender === "female") ? { backgroundColor: 'Pink' } : { backgroundColor: '#00ff95d9' }}
        >
          <div className="sidebar-user">
            <img src={this.props.userData ? this.props.userData.image : boy} className="image" alt="dataImg" />
            <div className="sidebar-user-details">
              <div className="text">{this.props.userData ? this.props.userData.name : "User"}</div>
              <div className="cname">{this.props.userData ? this.props.userData.college : "-"}</div>
            </div>
          </div>
          <div className="sidebar-line">
          </div>
          <div className="sidebar-like-share-score">
            <div className="sidebar-like-share-score-child">
              <div className="sidebar-likes">
                <div className="sidebar-likes-child">
                  <div>
                    {this.props.userData ? this.props.userData.likes : "0"}
                  </div>
                  <img src={like} alt="like" />
                </div>
                <div className="sidebar-likes-number">
                  LIKES
                </div>
              </div>
              <div className="sidebar-shares">
                <div className="sidebar-likes-child">
                  <div className="sidebar-likes-shares-score-data">
                    {this.props.userData ? this.props.userData.shares : "0"}
                  </div>
                  <img src={share} alt="share" />
                </div>
                <div className="sidebar-likes-number">
                  SHARES
                </div>
              </div>
              <div className="sidebar-score">
                <div className="sidebar-likes-child">
                  <div className="sidebar-likes-shares-score-data">
                    {this.props.userData ? this.props.userData.score : "0"}
                  </div>
                  <img src={score} alt="score" />
                </div>
                <div className="sidebar-likes-number">
                  SCORES
                </div>
              </div>
            </div>
            <div className="sidebar-updatenews">
              *Scores will be updated at 12 am
            </div>
          </div>
          <div className="sidebar-line">
          </div>
          <div className="sidebar-contents">
            <Link
              to="/ca/"
              className={
                (this.state.activeState === "home")
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("home");
              }}
            >
              <div className="sidebar-posts flex_row">
                <div className="sidebar-svg-logo">
                  <Post />
                </div>
                <div className="sidebar-navitem-name">
                  POSTS
                </div>
              </div>
            </Link>
            <Link
              to="/ca/leaderboard"
              className={
                this.state.activeState === "leaderboard"
                  ? "sideNavItem activeSideItem "
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("leaderboard");
              }}
            >
              <div className="sidebar-leaderboard flex_row">
                <div className="sidebar-svg-logo">
                  <Leader />
                </div>
                <div className="sidebar-navitem-name">
                  LEADERBOARD
                </div>
              </div>
            </Link>
            <Link
              to="/ca/timeline"
              className={
                this.state.activeState === "timeline"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("timeline");
              }}
            >
              <div className="sidebar-guide flex_row">
                <div className="sidebar-svg-logo">
                  <Guide />
                </div>
                <div className="sidebar-navitem-name">
                  TIMELINE
                </div>
              </div>
            </Link>
            <Link
              to="/ca/ideas"
              className={
                this.state.activeState === "ideas"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("ideas");
              }}
            >
              <div className="sidebar-ideas flex_row">
                <div className="sidebar-svg-logo">
                  <Bulb />
                </div>
                <div className="sidebar-navitem-name">
                  IDEAS
                </div>
              </div>
            </Link>
            {/* <Link
              to="/ca/certificate"
              className={
                this.state.activeState === "certificate"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("certificate");
              }}
            >
              <div className="sidebar-certificate flex_row">
                <div className="sidebar-svg-logo">
                  <Certificate /> 
                </div>
                <div className="sidebar-navitem-name">
                  CERTIFICATE
                </div>
              </div>
            </Link> */}
            <Link
              to="/ca/contact"
              className={
                this.state.activeState === "contact"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("contact");
              }}
            >
              <div className="sidebar-contactus flex_row">
                <div className="sidebar-svg-logo">
                  <Contact />
                </div>
                <div className="sidebar-navitem-name">
                  CONTACT US
                </div>
              </div>
            </Link>
            <Link
              to="/ca/logout"
              className={
                this.state.activeState === "logout"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("logout");
              }}
            >
              <div className="sidebar-logout flex_row">
                <div className="sidebar-svg-logo">
                  <Logout />
                </div>
                <div className="sidebar-navitem-name">
                  LOGOUT
                </div>
              </div>
            </Link>
            <div
              className="sideNavItem re"
            >
              <div onClick={() => { window.location.href = this.props.userData.link }} className="referral flex_row" title="Click to copy">
                <div className="sidebar-svg-logo">
                  <Referral />
                </div>
                <div className="sidebar-navitem-name">
                  VISIT FACEBOOK PROFILE
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-hand flex_row">
            <div className="sidebar-hand-child">
              <div className="sidebar-svg-logo">
                <Hand />
              </div>
              <div className="sidebar-hand-days">
                {this.state.days} DAYS LEFT
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
