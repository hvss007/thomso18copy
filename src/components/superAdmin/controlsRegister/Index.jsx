import React, { Component } from 'react';
import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';
import AuthService from '../../../handlers/superAdmin/AuthService';

export default class RegisterIndex extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: ''
        };
        this.Auth = new AuthService();
    }
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value, error:"" });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;
        const idAuthenticated = this.Auth.hasToken()
        const check = validateInput(password, 'password');
        if (check.isValid && idAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/super/controls/register', { email, password }, token)
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success) {
                            this.setState({ error: res.data.msg })
                        } else {
                            this.setState({ error: res.data.msg })
                        }
                    }
                })
                .catch(() => {
                    this.setState({ error: 'Something Went Wrong' })
                });
        } else {
            this.setState({ error: check.errors.password })
        }
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <div>
                {error}
                <form onSubmit={this.onSubmit}>
                    <h2>Register</h2>
                    <label htmlFor="inputemail">email</label>
                    <input
                        id="inputemail"
                        type="text"
                        placeholder="email"
                        name="email"
                        autoCorrect="off"
                        autoCapitalize="off"
                        value={email}
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
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}
