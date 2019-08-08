import React from 'react';

import Row from './Row';

export default class DataTable extends React.Component {

    render() {
      return (
        <div>
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th style={{width:"5vw"}}>Index</th>
                        <th style={{width:"7vw"}}>ID</th>
                        <th style={{width:"10vw"}}>Name</th>
                        <th style={{width:"20vw"}}>College</th>
                        <th style={{width:"10vw"}}>Email</th>
                        <th style={{width:"7vw"}}>Gender</th>
                        <th style={{width:"7vw"}}>Branch</th>
                        <th style={{width:"10vw"}}>Mobile</th>
                        <th style={{width:"15vw"}}>Primary Events</th>
                        <th style={{width:"10vw"}}>Other Event</th>
                    </tr>
                </thead>
                {(this.props.participants && this.props.participants.length > 0) ?
                    <tbody id="myTable">
                        {this.props.participants.map((data,i)=> <Row key={i} index={i} data={data} currentPage={this.props.currentPage} limit={this.props.limit} />)}
                    </tbody>
                    : null
                }
            </table>
        </div>
      );
    }
  }
  
