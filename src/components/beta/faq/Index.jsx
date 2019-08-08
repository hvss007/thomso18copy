import React from 'react';
import Navbar from '../home/Navbar';
import './faq.css';
import { Helmet } from "react-helmet"
export default class FAQIndex extends React.Component {
    render() {
        return (
            <div className="faq-index-container">
                <Helmet>
                    <meta keywords="" description="All doubts and queries regarding Thomso, the Annual cultural fest of IIT Roorkee are cleared
                        here." />
                </Helmet>
                <div className="faq-navbar-style">
                    <Navbar />
                </div>
                <div className="faq-content-main-div">
                    <div className="faq-content-main-div-heading">
                        <h1>Frequently Asked Questions</h1>
                    </div>
                    <div className="faq-content">
                        <div className="faq-content-child">
                        <div className="question"><div className="dot"></div> To whom should I contact for any queries?</div>
                            <div>
                                <p> Shubham Jaiswal: 9693482762 </p>
                                <p> Abhishek Kumaar: 7409247817 </p>
                                <p> Ayush Dhaka: 8979702197 / 9411028240 </p>
                                <p> Chandni Beniwal: 7740949800 </p>
                            </div>

                            {/* <div className="question"><div className="dot"></div> What is the registration fee for Thomso’18?</div>
                            <div> <p> Registration fee with accommodation is Rs. 2100 and Rs. 1600 without accommodation. Once paid, fee is non-refundable</p></div>
                            <div className="question"><div className="dot"></div> Where to REGISTER for Thomso’18?</div>
                            <div> <p> You can register at <Link to = "/main/register">Register for Thomso'18</Link></p></div>
                            <div className="question"><div className="dot"></div> What is the LAST DATE for registration?</div>
                            <div> <p> As such there is no last date for registration but there are limited entries, so register as soon as possible.</p></div>
                            <div className="question"><div className="dot"></div> Are there any extra charges for pronites?</div>
                            <div> <p> No, Registration fee is inclusive of pronites passes.</p></div>
                            <div className="question"><div className="dot"></div> Are there extra charges for workshops?</div>
                            <div> <p> Yes. Visit <Link to ="/workshop">Workshops</Link> for more details.</p></div>
                            <div className="question"><div className="dot"></div> From where we can get information for events for Thomso’18?</div>
                            <div> <p> Visit <Link to = "events">www.thomso.in/events</Link> for details of all the events and their registration.</p></div>
                            <div className="question"><div className="dot"></div> Does Thomso has any age restriction?</div>
                            <div> <p> As such, there is no such restriction of age for the participants but it is necessary that the participant must be a college-studying student.</p></div>
                            <div className="question"><div className="dot"></div> What is the date of Thomso’18?</div>
                            <div> <p> Thomso is from 26th to 28th October.</p></div>
                            <div className="question"><div className="dot"></div> What are the important things that i should bring along with me to Thomso?</div>
                            <div> <p> We strongly suggest you to bring an extension cord,small lock,a blanket and your college ID card to avoid any issues.</p></div>
                            <div className="question"><div className="dot"></div> How do I get to Roorkee?</div>
                            <div> <p> By Airways
The nearest airport to Roorkee is situated in Dehradun, around 70km away, so one could easily take a taxi or bus to reach Roorkee.
By Railways
Trains are one of the easiest ways through which we could reach Roorkee, especially for a long distance journey.
By Bus
Buses can be obtained either from I.S.B.T. Kashmiri Gate, Delhi or from I.S.B.T. Anand Vihar Ghaziabad. A taxi is also an option of course, but you should be warned that the road isnt exactly an expressway.</p></div>
                            <div className="question"><div className="dot"></div> What is the theme of Thomso’18?</div>
                            <div> <p> Theme of Thomso’18 is “Seized By Stardust”.</p></div>
                            <div className="question"><div className="dot"></div> What will be provided in the fee of 2100?</div>
                            <div> <p> You will be provided with 4 night accommodation, 6 meals(dinner not include, you can buy it at here on nominal charges of 50-60 Rs), all pronite passes, event passes of all center stage events, merchandise of thomso'18 etc.</p></div>
                            <div className="question"><div className="dot"></div> What’s the climate like? Do I need to bring some winter clothes now?</div>
                            <div> <p> The climate during the last week of October is usually chilly with some rainfall likely to occur. During the daytime the weather is warm, however nights are a little cold. Hence, it is advisable to carry some warm clothes.</p></div>
                            <div className="question"><div className="dot"></div> From where I can get the latest updates related to Thomso’18?</div>
                            <div> <p> You can get latest updates from our Facebook page <a href="https://www.facebook.com/thomsoiitroorkee/" rel="noopener noreferrer" target="_blank" >Thomsoiitroorkee/facebook .</a></p></div>
                            <div className="question"><div className="dot"></div> How to reach IIT Roorkee?</div>
                            <div> <p> Once you reached Roorkee, you can easily take an E-rickshaw, the bus station is just 100 m away whereas railway station is just 3 km away from the main gate of IIT Roorkee.</p></div>
                            <div className="question"><div className="dot"></div> Will there be accommodation facility for me?</div>
                            <div> <p> There are many Hostels which would be available for the accommodation, the registration for allotment would be done on Thomso website.</p></div>
                            <div className="question"><div className="dot"></div> Is personal vehicle allowed inside the campus?</div>
                            <div> <p> No, personal vehicles are not allowed inside the campus.</p></div> */}

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
