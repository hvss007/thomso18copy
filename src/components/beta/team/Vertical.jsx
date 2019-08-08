import React from 'react'
import CardRow from './CardRow'

export default class Vertical extends React.Component {
    constructor() {
        super();
        this.state = {
            members: null
        }
    }

    componentDidMount() {
        if (this.props.post && this.props.post.members && this.props.post.members.length > 0) {
            this.setState({ members: this.props.post.members })
        }
    }
    render() {
        const { members } = this.state
        const matrix = []
        if (members && members.length > 0) {
            let k = 0
            for (let i = 0; i < members.length; i = i + 3) {
                matrix[k] = []
                for (let j = 0; j < 3; j++) {
                    if ((i + j) === members.length) {
                        break
                    } else {
                        matrix[k].push(members[i + j])
                    }
                }
                k++
            }
        }
        return (
            <div>
                {(matrix && matrix.length) ? matrix.map((members, index) =>
                    <CardRow members={members} key={index} />) : null}
            </div>
        )
    }
}