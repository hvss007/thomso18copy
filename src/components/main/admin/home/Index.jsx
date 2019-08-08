import React from 'react';
import AuthService from "../../../../handlers/main/admin/AuthService";
import FetchApi from "../../../../utils/FetchAPI";
import downloadCSV from '../../../../utils/JSONtoCSV';
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
            isAuthenticated:false,
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
        FetchApi('GET', `/api/main/admin/user/page=${currentPage}&registered=${this.state.hideUnverified}`, null, token)
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
            this.props.history.push(`/main/admin/participants/${event.target.id}`);
            const currentPage = event.target.id;
            const token = this.Auth.getToken()
            FetchApi('GET', `/api/main/admin/user/page=${currentPage}&registered=${this.state.hideUnverified}${this.state.searchText ? `&search=${this.state.searchText}` : ''}`, null, token)
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

    download = part => {
        const token = this.Auth.getToken()
        if (part === 'quater') {
            Promise.all([
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=1`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=2`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=3`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=4`, null, token),
            ])
                .then(([r1, r2, r3, r4]) => {
                    if (r1 && r2 && r3 && r4 && r1.data && r2.data && r3.data && r4.data && r1.data.body && r2.data.body && r3.data.body && r4.data.body) {
                        let mergedData = [];
                        mergedData = mergedData.concat(r1.data.body, r2.data.body, r3.data.body, r4.data.body);
                        downloadCSV({data: mergedData, filename: `${part}_participant_registrations_merged.csv`});
                    }
                });
        } else if (part === 'sixteen') {
            Promise.all([
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=1`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=2`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=3`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=4`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=5`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=6`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=7`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=8`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=9`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=10`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=11`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=12`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=13`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=14`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=15`, null, token),
                FetchApi('GET', `/api/main/admin/user/page=${part}&part=16`, null, token),
            ])
                .then(([r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16]) => {
                    if (r1 && r2 && r3 && r4 && r5 && r6 && r7 && r8 && r9 && r10 && r11 && r12 && r13 && r14 && r15 && r16 && 
                        r1.data && r2.data && r3.data && r4.data && r5.data && r6.data && r7.data && r8.data && r9.data && r10.data && r11.data && r12.data && r13.data && r14.data && r15.data && r16.data && 
                        r1.data.body && r2.data.body && r3.data.body && r4.data.body && r5.data.body && r6.data.body && r7.data.body && r8.data.body && r9.data.body && r10.data.body && r11.data.body && r12.data.body && r13.data.body && r14.data.body && r15.data.body && r16.data.body) {
                        let mergedData1 = [];
                        let mergedData2 = [];
                        mergedData1 = mergedData1.concat(r1.data.body, r2.data.body, r3.data.body, r4.data.body, r5.data.body, r6.data.body, r7.data.body, r8.data.body);
                        mergedData2 = mergedData2.concat(r9.data.body, r10.data.body, r11.data.body, r12.data.body, r13.data.body, r14.data.body, r15.data.body, r16.data.body);
                        downloadCSV({data: mergedData1, filename: `${part}_participant_registrations_merged_part1.csv`});
                        downloadCSV({data: mergedData2, filename: `${part}_participant_registrations_merged_part2.csv`});
                    }
                });
        } else {
            FetchApi('GET', `/api/main/admin/user/page=${part}`, null, token)
            .then(r => {
                if (r && r.data) {
                    if (r.data.body) {
                        downloadCSV({data: r.data.body, filename: `${part}_participant_registrations.csv`});
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
        FetchApi('GET', `/api/main/admin/user/page=${currentPage}&registered=${!this.state.hideUnverified}${this.state.searchText ? `&search=${this.state.searchText}` : ''}`, null, token)
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
        FetchApi('GET', `/api/main/admin/user/page=${currentPage}&registered=${this.state.hideUnverified}${this.state.searchText ? `&search=${this.state.searchText}` : ''}`, null, token)
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
                <button onClick={() => this.download('all')}> Download </button>
                <button onClick={() => this.download('quater')}> Download in 4 parts </button>
                <button onClick={() => this.download('sixteen')}> Download in 16 parts </button>
                {totalPages ? 
                    <ul style={{listStyle: 'none', display: 'flex'}}>
                        {renderPageNumbers}
                    </ul>
                    : null
                }
                <button onClick={this.toggleUnverified} disabled={toggleDisabled}>
                    {hideUnverified ? 'Show Unverified' : 'Hide Unverified'}
                </button>
                {(userData && userData.length) ? <DataTable participants={userData} currentPage={currentPage} limit={limit}/> : "No Data"}
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
