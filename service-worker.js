if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,d)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let b={};const r=e=>i(e,c),t={module:{uri:c},exports:b,require:r};s[c]=Promise.all(a.map((e=>t[e]||r(e)))).then((e=>(d(...e),b)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-7PYeHIMM.js",revision:"d5011951b970f5b1f7b25d154035d442"},{url:"assets/404.html-jL2KZWMJ.js",revision:"c48eec2567d6d9ac65eb7615fc7d76e0"},{url:"assets/app-WTQb0IYm.js",revision:"eda4ca8fcba1e155cd0eb5087b0af8fc"},{url:"assets/bg/js/login.js",revision:"8bfaa5b70b37b7abcf090f506d0497f1"},{url:"assets/bg/js/login2.js",revision:"f5fea95d75e95f5d7882be07e7912d83"},{url:"assets/index-7SG8bi1h.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-_1O9w09w.js",revision:"1ad7e2662484538f664bde3551dc553a"},{url:"assets/index.html-8JWt4lvJ.js",revision:"73bbf609710de47e4c0014db49169129"},{url:"assets/index.html-azkm_JCy.js",revision:"7d6efd62aeb762e2f7af9c987c588c8e"},{url:"assets/index.html-CY0oZAOA.js",revision:"4a2fbbabc9819b9c6e433ace1677c851"},{url:"assets/index.html-duRI1FBs.js",revision:"baf9219fe1fa4c62ad15d8addad3ad13"},{url:"assets/index.html-E5pT2Wrg.js",revision:"4a2fbbabc9819b9c6e433ace1677c851"},{url:"assets/index.html-FVUGs31K.js",revision:"73bbf609710de47e4c0014db49169129"},{url:"assets/index.html-HcUTKjCc.js",revision:"ebaedd63aa5fef08660f037235b2674f"},{url:"assets/index.html-kgkLd9nb.js",revision:"4a2fbbabc9819b9c6e433ace1677c851"},{url:"assets/index.html-KWMzTSv3.js",revision:"73bbf609710de47e4c0014db49169129"},{url:"assets/index.html-lqnUWzf-.js",revision:"4a2fbbabc9819b9c6e433ace1677c851"},{url:"assets/index.html-MAQqtS0u.js",revision:"c4ae3b5dd5f9500938b742475d586b5c"},{url:"assets/index.html-MF-VOBDq.js",revision:"c2d881d3bd57c9cd0958effd9f75b888"},{url:"assets/index.html-N_srHgMI.js",revision:"4a2fbbabc9819b9c6e433ace1677c851"},{url:"assets/index.html-n4dn1F68.js",revision:"4a2fbbabc9819b9c6e433ace1677c851"},{url:"assets/index.html-po9BKj_o.js",revision:"8348098c9e097ad988c4c5850569e9f7"},{url:"assets/index.html-QX8Gtd3m.js",revision:"425d812aa8e2270cb1e38676852c1cb6"},{url:"assets/index.html-S2e4IkQ-.js",revision:"1c61987546ec8d99c9109f0541b7af91"},{url:"assets/index.html-tygN8hxE.js",revision:"70b17267dcd792c24ca1e4e1fd1eb8b3"},{url:"assets/index.html-uLS3WEwd.js",revision:"977f9052b3e87f1ec65c0023062e87d3"},{url:"assets/index.html-VMavTfBP.js",revision:"4a2fbbabc9819b9c6e433ace1677c851"},{url:"assets/index.html-XXiqcRHK.js",revision:"4a2fbbabc9819b9c6e433ace1677c851"},{url:"assets/photoswipe.esm-08_zHRDQ.js",revision:"481d5342d9bb799640b63b15b698dcd4"},{url:"assets/plugin-vue_export-helper-x3n3nnut.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/SearchResult-8OwyPiai.js",revision:"35fe5a3d4a856a71a92f606df7c1cb9c"},{url:"assets/style-z7FTgdbb.css",revision:"dcd559dacfe1722dff509b3a9a2f4542"},{url:"assets/分帧加载.html-v3aIekoU.js",revision:"f20919180386f54ac2431f91344133a5"},{url:"assets/分帧加载.html-z7wuZURE.js",revision:"bebbe45865030779ea96fdf3cc79d4bb"},{url:"assets/加载pkm.html-EO2iV0e1.js",revision:"a8cadef31d8a0ae896be3aee5320c888"},{url:"assets/加载pkm.html-eRMbC5X-.js",revision:"047726130b3a9c701ecee23261a29b42"},{url:"assets/加载pkm.html-pqNg5Cgk.js",revision:"df09f0fa6260a8eef272b6f0d2cbe1dd"},{url:"assets/加载pkm.html-sU2cdw2E.js",revision:"ccfab38f52058c45b46464b5932f7406"},{url:"logo.svg",revision:"be0017218fa2ecf1f9bd1cffdd852352"},{url:"index.html",revision:"e18c8b2e4696f1d6e19eb9d8b2ca92af"},{url:"404.html",revision:"317aef00ff07f864b48fadb8060dcdec"}],{}),e.cleanupOutdatedCaches()}));
//# sourceMappingURL=service-worker.js.map
