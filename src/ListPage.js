/* eslint-disable */
import React from 'react';
import { fetchGuitars, fetchBrands } from './guitar-api.js';
import { Link } from 'react-router-dom';

class ListPage extends React.Component {
  state = {
    guitars: [],
    brands: [],
    filter: 'All'
  }

  componentDidMount = async () => {
    if (!this.props.token) {
      this.props.history.push('/login');
    } else {
      const data = await fetchGuitars(this.props.token)
      const brands = await fetchBrands(this.props.token)  

      this.setState({
        guitars: data.body,
        brands: brands.body
      })
    }

  }

  render() {
    const filteredGuitars = this.state.guitars.filter(guitar => {
      // if the filter is all, include all items (i.e. always return true)
      if (this.state.filter === 'All') return true;

      // if there is another filter, compare the filter to the guitar brand and return true if they match
      return guitar.brand_name === this.state.filter;
    })

    return (
      <>
      <select onChange={e => this.setState({ filter: e.target.value})} value={this.state.filter}>
          <option value={"All"}>All</option>
          {
            this.state.brands.map(brand => <option value={brand.name}>{brand.name}</option>)
          }
        </select>
      <div className="guitars">
          {
            filteredGuitars.map((guitar) => {
              return <Link className="guitar" to={`/detail/${guitar.id}`} key={`${guitar.id}-${guitar.color}`}>
                <p>Color: {guitar.color}</p>
                <p>Strings: {guitar.strings}</p>
                <p>Brand: {guitar.brand_name}</p>
              </Link>
            })
          }
      </div>
      </>
    )
}
}

export default ListPage;

