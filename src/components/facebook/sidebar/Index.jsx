import React from 'react'
import FacebookImg from './img/fb.png'
import Facebook from './Svg/Facebook.jsx'
import { Link } from 'react-router-dom'
import FetchApi from '../../../utils/FetchAPI'
import AuthService from '../../../handlers/ca/temp/AuthService'
import boy from './img/boy.png'
import girl from './img/girl.png'
import { addCATopic } from '../../../utils/firebasePush'
import Post from './Svg/Post'
import Profile from './Svg/Profile.jsx'
import Logout from './Svg/Logout.jsx'
import './css/style.css'

let addTopicTimeout;
let showReferralTimeout;

export default class SidebarFacebook extends React.Component {
    constructor() {
        super()
        this.state = {
            activeState: window.location.pathname.substring(18),
            ok:false,
            facebookConnect: false,
            errors: '',
            total: 0
        }
        this.Auth = new AuthService()
        // if (!window.location.pathname.substring(18)) {
        //     this.state = {
        //         activeState: 'profile'
        //     }
        // }
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

    facebookLogin = () => {
        if (window.FB && !this.state.facebookConnect) {
            window.FB.login(response => {
                window.FB.api('/me?fields=id, picture.type(large), link', res => {
                    if(response.authResponse != null)
                    {
                        let accessToken = response.authResponse.accessToken;
                        let { id, link } = res;
                        let image = res.picture.data.url;
                        let data = { id, image, accessToken, link };
                        this.updateFBToken(data)
                    }
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
                        FetchApi('GET', '/api/ca/temp/UserPosts',null, token)
                            .then((result) => {
                                if (result.data && result.data.posts && result.data.posts.data && result.data.posts.data.length > 0) {
                                    this.setState({ userPosts: result.data.posts.data});
                                    if(this.state.userPosts)
                                    {
                                        this.setState({
                                            max: this.state.userPosts[0].likes.summary.total_count
                                        })
                                        this.state.userPosts.map(posts =>
                                            {
                                                if(posts.link)
                                                {
                                                    this.setState({
                                                        total : Number(this.state.total) + Number(posts.likes.summary.total_count)
                                                    })
                                                    if(posts.link && (posts.likes.summary.total_count > this.state.max))
                                                    {
                                                        this.setState({
                                                            max: posts.likes.summary.total_count
                                                        })
                                                    }
                                                }
                                            }
                                        )
                                    }
                                    this.props.setUserPosts(result.data.posts.data, this.state.max, this.state.total)
                                }
                            })
                            .catch(error => {
                            })
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

    componentDidMount() {
        addTopicTimeout = setTimeout(() => {
            addCATopic('tempCA');
        }, 2000)

        const token = this.Auth.getToken()
        FetchApi('GET', '/api/ca/temp/fbtoken', null, token)
            .then(r => {
                if (r && r.data) {
                    if (r.data.success) {
                        this.setState({ facebookConnect: true, errors: '' })
                    }
                    else
                    {
                    }
                } else {
                    this.setState({ errors: 'Something went wrong' })
                }
            })
            .catch(e => {
                this.setState({ errors: 'Something went wrong' })
            })

        if (this.props.userData && this.props.userData.image) {
            this.setState({ userImage: this.props.userData.image })
        }
    }

    setActive(state) {
        this.setState({ activeState: state })
    }

    render() {
        return (
            <div>
                <div id="mySidenav" className="sidenav" style={{ backgroundColor: 'white' }} >
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
                            <div className="text">{this.props.userData ? this.props.userData.name : 'User'}</div>
                            <div className="cname">{this.props.userData ? this.props.userData.college : '-'}</div>
                        </div>
                    </div>
                    {this.props.userData && this.props.userData.score ?
                    <div className="campusAmb-sidebar-line">
                    </div>
                    : null}
                    {/* {!this.state.facebookConnect ? */}
                    {/*     <div  className={ this.state.facebookConnect ? 'facebook-connected' : 'facebook-not-connected' }> */}
                    {/*         <div data-width="" data-size="large" className="fb-login-button" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true" data-scope="user_posts"></div> */}
                    {/*     </div>:null */}
                    {/* } */}
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
                            to="/campus/profile"
                            className={
                                this.state.activeState === 'profile'
                                    ? 'sideNavItem activeSideItem'
                                    : 'sideNavItem'
                            }
                            onClick={() => {
                                this.setActive('profile')
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
                            to="/campus/timeline"
                            className={
                                (this.state.activeState === 'recentUpdate')
                                    ? 'sideNavItem activeSideItem'
                                    : 'sideNavItem'
                            }
                            onClick={() => {
                                this.setActive('recentUpdate')
                            }}
                        >
                            <div className="campusAmb-sidebar-posts flex_row">
                                <div className="campusAmb-sidebar-svg-logo">
                                    <Post />
                                </div>
                                <div className="campusAmb-sidebar-navitem-name">
                                    TIMELINE
                                </div>
                            </div>
                        </Link>
                        <Link
                            to="/campus/logout"
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
                </div>
            </div>
        )
    }
}
