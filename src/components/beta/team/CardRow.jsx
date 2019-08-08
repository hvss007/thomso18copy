import React from 'react'

import fblogo from './img/fbicon.png';
import inlogo from './img/igicon.png';
import ldlogo from './img/inicon.png';

export default class CardRow extends React.Component {
    constructor() {
        super();
        this.state = {
            members: []
        }
    }

    componentDidMount() {
        if (this.props.members) {
            this.setState({ members: this.props.members })
        }
    }

    render() {
        const { members } = this.state
        return (
            <div className="main-team-wrapperinnerdiv">
                {console.log(members, "members")}
                {members.map((member, index) =>
                    <React.Fragment key={index}>
                        {member.image ?
                            <div className="main-team-card-inner">
                                <div className="main-team-card-innerdiv">

                                    <img src={`/img/main/team/${member.image}`} alt="aaa" className="main-team-card-inner-img" />

                                    <div className="main-team-text main-team-glow">{member.first_name}<br />&nbsp; &nbsp; &nbsp; &nbsp;{member.last_name}</div>

                                    <div className="main-team-overlay-email">
                                        {member.email && member.mobile ? <div className="main-team-info">email<br /><strong>{member.email}</strong><br /><br />mobile no<br /><strong><a href={`tel:${member.mobile}`}>{member.mobile}</a></strong></div> : null}
                                    </div>
                                    <div className={(member.id === 25 || member.id === 26 || member.id === 18 || member.id === 19) ? "main-team-overlay-tech" : "main-team-overlay"}>
                                        <div className="main-team-card-footer-icons">
                                            <div style={{
                                                zIndex: "200000"
                                            }} className="main-team-card-footer-mainIcons">
                                                {member.fblink ? <a href={member.fblink} target="_blank" rel="noopener noreferrer"> <div className="main-team-card-footer-fbdiv">  <img src={fblogo} className="main-team-card-footer-iconsImage" alt="fblogo" /></div></a> : null}
                                                {member.instalink ? <div className="main-team-card-footer-instadiv"><a href={member.instalink} target="_blank" rel="noopener noreferrer"><img src={inlogo} className="main-team-card-footer-iconsImage" alt="inlogo" /></a></div>
                                                    : null}
                                                {member.linkedln ? <div className="main-team-card-footer-linkediv"><a href={member.linkedln} target="_blank" rel="noopener noreferrer"> <img src={ldlogo} className="main-team-card-footer-iconsImage" alt="lilogo" /></a></div> : null}

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="main-team-card-inner-bottom">
                                    <div className="main-team-card-position">{member.position}</div>
                                </div>
                            </div>
                            : null}
                    </React.Fragment>
                )}
            </div>


        )


    }
}