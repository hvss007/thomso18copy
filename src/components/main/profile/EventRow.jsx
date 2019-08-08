import React from "react";
import AuthService from '../../../handlers/main/AuthService';
import FetchApi from "../../../utils/FetchAPI";
import dustbin from '../src/img/dustbin.png';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            deleted: false,
            errors:''
        }
        this.Auth = new AuthService();
    }

    onRemove = (e) => {
        e.preventDefault()
        const event_id = this.props.data.event_id;
        if (event_id && !this.state.disabled) {
            this.setState({disabled: true})
            const data = { event_id }
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/main/removeParticipant', data, token)
                .then(res => {
                    if (res && res.data && res.data.success) {
                        this.setState({ deleted: true });
                    }
                    else{
                        this.setState({errors:res.data.msg});
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    render() {
        let {errors} = this.state;
return (
            <React.Fragment>
            {errors ? <div style={{color:"red", fontSize:"10px",width:"100%"}}>{errors}</div>:null}
            <tr>
                <td className="table-child-one" style={this.state.deleted ? {textDecoration: 'line-through'} : null}>
                    {this.props.primaryEvent !==this.props.data._id ? <span>{this.props.index + 1}. &nbsp; {this.props.data ? this.props.data.name : null}</span> :<span style={{fontWeight:'600',color:'#444'}}>{this.props.index + 1}. &nbsp; {this.props.data ? this.props.data.name : null}</span>}
                    
                </td>
                <td className="table-child-two" onClick={this.onRemove} style={this.state.deleted ? {cursor: 'not-allowed'} : {cursor: 'pointer'} }>
                {this.props.primaryEvent !==this.props.data._id ? <img src={dustbin} alt="delete" className="main-events-bin"/> :null}
                    
                </td>
            </tr>
            </React.Fragment>
        );
    }
}
