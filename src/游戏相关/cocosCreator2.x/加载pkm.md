---
title: 加载pkm
# icon: gears
order: 4
category:
  - cocosCreator2.x

# navbar: false
# sidebar: false

# breadcrumb: false
# pageInfo: false
# contributors: false
# editLink: false
# lastUpdated: false
# prev: false
# next: false
# comment: false
# footer: false

# backtotop: false
---
<!-- more -->
cocos creator 2.x 加载pkm
```
let url2 = ‘C:/Users/xxx.pkm’
cc.assetManager.loadAny({ url: url2 }, function (err, assests) {
if (err)
console.log(err)
let texture = new cc.RenderTexture();
let dataView = assests._data;
texture.initWithData(dataView, cc.Texture2D.PixelFormat.RGBA_ETC2, assests.width, assests.height);
let spriteFrame = new cc.SpriteFrame(texture);
})
```