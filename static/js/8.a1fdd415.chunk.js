(this["webpackJsonptrading-strategy-tester"]=this["webpackJsonptrading-strategy-tester"]||[]).push([[8],{297:function(t,e,r){"use strict";function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var r=[],n=!0,a=!1,o=void 0;try{for(var i,u=t[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(c){a=!0,o=c}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}return r}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}r.r(e);var a=r(34),o=r.n(a),i=r(65),u=r(316),c=r.n(u),s=r(77),l=r.n(s),p=r(59),y=r.n(p);r.d(e,"searchSymbol",(function(){return b})),r.d(e,"getCandles",(function(){return v}));var f=l()("avapi"),h="HHDB0QLZL4LHI4XR",b=function(){var t=Object(i.a)(o.a.mark((function t(e){var r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+e+"&apikey="+h);case 2:return r=t.sent,f("searchSymbol",r.data),t.abrupt("return",r.data.bestMatches.map((function(t){var e={symbol:"",name:"",type:"",currency:""};return e.symbol=t["1. symbol"],e.name=t["2. name"],e.type=t["3. type"],e.currency=t["8. currency"],e})));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m=function(t){for(var e=[],r=0,a=Object.entries(t);r<a.length;r++){var o=n(a[r],2),i=o[0],u=o[1],c={date:0,open:0,high:0,low:0,close:0,volume:0};c.date=y()(i).toDate(),c.open=u["1. open"],c.high=u["2. high"],c.low=u["3. low"],c.close=u["4. close"],c.volume=u["5. volume"],e.unshift(c)}return e},v=function(){var t=Object(i.a)(o.a.mark((function t(e,r){var a,i,u,s,l,p,y,b;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return f("getTimeSeriesIntraday",a=r<61?"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+e+"&interval="+r+"min&apikey="+h:"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+e+"&apikey="+h),t.next=4,c.a.get(a);case 4:i=t.sent,f("getTimeSeriesIntraday",i.data),u=0,s=Object.entries(i.data);case 7:if(!(u<s.length)){t.next=17;break}if(l=s[u],p=n(l,2),y=p[0],b=p[1],!y.includes("Time Series")){t.next=14;break}return t.abrupt("return",m(b));case 14:u++,t.next=7;break;case 17:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}()}}]);
//# sourceMappingURL=8.a1fdd415.chunk.js.map