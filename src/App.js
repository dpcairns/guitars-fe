/* eslint-disable */
import React from 'react';
import { fetchGuitars } from './guitar-api.js';
import './App.css';

class App extends React.Component {
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
      <div className="App">
        <header className="App-header">
          <h2>Guitars:</h2>
          {
            this.state.guitars.map((guitar) => {
              return <div style={{ margin: 5, padding: 5, border: 'solid 3px white'}}>
                {guitar.color} : {guitar.strings}
              </div>
            })
          }
        </header>
        </div>
    )
}
}

export default App;

