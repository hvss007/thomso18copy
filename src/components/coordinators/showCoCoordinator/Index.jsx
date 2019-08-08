import React from 'react';
import { Link } from 'react-router-dom';

import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/coordinators/AuthService';
import DataTable from './Datatable'
export default class ShowCocoordinatorIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            errors:'',
            CoCoordinatorData:[],
        }
        this.Auth = new AuthService();
    }

    componentWillMount(){
        const isAuth = this.Auth.hasToken();
        if(isAuth){
            const token = this.Auth.getToken(); 
            console.log(token)
            FetchApi('GET','/api/coordinators/getCoCoordinator',null, token)
            .then( res =>{
                if(res && res.data && res.data.success){
                    if(res.data.body){
                        console.log(res.data.body)
                        this.setState({CoCoordinatorData: res.data.body})
                    }
                    else{
                        this.setState({errors:"No Co-coordiantor Added"})
                    }
                }
            })
            .catch( err => {
                console.log(err);
                this.setState({errors:"Something Went Wrong"})
            })
        }else{
            this.setState({errors:"Unauthenticated"});
        }
        
    }

    
    render(){
        let {CoCoordinatorData, errors} = this.state;
        return(
            <div>
                <h1>Winners</h1>
                <div style={{display:"inline", paddingLeft:"50px",paddingBottom:"30px"}}>
                    <Link to="/coordinators"> Add Winners </Link>
                </div>
                <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/showWinner"> Show Winner's List </Link></span>
                <div style={{display:"inline", paddingLeft:"50px",paddingBottom:"30px"}}>
                    <Link to="/coordinators/participants"> participants list </Link>
                </div>
                
                <span  style={{display:"inline",marginLeft:"80px"}}  ><Link to="/coordinators/cocoordinator"> Add Co-coordinator </Link></span>
                <div style={{display:"inline", paddingLeft:"50px",paddingBottom:"30px"}}>
                    <Link to="/coordinators/logout"> Logout </Link>
                </div>  
                {errors ?
                        <div style={{ textAlign: 'center', color: 'red', fontWeight: '600', fontSize:"25px" }}>
                            {errors}
                        </div>
                        : null
                    }
                {(CoCoordinatorData && CoCoordinatorData.length) ? <DataTable participants={CoCoordinatorData} /> :null}
            </div>
        )
    }

}