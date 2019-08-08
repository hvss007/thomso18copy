import React from 'react';
// import FetchApi from "../../../utils/FetchAPI";
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
    render(){
        // let {errors} = this.state;
        return (
            <React.Fragment>
                {this.props.data && this.props.data.payment_type && this.props.data.blocked!==true ? 
                    <tr style={{border: 'solid 1px black'}}>
                        <td style={{textAlign: 'center'}}>{this.props.data.thomso_id ? this.props.data.thomso_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.email ? this.props.data.email : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.gender ? this.props.data.gender : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.college ? this.props.data.college : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.contact ? this.props.data.contact : '--'}</td>
                    </tr>
                :null}
            </React.Fragment>
        )
    }
}
