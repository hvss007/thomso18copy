import React from 'react';

import './events.css';
export default class EventsIndex extends React.Component {
    render() {
        return (
            <div className="campusAmb-events-indexMain">
                <div className="campusAmb-events-indexMain-child">
                    <div className="campusAmb-events-onlineevents">
                        <div className="campusAmb-events-heading">
                            ONLINE EVENTS
                        </div>
                        <div className="campusAmb-events-details-buttons">
                            <div className="campusAmb-events-details-buttons-child">
                                <button>QUIZARDRY</button>
                            </div>
                        </div>
                    </div>
                    <div className="campusAmb-events-thomsobrochure">
                        <div className="campusAmb-events-heading">
                            THOMSO BROCHURE
                        </div>
                        <div className="campusAmb-events-details-buttons">
                            <div className="campusAmb-events-details-buttons-child">
                                <button>BROCHURE</button>
                            </div>
                        </div>
                    </div>
                    <div className="campusAmb-events-eventswisebrochure">
                        <div className="campusAmb-events-heading">
                            EVENTS WISE BROCHURE
                        </div>
                        <div className="campusAmb-events-details-buttons">
                            <div className="campusAmb-events-details-buttons-child">
                                <button>MUSIC</button>
                            </div>
                            <div className="campusAmb-events-details-buttons-child">
                                <button>DRAMA</button>
                            </div>
                            <div className="campusAmb-events-details-buttons-child">
                                <button>DANCING</button>
                            </div>
                            <div className="campusAmb-events-details-buttons-child">
                                <button>INFORMALS</button>
                            </div>
                            <div className="campusAmb-events-details-buttons-child">
                                <button>FRESHERS</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
