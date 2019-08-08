import React from 'react';
import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/coordinators/AuthService';
export default class Row extends React.Component {
    constructor(){
        super();
        this.state = {
            errors:'',
            isDisabled:false,
            id:''
        }
        this.Auth = new AuthService();
        // this.switchBlock = this.switchBlock.bind(this)
    }

    switchBlock = (e) =>{
        e.preventDefault();
        var data = {id:e.target.value};
        if(data){
            const isAuthenticated = this.Auth.hasToken();
            if(isAuthenticated){
                const token = this.Auth.getToken();
                FetchApi('PUT','/api/coordinators/removeWinner',data,token)
                .then( res => {
                    if(res && res.data && res.data.success){
                        this.setState({errors:"Winner removed"})
                    }
                    else this.setState({errors:"Unable To remove."})
                })
                .catch( err => {
                    console.log(err);
                    this.setState({errors:"Something Went Wrong!!"})
                })
            }else this.setState({errors:"Unauthenticated"})
        }else this.setState({errors:"invalid Request"})
    }       
    render(){
        let {errors} = this.state;
        return (
            <React.Fragment>
                {this.props.data && this.props.data.verified ? 
                    <tr style={{border: 'solid 1px black'}}>
                        <td style={{textAlign: 'center'}}>{this.props.data.thomso_id ? this.props.data.thomso_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.email ? this.props.data.email : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.college ? this.props.data.college : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.contact ? this.props.data.contact : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.event_name ? this.props.data.event_name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.position ? this.props.data.position : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.account_no ? this.props.data.account_no : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.ifsc_code ? this.props.data.ifsc_code : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.bank_name ? this.props.data.bank_name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.bank_name ? this.props.data.bank_name : '--'}</td>
                        <td style={{textAlign: 'center'}}>
                            <button onClick={this.switchBlock} value={this.props.data._id}>
                                Remove
                            </button>
                        </td>
                        <td style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>
                            {errors ? <span>{errors} </span>: null}
                        </td>
                    </tr>
                :null}
            </React.Fragment>
        )
    }
}
