import React from 'react';

export default class AuthService extends React.Component{

    hasToken() {
        const token = this.getToken();
        return !!token;
    }

    getToken() {
        return localStorage.getItem('main_admin_auth_token')
    }

    logout() {
        if (this.getToken()) {
            localStorage.removeItem('main_admin_auth_token')
        }
    }

    setToken(token) {
        localStorage.setItem('main_admin_auth_token', token)
    }
}
