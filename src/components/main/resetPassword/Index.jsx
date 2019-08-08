import React from "react";
import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
import validateInput from '../../../utils/validation/loginValidation';

import img from "../../campusAmbassador/register/img/logo.png"
import "../../campusAmbassador/register/css/register.css";
import "../verify/verify.css";


export default class ResetPasswordEmailIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            errors: '',
            password: '',
            confirmPassword: '',
            tempPassword: '',
            disabled: true
        }
    }
    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value, disabled: false });
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            let { email, password, confirmPassword, tempPassword } = this.state;
            const data = { email, password, tempPassword }
            const check = validateInput(data)
            if (check.isValid) {
                if (password === confirmPassword) {
                    FetchApi('POST', '/api/main/auth/resetPassword', data)
                        .then(res => {
                            if (res && res.data) {
                                if (res.data.success) this.props.history.push('/main/login')
                                else this.setState({ errors: res.data.msg })
                                this.setState({ disabled: true })
                            }
                        })
                        .catch(e => {
                            if (e && e.response && e.response.data && e.response.data.msg) this.setState({ errors: e.response.data.msg, disabled: true })
                            else this.setState({ errors: 'Something Went Wrong' })
                        });
                }
                else this.setState({ errors: "Password Didn't match", disabled: true })
            }
            else if (check.errors && check.errors.email) this.setState({ errors: check.errors.email })
            else if (check.errors && check.errors.password) this.setState({ errors: check.errors.password })
            else this.setState({ errors: 'Fields cannot be empty' })
        }
    }

    render() {
        const { email, tempPassword, password, confirmPassword, errors, disabled } = this.state;
        return (
            <div className="main-verify-register-parent">
                <div className="register-child">
                    <div className="register-heading">
                        <div className="r-logo">
                            <Link to="/main/login"><img src={img} alt="r-logo" /></Link>
                        </div>
                        <div className="vertical_line">
                        </div>
                        <div className="register-ca common-cursor" style={{ margin: 'auto 0' }}>
                            <h1 style={{ marginTop: '0' }} >Reset Password</h1>
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
                                <h2>Reset Password</h2>
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
                                        name="tempPassword"
                                        type="password"
                                        id="inputTempPassword"
                                        placeholder="Reset Code"
                                        value={tempPassword}
                                        onChange={this.onChange}
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        spellCheck="off"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-first-child">
                                <div className="form-name">
                                    <input
                                        name="password"
                                        type="password"
                                        id="inputPassword"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={this.onChange}
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        spellCheck="off"
                                        required
                                    />
                                </div>
                                <div className="form-contactnumber">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        id="inputConfirmPassword"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={this.onChange}
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        spellCheck="off"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="register">
                                <button type="submit" disabled={disabled}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}