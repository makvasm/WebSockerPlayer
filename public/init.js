!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t),r.d(t,"PlayerInstance",(function(){return c}));var n=r(1);let o=document.getElementById("video_load_form"),a=o.load_button,i=o.url,s=document.getElementById("videolist"),l=document.getElementById("player"),c=new n.default(l,s);a.addEventListener("click",e=>{let t=i.value;i.value="",c.loadFromEvent(t)}),c.setVolume(.1),c.loadFromLocalStorage()},function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return o}));var n=r(2);class o{constructor(e,t){this.parsers=[{parser:this.isThread,action:this.loadThread},{parser:this.isVideo,action:this.setVideo}],this.playerElem=e,this.listElem=t,this.room=new n.default,this.listeners=[]}addEventListener(e,t){this.listeners.push({event:e,cb:t})}emit(e,...t){this.listeners.forEach((r,n)=>{r.event===e&&r.cb(...t)})}setVolume(e){this.playerElem.volume=e||1}loadFromEvent(e){try{e=new URL(e)}catch(e){throw e}let t=!1;this.parsers.forEach((r,n)=>{if(t)return null;let o=r.parser,a=r.action;o.call(this,e)&&(t=!0,a.call(this,e))})}isThread(e){return e.href.match(/2ch.hk\/[A-z]{1,}\/res\/[0-9]*.\.html/)}isVideo(e){return e.href.match(/.*(mp4|webm)/)}async fetchVideos(e){return fetch("/api/getvideos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e})}).catch(e=>console.log(e)).then(e=>e.json().then(e=>(localStorage.setItem("videos",JSON.stringify(e)),e)))}async renderList(e){this.listElem.textContent="",e.forEach(async e=>{let t=document.createElement("a"),r=document.createElement("img");t.className="preview",t.href=e.video,r.src=e.preview,r.loading="lazy",t.appendChild(r),this.listElem.appendChild(t),t.onclick=t=>{t.preventDefault(),t.target.className="viewed",this.setVideo.call(this,e.video)},await new Promise(async e=>{setTimeout(e,100)})})}loadFromLocalStorage(){let e;(e=localStorage.getItem("videos"))&&(e=JSON.parse(e),this.renderList.call(this,e))}async loadThread(e){let t=await this.fetchVideos.call(this,e);return await this.renderList.call(this,t)}setVideo(e){try{e=new URL(e),this.room.setRoomVideo(e),this.playerElem.src=e.href,this.emit("videochanged",e)}catch(e){throw new Error("Ошибка при смене адреса видео")}}setVideoNotManually(e){try{e=new URL(e),this.playerElem.src=e.href}catch(e){throw new Error("Ошибка при смене адреса видео")}}async init(){let e=await this.room.fetchRoomByName();this.setVideoNotManually(e.video)}play(e=!1){return e&&(o.stopPausePlayEvents=!0),this.playerElem.play()}pause(e=!1){return e&&(o.stopPausePlayEvents=!0),this.playerElem.pause()}currentTime(){return this.playerElem.currentTime}setTime(e){return this.playerElem.currentTime=e}src(){return this.playerElem.src}}},function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return n}));class n{constructor(e="main"){this.name=this.extractNameFromLocation()||"main"}extractNameFromLocation(){let e=window.location.href.match(/room\/([0-9]*)/);return e?e[1]:null}async fetchRoomByName(){let e=this.name,t=await fetch("/api/getRoomByName",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})});return await t.json()}async setRoomVideo(e){let t=this.name,r=await fetch("/api/setRoomVideo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,url:e})});return await r.json()}}}]);