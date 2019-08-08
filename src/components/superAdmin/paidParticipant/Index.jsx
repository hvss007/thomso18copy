import React from 'react';
import AuthService from "../../../handlers/superAdmin/AuthService";
import FetchApi from "../../../utils/FetchAPI";

import DataTable from './DataTable';

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            userData:[],
            currentPage: 0,
            totalPages: 0,
            limit: 0,
            errors:'',
            hideUnverified: false,
            toggleDisabled: false,
            searchText: '',
            searching: false
        };
        this.Auth = new AuthService();
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() { 
        let currentPage = 1;
        if (this.props.match && this.props.match.params && this.props.match.params.page) {
            currentPage = parseInt(this.props.match.params.page, 10);
        }
        const token = this.Auth.getToken()
        FetchApi('GET', `/api/super/user/page=${currentPage}&registered=${this.state.hideUnverified}`, null, token)
            .then(r => {
                if (r && r.data) {
                    if (r.data.body && r.data.pages && r.data.limit) {
                        this.setState({ userData:r.data.body, totalPages: r.data.pages, limit: r.data.limit, currentPage, errors: '' });
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

    handleClick(event) {
        if (event.target && event.target.id) {
            this.props.history.push(`/super/participants/${event.target.id}`);
            const currentPage = event.target.id;
            const token = this.Auth.getToken()
            FetchApi('GET', `/api/super/user/page=${currentPage}&registered=${this.state.hideUnverified}${this.state.searchText ? `&search=${this.state.searchText}` : ''}`, null, token)
                .then(r => {
                    if (r && r.data) {
                        if (r.data.body && r.data.pages && r.data.limit) {
                            this.setState({ userData:r.data.body, totalPages: r.data.pages, limit: r.data.limit, currentPage, errors: '' });
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
    }

    toggleUnverified = () => {
        this.setState({toggleDisabled: true})
        let currentPage = 1;
        if (this.props.match && this.props.match.params && this.props.match.params.page) {
            currentPage = parseInt(this.props.match.params.page, 10);
        }
        const token = this.Auth.getToken()
        FetchApi('GET', `/api/super/user/page=${currentPage}&registered=${!this.state.hideUnverified}${this.state.searchText ? `&search=${this.state.searchText}` : ''}`, null, token)
            .then(r => {
                if (r && r.data) {
                    if (r.data.body && r.data.pages && r.data.limit) {
                        this.setState({ userData:r.data.body, totalPages: r.data.pages, limit: r.data.limit, currentPage, hideUnverified: !this.state.hideUnverified, toggleDisabled: false, errors: ''});
                    } else {
                        this.setState({ errors:"Unable To Fetch", toggleDisabled: false })
                    }
                }
            })
            .catch(e => {
                if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg, toggleDisabled: false})
                else this.setState({errors:'Something Went Wrong', toggleDisabled: false})
            });
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    onSearch = (e) => {
        e.preventDefault();
        this.setState({searching: true})
        if (this.state.searchText && this.state.searchText.length > 2) {
            let currentPage = 1;
        if (this.props.match && this.props.match.params && this.props.match.params.page) {
            currentPage = parseInt(this.props.match.params.page, 10);
        }
        const token = this.Auth.getToken()
        FetchApi('GET', `/api/super/user/page=${currentPage}&registered=${this.state.hideUnverified}${this.state.searchText ? `&search=${this.state.searchText}` : ''}`, null, token)
            .then(r => {
                if (r && r.data) {
                    if (r.data.body && r.data.pages && r.data.limit) {
                        this.setState({ userData:r.data.body, totalPages: r.data.pages, limit: r.data.limit, currentPage, searching: false, errors: '' });
                    } else {
                        this.setState({ errors:"Keyword Not Found", searching: false })
                    }
                }
            })
            .catch(e => {
                if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg, searching: false})
                else this.setState({errors:'Something Went Wrong', searching: false})
            });
        } else {
            this.setState({errors:'Characters not of enough length', searching: false})
        }
    }
    render(){
        const {userData, currentPage, totalPages, limit, hideUnverified, searchText, toggleDisabled, searching, errors} = this.state;

        let renderPageNumbers;
        const pageNumbers = [];
        if (totalPages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }

            renderPageNumbers = pageNumbers.map(number => {
                return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    style={{marginRight: '0.3em', color: 'green', userSelect: 'none', cursor: 'pointer'}}
                >
                    {number}
                </li>
                );
            });
        }

        return (
            <div>
                {errors ?
                    <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                        {errors}
                    </div>
                : null}
                <form onSubmit={this.onSearch}>
                    <input
                        id="inputSearch"
                        type="text"
                        placeholder="name email contact college"
                        name="searchText"
                        value={searchText}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="off"
                        onChange={this.onChange}
                        required
                    />
                    <button type="submit" disabled={searching}>Search</button>
                </form>
                {totalPages ? 
                    <ul style={{listStyle: 'none', display: 'flex'}}>
                        {renderPageNumbers}
                    </ul>
                    : null
                }
                <button onClick={this.toggleUnverified} disabled={toggleDisabled}>
                    {hideUnverified ? 'Show Unverified' : 'Hide Unverified'}
                </button>
                {(userData && userData.length) ? <DataTable participants={userData} currentPage={currentPage} limit={limit} history={this.props.history}/> : "No Data"}
                {totalPages ? 
                    <ul style={{listStyle: 'none', display: 'flex'}}>
                        {renderPageNumbers}
                    </ul>
                    : null
                }
            </div>
        )
    }
}
