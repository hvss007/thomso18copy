import React, { Component } from 'react';
import Card from "./Card"


export default class SponsCardIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bundle: []
        }
    }
    componentDidMount() {
        if (this.props.details && this.props.details && this.props.details.length > 0) {
            this.setState({ bundle: this.props.details })
        }
    }
    render() {
        const { bundle } = this.state
        const matrix = []
        if (bundle && bundle.length > 0) {
            let k = 0
            for (let i = 0; i < bundle.length; i = i + 3) {
                matrix[k] = []
                for (let j = 0; j < 3; j++) {
                    if ((i + j) === bundle.length) {
                        break
                    } else {
                        matrix[k].push(bundle[i + j])
                    }
                }
                k++
            }
        }
        return (
            <div className="sponsors-image">
                {(matrix && matrix.length) ? matrix.map((spon, index) =>
                    <React.Fragment key={index}>
                        <Card info={spon} />
                    </React.Fragment>) : null}
            </div>
        );
    }
}
