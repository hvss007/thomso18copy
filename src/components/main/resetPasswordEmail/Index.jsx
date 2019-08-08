import React from "react";
import { Link } from "react-router-dom";

import FetchApi from "../../../utils/FetchAPI";
import validateInput from '../../../utils/validation/loginValidation';

import img from "../../campusAmbassador/register/img/logo.png"
import "../../campusAmbassador/register/css/register.css";
import "../verify/verify.css";


export default class ResetPasswordEmailIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: '',
            email: '',
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
            let { email } = this.state;
            if (email) email = email.trim();
            const data = { email }
            const check = validateInput(email, 'email')
            if (check.isValid) {
                this.setState({ disabled: true })
                FetchApi('POST', '/api/main/auth/resetEmail', data)
                    .then(res => {
                        if (res && res.data) {
                            if (res.data.success) this.props.history.push('/main/resetPassword')
                            else this.setState({ errors: res.data.msg })
                        }
                    })
                    .catch(e => {
                        if (e && e.response && e.response.data && e.response.data.msg) this.setState({ errors: e.response.data.msg })
                        else this.setState({ errors: "Something Went Wrong" })
                    });
            }
            else if (check.errors && check.errors.email) this.setState({ errors: check.errors.email })
            else this.setState({ errors: 'Fields cannot be empty' })
        }
    }


    render() {
        const { email, errors, disabled } = this.state;
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
                                <h2>Request Reset Code</h2>
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
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '0.8em', textAlign: 'center' }}>* Already have Reset Code? Click
                                <span style={{ color: 'cyan', cursor: 'pointer' }} onClick={() => this.props.history.push('/main/resetPassword')}>
                                    &nbsp;here&nbsp;
                                </span>
                                to proceed
                            </div>
                            <div className="register">
                                <button type="submit" disabled={disabled}>Send Email</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}