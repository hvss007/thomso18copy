import React from 'react';
import $ from 'jquery'

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';
import downloadCSV from '../../../../utils/JSONtoCSV';

import Overlay from './Overlay'; 
import Row from './Row';

export default class DataTable extends React.Component {

    constructor() {
        super();
        this.state = {
            participants: [],
            message: '',
            overlay: false,
            overlayId: null
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/admin/temp/checkoutlist', null, authtoken)
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

    showOverlay = id => {
        if (id) {
            this.setState({overlay: true, overlayId:id })
        }
    }

    closeOverlay = () => {
        this.setState({overlay: false, overlayId:null })
    }

    download = () => {
        if (this.state.participants && this.state.participants.length > 0) {
            downloadCSV({data: this.state.participants, filename: 'temp_registrations.csv'})
        }
    }

    render() {
      let data  = this.state.participants;
      return (
            <React.Fragment>
                {this.state.overlay ?
                    <Overlay close={this.closeOverlay} id={this.state.overlayId}/>
                    :
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
                                    <th style={{width:"10vw"}}>Image</th>
                                    <th style={{width:"8vw"}}>Name</th>
                                    <th style={{width:"5vw"}}>Gender</th>
                                    <th style={{width:"10vw"}}>Email</th>
                                    <th style={{width:"5vw"}}>Mobile</th>
                                    <th style={{width:"5vw"}}>Branch</th>
                                    <th style={{width:"12vw"}}>College</th>
                                    <th style={{width:"8vw"}}>State</th>
                                    <th style={{width:"11vw"}}>Address</th>
                                    <th style={{width:"13vw"}}>Why?</th>
                                    <th style={{width:"5vw"}}>View</th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {data.map((data,i)=> <Row key={i} index={i} data={data} showOverlay={this.showOverlay} />)}
                            </tbody>
                        </table>
                    </div>
                }
            </React.Fragment>
      );
    }
}
