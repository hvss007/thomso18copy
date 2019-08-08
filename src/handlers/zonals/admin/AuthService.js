import React from 'react';

export default class AuthService extends React.Component{

    hasToken() {
        const token = this.getToken();
        return !!token;
    }

    getToken() {
        return localStorage.getItem('zonals_admin_auth_token')
    }

    logout() {
        if (this.getToken()) {
            localStorage.removeItem('zonals_admin_auth_token')
        }
    }

    setToken(token) {
        localStorage.setItem('zonals_admin_auth_token', token)
    }
}
