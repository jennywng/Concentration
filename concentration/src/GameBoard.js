import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import MemoryCard from "./MemoryCard";
// import { Eco, Favorite, Grade, FiberManualRecord, InsertEmoticon, Cloud } from "@material-ui/icons";

import './App.css';


class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
            visible: []
        }
    }

    setVisible = (idx) => {
        let copyVisible = this.state.visible.slice();
        if (copyVisible.length < 2) {
            copyVisible.push(idx);
        }
        this.setState({visible: copyVisible});
    };


    /**
     * fisher yates in place array shuffle
     * @param arr
     */
    shuffle = (arr) => {
        let j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    };

    componentDidMount() {
        let copyCards = this.state.cards.slice();
        this.shuffle(copyCards);
        this.setState({cards: copyCards});
    }

    render() {
        return(
            <div>
                <Grid container spacing={3}>
                    {this.state.cards.map((item, idx) => {
                        return (
                            <Grid item key={idx} xs={3}>
                                <MemoryCard
                                    idx={item}
                                    // visible={true}
                                    visible={this.state.visible.includes(idx)}
                                    // onClick={this.setVisible(idx)}
                                    setVisible={this.setVisible(idx)}
                                />
                            </Grid>
                        )
                    })}

                </Grid>

            </div>
        );
    }
}

export default GameBoard;
