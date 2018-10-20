// Import React and Component
import React, { Component } from 'react';
// Import CSS from App.css
import './App.css';
// Import the Today component to be used below
import Today from './Today/Today'
// Import the History component to be used below
import History from './History/History'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <header className="container">
          <nav className="navbar"></nav>
            <div className="navbar-brand">
              <span className="navbar-item">HistoriCoins</span>
            </div>
            <div className="navbar-end">
            <a className="navbar-item" href="https://github.com/CyrilNb/Historicoins" target="_blank" rel="noopener noreferrer">Fork me on Github!</a>
            </div>
          </header>
        </div>
        <section className="results--section">
          <div className="container">
            <h1>HistoriCoins is a realtime price information about <br></br>BTC, ICX and NANO.</h1>
          </div>
          <div className="results--section__inner">
            <Today />
            <History />
          </div>
        </section>

      </div>
    );
  }
}

export default App;
