import React from 'react';

export default class Row extends React.Component {
    render(){
        let indexInit = 1;
        if (this.props.currentPage && this.props.limit) {
            indexInit = (this.props.currentPage - 1)*this.props.limit + 1
        }
        return (
            <React.Fragment>
                {this.props.data ? 
                    <tr style={{border: 'solid 1px black'}}>
                        <td style={{textAlign: 'center'}}>{(this.props.index !== undefined) ? (this.props.index + indexInit) : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.email ? this.props.data.email : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.gender ? this.props.data.gender : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.contact1 ? this.props.data.contact1 : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.contact2 ? this.props.data.contact2 : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.bhawan ? this.props.data.bhawan : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.enrollment_no ? this.props.data.enrollment_no : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.branch ? this.props.data.branch : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.year ? this.props.data.year : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.event_id ? this.props.data.event_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.blocked ? 'BLOCKED' : 'false'}</td>
                        <td style={{textAlign: 'center'}}>
                            <button onClick={() => this.props.setEdit(this.props.data._id)} >
                                Edit
                            </button>
                        </td>
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
