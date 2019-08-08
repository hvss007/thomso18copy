import React, { Component } from 'react';
import Navbar from "../beta/home/Navbar";
import "./src/toppr.css";
import Popup from '../common/popup/Index';
import FetchApi from '../../utils/FetchAPI';
import validateInput from '../../utils/validation/loginValidation';
import topprlogo from './src/topprlogo.jpg';

class Toppr extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            schoolname: "",
            city: "",
            standard: "",
            mobilenumber: "",
            email: "",
            entry: "",
            errors: ""
        }
    }
    handleChange = (e) => {
        const name = e.target.name; let value = e.target.value; if (name === 'mobilenumber' && value) {
            value = value.trim()
            value = value.substring(0, 10)
        }
        console.log("skjf");
        this.setState({ [name]: value }); }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('sjk');
        let { name, schoolname, email, city, standard, mobilenumber, entry } = this.state;
        if (name) {
            name = name.trim()
        }
        if (schoolname) {
            schoolname = schoolname.trim()
        }
        if (email) {
            email = email.trim()
        }
        if (city) {
            city = city.trim()
        }
        if (standard) {
            standard = standard.trim()
        }
        if (mobilenumber) {
            mobilenumber = mobilenumber.trim()
        }
        if (entry) {
            entry = entry.trim()
        }
        const data = { name, schoolname, email, city, standard, mobilenumber, entry }
        const check = validateInput(email, 'email')
        if (!isNaN(mobilenumber)) {
            console.log(this.state)
            if (name && mobilenumber && city && standard && email && schoolname && entry && check.isValid) {
                console.log("hello")
                FetchApi('POST', '/api/mun/toppr', data)
                    .then(r => {
                        if (r && r.data && this.popup) {
                            if (r.data.success === true) {
                                this.popup.show(['Thank you for submitting in TOPPR'])
                                this.setState({
                                    name: "",
                                    schoolname: "",
                                    email: "",
                                    city: "",
                                    class: "",
                                    mobilenumber: "",
                                    entry: ""
                                })
                            } else {
                                this.popup.show(r.data.msg);
                            }
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        this.popup.show('Something went wrong.')
                    });
            } else if (check.errors && check.errors.email) {
                console.log("sda")
                this.setState({ errors: check.errors.email })
            } else {
                console.log("ss")
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
        else {
            this.setState({ errors: "Mobile Number invalid" })
        }
    }

    render() {
        const { name, schoolname, city, standard, mobilenumber, email, entry, errors } = this.state
        return (

            <div className="main-toppr-parent" >
                <Popup {...this.props} onRef={ref => (this.popup = ref)} />
                <Navbar />
                <div className="main-toppr-child-first">
                    <div className="main-toppr-child-first-details">
                        <p className="toppr-association-heading">
                            Thomso in association with 
                            <a href="https://www.toppr.com/" className="toppr-link" target="_blank" rel="noopener noreferrer">
                                TOPPR 
                            </a>
                            <span>
                                <a href="https://www.toppr.com/" target="_blank" rel="noopener noreferrer">
                                    <img src={topprlogo} className="toppr-logo" alt="toppr logo" />
                                </a>
                            </span>
                                presents
                        </p>
                        <div className="main-toppr-child-first-details-heading">
                            <h2>WRITE UP COMPETITION</h2>
                        </div>
                        <div className="main-toppr-child-first-details-content">
                            <p>
                                'Writing is the painting of the voice.' To bring out the inner writer within you, Thomso in association with Toppr presents to you a writing competition for students with an opportunity to let the world know about your inner potential.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="main-toppr-child-second">
                    <form onSubmit={this.handleSubmit}>
                        {errors ?
                            <div style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>
                                {errors}
                            </div>
                            : null
                        }
                        <div className="main-toppr-child-second-heading">
                            <h2>Registration</h2>
                        </div>
                        <div className="main-toppr-child-second-form-child">
                            <div className="main-toppr-form-fields">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    name="name"
                                    placeholder="Name"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="main-toppr-form-fields">
                                <label>School Name</label>
                                <input
                                    type="text"
                                    value={schoolname}
                                    name="schoolname"
                                    placeholder="School Name"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="main-toppr-form-fields">
                                <label>City</label>
                                <input
                                    type="text"
                                    value={city}
                                    name="city"
                                    placeholder="City"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="main-toppr-form-fields">
                                <label>Class(7th to 12th)</label>
                                <select
                                    value={standard}
                                    name="standard"
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                            <div className="main-toppr-form-fields">
                                <label>Mobile Number</label>
                                <input
                                    type="number"
                                    value={mobilenumber}
                                    name="mobilenumber"
                                    placeholder="Mobile Number"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="main-toppr-form-fields">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    name="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="main-toppr-form-fields">
                                <label>Your Entry</label>
                                <textarea
                                    type="text"
                                    value={entry}
                                    name="entry"
                                    placeholder="Your Entry"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="main-toppr-form-fields">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

export default Toppr;
