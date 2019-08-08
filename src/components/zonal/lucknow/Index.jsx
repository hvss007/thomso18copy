import React, { Component } from 'react';
import LucknowOpening from './LucknowOpening.jsx';
import SectionSecond2 from '../common/SectionSecond2';
import Footer from '../common/Footer';
import ZonalsFormLucknow from '../common/ZonalsFormLucknow';
import Popup from '../../common/popup/Index';

export default class LucknowIndex extends Component {
    render() {
        return (
            <div>
                <Popup {...this.props} onRef={ref => (this.popup = ref)} />
                <div style={{overflow:'hidden'}}>
                    <LucknowOpening />
                </div>
                <SectionSecond2 city='lucknow'/> 
                <ZonalsFormLucknow showModal={() => this.popup.show(['Congratulations!', `You have been successfully registered for Karwaan, Thomso18.`, `Confirmation email has been sent to your inbox`])} />
                <Footer city='lucknow' />
            </div>
        );
    }
}
