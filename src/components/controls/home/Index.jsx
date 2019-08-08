import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../../handlers/controls/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import "../src/style.css"
export default class HomeIndex extends Component {
    constructor() {
        super();
        this.state = {
            thomso_id: '',
            thomso_id1: '',
            errors: '',
            userData: [],
            disabled: false,
            disabledPayment: false,
            payment_type: '',
            accomodation: '',
            message: '', user:''
        };
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value, errors: "", message: '' });
    }

    onReset = () => {
        this.setState({
            userData: ''
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            let { thomso_id } = this.state;
            const data = { thomso_id };
            if (data && data.thomso_id) {
                this.setState({ disabled: true })
                const isAuthenticated = this.Auth.hasToken();
                if (isAuthenticated) {
                    const token = this.Auth.getToken()
                    FetchApi('POST', '/api/controls/user_info', data, token)
                        .then(r => {
                            console.log(r.data.body)
                            if (r && r.data && r.data.success && r.data.body && r.data.body.payment_type === 0) {
                                if(r.data.body.image){
                                    if( process.env.REACT_APP_SERVER_ENVIORNMENT === "dev"){
                                        this.setState({ userData: r.data.body, disabled: false, thomso_id1: r.data.body.thomso_id, thomso_id: '',  user: 'https://localhost:' + process.env.REACT_APP_SERVER_PORT + '/uploads/img/ProfileImage/' + r.data.body.image });
                                    }
                                    else{
                                        this.setState({ userData: r.data.body, disabled: false, thomso_id1: r.data.body.thomso_id, thomso_id: '', user: '/uploads/img/ProfileImage/' + r.data.body.image });
                                    }
                                }
                                else{
                                    this.setState({ userData: r.data.body, disabled: false, thomso_id1: r.data.body.thomso_id, thomso_id: ''});
                                }
                            }
                            else {
                                if (r && r.data && r.data.success && r.data.body) {
                                    this.setState({ disabled: false, errors: "user already verified" });
                                }
                            }
                        })
                        .catch(e => {
                            if (e.response && e.response.data) {
                                this.setState({ disabled: false, errors: e.response.data.msg })
                            } else {
                                this.setState({ disabled: false, errors: 'Something went wrong' })
                            }
                        });
                }
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
    }

    onPayment = (e) => {
        e.preventDefault();
        if (!this.state.disabledPayment) {
            let { thomso_id1, payment_type, accomodation } = this.state;
            const data = { payment_type, accomodation, thomso_id1 };
            if (data && data.payment_type && data.accomodation) {
                this.setState({ disabledPayment: true })
                const isAuthenticated = this.Auth.hasToken();
                if (isAuthenticated) {
                    const token = this.Auth.getToken()
                    FetchApi('PUT', '/api/controls/payment_update', data, token)
                        .then(r => {
                            if (r && r.data && r.data.success) {
                                this.setState({ disabledPayment: false, message: 'Payment Verified' });
                            }
                        })
                        .catch(e => {
                            if (e.response && e.response.data) {
                                this.setState({ disabledPayment: false, errors: e.response.data.msg })
                            } else {
                                this.setState({ disabledPayment: false, errors: 'Something went wrong' })
                            }
                        });
                }
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
    }

    render() {
        const { errors, thomso_id, disabled, disabledPayment, userData, payment_type, message, accomodation ,user} = this.state;
        return (
            <div className="controls-parent">
                <div className="controlsMainDiv">
                    <form style={{ paddingTop: "100px" }} onSubmit={this.onSubmit}>
                        {errors ?
                            <div className="controlsRedError">
                                {errors}
                            </div>
                            : null
                        }
                        <div>
                            <h2>Payment Verification</h2>
                        </div>
                        <div >
                            <div>
                                <input
                                    name="thomso_id"
                                    type="text"
                                    id="inputThomsoID"
                                    placeholder="Thomso ID"
                                    value={thomso_id}
                                    onChange={this.onChange}
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    spellCheck="off"
                                    required
                                    className="controlsThomsoIdForm"
                                />
                            </div>
                        </div>
                        <div>
                            <button style={{ marginTop: "20px" }} type="submit" disabled={disabled}>SUBMIT</button>
                        </div>
                    </form>
                    <div>
                        <button style={{ marginTop: "20px" }} type="button" onClick={this.onReset} > Reset Details </button>
                    </div>
                    <div style={{ paddingTop: "50px" }}>
                        <Link to="controls/logout" style={{ textDecoration: "none", color: "red" }}>LOGOUT</Link>
                    </div>
                </div>
                <div className="controlsCsecondDiv">

                    {userData && userData.thomso_id ?
                         
                        <div className="controlsDetail" style={{ paddingBottom: "7px" }}>
                            <div className="upload-image-parent-div">
                                <img src={user} style={{height:"65px", width:"auto"}} alt="User"/>
                            </div>
                            <div className="contols-detail">
                                <div> Thomso Id :</div> <div>{userData.thomso_id ? userData.thomso_id : null}</div>
                            </div>
                            <div className="contols-detail">
                                <div> Name :</div> <div>{userData.name ? userData.name : null}</div>
                            </div>
                            <div className="contols-detail">
                                <div> College :</div><div>{userData.college ? userData.college : null}</div>
                            </div>
                            <div className="contols-detail">
                                <div> Contact :</div><div>{userData.contact ? userData.contact : null}</div>
                            </div>
                            <div className="contols-detail">
                                <div> Branch :</div><div>{userData.branch ? userData.branch : null}</div>
                            </div>
                            <div className="contols-detail">
                                <div> Gender :</div><div>{userData.gender ? userData.gender : null}</div>
                            </div>
                            <div className="contols-detail">
                                <div> Address :</div><div>{userData.address ? userData.address : null}</div>
                            </div>
                            <div className="contols-detail">
                                <div> State :</div><div>{userData.state ? userData.state : null}</div>
                            </div>
                            <form onSubmit={this.onPayment}>
                                <div className="controls-input">
                                    <label htmlFor="paymentType">Payment Type : </label>
                                    <select
                                        id="paymentType"
                                        name="payment_type"
                                        value={payment_type}
                                        onChange={this.onChange}
                                        required
                                        className="controlPaymentForm"
                                    >
                                        <option value="" disabled> Payment Type </option>
                                        <option value="1"> Online Payment </option>
                                        <option value="2"> NEFT </option>
                                        <option value="3"> Draft </option>
                                        <option value="4"> Campus Ambassador </option>
                                    </select>
                                </div>
                                <div className="controls-input">
                                    <label htmlFor="inputType">Accomodation Type : </label>
                                    <select
                                        id="inputType"
                                        name="accomodation"
                                        value={accomodation}
                                        onChange={this.onChange}
                                        required
                                        className="controlAccomodatioForm"
                                    >
                                        <option value="" disabled="true"> Accomodation Type </option>
                                        <option value="accomodation"> Accomodation </option>
                                        <option value="non-accomodation"> Non-accomodation </option>
                                    </select>
                                </div>
                                <div className="controls-button">
                                    <button type="submit" disabled={disabledPayment}>SUBMIT</button>
                                </div>
                            </form>

                            {message ?
                                <div className="controlsGreenError">
                                    {message}
                                </div>
                                : null
                            }
                        </div>
                        : <span className="controlsNoUSer">No User</span>}
                </div>
            </div>

        );
    }
}
