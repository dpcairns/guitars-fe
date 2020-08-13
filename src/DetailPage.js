import React, { Component } from 'react'
import { fetchGuitar } from './guitar-api.js';

export default class DetailPage extends Component {
    state = {
        guitar: {}
    }

    componentDidMount = async () => {
        const data = await fetchGuitar(this.props.match.params.id)
    
        this.setState({
          guitar: data.body
        })
      }
    

    render() {
        return (
            <div>
               Here is your sick axe <span role="img" aria-label="sick-axe">🎸</span>: It is {this.state.guitar.color} and it has {this.state.guitar.strings} strings!
            </div>
        )
    }
}
