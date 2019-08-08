import React from 'react';

export default class Row extends React.Component {
    render(){
        let indexInit = 1;
        if (this.props.currentPage && this.props.limit) {
            indexInit = (this.props.currentPage - 1)*this.props.limit + 1
        }
        return (
            <React.Fragment>
            {/* {console.log(this.props.data)} */}
                {this.props.data && this.props.data.payment_type && this.props.data.payment_type!==0 ? 
                    <tr style={{border: 'solid 1px black'}}>
                        <td style={{textAlign: 'center'}}>{(this.props.index !== undefined) ? (this.props.index + indexInit) : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.thomso_id ? this.props.data.thomso_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>
                            <button onClick={() => this.props.setEdit(this.props.data._id)} >
                                Edit
                            </button>
                        </td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.college ? this.props.data.college : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.email ? this.props.data.email : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.gender ? this.props.data.gender : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.branch ? this.props.data.branch : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.contact ? this.props.data.contact : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.primary_event ? this.props.data.primary_event.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{(this.props.data.event && this.props.data.event.length !== 0) ? this.props.data.event.map( (event,i) => {
                            return (<div key={i}>{event.name}<br /></div> )
                        }) : '--'}</td>

                        
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
