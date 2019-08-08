import React, { Component } from 'react';
import Navbar from '../beta/home/Navbar';
import './src/css/payment.css';

class PaymentTerms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedBox: false
        }
    }
    handleChange = () => {
        this.setState({
            checkedBox: !this.state.checkedBox
        })
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="payment-terms-main-div">
                    <div className="payment-terms-child">
                        <h1>Terms and Conditions</h1>
                        <ul>
                            <li>
                                Any participant who is found guilty of breaking any rules or lands himself/herself in trouble by not following the regulations and guidlines should know that in any such circumstances, the IIT Roorkee would not be responsible for it in any scenario. Moreover, his/her participation would be cancelled if any such above mentioned action is being taken against him/her.
                            </li>
                            <li>
                                Any activity that is found to be illicit or involving unlawful action would be taken into consideration and the final decision would rest in the hands of the organizing team.
                            </li>
                            <li>
                                The organizing team reserves the right to amend, modify or withdraw offer made to the participant.
                            </li>
                            <li>
                                Any participant found or caught tampering or misusing the property of the IIT Roorkee or of the organizing team would be duly dealt with and would be liable to any penalty awarded to him/her.
                            </li>
                            <li>
                                All participant, irrespective of anything are expected to, and must abide by the rules laid out by the organizing team and IIT Roorkee. The participant must not deviate from the set rules at any point.
                            </li>
                            <li>
                                The organizing team shall be regarded as the sole authority for interpretation of any kind of terms mentioned above.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <form>
                            <input type="checkbox" name="terms" id="payment-terms-box" onChange={this.handleChange} />
                            <label for="love"> I accept the terms and conditions. </label>
                        </form>
                    </div>
                    <div className="payment-terms-buttons">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.thecollegefever.com/events/thomso">
                            <button disabled={!this.state.checkedBox}>Proceed for Payment</button></a>
                    </div>
                </div>
            </div >
        );
    }
}

export default PaymentTerms;