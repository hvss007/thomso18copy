import React from 'react';

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

let timeout;
export default class IdeaContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            comment: '',
            editing: false,
            deleted: false,
            submitDisabed: false,
            deleteDisabled: false,
            isVisible: false
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        if (this.props.data) {
            let comment = ''
            let deleted = false
            if (this.props.data.comment) {
                comment = this.props.data.comment
            }
            if (this.props.data.deleted) {
                deleted = this.props.data.deleted
            }
            this.setState({comment, deleted})
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    deletePost = () => {
        if (!this.state.deleteDisabled) {
            if (this.props.data && this.props.data._id && this.state.deleted !== undefined) {
                this.setState({deleteDisabled: true})
                const authtoken = this.Auth.getToken()
                let deleted = true
                if (this.state.deleted === true) {
                    deleted = false
                }
                FetchApi('DELETE',`/api/ca/admin/idea/${this.props.data._id}`, {deleted}, authtoken)
                    .then((result) => {
                        if (result && result.data && result.data.success && result.data.body) {
                            if (result.data.body.deleted) {
                                this.setState({deleteDisabled: false, deleted: true, message: 'Comment Deleted', isVisible: true})
                                timeout = setTimeout(() => this.setState({ isVisible: false }), 3000)
                            } else {
                                this.setState({deleteDisabled: false, deleted: false, message: 'Comment Undeleted', isVisible: true})
                                timeout = setTimeout(() => this.setState({ isVisible: false }), 3000)
                            }
                        } else {
                            this.setState({deleteDisabled: false, message: 'Comment not found', isVisible: true})
                            timeout = setTimeout(() => this.setState({ isVisible: false }), 3000)
                        }
                    })
                    .catch(error => {
                        this.setState({deleteDisabled: false, message: 'Failed to delete', isVisible: true})
                        timeout = setTimeout(() => this.setState({ isVisible: false }), 3000)
                    });
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(timeout)
    }

    switchEdit = () => {
        if (!this.state.submitDisabed) {
            if (this.state.editing) {
                let comment = ''
                if (this.props.data.comment) {
                    comment = this.props.data.comment
                }
                this.setState({
                    editing: false, comment
                })
            } else {
                this.setState({
                    editing: true
                })
            }
            
        }
    }

    submitComment = () => {
        if (!this.state.submitDisabed) {
            if (this.state.comment) {
                const comment = this.state.comment.trim()
                if (this.props.data && this.props.data._id && comment) {
                    this.setState({submitDisabed: true})
                    const authtoken = this.Auth.getToken()
                    FetchApi('PUT',`/api/ca/admin/idea/${this.props.data._id}`, {comment}, authtoken)
                        .then((result) => {
                            if (result && result.data && result.data.body && result.data.body.comment) {
                                this.setState({submitDisabed: false, editing: false, comment: result.data.body.comment, message: 'Comment Posted', isVisible: true})
                                timeout = setTimeout(() => this.setState({ isVisible: false }), 3000)
                            } else {
                                this.setState({submitDisabed: false, message: 'Comment not found', isVisible: true})
                                timeout = setTimeout(() => this.setState({ isVisible: false }), 3000)
                            }
                        })
                        .catch(error => {
                            this.setState({submitDisabed: false, message: 'Error Submitting Comment', isVisible: true})
                            timeout = setTimeout(() => this.setState({ isVisible: false }), 3000)
                        });
                }
            }
        }
    }

    render(){
        return(
            <React.Fragment>
                {this.props.data ?
                    <React.Fragment>
                        {(this.props.hidden && this.state.deleted) ?
                            null
                            :
                            <div style={this.state.deleted ? {background: 'Red'} : {background: 'Grey'} }>
                                {this.state.isVisible ? this.state.message : null}
                                {this.props.data.user ? 
                                    <div>
                                        {this.props.data.user.image ?
                                            <div>
                                                <img style={{height: 'auto', width: '25px'}} src={this.props.data.user.image} alt={this.props.data.user.ca_id} />
                                            </div>
                                            : 
                                            <div>
                                                No Image Found
                                            </div>
                                        }
                                        {this.props.data.user.name ?
                                            <div>
                                                {this.props.data.user.name}
                                            </div>
                                            : 
                                            <div>
                                                Name
                                            </div>
                                        }
                                        {this.props.data.user.ca_id ?
                                            <div>
                                                {this.props.data.user.ca_id}
                                            </div>
                                            : 
                                            <div>
                                                CA-ID
                                            </div>
                                        }
                                    </div> : null
                                }
                                {
                                    this.props.data.title ? 
                                        <div>{this.props.data.title}</div> : null
                                }
                                {
                                    this.props.data.body ? 
                                        <div>{this.props.data.body}</div> : null
                                }
                                <input disabled={!this.state.editing || this.state.submitDisabed} value={this.state.comment} name='comment' onChange={this.onChange} />
                                <button disabled={this.state.deleteDisabled} onClick={() => this.switchEdit()}> {this.state.editing ? 'Cancel': 'Edit'} </button>
                                {this.state.editing ?
                                    <React.Fragment>
                                        <button disabled={this.state.submitDisabed} onClick={() => this.submitComment()}> Submit </button>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <button disabled={this.state.deleteDisabled} onClick={() => this.deletePost()}> { this.state.deleted ? 'Undelete' : 'Delete' } </button>
                                    </React.Fragment>
                                }
                            </div>
                        }
                    </React.Fragment>
                    : null
                }
            </React.Fragment>
        )
    }
}