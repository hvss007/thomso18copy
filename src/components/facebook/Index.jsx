import React, { Component } from 'react'
import {Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import FetchApi from '../../utils/FetchAPI'
import AuthService from '../../handlers/ca/temp/AuthService'
import Loader from '../common/Loader'

const Loading = ({ error }) => {
    if (error) {
        return <div>Error loading component</div>
    } else {
        return <Loader />
    }
}

const TimelineIndex = Loadable({
    loader: () => import('./timeline/Index'),
    loading: Loading
})

const SidebarIndex = Loadable({
    loader: () => import('./sidebar/Index'),
    loading: Loading
})

const LogoutIndex = Loadable({
    loader: () => import('../campusAmbassador/logout/Index'),
    loading: Loading
})

const RegisterIndex = Loadable({
    loader: () => import('../campusAmbassador/register/Index'),
    loading: Loading
})

const HomeIndex = Loadable({
    loader: () => import('../campusAmbassador/home/Index'),
    loading: Loading
})

const ProfileIndex = Loadable({
    loader: () => import('./profile/Index'),
    loading: Loading
})

const ResetIndex = Loadable({
    loader: () => import("../campusAmbassador/reset/Index"),
    loading: Loading
});

const LoginIndex = Loadable({
    loader: () => import('../campusAmbassador/login/Index'),
    loading: Loading
})

export default class Facebook extends Component
{
    constructor() {
        super()
        this.state = {
            isAuthenticated: false,
            isTemp: true,
            userData: '',
            total: '',
            max: ''
        }
        this.Auth = new AuthService()
    }
    componentDidMount() {
        const isAuthenticated = this.Auth.hasToken()
            const token = this.Auth.getToken()
        if(isAuthenticated)
        {
            FetchApi('GET', '/api/ca/temp/info', null, token)
                .then(r => {
                    if (r && r.data && r.data.body) {
                        if (r.data.body.verified) {
                            this.setState({ isAuthenticated: true, isTemp: false, userData: r.data.body })
                        } else {
                            this.setState({ isAuthenticated: true, isTemp: true })
                            this.props.history.push('/campus/reset')
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            FetchApi('GET', '/api/ca/temp/UserPosts',null, token)
                .then((result) => {
                    if (result.data && result.data.posts && result.data.posts.data && result.data.posts.data.length > 0) {
                        this.setState({ userPosts: result.data.posts.data});
                        if(this.state.userPosts)
                        {
                            this.setState({
                                max: this.state.userPosts[0].likes.summary.total_count
                            })
                            this.state.userPosts.map(posts =>
                                {
                                    if(posts.link)
                                    {
                                        this.setState({
                                            total : Number(this.state.total) + Number(posts.likes.summary.total_count)
                                        })
                                        if((posts.likes.summary.total_count > this.state.max))
                                        {
                                            this.setState({
                                                max: posts.likes.summary.total_count
                                            })
                                        }
                                    }

                                }
                            )
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        }
    }

    handleUpdate = (isAuthenticated, isTemp) => {
        this.setState({ isAuthenticated, isTemp })
    };

    setUserData = data => {
        this.setState({
            userData: data
        })
    };

    setUserPosts = (posts,max,total) => {
        this.setState({
            userPosts: posts,
            max: max,
            total: total
        })
    }

    render() {
        return (
            <React.Fragment >
                {this.state.isAuthenticated ?
                    <React.Fragment>
                        {this.state.isTemp ?
                            <Route exact path="/campus/*" render={props => (<ResetIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} />
                            :
                            <React.Fragment>
                                    <Route path="/campus" render={props => (<SidebarIndex {...props} userData={this.state.userData} total={this.state.total} max={this.state.max} setUserPosts={this.setUserPosts} />)} />
                                    <Route exact path="/campus/profile" render={props => (<ProfileIndex {...props} total={this.state.total} max={this.state.max} userData={this.state.userData} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} />
                                />
                                    <Route exact path="/campus" render={props => (<ProfileIndex {...props} userData={this.state.userData} total={this.state.total} max={this.state.max} />)} />
                                    <Route exact path="/campus/timeline" render={props => (<TimelineIndex {...props} userPosts={this.state.userPosts} />)} />
                            </React.Fragment>
                        }
                                <Route exact path="/campus/logout" render={props => (<LogoutIndex {...props} updateRoutes={this.handleUpdate} facebook={true} />)} />
                    </React.Fragment>
                    :
                    <React.Fragment>
                                <Route exact path="/campus" render={props => (<HomeIndex facebook={true} />)} />
                                <Route exact path="/campus/register" render={props => (<RegisterIndex {...props}/>)} />
                                <Route exact path="/campus/login" render={props => (<LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} facebook={true} />)} />
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}


