if(!self.define){let e,s={};const a=(a,d)=>(a=new URL(a+".js",d).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(d,i)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let r={};const t=e=>a(e,f),l={module:{uri:f},exports:r,require:t};s[f]=Promise.all(d.map((e=>l[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-7PYeHIMM.js",revision:"d5011951b970f5b1f7b25d154035d442"},{url:"assets/404.html-Ma256I-V.js",revision:"ff12804e3a8364f4bd572502833ed8b3"},{url:"assets/app-CVQjkF_g.js",revision:"ecdc94c313a275d5976fd5e1682beb02"},{url:"assets/bg/js/login.js",revision:"8bfaa5b70b37b7abcf090f506d0497f1"},{url:"assets/bg/js/login2.js",revision:"f5fea95d75e95f5d7882be07e7912d83"},{url:"assets/index-7SG8bi1h.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-_1O9w09w.js",revision:"1ad7e2662484538f664bde3551dc553a"},{url:"assets/index.html-0aaPC1su.js",revision:"b9188a02795b011134afcbfe42d44f81"},{url:"assets/index.html-21FP1Ng2.js",revision:"34afcb54aeb6f1471e5c718765653318"},{url:"assets/index.html-azkm_JCy.js",revision:"7d6efd62aeb762e2f7af9c987c588c8e"},{url:"assets/index.html-B8P973_6.js",revision:"201ec46583f734bc2a818d245d0bf676"},{url:"assets/index.html-DSdtv0kl.js",revision:"201ec46583f734bc2a818d245d0bf676"},{url:"assets/index.html-duRI1FBs.js",revision:"baf9219fe1fa4c62ad15d8addad3ad13"},{url:"assets/index.html-eRZuKlDA.js",revision:"a5352fdd91e4337292b7aac86a345a04"},{url:"assets/index.html-G4gnD2SX.js",revision:"201ec46583f734bc2a818d245d0bf676"},{url:"assets/index.html-h8EwC-o6.js",revision:"201ec46583f734bc2a818d245d0bf676"},{url:"assets/index.html-HcUTKjCc.js",revision:"ebaedd63aa5fef08660f037235b2674f"},{url:"assets/index.html-Kd3kk-97.js",revision:"201ec46583f734bc2a818d245d0bf676"},{url:"assets/index.html-MAQqtS0u.js",revision:"c4ae3b5dd5f9500938b742475d586b5c"},{url:"assets/index.html-MF-VOBDq.js",revision:"c2d881d3bd57c9cd0958effd9f75b888"},{url:"assets/index.html-moxPIKpZ.js",revision:"6d356f83f6336b1232ad3e23d28a95e2"},{url:"assets/index.html-oalm-z0N.js",revision:"201ec46583f734bc2a818d245d0bf676"},{url:"assets/index.html-po9BKj_o.js",revision:"8348098c9e097ad988c4c5850569e9f7"},{url:"assets/index.html-Qv_hCqJa.js",revision:"201ec46583f734bc2a818d245d0bf676"},{url:"assets/index.html-QX8Gtd3m.js",revision:"425d812aa8e2270cb1e38676852c1cb6"},{url:"assets/index.html-tygN8hxE.js",revision:"70b17267dcd792c24ca1e4e1fd1eb8b3"},{url:"assets/index.html-uLS3WEwd.js",revision:"977f9052b3e87f1ec65c0023062e87d3"},{url:"assets/index.html-uu1mvl5_.js",revision:"43f68ff9b1b8e661cf30aee2557a66ad"},{url:"assets/index.html-WGhnzsZl.js",revision:"201ec46583f734bc2a818d245d0bf676"},{url:"assets/index.html-XeY4XrwS.js",revision:"43f68ff9b1b8e661cf30aee2557a66ad"},{url:"assets/index.html-xIYOsuEd.js",revision:"43f68ff9b1b8e661cf30aee2557a66ad"},{url:"assets/index.html-ycP6Q_S4.js",revision:"201ec46583f734bc2a818d245d0bf676"},{url:"assets/photoswipe.esm-08_zHRDQ.js",revision:"481d5342d9bb799640b63b15b698dcd4"},{url:"assets/plugin-vue_export-helper-x3n3nnut.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/SearchResult-IrHbo5NQ.js",revision:"bfbcac1dbdf5842791a94eef6e0e839d"},{url:"assets/style-z7FTgdbb.css",revision:"dcd559dacfe1722dff509b3a9a2f4542"},{url:"assets/从零开始-2d.html-3hDjy0sm.js",revision:"d6e9ed83bdbff0d47fd84fbf86230aee"},{url:"assets/从零开始-2d.html-xk1YFfed.js",revision:"73f56f1b84ca0c845de27b17506fe217"},{url:"assets/分帧加载.html-sy6MEdv2.js",revision:"c1673f85cf4714f4050ebea0b3817a63"},{url:"assets/分帧加载.html-z7wuZURE.js",revision:"bebbe45865030779ea96fdf3cc79d4bb"},{url:"assets/加载pkm.html-DFcxKgI5.js",revision:"d3a13235836182adf259a8f992abd409"},{url:"assets/加载pkm.html-eD3UxeHp.js",revision:"d09abf5e1e19c3a54f4fc056b4213715"},{url:"assets/加载pkm.html-EO2iV0e1.js",revision:"a8cadef31d8a0ae896be3aee5320c888"},{url:"assets/加载pkm.html-eRMbC5X-.js",revision:"047726130b3a9c701ecee23261a29b42"},{url:"assets/对effect代码的详细解释和精简-3d.html-sUepswA_.js",revision:"fa5ddb052d327c977b3a01996b86283e"},{url:"assets/对effect代码的详细解释和精简-3d.html-WHs8E57S.js",revision:"b8eca4fdf21685112a1ceaf5b8edc92e"},{url:"assets/扫光效果-2d.html-g9HCfimf.js",revision:"328bf37deffd19f4902790914f1e5c55"},{url:"assets/扫光效果-2d.html-WPA0tNS1.js",revision:"0be34805d1a90e08171ae149f3007f66"},{url:"assets/放大镜效果-2d.html-1NeiZEUn.js",revision:"8b495a45a31e57443442c1c34ee3663b"},{url:"assets/放大镜效果-2d.html-C7WuHFIB.js",revision:"2313cbea68bcee033ac8f270e1ce3d12"},{url:"assets/正反贴图不同的shader-3d.html-1cyDHuTI.js",revision:"4354e0a76066a89bacf5218eca179502"},{url:"assets/正反贴图不同的shader-3d.html-rNohD2u4.js",revision:"c4616609de18d61b5da617c58440d06a"},{url:"assets/资料汇总.html-AEGVl-62.js",revision:"be1a78ba400979319ea12384e5ab1719"},{url:"assets/资料汇总.html-UBvh8sHo.js",revision:"c26cede1bad4f3272faa7f172f5c8244"},{url:"logo.svg",revision:"be0017218fa2ecf1f9bd1cffdd852352"},{url:"index.html",revision:"f82a3d5320fe3f9453e76ca6c10ed7a9"},{url:"404.html",revision:"1513b1c798aa4f75d8b60301ed08c04a"}],{}),e.cleanupOutdatedCaches()}));
//# sourceMappingURL=service-worker.js.map
