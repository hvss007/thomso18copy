import React from 'react';
// import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
import AuthService from "../../../handlers/superAdmin/AuthService";
import DataTable from './DataTable'
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
        // var {event_id} = this.props.userData;
        // var data = {event_id};
        if(isAuth ){
            const token = this.Auth.getToken(); 
            FetchApi('GET','/api/super/paid',null, token)
            .then( res =>{
                if(res && res.data && res.data.success){
                    // console.log(res.data.body)
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
                {errors ?
                        <div style={{ textAlign: 'center', color: 'red', fontWeight: '600', fontSize:"25px" }}>
                            {errors}
                        </div>
                        : null
                    }
                    {/* {console.log(participantData)} */}
                {(participantData && participantData.length) ? <DataTable participants={participantData} /> :null}
            </div>
        )
    }

}