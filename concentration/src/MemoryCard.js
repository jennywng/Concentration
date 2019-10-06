import React, { Component } from 'react';
import { Card, CardContent } from "@material-ui/core";
import { Eco, Favorite, Grade, FiberManualRecord, InsertEmoticon, Cloud } from "@material-ui/icons";
import './App.css';

const leaf = <Eco />;
const heart = <Favorite />;
const star = <Grade />;
const circle = <FiberManualRecord />;
const smile = <InsertEmoticon />;
const cloud = <Cloud />;

const icons = [leaf, heart, star, circle, smile, cloud];

class MemoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Card onClick={() => this.props.setVisible(this.props.idx)}>
                    <CardContent>
                        {this.props.visible ? (icons[this.props.item]) : null}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default MemoryCard;
