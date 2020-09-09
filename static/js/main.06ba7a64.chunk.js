(this.webpackJsonpguacamole=this.webpackJsonpguacamole||[]).push([[0],{194:function(e,t,a){e.exports=a(399)},199:function(e,t,a){},200:function(e,t,a){},399:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),l=a(59),i=a.n(l),r=(a(199),a(36)),o=a(8),m=(a(200),a(65),a(94)),s=a(22),u=a(154),d=a(155),p=a(401),E=function(e){var t=Math.floor(e/60),a=Math.floor(t/60),n=e-60*t;return a>=1?"".concat(a,"h ").concat(t%60,"m"):"".concat(t,"m ").concat(n,"s")},f=function(e){var t=Math.floor(e/60),a="".concat(Math.floor(e-60*t));return"".concat(t,":").concat(a.padStart(2,"0"))},v=function(){return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"spinner-grow text-warning",role:"status"}),c.a.createElement("div",{className:"spinner-grow text-success",role:"status"}),c.a.createElement("div",{className:"spinner-grow text-info",role:"status"}))},b=a(41),h=a(156),g=function(e){var t=e.bounds,a=e.polyline,l=Object(n.useRef)(null);Object(n.useEffect)((function(){i()}));var i=function(){var e=new b.Map({container:l.current||"",style:"mapbox://styles/mapbox/outdoors-v11",bounds:new b.LngLatBounds(new b.LngLat(t.minLng,t.minLat),new b.LngLat(t.maxLng,t.maxLat)),fitBoundsOptions:{padding:{top:40,bottom:40,left:40,right:40}},accessToken:"pk.eyJ1Ijoiam1tYWwiLCJhIjoiY2tlZTQ0bnJoMDd5aTMwczV2ZTR1ZnIwNiJ9.W9XpsEMyEYulktsXjBF0ow"});e.addControl(new b.NavigationControl);var n=h.toGeoJSON(a);e.on("load",(function(){e.addSource("route",{type:"geojson",data:{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:n.coordinates}}}),e.addLayer({id:"route",type:"line",source:"route",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#008DD5","line-width":4}})}))};return c.a.createElement("div",{ref:l,className:"map match-parent"})},y=function(e){var t=e.activity,a=Object(o.f)();function n(){a.push("/activities/".concat(t.id))}return c.a.createElement("div",{className:"activity__preview focusable",tabIndex:0,onClick:n,onKeyDown:function(e){"ENTER"===e.key&&n()}},c.a.createElement("div",{className:"header"},c.a.createElement("h3",{className:"date mb-0"},Object(p.a)(new Date(t.startTime),"EEEE, LLLL d, yyyy")),c.a.createElement("p",{className:"title mb-0"},t.title)),c.a.createElement("img",{src:"data:image/png;base64,"+t.image,alt:"Activity GPS preview",className:"map-image"}),c.a.createElement("div",{className:"stats-footer"},c.a.createElement(N,{title:"Distance",value:"".concat(Number(t.distance/1e3).toFixed(2)," km")}),c.a.createElement(N,{title:"Pace",value:"".concat(f(t.pace)," min / km")}),c.a.createElement(N,{title:"Elevation",value:"".concat(Number(t.maxElevation-t.minElevation).toFixed(1)," m")}),c.a.createElement(N,{title:"Elapsed Time",value:E(t.elapsedTime)})))},N=function(e){var t=e.title,a=e.value;return c.a.createElement("div",{className:"col"},c.a.createElement("p",{className:"title"},t),c.a.createElement("p",{className:"value mb-0"},a))},w=a(42),j=a.n(w),k="http://localhost:8080",O=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return j.a.get(k+"/activities",{params:{pageNumber:e,pageSize:t,type:a}})},x=function(e){return j.a.get(k+"/activities/"+e)},L=function(e){var t=new FormData;return t.append("file",e,e.name),j.a.post(k+"/upload",t)},D=function(e){var t=k+"/activities/"+e+"/points";return j.a.get(t)},S=function(){var e=Object(o.f)(),t=Object(n.useState)([]),a=Object(s.a)(t,2),l=a[0],i=a[1],r=Object(n.useState)(0),p=Object(s.a)(r,2),E=p[0],f=p[1],b=Object(n.useState)(1),h=Object(s.a)(b,2),g=h[0],N=h[1];function w(e,t){f(t),i(e)}function j(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1?arguments[1]:void 0;return O(e,3,t)}return Object(n.useEffect)((function(){j(g,null).then((function(e){w(e.data.results,e.data.totalCount)}))}),[]),c.a.createElement("div",{className:"activity__list-wrapper"},c.a.createElement("div",{className:"activity__list"},c.a.createElement("div",{className:"options"},c.a.createElement("button",{type:"button",className:"btn btn-outline-secondary upload-btn",onClick:function(){e.push("/activities/upload")}},"Upload ",c.a.createElement(u.a,null))),c.a.createElement(d.a,{dataLength:l.length,next:function(){j(g+1,null).then((function(e){w([].concat(Object(m.a)(l),Object(m.a)(e.data.results)),e.data.totalCount),N(g+1)}))},hasMore:l.length<E,loader:c.a.createElement(v,null)},l.map((function(e){return c.a.createElement(y,{key:e.id,activity:e})})))))},F=a(158),T=a(7),C=function(e){var t=e.points.map((function(e){return{distance:Number(e.distanceFromStart/1e3).toFixed(1),elevation:Number(e.elevation).toFixed(1)}}));return c.a.createElement(T.f,{height:250,width:"100%"},c.a.createElement(T.b,{data:t,margin:{top:10,right:30,left:0,bottom:0}},c.a.createElement(T.e,{strokeDasharray:"3 3"}),c.a.createElement(T.h,{dataKey:"distance",allowDecimals:!1,tickCount:4,unit:"km",minTickGap:20}),c.a.createElement(T.i,{allowDecimals:!1,unit:"m"}),c.a.createElement(T.g,null),c.a.createElement(T.a,{isAnimationActive:!1,type:"monotone",dataKey:"elevation",stroke:"#8884d8",fill:"#8884d8"})))},M=function(e){var t=e.points.map((function(e){return{distance:Number(e.distanceFromStart/1e3).toFixed(1),pace:Number(e.pace).toFixed(2)}}));return c.a.createElement(T.f,{height:250,width:"100%"},c.a.createElement(T.b,{data:t,margin:{top:10,right:30,left:0,bottom:0}},c.a.createElement(T.e,{strokeDasharray:"3 3"}),c.a.createElement(T.h,{dataKey:"distance",allowDecimals:!1,tickCount:4,unit:"km",minTickGap:20}),c.a.createElement(T.i,{allowDecimals:!1,unit:"m/s"}),c.a.createElement(T.g,null),c.a.createElement(T.a,{isAnimationActive:!1,type:"monotone",dataKey:"pace",stroke:"#5293fa",fill:"#5293fa"})))},I=function(e){var t=function(e){var t=[];if(!e.length||0===e.length)return t;var a=1,n=e[0].time;e.forEach((function(e,c){if(!(e.distanceFromStart<1e3*a)){var l=(new Date(e.time).getTime()-new Date(n).getTime())/1e3;t.push({name:a,value:Number(1e3/l).toFixed(4)}),a++,n=e.time}}));var c=e[e.length-1],l=(new Date(c.time).getTime()-new Date(n).getTime())/1e3,i=c.distanceFromStart-1e3*(a-1);if(i<100)return t;return t.push({name:a,value:Number(l/i).toFixed(2)}),t}(e.points);return c.a.createElement(T.f,{height:250,width:"100%"},c.a.createElement(T.d,{data:t},c.a.createElement(T.e,{strokeDasharray:"3 3"}),c.a.createElement(T.h,{dataKey:"name"}),c.a.createElement(T.i,null),c.a.createElement(T.g,null),c.a.createElement(T.c,{dataKey:"value",fill:"#6fd450"})))},A=function(){var e=Object(o.f)(),t=Object(o.g)().activityId,a=Object(n.useState)(),l=Object(s.a)(a,2),i=l[0],r=l[1],m=Object(n.useState)([]),u=Object(s.a)(m,2),d=u[0],E=u[1];return Object(n.useEffect)((function(){x(t).then((function(e){r(e.data)}))}),[t]),Object(n.useEffect)((function(){D(t).then((function(e){E(e.data.points)}))}),[t]),c.a.createElement("div",{className:"activity-component"},c.a.createElement("div",{className:"header-detail"},c.a.createElement("button",{type:"button",className:"btn btn-outline-dark btn-sm",onClick:function(){e.goBack()}},c.a.createElement(F.a,null)," Activities"),c.a.createElement("h4",{className:"activity-type mb-0"},(null===i||void 0===i?void 0:i.type)?i.type:"Loading")),i&&d?c.a.createElement("div",{className:"detail-activity"},c.a.createElement("p",{className:"lead"},"".concat(Object(p.a)(new Date(i.startTime),"HH:mm")," on ").concat(Object(p.a)(new Date(i.startTime),"EEEE, LLLL d, yyyy"))),c.a.createElement(g,{bounds:i.bounds,polyline:i.polyline}),c.a.createElement("h3",{className:"el-text mt-3"},"Elevation"),c.a.createElement(C,{points:d}),c.a.createElement("h3",{className:"el-text mt-3"},"Pace"),c.a.createElement(M,{points:d}),c.a.createElement("h3",{className:"el-text mt-3"},"Splits"),c.a.createElement(I,{points:d})):c.a.createElement(v,null))},B=function(){var e=Object(o.f)(),t=Object(n.useState)(),a=Object(s.a)(t,2),l=a[0],i=a[1];return c.a.createElement("div",{className:"upload-container"},c.a.createElement("div",{className:"upload"},c.a.createElement("h2",{id:"inputGroupFileAddon01"},"Upload"),c.a.createElement("p",null,"Accepted file types: '.gpx'"),c.a.createElement("div",{className:"form-file"},c.a.createElement("input",{type:"file",name:"file",id:"fileInput",className:"form-file-input",onChange:function(e){var t,a=null===(t=e.target.files)||void 0===t?void 0:t.item(0);a&&i(a)}}),c.a.createElement("label",{className:"form-file-label",htmlFor:"fileInput"},c.a.createElement("span",{className:"form-file-text"},l?l.name:"Select a GPX file to upload"),c.a.createElement("span",{className:"form-file-button"},"Browse"))),c.a.createElement("div",{className:"upload-actions"},c.a.createElement("button",{type:"button",className:"btn btn-outline-secondary back",onClick:function(){return e.push("/activities")}},"Go Back"),c.a.createElement("button",{type:"button",className:"btn btn-success",onClick:function(){l&&L(l).then((function(t){e.push("/activities")}))},disabled:!l},"Submit"))))};var G=function(){var e=Object(o.h)().path;return c.a.createElement(o.c,null,c.a.createElement(o.a,{exact:!0,path:e},c.a.createElement(S,null)),c.a.createElement(o.a,{path:"".concat(e,"/upload")},c.a.createElement(B,null)),c.a.createElement(o.a,{path:"".concat(e,"/:activityId")},c.a.createElement(A,null)))},J=function(){return c.a.createElement("div",{className:"content-wrapper"},c.a.createElement(r.a,{basename:"/"},c.a.createElement(o.c,null,c.a.createElement(o.a,{path:"/activities"},c.a.createElement(G,null)),c.a.createElement(o.a,{path:"/"},c.a.createElement(G,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(398);i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},65:function(e,t,a){}},[[194,1,2]]]);
//# sourceMappingURL=main.06ba7a64.chunk.js.map