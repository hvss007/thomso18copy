import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../../../handlers/ca/temp/AuthService';

export default class LogoutIndex extends React.Component{
    constructor() {
        super()
        this.Auth = new AuthService()
    }

    componentWillMount() {
        this.Auth.logout();
        this.props.updateRoutes(false, true);
    }

    render(){
        return (this.props.facebook===true ? <Redirect to="/campus" /> : <Redirect to="/campusambassador" />)
    }
}

LogoutIndex.defaultProps = {
    facebook: false
}
