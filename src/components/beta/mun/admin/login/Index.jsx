import React, { Component } from 'react';

import AuthService from '../../../../../handlers/mun/admin/AuthService';
import validateInput from '../../../../../utils/validation/loginValidation';
import FetchApi from '../../../../../utils/FetchAPI';

// import './style.css';

export default class LoginIndex extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            message: ''
        };
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        const check = validateInput(password, 'password');
        if (check.isValid) {
            FetchApi('POST','/api/mun/admin/auth/login', { username, password })
                .then((result) => {
                    if (result.data) {
                        this.Auth.setToken(result.data.token)
                        this.setState({ message: '' })
                        this.props.updateRoutes(true)
                    }
                })
                .catch(error => {
                    if(error.response && error.response.status === 401) {
                        this.setState({ message: 'Login failed. Username or password not match' });
                    }
                });
        } else {
            this.setState({message: check.errors.password})
        }
    }

    render() {
        const { username, password, message } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {message}
                    <h2>Please sign in</h2>
                    <label htmlFor="inputUsername">Username</label>
                    <input 
                        id="inputUsername" 
                        type="text" 
                        placeholder="Username" 
                        name="username"
                        autoCorrect="off" 
                        autoCapitalize="off"  
                        value={username} 
                        onChange={this.onChange} 
                        required
                    />
                    <label htmlFor="inputPassword">Password</label>
                    <input 
                        id="inputPassword" 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        autoCorrect="off" 
                        autoComplete="off" 
                        autoCapitalize="off" 
                        value={password} 
                        onChange={this.onChange} 
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}
