import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import img from "../../campusAmbassador/register/img/logo.png";
import FetchApi from '../../../utils/FetchAPI';
import validateInput from '../../../utils/validation/loginValidation';
import Popup from '../../common/popup/Index';
import "../../campusAmbassador/register/css/register.css";

export default class RegisterIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            contact: '',
            email: '',
            sponsorType: '',
            message: '',
            errors: ''
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
        let { name, contact, email, sponsorType, message } = this.state;
        if (name) {
            name = name.trim()
        }
        if (contact) {
            contact = contact.trim()
        }
        if (message) {
            message = message.trim()
        }
        const data = { name, contact, email, sponsorType, message }
        const check = validateInput(email, 'email')

        if (name && contact && sponsorType && check.isValid) {
            FetchApi('POST', '/api/beta/associate', data)
                .then(r => {
                    if (r && r.data && this.popup) {
                        if (r.data.success === true) {
                            this.popup.show(['Thank you for associating with us', ``])
                            this.setState({
                                name: '',
                                contact: '',
                                email: '',
                                sponsorType: '',
                                message: '',
                                errors: ''
                            })
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

    render() {
        const { name, contact, email, sponsorType, message, errors } = this.state;
        return (
            <div className="register-parent">
                <Helmet>
                    <meta keywords="" description="Associate with Thomso by registering in your details. Fill in the name, email id, contact
                        number and connect with us" />
                </Helmet>
                <Popup {...this.props} onRef={ref => (this.popup = ref)} />
                <div className="register-child">
                    <div className="register-child-child">
                        <div className="register-heading">
                            <div className="r-logo">
                                <Link to="/"><img src={img} alt="r-logo" /></Link>
                            </div>
                            <div className="vertical_line">
                            </div>
                            <div className="register-ca common-cursor" style={{ margin: 'auto 0' }}>
                                <h1 style={{ marginTop: '0' }} >ASSOCIATE</h1>
                            </div>
                        </div>
                        <Link to="/sponsors" className="register-ca common-cursor register-ca-spons">
                            <h1 style={{ marginTop: '0', cursor: 'pointer' }} >Our Sponsors</h1>
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
                                <h2>Associate With Us</h2>
                            </div>
                            <div className="form-first-child">
                                <div className="form-name">
                                    <label htmlFor="inputName">Name</label>
                                    <input
                                        id="inputName"
                                        type="text"
                                        placeholder="Organization Name"
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
                                        placeholder="Contact Email"
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
                                    <label htmlFor="inputGender">Connect as</label>
                                    <select
                                        id="inputGender"
                                        name="sponsorType"
                                        value={sponsorType}
                                        onChange={this.onChange}
                                        required
                                        style={{ textAlignLast: 'center' }}
                                    >
                                        <option value="" disabled="true"> Type </option>
                                        <option value="Sponsors"> Sponsors </option>
                                        <option value="Media"> Media </option>
                                        <option value="Partner"> Partner </option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-inwhy-child">
                                <label htmlFor="inputWhy">Message</label>
                                <textarea
                                    id="inputWhy"
                                    placeholder="Your message here..."
                                    name="message"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    rows="1"
                                    value={message}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="register">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
