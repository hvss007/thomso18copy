import React from 'react'
import AuthService from '../../../handlers/ca/temp/AuthService'
import FetchApi from '../../../utils/FetchAPI'
import './src/css/ProfileIndex.css'

export default class ProfileIndex extends React.Component {
    constructor() {
        super()
        this.state = {
            profileData: null
        }
        this.Auth = new AuthService()
    }

    componentDidMount() {
        const authtoken = this.Auth.getToken()
        FetchApi('GET', '/api/ca/temp/profile', null, authtoken)
            .then(r => {
                if (r && r.data && r.data.success && r.data.body) {
                    this.setState({ profileData: r.data.body })
                }
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <React.Fragment>
                {
                    (this.state.profileData && this.props.userData) ?
                        <div className="profile-data-main">
                            <div className="profile-main-parent">
                                <div className="profile-college-main-div">
                                    <div className="profile-image-facebook-div">
                                        {this.props.userData.image ? <img className="profile-image-facebook" src={this.props.userData.image} alt="profile" />:null}
                                    </div>
                                    <div className="profile-college-child2">
                                        <p className="user-names-profiles">
                                            <b className="user-name-profile">{this.props.userData.name}</b>
                                            ({this.props.userData.email})
                                        </p>
                                        <p className="user-profile-college">
                                            {this.props.userData.college}
                                        </p>
                                        <p className="user-profile-ca-id">
                                            {this.props.userData.ca_id}
                                        </p>
                                    </div>
                                </div>
                                <p className="my-insights-profile-ca"><i>My Insights</i></p>
                                <div className="profiles-scores-chart">
                                    <div className="profiles-scores-chart-1">
                                        <div>
                                            <b>
                                                {this.state.profileData.fb_likes}
                                            </b>
                                            <p>
                                                LIKES
                                            </p>
                                        </div>
                                        <div>
                                            <b>
                                                {this.state.profileData.fb_shares}
                                            </b>
                                            <p>
                                                SHARES
                                            </p>
                                        </div>
                                        <div>
                                            <b>
                                                {this.state.profileData.bonus}
                                            </b>
                                            <p>
                                                BONUS
                                            </p>
                                        </div>
                                        <div>
                                            <b>
                                                {this.state.profileData.ideas ? this.state.profileData.ideas.length : 0} 
                                            </b>
                                            <p>
                                                IDEAS
                                            </p>
                                        </div>
                                        <div>
                                            <b>
                                                {this.state.profileData.referrals}
                                            </b>
                                            <p>
                                                REFERRALS
                                            </p>
                                        </div>
                                    </div>
                                    <div className="profiles-scores-chart-2">
                                        <div>
                                            <b>
                                                {this.state.profileData.score}
                                            </b>
                                            <p>
                                                SCORES
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="scores-updation-notice">*Scores will be updated within 24 hours</p>
                            </div>
                        </div>
                        : null
                }
            </React.Fragment>
        )
    }
}
