import { Component } from 'react'

class Count extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <p>Total todos: {this.props.length}</p>
        )
    }
}

export default Count;