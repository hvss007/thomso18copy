import React from 'react';
import Row from './Row';
import $ from 'jquery'
import downloadCSV from '../../../utils/JSONtoCSV';


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
        if (this.props.participants && this.props.participants.users && this.props.participants.users.length > 0) {
            downloadCSV({data: this.props.participants.users, filename: 'event_participant.csv'})
        }
    }

    render() {
      return (
        <div>
            <button onClick={this.download}> Download </button>
            <div style={{marginTop:"25px", marginLeft:"50px"}}>
                <input id="myInput" type="text" onChange={(e) => this.handleFilter(e)} placeholder="Type here to search..." 
                style={{padding:"7px", borderRadius:"3px"}} />
            </div>
            <table style={{borderCollapse: 'collapse',marginTop:"15px"}}>
                <thead>
                    <tr>
                        <th style={{width:"15vw"}}>Thomso ID</th>
                        <th style={{width:"20vw"}}>Name</th>
                        <th style={{width:"15vw"}}>Email</th>
                        <th style={{width:"10vw"}}>Gender</th>
                        <th style={{width:"25vw"}}>College</th>
                        <th style={{width:"15vw"}}>Contact</th>
                    </tr>
                </thead>
                {(this.props.participants && this.props.participants.users && this.props.participants.users.length > 0) ?
                    <tbody id="myTable">
                        {this.props.participants.users.map((data,i)=> <Row key={i} index={i} data={data} />)}
                    </tbody>
                    : null
                }
            </table>
        </div>
      );
    }
  }
  
