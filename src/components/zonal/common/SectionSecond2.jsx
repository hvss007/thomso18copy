import React, { Component } from "react";
import SectionComp2 from "./SectionComp2";
import SectionComp from "./SectionComp";
import Fade from "./Fade";
import "../src/css/SecondSection.css";
export default class SectionSecond2 extends Component {
    constructor()
    {
        super();
        this.state={
            activeState:"zonals",
            dance:"Are you passionate about dancing? Do you have tingling sensations run down your feet when you hear music? Then come let yourself loose and dance to express. Come get lost amid the likes of yourself and prove that you aren’t a cent less than anyone. Let the flair of your dance moves hypnotize the eyes and let your expressions win the hearts. For those who believe that dance is a poem of which each movement is a word, come, exhibit your skills here" ,
            sing:"Can your melodious voices silence even the biggest gossipers under the roof? Can your music goes straight from ears to the heart? If you can, we pave way for all the crooning voices to shine bright in the music genres of their own choices. Sing out prayers, open up souls and make the spirits dance. Own the stage, compete with the elites and win accolades from the crowd to show that you are the best.",
            mic:"With a chance to be a free voice on the mic than being an echo of thoughts, Open mic welcomes performers from all styles and genres, be it poetry, storytelling, shayari or stand up comedy to grab the mic and show off their skills in front of an engaging audience. Do come to express, enrapture and entertain as nobody gets between you and your microphone. Grab the mic and the stage is all yours to steal show.",
            natak:"You don't need a stage when your skills can catch the eyes of the passersby from the streets. Nukkad Natak is a street play competition of Dramatics which effectively combines the live performances of the artists with the live audiences. Not only it offers avenues for wholesome entertainment but also outlines captivating issues which are socially relevant. The main endeavor is to convey a social message in an entertaining environment by the means of chants, drums and catchy slogans. Come and be a part of the Street Play Saga",
            mrthomso:"Talent is entrusted to a man as a treasure which must not be squandered. Do you have a flair towards the extraordinary? Do you have the motivation to transform your talent into genius? This Thomso, we offer you a chance to spread your wings and explore your talents in front of a captivating audience. This event has its participants showcasing their superfluity of talents, be it singing, dancing, comedy, magic or any quirky thing you are passionately curious about. So get all riled up, practice, perfect and work your way towards glory in this gem of an event.",
            karwaan: "‘Karwaan’- the Zonals of Thomso, IIT Roorkee are an initiative to connect Thomso to regions across the length and breadth of the country. Thomso carries out its talent hunt at several cities to provide the college students and the cultural societies an opportunity to enter the finals of highly diverse and competitive events of Thomso. With the organisation of several events such as Dance, Singing, Open Mic, Drama and Fashion, Thomso zonals encourage the local talent and provide them a chance to present themselves at a national platform.",
            // abhivyakti:"Talent is entrusted to a man as a treasure which must not be squandered. Do you have a flair towards the extraordinary? Do you have the motivation to transform your talent into genius? This Thomso, we offer you a chance to spread your wings and explore your talents in front of a captivating audience. This event has its participants showcasing their superfluity of talents, be it singing, dancing, comedy, magic or any quirky thing you are passionately curious about. So get all riled up, practice, perfect and work your way towards glory in this gem of an event.",
            workshop:"Tickets for Oil Painting Workshop By Expert Sweety Singh can be booked here."
        };
    }
    onClick(state)
    {
        this.setState({
            activeState:state,
        });
    }
    
