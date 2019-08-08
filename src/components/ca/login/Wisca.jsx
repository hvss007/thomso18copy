import React from "react";
import './src/css/Wisca.css';
import LoginDivCompo from './LoginDivCompo.jsx';
import img1 from './img/certi.png';
import img2 from './img/ticket.png';
import img3 from './img/tshirt.png';
import img4 from './img/gift.png';
import img5 from './img/medal.png';
import img6 from './img/socialmedia.png';
export default class Wisca extends React.Component{
  render(){
    let a="Certificate of Appreciation";
    let b="absolutely free entry to the pronities , center stage events and the workshops";
    let c="Grab the offical Thomso'18 Merchandise";
    let d="Receive goodies from our sponsorship partners";
    let e="Oppurtunity to get featured on our website";
    let f="Internship courses and certificates";
    return(
    <div className="login-wisca-fullpage">
      <div className="login-wisca-MAINDIV">

                <div className="login-wisca-Heading" id="login-wisca-Heading">
                  WHY BECOME CA?
                </div>
                <div className="login-wisca-main">
                  <div className="login-wisca-innermain1">
                      <LoginDivCompo data={a} image={img1}/>
                  </div>
                  <div className="login-wisca-innermain2">
                      <LoginDivCompo data={b} image={img2}/>
                  </div>

                </div>

                <div className="login-wisca-main2">
                  <div className="login-wisca-innermain1">
                      <LoginDivCompo data={c} image={img3}/>
                  </div>
                  <div className="login-wisca-innermain2">
                      <LoginDivCompo data={d} image={img4}/>
                  </div>
                </div>

                <div className="login-wisca-main2">
                  <div className="login-wisca-innermain1">
                      <LoginDivCompo data={e} image={img5}/>
                  </div>
                  <div className="login-wisca-innermain2">
                      <LoginDivCompo data={f} image={img6}/>
                  </div>
                </div>
    </div>
    </div>
  );
  }
}
