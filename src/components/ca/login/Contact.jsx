import React from 'react';
import './src/css/Wisca.css';
export default class Contact extends React.Component {
    render() {

        return (
            <div>
                <div className="login-wisca-MAINDIV">
                    <div className="login-wisca-Heading">
                        CONTACT US
      </div>
                    <div className="login-contact-contactMain">

                        <div className="login-contact-contactus">
                            <h2 className="login-contact-top">CONTACTS</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Suyash Singh </td>
                                        <td>: +91-8417954805</td>
                                    </tr>
                                    <tr >
                                        <td>(Convener)  </td>
                                        <td>suyash.thomso@gmail.com</td>
                                    </tr>

                                    <tr>
                                        <td>Abhishek Kumar  </td>
                                        <td>: +91-7979071260 </td>
                                    </tr>
                                    <tr>
                                        <td>(Co-Convener)   </td>
                                        <td>abhishek98.thomso@gmail.com</td>
                                    </tr>

                                    <tr>
                                        <td>Samarth Gubrele </td>
                                        <td>: +91-9425101043 </td>
                                    </tr>
                                    <tr>
                                        <td>(Co-Convener)   </td>
                                        <td>samarth.thomso@gmail.com</td>
                                    </tr>

                                    <tr>
                                        <td>Shubham Jaiswal </td>
                                        <td>: +91-9693482762 </td>
                                    </tr>
                                    <tr>
                                        <td>(Public Relations)</td>
                                        <td>shubham.thomso18@gmail.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="login-contact-address">
                            <h2 className="login-contact-top">ADDRESS</h2>
                            Thomso Office<br />
                            Multi Activity Center,<br />
                            Indian Institute of Technology, Roorkee<br />
                            <div className="login-contact-email"> <h2>EMAIL </h2>
                                thomso@iitr.ac.in
          </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
