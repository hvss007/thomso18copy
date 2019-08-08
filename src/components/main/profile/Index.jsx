import React from 'react'
import { Link } from 'react-router-dom'
import FetchApi from '../../../utils/FetchAPI'
import AuthService from '../../../handlers/main/AuthService'

import EventRow from './EventRow'
import '../src/css/profile.css'
// import UpdateImage from "../sidebar/UpdateImage"

export default class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            event_id: '',
            event_name: '',
            isPrimary: false,
            disabled: true,
            events: [],
            img: ''
        }
        this.Auth = new AuthService()
    }

    componentDidMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('GET', '/api/main/events', null, token)
                .then(r => {
                    if (r && r.data && r.data.body) {
                        // console.log(r.data.body)
                        this.setState({ events: r.data.body })
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    onChange = (e) => {
        let value = e.target.value;
        this.setState({ event_id: value, disabled: false });
    }

    render() {
        return (
            <div className="participant-profile-parent">
                <div className="participant-child-get-seized">
                    <p>GET SEIZED</p>
                </div>
                <div className="participant-profile-child-details">
                    <div className="participant-profile-child-left">
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Name:</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.name) ? this.props.userData.name : null}</p>
                        </div>
                        {/* <div className="participant-profile-child-left-details">
                            <UpdateImage imagePrev={(data) => this.setState({ img: data })} />
                        </div> */}
                        <div className="participant-profile-child-left-details" style={{ display: "inline-block", width: "50%" }}>
                            <p className="participant-profile-label">Thomso ID :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.thomso_id) ? this.props.userData.thomso_id : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details" style={{ display: "inline-block", width: "40%", marginLeft: "12px" }}>
                            <p className="participant-profile-label">Gender :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.gender) ? this.props.userData.gender : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details college">
                            <p className="participant-profile-label">College:</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.college) ? this.props.userData.college : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Address :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.address) ? this.props.userData.address : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Mobile :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.contact) ? this.props.userData.contact : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Email:</p><p className="participant-somedetails participant-somedetails-email">{(this.props.userData && this.props.userData.email) ? this.props.userData.email : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Primary event :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.primary_event && this.props.userData.primary_event.name) ? this.props.userData.primary_event.name : null}</p>
                        </div>
                    </div>
                    <div className="participant-profile-child-right">
                        <div className="participant-profile-events">
                            <div className="participant-profile-event-heading">
                                My Events
                            </div>
                            <div className="participant-profile-event-details">
                                <table className="participant-profile-table-events">
                                    <tbody>
                                        {this.state.events.event ? this.state.events.event.map((data, i) => <EventRow key={`events${i + 1}`} index={i} data={data} primaryEvent={this.state.events.primary_event} />)
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="main-events-add-more-parent">
                            <Link to="/events" className="main-events-add-more">Add More events</Link>
                        </div>
                        <div className="main-events-payment-buttons">
                            <Link to="/payment"><button>Proceed for Payment</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

