import React, { Component } from 'react'
import './src/css/NgoIndex.css'
import Navbar from '../beta/home/Navbar.jsx'
import NgoCard from './Ngocard'
import { ngodetails } from './ngodetails.js'

class NgoIndex extends Component {
    render() {
        return (
            <div className="ngo-main-index">
                <Navbar />
                <div className="ngo-parent">
                    <div className="ngo-child-one">
                        <h3>OUR SOCIAL INITIATIVE PARTNERS</h3>
                    </div>
                </div>
                <div className="ngo-card-import-parent">
                    <div className="ngo-card-top-content">‘We rise by lifting others’, Thomso truly abides by these words of Robert Ingersoll, extending its helping hands to bring about a change in society. For one has said that the best way to find yourself is to lose yourself in the service of others. It's said that god has given us two hands, one to help yourself and the second to help others. As Winston Churchill has quoted, “Responsibility is the Price of Greatness”, being the annual cultural festival of a premier institute of the country, Thomso realises its responsibilities towards the society and wish to fix the broken rungs by its small contributions. Thomso being a non-profit organisation truly believes in the spirit of social service and has been actively involved in such activities in order to create a more humane world for us all. Not only Thomso but IIT Roorkee has always been inclined towards the welfare of the society and has always supported the society with its initiatives over the years like NSS, UBA, Anushruti, etc. Thomso firmly believes that development of the society is a matter of utmost importance and hence we have associated with many of such initiatives to stress on the fact that alone we can do so little and together we can do so much.</div>
                    {ngodetails.map((ngo,index) => {
                        return <NgoCard key={index} heading={ngodetails[index].heading} content={ngodetails[index].content} ngoImage={ngodetails[index].image}/>
                    })}
                </div>
            </div>
        )
    }
} 
export default NgoIndex
