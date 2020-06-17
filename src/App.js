import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

/* Get random coordinates [x,y] for the snake */
const getRandomCoordinates = () => {
  let min = 4;
  let max = 96;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  return [x, y];
}

/* Inital State (start or gameOver) */
const initialState = {
  snakeDots: [
    [0, 0],
    [4, 0],
    [8, 0],
  ],
  foodDot:
    getRandomCoordinates(),
  direction: 'RIGHT',
  speed: 200,
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    this.snakeSpeed();
    document.onkeydown = this.onKeyDown;
  }

  snakeSpeed() {
    clearInterval(this.interval);
    this.interval = setInterval(this.moveSnake, this.state.speed);
  }

  increaseSpeed() {
    if (this.state.speed > 50) {
      return this.state.speed - 10;
    } else {
      return 50;
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]); // Add new part to the tail (increase the number of block)
    return newSnake;
  }

  /* Conditions of the game */
  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
    this.snakeSpeed();
  }

  /* Read pressed key */
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
      default:
        break;
    }
  }

  /* Snake movement */
  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      default:
        break;
      case 'RIGHT':
        head = [head[0] + 4, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 4, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 4];
        break;
      case 'UP':
        head = [head[0], head[1] - 4];
        break;
    }
    dots.push(head);      // Add the head (new dot at beggining)
    dots.shift();         // Remove the tail (last dot)
    this.setState({
      snakeDots: dots     // Add the new snake coordinates
    })
  }

  /* Conditions while hitting the borders */
  checkIfOutOfBorders() {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    if (head[0] > 96) {
      head[0] = 0;
    } else if (head[1] > 96) {
      head[1] = 0;
    } else if (head[0] < 0) {
      head[0] = 96;
    } else if (head[1] < 0) {
      head[1] = 96;
    }
  }

  /* Conditions while hitting himself */
  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  /* Actions when eating */
  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.foodDot;
    if (head[0] === food[0] && head[1] === food[1]) {
      let newState = { ...this.state };
      newState.foodDot = getRandomCoordinates();      // Set new food coordinates
      newState.snakeDots = this.enlargeSnake();       // Add new dot to the snake
      newState.speed = this.increaseSpeed();          // Increase snake speed
      this.setState(newState);                        // Update the game state
      this.snakeSpeed();
    }
  }

  /* Alert for game over */
  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState);      // Reset the game
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
