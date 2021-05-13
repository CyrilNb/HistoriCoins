import React, { Component } from 'react';
    import './History.css'
    import axios from 'axios'
    import moment from 'moment'

    class History extends Component {
        constructor(){
            super();
            this.state = {
                todayprice: {},
                oneyearprice: {}
            }
            this.getBTCPrices = this.getBTCPrices.bind(this);
            this.getETHPrices = this.getETHPrices.bind(this);
            this.getDOGEPrices = this.getDOGEPrices.bind(this);
        }

 
    // This function gets the BTC price for a specific timestamp/date. The date is passed in as an argument
    getBTCPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=EUR&ts=' + date);
    }

    // This function gets the ICX price for a specific timestamp/date. The date is passed in as an argument
    getETHPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=EUR&ts=' + date);
    }

    // This function gets the NANO price for a specific timestamp/date. The date is passed in as an argument
    getDOGEPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=DOGE&tsyms=EUR&ts=' + date);
    }

    // This function gets the prices for the current date.
    getTodayPrice () {
        // Get today's date in timestamp
        let today = moment().unix();
        // axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
        axios.all([this.getETHPrices(today), this.getBTCPrices(today), this.getDOGEPrices(today)])
            .then(axios.spread((eth, btc, doge) => {
                let f = {
                    date: moment.unix(today).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.EUR,
                    btc: btc.data.BTC.EUR,
                    doge: doge.data.DOGE.EUR,
                }
                // Set the state of todayprice to the content of the object f
                localStorage.setItem('todayprice',JSON.stringify(f));
                this.setState({ todayprice: f });
            }));
    }

     // This function gets the prices for one year ago.
     getOneYearPrice () {
        // Get the date of year ago in timestamp
        let date = moment().subtract(365,'days').unix();
        // axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
        axios.all([this.getETHPrices(date), this.getBTCPrices(date), this.getDOGEPrices(date)])
            .then(axios.spread((eth, btc, doge) => {
                let f = {
                    date: moment.unix(date).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.EUR,
                    btc: btc.data.BTC.EUR,
                    doge: doge.data.DOGE.EUR,
                }
                // Set the state of one year ago to the content of the object f
                this.setState({ oneyearprice: f });
                localStorage.setItem('oneyearprice',JSON.stringify(f));
            }));
    }

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount() {
        this.getTodayPrice();
        this.getOneYearPrice();
    }

    componentDidMount () {
        if (!navigator.onLine) {
            this.setState({ todayprice: JSON.parse(localStorage.getItem('todayprice')) });
            this.setState({ oneyearprice: JSON.parse(localStorage.getItem('oneyearprice')) });
        }
    }

    render() {
        return (
            <div className="history--section container">
                <h2>One year ago - {this.state.oneyearprice.date}</h2>
                <div className="history--section__box">
                    <div className="history--section__box__inner">
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = {this.state.oneyearprice.btc} €</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = {this.state.oneyearprice.eth} €</p>
                            </div>
                            <div className="column">
                                <p>1 DOGE = {this.state.oneyearprice.doge} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default History;
