import React from "react";
import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/main/AuthService';

import img from "../../campusAmbassador/register/img/logo.png"
import "../../campusAmbassador/register/css/register.css";
import "../verify/verify.css";

export default class VerifyIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            otp: '',
            disabled: false
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
            let { otp } = this.state;
            if (otp) otp = otp.trim()
            const data = { otp }
            const token = this.Auth.getToken()
            this.setState({
                disabled: true
            })
            FetchApi('POST', '/api/main/auth/verify', data, token)
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success === true) {
                            if (res.data.body) {
                                this.props.setUserData(res.data.body);
                            }
                            this.props.updateRoutes(true, true)
                            this.props.history.push('/main')
                        } else {
                            this.setState({ errors: res.data.msg, disabled: false })
                        }
                    } else {
                        this.setState({ errors: 'Something Went Wrong', disabled: false });
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ errors: 'Something Went Wrong', disabled: false });
                })
        }
    }

    resendOTP = () => {
        if (!this.state.disabled) {
            const token = this.Auth.getToken()
            this.setState({
                disabled: true
            })
            FetchApi('GET', '/api/main/auth/resend', null, token)
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success === true) {
                            this.setState({ errors: `Sent OTP at ${res.data.body}`, disabled: false })
                        } else {
                            this.setState({ errors: res.data.msg, disabled: false })
                        }
                    } else {
                        this.setState({ errors: 'Something Went Wrong', disabled: false });
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ errors: 'Something Went Wrong', disabled: false });
                })
        }
    }

    render() {
        const { otp, errors, disabled } = this.state;
        return (
            <div className="main-verify-register-parent">
                <div className="register-child">
                    <div className="register-child-child">
                        <div className="register-heading">
                            <div className="r-logo">
                                <Link to="/"><img src={img} alt="r-logo" /></Link>
                            </div>
                            <div className="vertical_line">
                            </div>
                            <div className="register-ca common-cursor" style={{ margin: 'auto 0' }}>
                                <h1 style={{ marginTop: '0' }} >VERIFY EMAIL</h1>
                            </div>
                        </div>
                        <Link to="/main/logout" className="register-ca common-cursor register-ca-spons">
                            <h1 style={{ marginTop: '0', cursor: 'pointer' }} >Logout</h1>
                        </Link>
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
                                <h2>Please Verify Your Email</h2>
                            </div>
                            <div className="form-first-child">
                                <div className="form-email">
                                    <input
                                        id="inputOTP"
                                        type="text"
                                        placeholder="Enter OTP Sent To Your Email"
                                        name="otp"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        value={otp}
                                        onChange={this.onChange}
                                        spellCheck="false"
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{marginTop: '10px', fontSize: '0.8em', textAlign: 'center'}}>* Click 
                                <span style={{color: 'cyan', cursor: 'pointer'}} onClick={this.resendOTP}> 
                                    &nbsp;here&nbsp;
                                </span>
                                to resend OTP
                            </div>
                            <div className="register">
                                <button type="submit" disabled={disabled}>Verify</button>
                            </div>
                        </form>
                        <div style={{width:'70%'}}>
                            <Link to="/main/logout" className="mobile-logout-main-register">
                                <h1>Logout</h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


} 
