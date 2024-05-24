(function(){"use strict";var e={9036:function(e,t,n){var o=n(5130),r=n(6768),i=n(4232);const A={class:"app-body"},s={class:"container-fluid"},l={class:"row"},a={key:0,class:"my_nav col-12 col-md-2"};function u(e,t,n,o,u,c){const p=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.CE)("div",A,[(0,r.Lk)("div",s,[(0,r.Lk)("div",l,[u.isAuth?((0,r.uX)(),(0,r.CE)("div",a,[(0,r.Lk)("span",null,(0,i.v_)(u.user.displayName?u.user.displayName:u.user.email),1),(0,r.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>c.logOut&&c.logOut(...e))},"Log out")])):(0,r.Q3)("",!0),(0,r.bF)(p,{class:"col-12 col-md-10"})])])])}n(4114);var c=n(2126),p={name:"App",data(){return{isAuth:!1,user:{}}},mounted(){const e=(0,c.xI)();(0,c.hg)(e,(e=>{e?(this.isAuth=!0,this.user=e,this.$router.push({name:"home"})):this.$router.push({name:"login"})}))},methods:{logOut(){const e=(0,c.xI)();(0,c.CI)(e).then((()=>{window.location.reload()})).catch((e=>{console.error("Erreur lors de la déconnexion :",e)}))}}},d=n(1241);const g=(0,d.A)(p,[["render",u]]);var m=g,k=n(973),v=n.p+"img/pin.a9d55bbc.png",y="data:image/png;base64,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";const I={class:"home"},h={key:0},L={key:1,class:"row"},B={class:"input-container"},S={class:"input"},w={style:{display:"flex","justify-content":"flex-start","align-items":"flex-start"}},Q=(0,r.Lk)("img",{src:v,width:"30",alt:""},null,-1),F={class:"result"},J={class:"prompt"},K={class:"prompt-container"},U=(0,r.Lk)("input",{id:"input",type:"text",placeholder:"Message au model"},null,-1),E=(0,r.Lk)("span",null,"Le model peut faire des erreurs. Envisagez de vérifier les informations importantes.",-1);function R(e,t,n,o,A,s){return(0,r.uX)(),(0,r.CE)("div",I,[A.loading?((0,r.uX)(),(0,r.CE)("div",h,"Chargement...")):((0,r.uX)(),(0,r.CE)("div",L,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(A.items,(e=>((0,r.uX)(),(0,r.CE)("div",{key:e.id,class:"item col-12 col-lg-6 offset-lg-3"},[(0,r.Lk)("div",B,[(0,r.Lk)("p",S,(0,i.v_)(e.input),1)]),(0,r.Lk)("div",w,[Q,(0,r.Lk)("p",F,(0,i.v_)(e.result),1)])])))),128))])),(0,r.Lk)("div",J,[(0,r.Lk)("div",K,[U,(0,r.Lk)("img",{onClick:t[0]||(t[0]=(...e)=>s.askServer&&s.askServer(...e)),src:y,width:"45",alt:""})]),E])])}var b=n(4161),V={data(){return{text:"",items:[],loading:!0}},methods:{async askServer(){try{const e=(0,c.xI)(),t=(0,b.C3)(),n=document.getElementById("input").value,o=await fetch("http://213.210.20.155:5000/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({input_text:n})});if(!o.ok)throw new Error("Erreur lors de la requête.");const r=await o.json();this.text=r.generated_text;const i=e.currentUser;if(i){const e=(0,b.KR)(t,"users/"+i.uid+"/results");await(0,b.VC)(e,{input:n,result:r.generated_text}),console.log("Data added to list successfully")}else console.error("User not authenticated")}catch(e){console.error("Erreur lors de la requête :",e)}},fetchItems(e){const t=(0,b.C3)(),n=(0,b.KR)(t,"users/"+e.uid+"/results");(0,b.Zy)(n,(e=>{const t=e.val();this.items=t?Object.keys(t).map((e=>({id:e,...t[e]}))):[],this.loading=!1}))}},created(){const e=(0,c.xI)();(0,c.hg)(e,(e=>{e?this.fetchItems(e):(console.error("User not authenticated"),this.loading=!1)}))}};const f=(0,d.A)(V,[["render",R]]);var C=f;const q=(0,r.Lk)("h1",null,"À propos",-1),O=(0,r.Lk)("p",null,"À propos de nous...",-1),Z=[q,O];function G(e,t,n,o,i,A){return(0,r.uX)(),(0,r.CE)("div",null,Z)}var j={};const W=(0,d.A)(j,[["render",G]]);var D=W;const M=(0,r.Lk)("h1",null,"Login",-1),x=(0,r.Lk)("h1",null,"Créer un compte",-1),X={key:0},H=(0,r.Lk)("div",null,[(0,r.Lk)("input",{type:"email",id:"email",placeholder:"Email",required:""}),(0,r.Lk)("br"),(0,r.Lk)("input",{type:"password",id:"password",placeholder:"Password",required:""})],-1),Y=(0,r.Lk)("br",null,null,-1),z={key:1},N=(0,r.Lk)("div",null,[(0,r.Lk)("input",{type:"email",id:"l-email",placeholder:"Email",required:""}),(0,r.Lk)("br"),(0,r.Lk)("input",{type:"password",id:"l-password",placeholder:"Password",required:""})],-1),P=(0,r.Lk)("br",null,null,-1),T=(0,r.Lk)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",width:"50",alt:""},null,-1);function _(e,t,n,i,A,s){return(0,r.uX)(),(0,r.CE)("div",null,[M,(0,r.Lk)("div",null,[x,(0,r.Lk)("form",{onSubmit:t[4]||(t[4]=(0,o.D$)(((...e)=>s.register&&s.register(...e)),["prevent"]))},[A.isHaveAnAccount?((0,r.uX)(),(0,r.CE)("div",z,[N,(0,r.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>s.login&&s.login(...e)),type:"submit"},"Connection"),P,(0,r.Lk)("span",null,[(0,r.eW)("Déjà un compte ? "),(0,r.Lk)("a",{onClick:t[3]||(t[3]=e=>A.isHaveAnAccount=!1)},"Créer un compte")])])):((0,r.uX)(),(0,r.CE)("div",X,[H,(0,r.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>s.register&&s.register(...e)),type:"submit"},"Inscription"),Y,(0,r.Lk)("span",null,[(0,r.eW)("Déjà un compte ? "),(0,r.Lk)("a",{onClick:t[1]||(t[1]=e=>A.isHaveAnAccount=!0)},"Connection")])]))],32)]),(0,r.Lk)("button",{onClick:t[5]||(t[5]=(...e)=>s.signInWithGoogle&&s.signInWithGoogle(...e))},[T,(0,r.eW)("Se connecter avec Google")])])}var $={data(){return{isHaveAnAccount:!1}},methods:{async signInWithGoogle(){const e=(0,c.xI)();try{const t=new c.HF,n=await(0,c.df)(e,t),o=n.user;console.log("Utilisateur connecté:",o)}catch(t){console.error("Erreur lors de la connexion avec Google:",t)}},async register(){const e=(0,c.xI)(),t=document.getElementById("email").value,n=document.getElementById("password").value;(0,c.eJ)(e,t,n).then((e=>{console.log(e.user.uid),this.$router.push({name:"home"})})).catch((e=>{console.log(e)}))},login(){const e=(0,c.xI)(),t=document.getElementById("l-email").value,n=document.getElementById("l-password").value;(0,c.x9)(e,t,n).then((()=>{this.$router.push({name:"home"})})).catch((()=>{}))}}};const ee=(0,d.A)($,[["render",_]]);var te=ee;const ne=[{name:"home",path:"/",component:C},{name:"about",path:"/about",component:D},{name:"login",path:"/login",component:te}],oe=(0,k.aE)({history:(0,k.LA)(),routes:ne});var re=oe,ie=n(6400);const Ae={apiKey:"AIzaSyBSRKNJhlcDTrbd4sIVvfgqODkgRbjIRyc",authDomain:"llm-web-69b85.firebaseapp.com",databaseURL:"https://llm-web-69b85-default-rtdb.europe-west1.firebasedatabase.app",projectId:"llm-web-69b85",storageBucket:"llm-web-69b85.appspot.com",messagingSenderId:"886786775690",appId:"1:886786775690:web:f3697ce732c7968248eb73"},se=(0,ie.Wp)(Ae);var le=se;(0,o.Ef)(m).use(re).use(le).mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var A=1/0;for(u=0;u<e.length;u++){o=e[u][0],r=e[u][1],i=e[u][2];for(var s=!0,l=0;l<o.length;l++)(!1&i||A>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[l])}))?o.splice(l--,1):(s=!1,i<A&&(A=i));if(s){e.splice(u--,1);var a=r();void 0!==a&&(t=a)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.p="/"}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,A=o[0],s=o[1],l=o[2],a=0;if(A.some((function(t){return 0!==e[t]}))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(l)var u=l(n)}for(t&&t(o);a<A.length;a++)i=A[a],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},o=self["webpackChunkclient"]=self["webpackChunkclient"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(9036)}));o=n.O(o)})();
//# sourceMappingURL=app.f615a5e5.js.map