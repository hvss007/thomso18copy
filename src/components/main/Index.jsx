import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";

import FetchApi from "../../utils/FetchAPI";
import AuthService from "../../handlers/main/AuthService";
import Loader from "../common/Loader";

const Loading = ({ error }) => {
    if (error)
        return <div>Error loading component</div>;
    else
        return <Loader />;
};

const AdminIndex = Loadable({
    loader: () => import("./admin/Index"),
    loading: Loading
});

const RegisterIndex = Loadable({
    loader: () => import("./registration/Index"),
    loading: Loading
});
const SidebarIndex = Loadable({
    loader: () => import("./sidebar/Index"),
    loading: Loading
});
const LoginIndex = Loadable({
    loader: () => import("./login/Index"),
    loading: Loading
});

const VerifyIndex = Loadable({
    loader: () => import("./verify/Index"),
    loading: Loading
});
const HomeIndex = Loadable({
    loader: () => import("./home/Index"),
    loading: Loading
});

const ContactIndex = Loadable({
    loader: () => import("./contactus/Index"),
    loading: Loading
});

const Profile = Loadable({
    loader: () => import("./profile/Index"),
    loading: Loading
});

const LogoutIndex = Loadable({
    loader: () => import("./logout/Index"),
    loading: Loading
});

const ResetPasswordEmailIndex = Loadable({
    loader: () => import("./resetPasswordEmail/Index"),
    loading: Loading
});

const ResetPasswordIndex = Loadable({
    loader: () => import("./resetPassword/Index"),
    loading: Loading
});

const ZonalsMainIndex = Loadable({
    loader: () => import("../campusAmbassador/zonals/Index"),
    loading: Loading
});

const PostIndex = Loadable({
    loader: () => import("./../campusAmbassador/posts/Index"),
    loading: Loading
});

const PaymentIndex = Loadable({
    loader: () => import("./payment/Index"),
    loading: Loading
});
const WorskhopsIndex = Loadable({
    loader: () => import('./workshops/Index'),
    loading: () => <Loader />
})
const CertificateIndex = Loadable({
    loader: () => import('./certificates/Index'),
    loading: () => <Loader />
})
export default class MainIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            verified: false,
            userData: ""
        }
        this.Auth = new AuthService();
    }

    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('GET', '/api/main/user', null, token)
                .then(r => {
                    // console.log(r.data.body)
                    if (r && r.data && r.data.body) {
                        // console.log(r.data.body)
                        if (r.data.isVerified) {
                            this.setState({ isAuthenticated: true, verified: true, userData: r.data.body });
                        } else {
                            this.setState({ isAuthenticated: true, verified: false })
                            this.props.history.push('/main/verify')
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    handleUpdate = (isAuthenticated, verified) => {
        this.setState({ isAuthenticated, verified })
    };

    setUserData = data => {
        this.setState({
            userData: data
        });
    };

    render() {
        return (
            <React.Fragment>
                <Route path="/main/admin" component={AdminIndex} />
                {this.state.isAuthenticated ?
                    <React.Fragment>
                        {!this.state.verified ?
                            <React.Fragment>
                                <Route exact path="/main" render={props => (<VerifyIndex {...props} userData={this.state.userData} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} />
                                <Route exact path="/main/verify" render={props => (<VerifyIndex {...props} userData={this.state.userData} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} />
                            </React.Fragment>
                            :
                            <React.Fragment>
                                {/* {console.log(this.state.userData)} */}
                                <Route path="/main" render={props => (<SidebarIndex {...props} userData={this.state.userData} />)} />
                                <Route exact path="/main" render={props => (<Profile {...props} userData={this.state.userData} />)} />
                                <Route exact path="/main/contact" render={props => (<ContactIndex {...props} main={true} userData={this.state.userData} />)} />
                                <Route exact path="/main/post" component={PostIndex} />
                                <Route exact path="/main/payment" component={PaymentIndex} />
                                <Route exact path="/main/zonals" render={props => (<ZonalsMainIndex  {...props} mainBackground="true" />)} />
                                <Route exact path="/main/workshops" component={WorskhopsIndex} />
                                <Route exact path="/main/certificates" component={CertificateIndex} />
                            </React.Fragment>
                        }
                        <Route exact path="/main/logout" render={props => (<LogoutIndex {...props} updateRoutes={this.handleUpdate} />)} />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Route exact path="/main" component={HomeIndex} />
                        <Route exact path="/main/register" render={props => (<RegisterIndex {...props} updateRoutes={this.handleUpdate} />)} />
                        <Route exact path="/main/resetPassword" component={ResetPasswordIndex} />
                        <Route exact path="/main/resetPasswordEmail" component={ResetPasswordEmailIndex} />
                        <Route exact path="/main/login" render={props => (<LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} />
                    </React.Fragment>
                }


            </React.Fragment>
        )
    }

}
