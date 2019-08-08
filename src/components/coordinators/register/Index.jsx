import React from "react";
// import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
import validateInput from '../../../utils/validation/loginValidation';
import AuthService from '../../../handlers/main/AuthService';

import "../../campusAmbassador/register/css/register.css";
// import img from "../../campusAmbassador/register/img/logo.png"

export default class RegisterIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            contact1: '',
            contact2:'',
            email: '',
            gender: '',
            branch: '',
            year:'',
            event_id:'',
            enrollment_no:'',
            bhawan:'',
            password: '',
            confirmPassword: '',
            selectedOption: null,
            errors:''
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
        this.setState({ [name]: value , errors:''});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { name, contact1,contact2,  email, gender, branch, year, event_id, enrollment_no, bhawan, password, confirmPassword } = this.state;
        if (name) name = name.trim()
        if (email) email = email.trim()
        if (gender) gender = gender.trim()
        if (contact1) contact1 = contact1.trim()
        if (contact2) contact2 = contact2.trim()
        if (branch) branch = branch.trim()
        if (year) year = year.trim()
        if (event_id) event_id = event_id.trim()
        if (bhawan) bhawan = bhawan.trim()
        if (enrollment_no) enrollment_no = enrollment_no.trim()
        if (!isNaN(contact1) && !isNaN(contact2)) {
            if (password === confirmPassword) {
                const data = { name, contact1,contact2,  email, gender, branch, year, event_id, enrollment_no, bhawan, password}
                const check = validateInput(data)
                if (name && contact1 &&contact2 &&  email && gender && branch && year && event_id && enrollment_no && bhawan && password && check.isValid) {
                    FetchApi('POST', '/api/coordinators/auth/register', data)
                        .then(res => {
                            if (res && res.data) {
                                if (res.data.success === true) {
                                    this.Auth.setToken(res.data.token);
                                    // this.props.updateRoutes(true, false);
                                    this.props.history.push('/coordinators')
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
        const {errors, name, contact1,contact2,  email, gender, branch, year, event_id, enrollment_no, bhawan, password, confirmPassword  } = this.state;
        return (
            <div className="main-verify-register-parent">
                <div className="register-child">
                    <div className="register-heading">
                        <div className="r-logo">
                            {/* <Link to="/main"><img src={img} alt="r-logo" /></Link> */}
                        </div>
                        <div className="vertical_line">
                        </div>
                        <div className="register-ca common-cursor">
                            <h1>Coordinator Registration</h1>
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
                                <div className="form-branch">
                                    <label htmlFor="inputEnrollment">Enrollment No</label>
                                    <input
                                        id="inputBranch"
                                        type="number"
                                        placeholder="Enrollment Number"
                                        name="enrollment_no"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={enrollment_no}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                           
                            <div className="form-first-child">
                                <div className="form-contactnumber">
                                    <label htmlFor="inputContact1">Contact 1</label>
                                    <input
                                        id="inputContact1"
                                        type="text"
                                        placeholder="Contact Number 1"
                                        name="contact1"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={contact1}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-contactnumber">
                                    <label htmlFor="inputContact2">Contact 2</label>
                                    <input
                                        id="inputContact2"
                                        type="text"
                                        placeholder="Contact Number 2"
                                        name="contact2"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={contact2}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-first-child">
                                <div className="form-branch">
                                    <label htmlFor="inputBranch">Branch</label>
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
                                <div className="form-branch">
                                    <label htmlFor="inputYear">Year</label>
                                    <input
                                        id="inputBranch"
                                        type="text"
                                        placeholder="Year"
                                        name="year"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={year}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-first-child">
                                <div className="form-branch">
                                    <label htmlFor="inputBhawan">Bhawan</label>
                                    <input
                                        id="inputBranch"
                                        type="text"
                                        placeholder="Bhawan Name"
                                        name="bhawan"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={bhawan}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-branch">
                                    <label htmlFor="inputEventId">Event ID</label>
                                    <input
                                        id="inputBranch"
                                        type="text"
                                        placeholder="Event ID"
                                        name="event_id"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={event_id}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
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
