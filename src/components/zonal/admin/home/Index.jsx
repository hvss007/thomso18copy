import React from 'react';
import axios from 'axios';

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            quote: ''
        };
    }

    componentDidMount() { 
        axios({
            method: 'GET',
            url: `https://quotes.rest/qod`,
            responseType: 'json'
        })
        .then(res => {
            if (res.data && res.data.contents && res.data.contents.quotes && res.data.contents.quotes.length > 0) {
                this.setState({quote: res.data.contents.quotes["0"]})
            }
        })
    }

    render(){
        return (
            <div>
                {this.state.quote ?
                <div style={{height: 'calc(100vh - 150px)', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <h1>{this.state.quote.quote}</h1>
                    <h3> --{this.state.quote.author} </h3>
                </div> : null}

            </div>
        )
    }
}
