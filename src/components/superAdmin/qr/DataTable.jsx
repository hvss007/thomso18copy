import React from 'react';
import $ from 'jquery'
import FetchApi from "../../../utils/FetchAPI";

import Row from './Row';
import downloadCSV from '../../../utils/JSONtoCSV';
import AuthService from "../../../handlers/superAdmin/AuthService";

import EditBox from './EditBox';

export default class DataTable extends React.Component {
    constructor() {
        super();
        this.state = {
            editID: null,
            winnersData:[],
            errors:''
        };
        this.Auth = new AuthService();
    }
    handleFilter(e){
        e.preventDefault();
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function() {
                return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    }

    download = () => {
        if (this.props.participants && this.props.participants.length > 0) {
            downloadCSV({data: this.props.participants, filename: 'paid_participants.csv'})
        }
    }

    downloadWinner = () => {
        const isAuth = this.Auth.hasToken();
        if(isAuth ){
            const token = this.Auth.getToken(); 
            FetchApi('GET','/api/super/winner',null, token)
            .then( res =>{
                if(res && res.data && res.data.success){
                    // console.log(res.data.body)
                    if(res.data.body && res.data.body.length>0){
                        downloadCSV({data: res.data.body, filename: 'winners.csv'})
                    }
                    else{
                        this.setState({errors:"No Winners"})
                    }
                }
            })
            .catch( err => {
                this.setState({errors:"Something Went Wrong"})
            })
        }else{
            this.setState({errors:"Unauthenticated"});
        }
        if (this.state.winnersData && this.state.winnersData.length > 0) {
            downloadCSV({data: this.state.winnersData, filename: 'paid_participants.csv'})
        }
    }


    setEdit = id => {
        this.setState({editID: id})
    }

    render() {
        const {editID, errors} = this.state
      return (
        <div>
             <div style={{marginTop:"25px", marginLeft:"50px"}}>
                <input id="myInput" type="text" onChange={(e) => this.handleFilter(e)} placeholder="Type here to search..." 
                style={{padding:"7px", borderRadius:"3px"}} />
            </div>
            <button onClick={this.downloadWinner}> Download  Winner</button>

            <button onClick={this.download}> Download </button>
            {editID ? <EditBox userID={editID} close={() => this.setEdit(null)} history={this.props.history} /> : null}
            {errors ? <span style={{color:"red", fontSize:"22px"}} >{errors} </span>:null}
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th style={{width:"7vw"}}>ID</th>
                        <th style={{width:"5vw"}}>Edit</th>
                        <th style={{width:"10vw"}}>Name</th>
                        <th style={{width:"20vw"}}>College</th>
                        <th style={{width:"10vw"}}>Email</th>
                        <th style={{width:"7vw"}}>Gender</th>
                        <th style={{width:"7vw"}}>Branch</th>
                        <th style={{width:"10vw"}}>Mobile</th>
                        <th style={{width:"10vw"}}>Primary Events</th>
                        <th style={{width:"10vw"}}>Other Event</th>
                    </tr>
                </thead>
                {console.log(this.props.participants)}
                {(this.props.participants && this.props.participants.length > 0) ?
                    <tbody id="myTable">
                        {this.props.participants.map((data,i)=> <Row key={i} index={i} data={data} currentPage={this.props.currentPage} limit={this.props.limit} setEdit={this.setEdit}/>)}
                    </tbody>
                    : null
                }
            </table>
        </div>
      );
    }
  }
  
