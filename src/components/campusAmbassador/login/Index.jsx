import React from 'react';
import { Link } from 'react-router-dom' ;

import AuthService from '../../../handlers/ca/temp/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import validateInput from '../../../utils/validation/loginValidation';
import Popup from '../../common/popup/Index';

import img from "../register/img/logo.png";
import "../register/css/register.css";

export default class LoginIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            loginEmail: '',
            verificationEmail: '',
            password: '',
            showVerify: false,
            disabled: false,
            loginErrors: '',
            verificationErrors: '',
            verificationAlerts: ''
        }
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    showVerify = () => {
        this.setState({showVerify: true})
    }

    
    login = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            const password = this.state.password
            let email = this.state.loginEmail
            if (email) {
                email = email.trim()
            }
            const data = { email, password }
            const check = validateInput(data)
            if (check.isValid) {
                this.setState({
                    disabled: true
                })
                FetchApi('POST', '/api/ca/temp/auth/login', data)
                    .then(r => {
                        if (r && r.data) {
                            if (r.data.success) {
                                this.Auth.setToken(r.data.token)
                                if (r.data.temp) {
                                    this.props.updateRoutes(true, true)
                                    this.props.history.push('/campus/reset')
                                } else {
                                    this.props.updateRoutes(true)
                                    this.props.setUserData(r.data.body)
                                    if(this.props.facebook === true)
                                    {
                                        this.props.history.push('/campus/profile')
                                    }
                                    else 
                                    {
                                        this.props.history.push('/CampusAmbassador')
                                    }
                                }
                            } else {
                                this.setState({
                                    disabled: false,
                                    loginErrors: r.data.msg,
                                    verificationErrors: '',
                                    verificationAlerts: ''
                                })
                            }
                        }
                    })
                    .catch(e => {
                        if (e.response && e.response.data) {
                            if (e.response.data.notExists) {
                                this.setState({ disabled: false, loginErrors: 'Email does not exists. Please Register' })
                            }  else if (e.response.data.mismatch) {
                                this.setState({ disabled: false, loginErrors: 'Incorrect Password' })
                            } else {
                                this.setState({ disabled: false, loginErrors: 'Something went wrong' })
                            }
                        } else {
                            this.setState({ disabled: false, loginErrors: 'Something went wrong' })
                        }
                    });
            } else if (check.errors && check.errors.email) {
                this.setState({ loginErrors: check.errors.email })
            } else if (check.errors && check.errors.password) {
                this.setState({ loginErrors: check.errors.password })
            } else {
                this.setState({ loginErrors: 'Fields cannot be empty' })
            }
        }
    }

    verify = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            let email = this.state.verificationEmail
            if (email) {
                email = email.trim()
                const data = { email }
                const check = validateInput(email, 'email')
                if (check.isValid) {
                    this.setState({
                        disabled: true
                    })
                    FetchApi('POST', '/api/ca/temp/auth/verify', data)
                        .then(r => {
                            if (r && r.data) {
                                if (r.data.success) {
                                    this.setState({
                                        disabled: false,
                                        loginErrors: '',
                                        verificationEmail: '',
                                        password: '',
                                        verificationErrors: '',
                                        verificationAlerts: r.data.msg
                                    })
                                } else {
                                    this.setState({
                                        disabled: false,
                                        loginErrors: '',
                                        password: '',
                                        verificationErrors: r.data.msg,
                                        verificationAlerts: ''
                                    })
                                }
                            }
                        })
                        .catch(e => this.setState({ disabled: false, verificationErrors: 'Something went wrong' }))
                } else if (check.errors && check.errors.email) {
                    this.setState({ verificationErrors: check.errors.email })
                } else {
                    this.setState({ verificationErrors: 'Fields cannot be empty' })
                }
            }
        }
    }

    render() {
        const { password, loginEmail, verificationEmail, verificationErrors, verificationAlerts, loginErrors, disabled, showVerify } = this.state;
        return (
            <div className="register-parent">
                <Popup {...this.props} onRef={ref => (this.popup = ref)}/>
                <div className="register-child">
                    <div className="register-heading">
                        <div className="r-logo">
                            <Link to="/"><img src={img} alt="r-logo" /></Link>
                        </div>
                        <div className="vertical_line">
                        </div>
                        <div className="register-ca common-cursor">
                            <h1>Campus<br /> Ambassador</h1>
                        </div>
                    </div>
                    <div className="register-form">
                        <form onSubmit={this.login}>
                            {loginErrors ?
                                <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                                    {loginErrors}
                                </div>
                                : null
                            }
                            <div className="form-heading">
                                <h2>CA Login</h2>
                            </div>
                            <div className="form-first-child">
                                <div className="form-email">
                                    <input
                                        id="inputEmail"
                                        type="email"
                                        placeholder="Your Email"
                                        name="loginEmail"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        value={loginEmail}
                                        onChange={this.onChange}
                                        spellCheck="false"
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
                            <div style={{marginTop: '10px', fontSize: '0.8em', textAlign: 'center'}}>* Email not verified yet. Click 
                                <span style={{color: 'cyan', cursor: 'pointer'}} onClick={this.showVerify} > here </span>
                                to verify 
                            </div>
                            <div className="register">
                                <button type="submit" disabled={disabled}>Login</button>
                            </div>
                        </form>
                        {showVerify ? <form onSubmit={this.verify}>
                            {verificationAlerts ? 
                                <div style={{textAlign: 'center', color: 'green', fontWeight: '600'}}>
                                    {verificationAlerts}
                                </div>
                                : null
                            }
                            {verificationErrors ?
                                <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                                    {verificationErrors}
                                </div>
                                : null
                            }
                            <div className="form-heading">
                                <h2>Verify Email</h2>
                            </div>
                            <div className="form-first-child">
                                <div className="form-email">
                                    <input
                                        id="verifyEmail"
                                        type="email"
                                        placeholder="Your Email"
                                        name="verificationEmail"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        value={verificationEmail}
                                        onChange={this.onChange}
                                        spellCheck="false"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="register">
                                <button type="submit" disabled={disabled}>Send Verification Email</button>
                            </div>
                        </form> : null}
                    </div>
                </div>
            </div>
        );
    }
}

LoginIndex.defaultProps ={
    facebook: false
}
