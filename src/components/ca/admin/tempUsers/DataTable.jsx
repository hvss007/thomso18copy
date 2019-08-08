import React from 'react';
import $ from 'jquery'

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';
import downloadCSV from '../../../../utils/JSONtoCSV';
import Row from './Row';

export default class DataTable extends React.Component {

    constructor() {
        super();
        this.state = {
            participants: [],
            message: '',
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/admin/temp/participants', null, authtoken)
            .then((result) => {
                if (result && result.data) {
                    this.setState({ participants: result.data });
                }
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    this.setState({ message: 'Token Expired' });
                    this.props.history.push('/ca/admin/logout');
                } else {
                    this.setState({ message: 'Unable to connect to the server' });
                }
            });
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
        if (this.state.participants && this.state.participants.length > 0) {
            downloadCSV({data: this.state.participants, filename: 'temp_registrations.csv'})
        }
    }

    render() {
      let data  = this.state.participants;
      return (
        <div>
            {this.state.message}
            <div>
                <input id="myInput" type="text" onChange={(e) => this.handleFilter(e)} placeholder="Type here to search..." />
            </div>
            <button onClick={this.download}> Download </button>
            <table>
                <thead>
                    <tr>
                        <th style={{width:"2vw"}}>Index</th>
                        <th style={{width:"2vw"}}>ID</th>
                        <th style={{width:"8vw"}}>Name</th>
                        <th style={{width:"5vw"}}>Gender</th>
                        <th style={{width:"13vw"}}>Email</th>
                        <th style={{width:"13vw"}}>Referrals</th>
                        <th style={{width:"5vw"}}>Mobile</th>
                        <th style={{width:"10vw"}}>Branch</th>
                        <th style={{width:"12vw"}}>College</th>
                        <th style={{width:"8vw"}}>State</th>
                        <th style={{width:"15vw"}}>Address</th>
                        <th style={{width:"15vw"}}>Why?</th>
                    </tr>
                </thead>
                <tbody id="myTable">
                    {data.map((data,i)=> <Row key={i} index={i} data={data} />)}
                </tbody>
            </table>
        </div>
      );
    }
  }
