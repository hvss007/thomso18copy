import React, { Component } from 'react';
import '../src/css/Leaderboard.css';
export default class DataRow extends Component {
    constructor() {
        super();
        this.state={
            isExpanded:false
        }
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.index+1}</td>
                    <td>{this.props.data ? this.props.data.name : '-'}</td>
                    <td className="ca-leader-downarrows" onClick={() => this.setState({isExpanded: !this.state.isExpanded})}>{this.props.data ? this.props.data.college : '-'}</td>
                    <td className="ca-leader-mobile">{this.props.data.likes}</td>
                    <td className="ca-leader-mobile">{this.props.data.shares}</td>
                    <td className="ca-leader-mobile">{this.props.data.score}</td>
                </tr>
                {this.state.isExpanded ?
                    <tr>
                        <td className="ca-leader-desktop">{this.props.data ? `Likes ${this.props.data.likes}` : '-'}</td>
                        <td className="ca-leader-desktop">{this.props.data ? `Shares ${this.props.data.shares}` : '-'}</td>
                        <td className="ca-leader-desktop">{this.props.data ? `Scores ${this.props.data.score}` : '-'}</td>
                    </tr>
                : null}
                </React.Fragment>
        );
    }
}

