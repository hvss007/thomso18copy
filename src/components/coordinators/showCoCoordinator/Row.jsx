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
                FetchApi('PUT','/api/coordinators/removeCoCoordinator',data,token)
                .then( res => {
                    if(res && res.data && res.data.success){
                        this.setState({errors:"Co-coordinator removed"})
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
                {this.props.data && !this.props.data.blocked ? 
                    <tr style={{border: 'solid 1px black'}}>
                        <td style={{textAlign: 'center'}}>{this.props.data.enrollment_no ? this.props.data.enrollment_no : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.email ? this.props.data.email : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.gender ? this.props.data.gender : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.contact ? this.props.data.contact : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.bhawan ? this.props.data.bhawan : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.branch ? this.props.data.branch : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.year ? this.props.data.year : '--'}</td>
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
