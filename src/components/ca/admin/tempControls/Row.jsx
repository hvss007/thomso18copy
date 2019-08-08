import React from 'react';
import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

export default class Row extends React.Component {
    constructor() {
        super();
        this.state = {
            verified: true,
            bonus: 0,
            score: 0,
            referrals: 0,
            fb_score: 0,
            isDisabled: false,
            bonusEditing: false,
            bonusDisabled: false
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        if (this.props.data) {
            let verified = true
            let bonus = 0
            let score = 0
            let referrals = 0
            let fb_score = 0
            if (this.props.data.verified !== undefined) {
                verified = this.props.data.verified
            }
            if (this.props.data.bonus !== undefined) {
                bonus = this.props.data.bonus
            }
            if (this.props.data.score !== undefined) {
                score = this.props.data.score
            }
            if (this.props.data.referrals !== undefined) {
                referrals = this.props.data.referrals
            }
            if (this.props.data.fb_score !== undefined) {
                fb_score = this.props.data.fb_score
            }
            this.setState({verified, bonus, score, referrals, fb_score})
        }
    }

    switchBlock = index => {
        if (this.props.data && this.props.data._id) {
            const authtoken = this.Auth.getToken();
            this.setState({isDisabled: true})
            FetchApi('PUT', `/api/ca/admin/temp/unverify/${this.props.data._id}`, {verified: !this.state.verified}, authtoken)
                .then(r => {
                    if (r && r.data && r.data.success) {
                        this.setState({ isDisabled: false, verified: !this.state.verified })
                    } else {
                        this.setState({ isDisabled: false })
                    }
                })
                .catch(e => {
                    this.setState({ isDisabled: false })
                });
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    toggleEdit = () => {
        if (!this.state.bonusDisabled) {
            if (this.state.bonusEditing) {
                if (this.props.data) {
                    let bonus = 0
                    if (this.props.data.bonus !== undefined) {
                        bonus = this.props.data.bonus
                    }
                    this.setState({bonusEditing: false, bonus})
                } else {
                    this.setState({bonusEditing: false})
                }
            } else {
                this.setState({bonusEditing: true})
            }
        }
    }

    updateBonus = () => {
        if (this.props.data && this.props.data._id && !this.state.bonusDisabled && this.state.bonusEditing) {
            if (parseInt(this.state.bonus, 10) !== undefined) {
                this.setState({bonusDisabled: true})
                const authtoken = this.Auth.getToken();
                const data = {
                    bonus: this.state.bonus,
                    id: this.props.data._id
                }
                FetchApi('PUT', `/api/ca/admin/temp/bonus`, data , authtoken)
                    .then(r => {
                        if (r && r.data && r.data.success && r.data.body && r.data.body.bonus !== undefined) {
                            let referrals = 0
                            let score = 0
                            let bonus = 0
                            let fb_score = 0
                            if (r.data.body.bonus !== undefined) {
                                bonus = r.data.body.bonus
                            }
                            if (r.data.body.score !== undefined) {
                                score = r.data.body.score
                            }
                            if (r.data.body.referrals !== undefined) {
                                referrals = r.data.body.referrals
                            }
                            if (r.data.body.fb_score !== undefined) {
                                fb_score = r.data.body.fb_score
                            }
                            this.setState({bonusEditing: false, bonusDisabled: false, bonus, score, referrals, fb_score})
                        } else {
                            this.setState({bonusDisabled: false})
                        }
                    })
                    .catch(e => {
                        this.setState({bonusDisabled: false})
                    });
            }
        }
        
    }

    render(){
        return (
            <React.Fragment>
                {console.log(this.props)}
                {this.props.data ? 
                    <tr>
                        <td style={{textAlign: 'center'}}>{this.props.data.ca_id ? this.props.data.ca_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.college ? this.props.data.college : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.gender ? this.props.data.gender : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.state.score ? this.state.score : 0}</td>
                        <td style={{textAlign: 'center'}}>{this.state.referrals ? this.state.referrals : 0}</td>
                        <td style={{textAlign: 'center'}}>{this.state.fb_score ? this.state.fb_score : 0}</td>
                        <td style={{textAlign: 'center'}}>{(this.props.data.ideas && this.props.data.ideas.length) ? this.props.data.ideas.length : 'None'}</td>
                        <td style={{textAlign: 'center'}}>
                            <input 
                                type="number" 
                                name="bonus" 
                                autoComplete="off" 
                                value={this.state.bonus} 
                                onChange={this.onChange}
                                disabled={!this.state.bonusEditing}
                            />
                            <button disabled={this.state.bonusDisabled} onClick={ () => this.toggleEdit() }>{this.state.bonusEditing ? 'Cancel': 'Edit'}</button>
                            {this.state.bonusEditing ?
                                <button disabled={this.state.bonusDisabled} onClick={ () => this.updateBonus() }>Update</button>
                                : null
                            }
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <button onClick={this.switchBlock} disabled={this.state.isDisabled}>
                                {this.state.verified ? 'Unverify' : 'Verify' }
                            </button>
                        </td>
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
