import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";

import FetchApi from "../../utils/FetchAPI";
import AuthService from "../../handlers/coordinators/AuthService";
import Loader from "../common/Loader";

const Loading = ({ error }) => {
    if (error)
        return <div>Error loading component</div>;
    else
        return <Loader />;
};

// const HomeIndex = Loadable({
//     loader: () => import("./home/Index.jsx"),
//     loading: Loading
// });

const LoginIndex = Loadable({
    loader: () => import("./login/Index.jsx"),
    loading: Loading
});

const RegisterIndex = Loadable({
    loader: () => import("./register/Index"),
    loading: () => <Loader/>
});

const AddWinnerIndex = Loadable({
    loader: () => import("./addWinner/Index"),
    loading: () => <Loader/>
});

const ShowWinnerIndex = Loadable({
    loader: () => import("./showWinner/Index"),
    loading: () => <Loader/>
});
const ParticipantsIndex = Loadable({
    loader: () => import("./participants/Index"),
    loading: () => <Loader/>
});
const LogoutIndex = Loadable({
    loader: () => import("./logout/Index"),
    loading: () => <Loader/>
});
const CoCoordinatorIndex = Loadable({
    loader: () => import("./cocoordinator/Index"),
    loading: () => <Loader/>
}); 
const ShowCoCoordinatorIndex = Loadable({
    loader: () => import("./showCoCoordinator/Index"),
    loading: () => <Loader/>
}); 


export default class MainIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            userData: [],
            errors:""
        }
        this.Auth = new AuthService();
    }
    
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('GET', '/api/coordinators/info', null, token)
                .then(r => {
                    if (r && r.data && r.data.success && r.data.body) {
                        this.setState({isAuthenticated:true, userData: r.data.body });
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    handleUpdate = (isAuthenticated) => {
        this.setState({ isAuthenticated})
    };

    setUserData = data => {
        this.setState({
            userData: data
        });
    };
   
    render() {
        let { isAuthenticated, userData} = this.state;
        return (
            <React.Fragment>
                {isAuthenticated ? 
                    <React.Fragment>
                        <Route exact path="/coordinators" render={props => (<AddWinnerIndex {...props} userData={userData} />)}  />
                        <Route exact path="/coordinators/participants" render={props => (<ParticipantsIndex {...props} userData={userData} />)}  />
                        <Route exact path="/coordinators/showWinner" render={props => (<ShowWinnerIndex {...props} userData={this.state.userData} />)} />
                        <Route exact path="/coordinators/showCoCOordinator" render={props => (<ShowCoCoordinatorIndex {...props} userData={this.state.userData} />)} />
                        <Route exact path="/coordinators/cocoordinator" render={props => (<CoCoordinatorIndex {...props} userData={this.state.userData} />)} />
                        <Route exact path="/coordinators/logout" render={props => (<LogoutIndex {...props} updateRoutes={this.handleUpdate} />)} />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Route exact path="/coordinators" render={props => (<LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} />
                        <Route exact path="/coordinators/register" component={RegisterIndex} />
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }

}
