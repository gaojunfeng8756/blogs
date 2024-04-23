import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as r,b as i,a as s}from"./app-IllzmeZ8.js";const n={},d=s(`<h1 id="cocoscreator-2-4-x直播视频方案" tabindex="-1"><a class="header-anchor" href="#cocoscreator-2-4-x直播视频方案" aria-hidden="true">#</a> CocosCreator 2.4.X直播视频方案</h1><h3 id="_1-原生做视频层-cocos做游戏层或礼物层-安卓修改" tabindex="-1"><a class="header-anchor" href="#_1-原生做视频层-cocos做游戏层或礼物层-安卓修改" aria-hidden="true">#</a> 1.原生做视频层，cocos做游戏层或礼物层（安卓修改）</h3><p>通过CocosCreator打包后，我们找到Appactivity.java ，修改onCreateView的方法<br><strong>把<code>glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);</code><br> 修改为<code>glSurfaceView.setEGLConfigChooser(8, 8, 8, 8, 16, 8);</code><br> 添加代码<code>glSurfaceView.setZOrderMediaOverlay(true)</code><br> 添加代码<code>glSurfaceView.getHolder().setFormat(PixelFormat.TRANSLUCENT);</code></strong></p><p><strong>优点：视频层完全可以使用原生的方式实现，生命周期可以原生自己控制，当切换后台时，视频层也可以调用原生的悬浮窗继续收看直播，不会受cocos的生命周期影响而停止播放<br> 缺点：视频层不能收到点击事件，所以需要cocos层重新写一套视频交互组件，比如进度条，静音暂停播放等。同时，由于cocos的页面设置成了透明，所以部分cocosUI可能会受到影响。</strong><br> ####以下内容，仅用于测试原生层和cocos层同时存在的效果<br> 至此，我们完成了将cocos层级设置成透明并放在顶层。接下来，我们尝试导入原生层在cocos的下层展示<br> 首先我们在AppActivity的继承中实现surfaceHolder的callBack<br> 将<code>public class AppActivity extends Cocos2dxActivity</code>修改成<code>public class AppActivity extends Cocos2dxActivity implements SurfaceHolder.Callback</code><br> 添加 两个自定义变量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private SurfaceView mSurfaceView;
private SurfaceHolder mSurfaceHolder;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在onCreate方法最后中添加</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mSurfaceView = new SurfaceView(this);
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后添加三个方法如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @Override
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function c(o,l){return a(),r("div",null,[i(" more "),d])}const m=e(n,[["render",c],["__file","Cocos2.4.x直播视频方案.html.vue"]]);export{m as default};
