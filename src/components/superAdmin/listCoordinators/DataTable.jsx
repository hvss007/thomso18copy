import React from 'react';

import Row from './Row';

import EditBox from './EditBox';
import downloadCSV from '../../../utils/JSONtoCSV';

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
    download = () => {
        if (this.props.participants && this.props.participants.length > 0) {
            downloadCSV({data: this.props.participants, filename: 'list_coordinators.csv'})
        }
    }

    render() {
        const {editID} = this.state
      return (
        <div>
            <button onClick={this.download}> Download </button>

            {editID ? <EditBox userID={editID} close={() => this.setEdit(null)} history={this.props.history} /> : null}
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th style={{width:"5vw"}}>
                            Index
                        </th>
                        <th style={{width:"10vw"}}>
                            name
                        </th>
                        <th style={{width:"15vw"}}>
                            email
                        </th>
                        <th style={{width:"5vw"}}>
                            gender
                        </th>
                        <th style={{width:"5vw"}}>
                            contact1
                        </th>
                        <th style={{width:"5vw"}}>
                            contact2
                        </th>
                        <th style={{width:"15vw"}}>
                            bhawan
                        </th>
                        <th style={{width:"10vw"}}>
                            enrollment_no
                        </th>
                        <th style={{width:"10vw"}}>
                            branch
                        </th>
                        <th style={{width:"5vw"}}>
                            year
                         </th>
                        <th style={{width:"5vw"}}>
                            event_id
                        </th>
                        <th style={{width:"5vw"}}>
                            blocked
                        </th>
                        <th style={{width:"5vw"}}>
                            edit
                        </th>
                    </tr>
                </thead>
                {(this.props.userData && this.props.userData.length > 0) ?
                    <tbody id="myTable">
                        {this.props.userData.map((data,i)=> <Row key={i} index={i} data={data} setEdit={this.setEdit}/>)}
                    </tbody>
                    : null
                }
            </table>
        </div>
      );
    }
  }
  
