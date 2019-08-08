import React from 'react';
import DataRow from './DataRow';
import AuthService from '../../../handlers/ca/temp/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import './Leaderboard.css';
import {Helmet} from "react-helmet"
export default class LeaderboardIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            rank: '-'
        }
        this.Auth = new AuthService();
    }
    componentDidMount() {
        const authtoken = this.Auth.getToken()
        FetchApi('GET', '/api/ca/temp/leaderboard', null, authtoken)
            .then(r => {
                if (r && r.data && r.data.length > 0) {
                    this.setState({ users: r.data })
                } else {
                    console.log(r)
                }
            })
            .catch(e => console.log(e));
        // FetchApi('GET', '/api/ca/temp/rank', null, authtoken)
        //     .then(r => {
        //         if (r && r.data && r.data.success === true) {
        //             this.setState({ rank: r.data.rank })
        //         } else {
        //             console.log(r)
        //         }
        //     })
        //     .catch(e => console.log(e));
    }
    render() {
        return (
            <div className="campusAmb-leader-indexMain">
                <Helmet>
                    <meta keywords="" description="The rankings of campus ambassadors from various colleges participating in Thomso
                        18 is represented on leaderboard based on performance." />
                </Helmet>
                <div className="campusAmb-leader-maintable">
                    <table className="campusAmb-leaderboard-table">
                        <tbody>
                            <tr className="campusAmb-leader-heading">
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Institute</th>
                                <th>Scores</th>
                            </tr>
                            {this.state.users ? this.state.users.map((user, index) => {
                                return <DataRow key={`leader${index}`} data={user} index={index} />
                            }) : null}
                            {/* {this.props.userData ?
                                <tr className="campusAmb-leader-rank">
                                    <th>{this.props.userData.blocked ? 'Blocked' : this.state.rank}</th>
                                    <th>{this.props.userData.name ? this.props.userData.name : null}</th>
                                    <th className="campusAmb-leader-desktop">{this.props.userData.college ? this.props.userData.college : 0}</th>
                                    <th className="campusAmb-leader-desktop">{this.props.userData.score ? this.props.userData.score : 0}</th>
                                </tr> : null} */}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
