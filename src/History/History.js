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
            this.getICXPrices = this.getICXPrices.bind(this);
            this.getNANOPrices = this.getNANOPrices.bind(this);
            this.getXRBPrices = this.getXRBPrices.bind(this);
        }

 
    // This function gets the BTC price for a specific timestamp/date. The date is passed in as an argument
    getBTCPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=EUR&ts=' + date);
    }

    // This function gets the ICX price for a specific timestamp/date. The date is passed in as an argument
    getICXPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ICX&tsyms=EUR&ts=' + date);
    }


    // This function gets the NANO price for a specific timestamp/date. The date is passed in as an argument
    getNANOPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=NANO&tsyms=EUR&ts=' + date);
    }

    // This function gets the XRB (old NANO) price for a specific timestamp/date. The date is passed in as an argument
    getXRBPrices (date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=XRB&tsyms=EUR&ts=' + date);
    }

    // This function gets the prices for the current date.
    getTodayPrice () {
        // Get today's date in timestamp
        let today = moment().unix();
        // axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
        axios.all([this.getICXPrices(today), this.getBTCPrices(today), this.getNANOPrices(today)])
            .then(axios.spread((icx, btc, nano) => {
                let f = {
                    date: moment.unix(today).format("MMMM Do YYYY"),
                    icx: icx.data.ICX.EUR,
                    btc: btc.data.BTC.EUR,
                    nano: nano.data.NANO.EUR,
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
        axios.all([this.getICXPrices(date), this.getBTCPrices(date), this.getNANOPrices(date), this.getXRBPrices(date)])
            .then(axios.spread((icx, btc, nano, xrb) => {
                let f = {
                    date: moment.unix(date).format("MMMM Do YYYY"),
                    icx: icx.data.ICX.EUR,
                    btc: btc.data.BTC.EUR,
                    nano: nano.data.NANO.EUR,
                    xrb: xrb.data.XRB.EUR
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
        //cause NANO was previously named 'XRB' less than one year ago we have to display XRB price instead, depending of the date.
        let valueOfNano; 
        if(this.state.oneyearprice.nano === 0){
            valueOfNano = this.state.oneyearprice.xrb;
        }else{
            valueOfNano = this.state.oneyearprice.nano;
        }
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
                                <p>1 ICX = {this.state.oneyearprice.icx} €</p>
                            </div>
                            <div className="column">
                                <p>1 NANO = {valueOfNano} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default History;
