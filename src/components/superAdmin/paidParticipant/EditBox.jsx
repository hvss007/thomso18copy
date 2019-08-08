import React from 'react';
import "./src/editbox.css"
import AuthService from "../../../handlers/superAdmin/AuthService";
import ParticipantAuthService from '../../../handlers/main/AuthService';
import FetchApi from "../../../utils/FetchAPI";

export default class EditBox extends React.Component {
    constructor() {
        super();
        this.state = {
            thomso_id: '',
            is_thomso_id_disabled: true,
            is_thomso_id_updating: false,
            name: '',
            is_name_disabled: true,
            is_name_updating: false,
            email: '',
            is_email_disabled: true,
            is_email_updating: false,
            gender: '',
            is_gender_disabled: true,
            is_gender_updating: false,
            contact: '',
            is_contact_disabled: true,
            is_contact_updating: false,
            college: '',
            is_college_disabled: true,
            is_college_updating: false,
            state: '',
            is_state_disabled: true,
            is_state_updating: false,
            address: '',
            is_address_disabled: true,
            is_address_updating: false,
            verified: false,
            is_verified_updating: false,
            blocked: false,
            is_blocked_updating: false,
            payment_type: 0,
            is_payment_type_disabled: true,
            is_payment_type_updating: false,
            accomodation: '',
            is_accomodation_disabled: true,
            is_accomodation_updating: false,
            password: '',
            is_password_disabled: true,
            is_password_updating: false,
            branch: '',
            is_branch_disabled: true,
            is_branch_updating: false,
            qr: '',
            is_qr_disabled: true,
            is_qr_updating: false,
            errors: ''
        };
        this.Auth = new AuthService();
        this.ParticipantAuth = new ParticipantAuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'thomso_id' && value) {
            value = value.trim();
            value = value.substring(0, 9)
            value = value.toUpperCase();
        }
        if (name === 'contact' && value) {
            value = value.trim();
            value = value.substring(0, 10)
        }
        this.setState({ [name]: value });
    }

    componentDidMount() {
        if (this.props.userID) {
            const token = this.Auth.getToken()
            FetchApi('GET', `/api/super/participant/${this.props.userID}`, null, token)
                .then(r => {
                    if (r && r.data && r.data.success && r.data.body) {
                        this.setState({ ...r.data.body, ...{ password: '' } })
                    }
                })
                .catch(e => {
                    if (e & e.response && e.response.data && e.response.data.msg) this.setState({ errors: e.response.data.msg })
                    else this.setState({ errors: 'Something Went Wrong' })
                });
        }
    }

    switchBool = (bool, isUpdating) => {
        if (!this.state[isUpdating]) {
            const currentValue = this.state[bool]
            const newValue = !!!currentValue

            this.setState({ [isUpdating]: true })
            const token = this.Auth.getToken()
            const updateData = {
                [bool]: newValue
            }

            FetchApi('PUT', `/api/super/participant/${this.props.userID}`, updateData, token)
                .then(r => {
                    if (r && r.data && r.data.success && r.data.body) {
                        this.setState({ ...r.data.body, ...{ password: '', [isUpdating]: false } })
                    }
                })
                .catch(e => {
                    if (e & e.response && e.response.data && e.response.data.msg) this.setState({ errors: e.response.data.msg, [isUpdating]: false })
                    else this.setState({ errors: 'Something Went Wrong', [isUpdating]: false })
                });
        }
    }

    switchEditing = (isDisabled, isUpdating) => {
        if (!this.state[isUpdating]) {
            const currentState = this.state[isDisabled]
            this.setState({ [isDisabled]: !currentState })
        }
    }

    loginParticipant = () => {
        const token = this.Auth.getToken()
        FetchApi('GET', `/api/super/participanttoken/${this.props.userID}`, null, token)
            .then(r => {
                if (r && r.data) {
                    this.ParticipantAuth.setToken(r.data.token)
                    this.setState({ errors: '' })
                    this.props.history.push('/main')
                }
            })
            .catch(e => {
                if (e & e.response && e.response.data && e.response.data.msg) this.setState({ errors: e.response.data.msg })
                else this.setState({ errors: 'Something Went Wrong' })
            });
    }

    patchData = (field, isDisabled, isUpdating) => {
        if (!this.state[isUpdating]) {
            this.setState({ [isUpdating]: true, [isDisabled]: true })
            const token = this.Auth.getToken()
            const updateData = {
                [field]: this.state[field]
            }
            FetchApi('PUT', `/api/super/participant/${this.props.userID}`, updateData, token)
                .then(r => {
                    if (r && r.data && r.data.success && r.data.body) {
                        this.setState({ ...r.data.body, ...{ password: '', [isUpdating]: false } })
                    }
                })
                .catch(e => {
                    if (e & e.response && e.response.data && e.response.data.msg) this.setState({ errors: e.response.data.msg, [isUpdating]: false, [isDisabled]: false })
                    else this.setState({ errors: 'Something Went Wrong', [isUpdating]: false, [isDisabled]: false })
                });
        }
    }

    render() {
        const {
            thomso_id, is_thomso_id_disabled, is_thomso_id_updating,
            name, is_name_disabled, is_name_updating,
            email, is_email_disabled, is_email_updating,
            gender, is_gender_disabled, is_gender_updating,
            contact, is_contact_disabled, is_contact_updating,
            college, is_college_disabled, is_college_updating,
            state, is_state_disabled, is_state_updating,
            address, is_address_disabled, is_address_updating,
            verified, is_verified_updating,
            blocked, is_blocked_updating,
            payment_type, is_payment_type_disabled, is_payment_type_updating,
            accomodation, is_accomodation_disabled, is_accomodation_updating,
            password, is_password_disabled, is_password_updating,
            branch, is_branch_disabled, is_branch_updating,
            qr, is_qr_disabled, is_qr_updating,
            errors,
            image
        } = this.state
        let imageURL
        if (process.env.REACT_APP_SERVER_ENVIORNMENT === "dev" && image) {
            imageURL = 'https://localhost:' + process.env.REACT_APP_SERVER_PORT + '/uploads/img/ProfileImage/' + image
        }
        else if (image) {
            imageURL = '/uploads/img/ProfileImage/' + image
        }

        return (
            <div className="superadmin-parent">
                {errors ? errors : null}

                {imageURL ? <div style={{
                    backgroundImage: `url(${imageURL})`,
                    backgroundPosition: "center center",
                    backgroundSize: "contain",
                    height: "300px",
                    width: "300px",
                    backgroundRepeat: "no-repeat",
                    paddingLeft: "10px"
                }}>
                </div> : 'No Image'}

                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="input_thomso_id">thomso_id</label>
                    </div>
                    <div>
                        <input
                            id="input_thomso_id"
                            type="text"
                            placeholder="Your Name"
                            name="thomso_id"
                            value={thomso_id}
                            disabled={is_thomso_id_disabled}
                            autoCorrect="off"
                            autoComplete="off"
                            autoCapitalize="on"
                            onChange={this.onChange}
                            spellCheck="false"
                        />
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_thomso_id_disabled ? null : "color-red"} disabled={is_thomso_id_updating} onClick={() => this.switchEditing('is_thomso_id_disabled', 'is_thomso_id_updating')}>{is_thomso_id_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_thomso_id_disabled ?
                            null :
                            <button disabled={is_thomso_id_updating} onClick={() => this.patchData('thomso_id', 'is_thomso_id_disabled', 'is_thomso_id_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputName">Name</label>
                    </div>
                    <div>
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
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_name_disabled ? null : "color-red"} disabled={is_name_updating} onClick={() => this.switchEditing('is_name_disabled', 'is_name_updating')}>{is_name_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_name_disabled ?
                            null :
                            <button disabled={is_name_updating} onClick={() => this.patchData('name', 'is_name_disabled', 'is_name_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputEmail">Email</label>
                    </div>
                    <div>
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
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_email_disabled ? null : "color-red"} disabled={is_email_updating} onClick={() => this.switchEditing('is_email_disabled', 'is_email_updating')}>{is_email_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_email_disabled ?
                            null :
                            <button disabled={is_email_updating} onClick={() => this.patchData('email', 'is_email_disabled', 'is_email_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputGender">Gender</label>
                    </div>
                    <div>
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
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_gender_disabled ? null : "color-red"} disabled={is_gender_updating} onClick={() => this.switchEditing('is_gender_disabled', 'is_gender_updating')}>{is_gender_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_gender_disabled ?
                            null :
                            <button disabled={is_gender_updating} onClick={() => this.patchData('gender', 'is_gender_disabled', 'is_gender_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputContact">Contact</label>
                    </div>
                    <div>
                        <input
                            id="inputContact"
                            type="text"
                            placeholder="Your Contact"
                            name="contact"
                            value={contact}
                            disabled={is_contact_disabled}
                            autoCorrect="off"
                            autoComplete="off"
                            autoCapitalize="on"
                            onChange={this.onChange}
                            spellCheck="false"
                        />
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_contact_disabled ? null : "color-red"} disabled={is_contact_updating} onClick={() => this.switchEditing('is_contact_disabled', 'is_contact_updating')}>{is_contact_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_contact_disabled ?
                            null :
                            <button disabled={is_contact_updating} onClick={() => this.patchData('contact', 'is_contact_disabled', 'is_contact_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputCollege">College</label>
                    </div>
                    <div>
                        <input
                            id="inputCollege"
                            type="text"
                            placeholder="Your College"
                            name="college"
                            value={college}
                            disabled={is_college_disabled}
                            autoCorrect="off"
                            autoComplete="off"
                            autoCapitalize="on"
                            onChange={this.onChange}
                            spellCheck="false"
                        />
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_college_disabled ? null : "color-red"} disabled={is_college_updating} onClick={() => this.switchEditing('is_college_disabled', 'is_college_updating')}>{is_college_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_college_disabled ?
                            null :
                            <button disabled={is_college_updating} onClick={() => this.patchData('college', 'is_college_disabled', 'is_college_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputState">State</label>
                    </div>
                    <div>
                        <input
                            id="inputState"
                            type="text"
                            placeholder="Your State"
                            name="state"
                            value={state}
                            disabled={is_state_disabled}
                            autoCorrect="off"
                            autoComplete="off"
                            autoCapitalize="on"
                            onChange={this.onChange}
                            spellCheck="false"
                        />
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_state_disabled ? null : "color-red"} disabled={is_state_updating} onClick={() => this.switchEditing('is_state_disabled', 'is_state_updating')}>{is_state_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_state_disabled ?
                            null :
                            <button disabled={is_state_updating} onClick={() => this.patchData('state', 'is_state_disabled', 'is_state_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputAddress">Address</label>
                    </div>
                    <div>
                        <input
                            id="inputAddress"
                            type="text"
                            placeholder="Your Address"
                            name="address"
                            value={address}
                            disabled={is_address_disabled}
                            autoCorrect="off"
                            autoComplete="off"
                            autoCapitalize="on"
                            onChange={this.onChange}
                            spellCheck="false"
                        />
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_address_disabled ? null : "color-red"} disabled={is_address_updating} onClick={() => this.switchEditing('is_address_disabled', 'is_address_updating')}>{is_address_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_address_disabled ?
                            null :
                            <button disabled={is_address_updating} onClick={() => this.patchData('address', 'is_address_disabled', 'is_address_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-buttons">
                    <div>
                        <button onClick={() => this.switchBool('verified', 'is_verified_updating')} disabled={is_verified_updating}>
                            {verified ? 'Unverify' : 'Verify'}
                        </button>
                    </div>
                    <div>
                        <button onClick={() => this.switchBool('blocked', 'is_blocked_updating')} disabled={is_blocked_updating}>
                            {blocked ? 'Unblock' : 'Block'}
                        </button>
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="paymentType">Payment Type : </label>
                    </div>
                    <div>
                        <select
                            id="paymentType"
                            name="payment_type"
                            value={payment_type}
                            disabled={is_payment_type_disabled}
                            onChange={this.onChange}
                        >
                            <option value="" disabled="true"> Payment Type </option>
                            <option value="0"> Unpaid </option>
                            <option value="1"> Online Payment </option>
                            <option value="2"> NEFT </option>
                            <option value="3"> Draft </option>
                            <option value="4"> Campus Ambassador </option>
                            <option value="5"> Friends </option>
                            <option value="6"> Misc </option>
                        </select>
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_payment_type_disabled ? null : "color-red"} disabled={is_payment_type_updating} onClick={() => this.switchEditing('is_payment_type_disabled', 'is_payment_type_updating')}>{is_payment_type_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_payment_type_disabled ?
                            null :
                            <button disabled={is_payment_type_updating} onClick={() => this.patchData('payment_type', 'is_payment_type_disabled', 'is_payment_type_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputAccomodation">Accomodation Type : </label>
                    </div>
                    <div>
                        <select
                            id="inputAccomodation"
                            name="accomodation"
                            value={accomodation}
                            disabled={is_accomodation_disabled}
                            onChange={this.onChange}
                        >
                            <option value="" disabled="true"> Accomodation Type </option>
                            <option value="accomodation"> Accomodation </option>
                            <option value="non-accomodation"> Non-accomodation </option>
                        </select>
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_accomodation_disabled ? null : "color-red"} disabled={is_accomodation_updating} onClick={() => this.switchEditing('is_accomodation_disabled', 'is_accomodation_updating')}>{is_accomodation_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_accomodation_disabled ?
                            null :
                            <button disabled={is_accomodation_updating} onClick={() => this.patchData('accomodation', 'is_accomodation_disabled', 'is_accomodation_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputPassword">Password</label>
                    </div>
                    <div>
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
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_password_disabled ? null : "color-red"} disabled={is_password_updating} onClick={() => this.switchEditing('is_password_disabled', 'is_password_updating')}>{is_password_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_password_disabled ?
                            null :
                            <button disabled={is_password_updating} onClick={() => this.patchData('password', 'is_password_disabled', 'is_password_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputBranch">Branch</label>
                    </div>
                    <div>
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
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_branch_disabled ? null : "color-red"} disabled={is_branch_updating} onClick={() => this.switchEditing('is_branch_disabled', 'is_branch_updating')}>{is_branch_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_branch_disabled ?
                            null :
                            <button disabled={is_branch_updating} onClick={() => this.patchData('branch', 'is_branch_disabled', 'is_branch_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-form-input">
                    <div>
                        <label htmlFor="inputQR">QR</label>
                    </div>
                    <div>
                        <input
                            id="inputQR"
                            type="text"
                            placeholder="Your QR"
                            name="qr"
                            value={qr}
                            disabled={is_qr_disabled}
                            autoCorrect="off"
                            autoComplete="off"
                            autoCapitalize="on"
                            onChange={this.onChange}
                            spellCheck="false"
                        />
                    </div>
                    <div className="superadmin-buttons-cancel-update">
                        <button className={is_qr_disabled ? null : "color-red"} disabled={is_qr_updating} onClick={() => this.switchEditing('is_qr_disabled', 'is_qr_updating')}>{is_qr_disabled ? 'Edit' : 'Cancel'}</button>
                        {is_qr_disabled ?
                            null :
                            <button disabled={is_qr_updating} onClick={() => this.patchData('qr', 'is_qr_disabled', 'is_qr_updating')}>Update</button>
                        }
                    </div>
                </div>
                <div className="superadmin-buttons">
                    <div>
                        <button onClick={() => this.loginParticipant()}>
                            Login
                    </button>
                    </div>
                    <div>
                        <button onClick={this.props.close}>
                            Close
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}
