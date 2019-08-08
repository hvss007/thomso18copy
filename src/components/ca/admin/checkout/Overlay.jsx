import React from 'react';

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

import Card from './Card';

import "../../home/updatedcard.css";

let unmount = false
export default class Overlay extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: null,
            message: null
        };
        this.Auth = new AuthService();
    }

    componentWillMount() {
        unmount = false;
    }

    componentDidMount() {
        if (this.props.id) {
            const authtoken = this.Auth.getToken()
            FetchApi('GET', `/api/ca/admin/temp/checkoutposts/${this.props.id}`,null, authtoken)
                .then((result) => {
                    if (result.data && result.data.posts && result.data.posts.data && result.data.posts.data.length > 0 && !unmount) {
                        this.setState({ posts: result.data.posts.data });
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 401 && !unmount) {
                        this.setState({ message: 'Token Expired' });
                    } else if (!unmount){
                        this.setState({ message: 'Unable to Connect to Server' });
                    }
                });
        }
    }

    componentWillUnmount() {
        unmount = true
    }

    render() {
        const { posts, message } = this.state;
        return (
            <div className="cards" style={{width: '100%'}}>
                {message ? message : null}
                <div style={{position: 'fixed', top: '10px', right: '10px', color: 'white', cursor: 'pointer'}} onClick={this.props.close}> X </div>
                {posts ? posts.map((post, index) => {
                    return <Card key={'Admin-Checkout-Posts' + index} data={post} />
                }) : null}
            </div>
        )
    }
}
