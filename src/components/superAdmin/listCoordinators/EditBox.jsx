import React from 'react';

import AuthService from "../../../handlers/superAdmin/AuthService";
import CoordinatorAuthService from '../../../handlers/coordinators/AuthService';
import FetchApi from "../../../utils/FetchAPI";

export default class EditBox extends React.Component {
    constructor() {
        super();
        this.state = {
            name : '',
            is_name_disabled: true,
            is_name_updating: false,
            email : '',
            is_email_disabled: true,
            is_email_updating: false,
            gender : '',
            is_gender_disabled: true,
            is_gender_updating: false,
            contact1 : '',
            is_contact1_disabled: true,
            is_contact1_updating: false,
            contact2 : '',
            is_contact2_disabled: true,
            is_contact2_updating: false,
            bhawan : '',
            is_bhawan_disabled: true,
            is_bhawan_updating: false,
            enrollment_no : '',
            is_enrollment_no_disabled: true,
            is_enrollment_no_updating: false,
            branch : '',
            is_branch_disabled: true,
            is_branch_updating: false,
            year : '',
            is_year_disabled: true,
            is_year_updating: false,
            event_id : '',
            is_event_id_disabled: true,
            is_event_id_updating: false,
            password : '',
            is_password_disabled: true,
            is_password_updating: false,
            blocked : false,
            is_blocked_updating: false,
            errors : ''
        };
        this.Auth = new AuthService();
        this.CoordinatorAuth = new CoordinatorAuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if ((name === 'contact1' || name === 'contact2') && value) {
            value = value.trim();
            value = value.substring(0, 10)
        }
        this.setState({ [name]: value });
    }

    componentDidMount() {
        if (this.props.userID) {
            const token = this.Auth.getToken()
            FetchApi('GET', `/api/super/coordinator/${this.props.userID}`, null, token)
                .then(r => {
                    if (r && r.data && r.data.success && r.data.body) {
                        this.setState({...r.data.body, ...{password: ''}})
                    }
                })
                .catch(e => {
                    if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                    else this.setState({errors:'Something Went Wrong'})
                });
        }
    }

