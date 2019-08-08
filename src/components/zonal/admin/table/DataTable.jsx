import React from 'react';
import $ from 'jquery'

import downloadCSV from '../../../../utils/JSONtoCSV';
import Row from './Row';

export default class DataTable extends React.Component {

    handleFilter(e){
        e.preventDefault();
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function() {
                return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    }
    
    download = () => {
        if (this.props.participants && this.props.participants.length > 0) {
            downloadCSV({data: this.props.participants, filename: 'temp_registrations.csv'})
        }
    }

    render() {
      return (
        <div>
            <div>
                <input id="myInput" type="text" onChange={(e) => this.handleFilter(e)} placeholder="Type here to search..." />
            </div>
            <button onClick={this.download}> Download </button>
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th style={{width:"5vw"}}>Index</th>
                        <th style={{width:"10vw"}}>ID</th>
                        <th style={{width:"10vw"}}>Name</th>
                        <th style={{width:"20vw"}}>College</th>
                        <th style={{width:"15vw"}}>Email</th>
                        <th style={{width:"10vw"}}>Branch</th>
                        <th style={{width:"10vw"}}>Mobile</th>
                        <th style={{width:"20vw"}}>Events</th>
                    </tr>
                </thead>
                {(this.props.participants && this.props.participants.length > 0) ?
                    <tbody id="myTable">
                        {this.props.participants.map((data,i)=> <Row key={i} index={i} data={data} />)}
                    </tbody>
                    : null
                }
            </table>
        </div>
      );
    }
  }
  
