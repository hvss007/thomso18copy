import React from "react";
import './WISCA.css'
import DivComponent from './divcomponent.jsx';
import img1 from './img/certi-01.png';
import img2 from './img/ticket-01.png';
import img3 from './img/tshirt-01.png';
import img4 from './img/gift-01.png';
import img5 from './img/medal-01.png';
import img6 from './img/social media-01.png';
export default class WISCA extends React.Component{
  render(){
    let a="Certificate of Appreciation";
    let b="Absolutely free entry to the pronities , center stage events and the workshops";
    let c="Grab the offical Thomso'18 Merchandise";
    let d="Receive goodies from our sponsorship partners";
    let e="Opportunity to get featured on our website";
    let f="Internship courses and certificates";
    return(
    <div className="fullpage">
      <div className="MAINDIV">

                <div className="Heading">
                  WHY BECOME CA?
                </div>
                <div className="main">
                  <div className="innermain1">
                      <DivComponent data={a} image={img1}/>
                  </div>
                  <div className="innermain2">
                      <DivComponent data={b} image={img2}/>
                  </div>

                </div>

                <div className="main2">
                  <div className="innermain1">
                      <DivComponent data={c} image={img3}/>
                  </div>
                  <div className="innermain2">
                      <DivComponent data={d} image={img4}/>
                  </div>
                </div>

                <div className="main2">
                  <div className="innermain1">
                      <DivComponent data={e} image={img5}/>
                  </div>
                  <div className="innermain2">
                      <DivComponent data={f} image={img6}/>
                  </div>
                </div>
    </div>
    </div>
  );
  }
}
