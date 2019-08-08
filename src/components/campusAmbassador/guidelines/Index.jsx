import React, { Component } from 'react';
import "./GuideIndex.css";
export default class GuideIndex extends Component {
    render() {
        return (
            <div className="campusAmb-guide-main-div">
                <h2 style={{margin:'0'}} className="campusAmb-guide-heading">
                    Section 1 : Expectations from a College Ambassador
                </h2>
                <h2 className="campusAmb-guide-heading">This section shall outline the basic responsibilities of a CA.</h2>


                <div className="campusAmb-guide-child">
                    <h3>1.1: Social Media Presence</h3>
                    Most of Thomso's information is conveyed via its facebook page Thomso, IIT Roorkee.
                    <ul>
                        <li> All CAs must compulsorily like and follow the page themselves to receive regular updates about events and also invite all their friends to like the page to ensure that Thomso's posts reach a wider audience in their region.
                        </li>
                        <br/>
                        <li>
                             All CAs must form a group of Thomso for their college on Facebook.
                            Group name: ThomsoIITR@clg_name
                            Groups must have atleast 200 people from their college as a member. To authenticate the group, undersigned should be the admin of the group along with you. The group should remain active with discussions and posts regarding events of Thomso'17.
                        </li>
                        <br/>
                        <li>
                             CAs must like and share all posts on the Thomso facebook page after they became a CA to ensure visibility of Thomso among their friends. The posts must be shared with public visibility and not for a restricted audience. The links to these shared posts which can be obtained by clicking on the date written below the post must be collected at a place.
                        </li>
                    </ul>
                </div>

               <div className="campusAmb-guide-child">
                   <h3>
                       1.2: Ground Publicity
                   </h3>
                   <ul>
                       <li>
                           The CA shall be responsible for putting up Thomso's publicity posters in his/her college, hostels, cafeterias and other places of gathering. Proof for the same must be submitted in a photograph of the notice board in colleges, hostels, cafeterias and other places of gathering, where the poster has been put up.
                       </li>
                   </ul>
               </div>

               <div className="campusAmb-guide-child">
                   <h3>
                       1.3: Activities
                   </h3>
                   <ul>
                       <li>
                           The CA shall be responsible for the conduction of online/ground activities of Thomso in his/her college and will be awarded for the same.
                       </li>
                   </ul>
               </div>

               <div className="campusAmb-guide-child">
                   <h2>
                       Section 2 : Rules and regulations:
                   </h2>
                   <ul>
                       <li>
                           In case of conflicts, the decisions taken by the Team Thomso shall be final.
                       </li>
                       <br/>
                       <li>
                           Thomso, IIT Roorkee holds the right to change the points structure without any prior notice to anyone.
                       </li>
                       <br/>
                   </ul>
               </div>

               <div className="campusAmb-guide-child">
                   <h2>
                       Section 3 : Scoring Methodology and Leaderboard
                   </h2>
                   <ul>
                       <li>
                           The Certificate of Appreciation as a Campus Ambassador (CA) will be issued only of he/she fulfills the required conditions and is deemed fit by the organizers.

                           Changes in the reward scheme at any point during the competition is under the sole discretion of the Thomso Team. However, in case of any change, the same will be communicated to all the ambassadors at the earliest to avoid any confusions. 
                       </li>
                   </ul>  
               </div>
            </div>
        );
    }
}

