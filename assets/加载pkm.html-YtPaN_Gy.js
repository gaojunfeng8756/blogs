import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as t,b as n,a as i}from"./app-06SqjBkx.js";const r={},a=i(`<p>cocos creator 2.x 加载pkm</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let url2 = ‘C:/Users/xxx.pkm’
cc.assetManager.loadAny({ url: url2 }, function (err, assests) {
if (err)
console.log(err)
let texture = new cc.RenderTexture();
let dataView = assests._data;
texture.initWithData(dataView, cc.Texture2D.PixelFormat.RGBA_ETC2, assests.width, assests.height);
let spriteFrame = new cc.SpriteFrame(texture);
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function l(c,d){return s(),t("div",null,[n(" more "),a])}const u=e(r,[["render",l],["__file","加载pkm.html.vue"]]);export{u as default};
