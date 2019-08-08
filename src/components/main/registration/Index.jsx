import React from "react";
import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
import img from "../../campusAmbassador/register/img/logo.png"
import CollegeSelect from "../../campusAmbassador/register/CollegeSelect";
import StateSelect from "../../campusAmbassador/register/StateSelect";
import validateInput from '../../../utils/validation/loginValidation';
import AuthService from '../../../handlers/main/AuthService';
import EventsSelect from "./EventsSelect";
import "../verify/verify.css";

import "../../campusAmbassador/register/css/register.css";

export default class RegisterIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            contact: '',
            email: '',
            gender: '',
            college: '',
            state: '',
            branch: '',
            address: '',
            errors: '',
            primary_event: '',
            referred_by: '',
            password: '',
            confirmPassword: '',
            selectedOption: null
        }
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'referred_by' && value) {
            value = value.trim();
            value = value.substring(0, 8)
            value = value.toUpperCase();
        }
        if (name === 'contact' && value) {
            value = value.trim();
            value = value.substring(0, 10)
        }
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { name, email, gender, contact, college, state, branch, address, referred_by, password, confirmPassword, primary_event } = this.state;
        if (name) name = name.trim()
        if (email) email = email.trim()
        if (gender) gender = gender.trim()
        if (contact) contact = contact.trim()
        if (college) college = college.trim()
        if (branch) branch = branch.trim()
        if (address) address = address.trim()
        if (referred_by) referred_by = referred_by.trim()
        if (primary_event) primary_event = primary_event.trim()
        if (!isNaN(contact)) {
            if (password === confirmPassword) {
                const data = { name, email, gender, contact, college, state, branch, address, referred_by, password, primary_event }
                const check = validateInput(data)
                if (name && gender && branch && contact && college && state && address && primary_event && check.isValid) {
                    FetchApi('POST', '/api/main/auth/register', data)
                        .then(res => {
                            if (res && res.data) {
                                if (res.data.success === true) {
                                    this.Auth.setToken(res.data.token);
                                    this.props.updateRoutes(true, false);
                                    this.props.history.push('/main/verify')
                                }
                                else
                                    this.setState({ errors: res.data.msg })
                            }
                        })
                        .catch(e => {
                            this.setState({ errors: "Something went wrong." })
                        });
                } else if (check.errors && check.errors.email) {
                    this.setState({ errors: check.errors.email })
                } else if (check.errors && check.errors.password) {
                    this.setState({ errors: check.errors.password })
                } else {
                    this.setState({ errors: 'Fields cannot be empty' })
                }
            }
            else {
                this.setState({ errors: "Password didn't matched!!" })
            }
        }
        else {
            this.setState({ errors: "Contact invalid" })
        }
    }

    render() {
        const { name, contact, email, gender, branch, address, errors, referred_by, password, confirmPassword } = this.state;
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
                            <h1>Participant Registration</h1>
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
                                <h2>Register Here</h2>
                            </div>
                            <div className="form-first-child">
                                <div className="form-name">
                                    <label htmlFor="inputName">Name</label>
                                    <input
                                        id="inputName"
                                        type="text"
                                        placeholder="Your Name"
                                        name="name"
                                        value={name}
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        onChange={this.onChange}
                                        spellCheck="false"
                                        required
                                    />
                                </div>
                                <div className="form-contactnumber">
                                    <label htmlFor="inputContact">Contact Number</label>
                                    <input
                                        id="inputContact"
                                        type="text"
                                        placeholder="Contact Number"
                                        name="contact"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={contact}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-first-child">
                                <div className="form-email">
                                    <label htmlFor="inputEmail">Email (For OTP)</label>
                                    <input
                                        id="inputEmail"
                                        type="email"
                                        placeholder="Your Email"
                                        name="email"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        value={email}
                                        onChange={this.onChange}
                                        spellCheck="false"
                                        required
                                    />
                                </div>
                                <div className="form-gender">
                                    <label htmlFor="inputGender">Gender</label>
                                    <select
                                        id="inputGender"
                                        name="gender"
                                        value={gender}
                                        onChange={this.onChange}
                                        required
                                    >
                                        <option value="" disabled="true"> Gender </option>
                                        <option value="male"> Male </option>
                                        <option value="female"> Female </option>
                                        <option value="other"> Other </option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-college-child">
                                <label htmlFor="inputCollege">College</label>
                                <CollegeSelect onChange={college => this.setState({ college })} />
                            </div>
                            <div className="form-first-child">
                                <div className="form-branch">
                                    <label htmlFor="inputBranch">Branch and Year</label>
                                    <input
                                        id="inputBranch"
                                        type="text"
                                        placeholder="Branch Name"
                                        name="branch"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={branch}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-state">
                                    <label htmlFor="inputState">College State</label>
                                    <StateSelect onChange={state => this.setState({ state })} />
                                </div>
                               
                            </div>
                            <div className="form-first-child">
                                <div className="form-branch">
                                    <label htmlFor="inputRefferedBy">Referral</label>
                                    <input
                                        id="inputRefferedBy"
                                        type="text"
                                        placeholder="Referral Code (Optional)"
                                        name="referred_by"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        value={referred_by}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-state">
                                    <label htmlFor="inputEvents">Primary Event</label>
                                    <EventsSelect onChange={primary_event => this.setState({ primary_event })} />
                                </div>
                            </div>
                            <div className="form-add-child">
                                <label htmlFor="inputAddress">Present College Address</label>
                                <input
                                    id="inputAddress"
                                    type="text"
                                    placeholder="Address Name"
                                    name="address"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    value={address}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-first-child">
                                <div className="form-name">
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
                                </div>
                                <div className="form-contactnumber">
                                    <label htmlFor="inputCPassword">Confirm Password</label>
                                    <input
                                        id="inputCPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        value={confirmPassword}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="register">
                                <button type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}
