import React from 'react';
import "../../ca/home/updatedcard.css";
import AuthService from '../../../handlers/ca/temp/AuthService';
import { Helmet } from "react-helmet"
import _ from 'lodash'
import Card from '../card/Card';
import './PostIndex.css'

let unmount = false
export default class PostIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isVisible: true,
            posts: null,
            message: '',
            value:'mostLiked',
            loading:false
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
        const authtoken = this.Auth.getToken();
    }

    componentWillUnmount() {
        unmount = true
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        const { message, isVisible, value } = this.state
        const { userPosts } = this.props
        if(userPosts)
        {
            var newArr = _.sortBy(userPosts, 'likes.summary.total_count', function(n) {
                return Math.sin(n)
            })
            if(value==='mostLiked')
            {
                newArr=newArr.reverse()
            }
        }
        return (
            <div className="cards">
                <Helmet>
                    <meta keywords="" description="Amount of reach by campus ambassador determines their chances of winning. Post and publicize about events at Thomso&#39;" />
                </Helmet>
                <div className="liked-semi-square liked-styled-select liked-blue outer-select">
                    <form>
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="mostLiked">Most Liked</option>
                            <option value="leastLiked">Least Liked</option>
                        </select>
                    </form>
                </div>

                {isVisible ? message : null}
                {newArr ? 
                        newArr
                        .map((post, index) => {
                            if(post.link)
                                return <Card key={'CA-Home-Posts' + index} data={post} sharePost={this.sharePost} />
                            else
                                return null
                }) : <div className="facebook-not-connected-popup"><div>Facebook not connected.<br />Connect with facebook to access your timeline.<br/>Do not worry we never post on your wall.</div></div>}
                    </div>
        )
    }
}
