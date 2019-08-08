import React from 'react';
import "./loader.css" ;
import Loadersvg from './Loadersvg';
export default class Loader extends React.Component{
    render(){
        return (
            <div className="common-loader-loadercontainer">
                <section className="common-loader-loadersection">
                    <div className="common-loader-loader common-loader-loader-2">
                        <Loadersvg/>
                        <div className="common-loader-loader-circles"></div>
                    </div>
                </section>
            </div>

        )
    }
}