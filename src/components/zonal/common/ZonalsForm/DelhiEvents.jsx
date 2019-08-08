import React from "react";
import "../zonals.css";

export default class DelhiEvents extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedOptionTgt: "",
            nukkad: false,
            tgt: false
        };
    }
    changeState = () => {
        this.props.function();
    }
    onSubmit = (e) => {
        e.preventDefault();
        // let events = [];
        this.props.statevalues({ errors: "Registration Closed." })
        // if (this.state.nukkad) {
        //     events.push("Nukkad Natak");
        // }
        // if (this.state.tgt && this.state.selectedOptionTgt) {
        //     events.push(this.state.selectedOptionTgt);
        // }
        // this.props.selectedevents(events);
    }
    handleOptionChangeTgt = (changeEvent) => {
        this.setState({
            selectedOptionTgt: changeEvent.target.value
        });
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }
    render() {
        return (
            <React.Fragment>
                <form className={this.props.var ? "register-zonals-form-events inactive" : "register-zonals-form-events active"} onSubmit={this.onSubmit}>
                    {this.props.errors ? <p className="form-submitted-popup">{this.props.errors}</p> : <p className="form-submitted-popup-hide">&nbsp;</p>}
                    <div className={this.props.var ? "register-zonals-form-events-parent inactive" : "register-zonals-form-events-parent"}>
                        <div className="register-zonals-form-events-firstchild">
                            <div className="register-zonals-form-events-drama">
                                <span><input type="checkbox" onClick={() => this.props.statevalues({ errors: "Registration for Nukkad Natak is over." })} checked={this.state.nukkad} name="nukkad" value="nukkad" /></span><span>Nukkad Natak</span>
                            </div>
                        </div>
                        <div className="register-zonals-form-events-secondchild">
                            <div className="register-zonals-form-events-tgt">
                                <span><input type="checkbox" onClick={() => this.setState({ tgt: !this.state.tgt })} checked={this.state.tgt} name="tgt" value="tgt" /></span><span>Tgt</span>
                            </div>
                            <div className={this.state.tgt ? "register-zonals-form-events-tgtchild" : "register-zonals-form-events-tgtchild low-opacity"}>
                                <div>
                                    <span><input onChange={this.handleOptionChangeTgt} type="radio" name="singing" value="singing" checked={this.state.selectedOptionTgt === "singing"} disabled={!this.state.tgt} /></span><span>Singing</span>
                                </div>
                                <div>
                                    <span><input onChange={this.handleOptionChangeTgt} type="radio" name="dancing" value="dancing" checked={this.state.selectedOptionTgt === "dancing"} disabled={!this.state.tgt} /></span><span>Dancing</span>
                                </div>
                                <div>
                                    <span><input onChange={this.handleOptionChangeTgt} type="radio" name="openmic" value="openmic" checked={this.state.selectedOptionTgt === "openmic"} disabled={!this.state.tgt} /></span><span>Open mic</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.props.var ? "register-zonals-form-events-button inactive" : "register-zonals-form-events-button"}>
                        <div onClick={() => this.changeState()}><span>BACK</span></div>
                        <button type="submit">SUBMIT</button>
                    </div>
                </form>
            </React.Fragment >
        );
    }
}