    switchBool = (bool, isUpdating) => {
        if (!this.state[isUpdating]) {
            const currentValue = this.state[bool]
            const newValue = !!!currentValue

            this.setState({[isUpdating]: true})
            const token = this.Auth.getToken()
            const updateData = {
                [bool]: newValue
            }

            FetchApi('PUT', `/api/super/coordinator/${this.props.userID}`, updateData, token)
                .then(r => {
                    if (r && r.data && r.data.success && r.data.body) {
                        this.setState({...r.data.body, ...{password: '', [isUpdating]: false}})
                    }
                })
                .catch(e => {
                    if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg, [isUpdating]: false})
                    else this.setState({errors:'Something Went Wrong', [isUpdating]: false})
                });
        }
    }

    switchEditing = (isDisabled, isUpdating) => {
        if (!this.state[isUpdating]) {
            const currentState = this.state[isDisabled]
            this.setState({ [isDisabled]: !currentState })
        }
    }

    loginCoordinator = () => {
        const token = this.Auth.getToken()
        FetchApi('GET', `/api/super/coordinatortoken/${this.props.userID}`, null, token)
            .then(r => {
                if (r && r.data) {
                    this.CoordinatorAuth.setToken(r.data.token)
                    this.setState({ errors: '' })
                    this.props.history.push('/coordinators')
                }
            })
            .catch(e => {
                if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                else this.setState({errors:'Something Went Wrong'})
            });
    }

    patchData = (field, isDisabled, isUpdating) => {
        if (!this.state[isUpdating]) {
            this.setState({[isUpdating]: true, [isDisabled]: true})
            const token = this.Auth.getToken()
            const updateData = {
                [field]: this.state[field]
            }
            FetchApi('PUT', `/api/super/coordinator/${this.props.userID}`, updateData, token)
                .then(r => {
                    if (r && r.data && r.data.success && r.data.body) {
                        this.setState({...r.data.body, ...{password: '', [isUpdating]: false}})
                    }
                })
                .catch(e => {
                    if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg, [isUpdating]: false, [isDisabled]: false})
                    else this.setState({errors:'Something Went Wrong', [isUpdating]: false, [isDisabled]: false})
                });
        }
    }

    render(){
        const {
            name, is_name_disabled, is_name_updating, 
            email, is_email_disabled, is_email_updating, 
            gender, is_gender_disabled, is_gender_updating, 
            contact1, is_contact1_disabled, is_contact1_updating, 
            contact2, is_contact2_disabled, is_contact2_updating, 
            bhawan, is_bhawan_disabled, is_bhawan_updating, 
            enrollment_no, is_enrollment_no_disabled, is_enrollment_no_updating, 
            branch, is_branch_disabled, is_branch_updating, 
            year, is_year_disabled, is_year_updating, 
            event_id, is_event_id_disabled, is_event_id_updating, 
            password, is_password_disabled, is_password_updating, 
            blocked, is_blocked_updating, 
            errors,
        } = this.state

        return (
            <div>
                {errors ? errors : null}
                <div>
                    <label htmlFor="inputName">Name</label>
                    <input
                        id="inputName"
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={name}
                        disabled={is_name_disabled}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        spellCheck="false"
                    />
                    <button disabled={is_name_updating} onClick={ () => this.switchEditing('is_name_disabled', 'is_name_updating') }>{is_name_disabled ? 'Edit': 'Cancel'}</button>
                    {is_name_disabled ?
                        null :
                        <button disabled={is_name_updating} onClick={ () => this.patchData('name', 'is_name_disabled', 'is_name_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="inputEmail">Email</label>
                    <input
                        id="inputEmail"
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={email}
                        disabled={is_email_disabled}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        spellCheck="false"
                    />
                    <button disabled={is_email_updating} onClick={ () => this.switchEditing('is_email_disabled', 'is_email_updating') }>{is_email_disabled ? 'Edit': 'Cancel'}</button>
                    {is_email_disabled ?
                        null :
                        <button disabled={is_email_updating} onClick={ () => this.patchData('email', 'is_email_disabled', 'is_email_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="inputGender">Gender</label>
                    <select
                        id="inputGender"
                        name="gender"
                        value={gender}
                        disabled={is_gender_disabled}
                        onChange={this.onChange}
                    >
                        <option value="" disabled="true"> Gender </option>
                        <option value="male"> Male </option>
                        <option value="female"> Female </option>
                        <option value="other"> Other </option>
                    </select>
                    <button disabled={is_gender_updating} onClick={ () => this.switchEditing('is_gender_disabled', 'is_gender_updating') }>{is_gender_disabled ? 'Edit': 'Cancel'}</button>
                    {is_gender_disabled ?
                        null :
                        <button disabled={is_gender_updating} onClick={ () => this.patchData('gender', 'is_gender_disabled', 'is_gender_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="inputContact1">Contact1</label>
                    <input
                        id="inputContact1"
                        type="text"
                        placeholder="Your Contact1"
                        name="contact1"
                        value={contact1}
                        disabled={is_contact1_disabled}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        spellCheck="false"
                    />
                    <button disabled={is_contact1_updating} onClick={ () => this.switchEditing('is_contact1_disabled', 'is_contact1_updating') }>{is_contact1_disabled ? 'Edit': 'Cancel'}</button>
                    {is_contact1_disabled ?
                        null :
                        <button disabled={is_contact1_updating} onClick={ () => this.patchData('contact1', 'is_contact1_disabled', 'is_contact1_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="inputContact2">Contact2</label>
                    <input
                        id="inputContact2"
                        type="text"
                        placeholder="Your Contact2"
                        name="contact2"
                        value={contact2}
                        disabled={is_contact2_disabled}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        spellCheck="false"
                    />
                    <button disabled={is_contact2_updating} onClick={ () => this.switchEditing('is_contact2_disabled', 'is_contact2_updating') }>{is_contact2_disabled ? 'Edit': 'Cancel'}</button>
                    {is_contact2_disabled ?
                        null :
                        <button disabled={is_contact2_updating} onClick={ () => this.patchData('contact2', 'is_contact2_disabled', 'is_contact2_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="inputBhawan">Bhawan</label>
                    <input
                        id="inputBhawan"
                        type="text"
                        placeholder="Your Bhawan"
                        name="bhawan"
                        value={bhawan}
                        disabled={is_bhawan_disabled}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        spellCheck="false"
                    />
                    <button disabled={is_bhawan_updating} onClick={ () => this.switchEditing('is_bhawan_disabled', 'is_bhawan_updating') }>{is_bhawan_disabled ? 'Edit': 'Cancel'}</button>
                    {is_bhawan_disabled ?
                        null :
                        <button disabled={is_bhawan_updating} onClick={ () => this.patchData('bhawan', 'is_bhawan_disabled', 'is_bhawan_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="input_enrollment_no">enrollment_no</label>
                    <input
                        id="input_enrollment_no"
                        type="text"
                        placeholder="Your enrollment_no"
                        name="enrollment_no"
                        value={enrollment_no}
                        disabled={is_enrollment_no_disabled}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        spellCheck="false"
                    />
                    <button disabled={is_enrollment_no_updating} onClick={ () => this.switchEditing('is_enrollment_no_disabled', 'is_enrollment_no_updating') }>{is_enrollment_no_disabled ? 'Edit': 'Cancel'}</button>
                    {is_enrollment_no_disabled ?
                        null :
                        <button disabled={is_enrollment_no_updating} onClick={ () => this.patchData('enrollment_no', 'is_enrollment_no_disabled', 'is_enrollment_no_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="inputBranch">Branch</label>
                    <input
                        id="inputBranch"
                        type="text"
                        placeholder="Your Branch"
                        name="branch"
                        value={branch}
                        disabled={is_branch_disabled}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        spellCheck="false"
                    />
                    <button disabled={is_branch_updating} onClick={ () => this.switchEditing('is_branch_disabled', 'is_branch_updating') }>{is_branch_disabled ? 'Edit': 'Cancel'}</button>
                    {is_branch_disabled ?
                        null :
                        <button disabled={is_branch_updating} onClick={ () => this.patchData('branch', 'is_branch_disabled', 'is_branch_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="inputYear">Year</label>
                    <input
                        id="inputYear"
                        type="text"
                        placeholder="Your Year"
                        name="year"
                        value={year}
                        disabled={is_year_disabled}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        spellCheck="false"
                    />
                    <button disabled={is_year_updating} onClick={ () => this.switchEditing('is_year_disabled', 'is_year_updating') }>{is_year_disabled ? 'Edit': 'Cancel'}</button>
                    {is_year_disabled ?
                        null :
                        <button disabled={is_year_updating} onClick={ () => this.patchData('year', 'is_year_disabled', 'is_year_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="input_event_id">event_id</label>
                    <input
                        id="input_event_id"
                        type="text"
                        placeholder="Your event_id"
                        name="event_id"
                        value={event_id}
                        disabled={is_event_id_disabled}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        spellCheck="false"
                    />
                    <button disabled={is_event_id_updating} onClick={ () => this.switchEditing('is_event_id_disabled', 'is_event_id_updating') }>{is_event_id_disabled ? 'Edit': 'Cancel'}</button>
                    {is_event_id_disabled ?
                        null :
                        <button disabled={is_event_id_updating} onClick={ () => this.patchData('event_id', 'is_event_id_disabled', 'is_event_id_updating') }>Update</button>
                    }
                </div>
                <div>
                    <label htmlFor="inputPassword">Password</label>
                    <input
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="off"
                        value={password}
                        disabled={is_password_disabled}
                        onChange={this.onChange}
                    />
                    <button disabled={is_password_updating} onClick={ () => this.switchEditing('is_password_disabled', 'is_password_updating') }>{is_password_disabled ? 'Edit': 'Cancel'}</button>
                    {is_password_disabled ?
                        null :
                        <button disabled={is_password_updating} onClick={ () => this.patchData('password', 'is_password_disabled', 'is_password_updating') }>Update</button>
                    }
                </div>
                <div>
                    <button onClick={() => this.switchBool('blocked', 'is_blocked_updating')} disabled={is_blocked_updating}>
                        {blocked ? 'Unblock' : 'Block' }
                    </button>
                </div>
                <div>
                    <button onClick={() => this.loginCoordinator()}>
                        Login
                    </button>
                </div>
                <div>
                    <button onClick={this.props.close}>
                        Close
                    </button>
                </div>
            </div>
        )
    }
}
