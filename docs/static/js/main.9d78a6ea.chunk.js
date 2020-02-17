(this.webpackJsonpyehtzee=this.webpackJsonpyehtzee||[]).push([[0],{20:function(n,e,r){n.exports=r(32)},25:function(n,e,r){},26:function(n,e,r){},32:function(n,e,r){"use strict";r.r(e);var t=r(0),o=r.n(t),i=r(13),c=r.n(i),u=(r(25),r(2)),a=r(18),l=r(6),s=r(4);r(26);function d(n,e){return void 0!==e?{type:n,payload:e}:{type:n}}var f=r(3),m=r(14),v=r(5);function p(){var n=Object(u.a)(["\n    margin: 1rem;\n    border: none;\n    overflow: hidden;\n    padding: 0;\n    height: 4rem;\n    font-size: 4rem;\n    background-color: transparent;\n    color: ",";\n    filter: ",";\n    transform: ",";\n    &:focus {\n        outline: none;\n    }\n    animation: "," .5s infinite;\n\n"]);return p=function(){return n},n}function b(){var n=Object(u.a)(["\n  0% {\n    transform: rotate(0deg)\n  }\n  100% {\n    transform: rotate(360deg)\n  }\n"]);return b=function(){return n},n}var h=function(n){var e=n.dieInfo,r=n.clickHandler,t=e.id,i=e.value,c=e.isFrozen,u=e.isSpinning,a={1:v.c,2:v.f,3:v.e,4:v.b,5:v.a,6:v.d};return o.a.createElement(O,{isSpinning:u,isFrozen:c,onClick:function(){return r(t)}},o.a.createElement(m.a,{icon:a[i]}))},g=Object(f.b)(b()),O=f.a.button(p(),(function(n){return n.isFrozen?"#5D0A8Bde":"#5D0A8B"}),(function(n){return n.isFrozen?"none":"drop-shadow(.3rem .3rem .3rem black)"}),(function(n){return n.isFrozen?"translate(2px, 2px)":"none"}),(function(n){return n.isSpinning&&!n.isFrozen&&g}));function w(){var n=Object(u.a)(["\n  background-color: silver;\n  display: flex;\n  padding: 4rem;\n  width: 60%;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin: 0.5rem auto;\n  margin: 0.8rem auto;\n  border: 1px solid black;\n  box-shadow: #444 0.3rem 0.3rem 1rem;\n"]);return w=function(){return n},n}var j=function(n){return o.a.createElement(k,null,n.dice.map((function(e){return o.a.createElement(h,{dieInfo:e,clickHandler:n.clickHandler})})))},k=f.a.div(w());function F(){var n=Object(u.a)(['\n  ::before {\n    content: "";\n    display: inline-block;\n    width: 200%;\n    height: 100%;\n    margin: 0 auto;\n    transform: translate(-25%);\n    border-bottom: 1px solid #000;\n  }\n']);return F=function(){return n},n}function x(){var n=Object(u.a)(["\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  margin-bottom: 0.2rem;\n  border-bottom: 1px black dotted;\n  button {\n    padding: 0.2rem 0.3rem;\n    margin: 0.3rem;\n  }\n  p {\n    margin: 0.2rem;\n  }\n"]);return x=function(){return n},n}function E(){var n=Object(u.a)(["\n  background-color: silver;\n  display: flex;\n  padding: 1rem 4rem;\n  width: 60%;\n  overflow: hidden;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin: 0.8rem auto;\n  border: 1px solid black;\n  box-shadow: #444 0.3rem 0.3rem 1rem;\n  button {\n    padding: 0.5rem 1rem;\n    margin: 0.3rem;\n    background-color: white;\n    border: 1px solid black;\n    border-radius: 5px;\n    text-transform: uppercase;\n    cursor: pointer;\n    :focus {\n      outline: none;\n    }\n  }\n  p {\n    margin-left: 2rem;\n  }\n"]);return E=function(){return n},n}var y=function(){return d("rollAll")},z=function(n){return d("freezeToggle",n)},S=function(n){return d("spinnToogle",n)},T=function(){return d("unfreezeAll")},L=function(n){return d("calcPoints",n)},H=function(){return d("resetRolls")},A=function(){return d("calcTotal")},C=function(){return{id:"die-".concat(Math.random()),value:I(),isFrozen:!1,isSpinning:!1}},I=function(){return Math.floor(6*Math.random())+1},K={dice:[C(),C(),C(),C(),C()],rollsLeft:3,totalScores:0,scores:{Ones:void 0,Twos:void 0,Threes:void 0,Fours:void 0,Fives:void 0,Sixes:void 0,ThreeOfKind:void 0,FourOfKind:void 0,Chance:void 0,FullHouse:void 0,Yahtzee:void 0,LowStraight:void 0,HighStraight:void 0}},R=function(n){return function(e){return Object(s.a)({},n,{},e)}},B=function(n,e){var r=R(n);switch(e.type){case"rollAll":var t=n.rollsLeft?n.rollsLeft-1:0;return r({dice:n.dice.map((function(n){return n.isFrozen?Object(s.a)({},n):Object(s.a)({},n,{value:I()})})),rollsLeft:t});case"freezeToggle":return r({dice:n.dice.map((function(n){return n.id===e.payload?Object(s.a)({},n,{isFrozen:!n.isFrozen}):n}))});case"spinnToogle":return r({dice:n.dice.map((function(n){return n.id===e.payload?Object(s.a)({},n,{isSpinning:!n.isSpinning}):n}))});case"unfreezeAll":return r({dice:n.dice.map((function(n){return Object(s.a)({},n,{isFrozen:!1})}))});case"calcPoints":var o=e.payload,i=o.rule,c=o.score;return r({scores:R(n.scores)(Object(l.a)({},i,c))});case"resetRolls":return r({rollsLeft:3});case"calcTotal":var u=0;for(var a in n.scores)void 0!==n.scores[a]&&(u+=n.scores[a]);return r({totalScores:u});default:return n}},D=f.a.div(E()),M=f.a.div(x()),Y=f.a.p(F());c.a.render(o.a.createElement((function(){var n=Object(t.useReducer)(B,K),e=Object(a.a)(n,2),r=e[0],i=e[1];Object(t.useEffect)((function(){l()}),[]);var c,u=function(n,e){var r=function(n){var e,r=function(n){var e={};return n.forEach((function(n){return void 0!==e[n.value]?e[n.value]++:e[n.value]=1})),Object.values(e)};switch(function(n){n[n.Ones=1]="Ones",n[n.Twos=2]="Twos",n[n.Threes=3]="Threes",n[n.Fours=4]="Fours",n[n.Fives=5]="Fives",n[n.Sixes=6]="Sixes"}(e||(e={})),n){case"Ones":case"Twos":case"Threes":case"Fours":case"Fives":case"Sixes":return function(r){return r.reduce((function(r,t){return t.value===e[n]?r+e[n]:r}),0)};case"ThreeOfKind":return function(n){var e=n.reduce((function(n,e){return n+e.value}),0),t=r(n);return e*(t.length<3?1:3===t.length&&t.includes(3)?1:0)};case"FourOfKind":return function(n){var e=n.reduce((function(n,e){return n+e.value}),0),t=r(n);return e*(t.includes(5)||t.includes(4)?1:0)};case"Chance":return function(n){return n.reduce((function(n,e){return n+e.value}),0)};case"FullHouse":return function(n){return r(n).includes(3)&&r(n).includes(2)?25:0};case"Yahtzee":return function(n){return r(n).includes(5)?50:0};case"LowStraight":return function(n){var e=n.map((function(n){return n.value}));return e.includes(3)&&e.includes(3)?e.includes(2)&&(e.includes(1)||e.includes(5))?30:e.includes(6)&&e.includes(5)?30:0:0};case"HighStraight":return function(n){return 5!==r(n).length||n.map((function(n){return n.value})).includes(6)&&n.map((function(n){return n.value})).includes(1)?0:40};default:return function(n){return 0}}}(e)(n);i(L({score:r,rule:e})),i(T()),i(y()),i(H()),i(A()),l()},l=Object(t.useCallback)((function(){r.dice.forEach((function(n){return i(S(n.id))})),setTimeout((function(){return r.dice.forEach((function(n){return i(S(n.id))}))}),500)}),[r.dice]);return o.a.createElement("div",{className:"App"},o.a.createElement(j,{dice:r.dice,clickHandler:function(n){return i(z(n))}}),o.a.createElement(D,null,o.a.createElement("button",{onClick:function(){r.rollsLeft&&(l(),i(y()))},disabled:0===r.rollsLeft},"You have ",r.rollsLeft," rols left"," "),o.a.createElement("button",{onClick:function(){return i(T())}},"unfreez all"),o.a.createElement("p",null,"Rounds left: ",function(){var n=0;for(var e in r.scores)void 0===r.scores[e]&&n++;return n}())),o.a.createElement(D,{style:{flexDirection:"column",alignItems:"center"}},(c=r.scores,Object.keys(c)).map((function(n){return o.a.createElement(M,{key:n},o.a.createElement("p",null,n),"undefined"===typeof r.scores[n]?o.a.createElement("button",{onClick:function(){return u(r.dice,n)}},"use"):o.a.createElement("p",null,r.scores[n]))})),o.a.createElement(Y,null,"Total Score: ",r.totalScores)))}),null),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.9d78a6ea.chunk.js.map