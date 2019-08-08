import React from "react";
import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
// import validateInput from '../../../utils/validation/loginValidation';
import AuthService from '../../../handlers/coordinators/AuthService';

// import "../../campusAmbassador/register/css/register.css";
// import img from "../../campusAmbassador/register/img/logo.png"

export default class RegisterIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            contact: '',
            email: '',
            gender: '',
            branch: '',
            year:'',
            enrollment_no:'',
            bhawan:'',
            errors:''
        }
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'contact' && value) {
            value = value.trim();
            value = value.substring(0, 10)
        }
        this.setState({ [name]: value , errors:''});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { name, contact,  email, gender, branch, year, event_id, enrollment_no, bhawan} = this.state;
        if (name) name = name.trim()
        if (email) email = email.trim()
        if (gender) gender = gender.trim()
        if (contact) contact = contact.trim()
        if (branch) branch = branch.trim()
        if (year) year = year.trim()
        // {console.log(this.props)}
        event_id = this.props.userData.event_id;
        if (bhawan) bhawan = bhawan.trim()
        if (enrollment_no) enrollment_no = enrollment_no.trim()
        const isAuthenticated = this.Auth.hasToken();
        if (!isNaN(contact) ) {
            if(isAuthenticated){
                const data = { name, contact,  email, gender, branch, year, event_id, enrollment_no, bhawan}
                if (name && contact &&  email && gender && branch && year && event_id && enrollment_no && bhawan ) {
                    const token = this.Auth.getToken();
                    FetchApi('POST', '/api/coordinators/addCoCoordinator', data, token)
                        .then(res => {
                            if (res && res.data) {
                                if (res.data.success === true) {
                                    this.setState({ errors: "Co-coordinator Added" });
                                }
                                else
                                    this.setState({ errors: res.data.msg })
                            }
                        })
                        .catch(e => {
                            this.setState({ errors: "Something went wrong." })
                        });
                }  else {
                    this.setState({ errors: 'Fields cannot be empty' })
                }
            }
            else {
                this.setState({ errors: "Unauthenticated" })
            }
        }
        else {
            this.setState({ errors: "Contact invalid" })
        }
    }

    render() {
        const {errors, name,contact,  email, gender, branch, year, enrollment_no, bhawan} = this.state;
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
                    <div>
                        <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators"> Add Winner </Link></span>
                        <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/showWinner"> Show Winner's List </Link></span>
                        <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/participants"> Participants List </Link></span>
                        <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/showCoCOordinator"> Show Co-coordinator </Link></span>
                        <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/logout"> Logout </Link></span>
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
                                        <option value="" disabled> Gender </option>
                                        <option value="male"> Male </option>
                                        <option value="female"> Female </option>
                                        <option value="other"> Other </option>
                                    </select>
                                </div>
                                <div className="form-email">
                                    <label htmlFor="inputEmail">Email </label>
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
                                <div className="form-contactnumber">
                                    <label htmlFor="inputContact">Contact </label>
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
