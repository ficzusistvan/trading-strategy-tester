(this["webpackJsonptrading-strategy-tester"]=this["webpackJsonptrading-strategy-tester"]||[]).push([[5],{294:function(e,n,t){"use strict";t.r(n),t.d(n,"searchSymbol",(function(){return m})),t.d(n,"getCandles",(function(){return g}));var r=t(34),a=t.n(r),s=t(65),o=t(314),i=t(77),c=t.n(i),u=t(59),d=t.n(u),p=c()("xapi"),f="wss://ws.xtb.com/demo",m=function(){var e=Object(s.a)(a.a.mark((function e(n){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new WebSocket(f),e.abrupt("return",new Promise((function(e,r){t.addEventListener("open",(function(){var e={command:"login",arguments:{userId:Number("11020371"),password:"FieA06LZOKor"}};t.send(JSON.stringify(e))})),t.addEventListener("message",function(){var r=Object(s.a)(a.a.mark((function r(s){var i,c;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:void 0!==(i=JSON.parse(s.data)).streamSessionId?(c={command:"getAllSymbols"},t.send(JSON.stringify(c))):(t.close(),e(o.a(i.returnData.map((function(e){var n={symbol:"",name:"",type:"",currency:""};return n.symbol=e.symbol,n.name=e.description,n.type=e.categoryName,n.currency=e.currency,n})),n)));case 2:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()),t.addEventListener("close",(function(){})),t.addEventListener("ping",(function(){p("Webocket ping received! ["+f+"]")})),t.addEventListener("error",(function(e){}))})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),v=function(e,n){return e.map((function(e){var t={date:0,open:0,high:0,low:0,close:0,volume:0};return t.date=d()(e.ctm).toDate(),t.open=e.open/n,t.high=t.open+e.high/n,t.low=t.open+e.low/n,t.close=t.open+e.close/n,t.volume=e.vol,t}))},l=new Map;l.set(1,1),l.set(5,1),l.set(15,1),l.set(30,7),l.set(60,7),l.set(240,13),l.set(1440,13),l.set(10080,60),l.set(43200,60);var g=function(){var e=Object(s.a)(a.a.mark((function e(n,t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new WebSocket(f),e.abrupt("return",new Promise((function(e,o){r.addEventListener("open",(function(){var e={command:"login",arguments:{userId:Number("11020371"),password:"FieA06LZOKor"}};r.send(JSON.stringify(e))})),r.addEventListener("message",function(){var o=Object(s.a)(a.a.mark((function s(o){var i,c,u;return a.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:void 0!==(i=JSON.parse(o.data)).streamSessionId?(c={command:"getChartLastRequest",arguments:{info:{period:Number(t),start:d()().subtract(l.get(Number(t)),"month").valueOf(),symbol:n}}},u=JSON.stringify(c),p("Strin",u),r.send(u)):(r.close(),e(v(i.returnData.rateInfos,Math.pow(10,i.returnData.digits))));case 2:case"end":return a.stop()}}),s)})));return function(e){return o.apply(this,arguments)}}()),r.addEventListener("close",(function(){})),r.addEventListener("ping",(function(){p("Webocket ping received! ["+f+"]")})),r.addEventListener("error",(function(e){}))})));case 2:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}()},314:function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));var r=function(e,n){return e.filter((function(e){return e.symbol.includes(n)||e.name.includes(n)}))}}}]);
//# sourceMappingURL=5.18b07227.chunk.js.map