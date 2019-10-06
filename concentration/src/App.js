import React, { Component } from 'react';
import GameBoard from "./GameBoard";
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h3>Concentration Game</h3>

                <GameBoard />

            </div>
        );
    }

}


export default App;
