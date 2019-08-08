import React from 'react';
import './src/css/Wisca.css';
import img4 from './img/socialmedia.png';
import img5 from './img/friends.png';
import img6 from './img/handshake.png';
import LoginCompo from './LoginCompo.jsx';


export default class Roles extends React.Component{
  render(){
    const a="Social Media Presence";
    const e="An effective Social Media marketing is the key to successful promotions. Hence, make sure we are heard. Follow us on social media and promote us extensively on online platforms";
    const b="Ground Publicity";
    const f="Participants are the lifelines for any fest. Hunt the talented folks in your college and encourage them to participate in Thomso. Also spread our word in your college by putting up posters";
    const c="Activities";
    const g="If Thomso reaches out to your college for any online or offline promotional activity, you are expected to assist us in our endeavours and ensure smooth-functioning of that event";

    return(
    <div>
      <div className="login-wisca-fullpage">
        <div className="login-wisca-MAINDIV">

                  <div className="login-wisca-Heading">
                    ROLES
                  </div>
                  <div className="login-wisca-main">
                    <div className="login-wisca-innermain1">
                        <LoginCompo data={e} image={img4} heading={a} />
                    </div>
                  </div>

                  <div className="login-wisca-main2">
                    <div className="login-wisca-innermain1">
                        <LoginCompo data={f} image={img5} heading={b} />
                    </div>
                  </div>

                  <div className="login-wisca-main2">
                    <div className="login-wisca-innermain1">
                        <LoginCompo data={g} image={img6} heading={c} />
                    </div>
                  </div>
      </div>
      </div>
    </div>
  );
  }
}
