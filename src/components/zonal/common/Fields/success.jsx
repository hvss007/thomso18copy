import React from 'react';

export default class Success extends React.Component {
    render() {
        return (
            <div>
                {this.props.fieldValues.step === 3 ?
                    <div>Successfully registered!</div>
                    :
                    <div>Already registered!</div>
                }
                <div>
                    Check your email<a href="https://mail.google.com">{this.props.fieldValues.email}</a>
                    for confirmation.
                </div>
            </div>
        );
    }
}
