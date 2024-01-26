import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as i,a as n,b as t}from"./app-WTQb0IYm.js";const r={},a=t(`<p>cocos creator 2.x 加载pkm</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  let self = this;
    assetManager.loadRes( &quot;test/round_cocos_frame69c&amp;48/round_cocos_frame69c_1&quot;,SpriteFrame,function (err, assests) {
      if (err){
        console.log(err)
      }
      assests._nativeAsset.format = 77;
      let imgAsset = new ImageAsset(assests._nativeAsset)
      let texture = new Texture2D();
      texture.image = imgAsset;
      let spriteFrame = new SpriteFrame();
      spriteFrame.packable = false
      spriteFrame.texture = texture;
      self.testNode.spriteFrame = spriteFrame;
    })
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function l(d,c){return s(),i("div",null,[n(" more "),a])}const v=e(r,[["render",l],["__file","加载pkm.html.vue"]]);export{v as default};
