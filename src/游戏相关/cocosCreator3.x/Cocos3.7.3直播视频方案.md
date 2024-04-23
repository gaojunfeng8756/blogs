---
title: Cocos3.7.3直播视频方案
# icon: gears
order: 4
category:
  - cocosCreator3.x
---
<!-- more -->
# Cocos3.7.3直播视频方案
官方在3.7.3的引擎版本里给出了videoTexture的解决方案，具体代码可见[cocosCreator相关Demo](https://github.com/cocos/cocos-awesome-tech-solutions/tree/3.7.x-release/demo/Creator3.7.3_VideoTexture)
这个demo，在原生端，是使用ffmpeg，对cocosCreator里的sprite进行不断的绘制，其中原生平台，我们需要监听这些通知来对视频流进行处理
 ```
 		this._video.addEventListener('loaded', () => this._onMetaLoaded());
        this._video.addEventListener('ready', () => this._onReadyToPlay());
        this._video.addEventListener('completed', () => this._onCompleted());
        this._video.addEventListener('error', () => this._onError());
        this._video.addEventListener('buffer_start', () => this._onBufferStart());
        this._video.addEventListener('buffer_update', () => this._onBufferUpdate());
        this._video.addEventListener('buffer_end', () => this._onBufferEnd());
        this._video.addEventListener('frame_update', () => this._onFrameUpdate());
```

但是在WEB端，虽然也是通过对Sprite进行绘制，但是，这里其实是在屏幕外创建了一个cocosCreator的videoPlayer，然后在update函数里，通过获取videoPlayer里texture，将其绘制在Sprite上