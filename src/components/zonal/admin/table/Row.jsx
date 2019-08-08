import React from 'react';
export default class Row extends React.Component {
    render(){
        return (
            <React.Fragment>
                {this.props.data ? 
                    <tr style={{border: 'solid 1px black'}}>
                        <td style={{textAlign: 'center'}}>{(this.props.index !== undefined) ? (this.props.index + 1) : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.tz_id ? this.props.data.tz_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.college ? this.props.data.college : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.email ? this.props.data.email : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.branch ? this.props.data.branch : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.contact ? this.props.data.contact : '--'}</td>
                        <td style={{textAlign: 'center'}}>{(this.props.data.events && this.props.data.events.length !== 0) ? this.props.data.events.map( event => {
                            return (<div>{event}<br /></div> )
                        }) : '--'}</td>
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
