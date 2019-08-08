import React from 'react';
import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/coordinators/AuthService';
import DataTable from './Datatable'
export default class ShowWinnerIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            errors:'',
            participantData:[],
        }
        this.Auth = new AuthService();
    }

    componentWillMount(){
        const isAuth = this.Auth.hasToken();
        var {event_id} = this.props.userData;
        var data = {event_id};
        if(isAuth && data){
            const token = this.Auth.getToken(); 
            FetchApi('POST','/api/coordinators/participants',data, token)
            .then( res =>{
                if(res && res.data && res.data.success){
                    if(res.data.body){
                        this.setState({participantData: res.data.body})
                    }
                    else{
                        this.setState({errors:"No Participants"})
                    }
                }
            })
            .catch( err => {
                this.setState({errors:"Something Went Wrong"})
            })
        }else{
            this.setState({errors:"Unauthenticated"});
        }
        
    }

    
    render(){
        let {participantData, errors} = this.state;
        return(
            <div>
                <h1>Participant List</h1>
                <div style={{display:"inline", paddingLeft:"50px",paddingBottom:"30px"}}>
                    <Link to="/coordinators"> Add Winners </Link>
                </div>
                <span  style={{display:"inline",marginLeft:"80px"}}  >
                    <Link to="/coordinators/showWinner"> Show Winner's List </Link>
                </span>
                <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/cocoordinator"> Add Co-coordinator </Link></span>
                <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/showCoCOordinator"> Show Co-coordinator </Link></span>

                <div style={{display:"inline", paddingLeft:"50px",paddingBottom:"30px"}}>
                    <Link to="/coordinators/logout"> Logout </Link>
                </div>
                {errors ?
                        <div style={{ textAlign: 'center', color: 'red', fontWeight: '600', fontSize:"25px" }}>
                            {errors}
                        </div>
                        : null
                    }
                {(participantData.users && participantData.users.length) ? <DataTable participants={participantData} /> :null}
            </div>
        )
    }

}