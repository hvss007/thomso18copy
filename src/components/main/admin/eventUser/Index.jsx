import React from 'react'
import AuthService from "../../../../handlers/main/admin/AuthService";
import FetchApi from "../../../../utils/FetchAPI";

export default class EventUserIndex extends React.Component {
    constructor(){
        super();
        this.state = {
            authenticated : false,
            errors:'',
            event:[],
            user:[]
        }
        this.Auth = new AuthService();
    }

    componentDidMount(){
        const authenticated = this.Auth.hasToken();
        if(authenticated){
            const token = this.Auth.getToken()
            FetchApi('GET','/api/main/admin/fetchEvents',null,token)
            .then(res => {
                if(res && res.data){
                    if(res.data.success){
                        // console.log(res.data.body)
                        this.setState({event:res.data.body})   
                    }
                    else this.setState({errors:'Unable to fetch events'})
                }
            })
            .catch( e=> {
                if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                else this.setState({errors:'Something Went Wrong'})
            })
        }
        else this.setState({errors:'Unauthenticated'})
    }

    onChange = (e) => {
        const val = e.target.value;
        this.setState({ event_id: val });
    }

    onSubmit = (event_id) => {
        // let { event_id} = this.state;
        const reqData = { event_id}
        if (reqData.event_id) {
            const token = this.Auth.getToken()
            this.setState({disabled: true})
            FetchApi('POST', '/api/main/admin/eventUser', reqData, token)
                .then(res => {
                    if (res && res.data) {
                        console.log(res.data)
                        if (res.data.success) {
                            this.setState({ 
                                disabled: false,
                                user:res.data.body
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
        let {errors, event} = this.state;
        return(
            <div>
                {errors ?
                <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                    {errors}
                </div>
                : null}
                <table>
                    <thead>
                        <tr>
                            <td  style={{width:"15vw"}}>Event ID</td>
                            <td  style={{width:"15vw"}}>Event Name</td>
                            <td  style={{width:"15vw"}}>Fetch</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(event && event.length>0)? 
                        event.map( (data,i )=>
                            <tr style={{border: 'solid 1px black'}} key={i} onClick={this.onChange}>
                                <td style={{textAlign: 'center'}}>  {data.event_id ? data.event_id : '--'}</td>
                                <td style={{textAlign: 'center'}}>{data.name ? data.name : '--'}</td>
                                <td style={{textAlign: 'center'}}><button onClick={()=>this.onSubmit(data.event_id)}>Fetch Participants</button></td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        )
    }
}