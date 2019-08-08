import React from "react";
import './Popup.css'
export default class Popup extends React.Component {
    constructor() {
        super();
        this.state = {
            close: true,
            msg: null,
            url: null
        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    show(msg, url) {
        if (!msg) {
            msg = null
        }
        if (!url) {
            url = null
        }
        this.setState({
            close: false,
            msg,
            url
        })
    }
    hide() {
        this.setState({
            close: true,
            msg: null
        })
    }
    confirm = () => {
        if (this.state.url && typeof (this.state.url) === "string") {
            this.props.history.push('/campus')
        } else {
            this.setState({
                close: true
            })
        }
    }
    render() {
        let message
        if (this.state.msg && typeof (this.state.msg) === "object" && this.state.msg.length > 0) {
            message = this.state.msg.map((eachMsg, index) => {
                if (typeof (eachMsg) === "string") {
                    return <p key={index + 'popupmsg'}> {eachMsg} </p>
                }
                return null
            })
        } else if (this.state.msg && typeof (this.state.msg) === "string") {
            message = <p> {this.state.msg} </p>
        }
        return (
            <div id="popup-main-common-div">
                <React.Fragment>
                    {this.state.close ?
                        null :
                        <div className="campus-popup-main-div" >
                            <div className="campus-popup">
                                <div className="campus-popup-msg">
                                    {message ? message : null}
                                    <div>
                                        <button onClick={this.confirm}>OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </React.Fragment>
            </div>
        );
    }
}
