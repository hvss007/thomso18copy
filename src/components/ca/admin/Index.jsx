import React from 'react'
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loader from "../../common/Loader";
import AuthService from '../../../handlers/ca/admin/AuthService';

// import LoginIndex from './login/Index';

const Loading = ({ error }) => {
    if (error) {
      return <div>Error loading component</div>;
    } else {
      return <Loader />;
    }
}

const LogoutIndex = Loadable({
    loader: () => import('./logout/Index'),
    loading: Loading,
});

// const RegisterIndex = Loadable({
//     loader: () => import('./register/Index'),
//     loading: Loading,
// });

const HomeIndex = Loadable({
    loader: () => import('./home/Index'),
    loading: Loading,
});

const LoginIndex = Loadable({
    loader: () => import('./login/Index'),
    loading: Loading,
});

const NavbarIndex = Loadable({
    loader: () => import('./navbar/Index'),
    loading: Loading,
});

const IdeasIndex = Loadable({
    loader: () => import('./ideas/Index'),
    loading: Loading,
});

const TempIdeasIndex = Loadable({
    loader: () => import('./tempIdeas/Index'),
    loading: Loading,
});

const ControlsIndex = Loadable({
    loader: () => import('./controls/Index'),
    loading: Loading,
});

const CheckoutIndex = Loadable({
    loader: () => import('./checkout/Index'),
    loading: Loading,
});

const TempControlsIndex = Loadable({
    loader: () => import('./tempControls/Index'),
    loading: Loading,
});

const TempUsersIndex = Loadable({
    loader: () => import('./tempUsers/Index'),
    loading: Loading,
});

export default class AdminIndex extends React.Component{
    constructor() {
        super();
        this.state = {
            isAuthenticated: false
        };
        this.Auth = new AuthService();
    }
     
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        this.setState({isAuthenticated});
    }
    
    handleUpdate = isAuthenticated => {
        this.setState({isAuthenticated})
    }

    render(){
        return(
            <React.Fragment>
                {this.state.isAuthenticated ? 
                    <div>
                        <Route path="/ca/admin" component={NavbarIndex} />
                        <Route exact path="/ca/admin/ideas" component={IdeasIndex} />
                        <Route exact path="/ca/admin/tempideas" component={TempIdeasIndex} />
                        <Route exact path="/ca/admin/temp" component={TempUsersIndex} />
                        <Route exact path="/ca/admin/controls" component={ControlsIndex} />
                        <Route exact path="/ca/admin/checkout" component={CheckoutIndex} />
                        <Route exact path="/ca/admin/tempControls" component={TempControlsIndex} />
                        <Route exact path="/ca/admin/logout" render={ () => <LogoutIndex updateRoutes={this.handleUpdate}/> } />
                        <Route exact path="/ca/admin" component={HomeIndex} />
                    </div>
                :
                    <div>
                        {/* <Route exact path="/ca/admin/register" component={RegisterIndex} /> */}
                        <Route exact path="/ca/admin" render={ () => <LoginIndex updateRoutes={this.handleUpdate}/> } />
                    </div>
                }
            </React.Fragment>
        )
    }
}
