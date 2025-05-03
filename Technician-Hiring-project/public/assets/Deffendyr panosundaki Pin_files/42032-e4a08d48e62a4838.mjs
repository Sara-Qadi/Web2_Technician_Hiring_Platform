"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([["42032"],{721350:function(e,t,n){n.d(t,{Z:()=>o});var i=n(496102);let a=`pulsing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}`,o={css:(0,i.Ll)([a]),animation:"pulsing 2s infinite"}},496102:function(e,t,n){n.d(t,{CC:()=>a,Ll:()=>r,XF:()=>o});let i=(e,t,n)=>({x:Math.floor(e*Math.cos(n)),y:Math.floor(t*Math.sin(n))}),a=(e,t)=>i(t/2,e/2,2*Math.random()*Math.PI),o=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,r=e=>["@-webkit-keyframes","@keyframes"].map(t=>e.map(e=>t+" "+e).join("\n")).join("\n")},261954:function(e,t,n){n.r(t),n.d(t,{default:()=>E});var i=n(667294),a=n(883119),o=n(230201),r=n(817468);function l(e,t,n){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:i+"")in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let s={},m=e=>{let t=e.__id||e.id;return"string"==typeof t&&t||null};class u{constructor(){l(this,"idMap",new Map),l(this,"objMap",new WeakMap)}get(e){let t=m(e);return this.objMap.get(e)??(t?this.idMap.get(t):void 0)}has(e){let t=m(e);return this.objMap.has(e)??(!!t&&this.idMap.has(t))}set(e,t){let n=m(e);n&&this.idMap.set(n,t),this.objMap.set(e,t)}reset(){this.idMap=new Map,this.objMap=new WeakMap}}function p(e,t){return"number"==typeof e?e:"_lg1"===t?e[t]??e.lg??1:e[t]??1}var c=n(309947),d=n(589172),h=n(876594),g=n(721350),y=n(59111),_=n(785893);let{css:f,animation:x}=g.Z,b={backgroundColor:h._VP,animation:x,borderRadius:h.Ev2};function w({data:e}){let{height:t}=e;return(0,_.jsxs)(i.Fragment,{children:[(0,_.jsx)(y.Z,{unsafeCSS:f}),(0,_.jsx)(a.xu,{dangerouslySetInlineStyle:{__style:b},"data-test-id":"skeleton-pin",children:(0,_.jsx)(a.xu,{height:t})})]})}var v=n(806513),M=n(613567),C=n(774838),k=n(739405),$=n(767415),S=n(177433);function E(e){let t;let{align:n,cacheKey:l,id:m,isFetching:h,isGridCentered:g=!0,items:f,layout:x,loadItems:b,masonryRef:E,optOutFluidGridExperiment:j=!1,renderItem:A,scrollContainerRef:R,virtualize:W=!0,_getColumnSpanConfig:I,_getResponsiveModuleConfigForSecondItem:G,_dynamicHeights:P,useLoadingState:B,isLoadingAccessibilityLabel:F,isLoadedAccessibilityLabel:O}=e,L=(0,k.ZP)(),{isAuthenticated:N,isRTL:V}=(0,C.B)(),{logContextEvent:z}=(0,o.v)(),Z=(0,M.F)(),X="desktop"===L,D=(0,S.MM)(),H=((0,i.useRef)(f.map(()=>({fetchTimestamp:Date.now(),measureTimestamp:Date.now(),hasRendered:!1,pageCount:0}))),X&&!j),{experimentalColumnWidth:T,experimentalGutter:Q}=(0,c.Z)(H),q=e.serverRender??!!X,K="flexible"===x||"uniformRowFlexible"===x||"desktop"!==L||H,U=(K&&x?.startsWith("uniformRow")?"uniformRowFlexible":void 0)??(q?"serverRenderedFlexible":"flexible"),J=e.columnWidth??T??v.yF;K&&(J=Math.floor(J));let Y=e.gutterWidth??Q??(X?v.oX:1),ee=e.minCols??v.yc,et=((0,i.useRef)(0),J+Y),en=function(e){if(null==e)return;let t=function(e){let t=s[e];return t&&t.screenWidth===window.innerWidth||(s[e]={screenWidth:window.innerWidth}),s[e]}(e);return t.measurementCache||(t.measurementCache=new u),t.measurementCache}(l),ei=(0,i.useCallback)(()=>R?.current||window,[R]),ea=(0,i.useRef)(!0),{anyEnabled:eo}=P?Z.checkExperiment("dynamic_heights_v2"):{anyEnabled:!1},{anyEnabled:er}=Z.checkExperiment("web_masonry_enable_dynamic_heights_for_all"),{anyEnabled:el}=Z.checkExperiment("web_masonry_pin_overlap_calculation_and_logging"),{anyEnabled:es,group:em}=Z.checkExperiment("web_masonry_multicolumn_position_algo_v2"),{anyEnabled:eu,group:ep}=Z.checkExperiment("web_masonry_dynamic_batches");eu&&(t=(e,t)=>{let n={itemsBatchSize:0,whitespaceThreshold:0,iterationsLimit:15e3};return t>3&&(n.whitespaceThreshold=Y*t),("enabled_small_batch"===ep||"employees"===ep)&&(e>=7?n.itemsBatchSize=7:n.itemsBatchSize=5),"enabled_large_batch"===ep&&(e>=7?n.itemsBatchSize=9:n.itemsBatchSize=5),n});let ec=g&&ea.current?"centered":"",{className:ed,styles:eh}=function(e){let t=`m_${Object.keys(e).sort().reduce((t,n)=>{let i=e[n];return null==i||"object"==typeof i||"function"==typeof i?t:"boolean"==typeof i?t+(i?"t":"f"):t+i},"").replace(/\:/g,"\\:")}`,{flexible:n,gutterWidth:i,isRTL:a,itemWidth:o,maxColumns:r,minColumns:l,items:s,_getColumnSpanConfig:m,_getResponsiveModuleConfigForSecondItem:u}=e,c=m?s.map((e,t)=>({index:t,columnSpanConfig:m(e)??1})).filter(e=>1!==e.columnSpanConfig):[],d=o+i,h=Array.from({length:r+1-l},(e,t)=>t+l).map(e=>{let h,g;let y=e===l?0:e*d,_=e===r?null:(e+1)*d-.01;m&&u&&s.length>1&&(h=m(s[0]),g=u(s[1]));let{styles:f,numberOfVisibleItems:x}=c.reduce((a,r)=>{let{columnSpanConfig:l}=r,m=Math.min(function({columnCount:e,columnSpanConfig:t,firstItemColumnSpanConfig:n,isFlexibleWidthItem:i,secondItemResponsiveModuleConfig:a}){let o=e<=2?"sm":e<=4?"md":e<=6?"_lg1":e<=8?"lg":"xl",r=p(t,o);if(i){let t=p(n,o);r="number"==typeof a?a:a?Math.max(a.min,Math.min(a.max,e-t)):1}return r}({columnCount:e,columnSpanConfig:l,isFlexibleWidthItem:!!g&&r===s[1],firstItemColumnSpanConfig:h??1,secondItemResponsiveModuleConfig:g??1}),e),u=null!=r.index&&a.numberOfVisibleItems>=m+r.index,c=n?100/e*m:o*m+i*(m-1),{numberOfVisibleItems:d}=a;return u?d-=m-1:r.index<d&&(d+=1),{styles:a.styles.concat(function({className:e,index:t,columnSpanConfig:n,visible:i,width:a,flexible:o}){let r="number"==typeof n?n:btoa(JSON.stringify(n));return o?`
      .${e} .static[data-column-span="${r}"]:nth-child(${t+1}) {
        visibility: ${i?"visible":"hidden"} !important;
        position: ${i?"inherit":"absolute"} !important;
        width: ${a}% !important;
      }`:`
      .${e} .static[data-column-span="${r}"]:nth-child(${t+1}) {
        visibility: ${i?"visible":"hidden"} !important;
        position: ${i?"inherit":"absolute"} !important;
        width: ${a}px !important;
      }`}({className:t,index:r.index,columnSpanConfig:l,visible:u,width:c,flexible:n})),numberOfVisibleItems:d}},{styles:"",numberOfVisibleItems:e}),b=n?`
      .${t} .static {
        box-sizing: border-box;
        width: calc(100% / ${e}) !important;
      }
    `:`
      .${t} {
        max-width: ${e*d}px;
      }

      .${t} .static {
        width: ${o}px !important;
      }
    `;return{minWidth:y,maxWidth:_,styles:`
      .${t} .static:nth-child(-n+${x}) {
        position: static !important;
        visibility: visible !important;
        float: ${a?"right":"left"};
        display: block;
      }

      .${t} .static {
        padding: 0 ${i/2}px;
      }

      ${b}

      ${f}
    `}}),g=h.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @container (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),y=h.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @media (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),_=`
    ${g.join("")}
    @supports not (container-type: inline-size) {
      ${y.join("")}
    }
  `;return{className:t,styles:`
  .masonryContainer {
      container-type: inline-size;
    }

    .masonryContainer > .centered {
      margin-left: auto;
      margin-right: auto;
    }

    .${t} .static {
      position: absolute !important;
      visibility: hidden !important;
    }

    ${_}
  `}}({gutterWidth:Y,flexible:K,items:f,isRTL:V,itemWidth:J,maxColumns:e.maxColumns??Math.max(f.length,v.g5),minColumns:ee,_getColumnSpanConfig:I,_getResponsiveModuleConfigForSecondItem:G}),eg=`${ec} ${ed}`.trim(),{anyEnabled:ey,expName:e_,group:ef,isMeasureAllEnabled:ex}=(0,d.Z)(),eb=((0,i.useRef)(),(0,i.useRef)(f.length)),ew=(0,i.useRef)(0),ev=(0,i.useRef)(null);(0,i.useEffect)(()=>{eb.current=f.length,ew.current+=1},[f]),(0,i.useEffect)(()=>{ea.current&&(ea.current=!1)},[]),(0,i.useEffect)(()=>()=>{},[]);let eM=(0,i.useCallback)((e,t,n)=>{let i=e.reduce((e,t)=>e+t),a=i/e.length;(0,$.S0)("webapp.masonry.multiColumnWhitespace.average",a,{sampleRate:1,tags:{experimentalMasonryGroup:ef||"unknown",multicolumnLayoutAlgoV2Group:em||"unknown",dynamicBatchesExperimentGroup:ep||"unknown",handlerId:D,isAuthenticated:N,multiColumnItemSpan:e.length}}),(0,$.S0)("webapp.masonry.twoColWhitespace",a,{sampleRate:1,tags:{columnWidth:J,minCols:ee}}),ep&&(0,$.S0)("webapp.masonry.graphIterations",t,{sampleRate:1,tags:{columnSpan:n,experimentGroup:ep}}),z({event_type:15878,component:14468,aux_data:{total_whitespace_px:i}}),z({event_type:16062,component:14468,aux_data:{average_whitespace_px:a}}),z({event_type:16063,component:14468,aux_data:{max_whitespace_px:Math.max(...e)}}),e.forEach(t=>{t>=50&&((0,$.nP)("webapp.masonry.multiColumnWhitespace.over50",{sampleRate:1,tags:{experimentalMasonryGroup:ef||"unknown",multicolumnLayoutAlgoV2Group:em||"unknown",dynamicBatchesExperimentGroup:ep||"unknown",handlerId:D,isAuthenticated:N,multiColumnItemSpan:e.length}}),z({event_type:16261,component:14468})),t>=100&&((0,$.nP)("webapp.masonry.multiColumnWhitespace.over100",{sampleRate:1,tags:{experimentalMasonryGroup:ef||"unknown",multicolumnLayoutAlgoV2Group:em||"unknown",dynamicBatchesExperimentGroup:ep||"unknown",handlerId:D,isAuthenticated:N,multiColumnItemSpan:e.length}}),z({event_type:16262,component:14468}))}),(0,$.nP)("webapp.masonry.multiColumnWhitespace.count",{sampleRate:1,tags:{experimentalMasonryGroup:ef||"unknown",multicolumnLayoutAlgoV2Group:em||"unknown",dynamicBatchesExperimentGroup:ep||"unknown",handlerId:D,isAuthenticated:N,multiColumnItemSpan:e.length}})},[J,z,ee,N,D,ef,em,ep]),{_items:eC,_renderItem:ek}=function({initialLoadingStatePinCount:e=50,infiniteScrollPinCount:t=10,isFetching:n,items:a=[],renderItem:o,useLoadingState:r}){let l=a.filter(e=>"object"==typeof e&&null!==e&&"type"in e&&"closeup_module"===e.type).length>0,s=r&&n&&0===a.length,m=r&&n&&l&&1===a.length,u=r&&n&&a.length>(l?1:0),p=(0,i.useMemo)(()=>Array.from({length:u?t:e}).reduce((e,t,n)=>[...e,{height:n%2==0?356:236,key:`skeleton-pin-${n}`,isSkeleton:!0}],[]),[e,t,u]);return{_items:(0,i.useMemo)(()=>m||u?[...a,...p]:s?p:a,[s,u,m,a,p]),_renderItem:(0,i.useMemo)(()=>r?e=>{let{itemIdx:t,data:n}=e;return t>=a.length&&n&&"object"==typeof n&&"key"in n&&"height"in n?(0,_.jsx)(w,{data:n},n.key):o(e)}:o,[r,o,a.length])}}({useLoadingState:B,items:f,renderItem:(0,i.useCallback)(e=>(0,_.jsx)(r.Z,{name:"MasonryItem",children:A(e)}),[A]),isFetching:h}),e$=B&&h;return(0,i.useEffect)(()=>{el&&requestAnimationFrame(()=>{let e=Array.from(ev.current?.querySelectorAll("[data-grid-item-idx]")??[]);if(0===e.length)return;let t=e.map(e=>{let t=e.getAttribute("data-grid-item-idx");return{rect:e.getBoundingClientRect(),itemIdx:t}}),n=0,i=0,a=0,o=0,r=0,l=0;for(let e=0;e<t.length;e+=1){let s=t[e]?.rect;for(let m=e+1;m<t.length;m+=1){let e=t[m]?.rect;if(s&&e&&s.right>=e.left&&s.left<=e.right&&s.bottom>=e.top&&s.top<=e.bottom&&s.height>0&&e.height>0){n+=1;let t=Math.max(0,Math.min(s.right,e.right)-Math.max(s.left,e.left))*Math.max(0,Math.min(s.bottom,e.bottom)-Math.max(s.top,e.top));t>8e4?l+=1:t>4e4?r+=1:t>1e4?o+=1:t>5e3?a+=1:t>2500&&(i+=1)}}}n>0&&(0,$.QX)("webapp.masonry.pinOverlapHits",n,{tags:{isAuthenticated:N,isDesktop:X,experimentalMasonryGroup:ef||"unknown"}}),i>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over2500",i,{tags:{isAuthenticated:N,isDesktop:X,experimentalMasonryGroup:ef||"unknown"}}),a>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over5000",a,{tags:{isAuthenticated:N,isDesktop:X,experimentalMasonryGroup:ef||"unknown"}}),o>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over10000",o,{tags:{isAuthenticated:N,isDesktop:X,experimentalMasonryGroup:ef||"unknown"}}),r>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over40000",r,{tags:{isAuthenticated:N,isDesktop:X,experimentalMasonryGroup:ef||"unknown"}}),l>0&&(0,$.QX)("webapp.masonry.pinOverlap.AreaPx.over80000",l,{tags:{isAuthenticated:N,isDesktop:X,experimentalMasonryGroup:ef||"unknown"}})})},[J,ef,N,X,el,f]),(0,_.jsxs)(i.Fragment,{children:[B&&!ea.current&&(0,_.jsx)(a.xu,{"aria-live":"polite",display:"visuallyHidden",children:e$?F:O}),(0,_.jsx)("div",{ref:ev,"aria-busy":B?!!e$:void 0,className:"masonryContainer","data-test-id":"masonry-container",id:m,style:H?{padding:`0 ${Y/2}px`}:void 0,children:(0,_.jsxs)("div",{className:eg,children:[q&&ea.current?(0,_.jsx)(y.Z,{"data-test-id":"masonry-ssr-styles",unsafeCSS:eh}):null,(0,_.jsx)(a.xu,{"data-test-id":"max-width-container",marginBottom:0,marginEnd:"auto",marginStart:"auto",marginTop:0,maxWidth:e.maxColumns?et*e.maxColumns:void 0,children:ey?(0,_.jsx)(a.GX,{ref:e=>{E&&(E.current=e)},_dynamicHeights:er||P,_dynamicHeightsV2Experiment:eo,_getColumnSpanConfig:I,_getModulePositioningConfig:t,_getResponsiveModuleConfigForSecondItem:G,_logTwoColWhitespace:eM,_measureAll:ex,_multiColPositionAlgoV2:es,align:n,columnWidth:J,gutterWidth:Y,items:eC,layout:K?U:x??"basic",loadItems:b,measurementStore:en,minCols:ee,renderItem:ek,scrollContainer:ei,virtualBufferFactor:.3,virtualize:W}):(0,_.jsx)(a.Rk,{ref:e=>{E&&(E.current=e)},_dynamicHeights:er||P,_dynamicHeightsV2Experiment:eo,_getColumnSpanConfig:I,_getModulePositioningConfig:t,_getResponsiveModuleConfigForSecondItem:G,_logTwoColWhitespace:eM,_multiColPositionAlgoV2:es,align:n,columnWidth:J,gutterWidth:Y,items:eC,layout:K?U:x??"basic",loadItems:b,measurementStore:en,minCols:ee,renderItem:ek,scrollContainer:ei,virtualBufferFactor:.3,virtualize:W})})]})})]})}},309947:function(e,t,n){n.d(t,{Z:()=>i});function i(e=!0){let t=e?16:void 0,n=t?Math.floor(t/4):void 0;return{experimentalColumnWidth:e?221:void 0,experimentalGutter:t,experimentalGutterBoints:n}}},589172:function(e,t,n){n.d(t,{Z:()=>r});var i=n(613567),a=n(774838),o=n(177433);function r(e){let{isAuthenticated:t}=(0,a.B)(),{expName:n,anyEnabled:r,group:l}=function({experimentsClient:e,handlerId:t,isAuthenticated:n,skipActivation:i}){let{checkExperiment:a}=e,o=a(n?"web_masonry_v2_auth":"web_masonry_v2_unauth",{dangerouslySkipActivation:i});return o.group?{expName:n?"web_masonry_v2_auth":"web_masonry_v2_unauth",...o}:"www/[username]/[slug].js"!==t||n?"www/pin/[id].js"!==t||n?{expName:"",anyEnabled:!1,group:""}:{expName:"web_masonry_v2_unauth_pin",...a("web_masonry_v2_unauth_pin",{dangerouslySkipActivation:i})}:{expName:"web_masonry_v2_unauth_board",...a("web_masonry_v2_unauth_board",{dangerouslySkipActivation:i})}}({experimentsClient:(0,i.F)(),handlerId:(0,o.MM)(),isAuthenticated:t,skipActivation:e?.skipActivation??!1});return{expName:n,anyEnabled:r,group:l,isMeasureAllEnabled:"enabled_measure_all"===l||"enabled_measure_all_impression_fix"===l,isImpressionFixEnabled:"control_impression_fix"===l||"enabled_impression_fix"===l||"enabled_measure_all_impression_fix"===l}}}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/42032-e4a08d48e62a4838.mjs.map