import React, { Component } from 'react';

import './ProgressBar.scss'

class ProgressBar extends Component {
    
    render() {
        return (
            <div className="ProgressBar">
                <div className="ColorBar" style={ this.computeColorBarStyle() }></div>
                <div className="Title">{ this.props.name }</div>
                <div className="Bar">
                    <div className="Fill" style={ this.computeFillStyle() }></div>
                    <div className="Marker" style={ this.computeMarkerStyle() }></div>
                </div>
                <div className="Details">
                    <div className="Text">{ `${this.props.value} / ${this.props.total}` }</div>
                </div>
            </div>
        );
    }

    computeColorBarStyle() {
        return {
            background: this.props.color
        };
    }

    computeFillStyle() {
        return {
            width: `${ this.props.percent * 100 }%`,
            background: this.props.color
        };
    }

    computeMarkerStyle() {
        return {
            left: `${ this.props.markerPercent * 100}%`
        }
    }
}

export default ProgressBar;
