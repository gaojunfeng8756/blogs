if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const f=e=>i(e,r),c={module:{uri:r},exports:t,require:f};s[r]=Promise.all(a.map((e=>c[e]||f(e)))).then((e=>(d(...e),t)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-7PYeHIMM.js",revision:"d5011951b970f5b1f7b25d154035d442"},{url:"assets/404.html-lrp5rgI5.js",revision:"c12f913b15474320566cc6e5159d80f0"},{url:"assets/app-iCZYK4wF.js",revision:"958e9b19d0bc3c4463e8a484dc065623"},{url:"assets/bg/js/login.js",revision:"8bfaa5b70b37b7abcf090f506d0497f1"},{url:"assets/bg/js/login2.js",revision:"f5fea95d75e95f5d7882be07e7912d83"},{url:"assets/index-7SG8bi1h.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-_1O9w09w.js",revision:"1ad7e2662484538f664bde3551dc553a"},{url:"assets/index.html-_RpKoXoI.js",revision:"7a8ac6b7f7e90c329ea4ed8702f33516"},{url:"assets/index.html-5hQtIB2W.js",revision:"7a8ac6b7f7e90c329ea4ed8702f33516"},{url:"assets/index.html-APfRPeCh.js",revision:"7a8ac6b7f7e90c329ea4ed8702f33516"},{url:"assets/index.html-azkm_JCy.js",revision:"7d6efd62aeb762e2f7af9c987c588c8e"},{url:"assets/index.html-Cr6N6qZm.js",revision:"210483c93dcbebc99282aa0f7fee088f"},{url:"assets/index.html-duRI1FBs.js",revision:"baf9219fe1fa4c62ad15d8addad3ad13"},{url:"assets/index.html-HcUTKjCc.js",revision:"ebaedd63aa5fef08660f037235b2674f"},{url:"assets/index.html-i-2sHXZO.js",revision:"210483c93dcbebc99282aa0f7fee088f"},{url:"assets/index.html-LS0RaZTq.js",revision:"7a8ac6b7f7e90c329ea4ed8702f33516"},{url:"assets/index.html-MAQqtS0u.js",revision:"c4ae3b5dd5f9500938b742475d586b5c"},{url:"assets/index.html-MF-VOBDq.js",revision:"c2d881d3bd57c9cd0958effd9f75b888"},{url:"assets/index.html-N2lQCXP8.js",revision:"7a8ac6b7f7e90c329ea4ed8702f33516"},{url:"assets/index.html-po9BKj_o.js",revision:"8348098c9e097ad988c4c5850569e9f7"},{url:"assets/index.html-Q8YT2Qvy.js",revision:"210483c93dcbebc99282aa0f7fee088f"},{url:"assets/index.html-QX8Gtd3m.js",revision:"425d812aa8e2270cb1e38676852c1cb6"},{url:"assets/index.html-S2e4IkQ-.js",revision:"1c61987546ec8d99c9109f0541b7af91"},{url:"assets/index.html-tygN8hxE.js",revision:"70b17267dcd792c24ca1e4e1fd1eb8b3"},{url:"assets/index.html-uLS3WEwd.js",revision:"977f9052b3e87f1ec65c0023062e87d3"},{url:"assets/index.html-uXYltCeA.js",revision:"7a8ac6b7f7e90c329ea4ed8702f33516"},{url:"assets/index.html-WjA26QMe.js",revision:"7a8ac6b7f7e90c329ea4ed8702f33516"},{url:"assets/index.html-yPrdUzvw.js",revision:"7a8ac6b7f7e90c329ea4ed8702f33516"},{url:"assets/photoswipe.esm-08_zHRDQ.js",revision:"481d5342d9bb799640b63b15b698dcd4"},{url:"assets/plugin-vue_export-helper-x3n3nnut.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/SearchResult-wqFAS4zV.js",revision:"1f5da43dce74466a8fa7d2e5e8300e5f"},{url:"assets/style-z7FTgdbb.css",revision:"dcd559dacfe1722dff509b3a9a2f4542"},{url:"assets/分帧加载.html-MHMMZHkA.js",revision:"b26e7fbc101f20b94b4b2fdf38e0284c"},{url:"assets/分帧加载.html-z7wuZURE.js",revision:"bebbe45865030779ea96fdf3cc79d4bb"},{url:"assets/加载pkm.html-EO2iV0e1.js",revision:"a8cadef31d8a0ae896be3aee5320c888"},{url:"assets/加载pkm.html-eRMbC5X-.js",revision:"047726130b3a9c701ecee23261a29b42"},{url:"assets/加载pkm.html-J8SpL5Qn.js",revision:"ae2dea19109ea13566227aec91e68da7"},{url:"assets/加载pkm.html-zp7d9Ee3.js",revision:"1c002f2f4103229aa43744bc55b36f72"},{url:"logo.svg",revision:"be0017218fa2ecf1f9bd1cffdd852352"},{url:"index.html",revision:"41f8593f493db6ff352fbb2d88982929"},{url:"404.html",revision:"30aac31ece80ab659724e4ea3e936f49"}],{}),e.cleanupOutdatedCaches()}));
//# sourceMappingURL=service-worker.js.map
