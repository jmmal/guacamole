"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[850],{6850:function(e,t,n){n.r(t);var i=n(7791),a=n(5809),r=n(7135),o=n.n(r),s=n(6167),c=n(3400),u=n(1e3),l=n(6772),d=n(7158),p=n(8096),m=n(5083),f=n(1780),h=n(2517),x=n(3965),y=n(9919),b="https://t9mdzi08qi.execute-api.ap-southeast-2.amazonaws.com/Staging",g=(0,x.QM)({container:{display:"flex",justifyContent:"center",width:"100%"},content:{width:"calc(100% - 2rem)",maxWidth:"30rem"},actions:{display:"flex",flexWrap:"wrap",justifyContent:"space-between"},fileInput:{marginTop:"1rem",marginBottom:"1rem"},actionBtn:{minWidth:"calc(50% - 0.5rem)",marginBottom:"1rem"}});t.default=function(){var e=(0,c.s0)(),t=g(),n=(0,s.useState)(!1),r=(0,a.Z)(n,2),x=r[0],I=r[1],j=(0,s.useState)(),N=(0,a.Z)(j,2),v=N[0],w=N[1];function T(){return(T=(0,i.Z)(o().mark((function t(){var n,i,a;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!v){t.next=14;break}return I(!0),(n=new URLSearchParams).append("filename",v.name),t.next=6,fetch(b+"/upload?"+n.toString());case 6:return i=t.sent,t.next=9,i.json();case 9:return a=t.sent,t.next=12,fetch(a.uploadURL,{method:"PUT",headers:{"Content-Type":"binary/octet-stream"},body:v});case 12:I(!1),e("/activities");case 14:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return(0,y.jsx)("form",{className:t.container,children:(0,y.jsxs)("div",{className:t.content,children:[(0,y.jsx)(d.Z,{id:"inputGroupFileAddon01",sx:{marginTop:16},children:"Upload"}),(0,y.jsx)(p.Z,{children:"Accepted file types: '.gpx'"}),(0,y.jsx)("div",{className:t.fileInput,children:(0,y.jsx)("input",{type:"file",id:"myFile",name:"filename",onChange:function(e){var t,n=null===(t=e.target.files)||void 0===t?void 0:t.item(0);n&&w(n)}})}),(0,y.jsxs)(m.Z,{display:"flex",children:[(0,y.jsx)(u.rU,{to:"/activities",children:(0,y.jsx)(f.Z,{type:"button",children:"Go Back"})}),(0,y.jsx)(h.Z,{type:"submit",onClick:function(){return T.apply(this,arguments)},disabled:!v,children:"Submit"})]}),x&&(0,y.jsx)(l.g,{})]})})}},6772:function(e,t,n){n.d(t,{g:function(){return s},p:function(){return f}});var i=n(3965),a=n(5890),r=n(9919),o=(0,i.QM)({container:{width:"100%",display:"flex",justifyContent:"center",margin:"2rem 0"}}),s=function(){var e=o();return(0,r.jsx)("div",{className:e.container,children:(0,r.jsx)(a.Z,{size:"large"})})},c=n(6167),u=n(8425),l=n(2441),d=n.n(l),p=n(599),m=(0,i.QM)({map:{height:"25rem"}}),f=function(e){var t=e.polyline,n=(0,c.useRef)(null),i=m(),a=(0,u.Fg)(),o=(0,c.useCallback)((function(){var e=p.toGeoJSON(t),i=function(e){var t=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];return e.reduce((function(e,t){return[Math.min(t[0],e[0]),Math.min(t[1],e[1]),Math.max(t[0],e[2]),Math.max(t[1],e[3])]}),t)}(e.coordinates),r="night"===a.colorMode?"mapbox://styles/mapbox/dark-v10":"mapbox://styles/mapbox/outdoors-v11",o=new(d().Map)({container:n.current||"",style:r,bounds:new(d().LngLatBounds)(i),fitBoundsOptions:{padding:{top:40,bottom:40,left:40,right:40}},accessToken:"pk.eyJ1Ijoiam1tYWwiLCJhIjoiY2tobXJhbHpqMHZmYTJwbnVwY21oaXl6byJ9.CZy7LN4IJff9dD5-orrPHw"});o.addControl(new(d().NavigationControl)),o.scrollZoom.disable(),o.on("load",(function(){o.addSource("route",{type:"geojson",data:{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:e.coordinates}}}),o.addLayer({id:"route",type:"line",source:"route",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#008DD5","line-width":4}})}))}),[a.colorMode,t]);return(0,c.useEffect)((function(){o()}),[o]),(0,r.jsx)("div",{ref:n,className:i.map})}}}]);
//# sourceMappingURL=850.93e2bae8.chunk.js.map