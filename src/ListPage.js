/* eslint-disable */
import React from 'react';
import { fetchGuitars } from './guitar-api.js';
import { Link } from 'react-router-dom';

class ListPage extends React.Component {
  state = {
    guitars: [] 
  }

  componentDidMount = async () => {
    const data = await fetchGuitars()

    this.setState({
      guitars: data.body
    })
  }

  render() {
    return (
      <div>
      <h2>Guitars:</h2>
          {
            this.state.guitars.map((guitar) => {
              return <Link className="guitar-box" to={`/detail/${guitar.id}`} key={`${guitar.id}-${guitar.color}`} style={{ margin: 5, padding: 5, border: 'solid 3px white'}}>
                {guitar.color} : {guitar.strings}
              </Link>
            })
          }
      </div>
    )
}
}

export default ListPage;

