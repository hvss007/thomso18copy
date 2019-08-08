import React, { Component } from 'react';
import "./src/whythomso.css";
import Navbar from "../beta/home/Navbar.jsx";
// import Arrow from "./src/svg/arrow"
import { Link } from "react-router-dom"
// import LeftArr from "./src/svg/leftarr"
import "./src/arrow.css"
import { ArtistDetails, More_artists } from "./src/artists"


export default class WhyThomso extends Component {
    constructor() {
        super();
        this.state = {
            videos: ["https://www.youtube.com/embed/kD8ZvzmgVlo", "https://www.youtube.com/embed/89xE9rcwtIo"],
            slideindex: 0,
            artistdetails: ArtistDetails,
            moreartists: More_artists,
            viewmore: false,
        }
    }
    handlePrevious = () => {
        // if (this.state.slideindex >= 0) {
        //     this.setState({
        //         slideindex: this.state.slideindex - 1
        //     })
        //     console.log(this.state.slideindex, "slideindex")

        //     document.getElementById(`i${this.state.slideindex - 1}`).classList = "translate-left"
        //     document.getElementById(`i${this.state.slideindex}`).classList = "translate-left"
        // }
    }
    handleNext = () => {
        // if (this.state.slideindex <= this.state.videos.length - 1) {
        //     this.setState({
        //         slideindex: this.state.slideindex + 1
        //     })
        //     if (this.state.slideindex !== 1) {
        //         document.getElementById(`i${this.state.slideindex}`).classList.add("translate-right")
        //         document.getElementById(`i${this.state.slideindex + 1}`).classList.add("translate-right")
        //         document.getElementById(`i${this.state.slideindex + 2}`).classList.add("translate-right")
        //     }
        //     if (this.state.slideindex === 1) {
        //         document.getElementById(`i2`).classList.remove("translate-right")
        //         document.getElementById(`i2`).classList.add("translate-right")
        //     }


        // }
    }
    componentDidMount() {
        this.setState({
            artistdetails: ArtistDetails
        })
    }
    render() {
        return (
            <div className="whythomso-parent">
                <Navbar />
                <div className="whythomso-child">
                    <div className="whythomso-child-whythomso">
                        <h3>WHY VISIT THOMSO ?</h3>
                    </div>
                </div>
                <div className="whythomso-text">
                    <p>Thomso is the largest cultural festivals of North India attracting a crowd of over 30000 people. With over 150+ events in line,
                        Thomso is a three day cultural extravaganza playing host to eminent celebrities and talented scholars.</p>
                </div>
                <div id="attractions" className="whythomso-second-child">
                    <div className="whythomso-second-child-top">
                        <div className="whythomso-second-child-attractions">
                            <h3>Attractions</h3>
                        </div>
                    </div>
                    <div className="whythomso-second-child-middle">
                        <div className="whythomso-second-child-the-legacy">
                            <div className="whythomso-second-child-the-legacy-image">
                            </div>
                            <div className="whythomso-second-child-the-legacy-content">
                                <div className="whythomso-second-child-the-legacy-content-heading">
                                    <h3>The Legacy</h3>
                                </div>
                                <div className="whythomso-second-child-the-legacy-content-content">
                                    <p>The 170 years old legacy of IIT Roorkee and 35+ successful years of Thomso are itself a testimony to the fest's grandeur</p>
                                </div>
                            </div>
                        </div>
                        <div className="whythomso-second-child-the-institute">
                            <div className="whythomso-second-child-the-institute-image">
                                <iframe src="https://www.youtube.com/embed/6T_T07hglvk" title="IITR Drone View" height="150px" width="100%" frameBorder="0" allowFullScreen>
                                </iframe>
                            </div>
                            <div className="whythomso-second-child-the-institute-content">
                                <div className="whythomso-second-child-the-institute-content-heading">
                                    <h3>The Institute</h3>
                                </div>
                                <div className="whythomso-second-child-the-institute-content-content">
                                    <p>Amidst the foothills of Himalayas,fostering the spirit of adventure and excitement is located IIT Roorkee</p>
                                </div>
                            </div>
                        </div>
                        <div className="whythomso-second-child-the-nightmare">
                            <div className="whythomso-second-child-the-nightmare-image">
                            </div>
                            <div className="whythomso-second-child-the-nightmare-content">
                                <div className="whythomso-second-child-the-nightmare-content-heading">
                                    <h3>The Prosperity</h3>
                                </div>
                                <div className="whythomso-second-child-the-nightmare-content-content">
                                    <p>With 150+ events and prizes worth more than 30 lakhs at stake, Thomso attracts a crowd of over 50k people</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="review" className="whythomso-third-child">
                    <div className="whythomso-third-child-top">
                        <div className="whythomso-third-child-review">
                            <h3>Review Media</h3>
                        </div>
                    </div>
                    <div className="whythomso-third-child-middle">
                        <div className="whythomso-third-child-sliderwrapper">
                            <div className="whythomso-third-child-slider">
                                {/* <button className="whythomso-slider-leftarrow" onClick={this.handlePrevious} disabled={this.state.slideindex === 0}>
                                    <span className="whythomso-previous-arrow"><LeftArr /></span>PREV
                                </button> */}
                                <div className="cards-slider-wrapper">
                                    {
                                        this.state.videos.map((video, i) => (
                                            <div key={i} className={`ii${i}`} id={`i${i}`}>
                                                <iframe key={i} title={video} src={video} height="300" width="500" frameBorder="0" allowFullScreen>
                                                </iframe>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <button className="whythomso-slider-rightarrow" onClick={this.handleNext} disabled={this.state.slideindex === this.state.videos.length - 1}>
                                    NEXT<span className="whythomso-next-arrow"><Arrow /></span>
                                </button> */}
                            </div>
                            {/* <div className="whythomso-third-child-iit-content">
                                <div className="whythomso-third-child-iit-content-heading">
                                    <h3>IIT Roorkee</h3>
                                </div>
                            </div> */} </div>
                    </div>
                </div>
                <div id="blogs" className="whythomso-fourth-child">
                    <div className="whythomso-fourth-child-top">
                        <div className="whythomso-fourth-child-blogs">
                            <h3>Blogs</h3>
                        </div>
                    </div>
                    <div className="whythomso-fourth-child-recent-heading">
                        <h3><i>Recents</i></h3>
                    </div>
                    <div className="whythomso-fourth-child-middle">
                        <div className="whythomso-fourth-child-the-nightmare">
                            <Link to="/blog/Behind_the_scenes">
                                <div className="whythomso-fourth-child-the-nightmare-image">
                                </div>
                            </Link>
                            <div className="whythomso-fourth-child-the-nightmare-content">
                                <div className="whythomso-fourth-child-the-nightmare-content-heading">
                                    <Link to="/blog/Behind_the_scenes">
                                        <h3>Behind The Scenes</h3>
                                    </Link>
                                </div>
                                <div className="whythomso-fourth-child-the-nightmare-date">
                                    <h3>01.09.18</h3>
                                </div>
                                <div className="whythomso-fourth-child-the-nightmare-content-content">
                                    <p>“Rome wasn’t built in a day”, neither is Thomso. Be it a magnificent city or a magnificent fest, you have to lay bricks every hour to make things happen.</p>
                                </div>
                            </div>
                        </div>
                        <div className="whythomso-fourth-child-the-daymare">
                            <Link to="/blog/litfest">
                                <div className="whythomso-fourth-child-the-daymare-image">
                                </div>
                            </Link>
                            <div className="whythomso-fourth-child-the-daymare-content">
                                <div className="whythomso-fourth-child-the-daymare-content-heading">
                                    <Link to="/blog/litfest">
                                        <h3>Litfest</h3>
                                    </Link>
                                </div>
                                <div className="whythomso-fourth-child-the-daymare-date">
                                    <h3>23.09.18</h3>
                                </div>
                                <div className="whythomso-fourth-child-the-daymare-content-content">
                                    <p>Literature is the thread that we use the array of words with the power of expressions.It is the symphony of creative thoughts and orchestration of platitudes.</p>
                                </div>
                            </div>
                        </div>
                        <div className="whythomso-fourth-child-the-evemare">
                            <Link to="/blog/The_Social_Endeavours">
                                <div className="whythomso-fourth-child-the-evemare-image">
                                </div>
                            </Link>
                            <div className="whythomso-fourth-child-the-evemare-content">
                                <div className="whythomso-fourth-child-the-evemare-content-heading">
                                    <Link to="/blog/The_Social_Endeavours">
                                        <h3>The Social Endeavours</h3>
                                    </Link>
                                </div>
                                <div className="whythomso-fourth-child-the-evemare-date">
                                    <h3>06.10.18</h3>
                                </div>
                                <div className="whythomso-fourth-child-the-evemare-content-content">
                                    <p>‘We rise by lifting others’, Thomso truly abides by these words of Robert Ingersoll, extending its helping hands to bring about a change in society.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="whythomso-fourth-child-middle">
                        <div className="whythomso-fourth-child-the-nightmare">
                            <Link to="/blog/karwaan">
                                <div className="whythomso-fourth-child-the-nightmare-image-karvaan">
                                </div>
                            </Link>
                            <div className="whythomso-fourth-child-the-nightmare-content">
                                <div className="whythomso-fourth-child-the-nightmare-content-heading">
                                    <Link to="/blog/karwaan">
                                        <h3>KARWAAN-THOMSO ZONALS</h3>
                                    </Link>
                                </div>
                                <div className="whythomso-fourth-child-the-nightmare-date">
                                    <h3>08.09.18</h3>
                                </div>
                                <div className="whythomso-fourth-child-the-nightmare-content-content">
                                    <p>“The cultural fest of IIT Roorkee serves as its one of the premier brand tag and a signature which represents this institute of national importance all over the country."</p>
                                </div>
                            </div>
                        </div>
                        <div className="whythomso-fourth-child-the-evemare">
                            <Link to="/blog/recent_innovation_at_iitr">
                                <div className="whythomso-fourth-child-the-eve-image">
                                </div>
                            </Link>
                            <div className="whythomso-fourth-child-the-evemare-content">
                                <div className="whythomso-fourth-child-the-evemare-content-heading">
                                    <Link to="/blog/recent_innovation_at_iitr">
                                        <h3>Recent Innovation at IIT Roorkee</h3>
                                    </Link>
                                </div>
                                <div className="whythomso-fourth-child-the-evemare-date">
                                    <h3>06.10.18</h3>
                                </div>
                                <div className="whythomso-fourth-child-the-evemare-content-content">
                                    <p>Innovation is the buzzword that many hear, but fewer understand. It is the result of solving a problem, even if that problem wasn’t identified.
                                     </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="whythomso-fourth-child-viewall">
                        <Link to="">View all<span><Arrow /></span></Link>
                    </div> */}
                </div>
                <div id="previous" className="whythomso-fifth-child">
                    <div className="whythomso-fifth-child-top">
                        <div className="whythomso-fifth-child-previous">
                            <h3>Associated Celebrities</h3>
                        </div>
                    </div>
                    <div className="whythomso-fifth-child-middle-parent">
                        <div className="whythomso-fifth-child-middle">
                            {this.state.artistdetails.map(e =>
                                <div className="whythomso-fifth-child-artist">
                                    <div className="whythomso-fifth-child-image"
                                        style={{
                                            backgroundImage: `url(/img/main/whythomso/${e.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}>
                                    </div>
                                    <div key={e.id} className="whythomso-fifth-child-name">
                                        {e.name}
                                    </div>
                                </div>

                            )}

                            {
                                this.state.viewmore && this.state.moreartists.map(e =>
                                    <div className="whythomso-fifth-child-artist">
                                        <div className="whythomso-fifth-child-image"
                                            style={{
                                                backgroundImage: `url(/img/main/whythomso/${e.image})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat"
                                            }}>
                                        </div>
                                        <div key={e.id} className="whythomso-fifth-child-name">
                                            {e.name}
                                        </div>
                                    </div>
                                )}
                            <div className="whythomso-fifth-child-view-more-less">
                                {!this.state.viewmore ?
                                    <p onClick={() => this.setState({
                                        viewmore: !this.state.viewmore
                                    })}>View More...</p>
                                    : <p onClick={() => this.setState({
                                        viewmore: !this.state.viewmore
                                    })}>View Less.....</p>}
                            </div>
                        </div>
                    </div>
                    <div className="whythomso-sixth-child">
                        <div className="whythomso-sixth-child-top">
                            <div className="whythomso-sixth-child-faq">
                                <h3>FAQS</h3>
                            </div>
                        </div>
                        <div className="whythomso-sixth-child-middle">
                            <div className="whythomso-sixth-child-middle-columnone">
                                <div className="whythomso-faqs-ansque-one">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>What is the registration fee for Thomso’18?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span> <span>Registration fee with accommodation is Rs. 2100 and Rs. 1600 without accommodation. Once paid, fee is non-refundable</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-two">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>Where to REGISTER for Thomso’18?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span> <span>You can register at <Link to="/main/register">Register for Thomso'18</Link></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-three">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>What is the LAST DATE for registration?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span><span>As such there is no last date for registration but there are limited entries, so register as soon as possible.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-fifth">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>Are there any extra charges for pronites?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span> <span>No, Registration fee is inclusive of pronites passes.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-sixth">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>Are there extra charges for workshops?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span>
                                            <span>Yes. Visit
                                                    <a href="http://thomso.in/workshop"> Workshops </a> for more details.
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columntwo-two">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>From where we can get information for events for Thomso’18?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span>
                                            <span>Visit
                                                    <Link to="/events">
                                                    &nbsp;www.thomso.in/events&nbsp;
                                                    </Link>
                                                for details of all the events and their registration.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columntwo-two">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>Does Thomso has any age restriction?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span>
                                            <span>

                                                As such, there is no such restriction of age for the participants but it is necessary that the participant must be a college-studying student.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="whythomso-sixth-child-middle-columntwo">
                                <div className="whythomso-faqs-ansque-columntwo-one">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>What is the date of Thomso’18?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span> <span>Thomso is from 26th to 28th October.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columnthree-sixth">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>What are the important things that i should bring along with me to Thomso?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span>
                                            <span>
                                                We strongly suggest you to bring an extension cord,small lock,a blanket and your college ID card to avoid any issues.
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columntwo-three">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>How do I get to Roorkee?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span><span> By Airways<br />
                                                The nearest airport to Roorkee is situated in Dehradun, around 70km away, so one
                                            could easily take a taxi or bus to reach Roorkee.<br />
                                                By Railways<br />
                                                Trains are one of the easiest ways through which we could reach Roorkee, especially
                                            for a long distance journey.<br />
                                                By Bus<br />
                                                Buses can be obtained either from I.S.B.T. Kashmiri Gate, Delhi or from I.S.B.T.
                                                Anand Vihar Ghaziabad. A taxi is also an option of course, but you should be warned
                                            that the road isnt exactly an expressway.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columnthree-three">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>What is the theme of Thomso’18?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span><span>Theme of Thomso’18 is “Seized By Stardust”.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-sixth">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>Is personal vehicle allowed inside the campus?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span>
                                            <span>
                                                No, personal vehicles are not allowed inside the campus.
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columnthree-fifth">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>What will be provided in the fee of 2100?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span>
                                            <span>
                                                You will be provided with 4 night accommodation, 6 meals(dinner not include, you can buy it at here on nominal charges of 50-60 Rs), all pronite passes, event passes of all center stage events, merchandise of thomso'18 etc.
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="whythomso-sixth-child-middle-columnthree">
                                <div className="whythomso-faqs-ansque-columnthree-one">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>What’s the climate like? Do I need to bring some winter clothes now?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span> <span>The climate during the last week of October is usually chilly with some rainfall likely to occur. During the daytime the weather is warm, however nights are a little cold. Hence, it is advisable to carry some warm clothes.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columntwo-four">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>From where I can get the latest updates related to Thomso’18?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span>
                                            <span>
                                                You can get latest updates from our Facebook page
                                                    <a href="https://www.facebook.com/thomsoiitroorkee/" rel="noopener noreferrer" target="_blank" >Thomsoiitroorkee/facebook</a> .
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columnthree-four">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>How to reach IIT Roorkee?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span>
                                            <span>
                                                Once you reached Roorkee, you can easily take an E-rickshaw, the bus station is
                                            just 100 m away whereas railway station is just 3 km away from the main gate of IIT
                                            Roorkee.
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columnthree-fifth">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q</strong></span>
                                            <span>Will there be accommodation facility for me?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span>
                                            <span>
                                                There are many Hostels which would be available for the accommodation, the
                                         registration for allotment would be done on Thomso website.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="whythomso-faqs-ansque-columnthree-seventh">
                                    <div className="whythomso-faqs-height">
                                        <div className="whythomso-faqs-question">
                                            <span><strong>Q </strong></span>
                                            <span>Time slots for payment verification, identity verification and accommodation allotment?</span>
                                        </div>
                                        <div className="whythomso-faqs-answer">
                                            <span><strong>A</strong></span><span>
                                                We will be having the following slots for the above mentioned affairs:<br />
                                                On 25th of October:<br />  11 A.M to 5 P.M<br />
                                                8 P.M to 2 A.M
                                                <br /><br />
                                                On 26th of October: <br /> 6 A.M to 12 Noon.<br />
                                                3 P.M to 6 P.M
                                                <br /><br />
                                                On 27th of October: <br /> 12 A.M to 2 A.M<br />
                                                6 A.M to 9 A.M<br />
                                                3 P.M to 6 P.M
                                                <br /><br />
                                                On 28th of October: <br /> 9 A.M to 11 A.M<br />
                                                4 P.M to  6 P.M<br />
                                                11 P.M to  1 A.M</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}
