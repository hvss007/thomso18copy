import React from 'react';

export default class AuthService extends React.Component{

    hasToken() {
        const token = this.getToken();
        return !!token;
    }

    getToken() {
        return localStorage.getItem('ca_auth_token')
    }

    logout() {
        if (this.getToken()) {
            localStorage.removeItem('ca_auth_token')
        }
    }

    setToken(token) {
        localStorage.setItem('ca_auth_token', token);
        this.removeTempToken()
    }

    setTempToken(token) {
        localStorage.setItem('ca_temp_auth_token', token);
    }

    removeTempToken() {
        if (this.getTempToken()) {
            localStorage.removeItem('ca_temp_auth_token')
        }
    }

    getTempToken() {
        return localStorage.getItem('ca_temp_auth_token');
    }
}
