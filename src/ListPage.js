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
      <div className="guitars">
          {
            this.state.guitars.map((guitar) => {
              return <Link className="guitar" to={`/detail/${guitar.id}`} key={`${guitar.id}-${guitar.color}`}>
                <p>Color: {guitar.color}</p>
                <p>Strings: {guitar.strings}</p>
              </Link>
            })
          }
      </div>
    )
}
}

export default ListPage;

