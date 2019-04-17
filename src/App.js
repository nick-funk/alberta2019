import React, { Component } from 'react';
import ProgressBar from './components/ProgressBar/ProgressBar';

import './App.scss';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            majority: 44,
            totalRidings: 82,
            parties: []
        };

        this.reloadDelegate = this.reload.bind(this);
    }

    componentDidMount() {
        this.reload();
    }

    reload() {
        var url = `https://electionsapi.cp.org/api/alberta2019/Totals_By_Party`;

        var request = fetch(
            url,
            { method: 'GET' }
        );
        
        request.then(response => {
            response.json().then(json => {

                console.log(json);

                this.setState({
                    parties: json
                });

                setTimeout(
                    this.reloadDelegate,
                    1000
                );
            });
        });
    }

    partyColor(name) {
        if (name === 'Alberta New Democratic Party' || name === 'NDP') {
            return 'rgb(246, 144, 49)';
        }
        if (name === 'Alberta Party' || name === 'AP') {
            return 'rgb(0, 174, 239)';
        }
        if (name === 'United Conservative Party' || name === 'UCP') {
            return 'rgb(0, 93, 124)';
        }
        if (name === 'Alberta Liberal Party' || name === 'LIB') {
            return 'rgb(234, 110, 107)';
        }
        if (name === 'OTH') {
            return 'grey';
        }
    }

    render() {

        var partyBars = [];

        this.state.parties.forEach((party, index) => {

            var elected = party.Elected;

            partyBars.push(
                <ProgressBar 
                    key={ index }
                    name={ `${party.ShortName_En} - ${party.Name_En}` }
                    percent={ elected / this.state.totalRidings }
                    markerPercent={ this.state.majority / this.state.totalRidings }
                    color={ this.partyColor(party.Name_En) }
                    value={ elected }
                    total={ this.state.totalRidings }
                >
                </ProgressBar>
            );
        });

        return (
            <div className="App">
                <div className="Header">Alberta 2019</div>
                { partyBars }
                <div className="Footer">44 needed for majority.</div>
            </div>
        );
    }
}

export default App;
