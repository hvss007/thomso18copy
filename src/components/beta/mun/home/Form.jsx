import React from 'react';


import AuthService from "../../../../handlers/main/AuthService";
import FetchApi from '../../../../utils/FetchAPI';

import "../../../campusAmbassador/register/css/register.css";

export default class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            answerOne: '',
            answerTwo: '',
            answerThree: '',
            errors: ''
        };
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { answerOne, answerTwo, answerThree } = this.state;
        if (answerOne) {
            answerOne = answerOne.trim()
        }
        if (answerTwo) {
            answerTwo = answerTwo.trim()
        }
        if (answerThree) {
            answerThree = answerThree.trim()
        }
        const data = { answerOne, answerTwo, answerThree }

        if (answerOne && answerTwo && answerThree) {
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/main/answerMUN', data, token)
                .then(r => {
                    if (r && r.data) {
                        if (r.data.success === true) {
                            this.props.history.push('/main');
                        } else {
                            this.setState({ errors: 'Failed to register' })
                        }
                    }
                })
                .catch(e => {
                    this.setState({ errors: 'Something went wrong' })
                });
        } else {
            this.setState({ errors: 'Fields cannot be empty' })
        }
    }

    render() {
        const { answerOne, answerTwo, answerThree, errors } = this.state;
        return (
            <div className="register-parent">
                <div className="register-child">
                    <div className="register-form">
                        <form onSubmit={this.onSubmit}>
                            {errors ?
                                <div style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>
                                    {errors}
                                </div>
                                : null
                            }
                            <div className="form-heading">
                                <h2>Model United Nations</h2>
                            </div>
                            <div className="form-inwhy-child">
                                <label htmlFor="answerOne">What is your MUN experience in terms of number of conferences attended and positions held?</label>
                                <textarea
                                    id="answerOne"
                                    placeholder="Your message here..."
                                    name="answerOne"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    rows="1"
                                    value={answerOne}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-inwhy-child">
                                <label htmlFor="answerTwo">How do you think MUN can help in developing one's profile or personality?</label>
                                <textarea
                                    id="answerTwo"
                                    placeholder="Your message here..."
                                    name="answerTwo"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    rows="1"
                                    value={answerTwo}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-inwhy-child">
                                <label htmlFor="answerThree">How do you see the impact of UN in managing conflicts among countries as a whole?</label>
                                <textarea
                                    id="answerThree"
                                    placeholder="Your message here..."
                                    name="answerThree"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    rows="1"
                                    value={answerThree}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="register">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
