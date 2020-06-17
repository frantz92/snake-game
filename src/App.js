import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

class App extends Component {

  state = {
    snakeDots: [
      [0, 0],
      [2, 0],
      [4, 0],
    ],
    foodDot:
      getRandomCoordinates(),
    direction: 'RIGHT',
  }

  componentDidMount() {
    document.onkeydown = this.onKeyDown;
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: 'UP' });
        break;
      case 40:
        this.setState({ direction: 'DOWN' });
        break;
      case 37:
        this.setState({ direction: 'LEFT' });
        break;
      case 39:
        this.setState({ direction: 'RIGHT' });
        break;
    }
  }

  render() {
    return (
      <div className='game-area'>
        <Snake snakeDots={this.state.snakeDots} />
        <Food foodDot={this.state.foodDot} />
      </div>
    );
  }
}

export default App;
