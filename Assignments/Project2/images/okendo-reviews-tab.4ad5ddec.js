(window["wpJsonpOkeReviews"]=window["wpJsonpOkeReviews"]||[]).push([["modules/okendo-reviews-tab"],{2877:function(e,t,n){"use strict";function i(e,t,n,i,o,r,s,a){var c,l="function"===typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),i&&(l.functional=!0),r&&(l._scopeId="data-v-"+r),s?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},l._ssrRegister=c):o&&(c=a?function(){o.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c;var d=l.render;l.render=function(e,t){return c.call(t),d(e,t)}}else{var u=l.beforeCreate;l.beforeCreate=u?[].concat(u,c):[c]}return{exports:e,options:l}}n.d(t,"a",(function(){return i}))},7197:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{directives:[{name:"ga",rawName:"v-ga:click",value:{action:"Review Tab Click",type:"interaction"},expression:"{ action: 'Review Tab Click', type: 'interaction' }",arg:"click"}],staticClass:"oke-reviewsTab",class:"oke-reviewsTab--small-"+e.positionSmall+" oke-reviewsTab--large-"+e.position,attrs:{role:"button",tabindex:"0"},on:{click:function(t){return e.onAllReviewsClick(t)},keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onAllReviewsClick(t)}}},[n("span",{staticClass:"oke-reviewsTab-icon"}),n("span",{staticClass:"oke-reviewsTab-label"},[e._v(e._s(e.$tc("Reviews")))])])])},o=[],r=n("9ab4"),s=n("60a3"),a=n("da28"),c=n("7c19"),l=n("9de8"),d=n("88a3");let u=class extends s["d"]{created(){this.insertOrUpdateCSSVariables()}mounted(){l["a"].sendWidgetRenderedEvent("reviews-tab",this.widgetId)}get reviewsTabSettings(){return c["default"].widgetSettings.reviewsTab}get positionSmall(){return this.reviewsTabSettings.positionSmall}get position(){return this.reviewsTabSettings.position}onAllReviewsClick(){a["a"].openAllReviewsModal()}insertOrUpdateCSSVariables(){const e=this.reviewsTabSettings,t=`:root {\n                --oke-reviewsTab-backgroundColor: ${e.backgroundColor};\n                --oke-reviewsTab-textColor: ${e.textColor};\n            }`;d["a"].addOrUpdateTargetBlock("style","oke-reviewsTab-vars",t)}};Object(r["a"])([Object(s["c"])()],u.prototype,"widgetId",void 0),u=Object(r["a"])([s["a"]],u);var v=u,p=v,f=(n("95f6"),n("2877")),b=Object(f["a"])(p,i,o,!1,null,null,null);t["default"]=b.exports},"95f6":function(e,t,n){"use strict";n("d353")},"9ab4":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));function i(e,t,n,i){var o,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,n,s):o(t,n))||s);return r>3&&s&&Object.defineProperty(t,n,s),s}Object.create;Object.create},d353:function(e,t,n){}}]);