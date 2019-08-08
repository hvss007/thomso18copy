import React, { Component } from "react";
import "./ReferralIndex.css";

export default class ReferralIndex extends Component {
    render() {
        return (
            <div className="campusAmb-referral-main-div">
                <div>
                    <h1 className="referral-heading-ca">Referral Code</h1>
                    <ul>
                        <li>
                             All the campus ambassadors will get a referral code that they may share with the people they know. 
                        </li>
                        <br />
                        <li>
                            People registering with that particular referral code will add to the score of that campus ambassador in the leaderboard. More the number of people registering with the referral code shared, more will be the score of the campus ambassador. 
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

