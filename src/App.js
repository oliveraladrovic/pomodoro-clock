import React, { Component } from 'react';
import beep from './beep.mp3';

class App extends Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    timeLeft: 1500,
    cycle: 'Session',
    interval: null
  };

  formatTime = remaining => {
    let min = Math.floor(remaining / 60);
    let sec = remaining % 60;
    min = min < 10 ? '0' + min : min.toString();
    sec = sec < 10 ? '0' + sec : sec.toString();
    return min + ':' + sec.slice(0, 2);
  };

  startStop = () => {
    let interval = this.state.interval;
    if (interval === null) {
      interval = setInterval(() => {
        if (this.state.timeLeft === 0) {
          this.setState({
            cycle: this.state.cycle === 'Session' ? 'Break' : 'Session',
            timeLeft:
              this.state.cycle === 'Session'
                ? this.state.breakLength * 60
                : this.state.sessionLength * 60
          });
        } else {
          this.setState({
            timeLeft: this.state.timeLeft - 1
          });
          if (this.state.timeLeft === 0) {
            document.querySelector('#beep').play();
          }
        }
      }, 1000);
      this.setState({
        interval: interval
      });
    } else {
      clearInterval(this.state.interval);
      this.setState({
        interval: null
      });
    }
  };

  reset = () => {
    if (this.state.interval !== null) {
      clearInterval(this.state.interval);
    }
    document.querySelector('#beep').pause();
    document.querySelector('#beep').currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      cycle: 'Session',
      interval: null
    });
  };

  breakDecrement = () => {
    if (this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  };

  breakIncrement = () => {
    if (this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  };

  sessionDecrement = () => {
    if (this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeft: (this.state.sessionLength - 1) * 60
      });
    }
  };

  sessionIncrement = () => {
    if (this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeft: (this.state.sessionLength + 1) * 60
      });
    }
  };

  render() {
    const { breakLength, sessionLength, timeLeft, cycle } = this.state;
    return (
      <div id='app'>
        <div className='row'>
          <div className='column'>
            <label id='break-label'>Break Length</label>
            <div className='row'>
              <button
                id='break-decrement'
                onClick={() => {
                  this.breakDecrement();
                }}
              >
                &lt;
              </button>
              <label id='break-length'>{breakLength}</label>
              <button
                id='break-increment'
                onClick={() => {
                  this.breakIncrement();
                }}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className='column'>
            <label id='session-label'>Session Length</label>
            <div className='row'>
              <button
                id='session-decrement'
                onClick={() => {
                  this.sessionDecrement();
                }}
              >
                &lt;
              </button>
              <label id='session-length'>{sessionLength}</label>
              <button
                id='session-increment'
                onClick={() => {
                  this.sessionIncrement();
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <label id='timer-label'>{cycle}</label>
        <label id='time-left'>{this.formatTime(timeLeft)}</label>
        <div className='row'>
          <button
            id='start_stop'
            onClick={() => {
              this.startStop();
            }}
          >
            start-stop
          </button>
          <button
            id='reset'
            onClick={() => {
              this.reset();
            }}
          >
            reset
          </button>
        </div>
        <audio id='beep' src={beep}></audio>
      </div>
    );
  }
}

export default App;
