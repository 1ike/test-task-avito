(this["webpackJsonp@test-task-avito/react"]=this["webpackJsonp@test-task-avito/react"]||[]).push([[0],{111:function(e,t){},117:function(e,t){},128:function(e,t,n){e.exports={rotating:"RefreshButton_rotating__28Fr1"}},139:function(e,t,n){},181:function(e,t){},186:function(e,t,n){"use strict";n.r(t);var c,r=n(0),a=n.n(r),i=n(19),o=n.n(i),s=n(14),l=n(30),u=n(11),d=n(8),j=n(3),b=n(31),m=n.n(b),f=n(2),O=n(52),h=n(124),x=n(20),v="https://hacker-news.firebaseio.com/v0/",p=function(e){return 1e3*e},g=function(e){return new Date(e).toLocaleString("en",{year:"numeric",month:"long",day:"numeric"})},N=Object(h.a)({reducerPath:"storyApi",baseQuery:Object(x.d)({baseUrl:v}),endpoints:function(e){return{getNewStories:e.query({queryFn:function(e,t,n,c){return Object(O.a)(m.a.mark((function e(){var t,n,r,a,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c("newstories.json");case 2:if(!(t=e.sent).error){e.next=5;break}return e.abrupt("return",{error:t.error});case 5:return n=t.data,r=n.slice(0,100).map((function(e){return c("item/".concat(e,".json"))})),e.next=9,Promise.all(r);case 9:return a=e.sent,i=a.find((function(e){return e.error})),e.abrupt("return",i?{error:i}:{data:a.map((function(e){var t=e.data;return Object(f.a)(Object(f.a)({},t),{},{time:p((null===t||void 0===t?void 0:t.time)||0)})}))});case 12:case"end":return e.stop()}}),e)})))()}})}}}),y=N.useGetNewStoriesQuery,k=n(23),w=n(22),_=function(e){var t=e.map((function(e){return fetch("".concat(v,"item/").concat(e,".json"),{method:"GET"}).then((function(e){return e.json()})).then((function(e){return Object(f.a)(Object(f.a)({},e),{},{time:p(e.time)})}))}));return Promise.all(t)};!function(e){e.Idle="idle",e.Pending="pending",e.Fulfilled="fulfilled",e.Rejected="rejected"}(c||(c={}));var C,S=Object(j.c)("comments/fetchAll",function(){var e=Object(O.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(){var e=Object(O.a)(m.a.mark((function e(t,c){var r,a,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==c.length){e.next=2;break}return e.abrupt("return",t);case 2:return e.next=4,_(c);case 4:return r=e.sent,a=r.filter((function(e){return!e.deleted})),i=a.reduce((function(e,t){var n=t.kids,c=void 0===n?[]:n;return c.length>0?[].concat(Object(k.a)(e),Object(k.a)(c)):e}),[]),e.abrupt("return",n([].concat(Object(k.a)(t),Object(k.a)(a)),i));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),e.abrupt("return",n([],t));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),F=Object(j.d)(),T=F.getInitialState({loading:c.Idle}),I=Object(j.e)({name:"comments",initialState:T,reducers:{},extraReducers:function(e){e.addCase(S.pending,(function(e){e.loading===c.Idle&&(e.loading=c.Pending)})),e.addCase(S.fulfilled,(function(e,t){e.loading===c.Pending&&(F.upsertMany(e,t.payload),e.loading=c.Idle)}))}}).reducer,P=F.getSelectors((function(e){return e.comments})),B=(P.selectById,P.selectIds,P.selectEntities),R=P.selectAll,M=(P.selectTotal,Object(w.a)(B,(function(e,t){return t}),(function(e,t){var n=t.reduce((function(t,n){return e[n]?Object(f.a)(Object(f.a)({},t),{},Object(d.a)({},n,e[n])):t}),{});return{ids:t,entities:n}})),Object(w.a)(B,(function(e,t){return t}),(function(e,t){var n=function(t){var n;return e[t]&&!(null===(n=e[t])||void 0===n?void 0:n.deleted)},c=t.filter(n),r=function t(c,r){if(0===r.length)return c;var a=r.reduce((function(t,c){var r,a,i=(null===(r=e[c])||void 0===r||null===(a=r.kids)||void 0===a?void 0:a.filter(n))||[];return i.length>0?[].concat(Object(k.a)(t),Object(k.a)(i)):t}),[]);return a.length+t(c,a)}(c.length,c);return r}))),E=function(e){return e.comments.loading===c.Pending},A=Object(j.a)({reducer:(C={},Object(d.a)(C,N.reducerPath,N.reducer),Object(d.a)(C,"comments",I),C),middleware:function(e){return e().concat(N.middleware)}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(139);var H=n(9),L=n(191),Q=n(193),q=n(196),J=n(197),z=n(4),D=n.n(z),G=n(90),W=n.n(G),U=s.e,X=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];Object(r.useEffect)((function(){document.title="function"===typeof e?e():e}),t)},$=n(195),K=n(1),V=function(e){var t=e.children,n=e.navbarComponent;return Object(K.jsxs)(K.Fragment,{children:[Object(K.jsx)($.a,{bg:"light",expand:"lg",children:Object(K.jsxs)(L.a,{children:[Object(K.jsx)($.a.Brand,{children:Object(K.jsx)(l.b,{to:"/",className:"fs-2 ms-3 text-muted text-decoration-none",children:"Avito test task"})}),n&&Object(K.jsx)(n,{})]})}),t]})},Y=function(){return Object(K.jsx)("span",{className:"ms-2 me-2",children:"|"})},Z=n(192),ee=n(194),te=n(67),ne=n(128),ce=n.n(ne),re={width:25,height:25},ae=function(e){var t=e.tooltipText,n=void 0===t?"Refresh":t,c=e.tooltipPlacement,r=void 0===c?"top":c,a=e.onClick,i=e.disabled;return Object(K.jsx)(ee.a,{placement:r,overlay:function(e){return Object(K.jsx)(Z.a,Object(f.a)(Object(f.a)({id:"button-tooltip"},e),{},{children:n}))},children:Object(K.jsx)(J.a,{className:"ms-5",onClick:a,disabled:i,children:Object(K.jsx)(te.a,{style:re,className:D()(Object(d.a)({},ce.a.rotating,i))})})})},ie=function(e){var t=e.onClick,n=e.isFetching;return Object(K.jsx)("div",{className:"me-3",children:Object(K.jsx)(ae,{tooltipText:"Refresh News",tooltipPlacement:"left",onClick:t,disabled:n})})};var oe=function(){X("Hottest stories");var e=Object(r.useState)(10),t=Object(H.a)(e,2),n=t[0],c=t[1],i=y(void 0,{pollingInterval:6e4}),o=i.data,s=void 0===o?[]:o,u=i.refetch,j=i.isFetching,b=i.isLoading,m=a.a.useMemo((function(){return s.slice(0,n)}),[n,s]),f=Object(r.useCallback)((function(){return c((function(e){return e+10}))}),[]);return Object(K.jsx)(V,{navbarComponent:function(){return Object(K.jsx)(ie,{onClick:u,isFetching:j})},children:Object(K.jsx)(L.a,{className:D()(W.a.content,Object(d.a)({},W.a["content--loading"],b)),children:b?Object(K.jsx)(Q.a,{animation:"border",variant:"primary"}):Object(K.jsxs)(K.Fragment,{children:[m.map((function(e){return Object(K.jsx)(l.b,{to:"/".concat(e.id),className:"text-start text-decoration-none d-block mb-2",children:Object(K.jsx)(q.a,{bg:"light",children:Object(K.jsxs)(q.a.Body,{children:[Object(K.jsx)(q.a.Title,{children:e.title}),Object(K.jsxs)(q.a.Subtitle,{children:["".concat(e.score," points"),Object(K.jsx)(Y,{}),e.by,Object(K.jsx)(Y,{}),g(e.time),e.kids&&Object(K.jsxs)(K.Fragment,{children:[Object(K.jsx)(Y,{}),Object(K.jsx)("span",{children:"Comments"})]})]})]})})},e.id)})),n<100&&Object(K.jsx)(J.a,{variant:"outline-primary",onClick:f,className:"mt-3",children:"Show more"})]})})})},se=n(93),le=n(66),ue=n.n(le),de=n(65),je=n.n(de),be=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return n?n.map((function(n){var c=e.find((function(e){return e.id===n}));return c&&Object(K.jsx)(me,{comment:c,expand:t,comments:e})})):null};function me(e){var t=e.comments,n=e.comment,c=e.onClick,r=e.rootCommentsState,a=e.expand,i=r&&t.some((function(e){return e.parent===n.id})),o=a||i&&(null===r||void 0===r?void 0:r[n.id]);return Object(K.jsx)(q.a,{bg:"light",className:D()("mb-3",{"ms-4 mt-3":!r}),children:Object(K.jsxs)(q.a.Body,{children:[Object(K.jsxs)(q.a.Subtitle,{className:"text-muted ".concat(je.a.comment__header),children:[n.by,Object(K.jsx)(Y,{}),g(n.time),i&&Object(K.jsxs)(K.Fragment,{children:[Object(K.jsx)(Y,{}),Object(K.jsxs)(J.a,{variant:"link",className:"text-decoration-none",size:"sm",onClick:c,children:["[",o?"hide answers":"show answers","]"]})]})]}),Object(K.jsx)(q.a.Text,{className:"mt-2",dangerouslySetInnerHTML:{__html:ue()(n.text)}}),o&&be(t,o,null===n||void 0===n?void 0:n.kids)]})})}var fe=n(94),Oe=n.n(fe),he=function(){return Object(K.jsx)(l.b,{to:"/",className:"fs-2 ms-3 justify-content-end",children:Object(K.jsxs)(J.a,{className:Oe.a.button,variant:"light",children:[Object(K.jsx)(te.b,{className:Oe.a.icon}),"Back to the News List"]})})},xe=function(e){var t=e.children;return Object(K.jsx)(V,{navbarComponent:he,children:Object(K.jsx)("div",{className:"container pt-2",children:t})})};var ve=function(){var e=Object(u.f)().id,t=Number(e);X((function(){return"title ".concat(t)}),[t]);var n=y(void 0,{selectFromResult:function(e){var n=e.data;return{story:null===n||void 0===n?void 0:n.find((function(e){return e.id===t}))}}}).story,c=Object(r.useState)(n),i=Object(H.a)(c,2),o=i[0],l=i[1],j=Object(r.useMemo)((function(){return(null===o||void 0===o?void 0:o.kids)||[]}),[o]),b=j.reduce((function(e,t){return Object(f.a)(Object(f.a)({},e),{},Object(d.a)({},t,!1))}),{}),m=Object(r.useState)(b),O=Object(H.a)(m,2),h=O[0],x=O[1],v=Object(r.useCallback)(Object(se.memoize)((function(e){return function(){return x((function(t){return Object(f.a)(Object(f.a)({},t),{},Object(d.a)({},e,!t[e]))}))}})),[]),p=Object(s.d)(),N=Object(r.useCallback)((function(){return p(S(j))}),[p,j]);a.a.useEffect((function(){if(o){var e;return function t(){N(),e=setTimeout((function(){t()}),6e4)}(),function(){return clearTimeout(e)}}_([t]).then((function(e){var t=Object(H.a)(e,1)[0];return l(t)}))}),[N,o,t]);var k=U(R),w=a.a.useMemo((function(){return k.filter((function(e){return e.parent===Number(t)}))}),[t,k]),C=U((function(e){return M(e,j)})),F=U(E);return o?Object(K.jsxs)(xe,{children:[Object(K.jsx)("h1",{className:"mt-4 mb-4",children:o.title}),Object(K.jsxs)("dl",{className:"row",children:[Object(K.jsx)("dt",{className:"col-sm-1",children:"Author"}),Object(K.jsx)("dd",{className:"col-sm-11",children:o.by}),Object(K.jsx)("dt",{className:"col-sm-1",children:"Date"}),Object(K.jsx)("dd",{className:"col-sm-11",children:g(o.time)}),o.url&&Object(K.jsxs)(K.Fragment,{children:[Object(K.jsx)("dt",{className:"col-sm-1",children:"link"}),Object(K.jsx)("dd",{className:"col-sm-11",children:o.url})]}),o.text&&Object(K.jsxs)(K.Fragment,{children:[Object(K.jsx)("dt",{className:"col-sm-1",children:"Text"}),Object(K.jsx)("dd",{className:"col-sm-11",dangerouslySetInnerHTML:{__html:ue()(o.text)}})]})]}),Object(se.isEmpty)(w)?null:Object(K.jsxs)(K.Fragment,{children:[Object(K.jsxs)("div",{className:"d-flex align-items-center mt-5 mb-4",children:[Object(K.jsxs)("h2",{children:["Comments (",C,")"]}),Object(K.jsx)(ae,{onClick:N,disabled:F,tooltipText:"Refresh comments"})]}),w.map((function(e){return Object(K.jsx)(me,{comment:e,onClick:v(e.id),rootCommentsState:h,comments:k},e.id)}))]})]}):Object(K.jsx)(xe,{children:Object(K.jsx)("div",{className:je.a["story--loading"],children:Object(K.jsx)(Q.a,{animation:"border",variant:"primary"})})})};o.a.render(Object(K.jsx)(a.a.StrictMode,{children:Object(K.jsx)(s.a,{store:A,children:Object(K.jsx)(l.a,{children:Object(K.jsxs)(u.c,{children:[Object(K.jsx)(u.a,{exact:!0,component:oe,path:"/"}),Object(K.jsx)(u.a,{component:ve,path:"/:id"})]})})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},65:function(e,t,n){e.exports={"comments--loading":"Story_comments--loading__1vnw4","story--loading":"Story_story--loading__v6jwJ"}},81:function(e,t){},82:function(e,t){},90:function(e,t,n){e.exports={content:"Home_content__2Q55q","content--loading":"Home_content--loading__1nnvB"}},94:function(e,t,n){e.exports={button:"NavbarComponent_button__1NXhp",icon:"NavbarComponent_icon__2QjTR"}}},[[186,1,2]]]);
//# sourceMappingURL=main.51c1d5ef.chunk.js.map