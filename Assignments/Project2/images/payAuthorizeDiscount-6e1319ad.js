var e,o,s,i,n,t;import{r,j as a,R as c}from"./jsx-runtime-7d2659be.js";import{u,F as m,A as d}from"./Authorize.module-6b5afe97.js";import{u as l,U as p,A as g}from"./AnalyticsProvider-49593609.js";import{g as f}from"./index-dd3c6fc4.js";import{C as h}from"./CountriesProvider-e594cab2.js";import{E as j}from"./ErrorBoundary-b93e2fcd.js";import{P as v}from"./PageLoaded-e089723b.js";import{T as C,a as b,b as S}from"./Spacing-d2432a9a.js";import{A as k}from"./analyticsContext-34dd661c.js";import"./fetch-e7ffda61.js";import{S as y,b as w,c as P}from"./account-c69d4c59.js";import{T as x}from"./constants-3c830580.js";import{A}from"./AuthorizeWithConsent-0c4ac4e2.js";import{u as _}from"./useAuthorizeTexts-6812e91b.js";import{u as z,a as D,b as E,i as I}from"./usePostMessage-0d0d654b.js";import{S as L,f as T}from"./Account-f25ca782.js";import"./_commonjsHelpers-26303f2a.js";import"./Link-78e92508.js";import"./index-a00e579d.js";import"./UserCard-ea53c050.js";import"./Tooltip-9662ec36.js";import"./Button-e6f51994.js";import"./CodeInput-69161495.js";import"./AutoSubmitForm-335a0a2d.js";import"./notifier-2f738814.js";import"./monorail-75228f09.js";import"./tslib.es6-ba7e95a7.js";import"./events-3c6df96d.js";import"./index-5819a1d2.js";import"./useResizeObserver-82c92f5e.js";import"./ResizeObserver-80d14552.js";import"./Authorize-14526f36.js";import"./useIsPasskeysLoginSupported-e9c71d72.js";import"./env-2e924548.js";import"./cookies-cfd7b9ff.js";import"./useIsPasskeysSupportedBrowser-2081afbf.js";import"./Identity-8aa6feeb.js";import"./usePointOfSale-55bd77e3.js";import"./Section-9cb02d31.js";import"./Heading-6a05f95e.js";import"./Notification-bb5f30c2.js";import"./UIContextProvider-45b0589e.js";import"./common-400e07c4.js";import"./ShopAuthInputField-88d9066e.js";import"./Input-a2a79904.js";import"./FlagInput-39623613.js";import"./preload-helper-0c4d888d.js";import"./VerificationNotification-4e9436bd.js";import"./exclamation-57e23cff.js";import"./AuthorizeConfirm-a346b6a2.js";const U="discount-code-save-error@myshopify.io",R=1500;function N({phoneCapture:e=!1,saveDiscountAt:o}){const{translate:s}=r.useContext(C),[i,n]=r.useState(!1),[t,c]=r.useState(!1),[m,d]=r.useState(null),p="never"===o,[g,f]=r.useState(!1),h=!e||"phone-consent-confirmed"===o&&m,{authToken:j,devMode:v,fullView:b,flowVersion:S,setAuthToken:N,targetOrigin:B,updateConfirmParams:F,shopPermanentDomain:O,submittedEmail:V,setSubmittedEmail:q}=u(),{analyticsTraceId:M}=l(),{messageRestarted:K,messageEmailSubmitted:H,messageError:J,messageLoginComplete:Q,messageResized:W,messageShopUserMatched:Y,messageLoaded:X,messageProcessing:$,messageCloseRequested:G,messageDiscountSaved:Z,messageVerificationSuccess:ee,messageAuthorizeStepChanged:oe}=function(e,o){const s=z(e,o);return{...D(e,o),messageDiscountSaved:s("discount_saved")}}(B,b);E({onEscapeKeypress:G});const se=r.useCallback((async({discountCode:e})=>{if(I(e)){$({status:P.Loading,message:s("confirm.discount.processing_loading")});try{if(v){if(V===U)throw new L({});await new Promise((e=>{setTimeout((()=>{console.debug("[Pay] Discount saved (stubbed for dev mode)."),e()}),R)}))}else{const o=await T({code:e,shopify_domain:O,analytics_trace_id:M,flow:k.Discount,flow_version:S,session_token:j});N(o.token)}f(!0),$({status:P.Success,message:s("confirm.discount.processing_success")}),Z()}catch(o){J({email:V,code:y.ServerError,message:w.DiscountSaveFailed})}}else J({email:V,code:y.NoDiscountReceived,message:w.InvalidDiscount})}),[M,j,v,S,J,Z,$,N,O,V,s]);function ie(){Q({email:V,loggedIn:!1})}r.useEffect((()=>{function e(e){const{type:o,...s}=e.data;switch(o){case"emailsubmitted":!function({email:e,hideChange:o}){"string"==typeof e&&(q(e),n(Boolean(o)))}(s);break;case"savediscount":se(s);break;case"phoneshareconsentreceived":!function({skipDiscountSaving:e,consented:o}){e&&f(!0),F({phone_share_consent:String(o)}),d(Boolean(o))}(s)}}return window.addEventListener("message",e),()=>window.removeEventListener("message",e)}),[V,q,J,F,s,Z,$,se]);const{authorizeTexts:ne}=_();const te=r.useMemo((()=>{const o=[{condition:p||g,error:"Discount must be saved before confirming."}];return e&&o.push({condition:null!==m,error:"Phone share consent must be received before confirming."}),o}),[g,p,e,m]),re={disallowUserChange:i,trackingSetup:{context:x.LoginWithShopDiscount},confirmConditions:te,hidden:!t,texts:ne,disallowOneClickPersonalizationConsent:!0,onLoaded:function({userFound:e,logoSrc:o,personalizeConsentChallenge:i}){X({userFound:e,logoSrc:o,loginTitle:s("confirm.discount.login_title"),personalizeConsentChallenge:i})},onResized:W,onUserFound:function({userCookieExists:e,maskedPhoneNumber:o,personalizeConsentChallenge:s}){(e||s)&&(t||(c(!0),Y({userCookieExists:e,maskedPhoneNumber:o,description:"",personalizeConsentChallenge:s})))},onUserNotFound:ie,onRestarted:function(){K(),q(""),c(!1)},onUserVerification:function({userRecord:e,newUser:o}){o||(Y({userCookieExists:!1,description:s("confirm.discount.login_sms_description",{phoneNumber:e.phone_number||""}),maskedPhoneNumber:e.phone_number}),c(!0))},onCaptchaChallenge:function(e){J({email:e,code:y.UserBlocked,message:w.CaptchaChallenge}),Q({email:e,loggedIn:!1})},onUserConfirm:function(e){ee({email:e}),H({email:e})},onConfirmProcessing:function({email:e}){$({status:P.Loading,email:e,...h&&{message:s("confirm.discount.processing_loading")}})},onConfirmSuccess:function({email:e}){$({status:P.Success,email:e,...h&&{message:s("confirm.discount.processing_success")}})},onTokenReturned:function(e){Q({...e,loggedIn:!0})},onAuthorizeStepChanged:oe,onCancel:ie,onError:function(e){J(e),Q({email:e.email,loggedIn:!0})}};return a.jsx(A,{...re})}const B=f("analytics-trace-id"),F=f("authentication-level-required"),O=f("client"),V=f("confirm-params"),q=null==(e=f("dev-mode"))?void 0:e.toString(),M=f("dictionary"),K=null==(o=f("flow-version"))?void 0:o.toString(),H=f("full-view"),J=f("shop-permanent-domain"),Q=null==(s=f("target-origin-url"))?void 0:s.toString(),W=f("user"),Y=Boolean(f("phone-capture")),X=null==(i=f("save-discount-at"))?void 0:i.toString(),$=null==(n=f("uniq-token"))?void 0:n.toString(),G=null==(t=f("visit-token"))?void 0:t.toString(),Z={uiSection:p.AuthorizeDiscount,clientUuid:O.uuid,analyticsTraceId:B,...W&&{shopAccountUuid:W.shop_account_uuid}},ee={authenticationLevelRequired:F,client:O,confirmParams:V,devMode:q,flow:m.Discount,flowVersion:K,fullView:H,hideCopy:!0,shopPermanentDomain:J,signUpEnabled:!1,targetOrigin:Q,uniqToken:$,user:W,visitToken:G};var oe;oe=document.getElementById("app"),c.render(a.jsx(j,{bugsnagApiKey:window.ShopifyPay.Config.bugsnagApiKey,sectionName:"AuthorizeDiscount",children:a.jsx(g,{...Z,children:a.jsx(v,{origin:"authorize_discount",children:a.jsx(b,{dictionary:M,children:a.jsx(S,{children:a.jsx(h,{children:a.jsx(d,{...ee,children:a.jsx(N,{phoneCapture:Y,saveDiscountAt:X})})})})})})})}),oe);