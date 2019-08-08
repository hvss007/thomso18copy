import React from 'react';
import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

export default class Row extends React.Component {
    constructor() {
        super();
        this.state = {
            blocked: false,
            bonus: 0,
            isDisabled: false,
            bonusEditing: false,
            bonusDisabled: false
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        if (this.props.data) {
            let blocked = false
            let bonus = 0
            if (this.props.data.blocked !== undefined) {
                blocked = this.props.data.blocked
            }
            if (this.props.data.bonus !== undefined) {
                bonus = this.props.data.bonus
            }
            this.setState({blocked, bonus})
        }
    }

    switchBlock = index => {
        if (this.props.data && this.props.data._id) {
            const authtoken = this.Auth.getToken();
            this.setState({isDisabled: true})
            FetchApi('PUT', `/api/ca/admin/block/${this.props.data._id}`, {blocked: !this.state.blocked}, authtoken)
                .then(r => {
                    if (r && r.data && r.data.success) {
                        this.setState({ isDisabled: false, blocked: !this.state.blocked })
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
                console.log(authtoken)
                FetchApi('PUT', `/api/ca/admin/bonus`, data , authtoken)
                    .then(r => {
                        if (r && r.data && r.data.success && r.data.body && r.data.body.bonus !== undefined) {
                            this.setState({bonusEditing: false, bonusDisabled: false, bonus: r.data.body.bonus})
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
                {this.props.data ? 
                    <tr>
                        <td style={{textAlign: 'center'}}>{this.props.data.ca_id ? this.props.data.ca_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.gender ? this.props.data.gender : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.likes ? this.props.data.likes : 0}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.shares ? this.props.data.shares : 0}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.score ? this.props.data.score : 0}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.referrals ? this.props.data.referrals : 0}</td>
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
                            <button disabled={this.setState.bonusDisabled} onClick={ () => this.toggleEdit() }>{this.state.bonusEditing ? 'Cancel': 'Edit'}</button>
                            {this.state.bonusEditing ?
                                <button disabled={this.setState.bonusDisabled} onClick={ () => this.updateBonus() }>Update</button>
                                : null
                            }
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <button onClick={this.switchBlock} disabled={this.state.isDisabled}>
                                {this.state.blocked ? 'Unblock' : 'Block' }
                            </button>
                        </td>
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
