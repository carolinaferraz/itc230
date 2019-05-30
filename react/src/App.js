// src/App.js

import React, {Component} from 'react';
import Bears from './components/bears';


class App extends Component {

  state = {
    bears: []
  }
  componentDidMount() {
    fetch('http://localhost:3000/api/bears')
    .then(res => res.json())
    .then((data) => {
      this.setState({ bears: data })
    })
    .catch(console.log)
  }

  render() {
    return (
      <Bears bears={this.state.bears} />
    );
  }
}



export default App;