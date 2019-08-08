import React from 'react';
import { Link } from 'react-router-dom';

import CollegeSelect from './CollegeSelect';
import StateSelect from './StateSelect';
import img from "./img/logo.png";
import FetchApi from '../../../utils/FetchAPI';
import validateInput from '../../../utils/validation/loginValidation';
import Popup from '../../common/popup/Index';
import "./css/register.css";

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
            why: '',
            errors: '',
            selectedOption: null
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'contact' && value) {
            value = value.trim()
            value = value.substring(0, 12)
        }
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { name, contact, email, gender, college, state, branch, address, why } = this.state;
        if (name) {
            name = name.trim()
        }
        if (contact) {
            contact = contact.trim()
        }
        if (college) {
            college = college.trim()
        }
        if (branch) {
            branch = branch.trim()
        }
        if (address) {
            address = address.trim()
        }
        if (why) {
            why = why.trim()
        }
        const data = { name, contact, email, gender, college, state, branch, address, why }
        const check = validateInput(email, 'email')
        if (!isNaN(contact)) {
            if (name && contact && email && gender && college && state && branch && address && why && check.isValid) {
                FetchApi('POST', '/api/ca/temp/auth/register', data)
                    .then(r => {
                        if (r && r.data && this.popup) {
                            if (r.data.success === true) {
                                this.popup.show(['Thank you for registering as CA.', `Verification email has been sent to ${this.state.email ? this.state.email : 'your email'}.`], '/CampusAmbassador')
                            } else {
                                this.setState({ errors: 'This email is already registered' })
                            }
                        }
                    })
                    .catch(e => {
                        this.popup.show('Something went wrong.')
                    });
            } else if (check.errors && check.errors.email) {
                this.setState({ errors: check.errors.email })
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
        else {
            this.setState({ errors: "Contact invalid" })
        }
    }

    render() {
        const { name, contact, email, gender, branch, address, why, errors } = this.state;
        return (
            <div className="register-parent">
                <Popup {...this.props} onRef={ref => (this.popup = ref)} />
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
                        <form onSubmit={this.onSubmit}>
                            {errors ?
                                <div style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>
                                    {errors}
                                </div>
                                : null
                            }
                            <div className="form-heading">
                                <h2>CA Registration form</h2>
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
                                    <label htmlFor="inputEmail">Email</label>
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
                                <div className="form-state">
                                    <label htmlFor="inputState">College State</label>
                                    <StateSelect onChange={state => this.setState({ state })} />
                                </div>
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
                            <div className="form-inwhy-child">
                                <label htmlFor="inputWhy">Why should we choose you?</label>
                                <textarea
                                    id="inputWhy"
                                    placeholder="Mention your POR, Achievements, etc..."
                                    name="why"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    rows="2"
                                    value={why}
                                    onChange={this.onChange}
                                    required
                                />
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
