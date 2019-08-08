import React from 'react';
import { Link } from 'react-router-dom';

import CollegeSelect from './CollegeSelect';
import StateSelect from './StateSelect';
import "./css/register.css";
import img from "./img/logo.png";
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import validateInput from '../../../utils/validation/loginValidation';

export default class RegisterIndex extends React.Component {
    constructor() {
        super();
        this.state = {
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
        this.Auth = new AuthService()
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }
    componentWillMount() {
        if (this.props.userData) {
            if (this.props.userData.email) {
                this.setState({
                    name: this.props.userData.name,
                    email: this.props.userData.email,
                })
            } else {
                this.setState({
                    name: this.props.userData.name,
                })
            }
            if (!this.props.userData.fb_id) {
                this.props.history.push('/ca/')
            }
        } else {
            this.props.history.push('/ca/')
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'contact' && value) {
            value = value.trim()
            value = value.substring(0, 10)
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
        let data = { name, contact, email, gender, college, state, branch, address, why }
        const check = validateInput(email, 'email')
        if (name && contact && email && gender && college && state && branch && address && why && check.isValid) {
            const tempToken = this.Auth.getTempToken()
            FetchApi('POST', '/api/ca/auth/fbRegister', data, tempToken)
                .then(r => {
                    if (r && r.data && r.data.body) {
                        this.Auth.setToken(r.data.token)
                        this.props.updateRoutes(true)
                        this.props.setUserData(r.data.body)
                        this.props.history.push('/ca/')
                    }
                })
                .catch(e => {
                    if (e.response && e.response.status === 400 && e.response.data && e.response.data.emailerr) {
                        this.setState({ errors: 'Email Already Exists' })
                    }
                    console.log(e)
                });
        } else if (check.errors && check.errors.email) {
            this.setState({ errors: check.errors.email })
        } else {
            this.setState({ errors: 'Fields cannot be empty' })
        }
    }

    render() {
        const { name, contact, email, gender, branch, address, why, errors } = this.state;
        return (
            <div className="register-parent">
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
                                <div style={{textAlign: 'center',  color: 'red', fontWeight: '600'}}>
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
                                        type="number"
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
                                <CollegeSelect onChange={college => this.setState({college})}/>
                            </div>
                            <div className="form-first-child">
                                <div className="form-state">
                                    <label htmlFor="inputState">College State</label>
                                    <StateSelect onChange={state => this.setState({state})}/>
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
                                <label htmlFor="inputAddress">Address</label>
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
                                    placeholder="Your Answer"
                                    name="why"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    rows="1"
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
                </div >
            </div >
        );
    }
}
