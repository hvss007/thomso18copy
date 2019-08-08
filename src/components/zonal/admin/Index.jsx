import React from 'react'
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loader from "../../common/Loader";
import AuthService from '../../../handlers/zonals/admin/AuthService';

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

const TableIndex = Loadable({
    loader: () => import('./table/Index'),
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
                    <React.Fragment>
                        <Route path="/zonals/admin" component={NavbarIndex} />
                        <Route exact path="/zonals/admin/logout" render={ (props) => <LogoutIndex {...props} updateRoutes={this.handleUpdate}/> } />
                        <Route exact path="/zonals/admin" component={HomeIndex} />
                        <Route exact path="/zonals/admin/delhi" render={ (props) => <TableIndex {...props} city='delhi' /> } />
                        <Route exact path="/zonals/admin/jaipur" render={ (props) => <TableIndex {...props} city='jaipur' /> } />
                        <Route exact path="/zonals/admin/lucknow" render={ (props) => <TableIndex {...props} city='lucknow' /> } />
                    </React.Fragment>
                :
                    <React.Fragment>
                        {/* <Route exact path="/zonals/admin/register" component={RegisterIndex} /> */}
                        <Route exact path="/zonals/admin" render={ (props) => <LoginIndex updateRoutes={this.handleUpdate}/> } />
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}
