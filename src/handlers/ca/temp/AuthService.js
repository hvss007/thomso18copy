import React from 'react';

export default class AuthService extends React.Component{

    hasToken() {
        const token = this.getToken();
        return !!token
    }

    getToken() {
        return localStorage.getItem('temp_ca_auth_token')
    }

    logout() {
        if (this.getToken()) {
            localStorage.removeItem('temp_ca_auth_token')
        }
    }

    setToken(token) {
        localStorage.setItem('temp_ca_auth_token', token)
    }
}