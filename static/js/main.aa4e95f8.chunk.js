(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,a){e.exports=a(52)},24:function(e,t,a){},26:function(e,t,a){},28:function(e,t,a){},49:function(e,t,a){},52:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(17),r=a.n(i),o=(a(24),a(4)),s=a(5),l=a(7),m=a(6),u=a(8),p=(a(26),a(28),a(1)),d=a.n(p),h=a(18),E=a.n(h),g=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={btcpriceUSD:"",btcpriceEUR:"",icxpriceUSD:"",icxpriceEUR:"",nanopriceUSD:"",nanopriceEUR:""},e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.pusher=new E.a("35c3a9f0ce12cb308b8f",{cluster:"eu",encrypted:!0}),this.prices=this.pusher.subscribe("coin-prices"),d.a.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ICX,NANO&tsyms=USD,EUR").then(function(t){e.setState({btcpriceUSD:t.data.BTC.USD}),localStorage.setItem("BTCEUR",t.data.BTC.EUR),e.setState({btcpriceEUR:t.data.BTC.EUR}),localStorage.setItem("BTCUSD",t.data.BTC.USD),e.setState({icxpriceUSD:t.data.ICX.USD}),localStorage.setItem("ICXEUR",t.data.ICX.EUR),e.setState({icxpriceEUR:t.data.ICX.EUR}),localStorage.setItem("ICXUSD",t.data.ICX.USD),e.setState({nanopriceUSD:t.data.NANO.USD}),localStorage.setItem("NANOEUR",t.data.NANO.EUR),e.setState({nanopriceEUR:t.data.NANO.EUR}),localStorage.setItem("NANOUSD",t.data.NANO.USD)}).catch(function(e){console.log(e)})}},{key:"render",value:function(){return c.a.createElement("div",{className:"today--section container"},c.a.createElement("h2",null,"Current Price"),c.a.createElement("div",{className:"columns today--section__box"},c.a.createElement("div",{className:"column btc--section"},c.a.createElement("h5",null,this.state.btcpriceEUR," \u20ac"),c.a.createElement("h6",null,"$",this.state.btcpriceUSD),c.a.createElement("br",null),c.a.createElement("p",null,"1 BTC")),c.a.createElement("div",{className:"column icx--section"},c.a.createElement("h5",null,this.state.icxpriceEUR," \u20ac"),c.a.createElement("h6",null,"$",this.state.icxpriceUSD),c.a.createElement("br",null),c.a.createElement("p",null,"1 ICX")),c.a.createElement("div",{className:"column nano--section"},c.a.createElement("h5",null,this.state.nanopriceEUR," \u20ac"),c.a.createElement("h6",null,"$",this.state.nanopriceUSD),c.a.createElement("br",null),c.a.createElement("p",null,"1 NANO"))))}},{key:"componentDidMount",value:function(){var e=this;navigator.onLine||(this.setState({btcpriceUSD:localStorage.getItem("BTCUSD")}),this.setState({btcpriceEUR:localStorage.getItem("BTCEUR")}),this.setState({icxpriceEUR:localStorage.getItem("ICXEUR")}),this.setState({icxpriceUSD:localStorage.getItem("ICXUSD")}),this.setState({nanopriceEUR:localStorage.getItem("NANOEUR")}),this.setState({nanopriceUSD:localStorage.getItem("NANOUSD")})),console.log("component did mount"),this.interval=setInterval(function(){d.a.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ICX,NANO&tsyms=USD,EUR").then(function(t){e.sendPricePusher(t.data),console.log(t.data),e.setState({btcpriceEUR:t.data.BTC.EUR}),e.setState({icxpriceEUR:t.data.ICX.EUR}),e.setState({nanopriceEUR:t.data.NANO.EUR})}).catch(function(e){console.log(e)})},1e4),console.log("dfdsf"),this.prices.bind("prices",function(t){e.setState({btcpriceEUR:t.prices.BTC.EUR}),e.setState({icxpriceEUR:t.prices.ICX.EUR}),e.setState({nanopriceEUR:t.prices.NANO.EUR})},this)}},{key:"sendPricePusher",value:function(e){d.a.post("/prices/new",{prices:e}).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}}]),t}(n.Component),f=a(3),U=(a(49),a(9)),b=a.n(U),N=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={todayprice:{},oneyearprice:{}},e.getBTCPrices=e.getBTCPrices.bind(Object(f.a)(Object(f.a)(e))),e.getICXPrices=e.getICXPrices.bind(Object(f.a)(Object(f.a)(e))),e.getNANOPrices=e.getNANOPrices.bind(Object(f.a)(Object(f.a)(e))),e.getXRBPrices=e.getXRBPrices.bind(Object(f.a)(Object(f.a)(e))),e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"getBTCPrices",value:function(e){return d.a.get("https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=EUR&ts="+e)}},{key:"getICXPrices",value:function(e){return d.a.get("https://min-api.cryptocompare.com/data/pricehistorical?fsym=ICX&tsyms=EUR&ts="+e)}},{key:"getNANOPrices",value:function(e){return d.a.get("https://min-api.cryptocompare.com/data/pricehistorical?fsym=NANO&tsyms=EUR&ts="+e)}},{key:"getXRBPrices",value:function(e){return d.a.get("https://min-api.cryptocompare.com/data/pricehistorical?fsym=XRB&tsyms=EUR&ts="+e)}},{key:"getTodayPrice",value:function(){var e=this,t=b()().unix();d.a.all([this.getICXPrices(t),this.getBTCPrices(t),this.getNANOPrices(t)]).then(d.a.spread(function(a,n,c){var i={date:b.a.unix(t).format("MMMM Do YYYY"),icx:a.data.ICX.EUR,btc:n.data.BTC.EUR,nano:c.data.NANO.EUR};localStorage.setItem("todayprice",JSON.stringify(i)),e.setState({todayprice:i})}))}},{key:"getOneYearPrice",value:function(){var e=this,t=b()().subtract(365,"days").unix();d.a.all([this.getICXPrices(t),this.getBTCPrices(t),this.getNANOPrices(t),this.getXRBPrices(t)]).then(d.a.spread(function(a,n,c,i){var r={date:b.a.unix(t).format("MMMM Do YYYY"),icx:a.data.ICX.EUR,btc:n.data.BTC.EUR,nano:c.data.NANO.EUR,xrb:i.data.XRB.EUR};e.setState({oneyearprice:r}),localStorage.setItem("oneyearprice",JSON.stringify(r))}))}},{key:"componentWillMount",value:function(){this.getTodayPrice(),this.getOneYearPrice()}},{key:"componentDidMount",value:function(){navigator.onLine||(this.setState({todayprice:JSON.parse(localStorage.getItem("todayprice"))}),this.setState({oneyearprice:JSON.parse(localStorage.getItem("oneyearprice"))}))}},{key:"render",value:function(){var e;return e=0===this.state.oneyearprice.nano?this.state.oneyearprice.xrb:this.state.oneyearprice.nano,c.a.createElement("div",{className:"history--section container"},c.a.createElement("h2",null,"One year ago - ",this.state.oneyearprice.date),c.a.createElement("div",{className:"history--section__box"},c.a.createElement("div",{className:"history--section__box__inner"},c.a.createElement("div",{className:"columns"},c.a.createElement("div",{className:"column"},c.a.createElement("p",null,"1 BTC = ",this.state.oneyearprice.btc," \u20ac")),c.a.createElement("div",{className:"column"},c.a.createElement("p",null,"1 ICX = ",this.state.oneyearprice.icx," \u20ac")),c.a.createElement("div",{className:"column"},c.a.createElement("p",null,"1 NANO = ",e," \u20ac"))))))}}]),t}(n.Component),v=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"App-header"},c.a.createElement("header",{className:"container"},c.a.createElement("nav",{className:"navbar"}),c.a.createElement("div",{className:"navbar-brand"},c.a.createElement("span",{className:"navbar-item"},"HistoriCoins")),c.a.createElement("div",{className:"navbar-end"},c.a.createElement("a",{className:"navbar-item",href:"https://github.com/CyrilNb/Historicoins",target:"_blank",rel:"noopener noreferrer"},"Fork me on Github!")))),c.a.createElement("section",{className:"results--section"},c.a.createElement("div",{className:"container"},c.a.createElement("h1",null,"HistoriCoins is a realtime price information about ",c.a.createElement("br",null),"BTC, ICX and NANO.")),c.a.createElement("div",{className:"results--section__inner"},c.a.createElement(g,null),c.a.createElement(N,null))))}}]),t}(n.Component),S=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function y(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(c.a.createElement(v,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/Historicoins",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/Historicoins","/service-worker.js");S?(function(e,t){fetch(e).then(function(a){404===a.status||-1===a.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):y(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):y(t,e)})}}()}},[[19,2,1]]]);
//# sourceMappingURL=main.aa4e95f8.chunk.js.map