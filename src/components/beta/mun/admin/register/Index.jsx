import React, { Component } from 'react';
import validateInput from '../../../../../utils/validation/loginValidation';
import FetchApi from '../../../../../utils/FetchAPI';

// import './style.css';

export default class RegisterIndex extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        const check = validateInput(password, 'password');
        if (check.isValid) {
            FetchApi('POST', '/api/mun/admin/auth/register', { username, password })
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success) {
                            this.props.history.push("/mun/admin")
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
        const { username, password, error } = this.state;
        return (
            <div>
                {error}
                <form onSubmit={this.onSubmit}>
                    <h2>Register</h2>
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
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}
