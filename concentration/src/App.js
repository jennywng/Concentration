import React, { Component } from 'react';
import { Card, CardContent, Icon } from "@material-ui/core";
import GameBoard from "./GameBoard";
import './App.css';

class App extends Component {
    // constructor(props) {
    //     super (props);
    //     // this.state = {
    //     // }
    // }

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
