import React, { Component } from 'react';
import { Grid, Button } from "@material-ui/core";
import MemoryCard from "./MemoryCard";

import './App.css';


class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            visible: [],
            // to keep track of current turn
            card1: null,
            card2: null,
            cardIdx1: null,
            cardIdx2: null,
            canClick: true,
            turns: 0,
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

    delay = ms => new Promise(res => {
        // console.log("start", this.state.canClick);
        // this.setState({canClick: false});
        // console.log("canClick", this.state.canClick);
        setTimeout(res, ms);
        // this.setState({canClick: true});
        // console.log("end", this.state.canClick);
    });

    setVisible = async (item, idx) => {
        // let cardVal = this.state.cards[idx];
        console.log("click", this.state.canClick);
        if (this.state.canClick) {
            if ((this.state.visible.length) % 2 === 0) {
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
                    visible: copyVisible,
                    turns: this.state.turns + 1
                });
                if (this.state.card1 !== this.state.card2) {

                    // wait 3 seconds
                    this.setState({canClick: false});
                    console.log("canClick", this.state.canClick);
                    await this.delay(3000);
                    this.setState({canClick: true});
                    console.log("end delay", this.state.canClick);

                    copyVisible.splice(this.state.visible.indexOf(this.state.cardIdx2), 1);
                    copyVisible.splice(this.state.visible.indexOf(this.state.cardIdx1), 1);
                    this.setState({
                        visible: copyVisible
                    });
                    // console.log("mismatch", this.state.visible);
                    // console.log("hello");
                }
            }
        }
    };

    reset = () => {
        let copyCards = this.state.cards.slice();
        this.shuffle(copyCards);
        this.setState({
            cards: copyCards,
            visible: [],
            card1: null,
            card2: null,
            cardIdx1: null,
            cardIdx2: null,
            canClick: true,
            turns: 0,
        });
    };

    // componentDidMount() {
    //     let cards = [];
    //     for (let i = 0; i < this.props.totalPairs; i++) {
    //         cards.push(i);
    //         cards.push(i);
    //     }
    //     this.shuffle(cards);
    //     this.setState({cards: cards});
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.totalPairs !== prevProps.totalPairs) {
            let cards = [];
            for (let i = 0; i < this.props.totalPairs; i++) {
                cards.push(i);
                cards.push(i);
            }
            this.shuffle(cards);
            this.setState({
                cards: cards,
                visible: [],
                card1: null,
                card2: null,
                cardIdx1: null,
                cardIdx2: null,
                canClick: true,
                turns: 0,
            });
        }
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
                <div style={{margin: '5%'}}>
                    Turns: {this.state.turns}
                </div>

                {this.state.cards.length > 0 ? (
                    <Button onClick={this.reset}>New Game</Button>
                ) : null}
            </div>
        );
    }
}

export default GameBoard;
