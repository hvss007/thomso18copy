import React from 'react';
import Navbar from '../../beta/home/Navbar.jsx'
import { Helmet } from "react-helmet";
import './cards.css';

import { MemberDetails } from "./info";
import Vertical from './Vertical';
export default class TeamIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            memberdetails: MemberDetails,
        }
    }
    componentDidMount() {
        this.setState({
            memberdetails: MemberDetails
        })
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="main-team-card-maindiv">
                    <Helmet>
                        <meta keywords="" description="Team thomso has thoughtfully divided roles, responsibilities. Various positions held by
                            students of IIT Roorkee for cultural fest are of convener, co-cownvener, sponserships, technical, design,
                            marketing, promotions." />
                    </Helmet>
                    <div className="main-team-wrapper">
                        {this.state.memberdetails.map((post, index) =>

                            <Vertical post={post} key={index} />
                        )}

                    </div>
                </div>
            </div>
        )
    }
}
