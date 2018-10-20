import React, { Component } from 'react';
import './Today.css'
import axios from 'axios'

class Today extends Component{
    // Adds a class constructor that assigns the initial state values:
    constructor (){
        super();
        this.state = {
            btcpriceUSD: '',
            btcpriceEUR: '',
            icxpriceUSD: '',
            icxpriceEUR: '',
            nanopriceUSD: '',
            nanopriceEUR: '',
        };
    }

    //This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount() {
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ICX,NANO&tsyms=USD,EUR')
            .then(response => {
                //We set the latest price provided by CryptoCompare.
                this.setState({btcpriceUSD: response.data.BTC.USD});
                this.setState({btcpriceEUR: response.data.BTC.EUR});
                this.setState({icxpriceUSD: response.data.ICX.USD});
                this.setState({icxpriceEUR: response.data.ICX.EUR});
                this.setState({nanopriceUSD: response.data.NANO.USD});
                this.setState({nanopriceEUR: response.data.NANO.EUR});
            })
            //catching any error here
            .catch(error => {
                console.log(error)
            })
    }

     // The render method contains the JSX code which will be compiled to HTML.
     render() {
        return (
            <div className="today--section container">
                <h2>Current Price</h2>
                <div className="columns today--section__box">
                    <div className="column btc--section">
                        <h5>${this.state.btcpriceEU}</h5>
                        <p>1 BTC</p>
                    </div>
                    <div className="column icx--section">
                        <h5>${this.state.icxpriceEUR}</h5>
                        <p>1 ETH</p>
                    </div>
                    <div className="column nano--section">
                        <h5>${this.state.nanopriceEUR}</h5>
                        <p>1 LTC</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default Today;