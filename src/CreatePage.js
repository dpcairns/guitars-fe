import React, { Component } from 'react'
import { createGuitar } from './guitar-api.js';
import './App.css';

export default class CreatePage extends Component {
    state = {
        color: 'hot pink',
        strings: 6,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await createGuitar({
          color: this.state.color,
          strings: this.state.strings
        });

        this.setState({
          color: '',
          strings: 6,
        })
    }

    handleColorChange = e => {
        this.setState({ color: e.target.value });
    }

    handleStringChange = e => {
        this.setState({ strings: e.target.value });
    }

    render() {
        return (
            <div className="content">
                <h2>CREATE!</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Strings: 
                        <input onChange={this.handleStringChange} type="number" value={this.state.strings} />
                    </label>
                    <label>
                        Color: 
                        <input onChange={this.handleColorChange} value={this.state.color} />
                    </label>
                    <button>Make guitar</button>
                </form>
            </div>
        )
    }
}
