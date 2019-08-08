import React from 'react';
import AuthService from "../../../handlers/superAdmin/AuthService";
import FetchApi from "../../../utils/FetchAPI";

import DataTable from './DataTable';

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            userData:[],
            errors: ''
        };
        this.Auth = new AuthService();
    }

    componentDidMount() { 
        const token = this.Auth.getToken()
        FetchApi('GET', `/api/super/coordinators`, null, token)
            .then(r => {
                if (r && r.data) {
                    if (r.data.body) {
                        this.setState({ userData:r.data.body, errors: '' })
                    } else {
                        this.setState({ errors:"Unable To Fetch" })
                    }
                }
            })
            .catch(e => {
                if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                else this.setState({errors:'Something Went Wrong'})
            });
    }

    render(){
        const {errors, userData} = this.state;

        return (
            <div>
                {errors ?
                    <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                        {errors}
                    </div>
                : null}
                <DataTable userData={userData} history={this.props.history} />
            </div>
        )
    }
}
