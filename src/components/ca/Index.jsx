import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import Sidebar from "./sidebar/Index";

import AuthService from "../../handlers/ca/AuthService";
import FetchApi from '../../utils/FetchAPI';

// import LoginIndex from './login/Index';
import Loader from "../common/Loader";

const Loading = ({ error }) => {
  if (error) {
    return <div>Error loading component</div>;
  } else {
    return <Loader />;
  }
};

const AdminIndex = Loadable({
  loader: () => import("./admin/Index"),
  loading: Loading
});

const LogoutIndex = Loadable({
  loader: () => import("./logout/Index"),
  loading: Loading
});

// const RegisterIndex = Loadable({
//   loader: () => import("./register/Index"),
//   loading: Loading
// });

const HomeIndex = Loadable({
  loader: () => import("./home/Index"),
  loading: Loading
});

const LeaderboardIndex = Loadable({
  loader: () => import("./leaderboard/Index"),
  loading: Loading
});

const ContactIndex = Loadable({
  loader: () => import("./contactus/Index"),
  loading: Loading
});

const IdeasIndex = Loadable({
  loader: () => import("./ideas/Index"),
  loading: Loading
});

// const LoginIndex = Loadable({
//   loader: () => import("./login/Index"),
//   loading: Loading
// });

const TimelineIndex = Loadable({
  loader: () => import("./timeline/Index"),
  loading: Loading
});

export default class CAIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: "",
      isAuthenticated: false,
      string: window.location.pathname.substring(4, 9)
    };
    this.Auth = new AuthService();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillMount() {
    const isAuthenticated = this.Auth.hasToken();
    console.log(isAuthenticated, "isAuthenticated");
    if (isAuthenticated) {
      const token = this.Auth.getToken()
      FetchApi('GET', '/api/ca/auth/fbData', null, token)
        .then(r => {
          if (r && r.data && r.data.body) {
            this.setState({ isAuthenticated, userData: r.data.body });
          }
        })
        .catch(e => console.log(e));
    }
  }

  handleUpdate = isAuthenticated => {
    this.setState({ isAuthenticated });
  };

  // Bug: This makes all the routes re-render
  // Use redux to prevent re-render
  setUserData = data => {
    this.setState({
      userData: data
    });
  };
  render() {
    return (
      <React.Fragment >
        <Route path="/ca/admin" component={AdminIndex} />
        {this.state.isAuthenticated ? (
          <div>
            {this.state.string === "admin" ? null :
              <Route path="/ca/" render={props => (<Sidebar {...props} userData={this.state.userData} />)} />
            }
            <Route exact path="/ca/logout" render={props => (<LogoutIndex {...props} updateRoutes={this.handleUpdate} />)} />
            <Route exact path="/ca/leaderboard" render={props => (<LeaderboardIndex {...props} userData={this.state.userData} />)} />
            <Route exact path="/ca/timeline" component={TimelineIndex} />
            <Route exact path="/ca/contact" render={props => (<ContactIndex {...props} userData={this.state.userData} />)} />
            <Route exact path="/ca/ideas" component={IdeasIndex} />
            <Route exact path="/ca/" component={HomeIndex} />
            
          </div>
        ) : (
            <div>
              {/* <Route exact path="/ca/register" render={props => (<RegisterIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} userData={this.state.userData} />)} /> */}
              {/* <Route exact path="/ca/" render={props => (<LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} userData={this.state.userData} />)} /> */}
            </div>
          )}
      </React.Fragment>
    );
  }
}
