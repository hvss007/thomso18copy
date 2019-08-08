import React, { Component } from 'react';

import AuthService from '../../../handlers/superAdmin/AuthService';
// import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';

// import './style.css';

export default class LoginIndex extends Component {

    constructor() {
        super();
        this.state = {
            qrvalue: '',
            message: ''
        };
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value, message:''});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { qrvalue } = this.state;
        const isAuth = this.Auth.hasToken();
        if (qrvalue && isAuth) {
            const token = this.Auth.getToken()
            FetchApi('PUT','/api/super/mediaqr', { qrvalue },token)
                .then((result) => {
                    // {console.log(result)}
                    if (result && result.data && result.data.success) {
                        this.setState({ message: 'QR Added Successfully' })
                    }
                })
                .catch(error => {
                    if(error.response && error.response.status === 401) {
                        if( error.response.msg)
                            this.setState({ message: error.response.msg });
                        else
                            this.setState({ message:"Something went wrong" });
                    }
                    this.setState({ message:"Something went wrong" });
                });
        } else {
            this.setState({message:"Unauthenticated or Empty Field"});
        }
    }

    render() {
        const { qrvalue, message } = this.state;
        return (
            <div>
                {/* {console.log(message)} */}
                    <h2>Add QR Value</h2>
                <form onSubmit={this.onSubmit}>
                
                    <label htmlFor="inputUsername">QR Value</label>
                    <input 
                        id="inputUsername" 
                        type="text" 
                        placeholder="QR Value" 
                        name="qrvalue"
                        autoCorrect="off" 
                        autoCapitalize="off"  
                        value={qrvalue} 
                        onChange={this.onChange} 
                        required
                    />
                    <button type="submit">Add QR</button>
                </form>
                {message ? <div style={{color:"red", fontSize:"25px",marginTop:"50px"}}>{message}</div>  :null}

            </div>
        );
    }
}
