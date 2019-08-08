import React from 'react';
import '../src/css/SectionComp.css';
export default class SectionComp extends React.Component {
    scrollToRegister = () => {
        const height = window.innerHeight
        const push = 3*height
        window.scroll({top: push, behavior: "smooth"});
    }

    render() {
        return (
            <div className={`zonals-common-comp1 ${this.props.Name}`}>
                    <div className="zonal-common-comp1-heading">
                        <div>
                            {this.props.heading}
                        </div>
                    </div>
                    <div className="zonal-common-comp1-content">
                        {this.props.content}
                    </div>
                    <div className="zonal-common-comp1-register">
                        <div className="zonal-common-comp1-register-child1" style={!this.props.downloadPdf ? {width: 'auto'} : null}>
                            <div>
                                {(this.props.register==="true")? <button className="zonal-comp1-button" onClick={()=>this.scrollToRegister()}>REGISTER</button>:<a href="https://www.townscript.com/e/oil-painting-workshop-by-expert-sweety-singh-234221" target="_blank" rel="noopener noreferrer"><button className="zonal-comp1-button">REGISTER</button></a>}
                            </div>
                        </div>
                        {this.props.downloadPdf ?
                            <div className="zonal-common-comp1-register-child2">
                                <div>
                                    {this.props.downloadPdf === 'DanceRule.pdf' ?
                                        <a href='https://drive.google.com/uc?export=download&id=1ZfJfJ-B42knIKST7ydSfGAJRw5z23ECJ'>
                                            <abbr title="Click to download"><button className="zonal-comp1-button">RULEBOOK</button>
                                            </abbr>
                                        </a>
                                    : null}
                                    {this.props.downloadPdf === 'SingRule.pdf' ?
                                        <a href='https://drive.google.com/uc?export=download&id=1XeLLsVfYPViiJniUcVpkqGjPqzwhvIAt'>
                                            <abbr title="Click to download"><button className="zonal-comp1-button">RULEBOOK</button>
                                            </abbr>
                                        </a>
                                    : null}
                                    {this.props.downloadPdf === 'MicRule.pdf' ?
                                        <a href='https://drive.google.com/uc?export=download&id=1lVpDRje2FRAq6wdcbbsrnkK7lv2YA9uh'>
                                            <abbr title="Click to download"><button className="zonal-comp1-button">RULEBOOK</button>
                                            </abbr>
                                        </a>
                                    : null}
                                    {this.props.downloadPdf === 'NatakRule.pdf' ?
                                        <a href='https://drive.google.com/uc?export=download&id=1XiTK0xfF4bjxwHOzEBxrJtZeutJeGDan'>
                                            <abbr title="Click to download"><button className="zonal-comp1-button">RULEBOOK</button>
                                            </abbr>
                                        </a>
                                    : null}
                                    {this.props.downloadPdf === 'MrThomso.pdf' ?
                                        <a href='https://drive.google.com/uc?export=download&id=1zB5vhHxSsH5D0r0vVE4MMoc04D-Lokby'>
                                            <abbr title="Click to download"><button className="zonal-comp1-button">RULEBOOK</button>
                                            </abbr>
                                        </a>
                                    : null}
                                    {this.props.downloadPdf === 'Abhivyakti.pdf' ?
                                        <a href='https://drive.google.com/uc?export=download&id=14Y_xG8mKm6b_Nr3P4EeAs-W70QxHUAIn'>
                                            <abbr title="Click to download"><button className="zonal-comp1-button">RULEBOOK</button>
                                            </abbr>
                                        </a>
                                    : null}
                                </div>
                            </div>
                            : null}
                    </div>
            </div>
        );
    }
}


