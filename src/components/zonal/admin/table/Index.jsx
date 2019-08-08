import React from 'react';

import AuthService from '../../../../handlers/zonals/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';
import DataTable from './DataTable';

export default class CityIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            participants: [],
            message: '',
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        if (this.props.city) { 
            const authtoken = this.Auth.getToken();
            FetchApi('GET',`/api/zonals/admin/${this.props.city}`, null, authtoken)
                .then((result) => {
                    if (result && result.data) {
                        this.setState({ participants: result.data });
                    }
                })
                .catch(error => {
                    if(error.response && error.response.status === 401) {
                        this.props.history.push('/ca/admin/logout');
                    } else {
                        this.setState({ message: 'Unable to connect to the server' });
                    }
                });
        }
    }

    render(){
        return (
            <div>
                {this.state.message}
                <DataTable participants={this.state.participants} />
            </div>
        )
    }
}
