import React, { Component } from 'react'
import { createGuitar, fetchBrands } from './guitar-api.js';
import './App.css';

export default class CreatePage extends Component {
    state = {
        color: 'hot pink',
        strings: 6,
        brand_id: 1,
        brands: [],
    }

    componentDidMount = async () => {
        const brandsData = await fetchBrands();

        this.setState({
            brands: brandsData.body
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createGuitar({
              color: this.state.color,
              strings: this.state.strings,
              brand_id: this.state.brand_id,
            });
    
            this.setState({
              color: '',
              strings: 6,
              brand_id: 1
            });

        } catch(e) {
            console.log(e.message)
        }
    }

    handleColorChange = e => {
        this.setState({ color: e.target.value });
    }

    handleStringChange = e => {
        this.setState({ strings: e.target.value });
    }

    handleBrandChange = e => {
        this.setState({ brand_id: e.target.value });
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
                    <label>
                        Brand:
                        <select onChange={this.handleBrandChange} value={this.state.brand}>
                            {
                                this.state.brands.map((brand) => <option value={brand.id}>{brand.name}</option>)
                            }
                        </select>
                    </label>
                    <button>Make guitar</button>
                </form>
            </div>
        )
    }
}
