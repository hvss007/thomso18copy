import React from 'react';

import Row from './Row';

import EditBox from './EditBox';

export default class DataTable extends React.Component {
    constructor() {
        super();
        this.state = {
            editID: null
        };
    }

    setEdit = id => {
        this.setState({editID: id})
    }

    render() {
        const {editID} = this.state
      return (
        <div>
            {editID ? <EditBox userID={editID} close={() => this.setEdit(null)} history={this.props.history} /> : null}
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th style={{width:"5vw"}}>Index</th>
                        <th style={{width:"7vw"}}>ID</th>
                        <th style={{width:"5vw"}}>Edit</th>
                        <th style={{width:"10vw"}}>Name</th>
                        <th style={{width:"20vw"}}>College</th>
                        <th style={{width:"10vw"}}>Email</th>
                        <th style={{width:"7vw"}}>Gender</th>
                        <th style={{width:"7vw"}}>Branch</th>
                        <th style={{width:"10vw"}}>Mobile</th>
                        <th style={{width:"10vw"}}>Primary Events</th>
                        <th style={{width:"10vw"}}>Other Event</th>
                    </tr>
                </thead>
                {console.log(this.props.participants)}
                {(this.props.participants && this.props.participants.length > 0) ?
                    <tbody id="myTable">
                        {this.props.participants.map((data,i)=> <Row key={i} index={i} data={data} currentPage={this.props.currentPage} limit={this.props.limit} setEdit={this.setEdit}/>)}
                    </tbody>
                    : null
                }
            </table>
        </div>
      );
    }
  }
  
