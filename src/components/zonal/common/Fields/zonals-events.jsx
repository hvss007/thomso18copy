import React from 'react';
import '../zonals.css'


class ZonalsEvents extends React.Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            var: false
        }
    }

    componentDidMount() {
        this.setState({ checked: true, var: !this.state.var })
    }

    render() {
        return (
            <div>
            </div >
        );
    }
}
export default ZonalsEvents;