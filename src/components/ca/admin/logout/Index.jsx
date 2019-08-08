import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../../../../handlers/ca/admin/AuthService';

export default class LogoutIndex extends React.Component{
    constructor() {
        super()
        this.Auth = new AuthService()
    }

    componentWillMount() {
        this.Auth.logout();
        this.props.updateRoutes(false);
    }

    render(){
        return (<Redirect to="/ca/admin/" />)
    }
}
