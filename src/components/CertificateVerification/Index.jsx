import React from 'react'
import FetchApi from "../../utils/FetchAPI";
import "./certificate.css"
export default class VerifyCertificate extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: '',
            user: [],
            userWinner: [],
            thomso_id: ''
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value, error: '' });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const thomso_id = this.state.thomso_id;
        let data = { thomso_id };
        FetchApi('POST', '/api/main/certiVerifyParticipant', data, null)
            .then(res => {
                if (res && res.data) {
                    if (res.data.success) {
                        // console.log(res.data.body)
                        this.setState({ user: res.data.body })
                    }
                    else this.setState({ errors: 'No User With This ID' })
                }
            })
            .catch(e => {
                if (e & e.response && e.response.data && e.response.data.msg) this.setState({ errors: e.response.data.msg })
                else this.setState({ errors: 'Something Went Wrong' })
            })

        FetchApi('POST', '/api/main/certiVerifyWinner', data, null)
            .then(res => {
                if (res && res.data) {
                    if (res.data.success) {
                        // console.log(res.data.body)
                        this.setState({ userWinner: res.data.body })
                    }
                    else this.setState({ userWinner: [] })
                }
            })
            .catch(e => {
                if (e & e.response && e.response.data && e.response.data.msg) this.setState({ errors: e.response.data.msg })
                else this.setState({ errors: 'Something Went Wrong' })
            })
    }


    render() {
        let { errors, user, userWinner } = this.state;
        return (
            <div className="cerify-certificate-parent">
                {errors ?
                    <div style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>
                        {errors}
                    </div>
                    : null}
                <form onSubmit={this.onSubmit}>
                    <h2>Enter Your Thomso Id</h2>
                    <label htmlFor="inputUsername">Thomso ID</label>
                    <input
                        id="inputUsername"
                        type="text"
                        placeholder="Thomso ID"
                        name="thomso_id"
                        autoCorrect="off"
                        autoCapitalize="off"
                        value={this.state.thomso_id}
                        onChange={this.onChange}
                        required
                    />
                    <button type="submit">Fetch Certificate Details</button>
                </form>
                {console.log(user , userWinner)}
                {(user && user.name && user.payment_type > 0) ?
                    <div className="certify-success">This is to certify that Mr./Ms.<b> {user.name} </b> of <b>{user.college} </b>has participated in Thomso'18 "Siezed By Stardust", held at IIT Roorkee from 26-Oct to 28-Oct.</div>
                    :
                    <span>{errors}</span>
                }
                {(user && user.name && user.payment_type === 4) ? 
                    <div className="certify-success2">This is to certify that Mr./Ms.<b> {user.name} </b>of <b>{user.college} </b>was Campus Ambassador in Thomso'18 "Siezed By Stardust", held at IIT Roorkee from 26-Oct to 28-Oct.</div>
                :
                    null 
                }
                {(user && user.name && user.payment_type>0 && userWinner && userWinner.length>0)? 
                    userWinner.map( (data,i )=>
                        <div className="certify-success3" key={i}>This is to certify that Mr./Ms. <b>{user.name}</b> of <b>{user.college}</b> has secured<b> {data.position}</b> position in the event<b> {data.event_name}</b> during Thomso'18 "Siezed By Stardust", held at IIT Roorkee from 26-Oct to 28-Oct.</div>)
                :
                     null
                }
            </div>
        )
    }
}