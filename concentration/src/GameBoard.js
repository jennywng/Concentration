import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import MemoryCard from "./MemoryCard";

import './App.css';


class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
            visible: [],
            // to keep track of current turn
            card1: null,
            card2: null,
            cardIdx1: null,
            cardIdx2: null,
        }
    }

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

    delay = ms => new Promise(res => setTimeout(res, ms));

    setVisible = async (item, idx) => {
        let cardVal = this.state.cards[idx];
        console.log("click");
        if ((this.state.visible.length + 1) % 2 !== 0 || this.state.visible.length === 0) {
            /** if the middle of a turn **/
            console.log("setting vis");
            let copyVisible = this.state.visible.slice();
            copyVisible.push(idx);
            this.setState({
                visible: copyVisible,
                card1: item,
                cardIdx1: idx
            });
            // this.setState(state => ({
            //     visible: state.visible.includes(idx) ? state.visible.filter(i => i !== idx) : [...state.visible, idx]
            // }));
        } else {
            /** at the end of a turn **/
            let copyVisible = this.state.visible.slice();
            copyVisible.push(idx);

            await this.setState({
                card2: item,
                cardIdx2: idx,
                visible: copyVisible
            });
            if (this.state.card1 !== this.state.card2) {

                // wait 3 seconds
                await this.delay(3000);

                copyVisible.splice(this.state.visible.indexOf(this.state.cardIdx2), 1);
                copyVisible.splice(this.state.visible.indexOf(this.state.cardIdx1), 1);
                this.setState({
                    visible: copyVisible
                });
                console.log("mismatch", this.state.visible);
                console.log("hello");
            }
        }
    };

    checkValid = (item) => {
        // loop through the visible array
        let i1 = this.state.cards.indexOf(item);
        let i2 = this.state.cards.lastIndexOf(item);
        return this.state.visible.includes(i1) && this.state.visible.includes(i2);
    };

    componentDidMount() {
        let copyCards = this.state.cards.slice();
        this.shuffle(copyCards);
        this.setState({cards: copyCards});
    }

    render() {
        console.log("visible", this.state.visible);

        return(
            <div>
                <Grid container spacing={3}>
                    {this.state.cards.map((item, idx) => {
                        return (
                            <Grid item key={idx} xs={3}>
                                <MemoryCard
                                    idx={idx}
                                    item={item}
                                    visible={this.state.visible.includes(idx)}
                                    setVisible={(item, idx) => this.setVisible(item, idx)}
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
