import React, { Component } from 'react';
import GameBoard from "./GameBoard";
import {Select, MenuItem} from "@material-ui/core";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            totalPairs: 0,
        }
    }

    handleSelect = (e) => {
        this.setState({totalPairs: e.target.value});
    };

    render() {
        return (
            <div className="App" style={{margin: '10%'}}>
                <h3>Concentration Game</h3>
                <Select
                    value={this.state.totalPairs}
                    onChange={(e) => this.handleSelect(e)}
                >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                </Select>
                <GameBoard
                    totalPairs={this.state.totalPairs}
                />

            </div>
        );
    }

}


export default App;
