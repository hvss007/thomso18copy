import React from 'react';
export default class Row extends React.Component {
    render(){
        return (
            <React.Fragment>
                {this.props.data ? 
                    <tr>
                        <td style={{textAlign: 'center'}}>{this.props.index ? (this.props.index + 1) : '1'}</td>
                        <td style={{textAlign: 'center'}}>{(this.props.data.user && this.props.data.user.thomso_id) ? this.props.data.user.thomso_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>{(this.props.data.user && this.props.data.user.name) ? this.props.data.user.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.answerOne ? this.props.data.answerOne : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.answerTwo ? this.props.data.answerTwo : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.answerThree ? this.props.data.answerThree : '--'}</td>
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
