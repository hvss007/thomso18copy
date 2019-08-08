import React from "react";
import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
import validateInput from '../../../utils/validation/loginValidation';
import AuthService from '../../../handlers/main/AuthService';

import img from "../../campusAmbassador/register/img/logo.png"
import "../../campusAmbassador/register/css/register.css";
import "../verify/verify.css"

export default class LoginIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            email: '',
            password: '',
            disabled: ''
        }
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            let { email, password } = this.state;
            if (email) email = email.trim();
            const data = { email, password }
            const check = validateInput(data)
            if (check.isValid) {
                this.setState({ disabled: true })
                FetchApi('POST', '/api/main/auth/login', data)
                    .then(res => {
                        if (res && res.data) {
                            if (res.data.success) {
                                this.Auth.setToken(res.data.token)
                                this.props.updateRoutes(true, true)
                                this.props.setUserData(res.data.body)
                                this.props.history.push('/main')
                            } else {
                                if (res.data.notVerified) {
                                    this.Auth.setToken(res.data.token)
                                    this.props.updateRoutes(true, false)
                                    this.props.history.push('/main/verify')
                                } else if (res.data.notExists) {
                                    this.setState({ disabled: false, errors: 'Email does not exists. Please Register' })
                                } else if (res.data.mismatch) {
                                    this.setState({ disabled: false, errors: 'Wrong Password' })
                                } else {
                                    this.setState({
                                        disabled: false,
                                        errors: res.data.msg
                                    })
                                }
                            }
                        }
                    })
                    .catch(e => {
                        if (e.response && e.response.data) {
                            this.setState({ disabled: false, errors: e.response.data.msg })
                        } else {
                            this.setState({ disabled: false, errors: 'Something went wrong' })
                        }
                    });
            } else if (check.errors && check.errors.email) {
                this.setState({ errors: check.errors.email })
            } else if (check.errors && check.errors.password) {
                this.setState({ errors: check.errors.password })
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
    }

    render() {
        const { email, password, errors, disabled } = this.state;
        return (
            <div className="main-verify-register-parent">
                <div className="register-child">
                    <div className="register-heading">
                        <div className="r-logo">
                            <Link to="/main"><img src={img} alt="r-logo" /></Link>
                        </div>
                        <div className="vertical_line">
                        </div>
                        <div className="register-ca common-cursor">
                            <h1>Participant Login</h1>
                        </div>
                    </div>
                    <div className="register-form">
                        <form onSubmit={this.onSubmit}>
                            {errors ?
                                <div style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>
                                    {errors}
                                </div>
                                : null
                            }
                            <div className="form-heading">
                                <h2>Participant Login</h2>
                            </div>
                            <div className="form-first-child">
                                <div className="form-email">
                                    <input
                                        name="email"
                                        type="email"
                                        id="inputEmail"
                                        placeholder="Email"
                                        value={email}
                                        onChange={this.onChange}
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        spellCheck="off"
                                        required
                                    />
                                </div>
                                <div className="form-contactnumber form-gender">
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
                                </div>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '0.8em', textAlign: 'center' }}><i>* Forgot Password</i>? Click
                                <span style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.props.history.push('/main/resetPasswordEmail')}>
                                    &nbsp;here&nbsp;
                                </span>
                                to reset
                            </div>
                            <div className="register">
                                <button type="submit" disabled={disabled}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
