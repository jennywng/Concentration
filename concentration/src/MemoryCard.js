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
            visible: false
        }
    }

    render() {
        return(
            <div>
                <Card>
                    <CardContent>
                        {this.props.visible ? (icons[this.props.idx]) : null}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default MemoryCard;
