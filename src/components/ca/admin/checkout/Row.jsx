import React from 'react';
export default class Row extends React.Component {
    render(){
        return (
            <React.Fragment>
                {this.props.data ?
                    <tr style={(this.props.data && this.props.data.verified) ? {color: 'black'} : {color: 'red'}} >
                        <td style={{textAlign: 'center'}}>{(this.props.index !== undefined) ? (this.props.index + 1) : '--'}</td>
                        <td style={{textAlign: 'center'}}>
                            <a href={this.props.data.fb_link ? this.props.data.fb_link : '#'} target="_blank" rel="noopener noreferrer">
                                {this.props.data.ca_id ? this.props.data.ca_id : '--'}
                            </a>
                        </td>
                        <td style={{textAlign: 'center'}}>{this.props.data.image ? <img src={this.props.data.image} alt="User" /> : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.gender ? this.props.data.gender : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.email ? this.props.data.email : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.contact ? this.props.data.contact : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.branch ? this.props.data.branch : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.college ? this.props.data.college : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.state ? this.props.data.state : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.address ? this.props.data.address : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.why ? this.props.data.why : '--'}</td>
                        <td style={{cursor: 'pointer', color: 'green', textAlign: 'center'}} onClick={ () => this.props.showOverlay(this.props.data._id)}>View</td>
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
