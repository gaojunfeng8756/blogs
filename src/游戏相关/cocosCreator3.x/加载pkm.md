---
title: 加载pkm
# icon: gears
order: 4
category:
  - cocosCreator3.x

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
cocos creator 3.x 加载pkm
```
  let self = this;
    assetManager.loadRes( "test/round_cocos_frame69c&48/round_cocos_frame69c_1",SpriteFrame,function (err, assests) {
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
```