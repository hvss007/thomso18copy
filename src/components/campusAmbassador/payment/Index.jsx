import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './payment.css'

export default class PaymentIndex extends Component {
    render() {
        return (
            <div className="campusAmb-payment-main-div">
                <div className="campusAmb-payment-main-div-child">
                    <div className="campusAmb-payment-heading">
                        <h2>Payment Process</h2>
                    </div>
                    <div className="campusAmb-payment-child">
                        <ul>
                            <li> Experience the magical three days of Thomso’18 by proceeding to the payment portal by clicking on the button given below.</li>

                            <li> After the payment portal opens, please note that there are two types of tickets available for the fest, one with the accommodation and the other without it. Select the type of ticket you want to purchase - accommodation or non-accommodation. Please read the details carefully before choosing the options.
                            </li>
                            <li>  Select the number of participants for whom you wish to buy the tickets for both accommodation and non-accommodation categories.
                            </li>
                            <li> When you proceed ahead, the total amount to be paid will be displayed along with other details. Please take a careful note of them.
                            </li>
                            <li>     In the next step, fill in the details of the participants availing accommodation and non-accomodation tickets.
                            </li>
                            <li>   Choose the payment option and fill in the details carefully.
                            </li>
                            <li>  After the payment is done, a confirmation mail is sent to your registered mail id. Please bring the hard copy of this payment receipt when you visit Thomso’18.</li>
                        </ul>
                    </div>
                    <div className="campusAmb-payment-buttons">
                        <Link to="/payment"><button>Proceed for Payment</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

