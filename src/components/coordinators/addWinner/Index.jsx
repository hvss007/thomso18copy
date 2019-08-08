import React from 'react';
import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/coordinators/AuthService';

export default class AddWinnerIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            event_type:true,
            thomso_id:'',
            event_name:'',
            position:'',
            ifsc_code:'',
            account_no:'',
            bank_name:'',
            errors:'',
            account_holder_name:'',
            disabled:false
        }
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'referred_by' && value) {
            value = value.trim();
            value = value.substring(0, 8)
            value = value.toUpperCase();
        }
        if (name === 'contact' && value) {
            value = value.trim();
            value = value.substring(0, 10)
        }
        this.setState({ [name]: value,errors:'' });
    }

    resetChange = () => {
        this.setState({
            thomso_id:'',
            event_name:'',
            position:'',
            ifsc_code:'',
            account_no:'',
            bank_name:'',
            account_holder_name:''
        })
        this.Auth = new AuthService();
    }

    eventOptionChange = () => {
        this.setState(prev => ({
            event_type: !prev.event_type
        })); 
    }

    onSubmit = (e) => {
        e.preventDefault();
        let coordinator_email = this.props.userData.email;
        console.log(coordinator_email)
        let { thomso_id, event_name, account_holder_name, position, ifsc_code, account_no, bank_name }= this.state;
        if (thomso_id) thomso_id = thomso_id.trim()
        if (event_name) event_name = event_name.trim()
        if (position) position = position.trim()
        if (ifsc_code) ifsc_code = ifsc_code.trim()
        if (account_no) account_no = account_no.trim()
        if (bank_name) bank_name = bank_name.trim()
        if (account_holder_name) account_holder_name = account_holder_name.trim()

        const data = {thomso_id, event_name, account_holder_name, position, ifsc_code, bank_name, account_no, coordinator_email};
        const isAuthenticated = this.Auth.hasToken();
        if(thomso_id && event_name && position && ifsc_code && account_holder_name && account_no && bank_name){
            if(isAuthenticated){
                const token = this.Auth.getToken();
                console.log(token)
                FetchApi('POST', '/api/coordinators/addWinner', data, token)
                .then( res => {
                    if(res && res.data && res.data.success){
                        if(this.state.event_type){
                            this.resetChange()
                            this.setState({errors:'Winner Added'})
                        }else{
                            this.setState({thomso_id:'', errors:"Winner Added"})
                        }
                    }
                    else{
                        this.setState({errors:res.data.msg})
                    }
                })
                .catch( err=> {
                    console.log(err);
                    this.setState({errors:"Something went wrong"})
                })
            }else this.setState({errors:"Unauthenticated"})
        }else {
            this.setState({ errors: 'Fields cannot be empty' })
        }
    }

    render(){
        let {event_type, thomso_id, account_holder_name, event_name, position, ifsc_code, account_no, bank_name, errors, disabled} = this.state;
        return(
            <div>
                {this.props && this.props.userData && this.props.userData.name ? <h3> Hello, {this.props.userData.name}</h3> :null}
                <div>
                    <h4 style={{display:"inline"}}  > Add Winner </h4>
                    <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/showWinner"> Show Winner's List </Link></span>
                    <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/participants"> Participants List </Link></span>
                    <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/cocoordinator"> Add Co-coordinator </Link></span>                        
                    <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/showCoCOordinator"> Show Co-coordinator </Link></span>
                    <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/logout"> Logout </Link></span>
                </div>       
                <div>
                    <ul> <b>Instructions</b>
                        <li>Single And Multiple are two options for adding winners of single participant and double/group event.</li>
                        <li>In group event only thomso id field will be cleared on adding winner. You can clear whole form on clicking Clear button</li>
                        <li>Please Cross check and remove the entries by visiting show winner from above link. Strict Action will be taken against coordinator if any fake entry is added by them.</li>
                    </ul>
                </div>        
                <div style={{marginTop:"50px"}}>
                    <div style={{display:"inline", fontSize:"25px", paddingLeft:"10%"}}>
                        <span><input onChange={this.eventOptionChange} type="radio" name="single" value="single"  checked={event_type}   /></span><span>Single</span>
                    </div>
                    <div style={{display:"inline", fontSize:"25px", paddingLeft:"10%"}}>
                        <span><input onChange={this.eventOptionChange} type="radio" name="multiple" value="multiple" checked={!event_type}   /></span><span>Group Event</span>
                    </div>
                </div>
                {errors ?
                        <div style={{ textAlign: 'center', color: 'red', fontWeight: '600', fontSize:"25px" }}>
                            {errors}
                        </div>
                        : null
                    }
                <div style={{marginTop:"30px"}}>
                    <form id="addWinnerForm" onSubmit={this.onSubmit}>
                        <div style={{paddingLeft:"2%", fontSize:"20px",width:"60%",display:"flex",marginTop:"10px", justifyContent:"space-evenly"}}>
                            <label style={{width:"20%"}} htmlFor="inputThomsoId">Thomso ID : </label>
                            <input
                                id="inputThomsoId"
                                type="text"
                                placeholder="Winner's Thomso ID"
                                name="thomso_id"
                                value={thomso_id}
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="on"
                                onChange={this.onChange}
                                spellCheck="false"
                                required
                                style={{marginLeft:"5%", borderRadius:"5px", padding:"10px 5px", width:"20%"}}
                            />
                        </div>
                        <div style={{paddingLeft:"2%", fontSize:"20px",width:"60%",display:"flex",marginTop:"10px", justifyContent:"space-evenly"}}>
                            <label style={{width:"20%"}} htmlFor="inputPosition">Position : </label>
                            <select
                                id="inputPosition"
                                name="position"
                                value={position}
                                onChange={this.onChange}
                                required
                                style={{marginLeft:"5%", borderRadius:"5px", padding:"10px 5px", width:"20%"}}
                            >
                                <option value="" disabled={disabled}> Position </option>
                                <option value="first"> First </option>
                                <option value="second"> Second </option>
                                <option value="third"> Third </option>
                                <option value="none"> None </option>
                            </select>
                        </div>
                        
                        <div style={{paddingLeft:"2%", fontSize:"20px",width:"60%",display:"flex",marginTop:"10px", justifyContent:"space-evenly"}}>
                            <label style={{width:"20%"}} htmlFor="inputEventName">Event Name : </label>
                            <input
                                id="inputEventName"
                                type="text"
                                placeholder="Event Name"
                                name="event_name"
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="off"
                                value={event_name}
                                onChange={this.onChange}
                                spellCheck="false"
                                required
                                style={{marginLeft:"5%", borderRadius:"5px", padding:"10px 5px", width:"20%"}}
                            />
                        </div>
                        <div style={{paddingLeft:"2%", fontSize:"20px",width:"60%",display:"flex",marginTop:"10px", justifyContent:"space-evenly"}}>
                            <label style={{width:"20%"}} htmlFor="inputbankname">Account Holder Name :   </label>
                            <input
                                id="inputbankname"
                                type="text"
                                placeholder="Account Holder Name"
                                name="account_holder_name"
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="on"
                                value={account_holder_name}
                                onChange={this.onChange}
                                required
                                style={{marginLeft:"5%", borderRadius:"5px", padding:"10px 5px", width:"20%"}}
                            />
                        </div>
                        <div style={{paddingLeft:"2%", fontSize:"20px",width:"60%",display:"flex",marginTop:"10px", justifyContent:"space-evenly"}}>
                            <label style={{width:"20%"}} htmlFor="inputBank">Bank Name : </label>
                            <input
                                id="inputBank"
                                type="text"
                                placeholder="Name of Bank"
                                name="bank_name"
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="on"
                                value={bank_name}
                                onChange={this.onChange}
                                required
                                style={{marginLeft:"5%", borderRadius:"5px", padding:"10px 5px",width:"20%"}}
                            />
                        </div>
                        <div style={{paddingLeft:"2%", fontSize:"20px",width:"60%",display:"flex",marginTop:"10px", justifyContent:"space-evenly"}}>
                            <label style={{width:"20%"}} htmlFor="inputAccount">Account Number : </label>
                            <input
                                id="inputAccount"
                                type="text"
                                placeholder="Winner's Account Number"
                                name="account_no"
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="on"
                                value={account_no}
                                onChange={this.onChange}
                                required
                                style={{marginLeft:"5%", borderRadius:"5px", padding:"10px 5px",width:"20%"}}
                            />
                        </div>
                        <div style={{paddingLeft:"2%", fontSize:"20px",width:"60%",display:"flex",marginTop:"10px", justifyContent:"space-evenly"}}>
                            <label style={{width:"20%"}} htmlFor="inputifsc">IFSC Code : </label>
                            <input
                                id="inputifsc"
                                type="text"
                                placeholder="Winner's Bank's IFSC CODE"
                                name="ifsc_code"
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="on"
                                value={ifsc_code}
                                onChange={this.onChange}
                                required
                                style={{marginLeft:"5%", borderRadius:"5px", padding:"10px 5px", width:"20%"}}
                            />
                        </div>
                        
                        <div style={{marginLeft:"20%", marginTop:"30px"}}>
                            <button type="submit" style={{fontSize:"20px", padding:"5px"}}>Add Winner</button>
                            {!event_type ? 
                                <input type="button" onClick={this.resetChange} style={{fontSize:"20px", padding:"5px", marginLeft:"50px"}} value="Reset" />
                            : null}
                        </div>
                       
                    </form>
                </div>
            </div>
        )
    }

}