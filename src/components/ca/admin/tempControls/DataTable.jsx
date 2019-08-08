import React from 'react';
import $ from 'jquery'

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';
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
        FetchApi('GET','/api/ca/admin/temp/score', null, authtoken)
            .then((result) => {
                if (result && result.data) {
                    console.log(result.data)
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

    render() {
        let data  = this.state.participants;
        return (
            <div>
                {this.state.message}
                <div>
                    <input id="myInput" type="text" onChange={(e) => this.handleFilter(e)} placeholder="Type here to search..." />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style={{width:"4vw"}}>CA_ID</th>
                            <th style={{width:"20vw"}}>Name</th>
                            <th style={{width:"10vw"}}>College</th>
                            <th style={{width:"10vw"}}>Gender</th>
                            <th style={{width:"4vw"}}>Score</th>
                            <th style={{width:"4vw"}}>Referrals</th>
                            <th style={{width:"4vw"}}>FB Score</th>
                            <th style={{width:"4vw"}}>Ideas</th>
                            <th style={{width:"30vw"}}>Bonus</th>
                            <th style={{width:"10vw"}}>Unverify</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {data.map((data,i)=> <Row key={i} data={data} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}
