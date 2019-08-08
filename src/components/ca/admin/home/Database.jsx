import React from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter'

import "react-table/react-table.css";

export default class Database extends React.Component {
     blockHandler=element=>{
       if (element.fb_id) {
        console.log(element.fb_id);
        // If response
       }
    }
    render() {
      const { data } = this.props;
      return (
        <div>
           
        <ReactTable
          data={data}
          filterable
          columns={[
            {
              columns: [
                {
                    Header: "Name",
                    id: "name",
                    accessor: d => d.name,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["name"] }),
                    filterAll: true
                },
                {
                  Header: "College",
                  id: "college",
                  accessor: d => d.college,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["college"] }),
                  filterAll: true
                },
                {
                  Header: "Email",
                  id: "email",
                  accessor: d => d.email,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["email"] }),
                  filterAll: true
                },
                {
                  Header: "Branch",
                  id: "branch",
                  accessor: d => d.branch,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["branch"] }),
                  filterAll: true
                },
                {
                  Header: "Contact",
                  id: "contact",
                  accessor: d => d.contact,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["contact"] }),
                  filterAll: true
                },
                {
                  Header: "Block",
                  accessor:d=>d.blocked,
                  id:"block",
                  filterMethod: (filter, row) => {
                    if (filter.value === 'male') {
                        return row[filter.id] === 'male'
                    } else if (filter.value === 'female') {
                        return row[filter.id] === 'female';
                    } else if (filter.value === 'other') {
                        return row[filter.id] === 'other';
                    }
                    return true;
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={(filter && filter.value) ? "true" : "false"}
                    >
                      <option value="true">Blocked</option>
                      <option value="false">Not Blocked</option>
                    </select>,
                  Cell: row => (
                    <button onClick ={()=>this.blockHandler(row.row)}>{row.value ? 'Unblock' : 'Block'}</button>
                  )
                },
                {
                  Header: "FB ID",
                  id: "fb_id",
                  accessor: d => d.fb_id,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["fb_id"] }),
                  filterAll: true
                },
                {
                  Header: "Gender",
                  accessor: d => d.gender,
                  id: "gender",
                //   Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
                  filterMethod: (filter, row) => {
                    if (filter.value === 'male') {
                        return row[filter.id] === 'male'
                    } else if (filter.value === 'female') {
                        return row[filter.id] === 'female';
                    } else if (filter.value === 'other') {
                        return row[filter.id] === 'other';
                    }
                    return true;
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">All</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        /> 
        </div>
      );
    }
  }
