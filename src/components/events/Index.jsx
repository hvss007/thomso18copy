import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import EventsOpening from './EventsOpening.jsx';
import './src/css/Index.css';

class EventsIndex extends Component {
    render() {
        return (
            <div className="index-main-div">
                <Helmet>
                    <meta keywords="" description="Thomso conducts various events and fun activities broadly categoriezed as under
                    choreo,dramatics, music, nightlife, fashion, cinematics, marketing and finance and quizzing. The winners
                    are rewarded with exciting prices and goodies." />
                </Helmet>
                <EventsOpening history={this.props.history} />
            </div>
        );
    }
}

export default EventsIndex;
