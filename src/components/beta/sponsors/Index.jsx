import React, { Component } from 'react';
import {Helmet} from "react-helmet"
import { SponsDetails } from "./spons"
import SponsCard from "./Sponscard"
import "./sponsors.css"
import Navbar from "../home/Navbar"
export default class SponsorsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sponsdetails:[]
        }
    }
    componentDidMount(){
        this.setState({
            sponsdetails:SponsDetails
        })
    }
    render() {
        return (
            <div className="sponsors-parent">
                <Helmet>
                    <meta keywords="" description="Thomso&#39;s title sponsor is comio smartphones. It driven by hero and powered by ONGC.
                        Partenered with sectors like tourism, educational, travel, food, online digital media, magazines, music
                        channel and many more." />
                </Helmet>
                <Navbar />
                <div className="sponsors-child">
                {this.state.sponsdetails && this.state.sponsdetails.map((e,index)=>
                        <div key={index} className="sponsors-child-parent">
                            <div className="sponsors-title">{e.title}</div>
                            <SponsCard key={index} details={e.sponsors} />
                        </div>
                )}
                </div>
            </div>
        );
    }
}