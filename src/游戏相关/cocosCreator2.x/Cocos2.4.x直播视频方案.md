---
title: CocosCreator 2.4.X直播视频方案
# icon: gears
order: 4
category:
  - cocosCreator2.x
---
<!-- more -->
# CocosCreator 2.4.X直播视频方案
### 1.原生做视频层，cocos做游戏层或礼物层（安卓修改）
通过CocosCreator打包后，我们找到Appactivity.java ，修改onCreateView的方法
**把`glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);`
修改为`glSurfaceView.setEGLConfigChooser(8, 8, 8, 8, 16, 8);`
添加代码`glSurfaceView.setZOrderMediaOverlay(true)`
添加代码`glSurfaceView.getHolder().setFormat(PixelFormat.TRANSLUCENT);`**

**优点：视频层完全可以使用原生的方式实现，生命周期可以原生自己控制，当切换后台时，视频层也可以调用原生的悬浮窗继续收看直播，不会受cocos的生命周期影响而停止播放
缺点：视频层不能收到点击事件，所以需要cocos层重新写一套视频交互组件，比如进度条，静音暂停播放等。同时，由于cocos的页面设置成了透明，所以部分cocosUI可能会受到影响。**
 ####以下内容，仅用于测试原生层和cocos层同时存在的效果
至此，我们完成了将cocos层级设置成透明并放在顶层。接下来，我们尝试导入原生层在cocos的下层展示
首先我们在AppActivity的继承中实现surfaceHolder的callBack
将`public class AppActivity extends Cocos2dxActivity`修改成`public class AppActivity extends Cocos2dxActivity implements SurfaceHolder.Callback`
添加 两个自定义变量
```
private SurfaceView mSurfaceView;
private SurfaceHolder mSurfaceHolder;
```
在onCreate方法最后中添加
````
mSurfaceView = new SurfaceView(this);
        mSurfaceHolder = mSurfaceView.getHolder();
        mSurfaceView.setZOrderOnTop(false);
        mSurfaceHolder.addCallback(this);
        ViewGroup.MarginLayoutParams layoutParams =new  ViewGroup.MarginLayoutParams(ViewGroup.MarginLayoutParams.MATCH_PARENT,ViewGroup.MarginLayoutParams.MATCH_PARENT);
        mSurfaceView.setLayoutParams(layoutParams);
        FrameLayout frameLayout =  new FrameLayout(this);
        frameLayout.addView(mSurfaceView);
        FrameLayout.LayoutParams layoutParams2 =new FrameLayout.LayoutParams( FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT);
        frameLayout.setLayoutParams(layoutParams2);
        mFrameLayout.addView(frameLayout);
````
然后添加三个方法如下
```
    @Override
    public void surfaceCreated(SurfaceHolder holder) {
       Canvas canvas = mSurfaceHolder.lockCanvas(null);
       Bitmap image = BitmapFactory.decodeResource(getResources(), R.drawable.bg3);
       canvas.drawBitmap(image, 0, 0, null);
       mSurfaceHolder.unlockCanvasAndPost(canvas);
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {

    }
```
