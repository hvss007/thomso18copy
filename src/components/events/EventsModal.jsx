import React from 'react';
import EventDetail from './EventDetails';
import { EventDetails } from './events.js';
import './src/css/EventsModals.css';

export default class EventsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.id,
            subEventId: `${this.props.id}_1`,
        };
        this.nextCat = this.nextCat.bind(this);
        this.prevCat = this.prevCat.bind(this);
    }
    componentWillMount() {
        let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
        this.setState({ data: filteredData[0] });

        window.addEventListener('keyup', this.handleKeys, false);
    }

    handleKeys = e => {
        if (e.keyCode === 27) {
            this.props.modalClose()
        }
        if (e.keyCode === 39) {
            this.nextCat(this.state.eventId)
        }
        if (e.keyCode === 37) {
            this.prevCat(this.state.eventId)
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeys)
    }
    nextCat = (id) => {
        if (id === 18) {
            this.setState({ eventId: 1 }, () => {
                let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
                this.setState(
                    {
                        data: filteredData[0],
                        subEventId: `${this.state.eventId}_1`,
                    });
            })
        } else {
            this.setState({ eventId: id + 1 }, () => {
                let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
                this.setState(
                    {
                        data: filteredData[0],
                        subEventId: `${this.state.eventId}_1`,
                    });
            })
        }
    }
    prevCat = (id) => {
        if (id === 1) {
            this.setState({ eventId: 18 }, () => {
                let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
                this.setState(
                    {
                        data: filteredData[0],
                        subEventId: `${this.state.eventId}_1`,
                    });
            })
        } else {
            this.setState({ eventId: id - 1 }, () => {
                let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
                this.setState(
                    {
                        data: filteredData[0],
                        subEventId: `${this.state.eventId}_1`,
                    });
            })
        }
    }
    render() {
        return (
            <div className="events-modala">
                <div className="events-modala-main-child">
                    <div className="events-modala-second-child">
                        <div className="events-list-child">
                            <ul>
                                {this.state.data && this.state.data.subevents.map(e =>
                                    <li key={e.id} onClick={() => {
                                        this.setState({ subEventId: e.id })

                                    }} className={e.id === this.state.subEventId ? "events-active" : null}>
                                        <p className="events-custom-selection">{e.name}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                        {this.state.data ? <EventDetail history={this.props.history} id={this.state.subEventId} updateParentSubEvent={id => this.setState({ subEventId: id })} detail={this.state.data} eventsId={this.state.eventId} close={this.props.modalClose} subevents={this.state.data.subevents} data={this.props.data} /> : null}
                    </div>
                    <div className="events-modals-last-arrow">
                        <p href="" className="arrow-button-events" onClick={() => this.prevCat(this.state.eventId)}>
                            <img src="/img/main/events/leftarrow.png" alt="left-arrow" width="15px" />
                        </p>
                        <p href="" className="arrow-button-events">
                            <img src="/img/main/events/rightarrow.png" alt="right-arrow" width="15px" onClick={() => this.nextCat(this.state.eventId)} />
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
