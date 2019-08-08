import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from "../../handlers/main/AuthService";
import FetchApi from "../../utils/FetchAPI";
import './src/css/EventsModals.css';
import Rupee from './src/Rupee';

export default class EventDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            wait: false,
            isAuthenticated: false
        };
        this.registerEvent = this.registerEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.Auth = new AuthService();
    }
    registerEvent(eventId, id) {
        this.setState({ wait: true, disabled: true });
    }
    handleChange(id) {
        // const filteredData = this.props.subevents.filter(s => s.id === id);
        // this.setState({ data: filteredData[0] });
        this.props.updateParentSubEvent(id);
    }
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (this.props.detail && this.props.detail.subevents) {
            const filteredData = this.props.detail.subevents.filter(e => e.id === this.props.id);
            if (filteredData) {
                this.setState({ data: filteredData[0], isAuthenticated });
            } else {
                this.setState({ isAuthenticated })
            }
        } else if (isAuthenticated) {
            this.setState({ isAuthenticated })
        }
    }
    componentWillReceiveProps(nextProps) {
        const filteredData = nextProps.detail.subevents.filter(e => e.id === nextProps.id);
        this.setState({ data: filteredData[0] });
    }
    addEvent() {
        let event_id = this.props.id
        if (event_id) {
            const data = { event_id }
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/main/addParticipant', data, token)
                .then(r => {
                    if (r && r.data && r.data.success) {
                        this.props.history.push('/main')
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }
    render() {
        return (

            <div className="events-details-images-main-div" style={{
                backgroundImage: `url(/img/main/events/events/${this.state.data.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}>
                <div className="events-details-images-main-div-child">
                    <div className="events-details-images-name">
                        {(this.state.data && this.state.data.name) ? <p>{this.state.data.name}</p> : null}
                        {(this.state.data && this.state.data.details) ? <p>{this.state.data.details}</p> : null}
                    </div>
                    <div className="events-details-modal">
                        <span className="events-modal-close" onClick={this.props.close}>
                            &times;
                        </span>
                    </div>
                </div>
                <div className="events-dropdown">
                    <select className="events-dropdown-select" onChange={(e) => this.handleChange(e.target.value)}>
                        {(this.props.subevents && this.props.subevents.length) ? this.props.subevents.map(s =>
                            <option value={s.id} key={s.id} style={{ color: "#000000" }}>{s.name}</option>
                        ) : null}
                    </select>
                </div>
                {this.state.data ?
                    <div className="events-details-parent">
                        <div className="events-details-image">
                            {this.state.data.prize ?
                                <div className="events-price_money">
                                    <div>Prizes Worth</div>
                                    <div><Rupee /><span>{this.state.data.prize}k</span></div>
                                </div> : null}
                        </div>
                        <div className="events-text-scroll-cont">
                            <p className="events-text-child" style={{ display: 'block' }}>{this.state.data.content}
                                {(this.state.data && this.state.data.promotionalLink) ? <p className="events-text-child" style={{ marginTop: '10px', color: 'gold' }}>Register <a href={this.state.data.promotionalLink} style={{ fontWeight: '500', color: 'red', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">&nbsp;here&nbsp;</a> for {this.state.data.name ? this.state.data.name : null}</p> : null}
                            </p>
                        </div>
                    </div> : null}
                {this.state.data && !this.state.data.noRegister ?
                    <div className="events-addevents">
                        <div className="events-addevents-child">
                            {this.state.data.link ?
                                <a className="be-events-modal-button" href={this.state.data.link} target="_blank" rel="noopener noreferrer">Visit Page</a>
                                :
                                <React.Fragment>
                                    {this.state.isAuthenticated ? <div className="be-events-modal-button" onClick={this.addEvent}>Add Event</div> :
                                        <Link className="be-events-modal-button" to="/main">Login/Register</Link>
                                    }
                                </React.Fragment>
                            }
                        </div>
                        {
                            this.state.data.rulebook ?
                                <div className="events-addevents-child">
                                    <a href={this.state.data.rulebook} className="be-events-modal-button" target="_blank">Rulebook</a>
                                </div>
                                : null
                        }
                    </div>
                    : null}
                {this.state.data && this.state.data.noRegister ? 
                    <div className="events-registration">
                        {this.state.data.noRegister}
                    </div> : null
                }
                <div className="terms-and-conditions-last">
                    *The net worth of prize money is subjected to total participation in the event <br /> and will be decided by the core committee of Thomso 18.
                </div>
            </div>
        )
    }
}

