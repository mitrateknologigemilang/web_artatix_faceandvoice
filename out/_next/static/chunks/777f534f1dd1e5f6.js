(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,66698,(e,r,a)=>{var i;e.e,i=e.r(71645),r.exports=function(e){var r={};function a(i){if(r[i])return r[i].exports;var n=r[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=r,a.d=function(e,r,i){a.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,r){if(1&r&&(e=a(e)),8&r||4&r&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)a.d(i,n,(function(r){return e[r]}).bind(null,n));return i},a.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(r,"a",r),r},a.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},a.p="",a(a.s="./src/react-webcam.tsx")}({"./src/react-webcam.tsx":function(e,r,a){"use strict";a.r(r);var i,n=a("react"),s=(i=function(e,r){return(i=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var a in r)r.hasOwnProperty(a)&&(e[a]=r[a])})(e,r)},function(e,r){function a(){this.constructor=e}i(e,r),e.prototype=null===r?Object.create(r):(a.prototype=r.prototype,new a)}),o=function(){return(o=Object.assign||function(e){for(var r,a=1,i=arguments.length;a<i;a++)for(var n in r=arguments[a])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},u=function(e,r){var a={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&0>r.indexOf(i)&&(a[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,i=Object.getOwnPropertySymbols(e);n<i.length;n++)0>r.indexOf(i[n])&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(a[i[n]]=e[i[n]]);return a};function l(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}"undefined"!=typeof window&&(void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(e){var r=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;return r?new Promise(function(a,i){r.call(navigator,e,a,i)}):Promise.reject(Error("getUserMedia is not implemented in this browser"))})),r.default=function(e){function r(r){var a=e.call(this,r)||this;return a.canvas=null,a.ctx=null,a.requestUserMediaId=0,a.unmounted=!1,a.state={hasUserMedia:!1},a}return s(r,e),r.prototype.componentDidMount=function(){var e=this.state,r=this.props;(this.unmounted=!1,l())?(e.hasUserMedia||this.requestUserMedia(),r.children&&"function"!=typeof r.children&&console.warn("children must be a function")):r.onUserMediaError("getUserMedia not supported")},r.prototype.componentDidUpdate=function(e){var r=this.props;if(!l())return void r.onUserMediaError("getUserMedia not supported");var a=JSON.stringify(e.audioConstraints)!==JSON.stringify(r.audioConstraints),i=JSON.stringify(e.videoConstraints)!==JSON.stringify(r.videoConstraints),n=e.minScreenshotWidth!==r.minScreenshotWidth,s=e.minScreenshotHeight!==r.minScreenshotHeight;(i||n||s)&&(this.canvas=null,this.ctx=null),(a||i)&&(this.stopAndCleanup(),this.requestUserMedia())},r.prototype.componentWillUnmount=function(){this.unmounted=!0,this.stopAndCleanup()},r.stopMediaStream=function(e){e&&(e.getVideoTracks&&e.getAudioTracks?(e.getVideoTracks().map(function(r){e.removeTrack(r),r.stop()}),e.getAudioTracks().map(function(r){e.removeTrack(r),r.stop()})):e.stop())},r.prototype.stopAndCleanup=function(){var e=this.state;e.hasUserMedia&&(r.stopMediaStream(this.stream),e.src&&window.URL.revokeObjectURL(e.src))},r.prototype.getScreenshot=function(e){var r=this.state,a=this.props;if(!r.hasUserMedia)return null;var i=this.getCanvas(e);return i&&i.toDataURL(a.screenshotFormat,a.screenshotQuality)},r.prototype.getCanvas=function(e){var r=this.state,a=this.props;if(!this.video||!r.hasUserMedia||!this.video.videoHeight)return null;if(!this.ctx){var i=this.video.videoWidth,n=this.video.videoHeight;if(!this.props.forceScreenshotSourceSize){var s=i/n;n=(i=a.minScreenshotWidth||this.video.clientWidth)/s,a.minScreenshotHeight&&n<a.minScreenshotHeight&&(i=(n=a.minScreenshotHeight)*s)}this.canvas=document.createElement("canvas"),this.canvas.width=(null==e?void 0:e.width)||i,this.canvas.height=(null==e?void 0:e.height)||n,this.ctx=this.canvas.getContext("2d")}var o=this.ctx,u=this.canvas;return o&&u&&(u.width=(null==e?void 0:e.width)||u.width,u.height=(null==e?void 0:e.height)||u.height,a.mirrored&&(o.translate(u.width,0),o.scale(-1,1)),o.imageSmoothingEnabled=a.imageSmoothing,o.drawImage(this.video,0,0,(null==e?void 0:e.width)||u.width,(null==e?void 0:e.height)||u.height),a.mirrored&&(o.scale(-1,1),o.translate(-u.width,0))),u},r.prototype.requestUserMedia=function(){var e=this,a=this.props,i=function(i,n){var s={video:void 0===n||n};a.audio&&(s.audio=void 0===i||i),e.requestUserMediaId++;var o=e.requestUserMediaId;navigator.mediaDevices.getUserMedia(s).then(function(a){e.unmounted||o!==e.requestUserMediaId?r.stopMediaStream(a):e.handleUserMedia(null,a)}).catch(function(r){e.handleUserMedia(r)})};if("mediaDevices"in navigator)i(a.audioConstraints,a.videoConstraints);else{var n=function(e){return{optional:[{sourceId:e}]}},s=function(e){var r=e.deviceId;return"string"==typeof r?r:Array.isArray(r)&&r.length>0?r[0]:"object"==typeof r&&r.ideal?r.ideal:null};MediaStreamTrack.getSources(function(e){var r=null,o=null;e.forEach(function(e){"audio"===e.kind?r=e.id:"video"===e.kind&&(o=e.id)});var u=s(a.audioConstraints);u&&(r=u);var l=s(a.videoConstraints);l&&(o=l),i(n(r),n(o))})}},r.prototype.handleUserMedia=function(e,r){var a=this.props;if(e||!r){this.setState({hasUserMedia:!1}),a.onUserMediaError(e);return}this.stream=r;try{this.video&&(this.video.srcObject=r),this.setState({hasUserMedia:!0})}catch(e){this.setState({hasUserMedia:!0,src:window.URL.createObjectURL(r)})}a.onUserMedia(r)},r.prototype.render=function(){var e=this,r=this.state,a=this.props,i=a.audio,s=(a.forceScreenshotSourceSize,a.disablePictureInPicture),l=(a.onUserMedia,a.onUserMediaError,a.screenshotFormat,a.screenshotQuality,a.minScreenshotWidth,a.minScreenshotHeight,a.audioConstraints,a.videoConstraints,a.imageSmoothing,a.mirrored),d=a.style,p=void 0===d?{}:d,c=a.children,h=u(a,["audio","forceScreenshotSourceSize","disablePictureInPicture","onUserMedia","onUserMediaError","screenshotFormat","screenshotQuality","minScreenshotWidth","minScreenshotHeight","audioConstraints","videoConstraints","imageSmoothing","mirrored","style","children"]),f=l?o(o({},p),{transform:(p.transform||"")+" scaleX(-1)"}):p,m={getScreenshot:this.getScreenshot.bind(this)};return n.createElement(n.Fragment,null,n.createElement("video",o({autoPlay:!0,disablePictureInPicture:s,src:r.src,muted:!i,playsInline:!0,ref:function(r){e.video=r},style:f},h)),c&&c(m))},r.defaultProps={audio:!1,disablePictureInPicture:!1,forceScreenshotSourceSize:!1,imageSmoothing:!0,mirrored:!1,onUserMedia:function(){},onUserMediaError:function(){},screenshotFormat:"image/webp",screenshotQuality:.92},r}(n.Component)},react:function(e,r){e.exports=i}}).default},19489,e=>{e.v("/_next/static/media/ort.bundle.min.853d3079.mjs")},3789,e=>{e.v("/_next/static/media/ort-wasm-simd-threaded.jsep.da6634e6.wasm")},11559,e=>{"use strict";var r=e.i(43476),a=e.i(71645),i=e.i(68553),n=e.i(95468),s=e.i(16715),o=e.i(71689),u=e.i(73884),l=e.i(52571),d=e.i(31278),p=e.i(75254);let c=(0,p.default)("send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]),h=(0,p.default)("maximize-2",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]);var f=e.i(41947),f=f;let m=({color:e="currentColor",size:r=24,className:i,...n})=>a.default.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:r,height:r,fill:e,...n,className:"remixicon "+(i||"")},a.default.createElement("path",{d:"M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM8 13C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13H8ZM8 11C8.82843 11 9.5 10.3284 9.5 9.5C9.5 8.67157 8.82843 8 8 8C7.17157 8 6.5 8.67157 6.5 9.5C6.5 10.3284 7.17157 11 8 11ZM16 11C16.8284 11 17.5 10.3284 17.5 9.5C17.5 8.67157 16.8284 8 16 8C15.1716 8 14.5 8.67157 14.5 9.5C14.5 10.3284 15.1716 11 16 11Z"})),g=({color:e="currentColor",size:r=24,className:i,...n})=>a.default.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:r,height:r,fill:e,...n,className:"remixicon "+(i||"")},a.default.createElement("path",{d:"M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"})),y=({color:e="currentColor",size:r=24,className:i,...n})=>a.default.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:r,height:r,fill:e,...n,className:"remixicon "+(i||"")},a.default.createElement("path",{d:"M12.4851 3.12124L20.2425 5.0606C20.6877 5.1719 21 5.57188 21 6.03075V6.99952L22 6.99997C23.1 6.99997 24 7.89997 24 8.99997V12C24 13.6568 22.6569 15 21 15L20.5789 15.0003C20.0443 16.3501 19.0275 17.4862 17.6833 18.1583L12.8944 20.5528C12.3314 20.8343 11.6686 20.8343 11.1056 20.5528L6.31672 18.1583C4.97252 17.4862 3.95573 16.3501 3.42113 15.0003L3 15C1.34315 15 0 13.6568 0 12V8.99997C0 7.8954 0.89543 6.99997 2 6.99997L3 6.99952V6.03075C3 5.57188 3.3123 5.1719 3.75746 5.0606L11.5149 3.12124C11.8334 3.04162 12.1666 3.04162 12.4851 3.12124ZM12 5.06152L5 6.81152V12.7918C5 14.3069 5.85601 15.6919 7.21115 16.3695L12 18.7639L16.7889 16.3695C18.144 15.6919 19 14.3069 19 12.7918V6.81152L12 5.06152ZM3 8.99997H2V12C2 12.5523 2.44772 13 3 13V8.99997ZM22 8.99997H21V13C21.5523 13 22 12.5523 22 12V8.99997Z"}));var b=e.i(66698),_=e.i(18566),$=e.i(28988),v=e.i(80376);let w={get url(){return`file://${e.P("node_modules/onnxruntime-web/dist/ort.bundle.min.mjs")}`}};var x,k,S,T,I,C,E,z,A,O,R,M,N,B,D,U,P,L,j,q,W,V,F,G,H,K,Z,Q,X,Y,J,ee,et,er=Object.defineProperty,ea=Object.getOwnPropertyDescriptor,ei=Object.getOwnPropertyNames,en=Object.prototype.hasOwnProperty,es=e.z,eo=(e,r)=>()=>(e&&(r=e(e=0)),r),eu=(e,r)=>{for(var a in r)er(e,a,{get:r[a],enumerable:!0})},el=e=>((e,r,a,i)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let n of ei(r))en.call(e,n)||n===a||er(e,n,{get:()=>r[n],enumerable:!(i=ea(r,n))||i.enumerable});return e})(er({},"__esModule",{value:!0}),e),ed=eo(()=>{x=new Map,k=[],S=(e,r,a)=>{if(r&&"function"==typeof r.init&&"function"==typeof r.createInferenceSessionHandler){let i=x.get(e);if(void 0===i)x.set(e,{backend:r,priority:a});else{if(i.priority>a)return;if(i.priority===a&&i.backend!==r)throw Error(`cannot register backend "${e}" using priority ${a}`)}if(a>=0){let r=k.indexOf(e);-1!==r&&k.splice(r,1);for(let r=0;r<k.length;r++)if(x.get(k[r]).priority<=a)return void k.splice(r,0,e);k.push(e)}return}throw TypeError("not a valid backend")},T=async e=>{let r=x.get(e);if(!r)return"backend not found.";if(r.initialized)return r.backend;if(r.aborted)return r.error;{let a=!!r.initPromise;try{return a||(r.initPromise=r.backend.init(e)),await r.initPromise,r.initialized=!0,r.backend}catch(e){return a||(r.error=`${e}`,r.aborted=!0),r.error}finally{delete r.initPromise}}},I=async e=>{let r=e.executionProviders||[],a=r.map(e=>"string"==typeof e?e:e.name),i=0===a.length?k:a,n,s=[],o=new Set;for(let e of i){let r=await T(e);"string"==typeof r?s.push({name:e,err:r}):(n||(n=r),n===r&&o.add(e))}if(!n)throw Error(`no available backend found. ERR: ${s.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:r}of s)a.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${r}`);let u=r.filter(e=>o.has("string"==typeof e?e:e.name));return[n,new Proxy(e,{get:(e,r)=>"executionProviders"===r?u:Reflect.get(e,r)})]}}),ep=eo(()=>{ed()}),ec=eo(()=>{C="1.26.0"}),eh=eo(()=>{ec(),E="warning",Object.defineProperty(z={wasm:{},webgl:{},webgpu:{},versions:{common:C},set logLevel(t){if(void 0!==t){if("string"!=typeof t||-1===["verbose","info","warning","error","fatal"].indexOf(t))throw Error(`Unsupported logging level: ${t}`);E=t}},get logLevel(){return E}},"logLevel",{enumerable:!0})}),ef=eo(()=>{eh(),A=z}),em=eo(()=>{O=(e,r)=>{let a="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);a.width=e.dims[3],a.height=e.dims[2];let i=a.getContext("2d");if(null!=i){let n,s;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(n=e.dims[2],s=e.dims[3]):(n=e.dims[3],s=e.dims[2]);let o=r?.format!==void 0?r.format:"RGB",u=r?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=s*n,c=0,h=p,f=2*p,m=-1;"RGBA"===o?(c=0,h=p,f=2*p,m=3*p):"RGB"===o?(c=0,h=p,f=2*p):"RBG"===o&&(c=0,f=p,h=2*p);for(let r=0;r<s;r++)for(let a=0;a<n;a++)i.fillStyle="rgba("+(e.data[c++]-d[0])*l[0]+","+(e.data[h++]-d[1])*l[1]+","+(e.data[f++]-d[2])*l[2]+","+(-1===m?255:(e.data[m++]-d[3])*l[3])+")",i.fillRect(a,r,1,1);if("toDataURL"in a)return a.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},R=(e,r)=>{let a="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(null!=a){let n,s,o;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(n=e.dims[2],s=e.dims[1],o=e.dims[3]):(n=e.dims[3],s=e.dims[2],o=e.dims[1]);let u=void 0!==r&&void 0!==r.format?r.format:"RGB",l=r?.norm,d,p;void 0===l||void 0===l.mean?d=[255,255,255,255]:"number"==typeof l.mean?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],void 0!==l.mean[3]&&(d[3]=l.mean[3])),void 0===l||void 0===l.bias?p=[0,0,0,0]:"number"==typeof l.bias?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(p[3]=l.bias[3]));let c=s*n;if(void 0!==r&&(void 0!==r.format&&4===o&&"RGBA"!==r.format||3===o&&"RGB"!==r.format&&"BGR"!==r.format))throw Error("Tensor format doesn't match input tensor dims");let h=0,f=1,m=2,g=3,y=0,b=c,_=2*c,$=-1;"RGBA"===u?(y=0,b=c,_=2*c,$=3*c):"RGB"===u?(y=0,b=c,_=2*c):"RBG"===u&&(y=0,_=c,b=2*c),i=a.createImageData(n,s);for(let r=0;r<s*n;h+=4,f+=4,m+=4,g+=4,r++)i.data[h]=(e.data[y++]-p[0])*d[0],i.data[f]=(e.data[b++]-p[1])*d[1],i.data[m]=(e.data[_++]-p[2])*d[2],i.data[g]=-1===$?255:(e.data[$++]-p[3])*d[3]}else throw Error("Can not access image data");return i}}),eg=eo(()=>{e_(),M=(e,r)=>{if(void 0===e)throw Error("Image buffer must be defined");if(void 0===r.height||void 0===r.width)throw Error("Image height and width must be defined");if("NHWC"===r.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:a,width:i}=r,n=r.norm??{mean:255,bias:0},s,o;s="number"==typeof n.mean?[n.mean,n.mean,n.mean,n.mean]:[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],o="number"==typeof n.bias?[n.bias,n.bias,n.bias,n.bias]:[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let u=void 0!==r.format?r.format:"RGBA",l=void 0!==r.tensorFormat&&void 0!==r.tensorFormat?r.tensorFormat:"RGB",d=a*i,p=new Float32Array("RGBA"===l?4*d:3*d),c=4,h=0,f=1,m=2,g=3,y=0,b=d,_=2*d,$=-1;"RGB"===u&&(c=3,h=0,f=1,m=2,g=-1),"RGBA"===l?$=3*d:"RBG"===l?(y=0,_=d,b=2*d):"BGR"===l&&(_=0,b=d,y=2*d);for(let r=0;r<d;r++,h+=c,m+=c,f+=c,g+=c)p[y++]=(e[h]+o[0])/s[0],p[b++]=(e[f]+o[1])/s[1],p[_++]=(e[m]+o[2])/s[2],-1!==$&&-1!==g&&(p[$++]=(e[g]+o[3])/s[3]);return"RGBA"===l?new G("float32",p,[1,4,a,i]):new G("float32",p,[1,3,a,i])},N=async(e,r)=>{let a="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,i="u">typeof ImageData&&e instanceof ImageData,n="u">typeof ImageBitmap&&e instanceof ImageBitmap,s="string"==typeof e,o,u=r??{},l=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},d=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(a){let a=l();a.width=e.width,a.height=e.height;let i=d(a);if(null!=i){let a=e.height,n=e.width;if(void 0!==r&&void 0!==r.resizedHeight&&void 0!==r.resizedWidth&&(a=r.resizedHeight,n=r.resizedWidth),void 0!==r){if(u=r,void 0!==r.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=a,u.width=n}else u.tensorFormat="RGBA",u.height=a,u.width=n;i.drawImage(e,0,0),o=i.getImageData(0,0,n,a).data}else throw Error("Can not access image data")}else if(i){let a,i;if(void 0!==r&&void 0!==r.resizedWidth&&void 0!==r.resizedHeight?(a=r.resizedHeight,i=r.resizedWidth):(a=e.height,i=e.width),void 0!==r&&(u=r),u.format="RGBA",u.height=a,u.width=i,void 0!==r){let r=l();r.width=i,r.height=a;let n=d(r);if(null!=n)n.putImageData(e,0,0),o=n.getImageData(0,0,i,a).data;else throw Error("Can not access image data")}else o=e.data}else if(n){if(void 0===r)throw Error("Please provide image config with format for Imagebitmap");let a=l();a.width=e.width,a.height=e.height;let i=d(a);if(null!=i){let r=e.height,a=e.width;return i.drawImage(e,0,0,a,r),o=i.getImageData(0,0,a,r).data,u.height=r,u.width=a,M(o,u)}throw Error("Can not access image data")}else{if(s)return new Promise((r,a)=>{let i=l(),n=d(i);if(!e||!n)return a();let s=new Image;s.crossOrigin="Anonymous",s.src=e,s.onload=()=>{i.width=s.width,i.height=s.height,n.drawImage(s,0,0,i.width,i.height);let e=n.getImageData(0,0,i.width,i.height);u.height=i.height,u.width=i.width,r(M(e.data,u))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==o)return M(o,u);throw Error("Input data provided is not supported - aborted tensor creation")},B=(e,r)=>{let{width:a,height:i,download:n,dispose:s}=r;return new G({location:"texture",type:"float32",texture:e,dims:[1,i,a,4],download:n,dispose:s})},D=(e,r)=>{let{dataType:a,dims:i,download:n,dispose:s}=r;return new G({location:"gpu-buffer",type:a??"float32",gpuBuffer:e,dims:i,download:n,dispose:s})},U=(e,r)=>{let{dataType:a,dims:i,download:n,dispose:s}=r;return new G({location:"ml-tensor",type:a??"float32",mlTensor:e,dims:i,download:n,dispose:s})},P=(e,r,a)=>new G({location:"cpu-pinned",type:e,data:r,dims:a??[r.length]})}),ey=eo(()=>{L=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),j=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),q=!1,W=()=>{if(!q){q=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,r="u">typeof BigUint64Array&&BigUint64Array.from,a=globalThis.Float16Array,i="u">typeof a&&a.from;e&&(L.set("int64",BigInt64Array),j.set(BigInt64Array,"int64")),r&&(L.set("uint64",BigUint64Array),j.set(BigUint64Array,"uint64")),i?(L.set("float16",a),j.set(a,"float16")):L.set("float16",Uint16Array)}}}),eb=eo(()=>{e_(),V=e=>{let r=1;for(let a=0;a<e.length;a++){let i=e[a];if("number"!=typeof i||!Number.isSafeInteger(i))throw TypeError(`dims[${a}] must be an integer, got: ${i}`);if(i<0)throw RangeError(`dims[${a}] must be a non-negative integer, got: ${i}`);r*=i}return r},F=(e,r)=>{switch(e.location){case"cpu":return new G(e.type,e.data,r);case"cpu-pinned":return new G({location:"cpu-pinned",data:e.data,type:e.type,dims:r});case"texture":return new G({location:"texture",texture:e.texture,type:e.type,dims:r});case"gpu-buffer":return new G({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:r});case"ml-tensor":return new G({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:r});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),e_=eo(()=>{em(),eg(),ey(),eb(),G=class{constructor(e,r,a){let i,n;if(W(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let r=L.get(i);if(!r)throw TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof r))throw TypeError(`buffer should be of type ${r.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==i)throw TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==i&&"float16"!==i&&"int32"!==i&&"int64"!==i&&"uint32"!==i&&"uint8"!==i&&"bool"!==i&&"uint4"!==i&&"int4"!==i)throw TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==i&&"float16"!==i&&"int32"!==i&&"int64"!==i&&"uint32"!==i&&"uint64"!==i&&"int8"!==i&&"uint8"!==i&&"bool"!==i&&"uint4"!==i&&"int4"!==i)throw TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if("string"==typeof e)if(i=e,o=a,"string"===e){if(!Array.isArray(r))throw TypeError("A string tensor's data must be a string array.");s=r}else{let a=L.get(e);if(void 0===a)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if("float16"===e&&a===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${a.name} as data.`);s="uint64"===e||"int64"===e?a.from(r,BigInt):a.from(r)}else if(r instanceof a)s=r;else if(r instanceof Uint8ClampedArray)if("uint8"===e)s=Uint8Array.from(r);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&r instanceof Uint16Array&&a!==Uint16Array)s=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw TypeError(`A ${i} tensor's data must be type of ${a}`)}else if(o=r,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let r=typeof e[0];if("string"===r)i="string",s=e;else if("boolean"===r)i="bool",s=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${r}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let r=j.get(e.constructor);if(void 0===r)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=r,s=e}if(void 0===o)o=[s.length];else if(!Array.isArray(o))throw TypeError("A tensor's dims must be a number array");n=o,this.cpuData=s,this.dataLocation="cpu"}let s=V(n);if(this.cpuData&&s!==this.cpuData.length&&("uint4"!==i&&"int4"!==i||Math.ceil(s/2)!==this.cpuData.length))throw Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=s}static async fromImage(e,r){return N(e,r)}static fromTexture(e,r){return B(e,r)}static fromGpuBuffer(e,r){return D(e,r)}static fromMLTensor(e,r){return U(e,r)}static fromPinnedBuffer(e,r,a){return P(e,r,a)}toDataURL(e){return O(this,e)}toImageData(e){return R(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return F(this,e)}}}),e$=eo(()=>{e_(),H=G}),ev=eo(()=>{eh(),K=(e,r)=>{(typeof z.trace>"u"?z.wasm.trace:z.trace)&&console.timeStamp(`${e}::ORT::${r}`)},Z=(e,r)=>{let a=Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<a.length;n++){if(i&&!a[n].includes("TRACE_FUNC")){let i=`FUNC_${e}::${a[n].trim().split(" ")[1]}`;r&&(i+=`::${r}`),K("CPU",i);return}a[n].includes("TRACE_FUNC")&&(i=!0)}},Q=e=>{(typeof z.trace>"u"?z.wasm.trace:z.trace)&&Z("BEGIN",e)},X=e=>{(typeof z.trace>"u"?z.wasm.trace:z.trace)&&Z("END",e)},Y=e=>{(typeof z.trace>"u"?z.wasm.trace:z.trace)&&console.time(`ORT::${e}`)},J=e=>{(typeof z.trace>"u"?z.wasm.trace:z.trace)&&console.timeEnd(`ORT::${e}`)}}),ew=eo(()=>{ed(),e$(),ev(),ee=class e{constructor(e){this.handler=e}async run(e,r,a){Q(),Y("InferenceSession.run");let i={},n={};if("object"!=typeof e||null===e||e instanceof H||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if("object"==typeof r){if(null===r)throw TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof H)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(0===r.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(s=!1,r)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);i[e]=null}if("object"==typeof a&&null!==a)n=a;else if("u">typeof a)throw TypeError("'options' must be an object.")}else{let e=!1,o=Object.getOwnPropertyNames(r);for(let a of this.outputNames)if(-1!==o.indexOf(a)){let n=r[a];(null===n||n instanceof H)&&(e=!0,s=!1,i[a]=n)}if(e){if("object"==typeof a&&null!==a)n=a;else if("u">typeof a)throw TypeError("'options' must be an object.")}else n=r}}else if("u">typeof r)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let r of this.inputNames)if(typeof e[r]>"u")throw Error(`input '${r}' is missing in 'feeds'.`);if(s)for(let e of this.outputNames)i[e]=null;let o=await this.handler.run(e,i,n),u={};for(let e in o)if(Object.hasOwnProperty.call(o,e)){let r=o[e];r instanceof H?u[e]=r:u[e]=new H(r.type,r.data,r.dims)}return J("InferenceSession.run"),X(),u}async release(){return this.handler.dispose()}static async create(r,a,i,n){Q(),Y("InferenceSession.create");let s,o={};if("string"==typeof r){if(s=r,"object"==typeof a&&null!==a)o=a;else if("u">typeof a)throw TypeError("'options' must be an object.")}else if(r instanceof Uint8Array){if(s=r,"object"==typeof a&&null!==a)o=a;else if("u">typeof a)throw TypeError("'options' must be an object.")}else if(r instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&r instanceof SharedArrayBuffer){let e=0,u=r.byteLength;if("object"==typeof a&&null!==a)o=a;else if("number"==typeof a){if(!Number.isSafeInteger(e=a))throw RangeError("'byteOffset' must be an integer.");if(e<0||e>=r.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${r.byteLength}).`);if(u=r.byteLength-e,"number"==typeof i){if(!Number.isSafeInteger(u=i))throw RangeError("'byteLength' must be an integer.");if(u<=0||e+u>r.byteLength)throw RangeError(`'byteLength' is out of range (0, ${r.byteLength-e}].`);if("object"==typeof n&&null!==n)o=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else if("u">typeof i)throw TypeError("'byteLength' must be a number.")}else if("u">typeof a)throw TypeError("'options' must be an object.");s=new Uint8Array(r,e,u)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await I(o),d=await u.createInferenceSessionHandler(s,l);return J("InferenceSession.create"),X(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ex=eo(()=>{ew(),et=ee}),ek=eo(()=>{}),eS=eo(()=>{}),eT=eo(()=>{}),eI=eo(()=>{});eu({},{InferenceSession:()=>et,TRACE:()=>K,TRACE_EVENT_BEGIN:()=>Y,TRACE_EVENT_END:()=>J,TRACE_FUNC_BEGIN:()=>Q,TRACE_FUNC_END:()=>X,Tensor:()=>H,env:()=>A,registerBackend:()=>S});var eC=eo(()=>{ep(),ef(),ex(),e$(),ek(),eS(),ev(),eT(),eI()}),eE=eo(()=>{}),ez={};eu(ez,{default:()=>eO});var eA,eO,eR=eo(()=>{oc(),nz(),nE(),(eA=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=e=>{let{type:r,in:a}=e.data;try{switch(r){case"init-wasm":eY(a.wasm).then(()=>{sW(a).then(()=>{postMessage({type:r})},e=>{postMessage({type:r,err:e})})},e=>{postMessage({type:r,err:e})});break;case"init-ep":{let{epName:e,env:i}=a;sV(i,e).then(()=>{postMessage({type:r})},e=>{postMessage({type:r,err:e})});break}case"copy-from":{let{buffer:e}=a,i=sH(e);postMessage({type:r,out:i});break}case"create":{let{model:e,options:i}=a;sK(e,i).then(e=>{postMessage({type:r,out:e})},e=>{postMessage({type:r,err:e})});break}case"release":sZ(a),postMessage({type:r});break;case"run":{let{sessionId:e,inputIndices:i,inputs:n,outputIndices:s,options:o}=a;sX(e,i,n,s,Array(s.length).fill(null),o).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:e},sJ([...n,...e]))},e=>{postMessage({type:r,err:e})});break}case"end-profiling":sY(a),postMessage({type:r})}}catch(e){postMessage({type:r,err:e})}}),eO=eA?null:e=>new Worker(e??eP,{type:"module",name:"ort-wasm-proxy-worker"})}),eM={};async function eN(r={}){var a=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&self.name?.startsWith("em-pthread");r.mountExternalData=(e,a)=>{e.startsWith("./")&&(e=e.substring(2)),(r.Xc||(r.Xc=new Map)).set(e,a)},r.unmountExternalData=()=>{delete r.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let s=e=>async(...a)=>{try{if(r.Yc)throw Error("Session already started");let i=r.Yc={Kd:a[0],errors:[]},n=await e(...a);if(r.Yc!==i)throw Error("Session mismatch");r.dd?.flush();let s=i.errors;if(0<s.length){let e=await Promise.all(s);if(e=e.filter(e=>e),0<e.length)throw Error(e.join(`
`))}return n}finally{r.Yc=null}};r.jsepInit=(e,a)=>{if("webgpu"===e){[r.dd,r.Ad,r.Ed,r.ed,r.Dd,r.$b,r.Fd,r.Hd,r.Bd,r.Cd,r.Gd]=a;let e=r.dd;r.jsepRegisterBuffer=(r,a,i,n)=>e.registerBuffer(r,a,i,n),r.jsepGetBuffer=r=>e.getBuffer(r),r.jsepCreateDownloader=(r,a,i)=>e.createDownloader(r,a,i),r.jsepOnCreateSession=r=>{e.onCreateSession(r)},r.jsepOnReleaseSession=r=>{e.onReleaseSession(r)},r.jsepOnRunStart=r=>e.onRunStart(r),r.Id=(r,a)=>{e.upload(r,a)}}else if("webnn"===e){let e=a[0];[r.Wd,r.sd,r.webnnEnsureTensor,r.td,r.webnnDownloadTensor,r.Rd,r.webnnEnableTraceEvent]=a.slice(1),r.webnnReleaseTensorId=r.sd,r.webnnUploadTensor=r.td,r.webnnRegisterMLContext=r.Rd,r.webnnOnRunStart=r=>e.onRunStart(r),r.webnnOnRunEnd=e.onRunEnd.bind(e),r.webnnOnReleaseSession=r=>{e.onReleaseSession(r)},r.webnnCreateMLTensorDownloader=(r,a)=>e.createMLTensorDownloader(r,a),r.webnnRegisterMLTensor=(r,a,i,n)=>e.registerMLTensor(r,a,i,n),r.webnnCreateMLContext=r=>e.createMLContext(r),r.webnnRegisterMLConstant=(a,i,n,s,o,u)=>e.registerMLConstant(a,i,n,s,o,r.Xc,u),r.webnnRegisterGraphInput=e.registerGraphInput.bind(e),r.webnnIsGraphInput=e.isGraphInput.bind(e),r.webnnRegisterGraphOutput=e.registerGraphOutput.bind(e),r.webnnIsGraphOutput=e.isGraphOutput.bind(e),r.webnnCreateTemporaryTensor=e.createTemporaryTensor.bind(e),r.webnnIsGraphInputOutputTypeSupported=e.isGraphInputOutputTypeSupported.bind(e)}};let o=()=>{let e=e=>(...r)=>{let a=tz;return r=e(...r),tz!=a?new Promise((e,r)=>{tD={resolve:e,reject:r}}):r};(()=>{for(let a of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])r[a]=e(r[a])})(),void 0!==s&&(r._OrtRun=s(r._OrtRun),r._OrtRunWithBinding=s(r._OrtRunWithBinding)),o=void 0};r.asyncInit=()=>{o?.()};var u,l,d=(e,r)=>{throw r},p=w.url,c="";if(a||i){try{c=new URL(".",p).href}catch{}i&&(l=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.responseType="arraybuffer",r.send(null),new Uint8Array(r.response)}),u=async e=>{if(S(e))return new Promise((r,a)=>{var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="arraybuffer",i.onload=()=>{200==i.status||0==i.status&&i.response?r(i.response):a(i.status)},i.onerror=a,i.send(null)});var r=await fetch(e,{credentials:"same-origin"});if(r.ok)return r.arrayBuffer();throw Error(r.status+" : "+r.url)}}var h,f,m,g,y,b,_=console.log.bind(console),$=console.error.bind(console),v=_,x=$,k=!1,S=e=>e.startsWith("file://");function T(){ed.buffer!=C.buffer&&L()}if(n){let e=function(a){try{var i,n,s=a.data,o=s.Sc;if("load"===o){let a=[];for(let i of(self.onmessage=e=>a.push(e),b=()=>{for(let r of(postMessage({Sc:"loaded"}),a))e(r);self.onmessage=e},s.xd))r[i]&&!r[i].proxy||(r[i]=(...e)=>{postMessage({Sc:"callHandler",wd:i,args:e})},"print"==i&&(v=r[i]),"printErr"==i&&(x=r[i]));ed=s.Od,L(),f=s.Pd,V(),im()}else if("run"===o){i=s.Rc,n=(T(),R)[i+52>>>2>>>0],i=(T(),R)[i+56>>>2>>>0],rQ(n,n-i),rX(n),rj(s.Rc,0,0,1,0,0),eo(),t$(s.Rc),I||(rD(),I=!0);try{ep(s.Md,s.bd)}catch(e){if("unwind"!=e)throw e}}else"setimmediate"!==s.target&&("checkMailbox"===o?I&&tv():o&&(x(`worker: received unknown command ${o}`),x(s)))}catch(e){throw rq(),e}};var I=!1;self.onunhandledrejection=e=>{throw e.reason||e},self.onmessage=e}var C,E,z,A,O,R,M,N,B,D,U,P=!1;function L(){var e=ed.buffer;r.HEAP8=C=new Int8Array(e),z=new Int16Array(e),r.HEAPU8=E=new Uint8Array(e),A=new Uint16Array(e),r.HEAP32=O=new Int32Array(e),r.HEAPU32=R=new Uint32Array(e),M=new Float32Array(e),N=new Float64Array(e),B=new BigInt64Array(e),D=new BigUint64Array(e)}function j(){P=!0,n?b():aN.sb()}function q(e){throw x(e="Aborted("+e+")"),k=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),y?.(e),e}function W(){return{a:{ma:aP,gb:aU,g:ef,J:eg,f:ev,o:ew,h:ex,ha:ek,b:eS,T:eT,Ha:eC,n:eE,$:eM,Xa:eB,Da:eD,Fa:eU,Ya:eP,Va:eL,Oa:ej,Ua:eq,ka:eW,Ea:eV,Ba:eF,Wa:eG,Ca:eH,bb:eK,ea:e2,wa:e3,ua:tt,da:tr,O:ta,H:ti,va:to,_:tm,xa:tg,Ra:ty,za:tw,Ia:tk,sa:tS,fa:tT,Qa:t$,_a:tI,R:tL,r:tF,c:e8,hb:tG,y:tH,M:tK,D:tZ,l:tQ,s:tX,ib:tY,I:tJ,S:t0,j:t1,u:t2,q:t3,k:t4,La:t6,Ma:t7,Na:re,Ja:rt,Ka:rr,ta:rn,db:rs,ab:ru,v:rp,aa:rc,ga:rh,$a:ro,W:rf,Za:rm,Aa:rg,F:ri,U:ry,la:rw,ya:rx,fb:rv,eb:rk,Sa:rC,Ta:rE,Ga:et,V:rz,ja:rA,Pa:rO,ia:rM,kb:ic,na:io,lb:ip,oa:is,G:a8,d:aW,t:aj,w:aL,A:aJ,mb:ir,K:a3,x:aG,pa:ia,Y:iu,ba:it,nb:ie,ob:a7,P:a0,qa:a9,pb:a5,N:a4,Z:ii,e:aq,B:aF,m:aV,jb:ih,p:aK,z:aZ,C:aH,E:aQ,L:a1,qb:a6,Q:il,ca:a2,X:id,rb:aY,ra:aX,i:rN,a:ed,cb:J}}}async function V(){function a(e,a){var i,n,s,o=aN=e.exports;for(let[r,a]of(e={},Object.entries(o)))"function"==typeof a?(o=function(e){var r=(...r)=>{tO.push(e);try{return e(...r)}finally{k||(tO.pop(),tz&&1===tE&&0===tO.length&&(tE=0,X+=1,tC(aO),"u">typeof Fibers&&Fibers.Zd()))}};return tN.set(e,r),r}(a),e[r]=o):e[r]=a;return i=aN=e,n=e=>r=>e(r)>>>0,s=e=>()=>e()>>>0,(i=Object.assign({},i)).tb=n(i.tb),i.Xb=s(i.Xb),i.Zb=n(i.Zb),i.lc=n(i.lc),i.mc=s(i.mc),i.qc=n(i.qc),aN=i,ei.push(aN._b),rB=(e=aN).tb,rD=e.ub,r._OrtInit=e.vb,r._OrtGetLastError=e.wb,r._OrtCreateSessionOptions=e.xb,r._OrtAppendExecutionProvider=e.yb,r._OrtAddFreeDimensionOverride=e.zb,r._OrtAddSessionConfigEntry=e.Ab,r._OrtReleaseSessionOptions=e.Bb,r._OrtCreateSession=e.Cb,r._OrtReleaseSession=e.Db,r._OrtGetInputOutputCount=e.Eb,r._OrtGetInputOutputMetadata=e.Fb,r._OrtFree=e.Gb,r._OrtCreateTensor=e.Hb,r._OrtGetTensorData=e.Ib,r._OrtReleaseTensor=e.Jb,r._OrtCreateRunOptions=e.Kb,r._OrtAddRunConfigEntry=e.Lb,r._OrtReleaseRunOptions=e.Mb,r._OrtCreateBinding=e.Nb,r._OrtBindInput=e.Ob,r._OrtBindOutput=e.Pb,r._OrtClearBoundOutputs=e.Qb,r._OrtReleaseBinding=e.Rb,r._OrtRunWithBinding=e.Sb,r._OrtRun=e.Tb,r._OrtEndProfiling=e.Ub,r._JsepOutput=e.Vb,r._JsepGetNodeName=e.Wb,rU=e.Xb,rP=r._free=e.Yb,rL=r._malloc=e.Zb,rj=e.ac,rq=e.bc,rW=e.cc,rV=e.dc,rF=e.ec,rG=e.fc,rH=e.gc,rK=e.hc,rZ=e.ic,rQ=e.jc,rX=e.kc,rY=e.lc,rJ=e.mc,r0=e.nc,r1=e.oc,r2=e.pc,r3=e.qc,r4=e.rc,r6=e.sc,r8=e.tc,r5=e.uc,r9=e.vc,r7=e.wc,ae=e.xc,at=e.yc,ar=e.zc,aa=e.Ac,ai=e.Bc,an=e.Cc,as=e.Dc,ao=e.Ec,au=e.Fc,al=e.Gc,ad=e.Hc,ap=e.Ic,ac=e.Jc,ah=e.Kc,af=e.Lc,am=e.Mc,ag=e.Nc,ay=e.Pc,ab=e.Qc,a_=e.$c,a$=e.ad,av=e.fd,aw=e.jd,ax=e.kd,ak=e.ld,aS=e.md,aT=e.nd,aI=e.od,aC=e.pd,aE=e.qd,az=e.vd,aA=e.Sd,aO=e.Td,aR=e.Ud,aM=e.Vd,f=a,aN}var i,s=W();return r.instantiateWasm?new Promise(e=>{r.instantiateWasm(s,(r,i)=>{e(a(r,i))})}):n?a(new WebAssembly.Instance(f,W()),f):(U??=r.locateFile?r.locateFile?r.locateFile("ort-wasm-simd-threaded.jsep.wasm",c):c+"ort-wasm-simd-threaded.jsep.wasm":new e.U(e.r(3789)).href,i=await async function(e){if(!h&&!S(U))try{var r=fetch(U,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(r,e)}catch(e){x(`wasm streaming compile failed: ${e}`),x("falling back to ArrayBuffer instantiation")}return async function(e,r){try{var a=await async function(e){if(!h)try{var r=await u(e);return new Uint8Array(r)}catch{}if(e==U&&h)e=new Uint8Array(h);else{if(!l)throw"both async and sync fetching of the wasm failed";e=l(e)}return e}(e);return await WebAssembly.instantiate(a,r)}catch(e){x(`failed to asynchronously prepare wasm: ${e}`),q(e)}}(U,e)}(s),a(i.instance,i.module))}class F{name="ExitStatus";constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var G=e=>{e.terminate(),e.onmessage=()=>{}},H=[],K=0,Z=null,Q=e=>{0==er.length&&(el(),eu(er[0]));var r=er.pop();if(!r)return 6;ea.push(r),en[e.Rc]=r,r.Rc=e.Rc;var a={Sc:"run",Md:e.Ld,bd:e.bd,Rc:e.Rc};return r.postMessage(a,e.rd),0},X=0,Y=(e,r,...a)=>{var i,n=16*a.length,s=rJ(),o=rY(n),u=o>>>3;for(i of a)"bigint"==typeof i?((T(),B)[u++>>>0]=1n,(T(),B)[u++>>>0]=i):((T(),B)[u++>>>0]=0n,(T(),N)[u++>>>0]=i);return e=rW(e,0,n,o,r),rX(s),e};function J(e){if(n)return Y(0,1,e);if(m=e,!(0<X)){for(var r of ea)G(r);for(r of er)G(r);er=[],ea=[],en={},k=!0}d(0,new F(e))}function ee(e){if(n)return Y(1,0,e);et(e)}var et=e=>{if(m=e,n)throw ee(e),"unwind";J(e)},er=[],ea=[],ei=[],en={},es=e=>{var r=e.Rc;delete en[r],er.push(e),ea.splice(ea.indexOf(e),1),e.Rc=0,rV(r)};function eo(){ei.forEach(e=>e())}var eu=e=>new Promise(a=>{e.onmessage=i=>{var n=i.data;if(i=n.Sc,n.Zc&&n.Zc!=rU()){var s=en[n.Zc];s?s.postMessage(n,n.rd):x(`Internal error! Worker sent a message "${i}" to target pthread ${n.Zc}, but that thread no longer exists!`)}else"checkMailbox"===i?tv():"spawnThread"===i?Q(n):"cleanupThread"===i?tb(()=>{es(en[n.Nd])}):"loaded"===i?(e.loaded=!0,a(e)):"setimmediate"===n.target?e.postMessage(n):"uncaughtException"===i?e.onerror(n.error):"callHandler"===i?r[n.wd](...n.args):i&&x(`worker sent an unknown command ${i}`)},e.onerror=e=>{throw x(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`),e};var i,n=[];for(i of[])r.propertyIsEnumerable(i)&&n.push(i);e.postMessage({Sc:"load",xd:n,Od:ed,Pd:f})});function el(){var r=new Worker((URL,w.url>"file:"&&w.url<"file;"?new e.U(e.r(19489)):new URL(w.url)),{type:"module",workerData:"em-pthread",name:"em-pthread"});er.push(r)}var ed,ep=(e,r)=>{X=0,e=r6(e,r),0<X?m=e:rF(e)},ec=[],eh=0;function ef(e){var r=new e_(e>>>=0);return 0==(T(),C)[r.Tc+12>>>0]&&(ey(r,!0),eh--),eb(r,!1),ec.push(r),r3(e)}var em=0,eg=()=>{rK(0,0);var e=ec.pop();r0(e.cd),em=0};function ey(e,r){r=+!!r,(T(),C)[e.Tc+12>>>0]=r}function eb(e,r){r=+!!r,(T(),C)[e.Tc+13>>>0]=r}class e_{constructor(e){this.cd=e,this.Tc=e-24}}var e$=e=>{var r=em;if(!r)return rZ(0),0;var a=new e_(r);(T(),R)[a.Tc+16>>>2>>>0]=r;var i=(T(),R)[a.Tc+4>>>2>>>0];if(!i)return rZ(0),r;for(var n of e){if(0===n||n===i)break;if(r2(n,i,a.Tc+16))return rZ(n),r}return rZ(i),r};function ev(){return e$([])}function ew(e){return e$([e>>>0])}function ex(e,r,a,i){return e$([e>>>0,r>>>0,a>>>0,i>>>0])}var ek=()=>{var e=ec.pop();e||q("no exception to throw");var r=e.cd;throw 0==(T(),C)[e.Tc+13>>>0]&&(ec.push(e),eb(e,!0),ey(e,!1),eh++),r1(r),em=r};function eS(e,r,a){var i=new e_(e>>>=0);throw r>>>=0,a>>>=0,(T(),R)[i.Tc+16>>>2>>>0]=0,(T(),R)[i.Tc+4>>>2>>>0]=r,(T(),R)[i.Tc+8>>>2>>>0]=a,r1(e),eh++,em=e}var eT=()=>eh;function eI(e,r,a,i){return n?Y(2,1,e,r,a,i):eC(e,r,a,i)}function eC(e,r,a,i){if(e>>>=0,r>>>=0,a>>>=0,i>>>=0,!globalThis.SharedArrayBuffer)return 6;var s=[];return n&&0===s.length?eI(e,r,a,i):(e={Ld:a,Rc:e,bd:i,rd:s},n?(e.Sc="spawnThread",postMessage(e,s),0):Q(e))}function eE(e){throw em||=e>>>0}var ez=globalThis.TextDecoder&&new TextDecoder,eA=(e,r,a,i)=>{if(a=r+a,i)return a;for(;e[r]&&!(r>=a);)++r;return r},eO=(e,r=0,a,i)=>{if(16<(a=eA(e,r>>>=0,a,i))-r&&e.buffer&&ez)return ez.decode(e.buffer instanceof ArrayBuffer?e.subarray(r,a):e.slice(r,a));for(i="";r<a;){var n=e[r++];if(128&n){var s=63&e[r++];if((224&n)==192)i+=String.fromCharCode((31&n)<<6|s);else{var o=63&e[r++];65536>(n=(240&n)==224?(15&n)<<12|s<<6|o:(7&n)<<18|s<<12|o<<6|63&e[r++])?i+=String.fromCharCode(n):(n-=65536,i+=String.fromCharCode(55296|n>>10,56320|1023&n))}}else i+=String.fromCharCode(n)}return i},eR=(e,r,a)=>(e>>>=0)?eO((T(),E),e,r,a):"";function eM(e,r,a){return n?Y(3,1,e,r,a):0}function eB(e,r){if(n)return Y(4,1,e,r)}function eD(e,r){if(n)return Y(5,1,e,r)}function eU(e,r,a){if(n)return Y(6,1,e,r,a)}function eP(e,r,a){return n?Y(7,1,e,r,a):0}function eL(e,r){if(n)return Y(8,1,e,r)}function ej(e,r,a){if(n)return Y(9,1,e,r,a)}function eq(e,r,a,i){if(n)return Y(10,1,e,r,a,i)}function eW(e,r,a,i){if(n)return Y(11,1,e,r,a,i)}function eV(e,r,a,i){if(n)return Y(12,1,e,r,a,i)}function eF(e){if(n)return Y(13,1,e)}function eG(e,r){if(n)return Y(14,1,e,r)}function eH(e,r,a){if(n)return Y(15,1,e,r,a)}var eK=()=>q(""),eZ=e=>{e>>>=0;for(var r="";;){var a=(T(),E)[e++>>>0];if(!a)return r;r+=String.fromCharCode(a)}},eQ={},eX={},eY={},eJ=class extends Error{constructor(e){super(e),this.name="BindingError"}};function e0(e,r,a={}){return function(e,r,a={}){var i=r.name;if(!e)throw new eJ(`type "${i}" must have a positive integer typeid pointer`);if(eX.hasOwnProperty(e)){if(a.yd)return;throw new eJ(`Cannot register type '${i}' twice`)}eX[e]=r,delete eY[e],eQ.hasOwnProperty(e)&&(r=eQ[e],delete eQ[e],r.forEach(e=>e()))}(e,r,a)}var e1=(e,r,a)=>{switch(r){case 1:return a?e=>(T(),C)[e>>>0]:e=>(T(),E)[e>>>0];case 2:return a?e=>(T(),z)[e>>>1>>>0]:e=>(T(),A)[e>>>1>>>0];case 4:return a?e=>(T(),O)[e>>>2>>>0]:e=>(T(),R)[e>>>2>>>0];case 8:return a?e=>(T(),B)[e>>>3>>>0]:e=>(T(),D)[e>>>3>>>0];default:throw TypeError(`invalid integer width (${r}): ${e}`)}};function e2(e,r,a,i,n){e>>>=0,a>>>=0,r=eZ(r>>>0);let s=e=>e;if(i=0n===i){let e=8*a;n=(s=r=>BigInt.asUintN(e,r))(n)}e0(e,{name:r,Oc:s,Vc:(e,r)=>("number"==typeof r&&(r=BigInt(r)),r),Uc:e1(r,a,!i),Wc:null})}function e3(e,r,a,i){e0(e>>>=0,{name:r=eZ(r>>>0),Oc:function(e){return!!e},Vc:function(e,r){return r?a:i},Uc:function(e){return this.Oc((T(),E)[e>>>0])},Wc:null})}var e4=[],e6=[0,1,,1,null,1,!0,1,!1,1];function e8(e){9<(e>>>=0)&&0==--e6[e+1]&&(e6[e]=void 0,e4.push(e))}var e5=e=>{if(!e)throw new eJ(`Cannot use deleted val. handle = ${e}`);return e6[e]},e9=e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let r=e4.pop()||e6.length;return e6[r]=e,e6[r+1]=1,r}};function e7(e){return this.Oc((T(),R)[e>>>2>>>0])}var te={name:"emscripten::val",Oc:e=>{var r=e5(e);return e8(e),r},Vc:(e,r)=>e9(r),Uc:e7,Wc:null};function tt(e){return e0(e>>>0,te)}function tr(e,r,a){a>>>=0,e0(e>>>=0,{name:r=eZ(r>>>0),Oc:e=>e,Vc:(e,r)=>r,Uc:((e,r)=>{switch(r){case 4:return function(e){return this.Oc((T(),M)[e>>>2>>>0])};case 8:return function(e){return this.Oc((T(),N)[e>>>3>>>0])};default:throw TypeError(`invalid float width (${r}): ${e}`)}})(r,a),Wc:null})}function ta(e,r,a,i,n){e>>>=0,a>>>=0,r=eZ(r>>>0);let s=e=>e;if(0===i){var o=32-8*a;n=(s=e=>e<<o>>>o)(n)}e0(e,{name:r,Oc:s,Vc:(e,r)=>r,Uc:e1(r,a,0!==i),Wc:null})}function ti(e,r,a){function i(e){var r=(T(),R)[e>>>2>>>0];return e=(T(),R)[e+4>>>2>>>0],new n((T(),C).buffer,e,r)}var n=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][r];e0(e>>>=0,{name:a=eZ(a>>>0),Oc:i,Uc:i},{yd:!0})}var tn=(e,r,a)=>{var i=(T(),E);if(r>>>=0,0<a){var n=r;a=r+a-1;for(var s=0;s<e.length;++s){var o=e.codePointAt(s);if(127>=o){if(r>=a)break;i[r++>>>0]=o}else if(2047>=o){if(r+1>=a)break;i[r++>>>0]=192|o>>6,i[r++>>>0]=128|63&o}else if(65535>=o){if(r+2>=a)break;i[r++>>>0]=224|o>>12,i[r++>>>0]=128|o>>6&63,i[r++>>>0]=128|63&o}else{if(r+3>=a)break;i[r++>>>0]=240|o>>18,i[r++>>>0]=128|o>>12&63,i[r++>>>0]=128|o>>6&63,i[r++>>>0]=128|63&o,s++}}i[r>>>0]=0,e=r-n}else e=0;return e},ts=e=>{for(var r=0,a=0;a<e.length;++a){var i=e.charCodeAt(a);127>=i?r++:2047>=i?r+=2:55296<=i&&57343>=i?(r+=4,++a):r+=3}return r};function to(e,r){e0(e>>>=0,{name:r=eZ(r>>>0),Oc(e){var r=(T(),R)[e>>>2>>>0];return r=eR(e+4,r,!0),rP(e),r},Vc(e,r){r instanceof ArrayBuffer&&(r=new Uint8Array(r));var a="string"==typeof r;if(!(a||ArrayBuffer.isView(r)&&1==r.BYTES_PER_ELEMENT))throw new eJ("Cannot pass non-string to std::string");var i=a?ts(r):r.length,n=rL(4+i+1),s=n+4;return(T(),R)[n>>>2>>>0]=i,a?tn(r,s,i+1):(T(),E).set(r,s>>>0),null!==e&&e.push(rP,n),n},Uc:e7,Wc(e){rP(e)}})}var tu=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,tl=(e,r,a)=>{if(e>>>=1,16<(r=eA((T(),A),e,r/2,a))-e&&tu)return tu.decode((T(),A).slice(e,r));for(a="";e<r;++e)a+=String.fromCharCode((T(),A)[e>>>0]);return a},td=(e,r,a)=>{if(2>(a??=0x7fffffff))return 0;var i=r;a=(a-=2)<2*e.length?a/2:e.length;for(var n=0;n<a;++n){var s=e.charCodeAt(n);(T(),z)[r>>>1>>>0]=s,r+=2}return(T(),z)[r>>>1>>>0]=0,r-i},tp=e=>2*e.length,tc=(e,r,a)=>{var i="";e>>>=2;for(var n=0;!(n>=r/4);n++){var s=(T(),R)[e+n>>>0];if(!s&&!a)break;i+=String.fromCodePoint(s)}return i},th=(e,r,a)=>{if(r>>>=0,4>(a??=0x7fffffff))return 0;var i=r;a=i+a-4;for(var n=0;n<e.length;++n){var s=e.codePointAt(n);if(65535<s&&n++,(T(),O)[r>>>2>>>0]=s,(r+=4)+4>a)break}return(T(),O)[r>>>2>>>0]=0,r-i},tf=e=>{for(var r=0,a=0;a<e.length;++a)65535<e.codePointAt(a)&&a++,r+=4;return r};function tm(e,r,a){if(e>>>=0,r>>>=0,a=eZ(a>>>=0),2===r)var i=tl,n=td,s=tp;else i=tc,n=th,s=tf;e0(e,{name:a,Oc:e=>{var a=(T(),R)[e>>>2>>>0];return a=i(e+4,a*r,!0),rP(e),a},Vc:(e,i)=>{if("string"!=typeof i)throw new eJ(`Cannot pass non-string to C++ string type ${a}`);var o=s(i),u=rL(4+o+r);return(T(),R)[u>>>2>>>0]=o/r,n(i,u+4,o+r),null!==e&&e.push(rP,u),u},Uc:e7,Wc(e){rP(e)}})}function tg(e,r){e0(e>>>=0,{zd:!0,name:r=eZ(r>>>0),Oc:()=>{},Vc:()=>{}})}function ty(e){rj(e>>>0,!i,1,!a,131072,!1),eo()}var tb=e=>{if(!k)try{if(e(),!(0<X))try{n?rU()&&rF(m):et(m)}catch(e){e instanceof F||"unwind"==e||d(0,e)}}catch(e){e instanceof F||"unwind"==e||d(0,e)}},t_=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function t$(e){e>>>=0,t_||(Atomics.waitAsync((T(),O),e>>>2,e).value.then(tv),e+=128,Atomics.store((T(),O),e>>>2,1))}var tv=()=>tb(()=>{var e=rU();e&&(t$(e),rH())});function tw(e,r){(e>>>=0)==r>>>0?setTimeout(tv):n?postMessage({Zc:e,Sc:"checkMailbox"}):(e=en[e])&&e.postMessage({Sc:"checkMailbox"})}var tx=[];function tk(e,r,a,i,n){for(r>>>=0,n>>>=0,tx.length=0,a=n>>>3,i=n+i>>>3;a<i;){var s;s=(T(),B)[a++>>>0]?(T(),B)[a++>>>0]:(T(),N)[a++>>>0],tx.push(s)}return(r?aD[r]:aB[e])(...tx)}var tS=()=>{X=0};function tT(e){e>>>=0,n?postMessage({Sc:"cleanupThread",Nd:e}):es(en[e])}function tI(e){}var tC=e=>{try{e()}catch(e){q(e)}},tE=0,tz=null,tA=0,tO=[],tR=new Map,tM=new Map,tN=new Map,tB=0,tD=null,tU=[],tP=e=>(function(e){if(!k){if(0===tE){var r=!1,a=!1;e((e=0)=>{if(!k&&(tA=e,r=!0,a)){tE=2,tC(()=>aR(tz)),"u">typeof MainLoop&&MainLoop.ud&&MainLoop.resume(),e=!1;try{var i,n=(i=(T(),O)[tz+8>>>2>>>0],i=tM.get(i),i=tN.get(i),--X,i())}catch(r){n=r,e=!0}var s=!1;if(!tz){var o=tD;o&&(tD=null,(e?o.reject:o.resolve)(n),s=!0)}if(e&&!s)throw n}}),a=!0,r||(tE=1,tz=function(){var e=rL(65548),r=e+12;if((T(),R)[e>>>2>>>0]=r,(T(),R)[e+4>>>2>>>0]=r+65536,r=tO[0],!tR.has(r)){var a=tB++;tR.set(r,a),tM.set(a,r)}return r=tR.get(r),(T(),O)[e+8>>>2>>>0]=r,e}(),"u">typeof MainLoop&&MainLoop.ud&&MainLoop.pause(),tC(()=>aA(tz)))}else 2===tE?(tE=0,tC(aM),rP(tz),tz=null,tU.forEach(tb)):q(`invalid state: ${tE}`);return tA}})(r=>{e().then(r)});function tL(e){return e>>>=0,tP(async()=>e9(await e5(e)))}var tj=[],tq=(e,r,a)=>{var i=[];return e=e(i,a),i.length&&((T(),R)[r>>>2>>>0]=e9(i)),e},tW={},tV=e=>{var r=tW[e];return void 0===r?eZ(e):r};function tF(e,r,a){var i,n,[s,...o]=((e,r)=>{for(var a=Array(e),i=0;i<e;++i){var n=i,s=(T(),R)[r+4*i>>>2>>>0],o=eX[s];if(void 0===o)throw e=`parameter ${i}`,r=eZ(s=rB(s)),rP(s),new eJ(`${e} has unknown type ${r}`);a[n]=o}return a})(e,r>>>0);r=s.Vc.bind(s);var u=o.map(e=>e.Uc.bind(e));e--;var l={toValue:e5};switch(e=u.map((e,r)=>{var a=`argFromPtr${r}`;return l[a]=e,`${a}(args${r?"+"+8*r:""})`}),a){case 0:var d="toValue(handle)";break;case 2:d="new (toValue(handle))";break;case 3:d="";break;case 1:l.getStringOrSymbol=tV,d="toValue(handle)[getStringOrSymbol(methodName)]"}return d+=`(${e})`,s.zd||(l.toReturnWire=r,l.emval_returnValue=tq,d=`return emval_returnValue(toReturnWire, destructorsRef, ${d})`),d=`return function (handle, methodName, destructorsRef, args) {
  ${d}
  }`,i=Object.defineProperty(a=Function(Object.keys(l),d)(...Object.values(l)),"name",{value:d=`methodCaller<(${o.map(e=>e.name)}) => ${s.name}>`}),n=tj.length,tj.push(i),n}function tG(e,r){return r>>>=0,(e=e5(e>>>0))==e5(r)}function tH(e){return(e>>>=0)?(e=tV(e),e9(globalThis[e])):e9(globalThis)}function tK(e){return e9(r[e=tV(e>>>0)])}function tZ(e,r){return r>>>=0,e9((e=e5(e>>>0))[r=e5(r)])}function tQ(e){9<(e>>>=0)&&(e6[e+1]+=1)}function tX(e,r,a,i,n){return tj[e>>>0](r>>>0,a>>>0,i>>>0,n>>>0)}function tY(e,r,a,i,n){return tX(e>>>0,r>>>0,a>>>0,i>>>0,n>>>0)}function tJ(){return e9([])}function t0(e){e=e5(e>>>0);for(var r=Array(e.length),a=0;a<e.length;a++)r[a]=e[a];return e9(r)}function t1(e){return e9(tV(e>>>0))}function t2(){return e9({})}function t3(e){for(var r=e5(e>>>=0);r.length;){var a=r.pop();r.pop()(a)}e8(e)}function t4(e,r,a){r>>>=0,a>>>=0,e=e5(e>>>0),r=e5(r),a=e5(a),e[r]=a}function t6(e,r){e=-0x20000000000000>e||0x20000000000000<e?NaN:Number(e),r>>>=0,e=new Date(1e3*e),(T(),O)[r>>>2>>>0]=e.getUTCSeconds(),(T(),O)[r+4>>>2>>>0]=e.getUTCMinutes(),(T(),O)[r+8>>>2>>>0]=e.getUTCHours(),(T(),O)[r+12>>>2>>>0]=e.getUTCDate(),(T(),O)[r+16>>>2>>>0]=e.getUTCMonth(),(T(),O)[r+20>>>2>>>0]=e.getUTCFullYear()-1900,(T(),O)[r+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(T(),O)[r+28>>>2>>>0]=e}var t8=e=>e%4==0&&(e%100!=0||e%400==0),t5=[0,31,60,91,121,152,182,213,244,274,305,335],t9=[0,31,59,90,120,151,181,212,243,273,304,334];function t7(e,r){e=-0x20000000000000>e||0x20000000000000<e?NaN:Number(e),r>>>=0,e=new Date(1e3*e),(T(),O)[r>>>2>>>0]=e.getSeconds(),(T(),O)[r+4>>>2>>>0]=e.getMinutes(),(T(),O)[r+8>>>2>>>0]=e.getHours(),(T(),O)[r+12>>>2>>>0]=e.getDate(),(T(),O)[r+16>>>2>>>0]=e.getMonth(),(T(),O)[r+20>>>2>>>0]=e.getFullYear()-1900,(T(),O)[r+24>>>2>>>0]=e.getDay();var a=(t8(e.getFullYear())?t5:t9)[e.getMonth()]+e.getDate()-1|0;(T(),O)[r+28>>>2>>>0]=a,(T(),O)[r+36>>>2>>>0]=-60*e.getTimezoneOffset(),a=new Date(e.getFullYear(),6,1).getTimezoneOffset();var i=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=0|(a!=i&&e.getTimezoneOffset()==Math.min(i,a)),(T(),O)[r+32>>>2>>>0]=e}function re(e){e>>>=0;var r=new Date((T(),O)[e+20>>>2>>>0]+1900,(T(),O)[e+16>>>2>>>0],(T(),O)[e+12>>>2>>>0],(T(),O)[e+8>>>2>>>0],(T(),O)[e+4>>>2>>>0],(T(),O)[e>>>2>>>0],0),a=(T(),O)[e+32>>>2>>>0],i=r.getTimezoneOffset(),n=new Date(r.getFullYear(),6,1).getTimezoneOffset(),s=new Date(r.getFullYear(),0,1).getTimezoneOffset(),o=Math.min(s,n);return 0>a?(T(),O)[e+32>>>2>>>0]=+(n!=s&&o==i):0<a!=(o==i)&&(n=Math.max(s,n),r.setTime(r.getTime()+6e4*((0<a?o:n)-i))),(T(),O)[e+24>>>2>>>0]=r.getDay(),a=(t8(r.getFullYear())?t5:t9)[r.getMonth()]+r.getDate()-1|0,(T(),O)[e+28>>>2>>>0]=a,(T(),O)[e>>>2>>>0]=r.getSeconds(),(T(),O)[e+4>>>2>>>0]=r.getMinutes(),(T(),O)[e+8>>>2>>>0]=r.getHours(),(T(),O)[e+12>>>2>>>0]=r.getDate(),(T(),O)[e+16>>>2>>>0]=r.getMonth(),(T(),O)[e+20>>>2>>>0]=r.getYear(),BigInt(isNaN(e=r.getTime())?-1:e/1e3)}function rt(e,r,a,i,s,o,u){return n?Y(16,1,e,r,a,i,s,o,u):-52}function rr(e,r,a,i,s,o){if(n)return Y(17,1,e,r,a,i,s,o)}var ra={},ri=()=>performance.timeOrigin+performance.now();function rn(e,r){if(n)return Y(18,1,e,r);if(ra[e]&&(clearTimeout(ra[e].id),delete ra[e]),!r)return 0;var a=setTimeout(()=>{delete ra[e],tb(()=>rG(e,performance.timeOrigin+performance.now()))},r);return ra[e]={id:a,Yd:r},0}function rs(e,r,a,i){e>>>=0,r>>>=0,a>>>=0,i>>>=0;var n=new Date().getFullYear(),s=new Date(n,0,1).getTimezoneOffset(),o=Math.max(s,n=new Date(n,6,1).getTimezoneOffset());(T(),R)[e>>>2>>>0]=60*o,(T(),O)[r>>>2>>>0]=+(s!=n),e=(r=e=>{var r=Math.abs(e);return`UTC${0<=e?"-":"+"}${String(Math.floor(r/60)).padStart(2,"0")}${String(r%60).padStart(2,"0")}`})(s),r=r(n),n<s?(tn(e,a,17),tn(r,i,17)):(tn(e,i,17),tn(r,a,17))}var ro=()=>Date.now();function ru(e,r,a){return(a>>>=0,0<=e&&3>=e)?(e=Math.round(1e6*(e=0===e?Date.now():performance.timeOrigin+performance.now())),(T(),B)[a>>>3>>>0]=BigInt(e),0):28}var rl=[],rd=(e,r)=>{rl.length=0;for(var a;a=(T(),E)[e++>>>0];){var i=105!=a;r+=(i&=112!=a)&&r%8?4:0,rl.push(112==a?(T(),R)[r>>>2>>>0]:106==a?(T(),B)[r>>>3>>>0]:105==a?(T(),O)[r>>>2>>>0]:(T(),N)[r>>>3>>>0]),r+=i?8:4}return rl};function rp(e,r,a){return e>>>=0,r=rd(r>>>0,a>>>0),aD[e](...r)}function rc(e,r,a){return e>>>=0,r=rd(r>>>0,a>>>0),aD[e](...r)}var rh=()=>{};function rf(e,r){return x(eR(e>>>0,r>>>0))}var rm=()=>{throw X+=1,"unwind"};function rg(){return 0xffff0000}var ry=()=>navigator.hardwareConcurrency,rb={},r_=e=>{var r;return(r=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e))?+r[1]:(r=/:(\d+):\d+(?:\)|$)/.exec(e))?0x80000000|r[1]:0},r$=e=>{for(var r of e)(e=r_(r))&&(rb[e]=r)};function rv(){var e=Error().stack.toString().split(`
`);return"Error"==e[0]&&e.shift(),r$(e),rb.gd=r_(e[3]),rb.Jd=e,rb.gd}function rw(e){if(!(e=rb[e>>>0]))return 0;if(r=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e))e=r[1];else if(r=/^\s+at (.*) \(.*\)$/.exec(e))e=r[1];else{if(!(r=/^(.+?)@/.exec(e)))return 0;e=r[1]}rP(rw.hd??0),r=ts(e)+1;var r,a=rL(r);return a&&tn(e,a,r),rw.hd=a,rw.hd}function rx(e){e>>>=0;var r=(T(),E).length;if(e<=r||0xffff0000<e)return!1;for(var a=1;4>=a;a*=2){var i=r*(1+.2/a);i=Math.min(i,e+0x6000000);e:{i=(Math.min(0xffff0000,65536*Math.ceil(Math.max(e,i)/65536))-ed.buffer.byteLength+65535)/65536|0;try{ed.grow(i),L();var n=1;break e}catch{}n=void 0}if(n)return!0}return!1}function rk(e,r,a){if(e>>>=0,r>>>=0,rb.gd==e)var i=rb.Jd;else"Error"==(i=Error().stack.toString().split(`
`))[0]&&i.shift(),r$(i);for(var n=3;i[n]&&r_(i[n])!=e;)++n;for(e=0;e<a&&i[e+n];++e)(T(),O)[r+4*e>>>2>>>0]=r_(i[e+n]);return e}var rS,rT={},rI=()=>{if(!rS){var e,r={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(e in rT)void 0===rT[e]?delete r[e]:r[e]=rT[e];var a=[];for(e in r)a.push(`${e}=${r[e]}`);rS=a}return rS};function rC(e,r){if(n)return Y(19,1,e,r);e>>>=0,r>>>=0;var a,i=0,s=0;for(a of rI()){var o=r+i;(T(),R)[e+s>>>2>>>0]=o,i+=tn(a,o,1/0)+1,s+=4}return 0}function rE(e,r){if(n)return Y(20,1,e,r);e>>>=0,r>>>=0;var a=rI();for(var i of((T(),R)[e>>>2>>>0]=a.length,e=0,a))e+=ts(i)+1;return(T(),R)[r>>>2>>>0]=e,0}function rz(e){return n?Y(21,1,e):52}function rA(e,r,a,i){return n?Y(22,1,e,r,a,i):52}function rO(e,r,a,i){return n?Y(23,1,e,r,a,i):70}var rR=[null,[],[]];function rM(e,r,a,i){if(n)return Y(24,1,e,r,a,i);r>>>=0,a>>>=0,i>>>=0;for(var s=0,o=0;o<a;o++){var u=(T(),R)[r>>>2>>>0],l=(T(),R)[r+4>>>2>>>0];r+=8;for(var d=0;d<l;d++){var p=(T(),E)[u+d>>>0],c=rR[e];0===p||10===p?((1===e?v:x)(eO(c)),c.length=0):c.push(p)}s+=l}return(T(),R)[i>>>2>>>0]=s,0}function rN(e){return e>>>0}n||function(){for(var e=r.numThreads-1;e--;)el();H.push(async()=>{var e=async function(){if(!n)return Promise.all(er.map(eu))}();K++,await e,0==--K&&Z&&(e=Z,Z=null,e())})}(),n||(ed=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),L()),r.wasmBinary&&(h=r.wasmBinary),r.stackSave=()=>rJ(),r.stackRestore=e=>rX(e),r.stackAlloc=e=>rY(e),r.setValue=function(e,r,a="i8"){switch(a.endsWith("*")&&(a="*"),a){case"i1":case"i8":(T(),C)[e>>>0]=r;break;case"i16":(T(),z)[e>>>1>>>0]=r;break;case"i32":(T(),O)[e>>>2>>>0]=r;break;case"i64":(T(),B)[e>>>3>>>0]=BigInt(r);break;case"float":(T(),M)[e>>>2>>>0]=r;break;case"double":(T(),N)[e>>>3>>>0]=r;break;case"*":(T(),R)[e>>>2>>>0]=r;break;default:q(`invalid type for setValue: ${a}`)}},r.getValue=function(e,r="i8"){switch(r.endsWith("*")&&(r="*"),r){case"i1":case"i8":return(T(),C)[e>>>0];case"i16":return(T(),z)[e>>>1>>>0];case"i32":return(T(),O)[e>>>2>>>0];case"i64":return(T(),B)[e>>>3>>>0];case"float":return(T(),M)[e>>>2>>>0];case"double":return(T(),N)[e>>>3>>>0];case"*":return(T(),R)[e>>>2>>>0];default:q(`invalid type for getValue: ${r}`)}},r.UTF8ToString=eR,r.stringToUTF8=tn,r.lengthBytesUTF8=ts;var rB,rD,rU,rP,rL,rj,rq,rW,rV,rF,rG,rH,rK,rZ,rQ,rX,rY,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r9,r7,ae,at,ar,aa,ai,an,as,ao,au,al,ad,ap,ac,ah,af,am,ag,ay,ab,a_,a$,av,aw,ax,ak,aS,aT,aI,aC,aE,az,aA,aO,aR,aM,aN,aB=[J,ee,eI,eM,eB,eD,eU,eP,eL,ej,eq,eW,eV,eF,eG,eH,rt,rr,rn,rC,rE,rz,rA,rO,rM],aD={973212:(e,a,i,n,s)=>{if(void 0===r||!r.Xc)return 1;if((e=eR(Number(e>>>0))).startsWith("./")&&(e=e.substring(2)),!(e=r.Xc.get(e)))return 2;if(a=Number(a>>>0),i=Number(i>>>0),n=Number(n>>>0),a+i>e.byteLength)return 3;try{let o=e.subarray(a,a+i);switch(s){case 0:(T(),E).set(o,n>>>0);break;case 1:r.Qd?r.Qd(n,o):r.Id(n,o);break;default:return 4}return 0}catch{return 4}},974036:(e,a,i)=>{r.td(e,(T(),E).subarray(a>>>0,a+i>>>0))},974100:()=>r.Wd(),974142:e=>{r.sd(e)},974179:()=>{r.Bd()},974210:()=>{r.Cd()},974239:()=>{r.Gd()},974264:e=>r.Ad(e),974297:e=>r.Ed(e),974329:(e,a,i)=>{r.ed(Number(e),Number(a),Number(i),!0)},974392:(e,a,i)=>{r.ed(Number(e),Number(a),Number(i))},974449:()=>"u">typeof wasmOffsetConverter,974506:e=>{r.$b("Abs",e,void 0)},974557:e=>{r.$b("Neg",e,void 0)},974608:e=>{r.$b("Floor",e,void 0)},974661:e=>{r.$b("Ceil",e,void 0)},974713:e=>{r.$b("Reciprocal",e,void 0)},974771:e=>{r.$b("Sqrt",e,void 0)},974823:e=>{r.$b("Exp",e,void 0)},974874:e=>{r.$b("Erf",e,void 0)},974925:e=>{r.$b("Sigmoid",e,void 0)},974980:(e,a,i)=>{r.$b("HardSigmoid",e,{alpha:a,beta:i})},975059:e=>{r.$b("Log",e,void 0)},975110:e=>{r.$b("Sin",e,void 0)},975161:e=>{r.$b("Cos",e,void 0)},975212:e=>{r.$b("Tan",e,void 0)},975263:e=>{r.$b("Asin",e,void 0)},975315:e=>{r.$b("Acos",e,void 0)},975367:e=>{r.$b("Atan",e,void 0)},975419:e=>{r.$b("Sinh",e,void 0)},975471:e=>{r.$b("Cosh",e,void 0)},975523:e=>{r.$b("Asinh",e,void 0)},975576:e=>{r.$b("Acosh",e,void 0)},975629:e=>{r.$b("Atanh",e,void 0)},975682:e=>{r.$b("Tanh",e,void 0)},975734:e=>{r.$b("Not",e,void 0)},975785:(e,a,i)=>{r.$b("Clip",e,{min:a,max:i})},975854:e=>{r.$b("Clip",e,void 0)},975906:(e,a)=>{r.$b("Elu",e,{alpha:a})},975964:e=>{r.$b("Gelu",e,void 0)},976016:e=>{r.$b("Relu",e,void 0)},976068:(e,a)=>{r.$b("LeakyRelu",e,{alpha:a})},976132:(e,a)=>{r.$b("ThresholdedRelu",e,{alpha:a})},976202:(e,a)=>{r.$b("Cast",e,{to:a})},976260:e=>{r.$b("Add",e,void 0)},976311:e=>{r.$b("Sub",e,void 0)},976362:e=>{r.$b("Mul",e,void 0)},976413:e=>{r.$b("Div",e,void 0)},976464:e=>{r.$b("Pow",e,void 0)},976515:e=>{r.$b("Equal",e,void 0)},976568:e=>{r.$b("Greater",e,void 0)},976623:e=>{r.$b("GreaterOrEqual",e,void 0)},976685:e=>{r.$b("Less",e,void 0)},976737:e=>{r.$b("LessOrEqual",e,void 0)},976796:(e,a,i,n,s)=>{r.$b("ReduceMean",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},976971:(e,a,i,n,s)=>{r.$b("ReduceMax",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},977145:(e,a,i,n,s)=>{r.$b("ReduceMin",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},977319:(e,a,i,n,s)=>{r.$b("ReduceProd",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},977494:(e,a,i,n,s)=>{r.$b("ReduceSum",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},977668:(e,a,i,n,s)=>{r.$b("ReduceL1",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},977841:(e,a,i,n,s)=>{r.$b("ReduceL2",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},978014:(e,a,i,n,s)=>{r.$b("ReduceLogSum",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},978191:(e,a,i,n,s)=>{r.$b("ReduceSumSquare",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},978371:(e,a,i,n,s)=>{r.$b("ReduceLogSumExp",e,{keepDims:!!a,noopWithEmptyAxes:!!i,axes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},978551:e=>{r.$b("Where",e,void 0)},978604:(e,a,i)=>{r.$b("Transpose",e,{perm:a?Array.from((T(),O).subarray(Number(a)>>>0,Number(i)>>>0)):[]})},978728:(e,a,i,n)=>{r.$b("DepthToSpace",e,{blocksize:a,mode:eR(i),format:n?"NHWC":"NCHW"})},978861:(e,a,i,n)=>{r.$b("DepthToSpace",e,{blocksize:a,mode:eR(i),format:n?"NHWC":"NCHW"})},978994:(e,a,i,n,s,o,u,l,d,p,c,h,f,m,g)=>{r.$b("ConvTranspose",e,{format:d?"NHWC":"NCHW",autoPad:a,dilations:[i],group:n,kernelShape:[s],pads:[o,u],strides:[l],wIsConst:()=>!!(T(),C)[p>>>0],outputPadding:c?Array.from((T(),O).subarray(Number(c)>>>0,Number(h)>>>0)):[],outputShape:f?Array.from((T(),O).subarray(Number(f)>>>0,Number(m)>>>0)):[],activation:eR(g)})},979427:(e,a,i,n,s,o,u,l,d,p,c,h,f,m)=>{r.$b("ConvTranspose",e,{format:l?"NHWC":"NCHW",autoPad:a,dilations:Array.from((T(),O).subarray(Number(i)>>>0,2+(Number(i)>>>0)>>>0)),group:n,kernelShape:Array.from((T(),O).subarray(Number(s)>>>0,2+(Number(s)>>>0)>>>0)),pads:Array.from((T(),O).subarray(Number(o)>>>0,4+(Number(o)>>>0)>>>0)),strides:Array.from((T(),O).subarray(Number(u)>>>0,2+(Number(u)>>>0)>>>0)),wIsConst:()=>!!(T(),C)[d>>>0],outputPadding:p?Array.from((T(),O).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from((T(),O).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:eR(m)})},980088:(e,a,i,n,s,o,u,l,d,p,c,h,f,m,g)=>{r.$b("ConvTranspose",e,{format:d?"NHWC":"NCHW",autoPad:a,dilations:[i],group:n,kernelShape:[s],pads:[o,u],strides:[l],wIsConst:()=>!!(T(),C)[p>>>0],outputPadding:c?Array.from((T(),O).subarray(Number(c)>>>0,Number(h)>>>0)):[],outputShape:f?Array.from((T(),O).subarray(Number(f)>>>0,Number(m)>>>0)):[],activation:eR(g)})},980521:(e,a,i,n,s,o,u,l,d,p,c,h,f,m)=>{r.$b("ConvTranspose",e,{format:l?"NHWC":"NCHW",autoPad:a,dilations:Array.from((T(),O).subarray(Number(i)>>>0,2+(Number(i)>>>0)>>>0)),group:n,kernelShape:Array.from((T(),O).subarray(Number(s)>>>0,2+(Number(s)>>>0)>>>0)),pads:Array.from((T(),O).subarray(Number(o)>>>0,4+(Number(o)>>>0)>>>0)),strides:Array.from((T(),O).subarray(Number(u)>>>0,2+(Number(u)>>>0)>>>0)),wIsConst:()=>!!(T(),C)[d>>>0],outputPadding:p?Array.from((T(),O).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from((T(),O).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:eR(m)})},981182:(e,a)=>{r.$b("GlobalAveragePool",e,{format:a?"NHWC":"NCHW"})},981273:(e,a,i,n,s,o,u,l,d,p,c,h,f,m)=>{r.$b("AveragePool",e,{format:m?"NHWC":"NCHW",auto_pad:a,ceil_mode:i,count_include_pad:n,storage_order:s,dilations:o?Array.from((T(),O).subarray(Number(o)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((T(),O).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((T(),O).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((T(),O).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},981752:(e,a)=>{r.$b("GlobalAveragePool",e,{format:a?"NHWC":"NCHW"})},981843:(e,a,i,n,s,o,u,l,d,p,c,h,f,m)=>{r.$b("AveragePool",e,{format:m?"NHWC":"NCHW",auto_pad:a,ceil_mode:i,count_include_pad:n,storage_order:s,dilations:o?Array.from((T(),O).subarray(Number(o)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((T(),O).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((T(),O).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((T(),O).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},982322:(e,a)=>{r.$b("GlobalMaxPool",e,{format:a?"NHWC":"NCHW"})},982409:(e,a,i,n,s,o,u,l,d,p,c,h,f,m)=>{r.$b("MaxPool",e,{format:m?"NHWC":"NCHW",auto_pad:a,ceil_mode:i,count_include_pad:n,storage_order:s,dilations:o?Array.from((T(),O).subarray(Number(o)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((T(),O).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((T(),O).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((T(),O).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},982884:(e,a)=>{r.$b("GlobalMaxPool",e,{format:a?"NHWC":"NCHW"})},982971:(e,a,i,n,s,o,u,l,d,p,c,h,f,m)=>{r.$b("MaxPool",e,{format:m?"NHWC":"NCHW",auto_pad:a,ceil_mode:i,count_include_pad:n,storage_order:s,dilations:o?Array.from((T(),O).subarray(Number(o)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((T(),O).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((T(),O).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((T(),O).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},983446:(e,a,i,n,s)=>{r.$b("Gemm",e,{alpha:a,beta:i,transA:n,transB:s})},983550:e=>{r.$b("MatMul",e,void 0)},983604:(e,a,i,n)=>{r.$b("ArgMax",e,{keepDims:!!a,selectLastIndex:!!i,axis:n})},983712:(e,a,i,n)=>{r.$b("ArgMin",e,{keepDims:!!a,selectLastIndex:!!i,axis:n})},983820:(e,a)=>{r.$b("Softmax",e,{axis:a})},983883:(e,a)=>{r.$b("Concat",e,{axis:a})},983943:(e,a,i,n,s)=>{r.$b("Split",e,{axis:a,numOutputs:i,splitSizes:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},984099:e=>{r.$b("Expand",e,void 0)},984153:(e,a)=>{r.$b("Gather",e,{axis:Number(a)})},984224:(e,a)=>{r.$b("GatherElements",e,{axis:Number(a)})},984303:(e,a)=>{r.$b("GatherND",e,{batch_dims:Number(a)})},984382:(e,a,i,n,s,o,u,l,d,p,c)=>{r.$b("Resize",e,{antialias:a,axes:i?Array.from((T(),O).subarray(Number(i)>>>0,Number(n)>>>0)):[],coordinateTransformMode:eR(s),cubicCoeffA:o,excludeOutside:u,extrapolationValue:l,keepAspectRatioPolicy:eR(d),mode:eR(p),nearestMode:eR(c)})},984744:(e,a,i,n,s,o,u)=>{r.$b("Slice",e,{starts:a?Array.from((T(),O).subarray(Number(a)>>>0,Number(i)>>>0)):[],ends:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[],axes:o?Array.from((T(),O).subarray(Number(o)>>>0,Number(u)>>>0)):[]})},985008:e=>{r.$b("Tile",e,void 0)},985060:(e,a,i)=>{r.$b("InstanceNormalization",e,{epsilon:a,format:i?"NHWC":"NCHW"})},985174:(e,a,i)=>{r.$b("InstanceNormalization",e,{epsilon:a,format:i?"NHWC":"NCHW"})},985288:e=>{r.$b("Range",e,void 0)},985341:(e,a)=>{r.$b("Einsum",e,{equation:eR(a)})},985422:(e,a,i,n,s)=>{r.$b("Pad",e,{mode:a,value:i,pads:n?Array.from((T(),O).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},985565:(e,a,i,n,s,o)=>{r.$b("BatchNormalization",e,{epsilon:a,momentum:i,spatial:!!s,trainingMode:!!n,format:o?"NHWC":"NCHW"})},985734:(e,a,i,n,s,o)=>{r.$b("BatchNormalization",e,{epsilon:a,momentum:i,spatial:!!s,trainingMode:!!n,format:o?"NHWC":"NCHW"})},985903:(e,a,i)=>{r.$b("CumSum",e,{exclusive:Number(a),reverse:Number(i)})},986e3:(e,a,i)=>{r.$b("DequantizeLinear",e,{axis:a,blockSize:i})},986090:(e,a,i,n,s)=>{r.$b("GridSample",e,{align_corners:a,mode:eR(i),padding_mode:eR(n),format:s?"NHWC":"NCHW"})},986260:(e,a,i,n,s)=>{r.$b("GridSample",e,{align_corners:a,mode:eR(i),padding_mode:eR(n),format:s?"NHWC":"NCHW"})},986430:(e,a)=>{r.$b("ScatterND",e,{reduction:eR(a)})},986515:(e,a,i,n,s,o,u,l,d)=>{r.$b("Attention",e,{numHeads:a,isUnidirectional:i,maskFilterValue:n,scale:s,doRotary:o,qkvHiddenSizes:u?Array.from((T(),O).subarray(Number(l)>>>0,Number(l)+u>>>0)):[],pastPresentShareBuffer:!!d})},986787:e=>{r.$b("BiasAdd",e,void 0)},986842:e=>{r.$b("BiasSplitGelu",e,void 0)},986903:e=>{r.$b("FastGelu",e,void 0)},986959:(e,a,i,n,s,o,u,l,d,p,c,h,f,m,g,y)=>{r.$b("Conv",e,{format:h?"NHWC":"NCHW",auto_pad:a,dilations:i?Array.from((T(),O).subarray(Number(i)>>>0,Number(n)>>>0)):[],group:s,kernel_shape:o?Array.from((T(),O).subarray(Number(o)>>>0,Number(u)>>>0)):[],pads:l?Array.from((T(),O).subarray(Number(l)>>>0,Number(d)>>>0)):[],strides:p?Array.from((T(),O).subarray(Number(p)>>>0,Number(c)>>>0)):[],w_is_const:()=>!!(T(),C)[Number(f)>>>0],activation:eR(m),activation_params:g?Array.from((T(),M).subarray(Number(g)>>>0,Number(y)>>>0)):[]})},987543:e=>{r.$b("Gelu",e,void 0)},987595:(e,a,i,n,s,o,u,l,d)=>{r.$b("GroupQueryAttention",e,{numHeads:a,kvNumHeads:i,scale:n,softcap:s,doRotary:o,rotaryInterleaved:u,smoothSoftmax:l,localWindowSize:d})},987812:(e,a,i,n)=>{r.$b("LayerNormalization",e,{axis:a,epsilon:i,simplified:!!n})},987923:(e,a,i,n)=>{r.$b("LayerNormalization",e,{axis:a,epsilon:i,simplified:!!n})},988034:(e,a,i,n,s,o)=>{r.$b("MatMulNBits",e,{k:a,n:i,accuracyLevel:n,bits:s,blockSize:o})},988161:(e,a,i,n,s,o)=>{r.$b("MultiHeadAttention",e,{numHeads:a,isUnidirectional:i,maskFilterValue:n,scale:s,doRotary:o})},988320:(e,a)=>{r.$b("QuickGelu",e,{alpha:a})},988384:(e,a,i,n,s)=>{r.$b("RotaryEmbedding",e,{interleaved:!!a,numHeads:i,rotaryEmbeddingDim:n,scale:s})},988523:(e,a,i)=>{r.$b("SkipLayerNormalization",e,{epsilon:a,simplified:!!i})},988625:(e,a,i)=>{r.$b("SkipLayerNormalization",e,{epsilon:a,simplified:!!i})},988727:(e,a,i,n)=>{r.$b("GatherBlockQuantized",e,{gatherAxis:a,quantizeAxis:i,blockSize:n})},988848:e=>{r.Fd(e)},988882:(e,a)=>r.Hd(Number(e),Number(a),r.Yc.Kd,r.Yc.errors)};function aU(e,a,i){return tP(async()=>{await r.Dd(Number(e),Number(a),Number(i))})}function aP(){return"u">typeof wasmOffsetConverter}function aL(e,r,a,i){var n=rJ();try{return aa(e,r,a,i)}catch(e){if(rX(n),e!==e+0)throw e;rK(1,0)}}function aj(e,r,a){var i=rJ();try{return r7(e,r,a)}catch(e){if(rX(i),e!==e+0)throw e;rK(1,0)}}function aq(e){var r=rJ();try{r8(e)}catch(e){if(rX(r),e!==e+0)throw e;rK(1,0)}}function aW(e,r){var a=rJ();try{return r6(e,r)}catch(e){if(rX(a),e!==e+0)throw e;rK(1,0)}}function aV(e,r,a){var i=rJ();try{r4(e,r,a)}catch(e){if(rX(i),e!==e+0)throw e;rK(1,0)}}function aF(e,r){var a=rJ();try{ai(e,r)}catch(e){if(rX(a),e!==e+0)throw e;rK(1,0)}}function aG(e,r,a,i,n,s,o){var u=rJ();try{return at(e,r,a,i,n,s,o)}catch(e){if(rX(u),e!==e+0)throw e;rK(1,0)}}function aH(e,r,a,i,n,s){var o=rJ();try{r5(e,r,a,i,n,s)}catch(e){if(rX(o),e!==e+0)throw e;rK(1,0)}}function aK(e,r,a,i){var n=rJ();try{ar(e,r,a,i)}catch(e){if(rX(n),e!==e+0)throw e;rK(1,0)}}function aZ(e,r,a,i,n){var s=rJ();try{r9(e,r,a,i,n)}catch(e){if(rX(s),e!==e+0)throw e;rK(1,0)}}function aQ(e,r,a,i,n,s,o){var u=rJ();try{as(e,r,a,i,n,s,o)}catch(e){if(rX(u),e!==e+0)throw e;rK(1,0)}}function aX(e,r,a,i,n,s,o){var u=rJ();try{ao(e,r,a,i,n,s,o)}catch(e){if(rX(u),e!==e+0)throw e;rK(1,0)}}function aY(e,r,a,i,n,s,o,u){var l=rJ();try{ap(e,r,a,i,n,s,o,u)}catch(e){if(rX(l),e!==e+0)throw e;rK(1,0)}}function aJ(e,r,a,i,n){var s=rJ();try{return an(e,r,a,i,n)}catch(e){if(rX(s),e!==e+0)throw e;rK(1,0)}}function a0(e,r,a){var i=rJ();try{return ac(e,r,a)}catch(e){if(rX(i),e!==e+0)throw e;rK(1,0)}}function a1(e,r,a,i,n,s,o,u){var l=rJ();try{ah(e,r,a,i,n,s,o,u)}catch(e){if(rX(l),e!==e+0)throw e;rK(1,0)}}function a2(e,r,a,i,n,s,o,u,l,d,p,c){var h=rJ();try{au(e,r,a,i,n,s,o,u,l,d,p,c)}catch(e){if(rX(h),e!==e+0)throw e;rK(1,0)}}function a3(e,r,a,i,n,s){var o=rJ();try{return al(e,r,a,i,n,s)}catch(e){if(rX(o),e!==e+0)throw e;rK(1,0)}}function a4(e,r,a){var i=rJ();try{return af(e,r,a)}catch(e){if(rX(i),e!==e+0)throw e;return rK(1,0),0n}}function a6(e,r,a,i,n,s,o,u,l){var d=rJ();try{ae(e,r,a,i,n,s,o,u,l)}catch(e){if(rX(d),e!==e+0)throw e;rK(1,0)}}function a8(e){var r=rJ();try{return am(e)}catch(e){if(rX(r),e!==e+0)throw e;rK(1,0)}}function a5(e,r){var a=rJ();try{return az(e,r)}catch(e){if(rX(a),e!==e+0)throw e;return rK(1,0),0n}}function a9(e){var r=rJ();try{return ag(e)}catch(e){if(rX(r),e!==e+0)throw e;return rK(1,0),0n}}function a7(e,r,a,i){var n=rJ();try{return aw(e,r,a,i)}catch(e){if(rX(n),e!==e+0)throw e;rK(1,0)}}function ie(e,r,a,i,n){var s=rJ();try{return ax(e,r,a,i,n)}catch(e){if(rX(s),e!==e+0)throw e;rK(1,0)}}function it(e,r,a,i,n,s){var o=rJ();try{return ak(e,r,a,i,n,s)}catch(e){if(rX(o),e!==e+0)throw e;rK(1,0)}}function ir(e,r,a,i,n,s){var o=rJ();try{return aS(e,r,a,i,n,s)}catch(e){if(rX(o),e!==e+0)throw e;rK(1,0)}}function ia(e,r,a,i,n,s,o,u){var l=rJ();try{return ad(e,r,a,i,n,s,o,u)}catch(e){if(rX(l),e!==e+0)throw e;rK(1,0)}}function ii(e,r,a,i,n){var s=rJ();try{return aT(e,r,a,i,n)}catch(e){if(rX(s),e!==e+0)throw e;return rK(1,0),0n}}function is(e,r,a,i){var n=rJ();try{return aI(e,r,a,i)}catch(e){if(rX(n),e!==e+0)throw e;rK(1,0)}}function io(e,r,a,i){var n=rJ();try{return aC(e,r,a,i)}catch(e){if(rX(n),e!==e+0)throw e;rK(1,0)}}function iu(e,r,a,i,n,s,o,u,l,d,p,c){var h=rJ();try{return aE(e,r,a,i,n,s,o,u,l,d,p,c)}catch(e){if(rX(h),e!==e+0)throw e;rK(1,0)}}function il(e,r,a,i,n,s,o,u,l,d,p){var c=rJ();try{a$(e,r,a,i,n,s,o,u,l,d,p)}catch(e){if(rX(c),e!==e+0)throw e;rK(1,0)}}function id(e,r,a,i,n,s,o,u,l,d,p,c,h,f,m,g){var y=rJ();try{av(e,r,a,i,n,s,o,u,l,d,p,c,h,f,m,g)}catch(e){if(rX(y),e!==e+0)throw e;rK(1,0)}}function ip(e,r,a){var i=rJ();try{return ay(e,r,a)}catch(e){if(rX(i),e!==e+0)throw e;rK(1,0)}}function ic(e,r,a){var i=rJ();try{return ab(e,r,a)}catch(e){if(rX(i),e!==e+0)throw e;rK(1,0)}}function ih(e,r,a,i){var n=rJ();try{a_(e,r,a,i)}catch(e){if(rX(n),e!==e+0)throw e;rK(1,0)}}function im(){if(0<K)Z=im;else if(n)g?.(r),j();else{for(;0<H.length;)H.shift()(r);0<K?Z=im:(r.calledRun=!0,k||(j(),g?.(r)))}}return n||(aN=await V(),im()),r.PTR_SIZE=4,P?r:new Promise((e,r)=>{g=e,y=r})}eu(eM,{default:()=>eB});var eB,eD,eU,eP,eL,ej,eq,eW,eV,eF,eG,eH,eK,eZ,eQ,eX,eY,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e9,e7,te,tt,tr,ta,ti,tn,ts,to,tu,tl,td,tp,tc,th,tf,tm,tg,ty,tb,t_,t$,tv,tw,tx,tk,tS,tT,tI,tC,tE,tz,tA,tO,tR,tM,tN,tB,tD,tU,tP,tL,tj,tq,tW,tV,tF,tG,tH,tK,tZ,tQ,tX,tY,tJ,t0,t1,t2,t3,t4,t6,t8,t5,t9,t7,re,rt,rr,ra,ri,rn,rs,ro,ru,rl,rd,rp,rc,rh,rf,rm,rg,ry,rb,r_,r$,rv,rw,rx,rk,rS,rT,rI,rC,rE,rz,rA,rO,rR,rM,rN,rB,rD,rU,rP,rL,rj,rq,rW,rV,rF,rG,rH,rK,rZ,rQ,rX,rY,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r9,r7,ae,at,ar,aa,ai,an,as,ao,au,al,ad,ap,ac,ah,af,am,ag,ay,ab,a_,a$,av,aw,ax,ak,aS,aT,aI,aC,aE,az,aA,aO,aR,aM,aN,aB,aD,aU,aP,aL,aj,aq,aW,aV,aF,aG,aH,aK,aZ,aQ,aX,aY,aJ,a0,a1,a2,a3,a4,a6,a8,a5,a9,a7,ie,it,ir,ia,ii,is,io,iu,il,id,ip,ic,ih,im,ig,iy,ib,i_,i$,iv,iw,ix,ik,iS,iT,iI,iC,iE,iz,iA,iO,iR,iM,iN,iB,iD,iU,iP,iL,ij,iq,iW,iV,iF,iG,iH,iK,iZ,iQ,iX,iY,iJ,i0,i1,i2,i3,i4,i6,i8,i5,i9,i7,ne,nt,nr,na,ni,nn,ns,no,nu,nl,nd,np,nc,nh,nf,nm,ng,ny,nb,n_,n$,nv,nw,nx,nk,nS,nT,nI,nC=eo(()=>{eB=eN,globalThis.self?.name?.startsWith("em-pthread")&&eN()}),nE=eo(()=>{eE(),eD=typeof location>"u"?void 0:location.origin,eU=w.url>"file:"&&w.url<"file;",eP=eU?(URL,new URL(new e.U(e.r(19489)).href,eD).href):w.url,eL=()=>{if(eP&&!eP.startsWith("blob:"))return eP.substring(0,eP.lastIndexOf("/")+1)},ej=(e,r)=>{try{let a=r??eP;return(a?new URL(e,a):new URL(e)).origin===eD}catch{return!1}},eq=async e=>{let r=await (await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},eW=async e=>(await import(e)).default,eV=(eR(),el(ez)).default,eF=async()=>{if(!eP)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(ej(eP))return[void 0,eV()];let e=await eq(eP);return[e,eV(e)]},eG=(nC(),el(eM)).default,eH=async(e,r,a,i)=>{let n=eG&&!(e||r);if(n)if(eP)n=ej(eP)||i&&!a;else if(i&&!a)n=!0;else throw Error("cannot determine the script source URL.");if(n)return[void 0,eG];{let i,n,s="ort-wasm-simd-threaded.jsep.mjs",o=e??((e,r)=>{let a=r??eP;try{return(a?new URL(e,a):new URL(e)).href}catch{return}})(s,r),u=a&&o&&!ej(o,r),l=u?await eq(o):o??(i=s,n=r,`${n??"./"}${i}`);return[u?l:void 0,await eW(l)]}}}),nz=eo(()=>{nE(),eZ=!1,eQ=!1,eX=!1,eY=async e=>{if(eZ)return Promise.resolve();if(eQ)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(eX)throw Error("previous call to 'initializeWebAssembly()' failed.");eQ=!0;let r=e.initTimeout,a=e.numThreads;if(!1!==e.simd){if("relaxed"===e.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.")}let i=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();a>1&&!i&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+a+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=a=1);let n=e.wasmPaths,s="string"==typeof n?n:void 0,o=n?.mjs,u=o?.href??o,l=n?.wasm,d=l?.href??l,p=e.wasmBinary,[c,h]=await eH(u,s,a>1,!!p||!!d),f=!1,m=[];if(r>0&&m.push(new Promise(e=>{setTimeout(()=>{f=!0,e()},r)})),m.push(new Promise((e,r)=>{let i={numThreads:a};if(p)i.wasmBinary=p,i.locateFile=e=>e;else if(d||s)i.locateFile=e=>d??s+e;else if(u&&0!==u.indexOf("blob:"))i.locateFile=e=>new URL(e,u).href;else if(c){let e=eL();e&&(i.locateFile=r=>e+r)}h(i).then(r=>{eQ=!1,eZ=!0,eK=r,e(),c&&URL.revokeObjectURL(c)},e=>{eQ=!1,eX=!0,r(e)})})),await Promise.race(m),f)throw Error(`WebAssembly backend initializing failed due to timeout: ${r}ms`)},eJ=()=>{if(eZ&&eK)return eK;throw Error("WebAssembly is not initialized yet.")}}),nA=eo(()=>{nz(),e0=(e,r)=>{let a=eJ(),i=a.lengthBytesUTF8(e)+1,n=a._malloc(i);return a.stringToUTF8(e,n,i),r.push(n),n},e1=(e,r,a,i)=>{if("object"==typeof e&&null!==e){if(a.has(e))throw Error("Circular reference in options");a.add(e)}Object.entries(e).forEach(([e,n])=>{let s=r?r+e:e;if("object"==typeof n)e1(n,s+".",a,i);else if("string"==typeof n||"number"==typeof n)i(s,n.toString());else if("boolean"==typeof n)i(s,n?"1":"0");else throw Error(`Can't handle extra config type: ${typeof n}`)})},e2=e=>{let r=eJ(),a=r.stackSave();try{let a=r.PTR_SIZE,i=r.stackAlloc(2*a);r._OrtGetLastError(i,i+a);let n=Number(r.getValue(i,4===a?"i32":"i64")),s=r.getValue(i+a,"*"),o=s?r.UTF8ToString(s):"";throw Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${o}`)}finally{r.stackRestore(a)}}}),nO=eo(()=>{nz(),nA(),e3=e=>{let r=eJ(),a=0,i=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let s=0;return e?.tag!==void 0&&(s=e0(e.tag,i)),a=r._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,s),0===a&&e2("Can't create run options."),e?.extra!==void 0&&e1(e.extra,"",new WeakSet,(e,n)=>{let s=e0(e,i),o=e0(n,i);0!==r._OrtAddRunConfigEntry(a,s,o)&&e2(`Can't set a run config entry: ${e} - ${n}.`)}),[a,i]}catch(e){throw 0!==a&&r._OrtReleaseRunOptions(a),i.forEach(e=>r._free(e)),e}}}),nR=eo(()=>{nz(),nA(),e4=(e,r,a,i)=>{let n=e0(r,i),s=e0(a,i);0!==eJ()._OrtAddSessionConfigEntry(e,n,s)&&e2(`Can't set a session config entry: ${r} - ${a}.`)},e6=async(e,r,a)=>{for(let i of r.executionProviders){let r="string"==typeof i?i:i.name,n=[];switch(r){case"webnn":if(r="WEBNN",e4(e,"session.disable_quant_qdq","1",a),e4(e,"session.disable_qdq_constant_folding","1",a),"string"!=typeof i){let r=i?.deviceType;r&&e4(e,"deviceType",r,a)}break;case"webgpu":if(r="JS","string"!=typeof i&&i?.preferredLayout){if("NCHW"!==i.preferredLayout&&"NHWC"!==i.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${i.preferredLayout}`);e4(e,"preferredLayout",i.preferredLayout,a)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${r}`)}let s=e0(r,a),o=n.length,u=0,l=0;if(o>0){u=eJ()._malloc(o*eJ().PTR_SIZE),a.push(u),l=eJ()._malloc(o*eJ().PTR_SIZE),a.push(l);for(let e=0;e<o;e++)eJ().setValue(u+e*eJ().PTR_SIZE,n[e][0],"*"),eJ().setValue(l+e*eJ().PTR_SIZE,n[e][1],"*")}await eJ()._OrtAppendExecutionProvider(e,s,u,l,o)!==0&&e2(`Can't append execution provider: ${r}.`)}},e8=async e=>{var r;let a,i=eJ(),n=0,s=[],o=e||{};(r=o).extra||(r.extra={}),r.extra.session||(r.extra.session={}),(a=r.extra.session).use_ort_model_bytes_directly||(a.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(r.enableMemPattern=!1);try{let e=(e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}})(o.graphOptimizationLevel??"all"),r=(e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}})(o.executionMode??"sequential"),a="string"==typeof o.logId?e0(o.logId,s):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw Error(`log verbosity level is not valid: ${l}`);let d="string"==typeof o.optimizedModelFilePath?e0(o.optimizedModelFilePath,s):0;if(n=i._OrtCreateSessionOptions(e,!!o.enableCpuMemArena,!!o.enableMemPattern,r,!!o.enableProfiling,0,a,u,l,d),0===n&&e2("Can't create session options."),o.executionProviders&&await e6(n,o,s),void 0!==o.enableGraphCapture){if("boolean"!=typeof o.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);e4(n,"enableGraphCapture",o.enableGraphCapture.toString(),s)}if(o.freeDimensionOverrides)for(let[e,r]of Object.entries(o.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof r||!Number.isInteger(r)||r<0)throw Error(`free dimension override value must be a non-negative integer: ${r}`);let a=e0(e,s);0!==i._OrtAddFreeDimensionOverride(n,a,r)&&e2(`Can't set a free dimension override: ${e} - ${r}.`)}return void 0!==o.extra&&e1(o.extra,"",new WeakSet,(e,r)=>{e4(n,e,r,s)}),[n,s]}catch(e){throw 0!==n&&0!==i._OrtReleaseSessionOptions(n)&&e2("Can't release session options."),s.forEach(e=>i._free(e)),e}}}),nM=eo(()=>{e5=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},e9=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},e7=(e,r)=>{let a=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i="number"==typeof r?r:r.reduce((e,r)=>e*r,1);return a>0?Math.ceil(i*a):void 0},te=e=>{switch(e){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},tt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},tr=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,ta=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,ti=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}),nN=eo(()=>{eE(),tn=async e=>{if("string"!=typeof e)return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e);{let r=await fetch(e);if(!r.ok)throw Error(`failed to load external data file: ${e}`);let a=r.headers.get("Content-Length"),i=a?parseInt(a,10):0;if(i<0x40000000)return new Uint8Array(await r.arrayBuffer());{if(!r.body)throw Error(`failed to load external data file: ${e}, no response body.`);let a=r.body.getReader(),n;try{n=new ArrayBuffer(i)}catch(e){if(e instanceof RangeError){let e=Math.ceil(i/65536);n=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let s=0;for(;;){let{done:e,value:r}=await a.read();if(e)break;let i=r.byteLength;new Uint8Array(n,s,i).set(r),s+=i}return new Uint8Array(n,0,i)}}}}),nB=eo(()=>{nM(),ts=["V","I","W","E","F"],tl=(e,r)=>{to=e,tu=r},td=(...e)=>{tu&&((e,r)=>{var a,i;let n=tt(e);n>=tt(to)&&(a=n,i="function"==typeof r?r():r,console.log(`[${ts[a]},${new Date().toISOString()}]${i}`))})(...e)}}),nD=eo(()=>{tp=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},tc=class{static calcShape(e,r,a=!1){let i=e.length,n=r.length;if(0===i)return r;if(0===n)return e;let s=Math.max(e.length,r.length),o=Array(s);if(a){if(i<2||n<2)return;let a=tp.calcMatMulShape([e[i-2],e[i-1]],[r[n-2],r[n-1]]);if(void 0===a)return;[o[s-2],o[s-1]]=a}for(let u=a?3:1;u<=s;u++){let a=i-u<0?1:e[i-u],l=n-u<0?1:r[n-u];if(a!==l&&a>1&&l>1)return;let d=Math.max(a,l);if(a&&l)o[s-u]=Math.max(a,l);else{if(d>1)return;o[s-u]=0}}return o}static isValidBroadcast(e,r){let a=e.length,i=r.length;if(a>i)return!1;for(let n=1;n<=a;n++)if(1!==e[a-n]&&e[a-n]!==r[i-n])return!1;return!0}},th=class e{static size(r){return e.getSizeFromDimensionRange(r,0,r.length)}static convertShape(e,r=4){let a=e.length;if(0===a)return[];let i=Array(a),n=a-1;for(;n>=0;){if(e[n]%r==0){i[n]=e[n]/r;break}if(r%e[n]!=0)throw Error("cannot convert shape");i[n]=1,r/=e[n],n--}for(n--;n>=0;n--)i[n]=e[n];return i}static sizeFromDimension(r,a){if(a<0||a>r.length)throw Error(`invalid dimension of ${a} for sizeFromDimension as Tensor has ${r.length} dimensions.`);return e.getSizeFromDimensionRange(r,a,r.length)}static sizeToDimension(r,a){if(a<0||a>r.length)throw Error(`invalid dimension of ${a} for sizeToDimension as Tensor has ${r.length} dimensions.`);return e.getSizeFromDimensionRange(r,0,a)}static getSizeFromDimensionRange(e,r,a){let i=1;for(let n=r;n<a;n++){if(e[n]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(e[n])}return i}static computeStrides(e){let r=e.length;if(0===r)return[];if(1===r)return[1];let a=Array(r);a[r-1]=1,a[r-2]=e[r-1];for(let i=r-3;i>=0;--i)a[i]=a[i+1]*e[i+1];return a}static normalizeAxis(e,r){if(e<-r&&e>=r)throw Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(a=>this.normalizeAxis(a,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(r=>e[r]):e.slice().reverse()}static padShape(e,r){let a=e.length;return e.map((e,i)=>e+r[i]+r[i+a])}static areEqual(e,r){return e.length===r.length&&e.every((e,a)=>e===r[a])}},tf=class e{static adjustPoolAttributes(e,r,a,i,n,s){if(!e&&a.length!==r.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<r.length-2;e++)e>=a.length?a.push(r[e+2]):a[e]=r[e+2];for(let e=0;e<a.length;e++)if(e<i.length){if(i[e]<0)throw Error("strides should be greater than or equal to 1")}else i.push(1);for(let e=0;e<a.length;e++)if(e<n.length){if(n[e]<0)throw Error("dilations should be greater than or equal to 1")}else n.push(1);for(let e=0;e<2*a.length;e++)if(e<s.length){if(s[e]<0)throw Error("pad should be greater than or equal to 1")}else s.push(0);for(let e=0;e<a.length;e++){if(a[e]<=0)throw Error("kernel shapes need to be greater than 0");if(s[e]>=a[e]||s[e+a.length]>=a[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(r,a,i,n,s,o,u){if(u){if(s.length!==2*(r.length-2))throw Error("length of pads should be twice the length of data dimensions");if(a.length!==r.length-2)throw Error("length of strides should be the length of data dimensions");if(n.length!==r.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<r.length-2;l++)e.adjustPadAndReturnShape(r[l+(o?1:2)],a[l],i[l],n[l],s,l,l+r.length-2,u)}}static computePoolOutputShape(r,a,i,n,s,o,u){if(a.length<=0)throw Error("input shape must be of size greater than 0");let l=[a[0],a[1]];return e.computeShapeHelper(r,a,l,i,n,s,o,u),l}static computeConvOutputShape(r,a,i,n,s,o,u){if(r.length<=0||a.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let l=[r[0],a[0]];return e.computeShapeHelper(!1,r,l,i,n,s,o,u),l}static computeShapeHelper(r,a,i,n,s,o,u,l){if(r)for(let e=0;e<a.length-2;e++)i.push(1);else for(let r=0;r<a.length-2;r++)i.push(e.adjustPadAndReturnShape(a[r+2],n[r],s[r],o[r],u,r,r+a.length-2,l))}static adjustPadAndReturnShape(e,r,a,i,n,s,o,u){let l=a*(i-1)+1;if(!u||"NOTSET"===u)return Math.floor((e+n[s]+n[o]-l)/r+1);switch(u){case"VALID":return n[s]=0,n[o]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==a)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let a=((e+r-1)/r-1)*r+i-e;return n[s]=Math.floor("SAME_LOWER"===u?(a+1)/2:a/2),n[o]=a-n[s],Math.floor((e+a-i)/r+1)}default:throw Error("Unsupported AutoPad type")}}},tm=class{static getShapeOfGemmResult(e,r,a,i,n){let s,o,u;if(2!==e.length||2!==a.length)throw Error("shape need to be of size 2");r?(s=e[1],o=e[0]):(s=e[0],o=e[1]);let l=-1;if(i?(u=a[0],l=1):(u=a[1],l=0),a[l]!==o)throw Error("dimension mismatch");if(s<=0||u<=0||o<=0)throw Error("invalid shape specified");if(n&&!tc.isValidBroadcast(n,[s,u]))throw Error("gemm: invalid bias shape for broadcast");return[s,u,o]}},tg=-34028234663852886e22,ty=34028234663852886e22}),nU=eo(()=>{nM(),tb=(e,r)=>new(te(r))(e)}),nP=eo(()=>{nM(),nB(),t_=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),t$=(e,r)=>{if("int32"===r)return e;let a=t_.get(r);if(!a)throw Error(`WebNN backend does not support data type: ${r}`);let i=a/8;if(e.byteLength%i!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,s=new(te(r))(e.buffer,e.byteOffset,n);switch(r){case"int64":case"uint64":{let e=new Int32Array(n);for(let r=0;r<n;r++){let a=s[r];if(a>2147483647n||a<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");e[r]=Number(a)}return new Uint8Array(e.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===r&&s.some(e=>e>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(s,Number).buffer);default:throw Error(`Unsupported data conversion from ${r} to 'int32'`)}},tv=(e,r)=>{if("int32"===r)return e;if(e.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let a=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,a);switch(r){case"int64":return new Uint8Array(BigInt64Array.from(i,BigInt).buffer);case"uint64":if(i.some(e=>e<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(i,BigInt).buffer);case"int8":if(i.some(e=>e<-128||e>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(i,Number).buffer);case"uint8":if(i.some(e=>e<0||e>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number);case"uint32":if(i.some(e=>e<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(i,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${r}`)}},tw=1,tx=()=>tw++,tk=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),tS=(e,r)=>{let a=t_.get(e);if(!a)throw Error(`WebNN backend does not support data type: ${e}`);return r.length>0?Math.ceil(r.reduce((e,r)=>e*r)*a/8):0},tT=class{constructor(e){this.isDataConverted=!1;let{sessionId:r,context:a,tensor:i,dataType:n,shape:s,fallbackDataType:o}=e;this.sessionId=r,this.mlContext=a,this.mlTensor=i,this.dataType=n,this.tensorShape=s,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return tS(this.dataType,this.tensorShape)}destroy(){td("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(!this.fallbackDataType)return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor);{let r=tv(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return e?void(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r):r.buffer}}canReuseTensor(e,r,a){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===a.length&&this.tensorShape.every((e,r)=>e===a[r])}setIsDataConverted(e){this.isDataConverted=e}},tI=class{constructor(e,r){this.tensorManager=e,this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,a,i){let n=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),o;if(!s?.input.dataTypes.includes(r)){if(!(o=tk.get(r))||s?.input.dataTypes.includes(o))throw Error(`WebNN backend does not support data type: ${r}`);td("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,r,a))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==tS(r,a))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,r,a,u,!0,!0,o),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let r=e;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)r=t$(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(r);td("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(e){if(this.activeUpload){let r=this.wrapper?.isDataConverted?tv(this.activeUpload,this.wrapper?.type):this.activeUpload;return e?void(e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r)):r.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},tC=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw Error("MLContext not found for session.");return r}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=tx();return this.tensorTrackersById.set(e,new tI(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,a,i,n){td("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${a}, shape: ${i}, copyOld: ${n}}`);let s=this.tensorTrackersById.get(r);if(!s)throw Error("Tensor not found.");return s.ensureTensor(e,a,i,n)}upload(e,r){let a=this.tensorTrackersById.get(e);if(!a)throw Error("Tensor not found.");a.upload(r)}async download(e,r){td("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let a=this.tensorTrackersById.get(e);if(!a)throw Error("Tensor not found.");return a.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,a,i){let n=this.getMLContext(e),s=tx(),o=new tT({sessionId:e,context:n,tensor:r,dataType:a,shape:i});return this.tensorTrackersById.set(s,new tI(this,o)),this.externalTensors.add(o),s}async getCachedTensor(e,r,a,i,n,s,o){let u=this.getMLContext(e);for(let[i,n]of this.freeTensors.entries())if(n.canReuseTensor(u,r,a)){td("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${o?`fallbackDataType: ${o},`:""} shape: ${a}`);let n=this.freeTensors.splice(i,1)[0];return n.sessionId=e,n}td("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${o?`fallbackDataType: ${o},`:""} shape: ${a}}`);let l=await u.createTensor({dataType:o??r,shape:a,dimensions:a,usage:i,writable:n,readable:s});return new tT({sessionId:e,context:u,tensor:l,dataType:r,shape:a,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},tE=(...e)=>new tC(...e)}),nL=eo(()=>{nM(),nz(),nU(),nP(),nB(),tz=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),tA=class{constructor(e){this.tensorManager=tE(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,tl(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){td("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){td("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let e of r)td("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(-1!==r)return this.mlContextCache[r].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let r=this.mlContextCache.findIndex(r=>((e,r)=>{if(e===r)return!0;if(void 0===e||void 0===r)return!1;let a=Object.keys(e).sort(),i=Object.keys(r).sort();return a.length===i.length&&a.every((a,n)=>a===i[n]&&e[a]===r[a])})(r.options,e));if(-1!==r)return this.mlContextCache[r].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let a=this.sessionIdsByMLContext.get(r);a||(a=new Set,this.sessionIdsByMLContext.set(r,a)),a.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,r.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let a=this.sessionIdsByMLContext.get(r);if(a.delete(e),0===a.size){this.sessionIdsByMLContext.delete(r);let e=this.mlContextCache.findIndex(e=>e.mlContext===r);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){td("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,a,i,n){let s=tz.get(a);if(!s)throw Error(`Unsupported ONNX data type: ${a}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,s,i,n)}async createTemporaryTensor(e,r,a){td("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${a}}`);let i=tz.get(r);if(!i)throw Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,a,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,r){if(!eJ().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");td("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let a=await this.tensorManager.download(e);return tb(a,r)}}registerMLTensor(e,r,a,i){let n=tz.get(a);if(!n)throw Error(`Unsupported ONNX data type: ${a}`);let s=this.tensorManager.registerTensor(e,r,n,i);return td("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerMLConstant(e,r,a,i,n,s,o=!1){if(!s)throw Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=s.get(u);if(!l)throw Error(`File with name ${u} not found in preloaded files.`);if(r+a>l.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(r,r+a).buffer,p;switch(n.dataType){case"float32":p=new Float32Array(d);break;case"float16":p="u">typeof Float16Array&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":o?(p=new Int32Array(t$(new Uint8Array(d),"int64").buffer),n.dataType="int32"):p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return td("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(n,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,r){let a=this.sessionGraphInputs.get(e);return!!a&&a.includes(r)}isGraphOutput(e,r){let a=this.sessionGraphOutputs.get(e);return!!a&&a.includes(r)}isGraphInputOutputTypeSupported(e,r,a=!0){let i=tz.get(e5(r)),n=this.mlOpSupportLimitsBySessionId.get(e);return!(typeof i>"u")&&(a?!!n?.input.dataTypes.includes(i):!!n?.output.dataTypes.includes(i))}flush(){}}}),nj=eo(()=>{}),nq=eo(()=>{nB(),nj(),tO=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),tR=[],tM=e=>16*Math.ceil(Number(e)/16),tN=1,tB=()=>tN++,tD=async(e,r,a,i)=>{let n=tM(a),s=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(r,0,s,0,n),e.flush(),await s.mapAsync(GPUMapMode.READ);let u=s.getMappedRange();if(!i)return new Uint8Array(u.slice(0,a));{let e=i();return e.set(new Uint8Array(u,0,a)),e}}finally{s.destroy()}},tU=class{constructor(e){for(let[r]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,tO))tR.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let a=r.buffer,i=r.byteOffset,n=r.byteLength,s=tM(n),o=this.storageCache.get(e);if(!o)throw Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==n)throw Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${n}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(u.getMappedRange()).set(new Uint8Array(a,i,n)),u.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(u,0,o.gpuData.buffer,0,s),this.backend.device.queue.submit([l.finish()]),u.destroy(),td("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let a=this.storageCache.get(e);if(!a)throw Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(r);if(!i)throw Error("destination gpu data for memcpy does not exist");if(a.originalSize!==i.originalSize)throw Error("inconsistent source and destination gpu data size");let n=tM(a.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(a.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,r,a){let i;if(a){if(i=a[0],e===a[1])return td("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=tB();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:r}),td("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),td("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let a=(e=>{for(let r=0;r<tR.length;r++){let a=tR[r];if(e<=a)return a}return 16*Math.ceil(e/16)})(e),i,n=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||s){let e=(n?this.freeBuffers:this.freeUniformBuffers).get(a);i=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:a,usage:r})}else i=this.backend.device.createBuffer({size:a,usage:r});let o={id:tB(),type:0,buffer:i};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),td("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r="bigint"==typeof e?Number(e):e,a=this.storageCache.get(r);if(!a){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return td("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${a.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(a.gpuData.buffer),a.originalSize}async download(e,r){let a=this.storageCache.get(Number(e));if(!a)throw Error("data does not exist");await tD(this.backend,a.gpuData.buffer,a.originalSize,r)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let r=tO.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let a=this.freeBuffers.get(e.size)||[];void 0===r||a.length>=r?e.destroy():a.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let a=this.freeUniformBuffers.get(e.size)||[];void 0===r||a.length>=r?e.destroy():a.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let r of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(td("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},tP=(...e)=>new tU(...e)}),nW=eo(()=>{tL=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},tj=e=>new tL(e)}),nV=eo(()=>{nM(),nD(),tq=64,tW=(e,r)=>{if(3===r)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return r>1?`vec${r}<f16>`:"f16";case 1:return r>1?`vec${r}<f32>`:"f32";case 6:return r>1?`vec${r}<i32>`:"i32";case 12:return r>1?`vec${r}<u32>`:"u32";case 7:if(r>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(r>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==r)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},tV=(e,r=1)=>{let a=tW(e,r);return"string"==typeof a?a:a[0]},tF=(e,r=1)=>{let a=tW(e,r);return"string"==typeof a?a:a[1]},tG=(...e)=>{let r=[];return e.forEach(e=>{0!==e.length&&r.push({type:12,data:e},{type:12,data:th.computeStrides(e)})}),r},tH=e=>e%4==0?4:e%2==0?2:1,tK=(e="f32",r,a="0")=>r&&1!==r?`vec${r}<${e}>(${a})`:`${e}(${a})`,tZ=(e,r,a)=>"f32"===e?a:1===r?`f32(${a})`:`vec${r}<f32>(${a})`,tQ=(e,r)=>4===r?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===r?`(${e}.x + ${e}.y)`:3===r?`(${e}.x + ${e}.y + ${e}.z)`:e,tX=(e,r,a,i)=>e.startsWith("uniforms.")&&a>4?"string"==typeof r?"f16"===i?`${e}[(${r}) / 8][(${r}) % 8 / 4][(${r}) % 8 % 4]`:`${e}[(${r}) / 4][(${r}) % 4]`:"f16"===i?`${e}[${Math.floor(r/8)}][${Math.floor(r%8/4)}][${r%8%4}]`:`${e}[${Math.floor(r/4)}][${r%4}]`:a>1?`${e}[${r}]`:e,tY=(e,r,a,i,n)=>{let s,o,u,l,d="number"==typeof a,p=d?a:a.length,c=[...Array(p).keys()],h=p<2?"u32":p<=4?`vec${p}<u32>`:`array<u32, ${p}>`,f=tW(r,n),m="string"==typeof f?f:f[1],g={indices:h,value:m,storage:"string"==typeof f?f:f[0],tensor:r},y=e=>"string"==typeof e?e:`${e}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=d?"uniforms.":"",$=`${_}${e}_shape`,v=`${_}${e}_strides`,w="";for(let e=0;e<p-1;e++)w+=`
    let dim${e} = current / ${tX(v,e,p)};
    let rest${e} = current % ${tX(v,e,p)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;w+=`indices[${p-1}] = current;`;let x=p<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,k=[];if(p>=2)for(let e=p-1;e>=0;e--)k.push(`${tX(v,e,p)} * (indices[${e}])`);let S=p<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${k.join("+")};
  }`,T=(...e)=>0===p?"0u":`${g.indices}(${e.map(y).join(",")})`,I=(e,r)=>p<2?`${e}`:`${tX(e,r,p)}`,C={},E=(r,a)=>(()=>{if(g.storage===g.value)return`${e}[${r}]=${a};`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`${e}[${r}]=vec2<u32>(u32(${a}), select(0u, 0xFFFFFFFFu, ${a} < 0));`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`${e}[${r}]=vec2<u32>(u32(${a}), 0u);`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`${e}[${r}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${a}));`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),z=r=>(()=>{if(g.storage===g.value)return`${e}[${r}]`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`i32(${e}[${r}].x)`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`u32(${e}[${r}].x)`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`vec4<bool>(bool(${e}[${r}] & 0xFFu), bool(${e}[${r}] & 0xFF00u), bool(${e}[${r}] & 0xFF0000u), bool(${e}[${r}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),A=p<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${m} {
    return ${z(`i2o_${e}(indices)`)};
  }`,O=p<2?"":(s=c.map(e=>`d${e}: u32`).join(", "),o=c.map(e=>`d${e}`).join(", "),`
  fn get_${e}(${s}) -> ${m} {
    return get_${e}ByIndices(${T(o)});
  }`),R=p<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${m}) {
    ${E(`i2o_${e}(indices)`,"value")}
  }`,M=p<2?"":(u=c.map(e=>`d${e}: u32`).join(", "),l=c.map(e=>`d${e}`).join(", "),`
  fn set_${e}(${u}, value: ${m}) {
    set_${e}ByIndices(${T(l)}, value);
  }`);return{impl:()=>{let e=[],r=!1;return b.offsetToIndices&&(e.push(x),r=!0),b.indicesToOffset&&(e.push(S),r=!0),b.broadcastedIndicesToOffset&&(Object.values(C).forEach(r=>e.push(r)),r=!0),b.set&&(e.push(M),r=!0),b.setByIndices&&(e.push(R),r=!0),b.get&&(e.push(O),r=!0),b.getByIndices&&(e.push(A),r=!0),!d&&r&&e.unshift(`const ${$} = ${g.indices}(${a.join(",")});`,`const ${v} = ${g.indices}(${th.computeStrides(a).join(",")});`),e.join(`
`)},type:g,offsetToIndices:r=>(b.offsetToIndices=!0,p<2?r:`o2i_${e}(${r})`),indicesToOffset:r=>(b.indicesToOffset=!0,p<2?r:`i2o_${e}(${r})`),broadcastedIndicesToOffset:(r,a)=>{b.broadcastedIndicesToOffset=!0;let i=`${a.name}broadcastedIndicesTo${e}Offset`;if(i in C)return`${i}(${r})`;let n=[];for(let e=p-1;e>=0;e--){let r=a.indicesGet("outputIndices",e+a.rank-p);n.push(`${I(v,e)} * (${r} % ${I($,e)})`)}return C[i]=`fn ${i}(outputIndices: ${a.type.indices}) -> u32 {
             return ${n.length>0?n.join("+"):"0u"};
           }`,`${i}(${r})`},indices:T,indicesGet:I,indicesSet:(e,r,a)=>p<2?`${e}=${a};`:`${tX(e,r,p)}=${a};`,set:(...r)=>{if(r.length!==p+1)throw Error(`indices length must be ${p}`);let a=r[p];if("string"!=typeof a)throw Error("value must be string");let i=r.slice(0,p).map(y).join(",");return 0===p?E("0u",a):1===p?E(i[0],a):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${i}, ${a})`)},setByOffset:E,setByIndices:(r,a)=>p<2?E(r,a):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${r}, ${a});`),get:(...r)=>{if(r.length!==p)throw Error(`indices length must be ${p}`);let a=r.map(y).join(",");return 0===p?z("0u"):1===p?z(a[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${a})`)},getByOffset:z,getByIndices:r=>p<2?z(r):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${r})`),usage:i,name:e,strides:v,shape:$,rank:p}},tJ=(e,r,a,i=1)=>tY(e,r,a,"input",i),t0=(e,r,a,i=1)=>tY(e,r,a,"output",i),t1=(e,r,a)=>tY(e,r,a,"atomicOutput",1),t2=(e,r,a,i=1)=>tY(e,r,a,"internal",i),t3=class{constructor(e,r){this.normalizedDispatchGroup=e,this.limits=r,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${"number"==typeof e?`${e}u`:e}) { return; }`}mainStart(e=tq){let r="number"==typeof e?e:e[0],a="number"==typeof e?1:e[1],i="number"==typeof e?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||a>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${r}, ${a}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*a*i>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${r}, ${a}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],s=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*a*i}u + local_idx;`;return`@compute @workgroup_size(${r}, ${a}, ${i})
  fn main(${s}) {
    ${o}
  `}appendVariableUniforms(e){0!==e.rank&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,r){if("internal"===e.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let a="input"===e.usage?"read":"read_write",i="atomicOutput"===e.usage?"atomic<i32>":e.type.storage;return`@group(0) @binding(${r}) var<storage, ${a}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if("internal"!==e.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,r,a=1){return this.uniforms.push({name:e,type:r,length:a}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let e=[];for(let{name:r,type:a,length:i}of this.uniforms)if(i&&i>4)"f16"===a?e.push(`@align(16) ${r}:array<mat2x4<${a}>, ${Math.ceil(i/8)}>`):e.push(`${r}:array<vec4<${a}>, ${Math.ceil(i/4)}>`);else{let n=null==i||1===i?a:`vec${i}<${a}>`;e.push(`${r}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(e=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(e.type)],e.length??1])}},t4=(e,r)=>new t3(e,r)}),nF=eo(()=>{nM(),nD(),nW(),nV(),t6=(e,r)=>0!==r.length?r:[...Array(e).keys()].reverse(),t8=(e,r)=>{let a,i,n=e.dataType,s=e.dims.length,o=t6(s,r),u=(a=e.dims,i=o,th.sortBasedOnPerm(a,t6(a.length,i))),l=e.dims,d=u;if(s<2||((e,r)=>{let a=0;for(let i=0;i<e.length;++i)if(1!==r[e[i]]){if(e[i]<a)return!1;a=e[i]}return!0})(o,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let r=th.size(u);return{outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(r/64/4)},programUniforms:[{type:12,data:Math.ceil(r/4)}]}},getShaderSource:e=>{let r=tJ("input",n,l,4),a=t0("output",n,d,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(r,a)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:p,newPerm:c}=((e,r)=>{let a=[],i=[];for(let n=0;n<e.length;++n)1!==e[n]&&a.push(e[n]),1!==e[r[n]]&&i.push(r[n]);return{newShape:a,newPerm:i}})(e.dims,o),h=th.areEqual(c,[2,3,1]),f=th.areEqual(c,[3,1,2]);return 2===p.length||h||f?(d=[(l=h?[p[0],p[1]*p[2]]:f?[p[0]*p[1],p[2]]:p)[1],l[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let r=th.size(u);return{outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(d[1]/16),y:Math.ceil(d[0]/16)},programUniforms:[{type:12,data:r},...tG(l,d)]}},getShaderSource:e=>{let r=tJ("a",n,l.length),a=t0("output",n,d.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(r,a)}
  var<workgroup> tile : array<array<${a.type.value}, 17>, 16>;
  ${e.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${r.getByIndices(`${r.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${a.setByIndices(`${a.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>{let r=th.size(u);return{outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:[{type:12,data:r},...tG(l,d)]}},getShaderSource:e=>{let r=tJ("a",n,l.length),a=t0("output",n,d.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(r,a)}

  ${((e,r,a,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${a.type.indices} {
    var a: ${a.type.indices};`;for(let a=0;a<r;++a)n+=`a[${e[a]}]=i[${a}];`;return n+"return a;}"})(o,s,r,a)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${a.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${a.setByOffset("global_idx",r.getByIndices("aIndices"))}
  }`}}},t5=(e,r)=>{((e,r)=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if(0!==r.length&&r.length!==e[0].dims.length)throw Error(`perm size ${r.length} does not match input rank ${e[0].dims.length}`)})(e.inputs,r.perm),e.compute(t8(e.inputs[0],r.perm))},t9=e=>tj({perm:e.perm})}),nG=eo(()=>{nM(),nD(),nV(),nH(),nF(),t7={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},re={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},rt={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},rr={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},ra=(e,r,a,i)=>{var n,s,o,u,l,d,p;let c,h,f,m,g,y,b,_=1===e.inputs.length?a:ry(e.inputs,a),$=_.axes;0!==$.length||_.noopWithEmptyAxes||($=e.inputs[0].dims.map((e,r)=>r));let v=th.normalizeAxes($,e.inputs[0].dims.length),w=v,x=e.inputs[0],k=((e,r)=>{let a=[];if(!((e,r)=>{for(let a=0;a<e.length;++a)if(e[e.length-a-1]!==r-1-a)return!1;return!0})(e,r)){for(let i=0;i<r;++i)-1===e.indexOf(i)&&a.push(i);e.forEach(e=>a.push(e))}return a})(w,e.inputs[0].dims.length);k.length>0&&(x=e.compute(t8(e.inputs[0],k),{inputs:[0],outputs:[-1]})[0],w=((e,r)=>{let a=[];for(let i=r-e;i<r;++i)a.push(i);return a})(w.length,x.dims.length));let[S,T]=((e,r)=>{let a=[],i=e.length;for(let n=0;n<i;n++)-1===r.indexOf(n)&&a.push(e[n]);return[a,r.map(r=>e[r])]})(x.dims,w),I=S;_.keepDims&&(I=((e,r)=>{let a=e.length+r.length,i=[],n=0;for(let s=0;s<a;s++)-1===r.indexOf(s)?i.push(e[n++]):i.push(1);return i})(S,v)),e.compute((n=r,s=_.cacheKey,o=[x],u=i,l=e.inputs[0].dataType,d=I,p=T,c=o[0].dims,h=th.size(d),f=th.size(p),m=tJ("_A",o[0].dataType,c),g=t0("output",l,d),y=64,1===h&&(y=256),b=`
          var<workgroup> aBestValues : array<f32, ${y}>;
       `,{name:n,shaderCache:{hint:`${s};${y}`,inputDependencies:["type"]},getShaderSource:e=>`
        ${e.registerUniform("reduceSize","u32").declareVariables(m,g)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(y)}

          let outputIndex = global_idx / ${y};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${rt[u]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${t7[u]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${re[u]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${g.setByOffset("outputIndex",`${"mean"===u?`${g.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${g.type.storage}(${rr[u]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:d,dataType:l}],dispatchGroup:{x:h},programUniforms:[{type:12,data:f}]})}),{inputs:[x]})},ri=(e,r)=>{ra(e,"ReduceMeanShared",r,"mean")},rn=(e,r)=>{ra(e,"ReduceL1Shared",r,"l1")},rs=(e,r)=>{ra(e,"ReduceL2Shared",r,"l2")},ro=(e,r)=>{ra(e,"ReduceLogSumExpShared",r,"logSumExp")},ru=(e,r)=>{ra(e,"ReduceMaxShared",r,"max")},rl=(e,r)=>{ra(e,"ReduceMinShared",r,"min")},rd=(e,r)=>{ra(e,"ReduceProdShared",r,"prod")},rp=(e,r)=>{ra(e,"ReduceSumShared",r,"sum")},rc=(e,r)=>{ra(e,"ReduceSumSquareShared",r,"sumSquare")},rh=(e,r)=>{ra(e,"ReduceLogSumShared",r,"logSum")}}),nH=eo(()=>{nM(),nD(),nW(),nV(),nG(),rf=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},rm=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],rg=(e,r,a,i,n,s,o=!1,u=!1)=>{let l=[],d=a[0].dims,p=d.length,c=th.normalizeAxes(n,p),h=!u&&0===c.length;d.forEach((e,r)=>{h||c.indexOf(r)>=0?o&&l.push(1):l.push(e)});let f=l.length,m=th.size(l);return{name:e,shaderCache:r,getShaderSource:e=>{let r=[],n=tJ("_A",a[0].dataType,p),u=t0("output",s,f),l=i(n,u,c),m=l[2];for(let e=0,a=0;e<p;e++)h||c.indexOf(e)>=0?(o&&a++,m=`for(var j${e}: u32 = 0; j${e} < ${d[e]}; j${e}++) {
                  ${l[2].includes("last_index")?`let last_index = j${e};`:""}
                  ${n.indicesSet("input_indices",e,`j${e}`)}
                  ${m}
                }`):(r.push(`${n.indicesSet("input_indices",e,u.indicesGet("output_indices",a))};`),a++);return`

        ${e.registerUniform("output_size","u32").declareVariables(n,u)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${n.type.indices};
          let output_indices = ${u.offsetToIndices("global_idx")};

          ${r.join(`
`)}
          ${l[0]}       // init ops for reduce max/min
          ${l[1]}
          ${m}
          ${l[3]}
          ${4===l.length?u.setByOffset("global_idx","value"):l.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...tG(d,l)]})}},ry=(e,r)=>{let a=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>a.push(Number(e))),tj({axes:a,keepDims:r.keepDims,noopWithEmptyAxes:r.noopWithEmptyAxes})},rb=(e,r,a,i)=>{let n=e.inputs,s=1===n.length?a:ry(n,a);e.compute(rg(r,{hint:s.cacheKey,inputDependencies:["rank"]},[n[0]],s.noopWithEmptyAxes&&0===s.axes.length?rm:i,s.axes,n[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},r_=(e,r,a)=>{if(0===r.length)return a;let i=1,n=1;for(let a=0;a<r.length;a++)-1===r.indexOf(a)?i*=e[a]:n*=e[a];return n<32&&i>1024},r$=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceMean",i,(e,r,i)=>{let n=1;for(let r=0;r<e.rank;r++)(i.indexOf(r)>=0||0===i.length)&&(n*=a.inputs[0].dims[r]);return["var sum = f32(0);","",`sum += f32(${e.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${n});`]})):ri(e,r)},rv=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceL1",i,(e,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""])):rn(e,r)},rw=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceL2",i,(e,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])):rs(e,r)},rx=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceLogSumExp",i,(e,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"])):ro(e,r)},rk=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceMax",i,(e,r,a)=>{let i=[];for(let r=0;r<e.rank;r++)(a.indexOf(r)>=0||0===a.length)&&i.push(e.indicesSet("input_indices",r,0));return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]})):ru(e,r)},rS=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceMin",i,(e,r,a)=>{let i=[];for(let r=0;r<e.rank;r++)(a.indexOf(r)>=0||0===a.length)&&i.push(`input_indices[${r}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]})):rl(e,r)},rT=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceProd",i,(e,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""])):rd(e,r)},rI=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceSum",i,(e,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""])):rp(e,r)},rC=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceSumSquare",i,(e,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""])):rc(e,r)},rE=(e,r)=>{var a,i;r_(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(a=e,i=r,rf(a.inputs),rb(a,"ReduceLogSum",i,(e,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"])):rh(e,r)}}),nK=eo(()=>{nM(),nW(),nH(),rz=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},rA=(e,r)=>{rz(e.inputs),e.compute(rg("ArgMin",{hint:r.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,a,i)=>{let n=[];for(let r=0;r<e.rank;r++)(i.indexOf(r)>=0||0===i.length)&&n.push(`input_indices[${r}] = 0;`);return[`${n.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${r.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]},[r.axis],7,r.keepDims),{inputs:[0]})},rO=(e,r)=>{rz(e.inputs),e.compute(rg("argMax",{hint:r.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,a,i)=>{let n=[];for(let r=0;r<e.rank;r++)(i.indexOf(r)>=0||0===i.length)&&n.push(`input_indices[${r}] = 0;`);return[`${n.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${r.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]},[r.axis],7,r.keepDims),{inputs:[0]})},rR=e=>tj(e)}),nZ=eo(()=>{nM(),nD(),nj(),nV(),rM=(e,r,a)=>r&&e?`
      let total_sequence_length_input = u32(${r.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${a?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,rN=(e,r,a,i,n,s,o,u,l,d,p,c)=>{var h,f,m,g,y,b,_,$,v,w,x,k,S,T,I,C,E,z,A,O,R,M,N,B,D;let U,P,L,j,q,W,V,F,G,H,K,Z,Q,X,Y,J,ee,et,er,ea,ei,en,es,eo,eu,el,ed,ep,ec,eh,ef,em,eg,ey=Math.min(e.outputCount,1+ +!!o+ +!!u),eb=ey>1?o:void 0,e_=ey>1?u:void 0,e$=ey>1?d.pastSequenceLength:0,ev=e$+d.kvSequenceLength,ew=l&&th.size(l.dims)>0?l:void 0,ex=[r,a];eb&&th.size(eb.dims)>0&&ex.push(eb),ew&&ex.push(ew),p&&ex.push(p),c&&ex.push(c);let ek=e.compute((h=ey,f=r,m=a,g=eb,y=ew,b=d,_=e$,$=p,v=c,U=_+b.kvSequenceLength,P=[b.batchSize,b.numHeads,b.sequenceLength,U],L=h>1&&g,j=b.kvNumHeads?b.kvNumHeads:b.numHeads,q=L?[b.batchSize,j,U,b.headSize]:void 0,W=b.nReps?b.nReps:1,V=0===b.scale?1/Math.sqrt(b.headSize):b.scale,F=tH(b.headSize),G=b.headSize/F,H={x:Math.ceil(U/12),y:Math.ceil(b.sequenceLength/12),z:b.batchSize*b.numHeads},K=[{type:12,data:b.sequenceLength},{type:12,data:G},{type:12,data:U},{type:12,data:b.numHeads},{type:12,data:b.headSize},{type:1,data:V},{type:12,data:_},{type:12,data:b.kvSequenceLength},{type:12,data:W}],Z=L&&g&&th.size(g.dims)>0,Q=["type","type"],Z&&Q.push("type"),y&&Q.push("type"),$&&Q.push("type"),v&&Q.push("type"),X=[{dims:P,dataType:f.dataType,gpuDataType:0}],L&&X.push({dims:q,dataType:f.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${F};${void 0!==y};${void 0!==g};${h}`,inputDependencies:Q},getRunData:()=>({outputs:X,dispatchGroup:H,programUniforms:K}),getShaderSource:e=>{let r=tJ("q",f.dataType,f.dims,F),a=[r,tJ("key",m.dataType,m.dims,F)];if(Z){let e=tJ("past_key",g.dataType,g.dims,F);a.push(e)}y&&a.push(tJ("attention_bias",y.dataType,y.dims));let i=$?tJ("seq_lens",$.dataType,$.dims):void 0;i&&a.push(i);let n=v?tJ("total_sequence_length_input",v.dataType,v.dims):void 0;n&&a.push(n);let s=t0("output",f.dataType,P),o=[s];L&&o.push(t0("present_key",f.dataType,q,F));let u=tF(1,F);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${r.type.storage}, 144>;
  var<workgroup> tileK: array<${r.type.storage}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...a,...o)}
  ${e.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===W?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===W?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${rM(i,n,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${Z&&L?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${L?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${u}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${Z&&L?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${L?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${u}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(F){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${F}`)}})()};
        output[outputIdx] = ${s.type.value} (sum * uniforms.alpha) + ${y?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:ex,outputs:ey>1?[-1,1]:[-1]})[0];e.compute((w=ek,x=d.batchSize,k=d.numHeads,S=e$,T=d.sequenceLength,I=ev,C=p,E=c,Y=tH(C?1:I),J=64,(ee=I/Y)<64&&(J=32),et=[{type:12,data:x},{type:12,data:k},{type:12,data:S},{type:12,data:T},{type:12,data:ee},{type:12,data:Math.ceil(I/Y/J)}],er=tV(w.dataType,Y),ea=tF(1,Y),ei=["type"],C&&ei.push("type"),E&&ei.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${J};${er};${Y}`,inputDependencies:ei},getShaderSource:e=>{let r=t0("x",w.dataType,w.dims,Y),a=[r],i=C?tJ("seq_lens",C.dataType,C.dims):void 0;i&&a.push(i);let n=E?tJ("total_sequence_length_input",E.dataType,E.dims):void 0;n&&a.push(n);let s=tF(w.dataType);return`
  var<workgroup> thread_max: array<f32, ${J}>;
  var<workgroup> thread_sum: array<f32, ${J}>;
  ${e.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...a)}
  ${e.mainStart([J,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${rM(i,n,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${J}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${C?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${ea}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${ea}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(Y){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${Y}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${J}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${ea}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${ea}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(Y){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${Y}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${J}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${r.type.value}(${s}(1.0) / ${s}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${ea}(x[offset + i]);
        x[offset + i] = ${r.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${C?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${r.type.value}(${s}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:T,z:x*k},programUniforms:et})}),{inputs:p&&c?[ek,p,c]:[ek],outputs:[]});let eS=[ek,i];e_&&th.size(e_.dims)>0&&eS.push(e_),p&&eS.push(p),c&&eS.push(c),e.compute((z=ey,A=ek,O=i,R=e_,M=d,N=e$,B=p,D=c,en=N+M.kvSequenceLength,es=M.nReps?M.nReps:1,eo=M.vHiddenSize*es,eu=z>1&&R,el=M.kvNumHeads?M.kvNumHeads:M.numHeads,ed=eu?[M.batchSize,el,en,M.headSize]:void 0,ep=[M.batchSize,M.sequenceLength,eo],ec={x:Math.ceil(M.vHeadSize/12),y:Math.ceil(M.sequenceLength/12),z:M.batchSize*M.numHeads},eh=[{type:12,data:M.sequenceLength},{type:12,data:en},{type:12,data:M.vHeadSize},{type:12,data:M.numHeads},{type:12,data:M.headSize},{type:12,data:eo},{type:12,data:N},{type:12,data:M.kvSequenceLength},{type:12,data:es}],ef=eu&&R&&th.size(R.dims)>0,em=["type","type"],ef&&em.push("type"),B&&em.push("type"),D&&em.push("type"),eg=[{dims:ep,dataType:A.dataType,gpuDataType:0}],eu&&eg.push({dims:ed,dataType:A.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==R};${z}`,inputDependencies:em},getRunData:()=>({outputs:eg,dispatchGroup:ec,programUniforms:eh}),getShaderSource:e=>{let r=tJ("probs",A.dataType,A.dims),a=[r,tJ("v",O.dataType,O.dims)];ef&&a.push(tJ("past_value",R.dataType,R.dims));let i=B?tJ("seq_lens",B.dataType,B.dims):void 0;B&&a.push(i);let n=D?tJ("total_sequence_length_input",D.dataType,D.dims):void 0;D&&a.push(n);let s=[t0("output",A.dataType,ep)];return eu&&s.push(t0("present_value",A.dataType,ed)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${r.type.value}, 144>;
  var<workgroup> tileV: array<${r.type.value}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...a,...s)}
  ${e.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===es?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===es?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${rM(i,n,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${ef&&eu?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${eu?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${r.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${ef&&eu?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${eu?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}),{inputs:eS,outputs:ey>1?[0,2]:[0]})},rB=(e,r)=>{var a,i;let n,s,o,u,l,d,p,c=((e,r)=>{let a=e[0],i=e[1],n=e[2],s=e[3],o=e[4],u=e[5];if(o&&u)throw Error("Attention cannot have both past and attention_bias");if(3!==a.dims.length)throw Error('Input "input" must have 3 dimensions');let l=a.dims[0],d=a.dims[1],p=a.dims[2];if(1!==n.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==i.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==p)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=n.dims[0]/3,h=c,f=h;if(r.qkvHiddenSizes.length>0){if(3!==r.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of r.qkvHiddenSizes)if(e%r.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");c=r.qkvHiddenSizes[0],h=r.qkvHiddenSizes[1],f=r.qkvHiddenSizes[2]}if(c!==h)throw Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==c+h+f)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(o){if(h!==f)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==o.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==o.dims[0])throw Error('Input "past" first dimension must be 2');if(o.dims[1]!==l)throw Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==r.numHeads)throw Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==h/r.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');r.pastPresentShareBuffer||(m=o.dims[3])}let g=d+m;if(s)throw Error("Mask not supported");if(o)throw Error("past is not supported");if(u){if(4!==u.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==r.numHeads||u.dims[2]!==d||u.dims[3]!==g)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:d,totalSequenceLength:g,maxSequenceLength:-1,inputHiddenSize:p,hiddenSize:c,vHiddenSize:f,headSize:Math.floor(c/r.numHeads),vHeadSize:Math.floor(f/r.numHeads),numHeads:r.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:r.maskFilterValue,maskType:0,scale:r.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(e.inputs,r),[h,f,m]=(a=e,n=[(i=c).batchSize,i.numHeads,i.sequenceLength,i.headSize],s=i.sequenceLength,o=i.inputHiddenSize,u=i.headSize,l={x:Math.ceil(i.headSize/12),y:Math.ceil(i.sequenceLength/12),z:i.batchSize*i.numHeads},d=[a.inputs[0],a.inputs[1],a.inputs[2]],p=[{type:12,data:s},{type:12,data:o},{type:12,data:u},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:i.hiddenSize},{type:12,data:i.hiddenSize+i.hiddenSize+i.vHiddenSize}],a.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:a.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:a.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:a.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:p}),getShaderSource:e=>{let r=t0("output_q",d[0].dataType,n),a=t0("output_k",d[0].dataType,n),i=t0("output_v",d[0].dataType,n),s=tJ("input",d[0].dataType,d[0].dims),o=tJ("weight",d[1].dataType,d[1].dims),u=tJ("bias",d[2].dataType,d[2].dims),l=s.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${l}, 144>;
  var<workgroup> tileWeightQ: array<${l}, 144>;
  var<workgroup> tileWeightK: array<${l}, 144>;
  var<workgroup> tileWeightV: array<${l}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(s,o,u,r,a,i)}
  ${e.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${l}(0);
    var valueK = ${l}(0);
    var valueV = ${l}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}},{inputs:d,outputs:[-1,-1,-1]}));return rN(e,h,f,m,e.inputs[4],void 0,void 0,void 0,e.inputs[5],c)}}),nQ=eo(()=>{eC(),nM(),nD(),nW(),nV(),rD=(e,r)=>{let a,{inputs:i,outputCount:n}=e,s=(a={...r,outputCount:n},tj(a));if(A.webgpu.validateInputContent&&((e,r)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let a=(e,r,a)=>{let i=r.length;if(i!==e.length)throw Error(`${a}: num dimensions != ${i}`);r.forEach((r,i)=>{if(r!==e[i])throw Error(`${a}: dim[${i}] do not match`)})};if(e[0].dims.length>1){let i="NHWC"===r.format?r.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,r.spatial?2:void 0);a(e[1].dims,i,"Invalid input scale"),a(e[2].dims,i,"Invalid input B"),a(e[3].dims,i,"Invalid input mean"),a(e[4].dims,i,"Invalid input var")}else a(e[1].dims,[1],"Invalid input scale"),a(e[2].dims,[1],"Invalid input B"),a(e[3].dims,[1],"Invalid input mean"),a(e[4].dims,[1],"Invalid input var")})(i,s),r.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(((e,r)=>{let{epsilon:a,spatial:i,format:n}=r,s=e[0].dims,o=i?tH(s[s.length-1]):1,u="NHWC"===n&&s.length>1?o:1,l=th.size(s)/o,d=i?s.length:s,p=tJ("x",e[0].dataType,e[0].dims,o),c=tJ("scale",e[1].dataType,e[1].dims,u),h=tJ("bias",e[2].dataType,e[2].dims,u),f=tJ("inputMean",e[3].dataType,e[3].dims,u),m=tJ("inputVar",e[4].dataType,e[4].dims,u),g=t0("y",e[0].dataType,d,o);return{name:"BatchNormalization",shaderCache:{hint:`${r.epsilon}_${r.format}_${i}_${o}`,inputDependencies:i?["rank","type","type","type","type"]:void 0},getShaderSource:e=>`
  const epsilon = ${a};
  ${e.registerUniform("outputSize","u32").declareVariables(p,c,h,f,m,g)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
    ${(()=>{let e="";if(i)e=`let cOffset = ${1===s.length?"0u":"NHWC"===n?`outputIndices[${s.length-1}] / ${o}`:"outputIndices[1]"};`;else if("NCHW"===n)e=`
            ${g.indicesSet("outputIndices","0","0")}
            let cOffset = ${g.indicesToOffset("outputIndices")};`;else{e=`var cIndices = ${c.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let r=1;r<c.rank;r++)e+=`cIndices[${r}] = outputIndices[${r}];`;e+=`let cOffset = ${c.indicesToOffset("cIndices")};`}return e})()}
    let scale = ${c.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:i?[{type:12,data:l},...tG(s)]:[{type:12,data:l}]})}})(i,s))}}),nX=eo(()=>{nD(),nV(),rU=e=>{var r;let a,i,n,s,o,u,l,d;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute((a=(r=e.inputs)[0].dims,i=r[0].dims[2],n=th.size(a)/4,s=r[0].dataType,o=tJ("input",s,a,4),u=tJ("bias",s,[i],4),l=tJ("residual",s,a,4),d=t0("output",s,a,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:e=>`
  const channels = ${i}u / 4;
  ${e.declareVariables(o,u,l,d)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${o.getByOffset("global_idx")}
      + ${u.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}))}}),nY=eo(()=>{nM(),nD(),nW(),nV(),rP=(e,r,a,i,n,s=e.dataType,o,u)=>{let l=[{type:12,data:Math.ceil(th.size(e.dims)/4)}];return o&&l.push(...o),{name:r,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:r=>{var n,o,l,d,p,c,h;let f,m,g,y,b;return n=r,o=th.size(e.dims),l=e.dataType,d=s,p=a,c=i,h=u,f=Math.ceil(o/4),m="",m="string"==typeof p?`${p}(a)`:p("a"),g=tJ("inputData",l,[f],4),y=t0("outputData",d,[f],4),b=[{name:"vec_size",type:"u32"}],h&&b.push(...h),`
      ${n.registerUniforms(b).declareVariables(g,y)}

  ${c??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${g.getByOffset("global_idx")};
    ${y.setByOffset("global_idx",m)}
  }`},getRunData:r=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(th.size(r[0].dims)/64/4)},programUniforms:l})}},rL=e=>{e.compute(rP(e.inputs[0],"Abs","abs"))},rj=e=>{e.compute(rP(e.inputs[0],"Acos","acos"))},rq=e=>{e.compute(rP(e.inputs[0],"Acosh","acosh"))},rW=e=>{e.compute(rP(e.inputs[0],"Asin","asin"))},rV=e=>{e.compute(rP(e.inputs[0],"Asinh","asinh"))},rF=e=>{e.compute(rP(e.inputs[0],"Atan","atan"))},rG=e=>{e.compute(rP(e.inputs[0],"Atanh","atanh"))},rH=e=>tj(e),rK=(e,r)=>{let a;switch(r.to){case 10:a="vec4<f16>";break;case 1:a="vec4<f32>";break;case 12:a="vec4<u32>";break;case 6:a="vec4<i32>";break;case 9:a="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${r.to}`)}e.compute(rP(e.inputs[0],"Cast",a,void 0,r.cacheKey,r.to))},rZ=(e,r)=>{let a=r||(e=>{let r,a,i=e.length>=2&&0!==e[1].data,n=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:r=i?e[1].getFloat32Array()[0]:-34028234663852886e22,a=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:r=i?e[1].getUint16Array()[0]:64511,a=n?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return tj({min:r,max:a})})(e.inputs),i=tF(e.inputs[0].dataType);e.compute(rP(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,a.cacheKey,void 0,[{type:e.inputs[0].dataType,data:a.min},{type:e.inputs[0].dataType,data:a.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},rQ=e=>{e.compute(rP(e.inputs[0],"Ceil","ceil"))},rX=e=>{e.compute(rP(e.inputs[0],"Cos","cos"))},rY=e=>{e.compute(rP(e.inputs[0],"Cosh","cosh"))},rJ=e=>tj(e),r0=(e,r)=>{let a=tF(e.inputs[0].dataType);e.compute(rP(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${a}(${r.alpha});

  fn elu_f32(a: ${a}) -> ${a} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${a}>) -> vec4<${a}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,r.cacheKey))},r1=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,r2=e=>{let r=tF(e.inputs[0].dataType);e.compute(rP(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,r1(r)))},r3=e=>{e.compute(rP(e.inputs[0],"Exp","exp"))},r4=e=>{e.compute(rP(e.inputs[0],"Floor","floor"))},r6=e=>{let r=tF(e.inputs[0].dataType);e.compute(rP(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,r1(r)))},r8=(e,r)=>{let a=tF(e.inputs[0].dataType);e.compute(rP(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${a}>(0.0))`,`const leaky_relu_alpha_ = ${a}(${r.alpha});`,r.cacheKey))},r5=e=>{e.compute(rP(e.inputs[0],"Not",e=>`!${e}`))},r9=e=>{e.compute(rP(e.inputs[0],"Neg",e=>`-${e}`))},r7=e=>{e.compute(rP(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},ae=e=>{let r=tF(e.inputs[0].dataType);e.compute(rP(e.inputs[0],"Relu",e=>`select(vec4<${r}>(0.0), ${e}, ${e} > vec4<${r}>(0.0))`))},at=e=>{e.compute(rP(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},ar=e=>tj(e),aa=(e,r)=>{let a=tF(e.inputs[0].dataType);e.compute(rP(e.inputs[0],"HardSigmoid",e=>`max(vec4<${a}>(0.0), min(vec4<${a}>(1.0), ${r.alpha} * ${e} + vec4<${a}>(${r.beta})))`,void 0,r.cacheKey))},ai=e=>{e.compute(rP(e.inputs[0],"Sin","sin"))},an=e=>{e.compute(rP(e.inputs[0],"Sinh","sinh"))},as=e=>{e.compute(rP(e.inputs[0],"Sqrt","sqrt"))},ao=e=>{e.compute(rP(e.inputs[0],"Tan","tan"))},au=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,al=e=>{e.compute(rP(e.inputs[0],"Tanh",au))},ad=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${au("v")};
}
`,ap=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,ac=e=>{let r=tF(e.inputs[0].dataType);e.compute(rP(e.inputs[0],"FastGelu",ap,ad(r),void 0,e.inputs[0].dataType))},ah=(e,r)=>{let a=tF(e.inputs[0].dataType);return e.compute(rP(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${a}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${a}>(${r.alpha});`,r.cacheKey)),0},af=e=>{e.compute(rP(e.inputs[0],"Log","log"))},am=e=>`quick_gelu_impl(${e})`,ag=(e,r)=>{let a,i,n=tF(e.inputs[0].dataType);e.compute(rP(e.inputs[0],"QuickGelu",am,(a=n,i=r.alpha,`
const alpha = vec4<${a}>(${i});
const one = ${a}(1.0);
const zero = ${a}(0.0);

fn quick_gelu_impl(x: vec4<${a}>) -> vec4<${a}> {
  let v = x *alpha;
  var x1 : vec4<${a}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`),r.cacheKey,e.inputs[0].dataType))}}),nJ=eo(()=>{nD(),nV(),nY(),ay=e=>{var r;let a,i,n,s,o,u;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute(((a=(r=e.inputs)[0].dims.slice())[2]=a[2]/2,i=tJ("input",r[0].dataType,r[0].dims,4),n=tJ("bias",r[0].dataType,[r[0].dims[2]],4),s=t0("output",r[0].dataType,a,4),o=th.size(a)/4,u=tV(r[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:e=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${e.declareVariables(i,n,s)}

  ${r1(u)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${s.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}),n0=eo(()=>{nM(),nD(),nV(),ab=(e,r,a,i,n,s)=>{e.compute(((e,r,a,i,n,s,o=a.dataType)=>{let u=a.dims.map(Number),l=i.dims.map(Number),d=!th.areEqual(u,l),p=u,c=th.size(u),h=!1,f=!1,m=[d];if(d){let e=tc.calcShape(u,l,!1);if(!e)throw Error("Can't perform binary op on the given tensors");p=e.slice(),c=th.size(p);let r=1===th.size(u),a=1===th.size(l),i=u.length>0&&u[u.length-1]%4==0,n=l.length>0&&l[l.length-1]%4==0;m.push(r),m.push(a),m.push(i),m.push(n);let s=1;for(let e=1;e<p.length;e++){let r=u[u.length-e];if(r===l[l.length-e])s*=r;else break}s%4==0?(f=!0,h=!0):(r||a||i||n)&&(h=!0)}else h=!0;return m.push(h),{name:e,shaderCache:{hint:r+m.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>((e,r,a,i,n,s,o,u,l,d,p,c)=>{let h,f;"string"==typeof u?h=f=(e,r)=>`${u}((${e}),(${r}))`:"function"==typeof u?h=f=u:(h=u.scalar,f=u.vector);let m=t0("outputData",p,i.length,4),g=tJ("aData",l,r.length,4),y=tJ("bData",d,a.length,4),b;if(n)if(s){let e=1===th.size(r),i=1===th.size(a),n=r.length>0&&r[r.length-1]%4==0,s=a.length>0&&a[a.length-1]%4==0;b=e||i?m.setByOffset("global_idx",f(e?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),i?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"))):`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${y.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(o||n?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||s?y.getByOffset("offsetB / 4u"):`${y.type.value}(${y.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else b=m.setByOffset("global_idx",f(g.getByOffset("global_idx"),y.getByOffset("global_idx")));else{if(!s)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let e=(e,r,a="")=>{let i=`aData[indexA${r}][componentA${r}]`,n=`bData[indexB${r}][componentB${r}]`;return`
            let outputIndices${r} = ${m.offsetToIndices(`global_idx * 4u + ${r}u`)};
            let offsetA${r} = ${g.broadcastedIndicesToOffset(`outputIndices${r}`,m)};
            let offsetB${r} = ${y.broadcastedIndicesToOffset(`outputIndices${r}`,m)};
            let indexA${r} = offsetA${r} / 4u;
            let indexB${r} = offsetB${r} / 4u;
            let componentA${r} = offsetA${r} % 4u;
            let componentB${r} = offsetB${r} % 4u;
            ${e}[${r}] = ${a}(${h(i,n)});
          `};b=9===p?`
            var data = vec4<u32>(0);
            ${e("data",0,"u32")}
            ${e("data",1,"u32")}
            ${e("data",2,"u32")}
            ${e("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e("outputData[global_idx]",0)}
            ${e("outputData[global_idx]",1)}
            ${e("outputData[global_idx]",2)}
            ${e("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(g,y,m)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${b}
      }`})(e,u,l,p,h,d,f,n,a.dataType,i.dataType,o,s),getRunData:()=>({outputs:[{dims:p,dataType:o}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(th.size(p)/4)},...tG(u,l,p)]})}})(r,n??"",e.inputs[0],e.inputs[1],a,i,s))},a_=e=>{ab(e,"Add",(e,r)=>`${e}+${r}`)},a$=e=>{ab(e,"Div",(e,r)=>`${e}/${r}`)},av=e=>{ab(e,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},aw=e=>{ab(e,"Mul",(e,r)=>`${e}*${r}`)},ax=e=>{let r=tJ("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;ab(e,"Pow",{scalar:(e,r)=>`pow_custom(${e},${r})`,vector:(e,r)=>`pow_vector_custom(${e},${r})`},`
    fn pow_custom(a : ${r}, b : ${r}) -> ${r} {
      if (b == ${r}(0.0)) {
        return ${r}(1.0);
      } else if (a < ${r}(0.0) && f32(b) != floor(f32(b))) {
        return ${r}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${r}(1.0), round(f32(abs(b) % ${r}(2.0))) != 1.0) * ${r}(${"i32"===r?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${r}>, b : vec4<${r}>) -> vec4<${r}> {
      // TODO: implement vectorized pow
      return vec4<${r}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},ak=e=>{ab(e,"Sub",(e,r)=>`${e}-${r}`)},aS=e=>{ab(e,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},aT=e=>{ab(e,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},aI=e=>{ab(e,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},aC=e=>{ab(e,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}}),n1=eo(()=>{nM(),nD(),nW(),nV(),aE=(e,r)=>{let a=e.inputs,i=a[0].dims,n=th.normalizeAxis(r.axis,i.length);var s=a,o=n;if(!s||s.length<1)throw Error("too few inputs");let u=s[0],l=u.dataType,d=u.dims.length;s.forEach((e,r)=>{if(0!==r){if(e.dataType!==l)throw Error("input tensors should be one type");if(e.dims.length!==d)throw Error("input tensors should have the same shape");e.dims.forEach((e,r)=>{if(r!==o&&e!==u.dims[r])throw Error("non concat dimensions must match")})}});let p=i.slice();p[n]=a.reduce((e,r)=>e+(r.dims.length>n?r.dims[n]:0),0);let c=a.filter(e=>th.size(e.dims)>0);e.compute(((e,r,a,i)=>{let n=th.size(a),s=Array(e.length),o=Array(e.length),u=0,l=[],d=[],p=[{type:12,data:n}];for(let a=0;a<e.length;++a)u+=e[a].dims[r],s[a]=u,d.push(e[a].dims.length),o[a]=tJ(`input${a}`,i,d[a]),l.push("rank"),p.push({type:12,data:s[a]});for(let r=0;r<e.length;++r)p.push(...tG(e[r].dims));p.push(...tG(a));let c=t0("output",i,a.length),h=c.indicesGet("indices",r),f=Array.from(Array(s.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(",");return{name:"Concat",shaderCache:{hint:`${r}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p}),getShaderSource:r=>{let a,i;return`

  ${(()=>{r.registerUniform("outputSize","u32");for(let a=0;a<e.length;a++)r.registerUniform(`sizeInConcatAxis${a}`,"u32");return r.declareVariables(...o,c)})()}

  ${a=s.length,i=f,`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${a}u>(${i});
    for (var i: u32 = 0u; i < ${a}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${a}u;
  }`}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${f});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${((e,r)=>{let a=e.length,i=[];for(let n=0;n<a;++n){let s=r.setByOffset("global_idx",e[n].getByIndices("indices"));1===a?i.push(s):0===n?i.push(`if (inputIndex == ${n}u) { ${s} }`):n===a-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${n}) { ${s} }`)}return i.join(`
`)})(o,c)}
  }`}}})(c,n,p,a[0].dataType),{inputs:c})},az=e=>tj({axis:e.axis})}),n2=eo(()=>{nM(),nD(),aA=(e,r,a="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${r}(0.0));`;case"Sigmoid":return`value = (${r}(1.0) / (${r}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${r}(${a}(uniforms.clip_min)), ${r}(${a}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${r}(0.0), min(${r}(1.0), ${a}(uniforms.alpha) * value + ${a}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${a}(uniforms.alpha) * value, value, value >= ${r}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},aO=(e,r)=>{"Clip"===e.activation?r.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?r.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&r.push({type:1,data:e.alpha})},aR=(e,r)=>{"Clip"===e.activation?r.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?r.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&r.push({name:"alpha",type:"f32"})},aM=e=>{let r=e?.activation||"";if("HardSigmoid"===r){let[a,i]=e?.activation_params||[.2,.5];return{activation:r,alpha:a,beta:i}}if("Clip"===r){let[a,i]=e?.activation_params||[tg,ty];return{activation:r,clipMax:i,clipMin:a}}if("LeakyRelu"===r){let[a]=e?.activation_params||[.01];return{activation:r,alpha:a}}return{activation:r}}}),n3=eo(()=>{aN=(e,r)=>{switch(e){case 1:return r;case 2:return`vec2<${r}>`;case 3:return`vec3<${r}>`;case 4:return`vec4<${r}>`;default:throw Error(`${e}-component is not supported.`)}},aB=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),n4=eo(()=>{aD=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),n6=eo(()=>{nM(),nD(),nV(),n2(),aU=(e,r,a,i,n)=>{let s=i-a;return`
      ${Array.from({length:a}).map((a,o)=>`
      if (${tX(r.shape,o,r.rank)} != 1) {
        ${r.indicesSet(e,o,tX(n,o+s,i))}
      } else {
        ${r.indicesSet(e,o,0)}
      }`).join("")}
`},aP=(e,r,a,i,n=!1,s)=>{let o=e[0].dims,u=e[1].dims,l=o[o.length-2],d=u[u.length-1],p=o[o.length-1],c=tH(d),h=tH(p),f=tH(l),m=th.size(a)/c/f,g=e.length>2,y=i?i.slice(0,-2):a.slice(0,-2),b=[th.size(y),l,d],_=[{type:12,data:m},{type:12,data:l},{type:12,data:d},{type:12,data:p}];return aO(r,_),_.push(...tG(y,o,u)),g&&_.push(...tG(e[2].dims)),_.push(...tG(b)),{name:"MatMulNaive",shaderCache:{hint:`${r.activation};${c};${h};${f};${n}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(a):a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:i=>{let s=t2("batch_dims",e[0].dataType,y.length),l=tJ("a",e[0].dataType,o.length,h),d=tJ("b",e[1].dataType,u.length,c),p=t0("output",e[0].dataType,b.length,c),m=tV(p.type.tensor),_=aA(r,p.type.value,m),$=[l,d],v="";if(g){let r=n?c:1;$.push(tJ("bias",e[2].dataType,e[2].dims.length,r)),v=`${n?`value += bias[col / ${r}];`:`value += ${p.type.value}(bias[row + i]);`}`}let w=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return aR(r,w),`
  ${i.registerUniforms(w).registerInternalVariables(s).declareVariables(...$,p)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${2===a.length?"":`let batch_indices = ${s.offsetToIndices("batch")};`}

    var a_indices: ${l.type.indices};
    ${aU("a_indices",l,l.rank-2,s.rank,"batch_indices")}
    ${l.indicesSet("a_indices",l.rank-2,0)}
    ${l.indicesSet("a_indices",l.rank-1,0)}
    let a_offset = ${l.indicesToOffset("a_indices")};

    var b_indices: ${d.type.indices};
    ${aU("b_indices",d,d.rank-2,s.rank,"batch_indices")}
    ${d.indicesSet("b_indices",d.rank-2,0)}
    ${d.indicesSet("b_indices",d.rank-1,0)}
    let b_offset = ${d.indicesToOffset("b_indices")};
    var values: array<${p.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${(()=>{let e=`var a_data: ${l.type.value};`;for(let r=0;r<h;r++)e+=`
              let b_data${r} = b[(b_offset + (k + ${r}) * uniforms.N + col) / ${c}];`;for(let r=0;r<f;r++){e+=`a_data = a[(a_offset + (row + ${r}) * uniforms.K + k) / ${h}];`;for(let a=0;a<h;a++)e+=`
            values[${r}] = fma(${d.type.value}(a_data${1===h?"":`[${a}]`}), b_data${a}, values[${r}]);
`}return e})()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${v}
      ${_}
      let cur_indices = ${p.type.indices}(batch, row + i, col);
      let offset = ${p.indicesToOffset("cur_indices")};
      ${p.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `}}}}),n8=eo(()=>{nM(),nD(),nV(),n2(),n6(),n3(),aL=(e,r,a="f32",i,n=!1,s=32,o=!1,u=32)=>{let l,d,p,c,h=r[1]*e[1],f=r[0]*e[0],m=n?h:s,g=n?s:h,y=m/r[0],b=s/r[1];if(!((n&&4===y&&4===e[1]||!n&&(3===y||4===y))&&m%r[0]==0&&s%r[1]==0&&4===e[0]))throw Error(`If transposeA ${n} is true, innerElementSize ${y} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${r[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${r[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${a}>, ${m/y}>, ${g}>;
var<workgroup> mm_Bsub: array<array<vec4<${a}>, ${f/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${y};
const tileInner = ${s};

@compute @workgroup_size(${r[0]}, ${r[1]}, ${r[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${h};

  let num_tiles = ${o?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${a}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${l=n,d=i,l?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${d?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${d?", batchIndices":""});
        `}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${3===y?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${p=n,c=y,p?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${3===c?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${3===c?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${3===c?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},aj=(e,r)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${r?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${r?", batchIndices":""});
            `,aq=(e,r,a="f32",i,n=!1,s=32,o=!1,u=32,l=!1)=>{let d=e[1]*r[1],p=e[0]*r[0],c=n?d:s,h=n?s:d;if(h%r[1]!=0||c%r[0]!=0||s%r[1]!=0)throw Error(`tileAHight ${h} must be divisible by workgroupSize[1]${r[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${r[0]}, tileInner ${s} must be divisible by workgroupSize[1]${r[1]}`);let f=h/r[1],m=c/r[0],g=s/r[1],y=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${r[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${r[0]}) {
          ${aj(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${r[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${r[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${a}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${r[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${r[1]}];`:`mm_Asub[localRow + innerRow * ${r[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${r[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${r[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${g};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${aj(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${a}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];"}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${a}, ${c}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${a}, ${p}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${r[0]}, ${r[1]}, ${r[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${a}, colPerThread>, rowPerThread>;
    ${y}
  }
`},aW=(e,r,a,i,n=!1,s)=>{let o=e[0].dims,u=e[1].dims,l=o.slice(0,-2),d=u.slice(0,-2),p=i?i.slice(0,-2):a.slice(0,-2),c=th.size(p),h=o[o.length-2],f=o[o.length-1],m=u[u.length-1],g=f%4==0&&m%4==0,y=h<=8?[4,1,1]:[4,4,1],b=[8,8,1],_=[Math.ceil(m/b[0]/y[0]),Math.ceil(h/b[1]/y[1]),Math.ceil(c/b[2]/y[2])],$=g?4:1,v=[...l,h,f/$],w=v.length,x=[...d,f,m/$],k=x.length,S=[c,h,m/$],T=[{type:6,data:h},{type:6,data:m},{type:6,data:f}];aO(r,T),T.push(...tG(p,v,x));let I=["rank","rank"],C=e.length>2;return C&&(T.push(...tG(e[2].dims)),I.push("rank")),T.push(...tG(S)),{name:"MatMul",shaderCache:{hint:`${y};${r.activation};${g};${n}`,inputDependencies:I},getRunData:()=>({outputs:[{dims:s?s(a):a,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:T}),getShaderSource:a=>{let i=p.length,s=t2("batchDims",e[0].dataType,i,1),o=tV(e[0].dataType),u=tJ("a",e[0].dataType,w,$),l=tJ("b",e[1].dataType,k,$),d=t0("result",e[0].dataType,S.length,$),c=[u,l];if(C){let r=n?$:1;c.push(tJ("bias",e[2].dataType,e[2].dims.length,r))}let h=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];aR(r,h);let f=tV(d.type.tensor),m=((e,r,a,i,n=!1)=>{let[s,o,u,l]=i,d=tV(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${aN(e,d)} {
      var value = ${aN(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${aU("aIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${aN(e,d)} {
      var value = ${aN(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${aU("bIndices",u,u.rank-2,s.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${aN(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${r?`value = value + ${n?"bias[colIn]":`${aN(e,d)}(bias[row])`};`:""}
        ${a}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})($,C,aA(r,d.type.value,f),[s,u,l,d],n);return`
  ${a.registerUniforms(h).registerInternalVariables(s).declareVariables(...c,d)}
  ${m}
  ${g?aL(y,b,o,s):aq(y,b,o,s)}
                   `}}}}),n5=eo(()=>{nM(),nB(),nV(),n2(),n3(),n4(),n8(),aV=(e,r,a,i,n,s,o,u,l)=>{let d="NHWC"===r.format,p=d?e[0].dims[3]:e[0].dims[1],c=a[0],h=d?a[2]:a[3],f=d?a[1]:a[2],m=d?a[3]:a[1],g=d&&(p%4==0||p%3==0)&&m%4==0,y=d?m:h*f,b=d?h*f:m,_=[8,8,1],$=i<=8?[4,1,1]:[4,4,1],v=[Math.ceil(y/_[0]/$[0]),Math.ceil(b/_[1]/$[1]),Math.ceil(c/_[2]/$[2])];td("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${v}`);let w=g?d&&p%4!=0?3:4:1,x=_[1]*$[1],k=_[0]*$[0],S=Math.max(_[0]*w,_[1]),T=i%x==0,I=n%k==0,C=s%S==0,E=g?[w,4,4]:[1,1,1],z=[{type:6,data:i},{type:6,data:n},{type:6,data:s},{type:6,data:[r.pads[0],r.pads[1]]},{type:6,data:r.strides},{type:6,data:r.dilations}];aO(r,z),z.push(...tG(e[0].dims,e[1].dims));let A=["rank","rank"];return o&&(z.push(...tG(e[2].dims)),A.push("rank")),z.push(...tG(a)),{name:"Conv2DMatMul",shaderCache:{hint:`${r.cacheKey};${w};${g};${T};${I};${C};${x};${k};${S}`,inputDependencies:A},getRunData:()=>({outputs:[{dims:l?l(a):a,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:z}),getShaderSource:i=>{let n=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];aR(r,n);let s=g?4:1,l=tV(e[0].dataType),p=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${l}>`:l}) {
        result[flatIndex] = ${g?`vec4<${l}>`:l}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${l}>`:l}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,c=[tJ("x",e[0].dataType,e[0].dims.length,3===w?1:w),tJ("w",e[1].dataType,e[1].dims.length,s)],h=t0("result",e[0].dataType,a.length,s);if(o){let r=tJ("bias",e[2].dataType,e[2].dims.length,s);c.push(r),p+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${l}>`:l} {
          return bias[coords.${d?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${aD("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${i.registerUniforms(n).declareVariables(...c,h)}
        ${p}
        ${((e,r,a,i,n=!1,s,o=4,u=4,l=4,d="f32")=>{let p=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},c=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,f=e?"row":"col",m=e?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${f} / outWidth;
    let outCol = ${f} % outWidth;

    let WRow = ${m} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${m} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${m} % inChannels;
    var resData = ${aN(o,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])"} && xCol >= 0 && xCol < ${e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])"}) {
      ${c}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${(e=>{switch(e){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${e} is not supported.`)}})(o)}
    }
    return resData;`,y=e?r&&i?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${aN(o,d)}(0.0);`:i&&a?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${aN(o,d)}(0.0);`,b=e?i&&a?p(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(u)}
    }
    return ${aN(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(u)}
    }
    return ${aN(u,d)}(0.0);`,_=aN(l,d),$=e?aN(o,d):aN(u,d),v=e?aN(u,d):aN(o,d),w=aA(s,_,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${$} {
      ${e?y:b}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${v} {
      ${e?b:y}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${_}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${aB(n)}
      ${w}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(d,T,I,C,o,r,E[0],E[1],E[2],l)}
        ${g?aL($,_,l,void 0,!d,S):aq($,_,l,void 0,!d,S,!1,void 0,u)}`}}}}),n9=eo(()=>{nM(),nB(),nD(),nV(),n2(),n3(),aF=e=>"number"==typeof e?[e,e,e]:e,aG=(e,r)=>r<=1?e:e+(e-1)*(r-1),aH=(e,r,a,i,n)=>{null==n&&(n=((e,r,a,i=1)=>{let n=aG(r,i);return Math.floor((e[0]*(a-1)-a+n)/2)})(e,r[0],i[0]));let s=[0,0,0,a];for(let a=0;a<3;a++)e[a]+2*n>=r[a]&&(s[a]=Math.trunc((e[a]-r[a]+2*n)/i[a]+1));return s},aK=(e,r,a,i,n,s=!1,o="channelsLast")=>{let u,l,d,p,c;if("channelsLast"===o)[u,l,d,p,c]=e;else if("channelsFirst"===o)[u,c,l,d,p]=e;else throw Error(`Unknown dataFormat ${o}`);let[h,,f,m,g]=r,[y,b,_]=aF(a),[$,v,w]=aF(i),x=aG(f,$),k=aG(m,v),S=aG(g,w),{padInfo:T,outDepth:I,outHeight:C,outWidth:E}=((e,r,a,i,n,s,o,u,l,d)=>{let p,c,h,f;if("VALID"===e&&(e=0),"number"==typeof e){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=aH([r,a,i,1],[u,l,d],1,[n,s,o],e);c=m[0],h=m[1],f=m[2]}else if(Array.isArray(e)){if(!e.every((e,r,a)=>e===a[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=aH([r,a,i,1],[u,l,d],1,[n,s,o],e[0]);c=m[0],h=m[1],f=m[2]}else if("SAME_UPPER"===e){c=Math.ceil(r/n),h=Math.ceil(a/s),f=Math.ceil(i/o);let e=(c-1)*n+u-r,m=(h-1)*s+l-a,g=(f-1)*o+d-i,y=Math.floor(e/2),b=Math.floor(m/2),_=Math.floor(g/2);p={top:b,bottom:m-b,left:_,right:g-_,front:y,back:e-y}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:c,outHeight:h,outWidth:f}})(n,l,d,p,y,b,_,x,k,S),z=s?h*c:h,A=[0,0,0,0,0];return"channelsFirst"===o?A=[u,z,I,C,E]:"channelsLast"===o&&(A=[u,I,C,E,z]),{batchSize:u,dataFormat:o,inDepth:l,inHeight:d,inWidth:p,inChannels:c,outDepth:I,outHeight:C,outWidth:E,outChannels:z,padInfo:T,strideDepth:y,strideHeight:b,strideWidth:_,filterDepth:f,filterHeight:m,filterWidth:g,effectiveFilterDepth:x,effectiveFilterHeight:k,effectiveFilterWidth:S,dilationDepth:$,dilationHeight:v,dilationWidth:w,inShape:e,outShape:A,filterShape:r}},aZ=(e,r,a,i,n,s)=>{let o="channelsLast"===s,u=[Math.ceil((e=>{let r=1;for(let a=0;a<e.length;a++)r*=e[a];return r})((o?e[0].dims[3]:e[0].dims[1],{x:a.map((e,r)=>r)}).x.map(e=>a[e]))/64),1,1];td("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let l=[{type:12,data:th.size(a)},{type:12,data:i},{type:12,data:n},{type:12,data:r.strides},{type:12,data:r.dilations}];aO(r,l),l.push(...tG(e[0].dims,e[1].dims));let d=["rank","rank"],p=3===e.length;return p&&(l.push(...tG(e[2].dims)),d.push("rank")),l.push(...tG(a)),{name:"Conv3DNaive",shaderCache:{hint:`${r.cacheKey};${o};1;${p}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:l}),getShaderSource:s=>{let u=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:r.strides.length},{name:"dilations",type:"u32",length:r.dilations.length}];aR(r,u);let l=tV(e[0].dataType),d=tJ("x",e[0].dataType,e[0].dims.length,1),c=tJ("W",e[1].dataType,e[1].dims.length,1),h=[d,c],f=t0("result",e[0].dataType,a.length,1),m="";if(p){let r=tJ("bias",e[2].dataType,e[2].dims.length,1);h.push(r),m+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l} {
          return bias[${o?tX("coords",4,5):tX("coords",1,5)}];
        }`}let g=aN(1,l),y=aA(r,g,l);return`
            ${m}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${d.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${c.getByIndices("aIndices")};
            }
          ${s.registerUniforms(u).declareVariables(...h,f)}
          ${s.mainStart()}
          ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${f.offsetToIndices("global_idx")};
              let batch = ${tX("coords",0,d.rank)};
              let d2 = ${o?tX("coords",d.rank-1,d.rank):tX("coords",1,d.rank)};
              let xFRCCorner = vec3<u32>(${o?tX("coords",1,d.rank):tX("coords",2,d.rank)},
              ${o?tX("coords",2,d.rank):tX("coords",3,d.rank)},
              ${o?tX("coords",3,d.rank):tX("coords",4,d.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?tX("uniforms.x_shape",1,d.rank):tX("uniforms.x_shape",2,d.rank)};
              let xShapeZ = ${o?tX("uniforms.x_shape",2,d.rank):tX("uniforms.x_shape",3,d.rank)};
              let xShapeW = ${o?tX("uniforms.x_shape",3,d.rank):tX("uniforms.x_shape",4,d.rank)};
              let xShapeU = ${o?tX("uniforms.x_shape",4,d.rank):tX("uniforms.x_shape",1,d.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${p?"value = value + getBiasByOutputCoords(coords)":""};
              ${y}
              result[global_idx] = f32(value);
          }`}}}}),n7=eo(()=>{nM(),nD(),nV(),n2(),aQ=(e,r,a,i)=>{let n=e.length>2,s=n?"value += b[output_channel];":"",o=e[0].dims,u=e[1].dims,l="NHWC"===r.format,d=l?a[3]:a[1],p=d/r.group,c=l&&p>=4?tH(d):1,h=th.size(a)/c,f=[{type:12,data:h},{type:12,data:r.dilations},{type:12,data:[r.strides[0],r.strides[1]]},{type:12,data:[r.pads[0],r.pads[1]]},{type:12,data:p}];return aO(r,f),f.push(...tG(o,[u[0],u[1],u[2],u[3]/c])),f.push(...tG([a[0],a[1],a[2],a[3]/c])),{name:"GroupedConv",shaderCache:{hint:`${r.cacheKey}_${c}`,inputDependencies:n?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(a):a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:i=>{let d=t0("output",e[0].dataType,a.length,c),p=tV(d.type.tensor),h=aA(r,d.type.value,p),f=tJ("x",e[0].dataType,o.length),m=tJ("w",e[1].dataType,u.length,c),g=[f,m];n&&g.push(tJ("b",e[2].dataType,e[2].dims,c));let y=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:r.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];aR(r,y);let b=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${f.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${m.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${f.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${m.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${i.registerUniforms(y).declareVariables(...g,d)}

  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${d.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${d.type.value} = ${d.type.value}(0);
    ${b}
    ${s}
    ${h}
    ${d.setByOffset("global_idx","value")}
  }`}}},aX=(e,r,a,i)=>{let n=e.length>2,s=tH(a[3]),o=tH(a[2]),u=th.size(a)/s/o,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],p=[a[0],a[1],a[2],a[3]/s],c=[{type:12,data:u},{type:6,data:[r.strides[0],r.strides[1]]},{type:6,data:[r.pads[0],r.pads[1]]}];aO(r,c),c.push(...tG(l,d,p));let h=(o-1)*r.strides[1]+d[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${r.cacheKey};${s};${o};${h};${d[0]};${d[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(a):a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:a=>{let i=t0("output",e[0].dataType,p.length,s),u=tV(i.type.tensor),c=aA(r,i.type.value,u),f=tJ("x",e[0].dataType,l.length,s),m=tJ("w",e[1].dataType,d.length,s),g=[f,m];n&&g.push(tJ("b",e[2].dataType,e[2].dims,s));let y=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return aR(r,y),`
  ${a.registerUniforms(y).declareVariables(...g,i)}
  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${f.type.value}, ${h}>;
    var values: array<${i.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${f.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${f.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${m.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${n?"value += b[output_channel];":""}
      ${c}
      ${i.set("batch","row","col + i","output_channel","value")};
    }
  }`}}}}),se=eo(()=>{nD(),n5(),n9(),n8(),n7(),n2(),n6(),nF(),aY=[2,3,1,0],aJ=(e,r)=>{let a=e.kernelShape.slice();a.length<r[1].dims.length-2&&a.push(...Array(r[1].dims.length-2-a.length).fill(0));for(let e=2;e<r[1].dims.length;++e)0===a[e-2]&&(a[e-2]=r[1].dims[e]);let i=e.pads.slice();tf.adjustPadsBasedOnAutoPad(r[0].dims,e.strides,e.dilations,a,i,"NHWC"===e.format,e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:a,pads:i}),n},a0=e=>{let r=aM(e),a=e.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],format:a,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...r,cacheKey:`${e.format};${r.activation};`}},a1=(e,r,a,i)=>{var n,s,o,u,l,d;let p,c,h,f,m,g,y="NHWC"===a.format,b=(n=r[0].dims,s=r[1].dims,o=a.dilations,u=a.pads,l=a.strides,d=y,p=n[0],h=(c=n.slice(d?1:2,d?3:4)).length,f=s[0],m=s.slice(2).map((e,r)=>e+(e-1)*(o[r]-1)),(g=c.map((e,r)=>e+u[r]+u[r+h]).map((e,r)=>Math.floor((e-m[r]+l[r])/l[r]))).splice(0,0,p),g.splice(d?3:1,0,f),g);if(1!==a.group){let n=[r[0]];if(y){let i=e.kernelCustomData.wT??e.compute(t8(r[1],aY),{inputs:[1],outputs:[a.wIsConst?-2:-1]})[0];a.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i),n.push(i)}else n.push(r[1]);3===r.length&&n.push(r[2]),!e.adapterInfo.isArchitecture("ampere")&&y&&r[1].dims[0]===a.group&&1===r[1].dims[1]&&1===a.dilations[0]&&1===a.dilations[1]?e.compute(aX(n,a,b,i),{inputs:n}):e.compute(aQ(n,a,b,i),{inputs:n});return}let _=3===r.length,$=r[0].dims[y?1:2],v=r[0].dims[y?2:3],w=r[0].dims[y?3:1],x=r[1].dims[2],k=r[1].dims[3],S=b[y?1:2],T=b[y?2:3],I=b[y?3:1],C=y&&x===$&&k===v&&0===a.pads[0]&&0===a.pads[1];if(C||1===x&&1===k&&1===a.dilations[0]&&1===a.dilations[1]&&1===a.strides[0]&&1===a.strides[1]&&0===a.pads[0]&&0===a.pads[1]){let n=b[0],s,o,u,l=[];if(y){let i=e.kernelCustomData.wT??e.compute(t8(r[1],aY),{inputs:[1],outputs:[a.wIsConst?-2:-1]})[0];if(a.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i),C){let e=$*v*w;s=r[0].reshape([1,n,e]),o=i.reshape([1,e,I]),u=[1,n,I]}else s=r[0].reshape([n,$*v,w]),o=i.reshape([1,w,I]),u=[n,S*T,I];l.push(s),l.push(o)}else s=r[0].reshape([n,w,$*v]),o=r[1].reshape([1,I,w]),u=[n,I,S*T],l.push(o),l.push(s);_&&l.push(r[2]);let d=u[2],p=l[0].dims[l[0].dims.length-1];d<8&&p<8?e.compute(aP(l,a,b,u,y,i),{inputs:l}):e.compute(aW(l,a,b,u,y,i),{inputs:l});return}let E=e.kernelCustomData.wT??e.compute(t8(r[1],aY),{inputs:[1],outputs:[a.wIsConst?-2:-1]})[0];a.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=E);let z=[r[0],E];_&&z.push(r[2]);let A=y?S*T:I,O=y?I:S*T,R=x*k*w;e.compute(aV(z,a,b,A,O,R,_,!0,i),{inputs:z})},a2=(e,r)=>{var a,i,n,s,o;if(((e,r)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===r.format?e[0].dims.length-1:1]!==e[1].dims[1]*r.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let a=e[0].dims.length-2;if(r.dilations.length!==a)throw Error(`dilations should be ${a}D`);if(r.strides.length!==a)throw Error(`strides should be ${a}D`);if(r.pads.length!==2*a)throw Error(`pads should be ${2*a}D`);if(0!==r.kernelShape.length&&r.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape")})(e.inputs,r),3===e.inputs[0].dims.length){let n,s,o,u,l,d,p;a=e,n="NHWC"===(i=r).format,s=[a.inputs[0].reshape(n?[a.inputs[0].dims[0],1,a.inputs[0].dims[1],a.inputs[0].dims[2]]:[a.inputs[0].dims[0],a.inputs[0].dims[1],1,a.inputs[0].dims[2]]),a.inputs[1].reshape([a.inputs[1].dims[0],a.inputs[1].dims[1],1,a.inputs[1].dims[2]])],3===a.inputs.length&&s.push(a.inputs[2]),o=[0,i.pads[0],0,i.pads[1]],u=[1].concat(i.strides),l=[1].concat(i.dilations),d=[1].concat(i.kernelShape),p=aJ({...i,pads:o,strides:u,dilations:l,kernelShape:d},s),a1(a,s,p,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else if(5===e.inputs[0].dims.length){let a,i,u,l;n=e,s=e.inputs,a="NHWC"===(o=r).format?"channelsLast":"channelsFirst",i=aJ(o,s),u="NOTSET"===o.autoPad?o.pads:o.autoPad,l=aK(s[0].dims,s[1].dims,o.strides,o.dilations,u,!1,a),n.compute(aZ(s,i,l.outShape,[l.filterDepth,l.filterHeight,l.filterWidth],[l.padInfo.front,l.padInfo.top,l.padInfo.left],a))}else{let a=aJ(r,e.inputs);a1(e,e.inputs,a)}}}),st=eo(()=>{nM(),nB(),nD(),nV(),a3=(e,r,a)=>{let i=e.length>2,n=r.outputShape,s="NHWC"===r.format,o=r.group,u=e[1].dims,l=u[2]/o,d=u[3],p=s?tH(l):1,c=s&&1===d&&l>=4,h=c?4*Math.floor(l/4):Math.floor(l/p)*p,f=l-h,m=s?tH(d):1,g=s?1===d?p:m:1,y=th.size(n)/m,b=[Math.ceil(y/64),1,1];td("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let _=["rank","rank"],$=[r.strides[0],r.strides[1]],v=[r.kernelShape[s?1:2],r.kernelShape[s?2:3]],w=[r.dilations[0],r.dilations[1]],x=[v[0]+(r.dilations[0]<=1?0:(r.kernelShape[s?1:2]-1)*(r.dilations[0]-1)),v[1]+(r.dilations[1]<=1?0:(r.kernelShape[s?2:3]-1)*(r.dilations[1]-1))],k=[x[0]-1-Math.floor((r.pads[0]+r.pads[2])/2),x[1]-1-Math.floor((r.pads[1]+r.pads[3])/2)],S=[{type:12,data:y},{type:12,data:$},{type:12,data:v},{type:12,data:w},{type:12,data:x},{type:6,data:k},{type:12,data:h},{type:12,data:l},{type:12,data:d},...tG(e[0].dims,e[1].dims)];return i&&(S.push(...tG(e[2].dims)),_.push("rank")),S.push(...tG(n)),{name:"ConvTranspose2D",shaderCache:{hint:`${r.cacheKey};${p}${g}${m}${c}${f}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],programUniforms:S}),getShaderSource:r=>{let a=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:$.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:x.length},{name:"pads",type:"i32",length:k.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],o=tV(e[0].dataType),u=s?1:2,l=s?2:3,d=s?3:1,h=tJ("W",e[1].dataType,e[1].dims.length,g),y=tJ("Dy",e[0].dataType,e[0].dims.length,p),b=[y,h];i&&b.push(tJ("bias",e[2].dataType,[n[d]].length,m));let _=t0("result",e[0].dataType,n.length,m),w=`
            let outputIndices = ${_.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${_.indicesGet("outputIndices",0)};
            let d1 = ${_.indicesGet("outputIndices",d)};
            let r = ${_.indicesGet("outputIndices",u)};
            let c = ${_.indicesGet("outputIndices",l)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${_.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${o}(dyRCorner) + ${o}(wR)) / ${o}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${o}(uniforms.Dy_shape[${u}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${o}(dyCCorner) + ${o}(wC)) / ${o}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${o}(uniforms.Dy_shape[${l}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${y.indicesToOffset(`${y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${h.indicesToOffset(`${h.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${g};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${c?4:p}) {
                  ${(()=>{let e="";if(c)4===p?e+=`
        let xValue = ${y.getByOffset("x_offset")};
        let wValue = ${h.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===p?e+=`
          dotProd = dotProd + dot(vec4<${o}>(${y.getByOffset("x_offset")}, ${y.getByOffset("x_offset + 1u")}), vec4<${o}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===p&&(e+=`
          dotProd = dotProd + dot(vec4<${o}>(${y.getByOffset("x_offset")}, ${y.getByOffset("x_offset + 1u")}, ${y.getByOffset("x_offset + 2u")}, ${y.getByOffset("x_offset + 3u")}), vec4<${o}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}, ${h.getByOffset("w_offset + 2u")}, ${h.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${s?y.getByOffset(`${y.indicesToOffset(`${y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):y.get("batch","inputChannel","idyR","idyC")};
        `,1===p)e+=`
          let w_offset = ${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${h.getByOffset(`w_offset / ${g}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let r=0;r<p;r++)e+=`
            let wValue${r} = ${h.getByOffset(`${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${r}, wOutChannel)`)} / ${g}`)};
            dotProd = dotProd + xValue[${r}] * wValue${r};`;return e})()}
                  inputChannel = inputChannel + ${c?4:p};
                }
                ${(()=>{if(0===f)return"";if(!c)throw Error(`packInputAs4 ${c} is not true.`);let e="";if(1===p){e+="dotProd = dotProd";for(let r=0;r<f;r++)e+=`
            + ${y.getByOffset(`x_offset + ${r}`)} * ${h.getByOffset(`w_offset + ${r}`)}`;e+=";"}else if(2===p){if(2!==f)throw Error(`Invalid inputChannelsRemainder ${f}.`);e+=`
          let xValue = ${y.getByOffset("x_offset")};
          let wValue = ${h.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return e})()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${m}]`:""};
            ${_.setByOffset("global_idx","value")};
          `;return`
    ${r.registerUniforms(a).declareVariables(...b,_)}
      ${r.mainStart()}
      ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${w}}`}}}}),sr=eo(()=>{st(),n2(),nF(),a4=(e,r,a,i,n,s)=>(e-1)*r+a+(i-1)*n+1-s,a6=(e,r,a,i,n)=>{let s=Math.floor(e/2);"SAME_UPPER"===r?(a[i]=s,a[n]=e-s):"SAME_LOWER"===r&&(a[i]=e-s,a[n]=s)},a8=(e,r)=>{let a=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,r)=>e*r,1)){a.length=0;for(let e=2;e<r[1].dims.length;++e)a.push(r[1].dims[e])}let i="NHWC"===e.format;a.splice(0,0,r[1].dims[0]),a.splice(i?3:1,0,r[1].dims[1]);let n=e.pads.slice(),s=e.outputShape.slice(),o=e.outputPadding.slice(),u=r[0].dims,l=e.dilations.slice();0===l.reduce((e,r)=>e+r,0)&&(l=Array(r[0].dims.length-2).fill(1));let d=e.strides.slice();0===d.reduce((e,r)=>e+r,0)&&(d=Array(r[0].dims.length-2).fill(1)),((e,r,a,i,n,s,o,u,l,d)=>{let p=e.length-2,c=0===d.length;l.length<p&&l.push(...Array(p-l.length).fill(0));let h=e[0],f=r[u?3:1]*n;for(let n=0,h=e.length-p-!!u;n<p;++n,++h){let u=e[h],f=c?u*o[n]:d[n];a6(a4(u,o[n],s[n],r[h],a[n],f),i,s,n,n+p),c&&d.push(o[n]*(u-1)+l[n]+(r[h]-1)*a[n]+1-s[n]-s[n+p])}d.splice(0,0,h),d.splice(u?3:1,0,f)})(u,a,l,e.autoPad,e.group,n,d,i,o,s);let p=Object.assign({},e);return Object.assign(p,{kernelShape:a,pads:n,outputPadding:o,outputShape:s,dilations:l,strides:d}),p},a5=e=>{let r=aM(e),a=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,s=e.group??1,o=e.kernelShape,u=e.pads,l=e.strides,d=e.wIsConst();return{autoPad:i,format:a,dilations:n,group:s,kernelShape:o,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:u,strides:l,wIsConst:d,...r,cacheKey:`${e.format};${r.activation};`}},a9=(e,r,a,i)=>{let n=e.kernelCustomData.wT??e.compute(t8(r[1],[2,3,0,1]),{inputs:[1],outputs:[a.wIsConst?-2:-1]})[0];a.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let s=[r[0],n];3===r.length&&s.push(r[2]),e.compute(a3(s,a,i),{inputs:s})},a7=(e,r)=>{if(((e,r)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===r.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*r.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==a))throw Error("invalid bias");let i=e[0].dims.length-2;if(r.dilations.reduce((e,r)=>e+r,0)>0&&r.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(r.strides.reduce((e,r)=>e+r,0)>0&&r.strides.length!==i)throw Error(`strides should be ${i}D`);if(r.pads.reduce((e,r)=>e+r,0)>0&&r.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(r.outputPadding.length!==i&&0!==r.outputPadding.length)throw Error(`output_padding should be ${i}D`);if(r.kernelShape.reduce((e,r)=>e+r,0)>0&&0!==r.kernelShape.length&&r.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==r.outputShape.length&&r.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")})(e.inputs,r),3===e.inputs[0].dims.length){var a,i;let n,s,o,u,l,d,p,c;a=e,n="NHWC"===(i=r).format,s=[a.inputs[0].reshape(n?[a.inputs[0].dims[0],1,a.inputs[0].dims[1],a.inputs[0].dims[2]]:[a.inputs[0].dims[0],a.inputs[0].dims[1],1,a.inputs[0].dims[2]]),a.inputs[1].reshape([a.inputs[1].dims[0],a.inputs[1].dims[1],1,a.inputs[1].dims[2]])],3===a.inputs.length&&s.push(a.inputs[2]),(0===(o=i.kernelShape).length||0===o[0])&&(o=[a.inputs[1].dims[2]]),(0===(u=i.dilations).length||0===u[0])&&(u=[1]),(0===(l=i.strides).length||0===l[0])&&(l=[1]),0===(d=i.pads).length&&(d=[0,0]),d=[0,d[0],0,d[1]],l=[1].concat(l),u=[1].concat(u),o=[1].concat(o),p=[0].concat(p=i.outputPadding),c=a8({...i,pads:d,strides:l,dilations:u,kernelShape:o,outputPadding:p},s),a9(a,s,c,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else{let a=a8(r,e.inputs);a9(e,e.inputs,a)}}}),sa=eo(()=>{nM(),nD(),nW(),nV(),ie=(e,r)=>{var a,i,n,s;let o,u,l,d,p,c,h=e.inputs[0].dims,f=e.inputs[0].dataType,m=e.inputs[1];e.compute((a=f,i=h,n=m,s=r,o=th.size(i),u=i.length,l=tJ("input",a,u),d=t0("output",a,u),p=6===n.dataType?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),c=th.normalizeAxis(p,u),{name:"CumSum",shaderCache:{hint:s.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...tG(i,i)]}),getShaderSource:e=>{let r=` i32(${l.indicesGet("inputIndices","uniforms.axis")}) `,a=tX("uniforms.input_shape","uniforms.axis",u),i=s.reverse?r+(s.exclusive?" + 1":""):"0",n=s.reverse?a:r+(s.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(l,d)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${i};
                  let last : i32 = ${n};
                  for (var i : i32 = first; i < last; i++) {
                    ${l.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${l.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},it=e=>{let r=1===e.exclusive,a=1===e.reverse;return tj({exclusive:r,reverse:a})}}),si=eo(()=>{nM(),nD(),nW(),nV(),ir=(e,r)=>{var a,i;let n,s,o,u,l,d,p,c,h,f,m,g,y,b;(e=>{if(!e||1!==e.length)throw Error("DepthToSpace requires 1 input.");if(4!==e[0].dims.length)throw Error("DepthToSpace requires 4D input.")})(e.inputs),e.compute((a=e.inputs[0],p="NHWC"===(i=r).format,c=i.blocksize,h="DCR"===i.mode,p?([n,s,o,u]=a.dims,l=h?[n,s,o,c,c,u/c**2]:[n,s,o,u/c**2,c,c],d=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,s,o,u]=[a.dims[0],a.dims[2],a.dims[3],a.dims[1]],l=h?[n,c,c,u/c**2,s,o]:[n,u/c**2,c,c,s,o],d=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]),m=(f=a.reshape(l)).dims.length,g=a.dataType,y=tJ("a",g,m),b=t0("output",g,m),{name:"DepthToSpace",shaderCache:{hint:`${a.dims};${i.blocksize};${i.mode}`,inputDependencies:["rank"]},getRunData:e=>{let r=p?[n,s*c,o*c,u/c**2]:[n,u/c**2,s*c,o*c],a=th.size(r),i=f.dims,l=th.sortBasedOnPerm(i,d);return{outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...tG(i,l)]}},getShaderSource:e=>`
  ${e.registerUniform("output_size","u32").declareVariables(y,b)}

  ${((e,r,a,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${a.type.indices} {
    var a: ${a.type.indices};`);for(let i=0;i<r;++i)n.push(a.indicesSet("a",e[i],`i[${i}]`));return n.push("return a;}"),n.join(`
`)})(d,m,y,b)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`}))},ia=e=>tj({blocksize:e.blocksize,mode:e.mode,format:e.format})}),sn=eo(()=>{nM(),nD(),nW(),nV(),io="^"+(is="("+(ii="[a-zA-Z]|\\.\\.\\.")+")+")+"$",iu="^"+("("+is+",)*")+is+"$",il=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let a=this.symbolToIndices.get(e);void 0===a?a=[r]:a.push(r),this.symbolToIndices.set(e,a)}},id=class{constructor(e,r){this.equation=r,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[a,i]=r.includes("->")?r.split("->",2):[r,""];if(!a.match(RegExp(iu)))throw Error("Invalid LHS term");if(a.split(",").forEach((r,a)=>{let i=e[a].dims.slice();if(!r.match(RegExp(io)))throw Error("Invalid LHS term");let n=this.processTerm(r,!0,i,a);this.lhs.push(n)}),""===i)i+=[...this.symbolToInfo.entries()].filter(([e,r])=>1===r.count||"..."===e).map(([e])=>e).join("");else if(!i.match(RegExp(is)))throw Error("Invalid RHS");i.match(RegExp(ii,"g"))?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let r=this.symbolToInfo.get(e);if(void 0===r)throw Error("Invalid RHS symbol");this.outputDims.push(r.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,r,a){let i=this.symbolToInfo.get(e);if(void 0!==i){if(i.dimValue!==r&&1!==i.count)throw Error("Dimension mismatch");i.count++,i.inputIndices.push(a)}else i={count:1,dimValue:r,inputIndices:[a]};this.symbolToInfo.set(e,i)}processTerm(e,r,a,i=-1){let n=a.length,s=!1,o=[],u=0;if(!e.match(RegExp(io))&&!r&&""!==e)throw Error("Invalid LHS term");let l=e.match(RegExp(ii,"g")),d=new il(i);return l?.forEach((e,p)=>{if("..."===e){if(s)throw Error("Only one ellipsis is allowed per input term");s=!0;let e=n-l.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(o=a.slice(u,u+e),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=o;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<o.length;e++){let r=String.fromCharCode(48+e);d.addSymbol(r,p+e),this.addSymbol(r,a[u++],i)}}else d.addSymbol(e,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,a[u++],i)}),d}},ip=(e,r)=>{var a,i,n,s;let o,u,l,d,p=new id(e.inputs,r.equation),c=p.outputDims,h=e.inputs.map((e,r)=>e.dims);e.compute((a=h,i=e.inputs[0].dataType,n=p,s=c,o=a.map(e=>e.length).map((e,r)=>tJ(`input${r}`,i,e)),u=th.size(s),l=t0("output",i,s.length),d=[...n.symbolToInfo.keys()].filter(e=>!n.rhs.symbolToIndices.has(e)),{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:a.map(()=>"rank")},getRunData:()=>{let e=d.filter(e=>n.symbolToInfo.has(e)).map(e=>({type:12,data:n.symbolToInfo.get(e)?.dimValue||0}));e.push({type:12,data:u});let r=a.map((e,r)=>[...tG(e)]).reduce((e,r)=>e.concat(r),e);return r.push(...tG(s)),{outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:r}},getShaderSource:e=>{let r=[],a=[],i=[],s=[],u=[],p=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((e,d)=>{if(n.rhs.symbolToIndices.has(d)){let a=n.rhs.symbolToIndices.get(d)?.[0];void 0!==a&&n.lhs.forEach((i,n)=>{if(e.inputIndices.includes(n)){let e=i.symbolToIndices.get(d);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{r.push(`${o[n].indicesSet(`input${n}Indices`,e,l.indicesGet("outputIndices",a))}`)})}})}else{let r;n.lhs.forEach((r,i)=>{if(e.inputIndices.includes(i)){let e=r.symbolToIndices.get(d);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{a.push(`${o[i].indicesSet(`input${i}Indices`,e,`${d}`)}`)}),u.push(`prod *= ${o[i].getByIndices(`input${i}Indices`)};`)}}),i.push(`for(var ${d}: u32 = 0; ${d} < uniforms.${(r=d)+"_max"}; ${d}++) {`),s.push("}")}});let c=p?[...r,`let sum = ${o.map((e,r)=>e.getByIndices(`input${r}Indices`)).join(" * ")};`]:[...r,"var sum = 0.0;",...i,...a,"var prod = 1.0;",...u,"sum += prod;",...s];return`
            ${e.registerUniforms(d.map(e=>{let r;return{name:`${(r=e)+"_max"}`,type:"u32"}})).registerUniform("outputSize","u32").declareVariables(...o,l)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${l.offsetToIndices("global_idx")};
            ${o.map((e,r)=>`var input${r}Indices: ${o[r].type.indices};`).join(`
`)}
            ${c.join(`
`)};
            ${l.setByOffset("global_idx","sum")};
          }`}}))},ic=e=>{let r=e.equation.replace(/\s+/g,"");return tj({equation:r})}}),ss=eo(()=>{nM(),nD(),nV(),ih=(e,r)=>{let a=e.length-r.length,i=[];for(let r=0;r<a;++r)i.push(e[r]);for(let n=0;n<r.length;++n)i.push(1===r[n]?e[n+a]:r[n]);return i},im=e=>{var r;let a,i,n,s,o,u,l,d,p,c;(e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let r=e[0].dims,a=Array.from(e[1].getBigInt64Array(),Number),i=a.length<r.length?0:a.length-r.length,n=r.length<a.length?0:r.length-a.length;for(;i<a.length&&n<r.length;++i,++n)if(a[i]!==r[n]&&1!==a[i]&&1!==r[n])throw Error("Expand requires shape to be broadcastable to input")})(e.inputs),e.compute((s=(a=n=(r=e.inputs)[0].dims,i=Array.from(r[1].getBigInt64Array(),Number),a.length>i.length?ih(a,i):ih(i,a)),u=9===(o=r[0].dataType)||1===th.size(n),l=9===o||n.length>0&&n[n.length-1]%4==0?4:1,d=u||s.length>0&&s[s.length-1]%4==0?4:1,c=[{type:12,data:p=Math.ceil(th.size(s)/d)},...tG(n,s)],{name:"Expand",shaderCache:{hint:`${s.length};${l}${d}`,inputDependencies:["rank"]},getShaderSource:e=>{let r=tJ("input",o,n.length,l),a=t0("output",o,s.length,d),i;if(9===o){let e=(e,i,n="")=>`
          let outputIndices${i} = ${a.offsetToIndices(`outputOffset + ${i}u`)};
          let offset${i} = ${r.broadcastedIndicesToOffset(`outputIndices${i}`,a)};
          let index${i} = offset${i} / 4u;
          let component${i} = offset${i} % 4u;
          ${e}[${i}] = ${n}(${r.getByOffset(`index${i}`)}[component${i}]);
        `;i=`
        let outputOffset = global_idx * ${d};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${a.setByOffset("global_idx","data")}
      }`}else i=`
        let outputIndices = ${a.offsetToIndices(`global_idx * ${d}`)};
        let inputOffset = ${r.broadcastedIndicesToOffset("outputIndices",a)};
        let data = ${a.type.value}(${r.getByOffset(`inputOffset / ${l}`)});
        ${a.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(r,a)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${i}`},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c})}),{inputs:[0]})}}),so=eo(()=>{nM(),nD(),nV(),nY(),ig=e=>{var r;let a,i,n,s;e.inputs.length<2||0===th.size(e.inputs[1].dims)?ac(e):e.compute((a=(r=e.inputs)[0].dataType,i=th.size(r[0].dims),s=(n=th.size(r[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getShaderSource:e=>{let r=tJ("x",a,[1],4),i=tJ("bias",a,[1],4),n=t0("y",a,[1],4),o=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${i.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,u=s?`
      let bias = ${i.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${o(0)}${o(1)}${o(2)}${o(3)}
      let bias = ${r.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(r,i,n)}

    ${ad(tF(a))}

    ${e.mainStart(tq)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${r.getByOffset("global_idx")};
      ${u}
      let x_in = x + bias;
      ${n.setByOffset("global_idx",ap("x_in"))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(i/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(i/tq/4)}})}))}}),su=eo(()=>{nM(),nD(),nW(),nV(),iy=e=>tj({axis:e.axis}),ib=(e,r)=>{var a,i;let n,s,o,u,l,d,p,c,h;(e=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.")})(e.inputs),e.compute((a=e.inputs,i=r,n=a[0].dims,s=a[1].dims,o=n.length,u=th.normalizeAxis(i.axis,o),(l=n.slice(0)).splice(u,1,...s),d=n[u],p=9===a[0].dataType?4:1,h=[{type:12,data:c=Math.ceil(th.size(l)/p)},{type:6,data:d},{type:12,data:u},...tG(a[0].dims,a[1].dims,l)],{name:"Gather",shaderCache:{hint:i.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:e=>{let r=tJ("data",a[0].dataType,a[0].dims.length,p),i=tJ("inputIndices",a[1].dataType,a[1].dims.length),n=t0("output",a[0].dataType,l.length,p),d=e=>{let a=s.length,n=`var indicesIndices${e}  = ${i.type.indices}(0);`;for(let r=0;r<a;r++)n+=`${a>1?`indicesIndices${e}[${r}]`:`indicesIndices${e}`} = ${l.length>1?`outputIndices${e}[uniforms.axis + ${r}]`:`outputIndices${e}`};`;n+=`
          var idx${e} = ${i.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${r.type.indices};
        `;for(let r=0,i=0;r<o;r++)r===u?(n+=`${o>1?`dataIndices${e}[${r}]`:`dataIndices${e}`} = u32(idx${e});`,i+=a):(n+=`${o>1?`dataIndices${e}[${r}]`:`dataIndices${e}`} = ${l.length>1?`outputIndices${e}[${i}]`:`outputIndices${e}`};`,i++);return n},c;if(9===a[0].dataType){let e=(e,a,i="")=>`
          let outputIndices${a} = ${n.offsetToIndices(`outputOffset + ${a}u`)};
          ${d(a)};
          let offset${a} = ${r.indicesToOffset(`dataIndices${a}`)};
          let index${a} = offset${a} / 4u;
          let component${a} = offset${a} % 4u;
          ${e}[${a}] = ${i}(${r.getByOffset(`index${a}`)}[component${a}]);
        `;c=`
        let outputOffset = global_idx * ${p};
        var value = vec4<u32>(0);
        ${e("value",0,"u32")}
        ${e("value",1,"u32")}
        ${e("value",2,"u32")}
        ${e("value",3,"u32")}
        ${n.setByOffset("global_idx","value")}
      `}else c=`
      let outputIndices = ${n.offsetToIndices("global_idx")};
      ${d("")};
      let value = ${r.getByIndices("dataIndices")};
      ${n.setByOffset("global_idx","value")};
      `;return`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(r,i,n)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${c}
      }`}}))}}),sl=eo(()=>{nM(),nD(),nV(),i_=(e,r)=>{var a,i,n,s,o,u;let l,d,p=e.inputs,c=p[0].dims,h=p[0].dataType,f=p[1].dims,m=f[f.length-1],g=th.sizeToDimension(f,f.length-1),y=th.sizeFromDimension(c,r.batchDims+m),b=th.sizeToDimension(c,r.batchDims),_=th.sizeFromDimension(c,r.batchDims),$=Array(m),v=y;for(let e=0;e<m;++e)$[m-1-e]=v,v*=c[r.batchDims+m-1-e];let w=(a=e,i=p[1],n=$,s=r.batchDims,o=c,l=[{type:12,data:u=g},{type:12,data:s},{type:12,data:o},{type:12,data:n},{type:12,data:g/b},{type:12,data:_},{type:12,data:m}],d=[u],l.push(...tG(i.dims,d)),a.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:a.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:e=>{let r=tJ("indices_data",i.dataType,i.dims.length),a=t0("input_slice_offsets_data",12,1,1),s=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(s).declareVariables(r,a)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${1===o.length?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${1===n.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[i],outputs:[-1]})[0]),x=r.batchDims+m;if(x>c.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let k=f.slice(0,-1).concat(c.slice(x)),S=th.size(k),T=[{type:12,data:S},{type:12,data:y},...tG(p[0].dims,w.dims,k)];e.compute({name:"GatherND",shaderCache:{hint:r.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:k,dataType:h}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:T}),getShaderSource:e=>{let r=tJ("data",p[0].dataType,p[0].dims.length),a=tJ("slice_offsets",12,w.dims.length),i=t0("output",p[0].dataType,k.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(r,a,i)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[p[0],w]})},i$=e=>({batchDims:e.batch_dims,cacheKey:""})}),sd=eo(()=>{nM(),nD(),nW(),nV(),iv=(e,r)=>{var a,i;let n,s,o,u,l,d,p,c,h,f;((e,r)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let a=th.normalizeAxis(r.quantizeAxis,e[0].dims.length),i=r.blockSize,n=e[0],s=e[2],o=4===e.length?e[3]:void 0;if(s.dims.length!==n.dims.length||!n.dims.map((e,r)=>r===a?Math.ceil(e/i)===s.dims[r]:e===s.dims[r]).reduce((e,r)=>e&&r,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==n.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==s.dims.length||!o.dims.map((e,r)=>e===s.dims[r]).reduce((e,r)=>e&&r,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(e.inputs,r),e.compute((a=e.inputs,i=r,n=a[0].dims,s=a[1].dims,o=n.length,u=th.normalizeAxis(i.gatherAxis,o),l=th.normalizeAxis(i.quantizeAxis,o),(d=n.slice(0)).splice(u,1,...s),p=th.size(d),c=a[2].dataType,h=22===a[0].dataType,f=[{type:12,data:p},{type:12,data:l},{type:12,data:u},{type:12,data:i.blockSize},...tG(...a.map((e,r)=>e.dims),d)],{name:"GatherBlockQuantized",shaderCache:{hint:`${i.cacheKey};${a.filter((e,r)=>1!==r).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:a.length},(e,r)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:c}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:e=>{let r=tJ("data",a[0].dataType,a[0].dims.length),i=tJ("inputIndices",a[1].dataType,a[1].dims.length),o=tJ("scales",a[2].dataType,a[2].dims.length),l=a.length>3?tJ("zeroPoint",a[3].dataType,a[3].dims.length):void 0,p=t0("output",c,d.length),f=[r,i,o];return l&&f.push(l),`
        ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...f,p)}
        ${e.mainStart()}
        let output_indices = ${p.offsetToIndices("global_idx")};
        var indices_indices = ${i.type.indices}(0);
        ${s.length>1?`
          for (var i: u32 = 0; i < ${s.length}; i++) {
            let index = ${p.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${i.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${p.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${r.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${p.indicesGet("output_indices","i")};
          ${r.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${i.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[u]};
        }
        ${r.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${p.indicesGet("output_indices",`i + ${s.length} - 1`)};
          ${r.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${r.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${r.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${o.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${o.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${o.getByIndices("scale_indices")};
        ${l?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${l.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${l.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${tF(c)}(quantized_data - zero_point) * scale;
        ${p.setByOffset("global_idx","dequantized_data")};
    }`}}))},iw=e=>tj({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),sp=eo(()=>{nM(),nD(),nW(),nV(),ix=e=>tj({axis:e.axis}),ik=(e,r)=>{var a,i;let n,s,o,u,l,d,p,c,h,f,m,g,y;(e=>{if(!e||2!==e.length)throw Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)})(e.inputs),e.compute((a=e.inputs,i=r,n=a[0].dims,s=a[0].dataType,o=n.length,u=a[1].dims,l=a[1].dataType,p=n[d=th.normalizeAxis(i.axis,o)],c=u.slice(0),h=th.size(c),f=tJ("input",s,o),m=tJ("indicesInput",l,u.length),g=t0("output",s,c.length),(y=[{type:12,data:h},{type:6,data:p},{type:12,data:d}]).push(...tG(n,u,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:e=>`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,g)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}))}}),sc=eo(()=>{nM(),nD(),nV(),iS=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}),iT=(e,r)=>{(e=>{if(!e)throw Error("Input is missing");if(e.length<2||e.length>3)throw Error("Invaid input number.");if(3===e.length&&e[2].dims.length>2)throw Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||3===e.length&&e[0].dataType!==e[2].dataType)throw Error("Input types are mismatched")})(e.inputs),e.compute(((e,r)=>{let a=e[0].dims.slice(),i=e[1].dims.slice(),[n,s,o]=tm.getShapeOfGemmResult(a,r.transA,i,r.transB,3===e.length?e[2].dims:void 0),u=[n,s],l=Math.ceil(s/16),d=Math.ceil(n/16),p=(th.size(u),[{type:12,data:l},{type:12,data:n},{type:12,data:s},{type:12,data:o},{type:1,data:r.alpha},{type:1,data:r.beta}]),c=["type","type"];return 3===e.length&&(p.push(...tG(e[2].dims)),c.push("rank")),p.push(...tG(u)),{name:"GemmShared",shaderCache:{hint:`${r.cacheKey}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:l*d},programUniforms:p}),getShaderSource:a=>{let i=tJ("a",e[0].dataType,e[0].dims),n=tJ("b",e[1].dataType,e[1].dims),s=null,o=[i,n];3===e.length&&(s=tJ("c",e[2].dataType,e[2].dims.length),o.push(s));let l=t0("output",e[0].dataType,u.length);o.push(l);let d="",p="";r.transA&&r.transB?(p=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):r.transA&&!r.transB?(p=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!r.transA&&r.transB?(p=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):r.transA||r.transB||(p=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let c=1===r.alpha?"":"value *= uniforms.alpha;";return`
  ${a.registerUniforms([{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}]).declareVariables(...o)}
  var<workgroup> tile_a: array<array<${i.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${n.type.storage}, 16>, 16>;
  ${a.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${l.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${p}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${d}
      }
      workgroupBarrier();
    }

    ${c}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=s?`let cOffset = ${s.broadcastedIndicesToOffset("vec2(m, n)",l)}; value += ${l.type.value}(uniforms.beta) * ${s.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}})(e.inputs,r))}}),sh=eo(()=>{nM(),nD(),nW(),nV(),[iI,iC,iE,iz]=[0,1,2,3],iA=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,iO=(e,r)=>{var a,i;let n,s,o,u,l,d,p;(e=>{if(4!==e[0].dims.length)throw Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error("grid batch size must match input batch size")})(e.inputs),e.compute((a=e.inputs,i=r,n=tJ("x",a[0].dataType,a[0].dims.length),s=[a[1].dims[0],a[1].dims[1],a[1].dims[2]],o=tJ("grid",a[1].dataType,s.length,2),u=[a[0].dims[0],a[0].dims[1],a[1].dims[1],a[1].dims[2]],"NHWC"===i.format&&(u=[a[0].dims[0],a[1].dims[1],a[1].dims[2],a[0].dims[3]],[iI,iC,iE,iz]=[0,3,1,2]),l=t0("output",a[0].dataType,u.length),d=n.type.value,p=[{type:12,data:th.size(u)},...tG(a[0].dims,s,u)],{name:"GridSample",shaderCache:{hint:`${i.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let r=th.size(u);return{outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:p}},getShaderSource:e=>{let r,a,s,u,p,c,h,f,m;return`
  ${e.registerUniform("output_size","u32").declareVariables(n,o,l)}
  ${iA}
  ${r=d,`
  fn gs_bicubic_interpolate(p: mat4x4<${r}>, x: f32, y: f32) -> ${r} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${r}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`}
  ${a=i,`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===a.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`}
  ${s=i,`
  ${"reflection"===s.paddingMode?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`}
  ${u=n,p=d,c=i,`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${p} {
     var pixel = ${p}(0);
     var indices = vec4<u32>(0);
     indices[${iI}] = batch;
     indices[${iC}] = channel;`+(()=>{switch(c.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${iE}] = u32(r);
            indices[${iz}] = u32(c);
          } else {
            return ${p}(0);
          }
        `;case"border":return`
          indices[${iE}] = u32(clamp(r, 0, H - 1));
          indices[${iz}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${iE}] = gs_reflect(r, border[1], border[3]);
          indices[${iz}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${c.paddingMode} is not supported`)}})()+`
    return ${u.getByIndices("indices")};
  }
`}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${iE}]);
      let W_in = i32(uniforms.x_shape[${iz}]);

      ${0===i.alignCorners?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${l.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${iI}], indices[${iE}], indices[${iz}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${h=l,f=d,m=i,(()=>{switch(m.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${iI}], indices[${iC}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${iI}], indices[${iC}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${iI}], indices[${iC}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${iI}], indices[${iC}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${iI}], indices[${iC}], border);

          let dx2 = ${f}(f32(x2) - x);
          let dx1 = ${f}(x - f32(x1));
          let dy2 = ${f}(f32(y2) - y);
          let dy1 = ${f}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${f}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${iI}], indices[${iC}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${m.mode} is not supported`)}})()+`${h.setByOffset("global_idx","result")}`}
  }`}}))},iR=e=>tj({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),sf=eo(()=>{nM(),nD(),nW(),nj(),nZ(),nV(),nF(),iM=(e,r)=>e.length>r&&e[r].dims.length>0?e[r]:void 0,iN=e=>tj({...e}),iB=tj({perm:[0,2,1,3]}),iD=(e,r,a,i,n,s,o,u)=>{var l,d,p,c,h,f,m;let g,y,b,_=s;if(!(o&&th.size(o.dims)>0))return 3===s.dims.length&&(_=s.reshape([r,i,a,n])),1===a||1===i?_:e.compute(t8(_,iB.perm),{inputs:[_],outputs:[-1]})[0];if(1===i)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return _=(l=e,d=s,p=o,c=r,h=i,f=a*n,m=u,g=[c,h,f],b=[{type:12,data:y=th.size(g)},{type:12,data:m},{type:12,data:f}],_=l.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:g,dataType:d.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:b}),getShaderSource:e=>{let r=t0("qkv_with_bias",d.dataType,g),a=tJ("qkv",d.dataType,g),i=tJ("bias",p.dataType,g);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(a,i,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[d,p],outputs:[-1]})[0]).reshape([r,i,a,n]),1===a||1===i?_:e.compute(t8(_,iB.perm),{inputs:[_],outputs:[-1]})[0]},iU=(e,r)=>{let a=((e,r)=>{let a,i=e[0],n=iM(e,1),s=iM(e,2),o=iM(e,3),u=iM(e,4),l=iM(e,5),d=iM(e,6),p=iM(e,7);if(3!==i.dims.length&&5!==i.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let c=i.dims[0],h=i.dims[1],f=3===i.dims.length?i.dims[2]:r.numHeads*i.dims[4],m=h,g=0,y=0,b=Math.floor(f/r.numHeads);if(d&&p&&th.size(d.dims)&&th.size(p.dims)){if(4!==d.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==c||d.dims[1]!==r.numHeads||d.dims[3]!==b)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==r.numHeads||p.dims[3]!==b)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==p.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],y=d.dims[2]}else if(d&&th.size(d.dims)||p&&th.size(p.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(n&&th.size(n.dims)>0){if(3!==i.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==n.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===n.dims.length){if(n.dims[2]!==i.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');a=2,m=n.dims[1]}else if(5===n.dims.length){if(n.dims[2]!==r.numHeads||2!==n.dims[3]||n.dims[4]!==b)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw Error('Expect "value" be none when "key" has packed kv format.');a=5,m=n.dims[1]}else{if(n.dims[1]!==r.numHeads||n.dims[3]!==b)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');a=0,m=n.dims[2]}}else{if(5!==i.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(i.dims[2]!==r.numHeads||3!==i.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');a=3}if(o&&th.size(o.dims)>0){if(1!==o.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(n&&5===n.dims.length&&2===n.dims[3])throw Error("bias is not allowed for packed kv.")}let _=g+m,$=0;if(u&&th.size(u.dims)>0){$=8;let e=u.dims;throw 1===e.length?e[0]===c?$=1:e[0]===3*c+2&&($=3):2===e.length&&e[0]===c&&e[1]===_&&($=5),8===$?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let v=!1,w=f;if(s&&th.size(s.dims)>0){if(3!==s.dims.length&&4!==s.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==s.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===s.dims.length){if(m!==s.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=s.dims[2]}else{if(m!==s.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');w=s.dims[1]*s.dims[3],v=!0}}if(u&&th.size(u.dims)>0)throw Error("Key padding mask is not supported");if(l&&th.size(l.dims)>0){if(4!==l.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==r.numHeads||l.dims[2]!==h||l.dims[3]!==_)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:_,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:f,vHiddenSize:w,headSize:b,vHeadSize:Math.floor(w/r.numHeads),numHeads:r.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:r.maskFilterValue,maskType:$,scale:r.scale,broadcastResPosBias:!1,passPastInKv:v,qkvFormat:a}})(e.inputs,r),i=e.inputs[0],n=iM(e.inputs,1),s=iM(e.inputs,2),o=iM(e.inputs,3),u=iM(e.inputs,4),l=iM(e.inputs,5),d=iM(e.inputs,6),p=iM(e.inputs,7);if(5===i.dims.length)throw Error("Packed QKV is not implemented");if(n?.dims.length===5)throw Error("Packed KV is not implemented");let c=n&&s&&4===n.dims.length&&4===s.dims.length,h=iD(e,a.batchSize,a.numHeads,a.sequenceLength,a.headSize,i,o,0);if(c)return rN(e,h,n,s,u,void 0,d,p,l,a);if(!n||!s)throw Error("key and value must be provided");let f=iD(e,a.batchSize,a.numHeads,a.kvSequenceLength,a.headSize,n,o,a.hiddenSize),m=iD(e,a.batchSize,a.numHeads,a.kvSequenceLength,a.vHeadSize,s,o,2*a.hiddenSize);rN(e,h,f,m,u,void 0,d,p,l,a)}}),sm=eo(()=>{nM(),nD(),nW(),nV(),iP=(e,r)=>{let a=e[0].dims,i=th.size(a),n=e[0].dataType,s=th.normalizeAxis(r.axis,a.length),o=Array(r.numOutputs),u=tJ("input",n,a.length),l=Array(r.numOutputs),d=[],p=[],c=0,h=[{type:12,data:i}];for(let i=0;i<r.numOutputs;i++){c+=r.splitSizes[i],l[i]=c;let u=a.slice();u[s]=r.splitSizes[i],p.push(u),o[i]=t0(`output${i}`,n,u.length),d.push({dims:p[i],dataType:e[0].dataType})}return h.push({type:12,data:l},...tG(a,...p)),{name:"Split",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getShaderSource:e=>{let r;return`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...o)}
  ${r=l.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${tX("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`}
  ${(e=>{let r=e.length,a=[];for(let i=0;i<r;++i){let n=e[i].setByIndices("indices","input[global_idx]");1===r?a.push(n):0===i?a.push(`if (output_number == ${i}u) { ${n} }`):i===r-1?a.push(`else { ${n} }`):a.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${a.join(`
`)}
      }`})(o)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${tX("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},iL=(e,r)=>{let a,i;var n,s,o=e.inputs;if(!o||o.length<1)throw Error("too few inputs");let u=1===e.inputs.length?r:(n=e.inputs,a=[],i=(s=r).numOutputs,n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(e=>a.push(Number(e))),i=a.length),tj({numOutputs:i,axis:s.axis,splitSizes:a}));e.compute(iP(e.inputs,u),{inputs:[0]})},ij=e=>{let r=e.axis,a=e.splitSizes,i=e.numOutputs<0?a.length:e.numOutputs;if(i!==a.length)throw Error("numOutputs and splitSizes length must be equal");return tj({axis:r,numOutputs:i,splitSizes:a})}}),sg=eo(()=>{nM(),nD(),nW(),nV(),iq=(e,r)=>{let{interleaved:a,numHeads:i,rotaryEmbeddingDim:n,scale:s}=r,o=e[0].dims[0],u=th.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=u/l,p=e[2].dims[1],c=0===n?2*p:d/i,h=[o,l,d/c,c-p],f=th.computeStrides(h),m=[{type:1,data:s},{type:12,data:h},{type:12,data:f},...3===e[0].dims.length?Array({type:12,data:[u,d,c,1]}):[],...4===e[0].dims.length?Array({type:12,data:[u,c,l*c,1]}):[],...tG(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:tj({interleaved:a}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:r=>{let i=tJ("input",e[0].dataType,e[0].dims.length),n=tJ("position_ids",e[1].dataType,e[1].dims.length),s=tJ("cos_cache",e[2].dataType,e[2].dims.length),o=tJ("sin_cache",e[3].dataType,e[3].dims.length),u=t0("output",e[0].dataType,e[0].dims.length);return r.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${r.declareVariables(i,n,s,o,u)}

        ${r.mainStart(tq)}
          let half_rotary_emb_dim = uniforms.${s.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${r.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${n.broadcastedIndicesToOffset("bsnh.xy",t0("",n.type.tensor,2))};
            let position_id =
                u32(${n.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${a});
            let j = i + select(half_rotary_emb_dim, 1, ${a});
            let re = ${i.getByOffset("i")} * ${s.get("position_id","bsnh[3]")} -
                ${i.getByOffset("j")} * ${o.get("position_id","bsnh[3]")};
            ${u.setByOffset("i","re")}
            let im = ${i.getByOffset("i")} * ${o.get("position_id","bsnh[3]")} +
                ${i.getByOffset("j")} * ${s.get("position_id","bsnh[3]")};
            ${u.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${u.setByOffset("k",i.getByOffset("k"))}
          }
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(th.size(h)/tq)},programUniforms:m})}},iW=(e,r)=>{((e,r)=>{let[a,i,n,s]=e,{numHeads:o,rotaryEmbeddingDim:u}=r;if(3!==a.dims.length&&4!==a.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${a.dims.length}`);if(!th.areEqual(i.dims,[])&&!th.areEqual(i.dims,[1])&&2!==i.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(2!==n.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(2!==s.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!th.areEqual(n.dims,s.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&0===o)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let l=a.dims[0],d=a.dims[a.dims.length-2],p=n.dims[0],c=th.sizeFromDimension(a.dims,1)/d,h=0===u?2*n.dims[1]:c/o;if(u>h)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===i.dims.length){if(l!==i.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(d>p)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(h/2!==n.dims[1]&&u/2!==n.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`)})(e.inputs,r),e.compute(iq(e.inputs,r))}}),sy=eo(()=>{nW(),nM(),nZ(),sf(),sm(),nF(),sg(),nV(),iV=tj({perm:[0,2,1,3]}),iF=(e,r,a)=>{let i=r,n=a.kvNumHeads;return 3===r.dims.length&&0!==a.kvSequenceLength&&(i=r.reshape([a.batchSize,a.kvSequenceLength,n,a.headSize]),i=e.compute(t8(i,iV.perm),{inputs:[i],outputs:[-1]})[0]),i},iG=(e,r)=>{let a=((e,r)=>{if(r.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let a=e[0],i=e[1],n=e[2],s=e[3],o=e[4];if(0!==r.doRotary&&e.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==r.localWindowSize)throw Error("Local attention is not supported");if(0!==r.softcap)throw Error("Softcap is not supported");if(0!==r.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(r.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==a.dims.length&&5!==a.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let u=a.dims[0],l=a.dims[1],d=3===a.dims.length?a.dims[2]:r.numHeads*a.dims[4],p=l,c=0,h=!i||0===i.dims.length,f=Math.floor(h?d/(r.numHeads+2*r.kvNumHeads):d/r.numHeads);h&&(d=f*r.numHeads);let m=s&&0!==s.dims.length,g=o&&0!==o.dims.length;if(m&&4===s.dims.length&&s.dims[0]===u&&s.dims[1]!==r.kvNumHeads&&s.dims[2]===r.kvNumHeads&&s.dims[3]===f)throw Error("BSNH pastKey/pastValue is not supported");if(m&&g){if(4!==s.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==o.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');c=s.dims[2]}else if(m||g)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let y=1;if(i&&i.dims.length>0){if(3!==a.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(a.dims[0]!==i.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===i.dims.length){if(a.dims[2]%i.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');p=i.dims[1]}else if(5===i.dims.length){if(i.dims[2]!==r.numHeads||2!==i.dims[3]||i.dims[4]!==f)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw Error('Expect "value" be none when "key" has packed kv format.');p=i.dims[1]}else{if(i.dims[1]!==r.numHeads||i.dims[3]!==f)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=i.dims[2]}}else{if(3!==a.dims.length&&5!==a.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===a.dims.length&&(a.dims[2]!==r.numHeads||3!==a.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}let b=!1,_=r.kvNumHeads?f*r.kvNumHeads:d;if(n&&n.dims.length>0){if(3!==n.dims.length&&4!==n.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(a.dims[0]!==n.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===n.dims.length){if(p!==n.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');_=n.dims[2]}else{if(p!==n.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');_=n.dims[1]*n.dims[3],b=!0}}let $=e.length>4?e[5]:void 0;if($){if(0===$.dims.length)throw Error("seqlens_k must be at least 1D, got scalar.");let e=$.dims.reduce((e,r)=>e*r,1);if(e!==u)throw Error(`seqlens_k must have batch_size (${u}) elements, got ${e}.`);for(let e=0;e<$.dims.length;e++)if(1!==$.dims[e]&&$.dims[e]!==u)throw Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${u}), got dims[${e}] = ${$.dims[e]}.`)}return{batchSize:u,sequenceLength:l,pastSequenceLength:c,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:_,headSize:f,vHeadSize:Math.floor(_/r.kvNumHeads),numHeads:r.numHeads,kvNumHeads:r.kvNumHeads,nReps:r.numHeads/r.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:r.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:y}})(e.inputs,r);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,u=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,p=a.kvNumHeads?a.kvNumHeads:a.numHeads,c=tj({axis:2,numOutputs:3,splitSizes:[a.numHeads*a.headSize,p*a.headSize,p*a.headSize]}),[h,f,m]=n||s?[i,n,s]:e.compute(iP([i],c),{inputs:[i],outputs:[-1,-1,-1]}),g,y;if(r.doRotary){var b,_,$,v;let i,n,s,o=e.compute((b=a.batchSize,_=a.sequenceLength,$=l,v=d,i=[b*_],s=[{type:12,data:n=b*_},{type:12,data:_},{type:12,data:b}],{name:"GeneratePositionIds",shaderCache:{hint:`${b};${_}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:7}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:s}),getShaderSource:e=>{let r=tJ("seq_lens",$.dataType,$.dims),a=tJ("total_seq_lens",v.dataType,v.dims),n=t0("pos_ids",7,i);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}]).declareVariables(r,a,n)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${a.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${r.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${n.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${n.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${n.setByOffset("global_idx","seqlen")}
    };
  }
  `}}),{inputs:[l,d],outputs:[-1]})[0],u=e.inputs[7],p=e.inputs[8],c=tj({interleaved:0!==r.rotaryInterleaved,numHeads:a.numHeads,rotaryEmbeddingDim:0,scale:r.scale}),m=[h,o,u,p],w=[-1];g=e.compute(iq(m,c),{inputs:m,outputs:w})[0],m.splice(0,1,f);let x=tj({interleaved:0!==r.rotaryInterleaved,numHeads:a.kvNumHeads,rotaryEmbeddingDim:0,scale:r.scale});y=e.compute(iq(m,x),{inputs:m,outputs:w})[0]}let w=iD(e,a.batchSize,a.numHeads,a.sequenceLength,a.headSize,r.doRotary?g:h,void 0,0),x=iF(e,r.doRotary?y:f,a),k=iF(e,m,a);rN(e,w,x,k,void 0,void 0,o,u,void 0,a,l,d)}}),sb=eo(()=>{nM(),nD(),nF(),nV(),iH=(e,r,a,i,n,s,o,u)=>{let l=tH(s),d=1===l?"f32":`vec${l}f`,p=1===l?"vec2f":`mat2x${l}f`,c=n*o,h=64;1===c&&(h=256);let f=[n,o,s/l],m=[n,o,2],g=[];return g.push(...tG(f,m)),e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${h}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:c},programUniforms:g}),getShaderSource:e=>{let n=tJ("x",r.dataType,3,l),s=[n,tJ("scale",a.dataType,a.dims),tJ("bias",i.dataType,i.dims),t0("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${p}, ${h}>;
  const workgroup_size = ${h}u;
  ${e.declareVariables(...s)}
  ${e.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${n.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${p}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${tQ("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${tQ("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[r,a,i],outputs:[-1]})[0]},iK=(e,r)=>{var a,i,n;let s,o,u,l,d,p,c,h,f;"NHWC"===r.format?((e,r,a)=>{let i=r[0].dims,n=i[0],s=i[i.length-1],o=th.sizeFromDimension(i,1)/s,u=tH(s),l=th.size(i)/u,d=[{type:12,data:o},{type:12,data:Math.floor(s/u)}],p=!1,c=[0,i.length-1];for(let e=0;e<i.length-2;e++)p=p||1!==i[e+1],c.push(e+1);let h=(p=p&&1!==i[i.length-1])?e.compute(t8(e.inputs[0],c),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(e,r)=>i[c[r]])),f=iH(e,h,r[1],r[2],n,o,s,a.epsilon);e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:e=>{let a=tV(r[0].dataType),n=1===u?"vec2f":`mat${u}x2f`,s=e=>{let r=0===e?"x":"y",i=1===u?"f32":`vec${u}f`;switch(u){case 1:return`${a}(${i}(scale.${r}))`;case 2:return`vec2<${a}>(${i}(scale[0].${r}, scale[1].${r}))`;case 4:return`vec4<${a}>(${i}(scale[0].${r}, scale[1].${r}, scale[2].${r}, scale[3].${r}))`;default:throw Error(`Not supported compoents ${u}`)}},o=tJ("input",r[0].dataType,r[0].dims,u),l=t0("output",r[0].dataType,i,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${o.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${n}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${l.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${s(0)}, ${s(1)});
  }`}},{inputs:[r[0],f]})})(e,e.inputs,r):(a=e,i=e.inputs,n=r,o=(s=i[0].dims)[0],u=s[1],l=th.sizeFromDimension(s,2),d=tH(l),p=th.size(s)/d,c=iH(a,i[0],i[1],i[2],o,l,u,n.epsilon),h=[o,u,l/d],f=[o,u],a.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:s,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...tG(h,f,h)]}),getShaderSource:e=>{let r=tJ("x",i[0].dataType,h.length,d),a=tJ("scale_shift",1,f.length,2),n=t0("output",i[0].dataType,h.length,d),s=[r,a,n];return`
  ${e.registerUniform("output_size","u32").declareVariables(...s)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${n.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${a.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${r.getByOffset("global_idx")} * ${n.type.value}(scale_shift.x) + ${n.type.value}(scale_shift.y);
      ${n.setByOffset("global_idx","value")};
  }`}},{inputs:[i[0],c]}))}}),s_=eo(()=>{nM(),nD(),nV(),iZ=(e,r)=>{(e=>{if(!e||e.length<2)throw Error("layerNorm requires at least 2 inputs.")})(e.inputs),e.compute(((e,r,a)=>{let i=r.simplified,n=e[0].dims,s=e[1],o=!i&&e[2],u=th.normalizeAxis(r.axis,n.length),l=th.sizeToDimension(n,u),d=th.sizeFromDimension(n,u),p=th.size(s.dims),c=o?th.size(o.dims):0;if(p!==d||o&&c!==d)throw Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${c}`);let h=[];for(let e=0;e<n.length;++e)e<u?h.push(n[e]):h.push(1);let f=tH(d),m=["type","type"],g=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/f)},{type:1,data:r.epsilon}];o&&m.push("type");let y=a>1,b=a>2,_=[{dims:n,dataType:e[0].dataType}];return y&&_.push({dims:h,dataType:1}),b&&_.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${f};${a};${i}`,inputDependencies:m},getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:r=>{let a=tV(e[0].dataType),u=[tJ("x",e[0].dataType,e[0].dims,f),tJ("scale",s.dataType,s.dims,f)];return o&&u.push(tJ("bias",o.dataType,o.dims,f)),u.push(t0("output",e[0].dataType,n,f)),y&&u.push(t0("mean_data_output",1,h)),b&&u.push(t0("inv_std_output",1,h)),`
  ${r.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...u)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${tK("f32",f)};
    var mean_square_vector = ${tK("f32",f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${tZ(a,f,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${tQ("mean_vector",f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${tQ("mean_square_vector",f)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${tZ(a,f,"x[j + offset]")};
      let f32scale = ${tZ(a,f,"scale[j]")};
      output[j + offset] = ${u[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${tZ(a,f,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(e.inputs,r,e.outputCount))}}),s$=eo(()=>{nD(),n6(),n8(),iQ=e=>{var r=e.inputs;if(!r||2!==r.length)throw Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw Error("shared dimension does not match.");let a=tc.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!a)throw Error("Can't use matmul on the given tensors");let i=a[a.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(i<8&&n<8)e.compute(aP(e.inputs,{activation:""},a));else{let r=a[a.length-2],s=th.size(e.inputs[0].dims.slice(0,-2)),o=th.size(e.inputs[1].dims.slice(0,-2));if(1!==s&&1===r&&1===o){let r=e.inputs[0].reshape([1,s,n]),o=e.inputs[1].reshape([1,n,i]),u=[1,s,i],l=[r,o];e.compute(aW(l,{activation:""},a,u),{inputs:l})}else e.compute(aW(e.inputs,{activation:""},a))}}}),sv=eo(()=>{nM(),nD(),nW(),nV(),iX=(e,r)=>{var a,i,n,s;let o,u,l,d,p,c,h,f,m,g,y,b,_,$,v,w,x,k,S,T,I,C,E,z,A,O,R,M,N,B,D,U,P,L,j,q,W,V,F,G,H,K;((e,r)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let a=e[0],i=a.dims.length;if(a.dims[i-1]!==r.k)throw Error("The last dim of input shape does not match the k value");let n=Math.floor((r.k+r.blockSize-1)/r.blockSize),s=r.blockSize/8*r.bits,o=e[1];if(!th.areEqual(o.dims,[r.n,n,s]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(th.size(u)!==r.n*n)throw Error("scales input size error.");if(4===e.length){let a=e[3].dims,i=r.n*(8===r.bits?n:Math.floor((n*r.bits+7)/8));if(th.size(a)!==i)throw Error("zeroPoints input size error.")}})(e.inputs,r),32===r.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute((a=e.inputs,i=r,u=(o=a[0].dims).length,l=o[u-2],d=i.k,p=i.n,c=o.slice(0,u-2),h=th.size(c),f=a[1].dims[2]/4,m=a[0].dataType,g=tH(i.k),y=tH(f),b=c.concat([l,p]),$=128/(_=p%8==0?8:p%4==0?4:1),x=(w=$*y*(v=Math.floor(32/i.bits)))/g,k=w/i.blockSize,S=th.size(b)/_,T=[],I=[h,l,d/g],(C=th.convertShape(a[1].dims).slice()).splice(-1,1,f/y),T.push(...tG(I)),T.push(...tG(C)),T.push(...tG(a[2].dims)),4===a.length&&T.push(...tG(th.convertShape(a[3].dims))),E=[h,l,p],T.push(...tG(E)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${i.blockSize};${g};${y};${$};${_}`,inputDependencies:Array(a.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:m}],dispatchGroup:{x:S},programUniforms:T}),getShaderSource:e=>{let r=I.length,n=tJ("a",a[0].dataType,r,g),s=tJ("b",12,C.length,y),o=tJ("scales",a[2].dataType,a[2].dims.length),u=[n,s,o],l=4===a.length?tJ("zero_points",12,a[3].dims.length):void 0;l&&u.push(l);let d=E.length,p=t0("output",a[0].dataType,d),c=tV(a[0].dataType),h=()=>{switch(g){case 1:return`
          let a_data0 = vec4<${c}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${c}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${c}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${c}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${g}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${n.type.value}, ${x}>;
        var<workgroup> inter_results: array<array<${p.type.value}, ${$}>, ${_}>;
        ${e.declareVariables(...u,p)}
        ${e.mainStart([$,_,1])}
          let output_indices = ${p.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${x};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${x}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${n.getByIndices(`${n.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${n.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${k} + local_id.x;
            ${l?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/i.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${i.bits}u);
            let zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${c}((zero_point_word) & ${2===i.bits?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,i.bits-1)} for unsigned ${i.bits}-bit quantization.
            let zero_point = ${c}(${Math.pow(2,i.bits-1).toFixed(1)});`}
            let scale = ${o.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${s.getByIndices(`${s.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${i.blockSize/g};
            for (var i: u32 = 0; i < ${y}; i++) {
              let b_value = ${1===y?"b_data":"b_data[i]"};
              ${(()=>{let e=Math.floor(v/8),r="";for(let a=0;a<e;a++){let e=a*i.bits*4,n=e+i.bits;r+=`
              ${h()}
              {${2===i.bits?`
                let half_word = b_value >> ${16*a}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${n}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${c}>(${Array.from({length:4},(e,r)=>`${c}(b_value_lower[${r}]), ${c}(b_value_upper[${r}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${c}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,r)=>`dot(a_data${r}, b_dequantized_values[${r}])`).join(" + ")};
              }
              word_offset += ${8/g};`}return r})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${p.setByIndices(`${p.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}})):e.compute((n=e.inputs,s=r,A=(z=n[0].dims).length,O=z[A-2],R=s.k,M=s.n,N=z.slice(0,A-2),B=th.size(N),D=n[1].dims[2]/4,U=n[0].dataType,P=tH(s.k),L=tH(D),j=tH(M),q=N.concat([O,M]),W=O>1&&M/j%2==0?2:1,V=th.size(q)/j/W,F=[],G=[B,O,R/P],(H=th.convertShape(n[1].dims).slice()).splice(-1,1,D/L),F.push(...tG(G)),F.push(...tG(H)),F.push(...tG(n[2].dims)),4===n.length&&F.push(...tG(th.convertShape(n[3].dims))),K=[B,O,M/j],F.push(...tG(K)),{name:"MatMulNBits",shaderCache:{hint:`${s.blockSize};${s.bits};${P};${L};${j};${W};64`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:q,dataType:U}],dispatchGroup:{x:V},programUniforms:F}),getShaderSource:e=>{let r=G.length,a=tJ("a",n[0].dataType,r,P),i=tJ("b",12,H.length,L),o=tJ("scales",n[2].dataType,n[2].dims.length),u=[a,i,o],l=4===n.length?tJ("zero_points",12,n[3].dims.length):void 0;l&&u.push(l);let d=K.length,p=t0("output",n[0].dataType,d,j),c=tV(n[0].dataType),h=(()=>{switch(P){case 1:return`array<${c}, 8>`;case 2:return`mat4x2<${c}>`;case 4:return`mat2x4<${c}>`;default:throw Error(`${P}-component is not supported.`)}})(),f=Math.floor(32/s.bits),m=Math.floor(f/8);return`
        var<workgroup> workgroup_shared: array<${p.type.value}, ${64*W}>;
        ${e.declareVariables(...u,p)}
        ${e.mainStart([64,1,1])}
          let output_indices = ${p.offsetToIndices(`(global_idx / 64) * ${W}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${s.blockSize/P};
            ${(()=>{let e=`
            var col_index = col * ${j};
            ${l?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/s.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,s.bits-1)} for unsigned ${s.bits}-bit quantization.
            let zero_point = ${c}(${Math.pow(2,s.bits-1).toFixed(1)});`}
            `;for(let r=0;r<j*W;r++)e+=`
            let scale${r} = ${o.getByOffset("col_index * nBlocksPerCol + block")};
            ${l?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${s.bits}u);
            zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${r} = ${c}((zero_point_word) & ${2===s.bits?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return e})()}
            for (var word: u32 = 0; word < ${D}; word += ${L}) {
              ${(()=>{let e=`col_index = col * ${j};`;for(let r=0;r<j*W;r++)e+=`
            let b${r}_data = ${i.getByIndices(`${i.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+`
            var b_value: u32;
            let b_mask: u32 = ${2===s.bits?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${h};
            var b_dequantized_values: ${h};`})()}
              for (var i: u32 = 0; i < ${L}; i++) {
                ${(()=>{let e="";for(let r=0;r<m;r++){let i=r*s.bits*4,n=i+s.bits;e+=`
          // reuse a data (pass ${r})
            var input_offset${r>0?r:""} = ${0===r?a.indicesToOffset(`${a.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${r>0?r:""}: ${h};
            for (var j${r>0?r:""}: u32 = 0; j${r>0?r:""} < ${8/P}; j${r>0?r:""}++) {
              a_data${r>0?r:""}[j${r>0?r:""}] = ${a.getByOffset(`input_offset${r>0?r:""}`)};
              input_offset${r>0?r:""}++;
            }
          `;for(let a=0;a<j*W;a++)e+=`
            b_value = ${1===L?`b${a}_data`:`b${a}_data[i]`};
            ${2===s.bits?`{
              let half_word = b_value >> ${16*r}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${i}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${n}u) & b_mask);`}
            b_quantized_values = ${h}(${Array.from({length:4},(e,r)=>`${c}(b_value_lower[${r}]), ${c}(b_value_upper[${r}])`).join(", ")});
            b_dequantized_values = ${1===P?`${h}(${Array.from({length:8},(e,r)=>`(b_quantized_values[${r}] - ${l?`zero_point${a}`:"zero_point"}) * scale${a}`).join(", ")});`:`(b_quantized_values - ${h}(${Array(8).fill(`${l?`zero_point${a}`:"zero_point"}`).join(",")})) * scale${a};`};
            workgroup_shared[local_id.x * ${W} + ${Math.floor(a/j)}]${j>1?`[${a%j}]`:""} += ${Array.from({length:8/P},(e,a)=>`${1===P?`a_data${r>0?r:""}[${a}] * b_dequantized_values[${a}]`:`dot(a_data${r>0?r:""}[${a}], b_dequantized_values[${a}])`}`).join(" + ")};
          `}return e})()}
                word_offset += ${f/P};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${W}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${W};
            }
            ${p.setByIndices(`${p.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))},iY=e=>tj(e)}),sw=eo(()=>{nM(),nD(),nV(),iJ=(e,r)=>{let a,i,n,s;var o,u,l=e.inputs;if(!l||l.length<1)throw Error("Too few inputs");if(1!==l[0].dataType&&10!==l[0].dataType)throw Error("Input type must be float or float16.");if(l.length>=2){let e=2*l[0].dims.length===l[1].dims[0];if(4===l.length&&(e=2*l[3].dims[0]===l[1].dims[0]),!e)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let d=((e,r)=>{if(!(e.length>1))return r;{let a=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,s=new Int32Array(2*n).fill(0);if(e.length>=4){let r=e[3].getBigInt64Array();for(let e=0;e<r.length;e++)s[Number(r[e])]=Number(a[e]),s[Number(r[e])+n]=Number(a[e+r.length])}else a.forEach((e,r)=>s[Number(r)]=Number(e));let o=[];return s.forEach(e=>o.push(e)),{mode:r.mode,value:i,pads:o}}})(e.inputs,r);e.compute((o=e.inputs,u=d,a=th.padShape(o[0].dims.slice(),u.pads),i=o[0].dims,n=[{type:12,data:th.size(a)},{type:6,data:u.pads}],s=o.length>=3&&o[2].data,0===u.mode&&n.push({type:s?o[2].dataType:1,data:u.value}),n.push(...tG(o[0].dims,a)),{name:"Pad",shaderCache:{hint:`${u.mode}${s}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:o[0].dataType}],dispatchGroup:{x:Math.ceil(th.size(a)/64)},programUniforms:n}),getShaderSource:e=>{let r=t0("output",o[0].dataType,a.length),n=tJ("x",o[0].dataType,i.length),l=n.type.value,d=((e,r,a)=>{switch(a.mode){case 0:var i=e,n=r,s=a.pads.length;let o="";for(let e=n-1;e>=0;--e)o+=`
            k = i32(${i.indicesGet("indices",e)}) - ${tX("uniforms.pads",e,s)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${tX("uniforms.x_shape",e,n)})) {
              break;
            }
            offset += k * i32(${tX("uniforms.x_strides",e,n)});
        `;return`
          value = ${i.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${o}
            value = x[offset];
          }
      `;case 1:var u=e,l=r,d=a.pads.length;let p="";for(let e=l-1;e>=0;--e)p+=`
                k = i32(${u.indicesGet("indices",e)}) - ${tX("uniforms.pads",e,d)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${tX("uniforms.x_shape",e,l)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${tX("uniforms.x_shape",e,l)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${tX("uniforms.x_strides",e,l)});
            `;return`
              var offset = 0;
              var k = 0;
              ${p}
              value = x[offset];
          `;case 2:var c=e,h=r,f=a.pads.length;let m="";for(let e=h-1;e>=0;--e)m+=`
                k = i32(${c.indicesGet("indices",e)}) - ${tX("uniforms.pads",e,f)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${tX("uniforms.x_shape",e,h)})) {
                  k = i32(${tX("uniforms.x_shape",e,h)}) - 1;
                }
                offset += k * i32(${tX("uniforms.x_strides",e,h)});
            `;return`
              var offset = 0;
              var k = 0;
              ${m}
              value = x[offset];
          `;case 3:var g=e,y=r,b=a.pads.length;let _="";for(let e=y-1;e>=0;--e)_+=`
                k = i32(${g.indicesGet("indices",e)}) - ${tX("uniforms.pads",e,b)};
                if (k < 0)  {
                  k += i32(${tX("uniforms.x_shape",e,y)}]);
                }
                if (k >= i32(${tX("uniforms.x_shape",e,y)})) {
                  k -= i32(${tX("uniforms.x_shape",e,y)});
                }
                offset += k * i32(${tX("uniforms.x_strides",e,y)});
            `;return`
              var offset = 0;
              var k = 0;
              ${_}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(r,i.length,u),p=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:u.pads.length}];return 0===u.mode&&p.push({name:"constant_value",type:s?l:"f32"}),`
            ${e.registerUniforms(p).declareVariables(n,r)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${r.offsetToIndices("global_idx")};

            var value = ${l}(0);
            ${d}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}),sx=eo(()=>{eC(),nM(),nD(),nV(),i0=e=>{if(A.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},i1=(e,r,a)=>{let i="NHWC"===r.format,n=e.dims.slice();i&&n.splice(1,0,n.pop());let s=Object.hasOwnProperty.call(r,"dilations"),o=r.kernelShape.slice(),u=r.strides.slice(),l=s?r.dilations.slice():[],d=r.pads.slice();tf.adjustPoolAttributes(a,n,o,u,l,d);let p=tf.computePoolOutputShape(a,n,u,l,o,d,r.autoPad),c=Object.assign({},r);s?Object.assign(c,{kernelShape:o,strides:u,pads:d,dilations:l,cacheKey:r.cacheKey}):Object.assign(c,{kernelShape:o,strides:u,pads:d,cacheKey:r.cacheKey});let h=p.slice();return h.push(h.splice(1,1)[0]),[c,i?h:p]},i2=(e,r)=>{let a="NHWC"===r.format,i=[{type:12,data:th.size(e)},{type:12,data:th.size(r.kernelShape)}],n=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(r.kernelShape.length<=2){let e=r.kernelShape[r.kernelShape.length-1],a=r.strides[r.strides.length-1],s=r.pads[r.pads.length/2-1],o=r.pads[r.pads.length-1],u=!!(s+o);i.push({type:12,data:e},{type:12,data:a},{type:12,data:s},{type:12,data:o}),n.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let l=!1;if(2===r.kernelShape.length){let e=r.kernelShape[r.kernelShape.length-2],a=r.strides[r.strides.length-2],s=r.pads[r.pads.length/2-2],o=r.pads[r.pads.length-2];l=!!(s+o),i.push({type:12,data:e},{type:12,data:a},{type:12,data:s},{type:12,data:o}),n.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,n,!0,u,l]}{if(a)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=th.computeStrides(r.kernelShape);return i.push({type:12,data:e},{type:12,data:r.pads},{type:12,data:r.strides}),n.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:r.pads.length},{name:"strides",type:"u32",length:r.strides.length}),[i,n,!!r.pads.reduce((e,r)=>e+r),!1,!1]}},i3=(e,r,a,i,n,s,o,u,l,d,p,c)=>{let h="NHWC"===n.format,f=r.type.value,m=t0("output",r.type.tensor,i);if(n.kernelShape.length<=2){let i="",d="",g="",y=a-(h?2:1);if(i=p?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${y}] < 0 || xIndices[${y}]
                      >= uniforms.x_shape[${y}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${r.indicesToOffset("xIndices")}];
                  ${s}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${r.indicesToOffset("xIndices")}];
                  ${s}
                }`,2===n.kernelShape.length){let e=a-(h?3:2);d=c?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${e}] < 0 || xIndices[${e}] >= uniforms.x_shape[${e}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                `,g=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(r,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${u});
              var pad = 0;
              ${d}
              ${i}
              ${g}
              ${o}

              output[global_idx] = value;
            }`}{if(h)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let i=n.kernelShape.length,p=n.pads.length,c="";return c=d?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${r.indicesToOffset("xIndices")}];
                ${s}
              }`:`
              }
              let x_val = x[${r.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(l).declareVariables(r,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${i}>;

              var value = ${f}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${i-1}u; j++) {
                  offsets[j] = offset / ${tX("uniforms.kernelStrides","j",i)};
                  offset -= offsets[j] * ${tX("uniforms.kernelStrides","j",i)};
                }
                offsets[${i-1}] = offset;

                isPad = false;
                for (var j = ${a-i}u; j < ${a}u; j++) {
                  xIndices[j] = indices[j] * ${tX("uniforms.strides",`j - ${a-i}u`,i)}
                    + offsets[j - ${a-i}u] - ${tX("uniforms.pads","j - 2u",p)};
                  ${c}
              }
              ${o}

              output[global_idx] = value;
            }`}},i4=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,i6=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),i8=(e,r,a,i)=>{let[n,s]=i1(r,i,a),o=tJ("x",r.dataType,r.dims.length),u=o.type.value,l="";n.countIncludePad?l+=`value /= ${u}(uniforms.kernelSize);`:l+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[d,p,c,h,f]=i2(s,n);return d.push(...tG(r.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${c};${h};${f}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(th.size(s)/64)},programUniforms:d}),getShaderSource:e=>i3(e,o,r.dims.length,s.length,n,"value += x_val;",l,0,p,c,h,f)}},i5=e=>{let r,a=0!==e.count_include_pad,i=i6(e);if(0!==i.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:a,...i,cacheKey:""};return{...n,cacheKey:(r=n,`${i4(r)};${r.countIncludePad}`)}},i9=(e,r)=>{i0(e.inputs),e.compute(i8("AveragePool",e.inputs[0],!1,r))},i7={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ne=e=>{let r=e.format;return{format:r,...i7,cacheKey:r}},nt=(e,r)=>{i0(e.inputs),e.compute(i8("GlobalAveragePool",e.inputs[0],!0,r))},nr=(e,r,a,i)=>{let[n,s]=i1(r,i,a),o=`
      value = max(x_val, value);
    `,u=tJ("x",r.dataType,r.dims.length),[l,d,p,c,h]=i2(s,n);return l.push(...tG(r.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${p};${c};${h}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(th.size(s)/64)},programUniforms:l}),getShaderSource:e=>i3(e,u,r.dims.length,s.length,n,o,"",10===r.dataType?-65504:-1e5,d,p,c,h)}},na=(e,r)=>{i0(e.inputs),e.compute(nr("MaxPool",e.inputs[0],!1,r))},ni=e=>{let r,a=e.storage_order,i=e.dilations,n=i6(e);if(0!==a)throw Error("column major storage order is not yet supported for MaxPool");if(0!==n.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let s={storageOrder:a,dilations:i,...n,cacheKey:""};return{...s,cacheKey:(r=s,`${i4(r)};${r.storageOrder};${r.dilations}`)}},nn=e=>{let r=e.format;return{format:r,...i7,cacheKey:r}},ns=(e,r)=>{i0(e.inputs),e.compute(nr("GlobalMaxPool",e.inputs[0],!0,r))}}),sk=eo(()=>{nM(),nD(),nW(),nV(),no=(e,r)=>{var a,i;let n,s,o,u,l,d,p,c,h,f,m,g,y,b,_,$,v,w,x,k,S,T,I;((e,r)=>{if(e.length<2||e.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===e.length&&e[1].dims===e[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===e.length&&e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(0!==e[1].dims.length&&1!==e[1].dims.length&&e[1].dims.length!==e[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,a)=>r===e[2].dims[a]).reduce((e,r)=>e&&r,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(r.blockSize>0){if(0===e[1].dims.length||1===e[1].dims.length&&1===e[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,i)=>i===r.axis||a===e[0].dims[i]).reduce((e,r)=>e&&r,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let a=e[0].dims[r.axis],i=e[1].dims[r.axis];if(r.blockSize<Math.ceil(a/i)||r.blockSize>Math.ceil(a/(i-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}})(e.inputs,r),e.compute((a=e.inputs,i=r,n=th.normalizeAxis(i.axis,a[0].dims.length),o=3===(s=a[0].dataType),u=a[0].dims,l=a[1].dataType,d=th.size(u),c=(p=3===s||2===s)?[Math.ceil(th.size(a[0].dims)/4)]:a[0].dims,h=a[1].dims,m=(f=a.length>2?a[2]:void 0)?p?[Math.ceil(th.size(f.dims)/4)]:f.dims:void 0,y=!1==(g=0===h.length||1===h.length&&1===h[0])&&1===h.length,b=tH(d),$=(_=g&&(!p||4===b))?b:1,v=tJ("input",p?12:s,c.length,_&&!p?b:1),w=tJ("scale",l,h.length),x=f?tJ("zero_point",p?12:s,m.length):void 0,k=t0("output",l,u.length,$),S=[v,w],x&&S.push(x),T=[c,h],f&&T.push(m),I=[{type:12,data:d/$},{type:12,data:n},{type:12,data:i.blockSize},...tG(...T,u)],{name:"DequantizeLinear",shaderCache:{hint:i.cacheKey,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getShaderSource:e=>`
      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...S,k)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${k.offsetToIndices("global_idx")};

          // Set input x
          ${p?`
            let input = ${v.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===$?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${v.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${w.getByOffset("0")}`:y?`
            let scale_index = ${k.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${w.getByOffset("scale_index")};`:`
            var scale_indices: ${w.type.indices} = output_indices;
            let index = ${w.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${w.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${w.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${x?g?p?`
                let zero_point_input = ${x.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${x.getByOffset("0")}`:y?p?`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${x.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${x.getByOffset("zero_point_index")};`:p?`
                let zero_point_offset = ${w.indicesToOffset("scale_indices")};
                let zero_point_input = ${x.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${x.getByIndices("scale_indices")};`:`let zero_point_value = ${p?o?"i32":"u32":v.type.value}(0);`};
      // Compute and write output
      ${k.setByOffset("global_idx",`${k.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:u,dataType:l}],dispatchGroup:{x:Math.ceil(d/$/64),y:1,z:1},programUniforms:I})}))},nu=e=>tj({axis:e.axis,blockSize:e.blockSize})}),sS=eo(()=>{eC(),nM(),nV(),nl=e=>{var r,a,i,n;let s,o,u,l=0,d=0,p=0;6===e.inputs[0].dataType?(l=e.inputs[0].getInt32Array()[0],d=e.inputs[1].getInt32Array()[0],p=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(l=e.inputs[0].getFloat32Array()[0],d=e.inputs[1].getFloat32Array()[0],p=e.inputs[2].getFloat32Array()[0]),A.webgpu.validateInputContent&&((e,r,a)=>{if(e===r||e<r&&a<0||e>r&&a>0)throw Error("Range these inputs' contents are invalid.")})(l,d,p),e.compute((r=l,a=d,i=p,n=e.inputs[0].dataType,o=[s=Math.abs(Math.ceil((a-r)/i))],u=[{type:12,data:s},{type:n,data:r},{type:n,data:i},...tG(o)],{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:e=>{let r=t0("output",n,o.length),a=r.type.value;return`
        ${e.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:a},{name:"delta",type:a}]).declareVariables(r)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${a}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}),{inputs:[]})}}),sT=eo(()=>{nM(),nD(),nW(),nV(),nd=e=>tj({reduction:e.reduction}),np=(e,r)=>{var a,i;let n,s,o,u,l,d;e.compute((a=e.inputs,i=r,n=a[0].dims,s=a[1].dims,o=Math.ceil(th.sizeToDimension(s,s.length-1)/1),u=s[s.length-1],l=th.sizeFromDimension(n,u),d=[{type:12,data:o},{type:12,data:u},{type:12,data:l},...tG(a[1].dims,a[2].dims,n)],{name:"ScatterND",shaderCache:{hint:`${i.cacheKey}_${i.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:e=>{let r=tJ("indices",a[1].dataType,a[1].dims.length),s=tJ("updates",a[2].dataType,a[2].dims.length,1),o="none"!==i.reduction&&""!==i.reduction?t1("output",a[0].dataType,n.length):t0("output",a[0].dataType,n.length,1);return`
      ${e.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(r,s,o)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${1===a[0].dims.length?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${((e,r,a,i)=>{if("none"!==e&&"i32"!==i&&"u32"!==i&&"f32"!==i)throw Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${r}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${r}=${a};`;case"add":return"i32"===i||"u32"===i?`atomicAdd(&${r}, bitcast<${i}>(${a}));`:`
              ${n}bitcast<${i}>(oldValue) + (${a})${s}`;case"max":return"i32"===i||"u32"===i?`atomicMax(&${r}, bitcast<${i}>(${a}));`:`
                ${n}max(bitcast<f32>(oldValue), (${a}))${s}`;case"min":return"i32"===i||"u32"===i?`atomicMin(&${r}, bitcast<${i}>(${a}));`:`${n}min(bitcast<${i}>(oldValue), (${a}))${s}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${a}))${s}`;default:throw Error(`Reduction ${e} is not supported.`)}})(i.reduction,"output[data_offset + i]","value",o.type.value)}
  }

      }`}}),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),sI=eo(()=>{nM(),nD(),nW(),nV(),nc=(e,r,a,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${r});
  let whole = ${i}(big / (${a}));
  let fract = ${i}(big % (${a})) / ${i}(${a});
  return whole + fract;
`,nh=(e,r,a,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",r,"channel")};
    ${e.indicesSet("input_indices",a,"batch")};
`:"",nf=(e,r)=>{var a,i,n,s,o,u,l,d,p,c,h,f;let m,g,y,b,_,$,v,w,x,k,S,T,I,C,E,z,A=[],O=[],R=[],M=new Uint32Array(m=e.customDataBuffer,m.byteOffset,1)[0];if(0!==r.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((e,r,a,i,n,s)=>{let[o,u,l]=a>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(e=>s.push(e));else if("tf_crop_and_resize"===r.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0){var p,c,h;let n;if(e[u].getFloat32Array().forEach(e=>i.push(e)),0!==i.length&&i.length!==d&&a>=18&&i.length!==r.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");((e,r)=>{if(e.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),e.length>0){if("linear"===r.mode){if(2!==e.length&&3!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3])&&(5!==e.length||1!==e[0]||1!==e[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===r.mode&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}})(i,r),r.axes.length>0&&(p=i,c=r.axes,h=d,c.every(e=>e>=0&&e<h||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),n=Array(h).fill(1),c.forEach((e,r)=>n[e]=p[r]),n).forEach((e,r)=>i[r]=e)}if(l>0&&e.length>l&&1===e[l].dims.length&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(e=>n.push(Number(e))),0!==n.length&&n.length!==d&&a>=18&&n.length!==r.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(r.axes.length>0){if(0!==i.length&&i.length!==r.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==n.length&&n.length!==r.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof i&&"u">typeof n&&i.length>0&&n.length>d)throw Error("Resize requires only of scales or sizes to be specified")})(e.inputs,r,M,A,O,R),e.compute((a=e.inputs[0],i=r,n=M,s=A,o=O,u=R,b=a.dims,_=(l=u,d=i.axes,g=Array(p=b.length).fill(0).concat(Array(p).fill(1)),y=0===l.length?g:l.slice(),d.length>0?(d.forEach((e,r)=>{g[e]=y[r],g[r+p]=y[d.length+r]}),g):y),$=((e,r,a,i)=>{let n=[];if(a.length>0)if(i.length>0){if(e.forEach(e=>n.push(e)),Math.max(...i)>e.length)throw Error("axes is out of bound");i.forEach((e,r)=>n[e]=a[r])}else a.forEach(e=>n.push(e));else{if(0===r.length)throw Error("Resize requires either scales or sizes.");n=e.map((e,a)=>Math.round(e*r[a]))}return n})(b,s,o,i.axes),v=s.slice(),0===s.length&&(v=b.map((e,r)=>0===e?1:$[r]/e),"stretch"!==i.keepAspectRatioPolicy&&(c=b,h=v,f=i,w=(()=>{switch(f.keepAspectRatioPolicy){case"not_larger":return f.axes.length>0?Math.min(...f.axes.map(e=>h[e]),Number.MAX_VALUE):Math.min(...h,Number.MAX_VALUE);case"not_smaller":return f.axes.length>0?Math.max(...f.axes.map(e=>h[e]),5e-324):Math.max(...h,5e-324);default:throw Error(`Keep aspect ratio policy ${f.keepAspectRatioPolicy} is not supported`)}})(),h.fill(1,0,h.length),x=c.slice(),f.axes.length>0?(f.axes.forEach(e=>h[e]=w),f.axes.forEach(e=>x[e]=Math.round(c[e]*h[e]))):(h.fill(w,0,h.length),x.forEach((e,r)=>x[r]=Math.round(e*h[r]))),$=x)),k=t0("output",a.dataType,$.length),S=tJ("input",a.dataType,b.length),T=th.size($),I=b.length===$.length&&b.every((e,r)=>e===$[r]),C="tf_crop_and_resize"===i.coordinateTransformMode,E=i.extrapolationValue,z=S.type.value,{name:"Resize",shaderCache:{hint:`${i.cacheKey}|${n}|${v.length>0?"cubic"===i.mode?v:v.length:""}|${o.length>0?o:""}|${_.length>0?_:""}|${I}|${"nearest"===i.mode?b.length:b}`,inputDependencies:["rank"]},getShaderSource:e=>{let r,a;return`
      ${I?"":`
      ${r=i.coordinateTransformMode,a=z,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${a} { `+(()=>{switch(r){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${a}(xResized) / ${a}(xScale);
          } else {
            ${nc("xResized","lengthOriginal","lengthResized",a)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${a}(xResized) + 0.5) / ${a}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${a}(xResized) + 0.5) / ${a}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${nc("xResized","lengthOriginal - 1","lengthResized - 1",a)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${a}(roiStart) * ${a}(lengthOriginal - 1) +
                        (${a}(xResized) * ${a}(roiEnd - roiStart) * ${a}(lengthOriginal - 1)) /
                        ${a}(lengthResized - 1);
                  } else {
                    return 0.5 * ${a}(roiStart + roiEnd) * ${a}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${a}xScale * ${a}(lengthResized);
                  const adjustment = ${a}(lengthResized) / outputWidth;
                  const center = ${a}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${a}(xResized) + 0.5) / ${a}(xScale)) - 0.5;`;case"half_pixel":return`return ((${a}(xResized) + 0.5) / ${a}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${r} is not supported`)}})()+"}"};
      ${(()=>{switch(i.mode){case"nearest":let e,r,a,s,o,u,l,d,p,c,h,f;return`
              ${e=S,r=b,`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${tX("uniforms.input_shape","i",r.length)}) {
          return false;
        }
      }
      return true;
    }`};
              ${a=i.nearestMode,s=n,o=z,`fn getNearestPixelFromOriginal(xOriginal: ${o}, isDownSample: bool) -> ${o} {`+(()=>{switch(a){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(s<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${a} is not supported`)}})()+"}"};
              ${u=S,l=k,d=b,p=$,c=v.length,h=_.length,f=C,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${l.type.indices}) -> ${u.type.indices} {
      var input_indices: ${u.type.indices};
      for (var i:u32 = 0; i < ${p.length}; i++) {
        var output_index = ${l.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${tX("uniforms.scales","i",c)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${tX("uniforms.roi","i",h)};
          var roi_hi = ${tX("uniforms.roi",`i + ${d.length}`,h)};
          var input_shape_i = ${tX("uniforms.input_shape","i",d.length)};
          var output_shape_i = ${tX("uniforms.output_shape","i",p.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${f} || (original_idx >= 0 && original_idx < ${l.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${l.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${u.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`};
              `;case"linear":let m,g,y,w,x;return`
              ${m=k,g=b,y=$,w=v.length,x=_.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${m.type.indices}) -> array<${m.type.value}, ${y.length}> {
      var original_indices: array<${m.type.value}, ${y.length}>;
      for (var i:u32 = 0; i < ${y.length}; i++) {
        var output_index = ${m.indicesGet("output_indices","i")};
        var scale = ${tX("uniforms.scales","i",w)};
        var roi_low = ${tX("uniforms.roi","i",x)};
        var roi_hi = ${tX("uniforms.roi",`i + ${g.length}`,x)};
        if (scale == 1.0) {
          original_indices[i] = ${m.type.value}(output_index);
        } else {
          var input_shape_i = ${tX("uniforms.input_shape","i",g.length)};
          var output_shape_i = ${tX("uniforms.output_shape","i",y.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===b.length||4===b.length)return`${((e,r,a,i,n)=>{let[s,o,u,l]=2===a.length?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${a[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${a[u]} - 1))`)};
      ${nh(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${r.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${o}];
      var col:${d} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${a[o]} - 1) || col < 0 || col > (${a[u]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${a[o]} - 1));
      col = max(0, min(col, ${a[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${a.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${a.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`})(S,k,b,C,E)}`;if(3===b.length||5===b.length)return`${((e,r,a,i,n)=>{let[s,o,u,l,d]=3===a.length?[-1,0,1,2,-1]:[0,2,3,4,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${a[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${a[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${a[l]} - 1))`)};
      ${nh(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${r.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${o}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${a[o]} - 1) || height < 0 || height > (${a[u]} - 1) || width < 0 || (width > ${a[l]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${a[o]} - 1));
      height = max(0, min(height, ${a[u]} - 1));
      width = max(0, min(width, ${a[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${a.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${a.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`})(S,k,b,C,E)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===b.length||4===b.length)return`${((e,r,a,i,n,s,o,u,l,d)=>{let[p,c]=2===a.length?[0,1]:[2,3],h=e.type.value,f=o=>{let c=o===p?"row":"col";return`
      fn ${c}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${r.type.indices}) -> ${h} {
        var output_index = ${r.indicesGet("output_indices",o)};
        var originalIdx: ${h} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[o]},
        ${i[o]}, ${a[o]}, ${s[o]}, ${s[o]} + ${a.length});
        var fractOriginalIdx: ${h} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${a[o]} - 1))) {
          return ${l};
        }
        var data: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${c}: ${h} = originalIdx + ${h}(i);
          if (${c} < 0 || ${c} >= ${a[o]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${c} = max(0, min(${c}, ${a[o]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",o,`u32(${c})`)};
          data[i + 1] = ${o===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(p)};
    ${f(c)};
  fn getCubicInterpolationCoefs(s: ${h}) -> array<${h}, 4> {
    var absS = abs(s);
    var coeffs: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${h} = 1.0 - absS;
    var twoMinusAbsS: ${h} = 2.0 - absS;
    var onePlusAbsS: ${h} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${h}, 4>, coefs: array<${h}, 4>) -> ${h} {
    var coefsSum: ${h} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${r.type.indices}) -> ${h} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `})(S,k,b,$,v,_,i.cubicCoeffA,C,i.extrapolationValue,i.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${e.registerUniform("output_size","u32").registerUniform("scales","f32",v.length).registerUniform("roi","f32",_.length).declareVariables(S,k)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${I?"output[global_idx] = input[global_idx];":`
        let output_indices = ${k.offsetToIndices("global_idx")};
        var input_indices: ${S.type.indices};
        ${(()=>{switch(i.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${S.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${i.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===b.length||4===b.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${i.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:$,dataType:a.dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},{type:1,data:v},{type:1,data:_},...tG(b,$)]})}),{inputs:[0]})},nm=e=>{let r=e.antialias,a=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,s=0!==e.excludeOutside,o=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,d=""===e.nearestMode?"simple":e.nearestMode;return tj({antialias:r,axes:a,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:s,extrapolationValue:o,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),sC=eo(()=>{nM(),nD(),nV(),ng=(e,r)=>{var a,i,n,s;let o,u,l,d,p,c,h,f,m,g,y,b,_;(e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let r=e[0],a=e[1],i=e[2];if(r.dataType!==a.dataType||r.dataType!==i.dataType)throw Error("All inputs must have the same data type");if(3!==r.dims.length&&2!==r.dims.length)throw Error("Input must be 2D or 3D");if(3!==a.dims.length&&2!==a.dims.length)throw Error("Skip must be 2D or 3D");let n=r.dims[r.dims.length-1],s=r.dims[r.dims.length-2];if(a.dims[a.dims.length-1]!==n)throw Error("Skip must have the same hidden size as input");if(a.dims[a.dims.length-2]!==s)throw Error("Skip must have the same sequence length as input");if(1!==i.dims.length)throw Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let r=e[3];if(1!==r.dims.length)throw Error("Beta must be 1D");if(r.dims[r.dims.length-1]!==n)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let r=e[4];if(1!==r.dims.length)throw Error("Bias must be 1D");if(r.dims[r.dims.length-1]!==n)throw Error("Bias must have the same hidden size as input")}})(e.inputs);let $=[0];e.outputCount>1&&$.push(-3),e.outputCount>2&&$.push(-3),e.outputCount>3&&$.push(3),e.compute((a=e.inputs,i=r,n=e.outputCount,s=!1,o=i.simplified,u=a[0].dims,l=th.size(u),d=u.slice(-1)[0],p=s?u.slice(0,-1).concat(1):[],c=!o&&a.length>3,h=a.length>4,f=s&&n>1,m=s&&n>2,g=n>3,b=[{type:12,data:l},{type:12,data:y=tH(d)},{type:12,data:d},{type:1,data:i.epsilon}],_=[{dims:u,dataType:a[0].dataType}],n>1&&_.push({dims:p,dataType:1}),n>2&&_.push({dims:p,dataType:1}),n>3&&_.push({dims:u,dataType:a[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${m};${g}`,inputDependencies:a.map((e,r)=>"type")},getShaderSource:e=>{let r=[tJ("x",a[0].dataType,a[0].dims,y),tJ("skip",a[1].dataType,a[1].dims,y),tJ("gamma",a[2].dataType,a[2].dims,y)];c&&r.push(tJ("beta",a[3].dataType,a[3].dims,y)),h&&r.push(tJ("bias",a[4].dataType,a[4].dims,y)),r.push(t0("output",a[0].dataType,u,y)),f&&r.push(t0("mean_output",1,p)),m&&r.push(t0("inv_std_output",1,p)),g&&r.push(t0("input_skip_bias_sum",a[0].dataType,u,y));let i=tV(a[0].dataType),n=tV(1,y);return`

      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...r)}
      var<workgroup> sum_shared : array<${n}, 64>;
      var<workgroup> sum_squared_shared : array<${n}, 64>;

      ${e.mainStart([64,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / 64;

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / 64;
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == 63) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":i+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${tZ(i,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = 64;
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${tQ("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${tQ("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${i}(mean)`}) *
            ${i}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:b})}),{outputs:$})}}),sE=eo(()=>{nM(),nD(),nW(),nV(),ny=(e,r)=>{let a=[];if(e.length>r)if(7===e[r].dataType)e[r].getBigInt64Array().forEach(e=>a.push(Number(e)));else if(6===e[r].dataType)e[r].getInt32Array().forEach(e=>a.push(Number(e)));else throw Error(`Input ${r} must be an array of int32 or int64`);return a},nb=(e,r,a,i,n)=>{let s=e;return e<0&&(s+=a[i[r]]),n[r]<0?Math.max(0,Math.min(s,a[i[r]]-1)):Math.max(0,Math.min(s,a[i[r]]))},n_=(e,r)=>{var a=e.inputs,i=r;if(!a||a.length<1)throw Error("too few inputs");if(0!==i.axes.length){if(i.axes.length!==i.starts.length||i.axes.length!==i.ends.length)throw Error("axes, starts and ends must have the same length")}else if(i.starts.length!==i.ends.length)throw Error("starts and ends must have the same length");a.slice(1).forEach((e,r)=>{if(6!==a[r+1].dataType&&7!==a[r+1].dataType)throw Error(`Input ${r} must be an array of int32 or int64`)});let n=((e,r)=>{if(!(e.length>1))return r;{let r=ny(e,1),a=ny(e,2),i=ny(e,3);return 0===i.length&&(i=[...Array(e[0].dims.length).keys()]),tj({starts:r,ends:a,axes:i})}})(e.inputs,r);e.compute(((e,r)=>{let a=e[0].dims,i=th.size(a),n=r.axes.length>0?th.normalizeAxes(r.axes,a.length):[...Array(a.length).keys()],s=ny(e,4);s.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===s.length&&(s=Array(n.length).fill(1));let o=r.starts.map((e,r)=>nb(e,r,a,n,s)),u=r.ends.map((e,r)=>nb(e,r,a,n,s));if(n.length!==o.length||n.length!==u.length)throw Error("start, ends and axes should have the same number of elements");if(n.length!==a.length)for(let e=0;e<a.length;++e)n.includes(e)||(o.splice(e,0,0),u.splice(e,0,a[e]),s.splice(e,0,1));let l=s.map(e=>Math.sign(e));s.forEach((e,r,a)=>{if(e<0){let i=(u[r]-o[r])/e,n=o[r],l=n+i*s[r];o[r]=l,u[r]=n,a[r]=-e}});let d=a.slice(0);n.forEach((e,r)=>{d[e]=Math.ceil((u[e]-o[e])/s[e])});let p={dims:d,dataType:e[0].dataType},c=t0("output",e[0].dataType,d.length),h=tJ("input",e[0].dataType,e[0].dims.length),f=th.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:s.length}],g=[{type:12,data:f},{type:12,data:o},{type:6,data:l},{type:12,data:s},...tG(e[0].dims,d)];return{name:"Slice",shaderCache:{hint:`${l.length}_${o.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:e=>{let r,i,n;return`
      ${e.registerUniforms(m).declareVariables(h,c)}
        ${r=h,i=c,n=a,`fn calculateInputIndices(output_indices: ${i.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${tX("uniforms.input_shape","i",n.length)};
            let steps_i = ${tX("uniforms.steps","i",n.length)};
            let signs_i = ${tX("uniforms.signs","i",n.length)};
            let starts_i = ${tX("uniforms.starts","i",n.length)};
            var output_index = ${i.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${r.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`},getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}})(e.inputs,n),{inputs:[0]})},n$=e=>{let r=e.starts,a=e.ends,i=e.axes;return tj({starts:r,ends:a,axes:i})}}),sz=eo(()=>{nM(),nD(),nW(),nF(),nV(),nv=(e,r)=>{var a,i;let n,s,o,u,l,d,p,c,h,f,m,g,y,b,_,$,v,w,x;(e=>{if(!e||1!==e.length)throw Error("Softmax op requires 1 input.")})(e.inputs),a=e,i=r,s=(n=a.inputs[0]).dims,o=th.size(s),u=s.length,d=(l=th.normalizeAxis(i.axis,u))<s.length-1,c=[],d?((c=Array.from({length:u},(e,r)=>r))[l]=u-1,c[u-1]=l,p=a.compute(t8(n,c),{inputs:[n],outputs:[-1]})[0]):p=n,m=o/(f=(h=p.dims)[u-1]),g=tH(f),y=f/g,b=64,1===m&&(b=256),_=tJ("x",p.dataType,p.dims,g),$=t0("result",p.dataType,p.dims,g),v=_.type.value,w="f32"===tV(p.dataType)?`var threadMax = ${v}(-3.4028234663852886e+38f);`:`var threadMax = ${v}(-65504.0h);`,x=a.compute({name:"Softmax",shaderCache:{hint:`${g};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:p.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:e=>{let r;return`
      var<workgroup> rowMaxShared : ${v};
      var<workgroup> rowSumShared : ${v};
      var<workgroup> threadShared : array<${v}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${v} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${v}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform("packedCols","i32").declareVariables(_,$)}
      ${e.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${w}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${v}(${r="threadShared[0]",4===g?`max(max(${r}.x, ${r}.y), max(${r}.z, ${r}.w))`:2===g?`max(${r}.x, ${r}.y)`:3===g?`max(max(${r}.x, ${r}.y), ${r}.z)`:r});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${v}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${v}(${tQ("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${v}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[p],outputs:[d?-1:0]})[0],d&&a.compute(t8(x,c),{inputs:[x]})},nw=e=>tj({axis:e.axis})}),sA=eo(()=>{nM(),nD(),nV(),nx=e=>Array.from(e.getBigInt64Array(),Number),nk=e=>{var r,a;let i,n,s,o,u,l,d;(e=>{if(!e||2!==e.length)throw Error("Tile requires 2 inputs.");if(1!==e[0].dataType&&10!==e[0].dataType&&6!==e[0].dataType&&12!==e[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==e[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==e[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(nx(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")})(e.inputs),e.compute((i=(r=e.inputs)[0].dims,s=((e,r)=>{let a=[];for(let i=0;i<e.length;++i)a.push(e[i]*r[i]);return a})(i,n=a??nx(r[1])),o=th.size(s),u=r[0].dataType,l=tJ("input",u,i.length),d=t0("output",u,s.length),{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...tG(r[0].dims,s)]}),getShaderSource:e=>`
      const inputShape = ${l.indices(...i)};
      ${e.registerUniform("output_size","u32").declareVariables(l,d)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${i.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`}),{inputs:[0]})}}),sO=eo(()=>{nM(),nD(),nV(),nS=e=>{e.compute((e=>{let r=e[1].dims,a=e[2].dims,i=e[0].dims,n=e[1].dataType,s=!(th.areEqual(r,a)&&th.areEqual(a,i)),o=r,u=th.size(r);if(s){let e=tc.calcShape(tc.calcShape(r,a,!1),i,!1);if(!e)throw Error("Can't perform where op on the given tensors");o=e,u=th.size(o)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:r=>((e,r,a,i,n)=>{let s=t0("output_data",n,a.length,4),o=tJ("a_data",r[1].dataType,r[1].dims.length,4),u=tJ("b_data",r[2].dataType,r[2].dims.length,4),l=tJ("c_data",r[0].dataType,r[0].dims.length,4),d,p=(e,r,a)=>`select(${r}, ${e}, ${a})`;if(i){let e=(e,r,a="")=>{let i=`a_data[index_a${r}][component_a${r}]`,n=`b_data[index_b${r}][component_b${r}]`,d=`bool(c_data[index_c${r}] & (0xffu << (component_c${r} * 8)))`;return`
            let output_indices${r} = ${s.offsetToIndices(`global_idx * 4u + ${r}u`)};
            let offset_a${r} = ${o.broadcastedIndicesToOffset(`output_indices${r}`,s)};
            let offset_b${r} = ${u.broadcastedIndicesToOffset(`output_indices${r}`,s)};
            let offset_c${r} = ${l.broadcastedIndicesToOffset(`output_indices${r}`,s)};
            let index_a${r} = offset_a${r} / 4u;
            let index_b${r} = offset_b${r} / 4u;
            let index_c${r} = offset_c${r} / 4u;
            let component_a${r} = offset_a${r} % 4u;
            let component_b${r} = offset_b${r} % 4u;
            let component_c${r} = offset_c${r} % 4u;
            ${e}[${r}] = ${a}(${p(i,n,d)});
          `};d=9===n?`
            var data = vec4<u32>(0);
            ${e("data",0,"u32")}
            ${e("data",1,"u32")}
            ${e("data",2,"u32")}
            ${e("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e("output_data[global_idx]",0)}
            ${e("output_data[global_idx]",1)}
            ${e("output_data[global_idx]",2)}
            ${e("output_data[global_idx]",3)}
          `}else d=s.setByOffset("global_idx",p(o.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,o,u,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`})(r,e,o,s,n),getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...tG(i,r,a,o)]})}})(e.inputs))}}),sR=eo(()=>{nK(),nZ(),nQ(),nX(),nJ(),n0(),n1(),se(),sr(),sa(),si(),sn(),ss(),so(),su(),sl(),sd(),sp(),sc(),sh(),sy(),sb(),s_(),s$(),sv(),sf(),sw(),sx(),sk(),sS(),sT(),nH(),sI(),sg(),sC(),sE(),sz(),sm(),sA(),nF(),nY(),sO(),nT=new Map([["Abs",[rL]],["Acos",[rj]],["Acosh",[rq]],["Add",[a_]],["ArgMax",[rO,rR]],["ArgMin",[rA,rR]],["Asin",[rW]],["Asinh",[rV]],["Atan",[rF]],["Atanh",[rG]],["Attention",[rB]],["AveragePool",[i9,i5]],["BatchNormalization",[rD]],["BiasAdd",[rU]],["BiasSplitGelu",[ay]],["Cast",[rK,rH]],["Ceil",[rQ]],["Clip",[rZ]],["Concat",[aE,az]],["Conv",[a2,a0]],["ConvTranspose",[a7,a5]],["Cos",[rX]],["Cosh",[rY]],["CumSum",[ie,it]],["DepthToSpace",[ir,ia]],["DequantizeLinear",[no,nu]],["Div",[a$]],["Einsum",[ip,ic]],["Elu",[r0,rJ]],["Equal",[av]],["Erf",[r2]],["Exp",[r3]],["Expand",[im]],["FastGelu",[ig]],["Floor",[r4]],["FusedConv",[a2,a0]],["Gather",[ib,iy]],["GatherElements",[ik,ix]],["GatherBlockQuantized",[iv,iw]],["GatherND",[i_,i$]],["Gelu",[r6]],["Gemm",[iT,iS]],["GlobalAveragePool",[nt,ne]],["GlobalMaxPool",[ns,nn]],["Greater",[aS]],["GreaterOrEqual",[aI]],["GridSample",[iO,iR]],["GroupQueryAttention",[iG]],["HardSigmoid",[aa,ar]],["InstanceNormalization",[iK]],["LayerNormalization",[iZ]],["LeakyRelu",[r8,rJ]],["Less",[aT]],["LessOrEqual",[aC]],["Log",[af]],["MatMul",[iQ]],["MatMulNBits",[iX,iY]],["MaxPool",[na,ni]],["Mul",[aw]],["MultiHeadAttention",[iU,iN]],["Neg",[r9]],["Not",[r5]],["Pad",[iJ]],["Pow",[ax]],["QuickGelu",[ag,rJ]],["Range",[nl]],["Reciprocal",[r7]],["ReduceMin",[rS]],["ReduceMean",[r$]],["ReduceMax",[rk]],["ReduceSum",[rI]],["ReduceProd",[rT]],["ReduceL1",[rv]],["ReduceL2",[rw]],["ReduceLogSum",[rE]],["ReduceLogSumExp",[rx]],["ReduceSumSquare",[rC]],["Relu",[ae]],["Resize",[nf,nm]],["RotaryEmbedding",[iW]],["ScatterND",[np,nd]],["Sigmoid",[at]],["Sin",[ai]],["Sinh",[an]],["Slice",[n_,n$]],["SkipLayerNormalization",[ng]],["Split",[iL,ij]],["Sqrt",[as]],["Softmax",[nv,nw]],["Sub",[ak]],["Tan",[ao]],["Tanh",[al]],["ThresholdedRelu",[ah,rJ]],["Tile",[nk]],["Transpose",[t5,t9]],["Where",[nS]]])}),sM=eo(()=>{eC(),nB(),nV(),nI=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,a,i,n){Q(e.programInfo.name);let s=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let u=[];for(let e of r)u.push({binding:u.length,resource:{buffer:e.buffer}});for(let e of a)u.push({binding:u.length,resource:{buffer:e.buffer}});n&&u.push({binding:u.length,resource:n});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let r={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(r)}o.setPipeline(e.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(...i),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),X(e.programInfo.name)}dispose(){}build(e,r){Q(e.name);let a=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(e=>{a.features.has(e.feature)&&i.push(`enable ${e.extension};`)});let n=t4(r,this.backend.device.limits),s=e.getShaderSource(n),o=`${i.join(`
`)}
${n.additionalImplementations}
${s}`,u=a.createShaderModule({code:o,label:e.name});td("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let l=a.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return X(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let r="number"==typeof e?e:e.x,a="number"==typeof e?1:e.y||1,i="number"==typeof e?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=n&&a<=n&&i<=n)return[r,a,i];let s=r*a*i,o=Math.ceil(Math.sqrt(s));if(!(o>n))return[o,o,1];if((o=Math.ceil(Math.cbrt(s)))>n)throw Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}}}),sN={};eu(sN,{WebGpuBackend:()=>sD});var sB,sD,sU=eo(()=>{eC(),nM(),nB(),nU(),nq(),sR(),sM(),sB=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},sD=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let a=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:a},n=e=>r.features.has(e)&&a.push(e)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await r.requestDevice(i),this.adapterInfo=new sB(r.info||await r.requestAdapterInfo()),this.gpuDataManager=tP(this),this.programManager=new nI(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,tl(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};"at-passes"===this.queryType&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&(Q(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),a=this.pendingQueries.get(e);for(let e=0;e<r.length/2;e++){let i=a[e],n=i.kernelId,s=this.kernels.get(n),o=s.kernelType,u=s.kernelName,l=i.programName,d=i.inputTensorViews,p=i.outputTensorViews,c=r[2*e],h=r[2*e+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=c);let f=Number(c-this.queryTimeBase),m=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(m))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(e=>({dims:e.dims,dataType:e9(e.dataType)})),outputsMetadata:p.map(e=>({dims:e.dims,dataType:e9(e.dataType)})),kernelId:n,kernelType:o,kernelName:u,programName:l,startTime:f,endTime:m});else{let e="";d.forEach((r,a)=>{e+=`input[${a}]: [${r.dims}] | ${e9(r.dataType)}, `});let r="";p.forEach((e,a)=>{r+=`output[${a}]: [${e.dims}] | ${e9(e.dataType)}, `}),console.log(`[profiling] kernel "${n}|${o}|${u}|${l}" ${e}${r}start time: ${f} ns, execution time: ${m-f} ns`)}K("GPU",`${l}::${c}::${h}`)}e.unmap(),this.pendingQueries.delete(e)}),X())}run(e,r,a,i,n,s){var o,u,l;let d,p;Q(e.name);let c=[];for(let e=0;e<r.length;++e){let a=r[e].data;if(0===a)continue;let i=this.gpuDataManager.get(a);if(!i)throw Error(`no GPU data for input: ${a}`);c.push(i)}let{outputs:h,dispatchGroup:f,programUniforms:m}=e.getRunData(r),g=0===a.length?h.map((e,r)=>r):a;if(g.length!==h.length)throw Error(`Output size ${g.length} must be equal to ${h.length}.`);let y=[],b=[];for(let e=0;e<h.length;++e){if(!Number.isInteger(g[e])||g[e]<-3||g[e]>=s)throw Error(`Invalid output index: ${g[e]}`);if(-3===g[e])continue;let r=-1===g[e],a=-2===g[e],o=r||a?n(h[e].dataType,h[e].dims):i(g[e],h[e].dataType,h[e].dims);if(y.push(o),0===o.data)continue;let u=this.gpuDataManager.get(o.data);if(!u)throw Error(`no GPU data for output: ${o.data}`);if(r&&this.temporaryData.push(u),a){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(u)}b.push(u)}if(c.length!==r.length||b.length!==y.length){if(0===b.length)return X(e.name),y;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(m){let e=0,r=[];m.forEach(a=>{let i="number"==typeof a.data?[a.data]:a.data;if(0===i.length)return;let n=10===a.type?2:4,s,o;10===a.type?(o=i.length>4?16:i.length>2?8:i.length*n,s=i.length>4?16:n*i.length):(o=i.length<=2?i.length*n:16,s=16),e=Math.ceil(e/o)*o,r.push(e);let u=10===a.type?8:4;e+=i.length>4?Math.ceil(i.length/u)*s:i.length*n});let a=new ArrayBuffer(e=16*Math.ceil(e/16));m.forEach((e,i)=>{let n=r[i],s="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(a,n,s.length).set(s);else if(12===e.type)new Uint32Array(a,n,s.length).set(s);else if(10===e.type)new Uint16Array(a,n,s.length).set(s);else if(1===e.type)new Float32Array(a,n,s.length).set(s);else throw Error(`Unsupported uniform type: ${e9(e.type)}`)});let i=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(i.buffer,0,a,0,e),this.gpuDataManager.release(i.id),d={offset:0,size:e,buffer:i.buffer}}let _=this.programManager.normalizeDispatchGroupSize(f),$=(o=e,u=r,l=1===_[1]&&1===_[2],p=o.name,o.shaderCache?.hint&&(p+="["+o.shaderCache.hint+"]"),p+=":"+l+`:${((e,r)=>{if(r.length!==e.length)throw Error(`inputDependencies length ${r.length} is not equal to inputTensors length ${e.length}.`);let a=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(r[i]){case"none":a.push("");break;case"type":a.push(`${n}`);break;case"rank":{let r=e[i].dims.length;a.push(`${n};${r}`);break}case"dims":{let r=e[i].dims.join(",");a.push(`${n};${r}`);break}default:throw Error(`unsupported input dependency: ${r[i]}`)}}return a.join("|")})(u,o.shaderCache?.inputDependencies??Array(u.length).fill("dims"))}`),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(e,_),this.programManager.setArtifact($,v),td("info",()=>`[artifact] key: ${$}, programName: ${e.name}`)),m&&v.uniformVariablesInfo){if(m.length!==v.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${m.length} in program "${v.programInfo.name}".`);for(let e=0;e<m.length;e++){let r=m[e],a=r.type,i="number"==typeof r.data?1:r.data.length,[n,s]=v.uniformVariablesInfo[e];if(a!==n||i!==s)throw Error(`Uniform variable ${e} mismatch: expect type ${n} with size ${s}, got type ${a} with size ${i} in program "${v.programInfo.name}".`)}}if(td("info",()=>`[ProgramManager] run "${e.name}" (key=${$}) with ${_[0]}x${_[1]}x${_[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:y};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(v,c,b,_,d),X(e.name),y}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,a,i){let n=nT.get(e);if(!n)throw Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],a]};this.kernels.set(r,s)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let e of r)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,a){let i=this.kernels.get(e);if(!i)throw Error(`kernel not created: ${e}`);let n=i.kernelType,s=i.kernelName,o=i.kernelEntry,u=i.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${n}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),td("info",()=>`[WebGPU] Start to run kernel "[${n}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),o(r,u[1]),0}catch(e){return a.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${s}" failed. ${e}`)),1}finally{for(let e of(l&&a.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${n}] ${s}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,a,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let s=n.get(r),o=this.gpuDataManager.registerExternalBuffer(a,i,s);return n.set(r,[o,a]),o}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,a){return async()=>{let i=await tD(this,e,r);return tb(i.buffer,a)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){td("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){td("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){td("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),a=e.length;this.pendingKernels=[];for(let i=0;i<a;i++){let a=this.getComputePassEncoder(),n=e[i];this.writeTimestamp(2*this.pendingDispatchNumber),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(r[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),sP={};eu(sP,{init:()=>sq});var sL,sj,sq,sW,sV,sF,sG,sH,sK,sZ,sQ,sX,sY,sJ,s0,s1,s2,s3,s4,s6,s8,s5,s9,s7,oe,ot,or,oa,oi,on,os,oo,ou,ol,od,op=eo(()=>{nM(),nB(),nD(),nL(),sL=class e{constructor(e,r,a,i){this.module=e,this.dataType=r,this.data=a,this.dims=i}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=th.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=th.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=th.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=th.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(r){if(th.size(r)!==th.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,r)}},sj=class{constructor(e,r,a){this.module=e,this.backend=r,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=r.adapterInfo;let i=e.PTR_SIZE,n=a/e.PTR_SIZE,s=4===i?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,s));let o=Number(e.getValue(i*n++,s));this.outputCount=Number(e.getValue(i*n++,s)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,s));let u=[];for(let r=0;r<o;r++){let r=Number(e.getValue(i*n++,s)),a=Number(e.getValue(i*n++,"*")),o=Number(e.getValue(i*n++,s)),l=[];for(let r=0;r<o;r++)l.push(Number(e.getValue(i*n++,s)));u.push(new sL(e,r,a,l))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let a=r?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,i=r?.outputs??[],n=(e,r,a)=>new sL(this.module,r,this.output(e,a),a),s=(e,r)=>{let a=e7(e,r);if(!a)throw Error(`Unsupported data type: ${e}`);let i=a>0?this.backend.gpuDataManager.create(a).id:0;return new sL(this.module,e,i,r)};return this.backend.run(e,a,i,n,s,this.outputCount)}output(e,r){let a=this.module.stackSave();try{let a=this.module.PTR_SIZE,i=4===a?"i32":"i64",n=this.module.stackAlloc((1+r.length)*a);this.module.setValue(n,r.length,i);for(let e=0;e<r.length;e++)this.module.setValue(n+a*(e+1),r[e],i);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(a){throw Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${a}`)}finally{this.module.stackRestore(a)}}},sq=async(e,r,a,i)=>{let n=r.jsepInit;if(!n)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new(sU(),el(sN)).WebGpuBackend;await e.initialize(a,i),n("webgpu",[e,r=>e.alloc(Number(r)),r=>e.free(r),(a,i,n,s=!1)=>{if(s)td("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(i)}, size=${Number(n)}`),e.memcpy(Number(a),Number(i));else{td("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(i)}, size=${Number(n)}`);let s=r.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(n));e.upload(Number(i),s)}},async(a,i,n)=>{td("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${i}, size=${n}`),await e.download(Number(a),()=>r.HEAPU8.subarray(Number(i)>>>0,Number(i+n)>>>0))},(a,i,n)=>e.createKernel(a,Number(i),n,r.UTF8ToString(r._JsepGetNodeName(Number(i)))),r=>e.releaseKernel(r),(a,i,n,s)=>{td("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${n}, kernel=${a}, contextDataOffset=${i}`);let o=new sj(r,e,Number(i));return e.computeKernel(Number(a),o,s)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new tA(a);n("webnn",[e,()=>e.reserveTensorId(),r=>e.releaseTensorId(r),async(r,a,i,n,s)=>e.ensureTensor(r,a,i,n,s),(r,a)=>{e.uploadTensor(r,a)},async(r,a)=>e.downloadTensor(r,a),(r,a)=>e.registerMLContext(r,a),!!a.trace])}}}),oc=eo(()=>{eC(),nO(),nR(),nM(),nz(),nA(),nN(),sW=async e=>{var r,a;r=e.wasm.numThreads,a=tt(e.logLevel),0!==eJ()._OrtInit(r,a)&&e2("Can't initialize onnxruntime.")},sV=async(e,r)=>{eJ().asyncInit?.();let a=e.webgpu.adapter;if("webgpu"===r){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(a){if("object"!=typeof a.limits||"object"!=typeof a.features||"function"!=typeof a.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=e.webgpu.powerPreference;if(void 0!==r&&"low-power"!==r&&"high-performance"!==r)throw Error(`Invalid powerPreference setting: "${r}"`);let i=e.webgpu.forceFallbackAdapter;if(void 0!==i&&"boolean"!=typeof i)throw Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(!(a=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:i})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===r&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let i=(op(),el(sP)).init;"webgpu"===r&&await i("webgpu",eJ(),e,a),"webnn"===r&&await i("webnn",eJ(),e)}},sF=new Map,sG=(e,r)=>{let a=eJ(),i=a.stackSave(),n=0;try{let i=a.PTR_SIZE,s=a.stackAlloc(2*i);0!==a._OrtGetInputOutputMetadata(e,r,s,s+i)&&e2("Can't get session input/output metadata.");let o=Number(a.getValue(s,"*"));n=Number(a.getValue(s+i,"*"));let u=a.HEAP32[n/4];if(0===u)return[o,0];let l=a.HEAPU32[n/4+1],d=[];for(let e=0;e<l;e++){let r=Number(a.getValue(n+8+e*i,"*"));d.push(0!==r?a.UTF8ToString(r):Number(a.getValue(n+8+(e+l)*i,"*")))}return[o,u,d]}finally{a.stackRestore(i),0!==n&&a._OrtFree(n)}},sH=e=>{let r=eJ(),a=r._malloc(e.byteLength);if(0===a)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return r.HEAPU8.set(e,a),[a,e.byteLength]},sK=async(e,r)=>{let a,i,n=eJ();Array.isArray(e)?[a,i]=e:e.buffer===n.HEAPU8.buffer?[a,i]=[e.byteOffset,e.byteLength]:[a,i]=sH(e);let s=0,o=0,u=0,l=[],d=[],p=[];try{if([o,l]=await e8(r),r?.externalData&&n.mountExternalData){let e=[];for(let a of r.externalData){let r="string"==typeof a?a:a.path;e.push(tn("string"==typeof a?a:a.data).then(e=>{n.mountExternalData(r,e)}))}await Promise.all(e)}for(let e of r?.executionProviders??[])if(("string"==typeof e?e:e.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,"string"!=typeof e){let r=e?.context,a=e?.gpuDevice,i=e?.deviceType,s=e?.powerPreference;r?n.currentContext=r:a?n.currentContext=await n.webnnCreateMLContext(a):n.currentContext=await n.webnnCreateMLContext({deviceType:i,powerPreference:s})}else n.currentContext=await n.webnnCreateMLContext();break}s=await n._OrtCreateSession(a,i,o),n.webgpuOnCreateSession?.(s),0===s&&e2("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(s,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[e,c]=(e=>{let r=eJ(),a=r.stackSave();try{let a=r.PTR_SIZE,i=r.stackAlloc(2*a);0!==r._OrtGetInputOutputCount(e,i,i+a)&&e2("Can't get session input/output count.");let n=4===a?"i32":"i64";return[Number(r.getValue(i,n)),Number(r.getValue(i+a,n))]}finally{r.stackRestore(a)}})(s),h=!!r?.enableGraphCapture,f=[],m=[],g=[],y=[],b=[];for(let r=0;r<e;r++){let[e,a,i]=sG(s,r);0===e&&e2("Can't get an input name."),d.push(e);let o=n.UTF8ToString(e);f.push(o),g.push(0===a?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:e9(a),shape:i})}for(let a=0;a<c;a++){let[i,o,u]=sG(s,a+e);0===i&&e2("Can't get an output name."),p.push(i);let l=n.UTF8ToString(i);m.push(l),y.push(0===o?{name:l,isTensor:!1}:{name:l,isTensor:!0,type:e9(o),shape:u});{if(h&&r?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let e="string"==typeof r?.preferredOutputLocation?r.preferredOutputLocation:r?.preferredOutputLocation?.[l]??"cpu",a=n.webnnIsGraphOutput;if("cpu"===e&&a&&a(s,l)){b.push("ml-tensor-cpu-output");continue}if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(h&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(e)}}let _=null;return b.some(e=>"gpu-buffer"===e||"ml-tensor"===e||"ml-tensor-cpu-output"===e)&&(u=n._OrtCreateBinding(s),0===u&&e2("Can't create IO binding."),_={handle:u,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(e=>"ml-tensor-cpu-output"===e?"ml-tensor":e).map(e=>ti(e))}),sF.set(s,[s,d,p,_,h,!1]),[s,f,m,g,y]}catch(e){throw d.forEach(e=>n._OrtFree(e)),p.forEach(e=>n._OrtFree(e)),0!==u&&0!==n._OrtReleaseBinding(u)&&e2("Can't release IO binding."),0!==s&&0!==n._OrtReleaseSession(s)&&e2("Can't release session."),e}finally{n._free(a),0!==o&&0!==n._OrtReleaseSessionOptions(o)&&e2("Can't release session options."),l.forEach(e=>n._free(e)),n.unmountExternalData?.()}},sZ=e=>{let r=eJ(),a=sF.get(e);if(!a)throw Error(`cannot release session. invalid session id: ${e}`);let[i,n,s,o,u]=a;o&&(u&&0!==r._OrtClearBoundOutputs(o.handle)&&e2("Can't clear bound outputs."),0!==r._OrtReleaseBinding(o.handle)&&e2("Can't release IO binding.")),r.jsepOnReleaseSession?.(e),r.webnnOnReleaseSession?.(e),r.webgpuOnReleaseSession?.(e),n.forEach(e=>r._OrtFree(e)),s.forEach(e=>r._OrtFree(e)),0!==r._OrtReleaseSession(i)&&e2("Can't release session."),sF.delete(e)},sQ=async(e,r,a,i,n,s,o=!1)=>{if(!e)return void r.push(0);let u=eJ(),l=u.PTR_SIZE,d=e[0],p=e[1],c=e[3],h=c,f,m;if("string"===d&&("gpu-buffer"===c||"ml-tensor"===c))throw Error("String tensor is not supported on GPU.");if(o&&"gpu-buffer"!==c)throw Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if("gpu-buffer"===c){let r=e[2].gpuBuffer;m=e7(e5(d),p);{let e=u.jsepRegisterBuffer;if(!e)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=e(i,s,r,m)}}else if("ml-tensor"===c){let r=e[2].mlTensor;m=e7(e5(d),p);let a=u.webnnRegisterMLTensor;if(!a)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=a(i,r,e5(d),p)}else{let r=e[2];if(Array.isArray(r)){m=l*r.length,f=u._malloc(m),a.push(f);for(let e=0;e<r.length;e++){if("string"!=typeof r[e])throw TypeError(`tensor data at index ${e} is not a string`);u.setValue(f+e*l,e0(r[e],a),"*")}}else{let e=u.webnnIsGraphInput,s=u.webnnIsGraphOutput;if("string"!==d&&e&&s){let o=u.UTF8ToString(n);if(e(i,o)||s(i,o)){let e=e5(d);m=e7(e,p),h="ml-tensor";let a=u.webnnCreateTemporaryTensor,n=u.webnnUploadTensor;if(!a||!n)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let s=await a(i,e,p);n(s,new Uint8Array(r.buffer,r.byteOffset,r.byteLength)),f=s}else m=r.byteLength,f=u._malloc(m),a.push(f),u.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}else m=r.byteLength,f=u._malloc(m),a.push(f),u.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}}let g=u.stackSave(),y=u.stackAlloc(4*p.length);try{p.forEach((e,r)=>u.setValue(y+r*l,e,4===l?"i32":"i64"));let e=u._OrtCreateTensor(e5(d),f,m,y,p.length,ti(h));0===e&&e2(`Can't create tensor for input/output. session=${i}, index=${s}.`),r.push(e)}finally{u.stackRestore(g)}},sX=async(e,r,a,i,n,s)=>{let o=eJ(),u=o.PTR_SIZE,l=sF.get(e);if(!l)throw Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],c=l[2],h=l[3],f=l[4],m=l[5],g=r.length,y=i.length,b=0,_=[],$=[],v=[],w=[],x=[],k=o.stackSave(),S=o.stackAlloc(g*u),T=o.stackAlloc(g*u),I=o.stackAlloc(y*u),C=o.stackAlloc(y*u);try{let l;[b,_]=e3(s),Y("wasm prepareInputOutputTensor");for(let i=0;i<g;i++)await sQ(a[i],$,w,e,p[r[i]],r[i],f);for(let r=0;r<y;r++)await sQ(n[r],v,w,e,c[i[r]],g+i[r],f);J("wasm prepareInputOutputTensor");for(let e=0;e<g;e++)o.setValue(S+e*u,$[e],"*"),o.setValue(T+e*u,p[r[e]],"*");for(let e=0;e<y;e++)o.setValue(I+e*u,v[e],"*"),o.setValue(C+e*u,c[i[e]],"*");if(h&&!m){let{handle:a,outputPreferredLocations:s,outputPreferredLocationsEncoded:u}=h;if(p.length!==g)throw Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${p.length}).`);Y("wasm bindInputsOutputs");for(let i=0;i<g;i++){let n=r[i];await o._OrtBindInput(a,p[n],$[i])!==0&&e2(`Can't bind input[${i}] for session=${e}.`)}for(let r=0;r<y;r++){let l=i[r];n[r]?.[3]?(x.push(v[r]),0!==o._OrtBindOutput(a,c[l],v[r],0)&&e2(`Can't bind pre-allocated output[${r}] for session=${e}.`)):0!==o._OrtBindOutput(a,c[l],0,u[l])&&e2(`Can't bind output[${r}] to ${s[r]} for session=${e}.`)}J("wasm bindInputsOutputs"),sF.set(e,[d,p,c,h,f,!0])}o.jsepOnRunStart?.(d),o.webnnOnRunStart?.(d),l=h?await o._OrtRunWithBinding(d,h.handle,y,I,b):await o._OrtRun(d,T,S,g,C,y,I,b),0!==l&&e2("failed to call OrtRun().");let k=[],E=[];Y("wasm ProcessOutputTensor");for(let r=0;r<y;r++){let a=Number(o.getValue(I+r*u,"*"));if(a===v[r]||x.includes(v[r])){k.push(n[r]),a!==v[r]&&0!==o._OrtReleaseTensor(a)&&e2("Can't release tensor.");continue}let s=o.stackSave(),l=o.stackAlloc(4*u),d=!1,p,c=0;try{0!==o._OrtGetTensorData(a,l,l+u,l+2*u,l+3*u)&&e2(`Can't access output tensor data on index ${r}.`);let n=4===u?"i32":"i64",s=Number(o.getValue(l,n));c=o.getValue(l+u,"*");let f=o.getValue(l+2*u,"*"),m=Number(o.getValue(l+3*u,n)),g=[];for(let e=0;e<m;e++)g.push(Number(o.getValue(f+e*u,n)));0!==o._OrtFree(f)&&e2("Can't free memory for tensor dims.");let y=g.reduce((e,r)=>e*r,1);p=e9(s);let b=h?.outputPreferredLocations[i[r]];if("string"===p){if("gpu-buffer"===b||"ml-tensor"===b)throw Error("String tensor is not supported on GPU.");let e=[];for(let r=0;r<y;r++){let a=o.getValue(c+r*u,"*"),i=o.getValue(c+(r+1)*u,"*"),n=r===y-1?void 0:i-a;e.push(o.UTF8ToString(a,n))}k.push([p,g,e,"cpu"])}else if("gpu-buffer"===b&&y>0){let e=o.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let r=e(c),i=e7(s,y);if(void 0===i||!tr(p))throw Error(`Unsupported data type: ${p}`);d=!0,k.push([p,g,{gpuBuffer:r,download:o.jsepCreateDownloader(r,i,p),dispose:()=>{0!==o._OrtReleaseTensor(a)&&e2("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===b&&y>0){let r=o.webnnEnsureTensor,i=o.webnnIsGraphInputOutputTypeSupported;if(!r||!i)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===e7(s,y)||!ta(p))throw Error(`Unsupported data type: ${p}`);if(!i(e,p,!1))throw Error(`preferredLocation "ml-tensor" for ${p} output is not supported by current WebNN Context.`);let n=await r(e,c,s,g,!1);d=!0,k.push([p,g,{mlTensor:n,download:o.webnnCreateMLTensorDownloader(c,p),dispose:()=>{o.webnnReleaseTensorId(c),o._OrtReleaseTensor(a)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===b&&y>0){let e=o.webnnCreateMLTensorDownloader(c,p)(),r=k.length;d=!0,E.push((async()=>{let i=[r,await e];return o.webnnReleaseTensorId(c),o._OrtReleaseTensor(a),i})()),k.push([p,g,[],"cpu"])}else{let e=new(te(p))(y);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(o.HEAPU8.subarray(c,c+e.byteLength)),k.push([p,g,e,"cpu"])}}finally{o.stackRestore(s),"string"===p&&c&&o._free(c),d||o._OrtReleaseTensor(a)}}for(let[r,a]of(h&&!f&&(0!==o._OrtClearBoundOutputs(h.handle)&&e2("Can't clear bound outputs."),sF.set(e,[d,p,c,h,f,!1])),await Promise.all(E)))k[r][2]=a;return J("wasm ProcessOutputTensor"),k}finally{o.webnnOnRunEnd?.(d),o.stackRestore(k),$.forEach(e=>o._OrtReleaseTensor(e)),v.forEach(e=>o._OrtReleaseTensor(e)),w.forEach(e=>o._free(e)),0!==b&&o._OrtReleaseRunOptions(b),_.forEach(e=>o._free(e))}},sY=e=>{let r=eJ(),a=sF.get(e);if(!a)throw Error("invalid session id");let i=a[0],n=r._OrtEndProfiling(i);0===n&&e2("Can't get an profile file name."),r._OrtFree(n)},sJ=e=>{let r=[];for(let a of e){let e=a[2];!Array.isArray(e)&&"buffer"in e&&r.push(e.buffer)}return r}}),oh=eo(()=>{eC(),oc(),nz(),nE(),s0=()=>!!A.wasm.proxy&&"u">typeof document,s2=!1,s3=!1,s4=!1,s5=new Map,s9=(e,r)=>{let a=s5.get(e);a?a.push(r):s5.set(e,[r])},s7=()=>{if(s2||!s3||s4||!s1)throw Error("worker not ready")},oe=e=>{switch(e.data.type){case"init-wasm":s2=!1,e.data.err?(s4=!0,s8[1](e.data.err)):(s3=!0,s8[0]()),s6&&(URL.revokeObjectURL(s6),s6=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let r=s5.get(e.data.type);e.data.err?r.shift()[1](e.data.err):r.shift()[0](e.data.out)}}},ot=async()=>{if(!s3){if(s2)throw Error("multiple calls to 'initWasm()' detected.");if(s4)throw Error("previous call to 'initWasm()' failed.");if(s2=!0,s0())return new Promise((r,a)=>{s1?.terminate(),eF().then(([i,n])=>{try{(s1=n).onerror=e=>a(e),s1.onmessage=oe,s8=[r,a];let s={type:"init-wasm",in:A};!s.in.wasm.wasmPaths&&(i||eU)&&(s.in.wasm.wasmPaths={wasm:new e.U(e.r(3789)).href}),s1.postMessage(s),s6=i}catch(e){a(e)}},a)});try{await eY(A.wasm),await sW(A),s3=!0}catch(e){throw s4=!0,e}finally{s2=!1}}},or=async e=>{if(s0())return s7(),new Promise((r,a)=>{s9("init-ep",[r,a]);let i={type:"init-ep",in:{epName:e,env:A}};s1.postMessage(i)});await sV(A,e)},oa=async e=>s0()?(s7(),new Promise((r,a)=>{s9("copy-from",[r,a]),s1.postMessage({type:"copy-from",in:{buffer:e}},[e.buffer])})):sH(e),oi=async(e,r)=>{if(!s0())return sK(e,r);if(r?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return s7(),new Promise((a,i)=>{s9("create",[a,i]);let n={type:"create",in:{model:e,options:{...r}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),s1.postMessage(n,s)})},on=async e=>{if(s0())return s7(),new Promise((r,a)=>{s9("release",[r,a]),s1.postMessage({type:"release",in:e})});sZ(e)},os=async(e,r,a,i,n,s)=>{if(!s0())return sX(e,r,a,i,n,s);if(a.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(n.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return s7(),new Promise((n,o)=>{s9("run",[n,o]),s1.postMessage({type:"run",in:{sessionId:e,inputIndices:r,inputs:a,outputIndices:i,options:s}},sJ(a))})},oo=async e=>{if(s0())return s7(),new Promise((r,a)=>{s9("end-profiling",[r,a]),s1.postMessage({type:"end-profiling",in:e})});sY(e)}}),of=eo(()=>{eC(),oh(),nM(),eE(),nN(),ou=(e,r)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${r()}`)}},ol=e=>{switch(e[3]){case"cpu":return new H(e[0],e[2],e[1]);case"gpu-buffer":{let r=e[0];if(!tr(r))throw Error(`not supported data type: ${r} for deserializing GPU tensor`);let{gpuBuffer:a,download:i,dispose:n}=e[2];return H.fromGpuBuffer(a,{dataType:r,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let r=e[0];if(!ta(r))throw Error(`not supported data type: ${r} for deserializing MLTensor tensor`);let{mlTensor:a,download:i,dispose:n}=e[2];return H.fromMLTensor(a,{dataType:r,dims:e[1],download:i,dispose:n})}default:throw Error(`invalid data location: ${e[3]}`)}},od=class{async fetchModelAndCopyToWasmMemory(e){return oa(await tn(e))}async loadModel(e,r){let a;Q(),a="string"==typeof e?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await oi(a,r),X()}async dispose(){return on(this.sessionId)}async run(e,r,a){Q();let i=[],n=[];Object.entries(e).forEach(e=>{let r=e[0],a=e[1],s=this.inputNames.indexOf(r);if(-1===s)throw Error(`invalid input '${r}'`);i.push(a),n.push(s)});let s=[],o=[];Object.entries(r).forEach(e=>{let r=e[0],a=e[1],i=this.outputNames.indexOf(r);if(-1===i)throw Error(`invalid output '${r}'`);s.push(a),o.push(i)});let u=i.map((e,r)=>ou(e,()=>`input "${this.inputNames[n[r]]}"`)),l=s.map((e,r)=>e?ou(e,()=>`output "${this.outputNames[o[r]]}"`):null),d=await os(this.sessionId,n,u,o,l,a),p={};for(let e=0;e<d.length;e++)p[this.outputNames[o[e]]]=s[e]??ol(d[e]);return X(),p}startProfiling(){}endProfiling(){oo(this.sessionId)}}}),om={};eu(om,{OnnxruntimeWebAssemblyBackend:()=>oy,initializeFlags:()=>og,wasmBackend:()=>ob});var og,oy,ob,o_=eo(()=>{eC(),oh(),of(),og=()=>{("number"!=typeof A.wasm.initTimeout||A.wasm.initTimeout<0)&&(A.wasm.initTimeout=0);let e=A.wasm.simd;if("boolean"!=typeof e&&void 0!==e&&"fixed"!==e&&"relaxed"!==e&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),A.wasm.simd=!1),"boolean"!=typeof A.wasm.proxy&&(A.wasm.proxy=!1),"boolean"!=typeof A.wasm.trace&&(A.wasm.trace=!1),"number"!=typeof A.wasm.numThreads||!Number.isInteger(A.wasm.numThreads)||A.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)A.wasm.numThreads=1;else{let e=typeof navigator>"u"?es("node:os").cpus().length:navigator.hardwareConcurrency;A.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},ob=new(oy=class{async init(e){og(),await ot(),await or(e)}async createInferenceSessionHandler(e,r){let a=new od;return await a.loadModel(e,r),a}})});eC(),eC(),eC();{let e=(o_(),el(om)).wasmBackend;S("webgpu",e,5),S("webnn",e,5),S("cpu",e,10),S("wasm",e,10)}Object.defineProperty(A.versions,"web",{value:"1.26.0",enumerable:!0});let o$=[.1,.2],ov=!1;class ow{retinaFaceSession=null;miniFASSession=null;anchors=[];stabilityCounter=0;async loadModels({includeLiveness:e=!0}={}){ov||(A.logLevel="fatal",A.wasm.wasmPaths="/ort/",A.wasm.numThreads=1,ov=!0),this.anchors=this.generateAnchors(640);let r={executionProviders:["wasm"],graphOptimizationLevel:"all"};this.retinaFaceSession=await et.create("/models/liveness/Widerface-RetinaFace.onnx",r),e&&(this.miniFASSession=await et.create("/models/liveness/2.7_80x80_MiniFASNetV2_Fixed.onnx",r))}async processFaceFrame(e){if(!this.retinaFaceSession)throw Error("Face detection model is not loaded.");let r=await this.detectFaces(e);return 0===r.length?null:{bbox:r.reduce((e,r)=>this.boxArea(r)>this.boxArea(e)?r:e)}}async processFrame(e){if(!this.retinaFaceSession||!this.miniFASSession)throw Error("Face liveness models are not loaded.");let r=await this.processFaceFrame(e);if(!r)return this.stabilityCounter=0,null;let a=r.bbox,i=await this.checkLivenessRaw(e,a),n="FAKE",s=!1;return i.isRealRaw?(this.stabilityCounter++,this.stabilityCounter>=4?(n="REAL",s=!0,this.stabilityCounter=5):n="VERIFYING..."):this.stabilityCounter=0,{bbox:a,liveness:{isRealRaw:i.isRealRaw,isReal:s,label:n,confidence:i.confidence,stabilityScore:Math.min(this.stabilityCounter,4),probabilities:i.probabilities}}}boxArea(e){return Math.max(0,e[2]-e[0])*Math.max(0,e[3]-e[1])}async detectFaces(e){if(!this.retinaFaceSession)return[];let r=this.preprocessRetinaFace(e),a={[this.retinaFaceSession.inputNames[0]]:r},i=await this.retinaFaceSession.run(a),{loc:n,conf:s}=this.extractRetinaFaceOutput(i);return n&&s?this.postProcessRetinaFace(n,s,this.anchors,e.videoWidth,e.videoHeight):[]}async checkLivenessRaw(e,r){if(!this.miniFASSession)throw Error("MiniFASNet session is not loaded.");let a=this.cropFace(e,r,80),i=this.preprocessMiniFASNet(a),n={[this.miniFASSession.inputNames[0]]:i},s=(await this.miniFASSession.run(n))[this.miniFASSession.outputNames[0]].data,o=s[0]??-999,u=s[1]??-999,l=s[2]??-999,d=Math.max(o,u,l),p=Math.exp(o-d),c=Math.exp(u-d),h=Math.exp(l-d),f=p+c+h,m=p/f,g=c/f,y=h/f,b=0,_=m;return g>_&&(b=1,_=g),y>_&&(b=2,_=y),{isRealRaw:1===b&&_>.62,rawLabel:1===b?"REAL":"FAKE",confidence:_,probabilities:{fakePrint:m,real:g,fakeScreen:y}}}preprocessMiniFASNet(e){let{data:r}=e,a=6400,i=new Float32Array(19200);for(let e=0;e<a;e++){let n=r[4*e],s=r[4*e+1],o=r[4*e+2];i[e]=o,i[e+a]=s,i[e+2*a]=n}return new H("float32",i,[1,3,80,80])}preprocessRetinaFace(e){let r=document.createElement("canvas");r.width=640,r.height=640;let a=r.getContext("2d");if(!a)throw Error("Unable to create canvas context.");a.drawImage(e,0,0,640,640);let{data:i}=a.getImageData(0,0,640,640),n=new Float32Array(1228800);for(let e=0;e<409600;e++){let r=i[4*e],a=i[4*e+1],s=i[4*e+2];n[e]=s-104,n[e+409600]=a-117,n[e+819200]=r-123}return new H("float32",n,[1,3,640,640])}cropFace(e,r,a){let[i,n,s,o]=r,u=s-i,l=o-n,d=1.5*u,p=1.5*l,c=i+u/2-d/2,h=n+l/2-p/2,f=Math.max(0,c),m=Math.max(0,h),g=Math.min(e.videoWidth-f,d-(f-c)),y=Math.min(e.videoHeight-m,p-(m-h));if(g<=0||y<=0)return new ImageData(a,a);let b=document.createElement("canvas");b.width=g,b.height=y;let _=b.getContext("2d");if(!_)return new ImageData(a,a);_.translate(g,0),_.scale(-1,1),_.drawImage(e,f,m,g,y,0,0,g,y);let $=g,v=y;for(;$>2*a;){let e=Math.floor(.5*$),r=Math.floor(.5*v),a=document.createElement("canvas");a.width=e,a.height=r;let i=a.getContext("2d");if(!i)break;i.drawImage(b,0,0,$,v,0,0,e,r),b=a,$=e,v=r}let w=document.createElement("canvas");w.width=a,w.height=a;let x=w.getContext("2d");return x?(x.filter="blur(0.5px)",x.fillStyle="black",x.fillRect(0,0,a,a),x.drawImage(b,0,0,$,v,0,0,a,a),x.getImageData(0,0,a,a)):new ImageData(a,a)}generateAnchors(e){let r=[[16,32],[64,128],[256,512]],a=[8,16,32],i=[];return[[Math.ceil(e/8),Math.ceil(e/8)],[Math.ceil(e/16),Math.ceil(e/16)],[Math.ceil(e/32),Math.ceil(e/32)]].forEach((n,s)=>{let o=a[s];for(let a=0;a<n[0];a++)for(let u=0;u<n[1];u++)for(let n of r[s])i.push([(u+.5)*o/e,(a+.5)*o/e,n/e,n/e])}),i}extractRetinaFaceOutput(e){let r=new Float32Array(67200),a=new Float32Array(33600),i=0;for(let n of[8,16,32]){let s=640/n,o=s*s*2,u=null,l=null;for(let r in e){let a=e[r];if(!("dims"in a)||!("data"in a))continue;let i=a.dims;i[2]===s&&i[3]===s&&(8===i[1]&&(u=a.data),4===i[1]&&(l=a.data))}if(!u||!l){i+=o;continue}for(let e=0;e<s;e++)for(let n=0;n<s;n++)for(let o=0;o<2;o++){let d=i+(e*s+n)*2+o;for(let a=0;a<4;a++){let i=4*o+a;r[4*d+a]=u[s*s*i+e*s+n]}for(let r=0;r<2;r++){let i=2*o+r;a[2*d+r]=l[s*s*i+e*s+n]}}i+=o}return{loc:r,conf:a}}postProcessRetinaFace(e,r,a,i,n){let s=[],[o,u]=o$;for(let l=0;l<a.length;l++){let d=r[2*l+1];if(d<=.45)continue;let p=a[l],c=e[4*l],h=e[4*l+1],f=e[4*l+2],m=e[4*l+3],g=p[0]+c*o*p[2],y=p[1]+h*o*p[3],b=p[2]*Math.exp(f*u),_=p[3]*Math.exp(m*u),$=(g-b/2)*i,v=(y-_/2)*n,w=(g+b/2)*i,x=(y+_/2)*n;s.push([$,v,w,x,d])}return this.nms(s,.4)}nms(e,r){if(0===e.length)return[];e.sort((e,r)=>r[4]-e[4]);let a=[],i=Array(e.length).fill(!0);for(let n=0;n<e.length;n++){if(!i[n])continue;let s=e[n];a.push(s);for(let a=n+1;a<e.length;a++){if(!i[a])continue;let n=e[a],o=Math.max(s[0],n[0]),u=Math.max(s[1],n[1]),l=Math.max(0,Math.min(s[2],n[2])-o)*Math.max(0,Math.min(s[3],n[3])-u),d=this.boxArea(s)+this.boxArea(n)-l;d>0&&l/d>r&&(i[a]=!1)}}return a}}var ox=e.i(27140),ok=e.i(87184),oS=e.i(86392),oT=e.i(59538),oI=e.i(20617),oC=e.i(50375),oE=e.i(19455);let oz={cx:640,cy:300,rx:190,ry:225,minFace:.15,maxScale:1.8,centerTolerance:1.05,shoulderWidth:1.35},oA={cx:640,cy:330,rx:250,ry:300,minFace:.13,maxScale:2.75,centerTolerance:1.22,shoulderWidth:1.75},oO=[{facingMode:{ideal:"user"}},{facingMode:"user"},{}];function oR(e){let r=e?.video,a=e?.stream?.getVideoTracks()[0];return!!(r&&r.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA&&r.videoWidth>0&&r.videoHeight>0&&a&&"live"===a.readyState&&a.enabled&&!a.muted)}function oM(e){try{let r=document.createElement("canvas");r.width=32,r.height=32;let a=r.getContext("2d",{willReadFrequently:!0});if(!a)return!1;a.drawImage(e,0,0,r.width,r.height);let i=a.getImageData(0,0,r.width,r.height).data,n=0;for(let e=0;e<i.length;e+=4)i[e]+i[e+1]+i[e+2]>24&&n++;return n/(i.length/4)>.02}catch{return!1}}function oN(){let[e,n]=(0,a.useState)("verifying"),[l,p]=(0,a.useState)(!1),[h]=(0,a.useState)(!0),[f,m]=(0,a.useState)(null),[g,y]=(0,a.useState)(!1),[b,v]=(0,a.useState)(!1),w=(0,a.useRef)(null),x=(0,a.useRef)(null),k=(0,_.useRouter)(),{faceBlob:S,ticketCode:T,nik:I,clearVerification:C,setFaceBlob:E}=(0,$.useVerification)(),z=(0,$.useVerificationGuard)("face"),A=(0,a.useCallback)(()=>{w.current?.stream?.getTracks().forEach(e=>e.stop()),C(),k.push("/verification/ticket")},[C,k]),O=(0,a.useCallback)(()=>{x.current=null,E(null),v(!1),p(!1),n("verifying")},[E]),{handleSubmitWithFaceBlob:R,handleErrorClose:M,failureStage:N}=(0,oI.useHandleSubmit)({faceBlob:S,ticketCode:T,nik:I,errorMsg:f,setErrorMsg:m,setSubmitting:y,submitBiometricData:oS.submitBiometricData,getApiErrorMessage:oS.getApiErrorMessage,onTicketError:A,onFaceError:O}),B=(0,a.useCallback)(()=>{if(!w.current||g)return;if(!l||!oR(w.current)){p(!1),m("Kamera tidak aktif. Pastikan wajah terlihat lalu coba lagi.");return}let e=w.current.video;if(!e||!oM(e)){p(!1),m("Tampilan kamera tidak terlihat. Silakan coba lagi.");return}let r=e.videoWidth,a=e.videoHeight,i=w.current.getScreenshot({width:r,height:a});if(!i){p(!1),m("Foto wajah gagal diambil. Pastikan kamera aktif lalu coba lagi.");return}let s=function(e){let r=e.split(","),a=r[0].match(/:(.*?);/)?.[1]||"image/jpeg",i=atob(r[1]),n=new Uint8Array(i.length);for(let e=0;e<i.length;e++)n[e]=i.charCodeAt(e);return new Blob([n],{type:a})}(i);x.current=s,E(s),w.current.stream?.getTracks().forEach(e=>e.stop()),n("success")},[l,m,E,g]),D=(0,a.useCallback)(async()=>{let e=x.current??S;e?await R(e):m("Data wajah belum tersedia. Silakan ambil foto kembali.")},[S,R,m]);return z?(0,r.jsxs)("div",{className:"flex flex-col flex-1",children:[(0,r.jsxs)("div",{className:"mb-4 flex items-center gap-2",children:[(0,r.jsx)("div",{className:"h-1.5 flex-1 rounded-full bg-emerald-500"}),(0,r.jsx)("div",{className:`h-1.5 flex-1 rounded-full transition-colors ${"success"===e?"bg-emerald-500":"bg-[#3b5bdb]"}`})]}),(0,r.jsx)(ox.default,{}),(0,r.jsx)(oT.Modal,{open:!!f,onClose:M,icon:(0,r.jsx)("div",{className:"flex h-11 w-11 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600",children:(0,r.jsx)(u.XCircle,{className:"h-5 w-5"})}),title:"ticket"===N?"Data Tiket Bermasalah":"retry"===N?"Gagal Mengirim Data":"Verifikasi Wajah Gagal",description:(0,r.jsxs)("div",{className:"mt-2 space-y-2.5 text-left",children:[(0,r.jsx)("div",{className:"rounded-xl border border-red-200/80 bg-red-50/50 px-3.5 py-2.5 text-xs font-medium text-red-900",children:f}),(0,r.jsx)("p",{className:"text-[11px] leading-relaxed text-slate-500",children:"ticket"===N?"Terdapat kendala pada kode tiket atau NIK Anda. Silakan kembali ke langkah pertama untuk memeriksa ulang data tiket.":"retry"===N?"Terjadi gangguan koneksi saat mengirim data. Foto wajah Anda tetap tersimpan dan siap dikirim ulang.":"Pastikan pencahayaan cukup terang, wajah menghadap lurus ke kamera, dan tidak tertutup masker atau kacamata."})]}),children:(0,r.jsx)("button",{type:"button",onClick:M,className:"mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#3b5bdb] text-sm font-semibold text-white transition-all hover:bg-[#3451c5] active:scale-[0.99]",children:"ticket"===N?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.ArrowLeft,{className:"h-4 w-4"}),"Periksa Data Tiket"]}):"retry"===N?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.RefreshCw,{className:"h-4 w-4"}),"Coba Lagi"]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Camera,{className:"h-4 w-4"}),"Ambil Ulang Foto"]})})}),(0,r.jsxs)("div",{className:"mb-4 text-left",children:[(0,r.jsx)("p",{className:`text-[11px] font-bold uppercase tracking-wider ${"success"===e?"text-emerald-600":"text-[#3b5bdb]"}`,children:"success"===e?"Konfirmasi Akhir":"Langkah 2 dari 2"}),(0,r.jsx)("h1",{className:"mt-0.5 text-xl font-bold tracking-tight text-[#1e2a4a]",children:"success"===e?"Persetujuan Face ID":"Ambil Foto Wajah"}),(0,r.jsx)("p",{className:"mt-1 text-xs leading-relaxed text-slate-500",children:"success"===e?"Periksa hasil foto wajah Anda dan setujui syarat & ketentuan di bawah.":"Posisikan wajah di dalam bingkai tanpa masker atau kacamata."})]}),(0,r.jsxs)("div",{className:"flex-1 flex flex-col items-center text-center pb-4",children:["failed"===e&&(0,r.jsx)(oB,{}),"success"===e&&(0,r.jsx)(oD,{faceBlob:x.current??S,isMobile:h,tncAccepted:b,setTncAccepted:v}),"verifying"===e&&(0,r.jsx)(oU,{webcamRef:w,faceInFrame:l,setFaceInFrame:p,onCapture:B,onBackToTicket:A,isMobile:h,submitting:g})]}),(0,r.jsx)(oC.default,{children:(0,r.jsxs)(r.Fragment,{children:["failed"===e&&(0,r.jsxs)(oE.Button,{onClick:()=>n("verifying"),className:"inline-flex items-center justify-center gap-2 bg-[#3b5bdb] text-white hover:bg-[#3451c5] transition-colors",children:[(0,r.jsx)(s.RefreshCw,{className:"w-4 h-4"}),"Ulangi"]}),"verifying"===e&&(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(oE.Button,{disabled:g,onClick:A,className:`inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors ${g?"opacity-60 cursor-not-allowed":""}`,children:[(0,r.jsx)(o.ArrowLeft,{className:"w-4 h-4"}),"Kembali"]})}),"success"===e&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(oE.Button,{type:"button",disabled:g,onClick:O,className:`inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 ${g?"cursor-not-allowed opacity-60":""}`,children:[(0,r.jsx)(s.RefreshCw,{className:"h-4 w-4"}),"Foto Ulang"]}),(0,r.jsxs)(oE.Button,{type:"button",disabled:g||!b,onClick:D,className:`inline-flex items-center justify-center gap-2 bg-[#3b5bdb] text-white transition-colors hover:bg-[#3451c5] ${g||!b?"cursor-not-allowed opacity-60":""}`,children:[g?(0,r.jsx)(d.Loader2,{className:"h-4 w-4 animate-spin"}):(0,r.jsx)(c,{className:"h-4 w-4"}),g?"Mengirim...":"Daftarkan"]})]})]})})]}):null}function oB(){return(0,r.jsxs)("div",{className:"w-full flex flex-col text-left",children:[(0,r.jsx)("div",{className:"rounded-2xl border border-red-200/80 bg-red-50/50 p-4",children:(0,r.jsxs)("div",{className:"flex items-start gap-3",children:[(0,r.jsx)("div",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white",children:(0,r.jsx)(u.XCircle,{className:"h-5 w-5"})}),(0,r.jsxs)("div",{className:"min-w-0",children:[(0,r.jsx)("span",{className:"inline-block text-[11px] font-bold uppercase tracking-wider text-red-700",children:"Verifikasi Gagal"}),(0,r.jsx)("h2",{className:"mt-0.5 text-lg font-bold tracking-tight text-[#1e2a4a]",children:"Wajah Tidak Terdeteksi"}),(0,r.jsx)("p",{className:"mt-1 text-xs leading-relaxed text-slate-600",children:"Sistem belum dapat memverifikasi foto wajah Anda. Periksa kondisi berikut sebelum mengambil foto ulang."})]})]})}),(0,r.jsx)(ok.default,{className:"mt-4",title:"Panduan Pengambilan Foto",items:[{title:"Pencahayaan Cukup Terang",desc:"Pastikan wajah menghadap sumber cahaya dan tidak membelakangi lampu atau jendela."},{title:"Tanpa Masker atau Kacamata",desc:"Lepaskan masker, kacamata hitam, atau topi yang menutupi area wajah."},{title:"Posisi Wajah Lurus ke Kamera",desc:"Arahkan pandangan lurus ke depan tepat di dalam bingkai panduan."}]})]})}function oD({faceBlob:e,isMobile:i,tncAccepted:s,setTncAccepted:o}){let[u,l]=(0,a.useState)(null);return(0,a.useEffect)(()=>{if(!e)return void l(null);let r=URL.createObjectURL(e);return l(r),()=>URL.revokeObjectURL(r)},[e]),(0,r.jsxs)("div",{className:"flex w-full flex-col items-center mx-auto space-y-4",children:[u?(0,r.jsxs)(v.Sheet,{children:[(0,r.jsx)(v.SheetTrigger,{asChild:!0,children:(0,r.jsxs)("button",{type:"button",className:"flex w-full items-center justify-between gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-3 text-left transition-all hover:border-emerald-300 active:scale-[0.99]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-3 min-w-0",children:[(0,r.jsx)("div",{className:"relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-900 ring-1 ring-black/10",children:(0,r.jsx)("img",{src:u,alt:"Thumbnail Wajah",className:"h-full w-full object-cover scale-x-[-1]"})}),(0,r.jsxs)("div",{className:"min-w-0",children:[(0,r.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,r.jsx)(n.CheckCircle2,{className:"h-3.5 w-3.5 shrink-0 text-emerald-600"}),(0,r.jsx)("p",{className:"text-xs font-bold text-[#1e2a4a] truncate",children:"Foto Wajah Siap Didaftarkan"})]}),(0,r.jsx)("p",{className:"mt-0.5 text-[11px] text-slate-500 truncate",children:"Ketuk untuk memeriksa foto ukuran penuh"})]})]}),(0,r.jsxs)("span",{className:"inline-flex shrink-0 items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-[#3b5bdb] border border-slate-200/80",children:[(0,r.jsx)(h,{className:"h-3.5 w-3.5"}),"Lihat"]})]})}),(0,r.jsxs)(v.SheetContent,{side:"bottom",showCloseButton:!1,className:"mx-auto h-auto w-full max-w-md rounded-t-3xl border-t-0 bg-white px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl",children:[(0,r.jsx)("div",{className:"mx-auto mb-1 h-1.5 w-12 shrink-0 rounded-full bg-slate-200"}),(0,r.jsxs)(v.SheetHeader,{className:"flex flex-row items-center justify-between p-0",children:[(0,r.jsx)(v.SheetTitle,{className:"text-base font-bold text-[#1e2a4a]",children:"Preview Foto Wajah"}),(0,r.jsxs)(v.SheetClose,{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none active:scale-95",children:[(0,r.jsx)(f.default,{className:"h-5 w-5"}),(0,r.jsx)("span",{className:"sr-only",children:"Tutup preview"})]})]}),(0,r.jsx)("div",{className:"relative mx-auto w-full overflow-hidden rounded-2xl bg-gray-950 ring-1 ring-black/5",children:(0,r.jsx)("img",{src:u,alt:"Preview",className:"block h-auto max-h-[75vh] w-full object-contain scale-x-[-1]"})})]})]}):(0,r.jsx)("div",{className:"flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-6 text-xs text-slate-500",children:"Preview tidak tersedia."}),(0,r.jsxs)("div",{className:"w-full text-left",children:[(0,r.jsx)(ok.default,{title:"Dengan melakukan registrasi Face ID, saya menyetujui ketentuan berikut:",items:[{title:"Satu Wajah untuk Satu Tiket",desc:"Saya hanya mendaftarkan 1 (satu) wajah untuk 1 (satu) kode tiket/1 (satu) barcode yang dimiliki."},{title:"Kesesuaian Data Diri Pribadi",desc:"Data wajah yang saya daftarkan adalah data diri saya sendiri dan bukan milik orang lain."},{title:"Metode Verifikasi Akses Masuk",desc:"Wajah yang telah didaftarkan akan digunakan sebagai salah satu metode verifikasi saat memasuki area Jomlo Fest."},{title:"Tidak Dapat Dipindahtangankan",desc:"Tiket dengan Face ID yang telah terdaftar tidak dapat digunakan oleh orang lain."},{title:"Persetujuan Syarat & Ketentuan",desc:"Dengan melanjutkan proses pendaftaran Face ID, saya menyetujui seluruh syarat dan ketentuan yang berlaku."}]}),(0,r.jsxs)("label",{htmlFor:"tnc",className:`mt-3 flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-all ${s?"border-[#3b5bdb] bg-blue-50/50":"border-slate-200 bg-white hover:bg-slate-50"}`,children:[(0,r.jsx)("input",{type:"checkbox",id:"tnc",className:"mt-0.5 size-4 shrink-0 cursor-pointer rounded border border-slate-400 accent-[#3b5bdb] outline-none focus-visible:ring-2 focus-visible:ring-[#3b5bdb]/50",checked:s,onChange:e=>o(e.target.checked)}),(0,r.jsx)("span",{className:"text-xs font-semibold leading-relaxed text-[#1e2a4a]",children:"Saya telah membaca dan menyetujui syarat & ketentuan di atas."})]})]})]})}function oU({webcamRef:e,faceInFrame:n,setFaceInFrame:u,onCapture:l,onBackToTicket:p,isMobile:c,submitting:h}){let[f,m]=(0,a.useState)("loading"),[g,y]=(0,a.useState)(null),[_,$]=(0,a.useState)(0),[v,w]=(0,a.useState)(0),[x,k]=(0,a.useState)(!0),[S,T]=(0,a.useState)(oz),I=(0,a.useRef)(oz),C=(0,a.useRef)(null),E=(0,a.useRef)(!1),z=(0,a.useRef)(!1),A=(0,a.useRef)(!1),[O,R]=(0,a.useState)(null),[M,N]=(0,a.useState)(!1),[B,D]=(0,a.useState)(0),U=(0,a.useRef)(0),P=(0,a.useRef)(null),L=(0,a.useRef)(null),j=(0,a.useRef)(!1),q=(0,a.useCallback)((e="loading")=>{u(!1),m(e),y(null),$(0)},[u]),W=(0,a.useCallback)(()=>{if(!h&&!P.current){if(U.current>=4){N(!0),q("error");return}N(!1),q(),j.current=!0,L.current&&(clearTimeout(L.current),L.current=null),e.current?.stream?.getTracks().forEach(e=>e.stop()),R(null),k(!1),P.current=setTimeout(()=>{P.current=null,U.current++,w(e=>(e+1)%oO.length),D(e=>e+1),k(!0)},900)}},[q,h,e]),V=(0,a.useCallback)(()=>{U.current=0,N(!1),W()},[W]),F=(0,a.useCallback)(()=>{j.current||W()},[W]),G=(0,a.useCallback)(()=>{j.current||(L.current&&clearTimeout(L.current),L.current=setTimeout(()=>{L.current=null;let r=e.current,a=r?.video;a&&!a.paused&&oR(r)&&oM(a)?(P.current&&(clearTimeout(P.current),P.current=null),U.current=0):W()},1200))},[W,e]),H=(0,a.useCallback)(r=>{j.current=!1,N(!1),R(r),q(),e.current?.video?.play().catch(()=>W()),G()},[q,W,G,e]),K=(0,a.useCallback)(e=>{console.warn("Failed to access camera:",e),j.current=!1,R(null),W()},[W]);(0,a.useEffect)(()=>{{let e=c?oA:oz;T(e),I.current=e}},[c]),(0,a.useEffect)(()=>{let e=O?.getVideoTracks()[0];if(!e)return;let r=()=>G(),a=()=>F();return e.addEventListener("mute",r),e.addEventListener("unmute",G),e.addEventListener("ended",a),()=>{e.removeEventListener("mute",r),e.removeEventListener("unmute",G),e.removeEventListener("ended",a)}},[O,F,G]),(0,a.useEffect)(()=>()=>{P.current&&clearTimeout(P.current),L.current&&clearTimeout(L.current)},[]),(0,a.useEffect)(()=>{let r,a=!0;return async function(){E.current=!1,z.current=!1;try{m("loading"),u(!1);let e=new ow;await e.loadModels({includeLiveness:!1}),C.current=e}catch(r){let e=r instanceof Error?r.message:String(r);console.warn(`Failed to load face detection model: ${e}`),a&&(m("error"),u(!1));return}a&&(r=setInterval(async()=>{let i=e.current,n=i?.video;if(!n||!oR(i))return void q();if(C.current&&!A.current&&!E.current){A.current=!0;try{let r=await C.current.processFaceFrame(n);if(!a)return;if(!oR(e.current))return void q();if(!r)return void q("no-face");let[i,s,o,l]=r.bbox,d=n.videoWidth,p=n.videoHeight,c=n.clientWidth,h=n.clientHeight;if(0===d||0===p||0===c||0===h)return void q();let f=Math.max(c/d,h/p),g=Math.max(c/1280,h/720),b=((i+o)/2*f-(d*f-c)/2+(1280*g-c)/2)/g,_=((s+l)/2*f-(p*f-h)/2+(720*g-h)/2)/g,v=(o-i)*f/g,w=I.current,x=(b-w.cx)/w.rx,k=(_-w.cy)/w.ry,S=x*x+k*k<=w.centerTolerance*w.centerTolerance,T=2*w.rx,E=2*w.ry,z=Math.max(1280*w.minFace,.5*T),A=T*w.maxScale,O=S&&v>=z&&(l-s)*f/g>=.55*E&&v<=A;u(O),y(null),$(0),O?m("real"):m("out-of-frame")}catch(e){if(E.current=!0,!z.current){let r=e instanceof Error?e.message:String(e);console.warn(`Face detection disabled: ${r}`),z.current=!0}a&&(u(!1),m("error")),r&&clearInterval(r)}finally{A.current=!1}}},c?1200:400))}(),()=>{a=!1,r&&clearInterval(r),C.current=null,u(!1)}},[c,q,e]);let Z=function(e,r,a){switch(e){case"loading":return{label:"Memuat...",className:"bg-blue-500/90"};case"no-face":return{label:"Posisikan wajah di frame",className:"bg-red-500/90"};case"out-of-frame":return{label:"Wajah belum pas di frame",className:"bg-amber-500/90"};case"verifying":return{label:`Memverifikasi wajah ${a}/4`,className:"bg-amber-500/90"};case"real":return{label:"Posisi wajah sudah pas",className:"bg-emerald-500/90"};case"fake":return{label:"Wajah tidak lolos verifikasi",className:"bg-red-500/90"};default:return{label:"Terjadi kesalahan",className:"bg-red-500/90"}}}(f,0,_);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"relative w-full mb-3.5 rounded-2xl bg-gray-900 aspect-3/4 shadow-inner ring-1 ring-slate-900/10",children:[(0,r.jsxs)("div",{className:"absolute inset-0 rounded-2xl overflow-hidden",children:[x&&(0,r.jsx)(b.default,{className:"absolute inset-0 w-full h-full object-cover",audio:!1,ref:e,screenshotFormat:"image/jpeg",screenshotQuality:1,mirrored:!0,style:{transform:"translateZ(0)",backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",willChange:"transform"},videoConstraints:oO[v],onUserMedia:H,onUserMediaError:K,onLoadedMetadata:G,onPlaying:G,onPause:G,onEnded:F,onStalled:G,onWaiting:G},`face-camera-${B}`),(0,r.jsxs)("svg",{className:"absolute inset-0 w-full h-full pointer-events-none",viewBox:"0 0 1280 720",preserveAspectRatio:"xMidYMid slice",children:[(0,r.jsx)("defs",{children:(0,r.jsxs)("mask",{id:"face-cutout",children:[(0,r.jsx)("rect",{width:"1280",height:"720",fill:"white"}),(0,r.jsx)("path",{d:oP(S,!0),fill:"black"})]})}),(0,r.jsx)("rect",{width:"1280",height:"720",fill:"rgba(0,0,0,0.5)",mask:"url(#face-cutout)"}),(0,r.jsx)("path",{d:oP(S),fill:"none",stroke:n?"#16A34A":"#DC2626",strokeWidth:"6",strokeLinejoin:"round",strokeLinecap:"round",style:{transition:"stroke 0.3s ease"}})]})]}),!h&&(!O||M)&&(0,r.jsx)("div",{className:"absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-xl bg-gray-950/70 px-6 text-white",role:M?"alert":"status",children:M?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{className:"text-sm font-semibold",children:"Kamera tidak dapat diakses. Tutup tab verifikasi lain atau aplikasi yang sedang menggunakan kamera, lalu coba kembali."}),(0,r.jsxs)("div",{className:"flex flex-wrap items-center justify-center gap-2",children:[(0,r.jsxs)("button",{type:"button",onClick:V,className:"inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#101828]",children:[(0,r.jsx)(s.RefreshCw,{className:"h-4 w-4"}),"Coba lagi"]}),(0,r.jsxs)("button",{type:"button",onClick:p,className:"inline-flex items-center gap-2 rounded-lg border border-white/40 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10",children:[(0,r.jsx)(o.ArrowLeft,{className:"h-4 w-4"}),"Kembali ke tiket"]})]})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.Loader2,{className:"h-8 w-8 animate-spin"}),(0,r.jsx)("p",{className:"text-sm font-medium",children:"Menyiapkan kamera..."})]})}),h&&(0,r.jsxs)("div",{className:"absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 rounded-xl bg-gray-950/70 text-white backdrop-blur-sm",role:"status","aria-live":"polite",children:[(0,r.jsx)(d.Loader2,{className:"h-10 w-10 animate-spin"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-sm font-semibold",children:"Mengirim data wajah..."}),(0,r.jsx)("p",{className:"mt-1 text-xs text-white/75",children:"Mohon tunggu dan jangan tutup halaman."})]})]}),!h&&O&&!M&&(0,r.jsx)("button",{type:"button",onClick:V,"aria-label":"Muat ulang kamera",className:"absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60",children:(0,r.jsx)(s.RefreshCw,{className:"h-4 w-4"})}),(0,r.jsx)("div",{className:`absolute top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md z-10 whitespace-nowrap ${Z.className}`,children:Z.label}),c&&(0,r.jsx)("div",{className:"absolute bottom-4 left-1/2 -translate-x-1/2 z-20",children:(0,r.jsx)("button",{disabled:!n||h,onClick:l,className:`flex items-center justify-center w-16 h-16 rounded-full border-4 border-white/90 shadow-xl ring-4 ring-black/20 transition-all active:scale-90 ${n&&!h?"bg-[#3b5bdb] hover:bg-[#3451c5]":"bg-slate-400/80 cursor-not-allowed"}`,children:(0,r.jsx)(i.Camera,{className:"w-7 h-7 text-white"})})})]}),(0,r.jsx)(oL,{})]})}function oP(e,r=!1){let{cx:a,cy:i,rx:n,ry:s}=e,o=i+.98*s,u=a-n*e.shoulderWidth,l=a+n*e.shoulderWidth,d=`M ${u} ${o} C ${a-1.02*n} ${i+.88*s}, ${a-.7*n} ${i+.87*s}, ${a-.48*n} ${i+.82*s} C ${a-.37*n} ${i+.79*s}, ${a-.36*n} ${i+.72*s}, ${a-.36*n} ${i+.62*s} C ${a-.53*n} ${i+.52*s}, ${a-.66*n} ${i+.38*s}, ${a-.72*n} ${i+.2*s} C ${a-.84*n} ${i+.2*s}, ${a-.9*n} ${i+.08*s}, ${a-.9*n} ${i-.07*s} C ${a-.9*n} ${i-.22*s}, ${a-.84*n} ${i-.34*s}, ${a-.73*n} ${i-.35*s} C ${a-.7*n} ${i-.72*s}, ${a-.46*n} ${i-.98*s}, ${a} ${i-.98*s} C ${a+.46*n} ${i-.98*s}, ${a+.7*n} ${i-.72*s}, ${a+.73*n} ${i-.35*s} C ${a+.84*n} ${i-.34*s}, ${a+.9*n} ${i-.22*s}, ${a+.9*n} ${i-.07*s} C ${a+.9*n} ${i+.08*s}, ${a+.84*n} ${i+.2*s}, ${a+.72*n} ${i+.2*s} C ${a+.66*n} ${i+.38*s}, ${a+.53*n} ${i+.52*s}, ${a+.36*n} ${i+.62*s} C ${a+.36*n} ${i+.72*s}, ${a+.37*n} ${i+.79*s}, ${a+.48*n} ${i+.82*s} C ${a+.7*n} ${i+.87*s}, ${a+1.02*n} ${i+.88*s}, ${l} ${o}`;return r?`${d} L ${l} 760 L ${u} 760 Z`:d}function oL(){let[e,i]=(0,a.useState)(!1),n=(0,a.useRef)(!1);return(0,a.useEffect)(()=>{n.current||(i(!0),n.current=!0)},[]),(0,r.jsxs)(v.Sheet,{open:e,onOpenChange:i,children:[(0,r.jsx)(v.SheetTrigger,{asChild:!0,children:(0,r.jsxs)("button",{className:"w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/80 text-[#3b5bdb] font-semibold text-xs hover:bg-blue-50/60 transition-colors cursor-pointer",children:[(0,r.jsxs)("span",{className:"inline-flex items-center gap-2",children:[(0,r.jsx)(l.Info,{className:"w-4 h-4 shrink-0"}),"Lihat Tips Pengambilan Foto"]}),(0,r.jsx)("span",{className:"text-[11px] text-slate-400 font-medium",children:"Buka"})]})}),(0,r.jsxs)(v.SheetContent,{side:"bottom",className:"mx-auto w-full max-w-md rounded-t-3xl border-t-0 bg-white px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl",children:[(0,r.jsx)("div",{className:"mx-auto mb-1 h-1.5 w-12 shrink-0 rounded-full bg-slate-200"}),(0,r.jsx)(v.SheetHeader,{className:"p-0 text-left",children:(0,r.jsxs)(v.SheetTitle,{className:"flex items-center gap-2 text-base font-bold text-[#1e2a4a]",children:[(0,r.jsx)(l.Info,{className:"w-5 h-5 text-[#3b5bdb]"}),"Tips Pengambilan Foto"]})}),(0,r.jsx)("p",{className:"text-slate-500 text-xs leading-relaxed",children:"Pastikan pencahayaan cukup terang dan wajah Anda terlihat jelas tanpa aksesoris (masker, kacamata, topi)."}),(0,r.jsxs)("div",{className:"grid grid-cols-3 gap-2.5 py-2",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-2 items-center rounded-2xl bg-slate-50 p-3 border border-slate-100",children:[(0,r.jsx)("div",{className:"size-11 bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center rounded-xl text-[22px]",children:(0,r.jsx)(y,{})}),(0,r.jsx)("p",{className:"text-[11px] text-center text-slate-600 font-semibold",children:"Tanpa Masker"})]}),(0,r.jsxs)("div",{className:"flex flex-col gap-2 items-center rounded-2xl bg-slate-50 p-3 border border-slate-100",children:[(0,r.jsx)("div",{className:"size-11 bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center rounded-xl text-[22px]",children:(0,r.jsx)(g,{})}),(0,r.jsx)("p",{className:"text-[11px] text-center text-slate-600 font-semibold",children:"Cahaya Cukup"})]}),(0,r.jsxs)("div",{className:"flex flex-col gap-2 items-center rounded-2xl bg-slate-50 p-3 border border-slate-100",children:[(0,r.jsx)("div",{className:"size-11 bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center rounded-xl text-[22px]",children:(0,r.jsx)(m,{})}),(0,r.jsx)("p",{className:"text-[11px] text-center text-slate-600 font-semibold",children:"Wajah Jelas"})]})]}),(0,r.jsx)("button",{onClick:()=>i(!1),className:"mt-1 w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-[#3b5bdb] text-white font-semibold text-sm hover:bg-[#3451c5] active:scale-[0.99] transition-all",children:"Mengerti"})]})]})}e.s(["default",()=>oN],11559)}]);