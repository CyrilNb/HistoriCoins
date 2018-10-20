import React, { Component } from 'react';
    import './History.css'
    import axios from 'axios'
    import moment from 'moment'

    class History extends Component {
        constructor(){
            super();
            this.state = {
                todayprice: {},
                yesterdayprice: {},
                twodaysprice: {},
                threedaysprice: {},
                oneyearprice: {}
            }
            this.getBTCPrice = this.getBTCPrices.bind(this);
            this.getICXPrice = this.getICXPrice.bind(this);
            this.getNANOPrice = this.getNANOPrice.bind(this);
        }

    // This function gets the ICX price for a specific timestamp/date. The date is passed in as an argument
    getICXPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ICX&tsyms=EUR&ts=' + date);
    }

    // This function gets the BTC price for a specific timestamp/date. The date is passed in as an argument
    getBTCPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=EUR&ts=' + date);
    }
    
    // This function gets the LTC price for a specific timestamp/date. The date is passed in as an argument
    getNANOPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=NANO&tsyms=EUR&ts=' + date);
    }

    // This function gets the prices for the current date.
    getTodayPrice () {
        // Get today's date in timestamp
        let today = moment().unix();
        // axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
        axios.all([this.getETHPrices(today), this.getBTCPrices(today), this.getLTCPrices(today)])
            .then(axios.spread((icx, btc, nano) => {
                let f = {
                    date: moment.unix(today).format("MMMM Do YYYY"),
                    icx: icx.data.ICX.EUR,
                    btc: btc.data.BTC.EUR,
                    nano: nano.data.NANO.EUR
                }
                // Set the state of todayprice to the content of the object f
                this.setState({ todayprice: f });
            }));
    }

     // This function gets the prices for one year ago.
     getOneYearPrice () {
        // Get the date of year ago in timestamp
        let date = moment().subtract(365,'days').unix();
        // axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
        axios.all([this.getETHPrices(date), this.getBTCPrices(date), this.getLTCPrices(date)])
            .then(axios.spread((icx, btc, nano) => {
                let f = {
                    date: moment.unix(date).format("MMMM Do YYYY"),
                    icx: icx.data.ICX.EUR,
                    btc: btc.data.BTC.EUR,
                    nano: nano.data.NANO.EUR
                }
                // Set the state of one year ago to the content of the object f
                this.setState({ oneyearprice: f });
            }));
    }

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount() {
        this.getTodayPrice();
        this.getOneYearPrice();
    }

    render() {
        return (
            <div className="history--section container">
                <h2>History - One year ago</h2>
                <div className="history--section__box">
                    <div className="history--section__box__inner">
                        <h4>{this.state.todayprice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.todayprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ICX = ${this.state.todayprice.icx}</p>
                            </div>
                            <div className="column">
                                <p>1 NANO = ${this.state.todayprice.nano}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.oneyearprice.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.oneyearprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ICX = ${this.state.oneyearprice.ICX}</p>
                            </div>
                            <div className="column">
                                <p>1 NANO = ${this.state.oneyearprice.nano}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default History;
