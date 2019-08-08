import React, { Component } from 'react';
import EventsModal from './EventsModal';
import { EventDetails } from './events.js';
import Navbar from '../beta/home/Navbar.jsx';
import './src/css/EventsOpening.css';

class EventsOpening extends Component {
    constructor() {
        super();
        this.state = {
            data: false,
            showModal: false,
            eventId: false,
            dataEvents: EventDetails,
            showMain: false,
        }
        this.showEventModal = this.showEventModal.bind(this);
    }
    // componentWillMount(){
    //     window.innerWidth > 560 ? this.setState({mobile: false}) : this.setState({mobile: true});
    // }
    componentDidMount() {
        this.setState({
            dataEvents: EventDetails
        });
    }
    // componentDidMount(){
    //     FetchApi('get', UserEventsUrl, null, LoginToken)
    //         .then(r => this.setState({dataEvents: r.data}))
    //         .catch(e => console.log(e));
    // }
    showEventModal = (id) => {
        this.setState({ showModal: true, eventId: id, showMain: true })
    }
    render() {
        let [e1, e2, e3] = [[], [], []];
        for (let i = 0; i < 19; i++) {
            if (i < 6) {
                e1.push(EventDetails[i])
            }
            if (i >= 6 && i < 12) {
                e2.push(EventDetails[i])
            }
            if (i >= 12 && i < 18) {
                e3.push(EventDetails[i])
            }

        }
        return (
            <div>
                {this.state.showModal && this.state.dataEvents ?
                    <div className="events-modals-events-opening">
                        <EventsModal history={this.props.history} id={this.state.eventId} modalClose={() => this.setState({ showModal: false })} data={this.state.dataEvents ? this.state.dataEvents : null} />
                    </div>
                    : null}
                {(this.state.showModal === false) ? <Navbar events="true" /> : null}
                <div className={(this.state.showModal === true) ? "events-not-scroll" : " events-scroll"} >
                    <div className={(this.state.showModal === true) ? "events-opening-main-div events-in-desktop" : "events-opening-main-div events-in-desktop hide-scroll-events"}>
                        <div className="events-opening-column1">
                            {e1.map(e =>
                                <div className={(this.state.showModal === true) ? "events-opening-decrease-opacity" : null} key={e.id} onClick={() => this.showEventModal(e.id)} style={{ overflow: "hidden" }}>
                                    <figure className="nik-custom-effect-glass black_white_new events-figure">
                                        <img src={`/img/main/events/${e.image}`} alt={e.name} className="events-images-opening-main" />
                                        <figcaption>
                                            <h2 className="events-images-opening-heading">{e.name}</h2>
                                        </figcaption>
                                    </figure>
                                </div>
                            )}
                        </div>
                        <div className="events-opening-column2">
                            {e2.map(e =>
                                <div className={(this.state.showModal === true) ? "events-opening-decrease-opacity" : null} key={e.id} onClick={() => this.showEventModal(e.id)} style={{ overflow: "hidden" }}>
                                    <figure className="nik-custom-effect-glass black_white_new events-figure">
                                        <img src={`/img/main/events/${e.image}`} alt={e.name} className="events-images-opening-main" />
                                        <figcaption>
                                            <h2 className="events-images-opening-heading">{e.name}</h2>
                                        </figcaption>
                                    </figure>
                                </div>
                            )}
                        </div>
                        <div className="events-opening-column3">
                            {e3.map(e =>
                                <div className={(this.state.showModal === true) ? "events-opening-decrease-opacity" : null} key={e.id} onClick={() => this.showEventModal(e.id)} style={{ overflow: "hidden" }}>
                                    <figure className="nik-custom-effect-glass black_white_new events-figure">
                                        <img src={`/img/main/events/${e.image}`} alt={e.name} className="events-images-opening-main" />
                                        <figcaption>
                                            <h2 className="events-images-opening-heading">{e.name}</h2>
                                        </figcaption>
                                    </figure>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventsOpening;
