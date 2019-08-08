import React from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
// import "../../ca/sidebar/css/style.css";
import FetchApi from "../../../utils/FetchAPI";
import AuthService from "../../../handlers/ca/temp/AuthService";
import boy from "./img/boy.png";
import girl from "./img/girl.png";
import { addCATopic } from '../../../utils/firebasePush';
// import ReferralPoint from "./Svg/Referralpoint";
// import Bonus from "./Svg/Bonus";
// import Score from "./Svg/Score";
// import share from "./img/share.png"
// import score from "./img/star.png"
import Post from "./Svg/Post"
import Referral from "./Svg/Referral"
import Leader from "./Svg/Leader"
// import Events from "./Svg/Events"
import Guide from "./Svg/Guide"
import Contact from "./Svg/Contact"
import Logout from "./Svg/Logout"
import Bulb from "./Svg/Bulb"
// import Hand from "./Svg/Hand"
import Home from "../../main/sidebar/Svg/Home.jsx";
import Profile from "./Svg/Profile.jsx"
import FacebookImg from './img/fb.svg'
import Zonals from './Svg/Zonals'
import Facebook from './Svg/Facebook.jsx'
import Payment from "./Svg/Paysvg"

// import logoUser from '../common/images/user.svg';

let addTopicTimeout;
let showReferralTimeout;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referral: 'AVSHFSAD',
      activeState: window.location.pathname.substring(18),
      showReferral: false,
      errors: '',
      facebookConnect: false
    };
    this.Auth = new AuthService();
    if (!window.location.pathname.substring(18)) {
      this.state = {
        activeState: "profile"
      };
    }
  }

  facebookLogin = () => {
    if (window.FB && !this.state.facebookConnect) {
      window.FB.login(response => {
        window.FB.api('/me?fields=id, picture.type(large), link', res => {
          let accessToken = response.authResponse.accessToken;
          let { id, link } = res;
          let image = res.picture.data.url;
          let data = { id, image, accessToken, link };
          this.updateFBToken(data)
        })
      }, { scope: 'user_posts' });
    }
  }

  updateFBToken = data => {
    const token = this.Auth.getToken();
    FetchApi('PUT', '/api/ca/temp/fbtoken', data, token)
      .then(r => {
        if (r && r.data) {
          if (r.data.success) {
            this.setState({ facebookConnect: true, errors: '', userImage: data.image })
          } else {
            this.setState({ errors: r.data.msg })
          }
        } else {
          this.setState({ errors: 'Something went wrong' })
        }
      })
      .catch(e => {
        this.setState({ errors: 'Something went wrong' })
      });
  }

  componentWillUnmount() {
    clearTimeout(addTopicTimeout)
    clearTimeout(showReferralTimeout)
  }

  componentWillMount() {
    if (window.FB) {
      window.FB.init({
        appId: process.env.REACT_APP_FB_ID,
        status: true,
        xfbml: true
      });
    }
  }

  componentDidMount() {
    addTopicTimeout = setTimeout(() => {
      addCATopic('tempCA');
    }, 2000)

    const token = this.Auth.getToken();
    FetchApi('GET', '/api/ca/temp/fbtoken', null, token)
      .then(r => {
        if (r && r.data) {
          if (r.data.success) {
            this.setState({ facebookConnect: true, errors: '' })
          }
        } else {
          this.setState({ errors: 'Something went wrong' })
        }
      })
      .catch(e => {
        this.setState({ errors: 'Something went wrong' })
      });

    const countDownDate = new Date("Oct 27, 2018 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (days < 0) {
      days = 0;
    }
    this.setState({ days })

    if (this.props.userData && this.props.userData.image) {
      this.setState({ userImage: this.props.userData.image })
    }
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
        {this.state.showReferral ?
          <div style={{ position: 'fixed', display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', zIndex: '1000' }} >
            <div style={{ color: 'white', background: '#00000069', padding: '10px', borderRadius: '10px', fontWeight: '600' }}>
              Referral code copied to clipboard
            </div>
          </div>
          : null}
        <div
          id="mySidenav"
          className="sidenav"
          style={{ backgroundColor: 'white' }}
        >
          <div className="campusAmb-sidebar-user">
            {this.state.userImage ? <img src={this.state.userImage} className="image" alt="User" /> :
              <React.Fragment>
                {(this.props.userData && this.props.userData.gender === 'female') ?
                  <img src={girl} className="image" alt="User" /> :
                  <img src={boy} className="image" alt="User" />
                }
              </React.Fragment>
            }
            <div className="campusAmb-sidebar-user-details">
              <div className="text">{this.props.userData ? this.props.userData.name : "User"}</div>
              <div className="cname">{this.props.userData ? this.props.userData.college : "-"}</div>
            </div>
          </div>
          {this.props.userData && this.props.userData.score ?
            <div className="campusAmb-sidebar-line">
            </div>
            : null}
          {/*<div className="campusAmb-sidebar-like-share-score">
             {this.props.userData && this.props.userData.score ?
              <div className="campusAmb-sidebar-like-share-score-child">
                <div className="campusAmb-sidebar-likes">
                  <div className="campusAmb-sidebar-likes-child">
                    <div className="campusAmb-sidebar-likes-grandchild">
                      <div className="campusAmb-sidebar-likes-grandchild-number">
                        {this.props.userData ? this.props.userData.referrals : "0"}
                      </div>
                      <div className="campusAmb-sidebar-svg-logo">
                        <ReferralPoint />
                      </div>
                    </div>
                  </div>
                  <div className="campusAmb-sidebar-likes-number">
                    REFFERALS
                  </div>
                </div>
                <div className="campusAmb-sidebar-shares">
                  <div className="campusAmb-sidebar-likes-child">
                    <div className="campusAmb-sidebar-likes-grandchild-number">
                      {this.props.userData ? this.props.userData.bonus : "0"}
                    </div>
                    <div className="campusAmb-sidebar-svg-logo">
                      <Bonus />
                    </div>
                  </div>
                  <div className="campusAmb-sidebar-likes-number">
                    BONUS
                  </div>
                </div>
                <div className="campusAmb-sidebar-score">
                  <div className="campusAmb-sidebar-likes-child">
                    <div className="campusAmb-sidebar-likes-grandchild-number">
                      {this.props.userData ? this.props.userData.score : "0"} </div> <div className="campusAmb-sidebar-svg-logo">
                      <Score />
                    </div>
                  </div>
                  <div className="campusAmb-sidebar-likes-number">
                    SCORE
                </div>
                </div>
              </div>
            : null}*/}
          {/* <div className="campusAmb-sidebar-updatenews">
              *Scores will be updated at 12 am
            </div> 
          </div>*/}
          {!this.state.facebookConnect ?
            <div>
              <div className="campusAmb-sidebar-contents">
                <div
                  className={
                    this.state.facebookConnect
                      ? "sideNavItem activeSideItem"
                      : "facebooksideNavItem"
                  }
                  onClick={this.facebookLogin}
                >
                  <div className="campusAmb-sidebar-facebook flex_row">
                    <div className="campusAmb-sidebar-svg-logo mobile-facebook">
                      <Facebook />
                    </div>
                    <div className="campusAmb-sidebar-navitem-name">
                      <img src={FacebookImg} alt="CONNECT WITH FACEBOOK" className="facebook-connect-image" />
                    </div>
                  </div>
                </div>
                {this.state.errors ?
                  <div>
                    {this.state.errors}
                  </div>
                  : null
                }
              </div>
            </div> : null
          }
          <div className="campusAmb-sidebar-line">
          </div>
          <div className="campusAmb-sidebar-contents">
            <Link
              to="/CampusAmbassador"
              className={
                this.state.activeState === "profile"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("profile");
              }}
            >
              <div className="campusAmb-sidebar-profile flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Profile />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  PROFILE
                </div>
              </div>
            </Link>
            <Link
              to="/CampusAmbassador/recentupdates"
              className={
                (this.state.activeState === "recentUpdate")
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("recentUpdate");
              }}
            >
              <div className="campusAmb-sidebar-posts flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Post />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  RECENT UPDATES
                </div>
              </div>
            </Link>

            <Link
              to="/CampusAmbassador/leaderboard"
              className={
                this.state.activeState === "leaderboard"
                  ? "sideNavItem activeSideItem "
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("leaderboard");
              }}
            >
              <div className="campusAmb-sidebar-leaderboard flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Leader />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  LEADERBOARD
                </div>
              </div>
            </Link>
            <Link
              to="/CampusAmbassador/guidelines"
              className={
                this.state.activeState === "guidelines"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("guidelines");
              }}
            >
              <div className="campusAmb-sidebar-guide flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Guide />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  GUIDELINES
                </div>
              </div>
            </Link>
            <Link
              to="/CampusAmbassador/ideas"
              className={
                this.state.activeState === "ideas"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("ideas");
              }}
            >
              <div className="campusAmb-sidebar-ideas flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Bulb />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  IDEAS
                </div>
              </div>
            </Link>
            {/* <Link
              to="/CampusAmbassador/events"
              className={
                this.state.activeState === "events"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("events");
              }}
            >
              <div className="campusAmb-sidebar-events flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Events />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  EVENTS
                </div>
              </div>
            </Link> */}
            <Link
              to="/CampusAmbassador/zonals"
              className={
                this.state.activeState === "zonals"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("zonals");
              }}
            >
              <div className="campusAmb-sidebar-zonals flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Zonals />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  ZONALS
                </div>
              </div>
            </Link>
            <Link
              to="/CampusAmbassador/contact"
              className={
                this.state.activeState === "contact"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("contact");
              }}
            >
              <div className="campusAmb-sidebar-contactus flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Contact />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  CONTACT US
                </div>
              </div>
            </Link>
            <Link
              to="/CampusAmbassador/payment"
              className={
                this.state.activeState === "payment"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("payment");
              }}
            >
              <div className="campusAmb-sidebar-payment flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Payment />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  PAYMENT
                </div>
              </div>
            </Link>
            {(this.props.userData && this.props.userData.ca_id) ?
              <div
                className="sideNavItem re" onClick={() => {
                  const el = document.createElement('textarea');
                  el.value = this.props.userData.ca_id;
                  el.setAttribute('readonly', '');
                  el.style.position = 'absolute';
                  el.style.left = '-9999px';
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand('copy');
                  document.body.removeChild(el);
                  this.setState({ showReferral: true })
                  showReferralTimeout = setTimeout(() => {
                    this.setState({ showReferral: false })
                  }, 1000)
                }}
              >
                <Link
                  to="/CampusAmbassador/referral"
                  className={
                    this.state.activeState === "referral"
                      ? "sideNavItem activeSideItem"
                      : "sideNavItem"
                  }
                  onClick={() => {
                    this.setActive("referral");
                  }}
                >
                  <div className="referral flex_row" title="Click to copy">
                    <div className="campusAmb-sidebar-svg-logo">
                      <Referral />
                    </div>
                    <div className="campusAmb-sidebar-navitem-name">
                      REFERRAL CODE : <span id="ca-referral-code">{this.props.userData.ca_id}</span>
                    </div>
                  </div>
                </Link>
              </div>
              : null}
            <Link
              to="/"
              className={
                this.state.activeState === "home"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("home");
              }}
            >
              <div className="campusAmb-sidebar-home flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Home />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  HOME
                </div>
              </div>
            </Link>
            <Link
              to="/CampusAmbassador/logout"
              className={
                this.state.activeState === "logout"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("logout");
              }}
            >
              <div className="campusAmb-sidebar-logout flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Logout />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  LOGOUT
                </div>
              </div>
            </Link>
          </div>
          {/* <div className="campusAmb-sidebar-hand flex_row">
            <div className="campusAmb-sidebar-hand-child">
              <div className="campusAmb-sidebar-svg-logo">
                <Hand />
              </div>
              <div className="campusAmb-sidebar-hand-days">
                {this.state.days} DAYS LEFT
            </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
