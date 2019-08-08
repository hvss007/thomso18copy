import React from 'react';

import IdeaContainer from './IdeaContainer';
import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

export default class IdeasIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            ideas: [],
            message: '',
            showDeleted: true
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/admin/ideas', null, authtoken)
            .then((result) => {
                if (result && result.data) {
                    this.setState({ ideas: result.data });
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

    render(){
        return(
            <div>
                <button onClick={() => this.setState({ showDeleted: !this.state.showDeleted })}>
                    {this.state.showDeleted ? 'Hide Deleted': 'Show Deleted'}
                </button>
                {this.state.ideas.map((data,i)=> {
                    let descIndex = this.state.ideas.length - i - 1;
                    return <IdeaContainer key={descIndex} data={data} hidden={!this.state.showDeleted} />
                })}
            </div>
        )
    }
}