import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../beta/home/Navbar'
import './src/css/OnlineEvents.css'
import {Helmet} from "react-helmet"

class OnlineEventsIndex extends Component {
    render() {
        return (
            <div className="onlineevents-mainpage-parent">
                <Helmet>
                    <meta keywords="" description="Quizardry in association with dare2compete is the online quiz competition. Its a platform
                        to showcase knowledge and skills on movies, sports, art, music, television, politics." />
                </Helmet>
                <Navbar />
                <div className="main-parent-online-events-1">
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/quizardry">
                                <div className="onlineevents-mainpage-cards-image-quizardry">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                QUIZARDRY
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/quizardry">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/campusclicks">
                                <div className="onlineevents-mainpage-cards-image-campusclicks">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                CAMPUS CLICKS
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/campusclicks">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/meme">
                                <div className="onlineevents-mainpage-cards-image-meme">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                MAY MAY MAKING
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/meme">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-parent-online-events-1">
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/silhoutte">
                                <div className="onlineevents-mainpage-cards-image-silhoutte">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                SILHOUETTE
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/silhoutte">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/MrMissThomso">
                                <div className="onlineevents-mainpage-cards-image-mrmissthomso">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                Mr. AND Ms. THOMSO ONLINE
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/MrMissThomso">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/cupid">
                                <div className="onlineevents-mainpage-cards-image-cupid">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                Cupid's Attack
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/cupid">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OnlineEventsIndex
