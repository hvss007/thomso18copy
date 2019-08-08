import React from "react";
import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/main/AuthService';

export default class VerifyIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            errors:'',
            otp:'',
            disabled: false
        }
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name= e.target.name;
        let value  = e.target.value;
        this.setState({ [name] : value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            let {otp} = this.state;
            if (otp) otp = otp.trim()
            const data = {otp};
            const token = this.Auth.getToken()
            this.setState({
                disabled: true
            })
            FetchApi('POST', '/api/main/auth/verify', data, token)
                .then( res => {
                    this.setState({disabled:false});
                    if(res && res.data && res.data.success){
                        this.setState({errors:res.data.msg});}
                    else
                        this.setState({errors:res.data.msg});
                })
                .catch(err => {
                    this.setState({errors:'lssddsds', disabled:false});
                })
        }
    }

    render(){
        const {otp, errors, disabled}  =this.state;
        return (
            <div>
                <h1> Please verify your account.  </h1>
                <form onSubmit={this.onSubmit}>
                    {errors ? 
                        <div style={{color:'red', fontSize:'22px'}}> {errors} </div>
                    :
                    null}
                    <div>
                        <div>
                            <label htmlFor="inputOTP"> Enter OTP</label>
                            <input
                                id="inputOTP"
                                type="text"
                                placeholder="OTP"
                                name="otp"
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="off"
                                value={otp}
                                onChange={this.onChange}
                                spellCheck="false"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" disabled={disabled}>Send Verification Email</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }


} 