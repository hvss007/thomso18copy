import React from 'react';
// import PropTypes from 'prop-types';
import FetchApi from '../../utils/FetchAPI'

export default class VerifyCerti extends React.Component{
    constructor(){
        super();
        this.state = {
            disabled: false,
            id: '',
            table: 'registration_user',
            show: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({disabled: true});
        let data = {
            table: this.state.table,
            id: this.state.id
        }
        // console.log(data);
        FetchApi('POST', '/api/certiVerify', data)
        .then(r => r.data.success ? this.setState({data: r.data.data, show: true, msg: 'Certificate found'}) : this.setState({msg: 'Data not found. Check id again', show: false}))
        .catch(e => console.log(e));
    }
    render(){
        // console.log(this.state);
        return(
            <div>
                <div className="col-sm-6">
                    <h3>Certificate Verification</h3>
                    <form style={{margin: '50px', marginBottom: '20px'}} onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="sel1">Select Type of Certificate:</label>
                            <select className="form-control" onChange={(e) => this.setState({table: e.target.value})} disabled={this.state.disabled}>
                                <option value="registration_user">Certificate of Participation</option>
                                <option value="winner_list">Certificate of Merit</option>
                                <option value="ca">Certificate of C.A.</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Enter certificate id mentioned on the certificate.</label>
                            <input type="text" className="form-control" id="email"
                            value={this.state.id}
                            onChange={(e) => this.setState({id: e.target.value})}
                            disabled={this.state.disabled}/>
                        </div>
                        <div className="row">
                            <p>{this.state.msg}</p>
                        </div>
                        <button type="submit" className="btn btn-default" disabled={this.state.disabled}>Submit</button><br/>
                    </form>
                    <button style={{marginLeft: '50px'}} className="btn btn-info" onClick={() => this.setState({disabled: false, id: '', table: 'registration_user', show: false, msg: ''})}>Reset</button>
                </div>
                <div className="col-sm-6">
                    <h3>Certificate Details</h3>
                    <div>
                        {console.log(this.state.data)}
                        {this.state.show && <div> 
                            <p><b>ID :</b><span>TH{this.state.data.id || this.state.data.thomso_id}</span></p>
                            <p><b>Name :</b><span>{this.state.data.name}</span></p>
                            <p><b>College :</b><span>{this.state.data.college}</span></p>
                            <p><b>Contact :</b><span>{this.state.data.contact}</span></p>
                            <p><b>Position :</b><span>{this.state.data.position}</span></p>
                            <p><b>Event :</b><span>{this.state.data.event_name}</span></p>

                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}
