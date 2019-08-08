import React, { Component } from 'react';
import './Leaderboard.css';
export default class DataRow extends Component {
    constructor() {
        super();
        this.state = {
            isExpanded: false
        }
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.index + 1}</td>
                    <td className="campusAmb-leader-desktop-name">{this.props.data ? this.props.data.name : '-'}</td>
                    <td className="campusAmb-leader-desktop">{this.props.data.college}</td>
                    <td className="campusAmb-leader-desktop">{this.props.data.score}</td>
                </tr>
            </React.Fragment>
        );
    }
}

