import React from 'react';
import "./maincard.css";
import AuthService from '../../../handlers/ca/temp/AuthService';
import FetchApi from '../../../utils/FetchAPI';

import Card from '../../ca/home/Card';

let unmount = false
export default class PostIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isVisible: true,
            posts: null,
            message: ''
        };
        this.Auth = new AuthService();
    }

    sharePost = data => {
        let postId = data.split('_')[1];
        let feedObject = {
            method: 'share',
        };
        if (postId && window.FB) {
            feedObject['href'] = `https://www.facebook.com/thomsoiitroorkee/posts/${postId}`;
            feedObject['link'] = `https://www.facebook.com/thomsoiitroorkee/posts/${postId}`;
            window.FB.ui(feedObject, r => {
                if (r && !r.error_code) {
                    this.setState({ isVisible: true, message: 'Post shared successfully' });
                    setTimeout(() => this.setState({ isVisible: false }), 3000);
                }
                else {
                    this.setState({ isVisible: true, message: 'Post Couldnt be shared' });
                    setTimeout(() => this.setState({ isVisible: false }), 3000);
                }
            })
        } else {
            this.setState({ isVisible: true, message: 'Invalid Post' });
            setTimeout(() => this.setState({ isVisible: false }), 3000);
        }
    }

    componentWillMount() {
        unmount = false;
    }

    componentDidMount() {
        if (window.FB) {
            window.FB.init({
                appId: 420618245110151,
                status: true,
                xfbml: true
            });
        }
        const authtoken = this.Auth.getToken();
        FetchApi('GET', '/api/ca/temp/posts', null, authtoken)
            .then((result) => {
                // console.log(result)
                if (result.data && result.data.posts && result.data.posts.data && result.data.posts.data.length > 0 && !unmount) {
                    this.setState({ posts: result.data.posts.data });
                }
            })
            .catch(error => {
                // console.log(error.response)
                if (error.response && error.response.status === 401 && !unmount) {
                    this.setState({ message: 'Token Expired' });
                    // this.props.history.push('/ca/logout')
                } else if (!unmount) {
                    this.setState({ message: 'Unable to Connect to Server' });
                }
            });
    }

    componentWillUnmount() {
        unmount = true
    }

    render() {
        const { posts, message, isVisible } = this.state;
        return (
            <div className="maincards">
                {isVisible ? message : null}
                {posts ? posts.map((post, index) => {
                    if (post.link) {
                        return <Card key={'CA-Home-Posts' + index} data={post} sharePost={this.sharePost} />
                    }
                    return null;
                }) : null}
            </div>
        )
    }
}
