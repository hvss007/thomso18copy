import React from 'react'
import AuthService from "../../../../handlers/main/admin/AuthService";
import FetchApi from "../../../../utils/FetchAPI";

export default class VerifyCertificate extends React.Component {
    constructor(){
        super();
        this.state = {
            authenticated : false,
            errors:'',
            user:[],
            verified:false
        }
        this.Auth = new AuthService();
    }

    componentDidMount(){
        const authenticated = this.Auth.hasToken();
        if(authenticated){
            const token = this.Auth.getToken()
            FetchApi('GET','/api/main/admin/certificate_data',null,token)
            .then(res => {
                if(res && res.data){
                    if(res.data.success){
                        console.log(res.data.body)
                        this.setState({user:res.data.body, verified:res.data.body.ticktok_verified})   
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

    switchBlock = (email, verify) =>{
        var data = {email:email, ticktok_verified:verify};
        if(data){
            const isAuthenticated = this.Auth.hasToken();
            if(isAuthenticated){
                const token = this.Auth.getToken();
                FetchApi('PUT','/api/main/admin/certificate_verify',data,token)
                .then( res => {
                    if(res && res.data && res.data.success){
                        this.setState({errors:"Done"})
                    }
                    else this.setState({errors:"Unable To verify."})
                })
                .catch( err => {
                    console.log(err);
                    this.setState({errors:"Something Went Wrong!!"})
                })
            }else this.setState({errors:"Unauthenticated"})
        }else this.setState({errors:"invalid Request"})
    }       

    render(){
        let {errors, user} = this.state;
        return(
            <div>
                {errors ?
                <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                    {errors}
                </div>
                : null}
                <table>
                    <thead>
                        <tr style={{textAlign: 'center'}}>
                            <td  style={{width:"15vw,"}}>Thomso Id</td>
                            <td  style={{width:"15vw,"}}>Name</td>
                            <td  style={{width:"15vw"}}>Email</td>
                            <td  style={{width:"15vw"}}>Contact</td>
                            <td  style={{width:"15vw"}}>College</td>
                            <td  style={{width:"35vw"}}>Tictok Username</td>
                            <td  style={{width:"15vw"}}>Verify</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(user && user.length>0)? 
                        user.map( (data,i )=>
                            <tr style={{border: 'solid 1px black',textAlign: 'center'}} key={i} >
                                <td>{data.thomso_id ? data.thomso_id : '--'}</td>
                                <td>{data.name ? data.name : '--'}</td>
                                <td>{data.email ? data.email : '--'}</td>
                                <td>{data.contact ? data.contact : '--'}</td>
                                <td>{data.college ? data.college : '--'}</td>
                                <td>{data.ticktok_username ? data.ticktok_username : '--'}</td>
                                <td style={{textAlign: 'center'}}>
                                    <button onClick={()=>this.switchBlock(data.email, !!!data.ticktok_verified)} value={data.email}>
                                        {data.ticktok_verified ? 
                                        'Unverify' : 
                                        'Verify'}
                                    </button>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        )
    }
}