import React from 'react';
import { Link } from 'react-router-dom' ;

import AuthService from '../../../handlers/ca/temp/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import validateInput from '../../../utils/validation/loginValidation';
import Popup from '../../common/popup/Index';

import img from "../register/img/logo.png";
import "../register/css/register.css";

export default class ResetIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: '',
            password: '',
            confirmpassword: '',
            disabled: false,
        }
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    login = (e) => {
        e.preventDefault();
        const password = this.state.password
        const confirmpassword = this.state.confirmpassword
        if (password === confirmpassword) {
            const check = validateInput(confirmpassword, 'password')
            if (check.isValid) {
                this.setState({
                    disabled: true
                })
                const authtoken = this.Auth.getToken()
                FetchApi('POST', '/api/ca/temp/auth/reset', {password}, authtoken)
                    .then(r => {
                        if (r && r.data) {
                            if (r.data.success) {
                                this.props.updateRoutes(true)
                                this.props.setUserData(r.data.body)
                                this.props.history.push('/campus')
                            } else {
                                this.setState({
                                    disabled: false,
                                    errors: r.data.msg,
                                })
                            }
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        this.setState({ disabled: false, errors: 'Something went wrong' })
                    });
            } else if (check.errors && check.errors.password) {
                this.setState({ errors: check.errors.password })
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        } else {
            this.setState({ errors: 'Password do not match' })
        }
    }

    render() {
        const { password, confirmpassword, errors, disabled } = this.state;
        return (
            <div className="register-parent-reset">
                <Popup {...this.props} onRef={ref => (this.popup = ref)}/>
                <div className="register-child-reset">
                    <div className="register-heading-reset">
                      <div className="campusAmb-navbar-div">
                        <div className="r-logo">
                            <Link to="/"><img src={img} alt="r-logo" /></Link>
                        </div>
                        <div className="vertical_line">
                        </div>
                        <div className="register-ca common-cursor">
                            <h1>Campus<br /> Ambassador</h1>
                        </div>
                        </div>
                        <div className="campusAmb-reset-logout-parent">
                            <Link to="/CampusAmbassador/logout" className="campusAmb-reset-logout">
                            LOGOUT
                            </Link>
                        </div>
                    </div>
                    <div className="register-form">
                        <form onSubmit={this.login}>
                            {errors ?
                                <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                                    {errors}
                                </div>
                                : null
                            }
                            <div className="form-heading">
                                <h2>Update Password</h2>
                            </div>
                            <div className="form-first-child">
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
                                <div className="form-contactnumber form-gender">
                                    <input
                                        id="confirmpassword" 
                                        type="password" 
                                        placeholder="Confirm Password" 
                                        name="confirmpassword" 
                                        autoCorrect="off" 
                                        autoComplete="off" 
                                        autoCapitalize="off" 
                                        value={confirmpassword} 
                                        onChange={this.onChange} 
                                        required
                                    />
                                </div>
                            </div>
                            <div className="register">
                                <button type="submit" disabled={disabled}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
