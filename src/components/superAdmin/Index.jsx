import React from 'react'
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loader from "../common/Loader";

import AuthService from '../../handlers/superAdmin/AuthService';

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

const qrIndex = Loadable({
    loader: () => import('./qr/Index'),
    loading: Loading,
});

const AddCoordinator = Loadable({
    loader: () => import('./addCoordinator/Index'),
    loading: Loading,
});


const ListCoordinators = Loadable({
    loader: () => import('./listCoordinators/Index'),
    loading: Loading,
});
const ControlsRegisterIndex = Loadable({
        loader: () => import("./controlsRegister/Index"),
        loading: () => Loading
    });

    const PaidParticipantIndex = Loadable({
        loader: () => import("./paidParticipant/Index"),
        loading: () => Loading
    });

    const MediaQRIndex = Loadable({
        loader: () => import("./mediaQR/Index"),
        loading: () => Loading
    });
    

export default class AdminIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false
        };
        this.Auth = new AuthService();
    }

    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        this.setState({ isAuthenticated });
    }

    handleUpdate = isAuthenticated => {
        this.setState({ isAuthenticated })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isAuthenticated ?
                    <div>
                        <Route path="/super" component={NavbarIndex} />
                        <Route exact path="/super/logout" render={() => <LogoutIndex updateRoutes={this.handleUpdate} />} />
                        <Route exact path="/super" component={HomeIndex} />
                        <Route exact path="/super/participants/:page" render={ (props) => <HomeIndex {...props} updateRoutes={this.handleUpdate} /> } />
                        <Route exact path="/super/addCoordinator" component={AddCoordinator} />
                        <Route exact path="/super/coordinators" component={ListCoordinators} />
                        <Route exact path="/super/controls/register" component={ControlsRegisterIndex} />
                        <Route exact path="/super/allParticipant" component={PaidParticipantIndex} />
                        <Route exact path="/super/qr" component={qrIndex} />
                        <Route exact path="/super/mediaQR" component={MediaQRIndex} />
                    </div>
                    :
                    <div>
                        {/* <Route exact path="/super/register" component={RegisterIndex} /> */}
                        <Route exact path="/super" render={() => <LoginIndex updateRoutes={this.handleUpdate} />} />
                    </div>
                }
            </React.Fragment>
        )
    }
}
