(this["webpackJsonptrading-strategy-tester"]=this["webpackJsonptrading-strategy-tester"]||[]).push([[7],{293:function(e,t,n){"use strict";n.r(t),n.d(t,"searchSymbol",(function(){return b})),n.d(t,"getCandles",(function(){return w}));var a=n(340),r=n(34),c=n.n(r),s=n(71),u=n(322),o=n.n(u),i=n(77),p=n.n(i),l=n(64),y=n.n(l),h=p()("avapi"),f="HHDB0QLZL4LHI4XR",b=function(){var e=Object(s.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+t+"&apikey="+f);case 2:return n=e.sent,h("searchSymbol",n.data),e.abrupt("return",n.data.bestMatches.map((function(e){var t={symbol:"",name:"",type:"",currency:""};return t.symbol=e["1. symbol"],t.name=e["2. name"],t.type=e["3. type"],t.currency=e["8. currency"],t})));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(e){for(var t=[],n=0,r=Object.entries(e);n<r.length;n++){var c=r[n],s=Object(a.a)(c,2),u=s[0],o=s[1],i={date:0,open:0,high:0,low:0,close:0,volume:0};i.date=y()(u).toDate(),i.open=o["1. open"],i.high=o["2. high"],i.low=o["3. low"],i.close=o["4. close"],i.volume=o["5. volume"],t.unshift(i)}return t},w=function(){var e=Object(s.a)(c.a.mark((function e(t,n){var r,s,u,i,p,l,y,b;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h("getTimeSeriesIntraday",r=n<61?"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+t+"&interval="+n+"min&apikey="+f:"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+t+"&apikey="+f),e.next=4,o.a.get(r);case 4:s=e.sent,h("getTimeSeriesIntraday",s.data),u=0,i=Object.entries(s.data);case 7:if(!(u<i.length)){e.next=17;break}if(p=i[u],l=Object(a.a)(p,2),y=l[0],b=l[1],!y.includes("Time Series")){e.next=14;break}return e.abrupt("return",m(b));case 14:u++,e.next=7;break;case 17:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}}]);
//# sourceMappingURL=7.ea4f3a66.chunk.js.map