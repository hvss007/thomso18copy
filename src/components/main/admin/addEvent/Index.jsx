import React from 'react';
import AuthService from "../../../../handlers/main/admin/AuthService";
import FetchApi from "../../../../utils/FetchAPI";

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            event_id: '',
            event_name: '',
            error: '',
            isPrimary: false,
            disabled: true,
            events: []
        };
        this.Auth = new AuthService();
    }

    onChange1 = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value ,disabled:false});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { event_id, event_name, isPrimary } = this.state;
        if (event_id) event_id = event_id.trim();
        if (event_name) event_name = event_name.trim();
        const data = { event_id, name: event_name, isPrimary }
        if (data.event_id && data.name && typeof(data.isPrimary) === "boolean") {
            const token = this.Auth.getToken()
            this.setState({disabled: true})
            FetchApi('POST', '/api/main/admin/addEvent', data, token)
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success) {
                            this.setState({ 
                                disabled: false,
                                error: res.data.msg
                            })
                        }
                        else {
                            this.setState({
                                disabled: false,
                                error: res.data.msg
                            })
                        }
                    }
                })
                .catch(e => {
                    if(e && e.response && e.response.data && e.response.data.msg)
                        this.setState({ disabled: false, error: e.response.data.msg })
                    else this.setState({ disabled: false, error: "something went wrong" })
                });
        }
    }

    render(){
        let { error, event_id, event_name, isPrimary,  disabled } = this.state;
        return (
            <div>
                    {error ? <div style={{ color: 'red', fontSize: '22px' }}>{error}</div> : null}

                    <br /><br /><br />

                    <h4> Add event here</h4>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <div>
                                <label htmlFor="inputID">Event id</label>
                                <input
                                    name="event_id"
                                    type="text"
                                    id="inputID"
                                    placeholder="event_id"
                                    value={event_id}
                                    onChange={this.onChange1}
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    spellCheck="off"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="inputName">Name</label>
                                <input
                                    id="inputName"
                                    type="text"
                                    name="event_name"
                                    onChange={this.onChange1}
                                    value={event_name}
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="inputPrimary">Primary</label>
                                <input
                                    id="inputPrimary"
                                    type="checkbox"
                                    onChange={() => this.setState({isPrimary: !this.state.isPrimary})}
                                    value={isPrimary}
                                />
                            </div>
                            <div>
                                <button type="submit" disabled={disabled}>Add event</button>
                            </div>
                        </div>
                    </form>
                </div >
        )
    }
}
