import{u as C,d as O,r as P,a as S,o as B,b as E,c as I,e as U,f as T,h as N,g as R,p as V,n as F,i as b,j as A,k as L,l as H,m as D,q as M,w as $,s as G,_ as K,t as Q,v as W,x as J,y as x,z as _,A as X,B as Y,C as Z}from"./i1fBxy5B.js";async function z(t,n=C()){const{path:s,matched:d}=n.resolve(t);if(!d.length||(n._routePreloaded||(n._routePreloaded=new Set),n._routePreloaded.has(s)))return;const e=n._preloadPromises=n._preloadPromises||[];if(e.length>4)return Promise.all(e).then(()=>z(t,n));n._routePreloaded.add(s);const r=d.map(l=>l.components?.default).filter(l=>typeof l=="function");for(const l of r){const i=Promise.resolve(l()).catch(()=>{}).finally(()=>e.splice(e.indexOf(i)));e.push(i)}await Promise.all(e)}const ee=(...t)=>t.find(n=>n!==void 0);function te(t){const n=t.componentName||"NuxtLink";function s(e,r){if(!e||t.trailingSlash!=="append"&&t.trailingSlash!=="remove")return e;if(typeof e=="string")return q(e,t.trailingSlash);const l="path"in e&&e.path!==void 0?e.path:r(e).path;return{...e,name:void 0,path:q(l,t.trailingSlash)}}function d(e){const r=C(),l=M(),i=b(()=>!!e.target&&e.target!=="_self"),c=b(()=>{const u=e.to||e.href||"";return typeof u=="string"&&A(u,{acceptRelative:!0})}),p=R("RouterLink"),g=p&&typeof p!="string"?p.useLink:void 0,h=b(()=>{if(e.external)return!0;const u=e.to||e.href||"";return typeof u=="object"?!1:u===""||c.value}),o=b(()=>{const u=e.to||e.href||"";return h.value?u:s(u,r.resolve)}),m=h.value?void 0:g?.({...e,to:o}),y=b(()=>{if(!o.value||c.value)return o.value;if(h.value){const u=typeof o.value=="object"&&"path"in o.value?L(o.value):o.value,k=typeof u=="object"?r.resolve(u).href:u;return s(k,r.resolve)}return typeof o.value=="object"?r.resolve(o.value)?.href??null:s(H(l.app.baseURL,o.value),r.resolve)});return{to:o,hasTarget:i,isAbsoluteUrl:c,isExternal:h,href:y,isActive:m?.isActive??b(()=>o.value===r.currentRoute.value.path),isExactActive:m?.isExactActive??b(()=>o.value===r.currentRoute.value.path),route:m?.route??b(()=>r.resolve(o.value)),async navigate(){await D(y.value,{replace:e.replace,external:h.value||i.value})}}}return O({name:n,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},prefetchOn:{type:[String,Object],default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},useLink:d,setup(e,{slots:r}){const l=C(),{to:i,href:c,navigate:p,isExternal:g,hasTarget:h,isAbsoluteUrl:o}=d(e),m=P(!1),y=P(null),u=f=>{y.value=e.custom?f?.$el?.nextElementSibling:f?.$el};function k(f){return!m.value&&(typeof e.prefetchOn=="string"?e.prefetchOn===f:e.prefetchOn?.[f]??t.prefetchOn?.[f])&&(e.prefetch??t.prefetch)!==!1&&e.noPrefetch!==!0&&e.target!=="_blank"&&!oe()}async function w(f=S()){if(m.value)return;m.value=!0;const v=typeof i.value=="string"?i.value:g.value?L(i.value):l.resolve(i.value).fullPath,a=g.value?new URL(v,window.location.href).href:v;await Promise.all([f.hooks.callHook("link:prefetch",a).catch(()=>{}),!g.value&&!h.value&&z(i.value,l).catch(()=>{})])}if(k("visibility")){const f=S();let v,a=null;B(()=>{const j=re();E(()=>{v=I(()=>{y?.value?.tagName&&(a=j.observe(y.value,async()=>{a?.(),a=null,await w(f)}))})})}),U(()=>{v&&T(v),a?.(),a=null})}return()=>{if(!g.value&&!h.value){const a={ref:u,to:i.value,activeClass:e.activeClass||t.activeClass,exactActiveClass:e.exactActiveClass||t.exactActiveClass,replace:e.replace,ariaCurrentValue:e.ariaCurrentValue,custom:e.custom};return e.custom||(k("interaction")&&(a.onPointerenter=w.bind(null,void 0),a.onFocus=w.bind(null,void 0)),m.value&&(a.class=e.prefetchedClass||t.prefetchedClass),a.rel=e.rel||void 0),N(R("RouterLink"),a,r.default)}const f=e.target||null,v=ee(e.noRel?"":e.rel,t.externalRelAttribute,o.value||h.value?"noopener noreferrer":"")||null;return e.custom?r.default?r.default({href:c.value,navigate:p,prefetch:w,get route(){if(!c.value)return;const a=new URL(c.value,window.location.href);return{path:a.pathname,fullPath:a.pathname,get query(){return V(a.search)},hash:a.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:c.value}},rel:v,target:f,isExternal:g.value||h.value,isActive:!1,isExactActive:!1}):null:N("a",{ref:y,href:c.value||null,rel:v,target:f},r.default?.())}}})}const ne=te(F);function q(t,n){const s=n==="append"?$:G;return A(t)&&!t.startsWith("http")?t:s(t,!0)}function re(){const t=S();if(t._observer)return t._observer;let n=null;const s=new Map,d=(r,l)=>(n||(n=new IntersectionObserver(i=>{for(const c of i){const p=s.get(c.target);(c.isIntersecting||c.intersectionRatio>0)&&p&&p()}})),s.set(r,l),n.observe(r),()=>{s.delete(r),n.unobserve(r),s.size===0&&(n.disconnect(),n=null)});return t._observer={observe:d}}const ae=/2g/;function oe(){const t=navigator.connection;return!!(t&&(t.saveData||ae.test(t.effectiveType)))}const ie={class:"antialiased bg-white dark:bg-black dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-black"},se={class:"max-w-520px text-center z-20"},le=["textContent"],ue=["textContent"],ce={class:"flex items-center justify-center w-full"},fe={__name:"error-404",props:{appName:{type:String,default:"Nuxt"},version:{type:String,default:""},statusCode:{type:Number,default:404},statusMessage:{type:String,default:"Not Found"},description:{type:String,default:"Sorry, the page you are looking for could not be found."},backHome:{type:String,default:"Go back home"}},setup(t){const n=t;return Q({title:`${n.statusCode} - ${n.statusMessage} | ${n.appName}`,script:[{children:`!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();`}],style:[{children:'*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }'}]}),(s,d)=>{const e=ne;return W(),J("div",ie,[d[0]||(d[0]=x("div",{class:"fixed left-0 right-0 spotlight z-10"},null,-1)),x("div",se,[x("h1",{class:"font-medium mb-8 sm:text-10xl text-8xl",textContent:_(t.statusCode)},null,8,le),x("p",{class:"font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl",textContent:_(t.description)},null,8,ue),x("div",ce,[X(e,{to:"/",class:"cursor-pointer gradient-border px-4 py-2 sm:px-6 sm:py-3 sm:text-xl text-md"},{default:Y(()=>[Z(_(t.backHome),1)]),_:1})])])])}}},he=K(fe,[["__scopeId","data-v-00b6b518"]]);export{he as default};
