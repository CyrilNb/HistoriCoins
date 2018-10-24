import React, { Component } from 'react';
import './Today.css'
import axios from 'axios'
import Pusher from 'pusher-js'

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
       // establish a connection to Pusher
        this.pusher = new Pusher('35c3a9f0ce12cb308b8f', {
            cluster: 'eu',
            encrypted: true
        });
        // Subscribe to the 'coin-prices' channel
        this.prices = this.pusher.subscribe('coin-prices');

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
                        <h5>{this.state.btcpriceEUR} €</h5>
                        <h6>${this.state.btcpriceUSD}</h6>
                        <br></br>
                        <p>1 BTC</p>
                    </div>
                    <div className="column icx--section">
                        <h5>{this.state.icxpriceEUR} €</h5>
                        <h6>${this.state.icxpriceUSD}</h6>
                        <br></br>
                        <p>1 ICX</p>
                    </div>
                    <div className="column nano--section">
                        <h5>{this.state.nanopriceEUR} €</h5>
                        <h6>${this.state.nanopriceUSD}</h6>
                        <br></br>
                        <p>1 NANO</p>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount () {
        console.log('component did mount')
        setInterval(() => {
            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ICX,NANO&tsyms=EUR')
                .then(response => {
                    this.sendPricePusher(response.data)
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }, 10000) //query the API every 10 secs and sends the data to Pusher
        // We bind to the 'prices' event and use the data in it (price information) to update the state values, thus, realtime changes 
        this.prices.bind('prices', price => {
            this.setState({ btcpriceEUR: price.prices.BTC.EUR });
            this.setState({ icxpriceEUR: price.prices.ICX.EUR});
            this.setState({ nanopriceEUR: price.prices.NANO.EUR });
        }, this);
     }

    sendPricePusher (data) {
        axios.post('/prices/new', {
            prices: data
        })
          .then(response => {
              console.log(response)
          })
          .catch(error => {
              console.log(error)
          })
     }

}


export default Today;