    render() {
        return (
            <div className="zonal-common-section2"> 
                <div style={{position:"relative"}}>
                    <Fade in={this.state.activeState === "zonals"}> <SectionComp Name="zonals-comp-dance-transform" register="true" heading="Karwaan" content={this.state.karwaan} /></Fade>
                    <Fade in={this.state.activeState === "tgt-dance"}> <SectionComp Name="zonals-comp-dance-transform" register="true" heading="TGT-DANCE" content={this.state.dance} downloadPdf="DanceRule.pdf" /></Fade>
                    <Fade in={this.state.activeState === "tgt-sing"}> <SectionComp Name="zonals-comp-dance-transform"  register="true" heading="TGT-SING" content={this.state.sing} downloadPdf="SingRule.pdf" /></Fade>
                    <Fade in={this.state.activeState === "tgt-mic"}> <SectionComp Name="zonals-comp-dance-transform" register="true" heading="TGT-MIC" content={this.state.mic} downloadPdf="MicRule.pdf" /></Fade>
                    <Fade in={this.state.activeState === "tgt-natak"}> <SectionComp Name="zonals-comp-dance-transform" register="true" heading="TGT-NATAK" content={this.state.natak} downloadPdf="NatakRule.pdf" /></Fade>
                    <Fade in={this.state.activeState === "mrthomso"}> <SectionComp Name="zonals-comp-dance-transform" register="true" heading="MR & MISS THOMSO" content={this.state.mrthomso} downloadPdf="MrThomso.pdf"/></Fade>
                    {/*  <Fade in={this.state.activeState === "abhivyakti"}> <SectionComp Name="zonals-comp-dance-transform" heading="Abhivyakti" content={this.state.abhivyakti} downloadPdf="Abhivyakti.pdf"/></Fade>*/}
                    <Fade in={this.state.activeState === "workshop"}> <SectionComp Name="zonals-comp-dance-transform" register="false" heading="Workshop" content={this.state.workshop} /></Fade>
                </div>

                <div className="zonals-common-sectioncomp2">
                    <div onClick={()=>{
                        this.onClick("tgt-dance");}} >
                        <SectionComp2 dataOptions="TGT DANCING" nameofclass={(this.state.activeState === "tgt-dance") ?"zonals-comp-border": null} style={{cursor:"pointer"}}/>
                    </div>
                    <div style={{cursor:"pointer"}}
                        onClick={()=>{
                            this.onClick("tgt-sing");}} >
                        <SectionComp2 dataOptions="TGT SINGING" nameofclass={(this.state.activeState === "tgt-sing") ?"zonals-comp-border": null} />
                    </div>
                    {this.props.city === "delhi" ?
                        <div  style={{cursor:"pointer"}}
                            onClick={()=>{
                                this.onClick("workshop");}} >
                            <SectionComp2 dataOptions="WORKSHOP" nameofclass={(this.state.activeState === "workshop") ?"zonals-comp-border": null}/>
                        </div> :null}
                    <div  style={{cursor:"pointer"}}
                        onClick={()=>{
                            this.onClick("tgt-mic");}} >
                        <SectionComp2 dataOptions="TGT OPEN MIC" nameofclass={(this.state.activeState === "tgt-mic") ?"zonals-comp-border": null}/>
                    </div>
                    <div style={{cursor:"pointer"}}
                        onClick={()=>{
                            this.onClick("tgt-natak");}} >
                        <SectionComp2 dataOptions="NUKKAD NATAK" nameofclass={(this.state.activeState === "tgt-natak") ?"zonals-comp-border": null}/>
                    </div>
                    {this.props.city === "lucknow" ?
                        <div  style={{cursor:"pointer"}}
                            onClick={()=>{
                                this.onClick("mrthomso");}} >
                            <SectionComp2   dataOptions="MR & MISS THOMSO" nameofclass={(this.state.activeState === "mrthomso") ?"zonals-comp-border": null}/>
                        </div>
                        : null }
                    {( this.props.city !== "delhi" && this.props.city !== "lucknow" && this.props.city!== "jaipur") ?
                        <div style={{cursor:"pointer"}}
                            onClick={()=>{
                                this.onClick("abhivyakti");}}>
                            <SectionComp2   dataOptions="ABHIVYAKTI" nameofclass={(this.state.activeState === "abhivyakti") ?"zonals-comp-border": null}/>
                        </div>
                        : null}
                </div>
            </div>
        );
    }
}

