import React from 'react';
import $ from 'jquery'

import AuthService from '../../../../../handlers/mun/admin/AuthService';
import FetchApi from '../../../../../utils/FetchAPI';
import downloadCSV from '../../../../../utils/JSONtoCSV';
import Row from './Row';

export default class HomeIndex extends React.Component {
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
        FetchApi('GET','/api/mun/admin/participants', null, authtoken)
            .then((result) => {
                if (result && result.data) {
                    this.setState({ participants: result.data });
                }
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    this.setState({ message: 'Token Expired' });
                    this.props.history.push('/mun/admin/logout');
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
            downloadCSV({data: this.state.participants, filename: 'mun_registrations.csv'})
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
                        <th style={{width:"4vw"}}>Thomso ID</th>
                        <th style={{width:"10vw"}}>Name</th>
                        <th style={{width:"28vw"}}>Answer One</th>
                        <th style={{width:"28vw"}}>Answer Two</th>
                        <th style={{width:"28vw"}}>Answer Three</th>
                    </tr>
                </thead>
                <tbody id="myTable">
                    {data.map((data,i)=> <Row key={i} data={data} index={i}/>)}
                </tbody>
            </table>
        </div>
      );
    }
  }
  
