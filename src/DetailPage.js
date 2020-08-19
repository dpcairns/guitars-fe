import React, { Component } from 'react'
import { fetchGuitar, deleteGuitar, updateGuitar, fetchBrands } from './guitar-api.js';


export default class DetailPage extends Component {
    state = {
        guitar: {},
        color: 'hot pink',
        strings: 6,
        brand_id: 1,
        brands: [],
    }

    componentDidMount = async () => {
        if (!this.props.token) {
            this.props.history.push('/login');
          } else {  
            const data = await fetchGuitar(this.props.match.params.id)
            const brandsData = await fetchBrands();
    
            const matchingBrand = brandsData.body.find(brand => brand.name === data.body.brand_name);
    
            this.setState({
                brands: brandsData.body,
                guitar: data.body,
                color: data.body.color,
                strings: data.body.strings,
                brand: matchingBrand.id
            })
          }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // go get all the parameters from state/props, and pass them to updateGuitar
             await updateGuitar(
                this.props.match.params.id, 
                {
                    color: this.state.color,
                    strings: this.state.strings,
                    brand_id: this.state.brand_id,
                });

            // once the guitar is done updating, go fetch the updated guitar
            const updatedGuitar = await fetchGuitar(this.props.match.params.id)
    
            // putting the guitar in state triggers a re-render
            this.setState({
              color: '',
              strings: 6,
              brand_id: 1,
              guitar: updatedGuitar.body,
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

    handleDelete = async () => {
        await deleteGuitar(this.props.match.params.id);

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div>
               Here is your sick {this.state.guitar.brand_name} axe <span role="img" aria-label="sick-axe">🎸</span>: It is {this.state.guitar.color} and it has {this.state.guitar.strings} strings!

                </div>

        <h3>Update this axe?</h3>
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
                    <button>Update Axe</button>
                </form>
               <button style={{ background: 'crimson'}} onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}
