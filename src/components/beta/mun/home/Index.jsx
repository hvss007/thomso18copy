import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from "../../../../handlers/main/AuthService";

import Navbar from '../../home/Navbar';
import Rupee from '../../../events/src/Rupee';

import Form from './Form';

import '../../../events/src/css/EventsModals.css';

export default class EventsModal extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            showForm: false
        };
        this.Auth = new AuthService();
    }

    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            this.setState({ isAuthenticated })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                {!this.state.showForm ?
                    <div className="events-modala">
                        <div className="events-modala-main-child">
                            <div className="events-modala-second-child">
                                <div className="events-details-images-main-div" style={{
                                    backgroundImage: `url(/img/main/events/events/iitrmun.jpeg)`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center center",
                                }}>
                                    <div className="events-details-images-main-div-child" style={{marginTop: '20vh'}}>
                                        <div className="events-details-images-name">
                                            <p>IITR MUN</p>
                                        </div>
                                    </div>
                                    <div className="events-details-parent">
                                        <div className="events-details-image">
                                            <div className="events-price_money">
                                                <div>Prizes Worth</div>
                                                <div><Rupee /><span>35k</span></div>
                                            </div>
                                            <div className="events-text-scroll-cont">
                                                <p className="events-text-child">True to the spirit of the United Nations, this event strives to foster a constructive forum for open dialogue on complex global issues, including international peace and security, and economic and social progress. During the conference, students learn the importance of balancing national interests with the needs of the international community, while also learning about the powers and limitations of international negotiation. Delegates will preserve their countries’ national policy while negotiating in the face of other, sometimes conflicting, international policies</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="events-addevents">
                                        <div className="events-addevents-child">
                                            <React.Fragment>
                                                {
                                                    this.state.isAuthenticated ?
                                                    <div className="be-events-modal-button" onClick={() => this.setState({showForm: true})}>Add Event</div> :
                                                    <Link className="be-events-modal-button" to="/main">Login/Register</Link>
                                                }
                                            </React.Fragment>
                                        </div>
                                        <div className="events-addevents-child">
                                            <a href="https://drive.google.com/open?id=1DT-2RWF85m8ST_yNcGFyy8szl-0mZ64R" className="be-events-modal-button" target="_blank" rel="noopener noreferrer">Rulebook</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Form history={this.props.history} />
                }
            </React.Fragment>
        )
    }
}
