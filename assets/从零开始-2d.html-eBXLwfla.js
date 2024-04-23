import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as n,b as s,a as l}from"./app-IllzmeZ8.js";const d={},v=l(`<p>编写第一个shader文件<br> 首先在编辑器下创建一个简单的着色器和材质，因为3.0中大部分的着色器是3D的，我们先从2d开始，所以我们可以把着色器代码先修改成cocos默认的sprite着色器代码,然后赋值给材质并把材质赋给一个2dSprite，着色器代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
CCEffect %{
  techniques:
  - passes:
    - vert: sprite-vs:vert
      frag: sprite-fs:frag
      depthStencilState:
        depthTest: false
        depthWrite: false
      blendState:
        targets:
        - blend: true
          blendSrc: src_alpha
          blendDst: one_minus_src_alpha
          blendDstAlpha: one_minus_src_alpha
      rasterizerState:
        cullMode: none
      properties:
        alphaThreshold: { value: 0.5 }
}%

CCProgram sprite-vs %{
  precision highp float;
  #include &lt;cc-global&gt;
  #if USE_LOCAL
    #include &lt;cc-local&gt;
  #endif
  #if SAMPLE_FROM_RT
    #include &lt;common&gt;
  #endif
  in vec3 a_position;
  in vec2 a_texCoord;
  in vec4 a_color;

  out vec4 color;
  out vec2 uv0;

  vec4 vert () {
    vec4 pos = vec4(a_position, 1);

    #if USE_LOCAL
      pos = cc_matWorld * pos;
    #endif

    #if USE_PIXEL_ALIGNMENT
      pos = cc_matView * pos;
      pos.xyz = floor(pos.xyz);
      pos = cc_matProj * pos;
    #else
      pos = cc_matViewProj * pos;
    #endif

    uv0 = a_texCoord;
    #if SAMPLE_FROM_RT
      CC_HANDLE_RT_SAMPLE_FLIP(uv0);
    #endif
    color = a_color;

    return pos;
  }
}%

CCProgram sprite-fs %{
  precision highp float;
  #include &lt;embedded-alpha&gt;
  #include &lt;alpha-test&gt;

  in vec4 color;

  #if USE_TEXTURE
    in vec2 uv0;
    #pragma builtin(local)
    layout(set = 2, binding = 11) uniform sampler2D cc_spriteTexture;
  #endif

  vec4 frag () {
    vec4 o = vec4(1, 1, 1, 1);

    #if USE_TEXTURE
      o *= CCSampleWithAlphaSeparated(cc_spriteTexture, uv0);
      #if IS_GRAY
        float gray  = 0.2126 * o.r + 0.7152 * o.g + 0.0722 * o.b;
        o.r = o.g = o.b = gray;
      #endif
    #endif

    o *= color;
    ALPHA_TEST(o);
    return o;
  }
}%


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上内容是内置sprite的effect代码，语法和结构可先阅读以下4条文档</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.yaml语法
https://docs.cocos.com/creator/manual/zh/material-system/yaml-101.html

2.effect结构
https://docs.cocos.com/creator/manual/zh/material-system/effect-syntax.html

3.Pass 可选配置参数
https://docs.cocos.com/creator/manual/zh/material-system/pass-parameter-list.html

4.常用 shader 内置 Uniform
https://docs.cocos.com/creator/manual/zh/material-system/builtin-shader-uniforms.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一段代码中，通过学习，我们知道可以去修改sprite-fs里的frag来实现一些效果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> vec4 frag () {
    vec4 o = vec4(1, 1, 1, 1);

    #if USE_TEXTURE
      o *= CCSampleWithAlphaSeparated(cc_spriteTexture, uv0);
      #if IS_GRAY
        float gray  = 0.2126 * o.r + 0.7152 * o.g + 0.0722 * o.b;
        o.r = o.g = o.b = gray;
      #endif
    #endif

    o *= color;
    ALPHA_TEST(o);
    return o;
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一段里，我们发现他主要用到了一个CCSampleWithAlphaSeparated和ALPHA_TEST的方法，这两个方法，我们可以看到是导入的内置的着色器片段的方法（ embedded-alpha和 alpha-test），这里我们不过多深究，我们先尝试将frag函数进行一个简单的修改并用于我们测试的图片上，这里需要注意的是，使用自定义shader的图片，<mark>不要勾选自动合图</mark>，否则打包后可能没有对应的shader效果。</p><p>首先我们将frag函数进行一个简单的修改，让原本的图片不显示纹理，只显示一个绿色</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vec4 frag () {
    vec4 o = vec4(0.,1 , 0., 1);
    o *= color;
    ALPHA_TEST(o);
    return o;
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们知道，其实我们最重要的有时候还是需要显示图片的纹理，这时候，我们可以将定义的o和纹理进行一个简单的融合</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> vec4 o = vec4(0,1,0,1);
    #if USE_TEXTURE
     o *= CCSampleWithAlphaSeparated(cc_spriteTexture, uv0);
    #endif
    o *= color;
    ALPHA_TEST(o);
    return o;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个操作很简单，我们只是将初始的绿色在有纹理的时候和纹理进行了一个融合，并且最后融入sprite组件自带的color颜色，这样我们便得到了变成绿色的纹理图片。但其实，只是改变图片融合的颜色，其实最后o*=color，cocos就给我们预留了颜色处理的逻辑，所以我们可以考虑，是不是可以干一点别的事情，还是修改o然后和纹理进行一个融合。</p><p>接下来，我们会用到openGL函数clamp，这个函数是区间限定函数<br> 简单介绍一下<br><mark>clamp(x,low,high )若X在[low,high]范围内，则等于X；如果X小于low，则返回low；如果X大于high，则返回high</mark></p><p>我们先写一个函数，主要是通过传入的uv来进行一个区间限定最后返回一个num，然乎我们把这个num定为o的透明度，看看图片有什么变化：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> float getNum(vec2 uv){
      return clamp(uv0.x,0.0,1.0);
  }
  vec4 frag () {
    vec4 o = vec4(1,1,1,1);

    #if USE_TEXTURE
      float num=getNum(uv0);
      o = vec4(1,1, 1, num);
      o *= CCSampleWithAlphaSeparated(cc_spriteTexture, uv0);
    #endif
    o *= color;
    ALPHA_TEST(o);
    return o;
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候我们发现我们测试的图片从左往右透明度逐渐发生了变化。<br> 既然可以修改透明度，那么我们接下来尝试做一个圆形头像的遮罩。<br> 首先，我们必须要让距离中心点为一半的都是可见的，于是我们大致可以先写出一个函数，这里引用了另一个函数distance，计算两点之间的距离<br> 那么我们可以把getNum函数改成如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>float getNum(vec2 uv){
      return clamp((.5-distance(uv,vec2(.5))),0.0,1.0);
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>计算uv到中心点的距离，当距离大于.5的时候，此时相减为负数，取最小值则是0，那么这一圈是不可见的，但是这样减出来，数值在0-1之间的，会导致透明度保持原数值，会比较低，这样，我们必须要让正值都大于1才能取到1，所以，我们修改一下，让(.5-distance(uv,vec2(.5)))的值再大一点，尽可能不在0-1之间，<br> 我们把(.5-distance(uv,vec2(.5)))/0.01,发现效果还可以，这样，一个圆形头像遮罩就完成了。<br> 代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
CCEffect %{
  techniques:
  - passes:
    - vert: sprite-vs:vert
      frag: sprite-fs:frag
      depthStencilState:
        depthTest: false
        depthWrite: false
      blendState:
        targets:
        - blend: true
          blendSrc: src_alpha
          blendDst: one_minus_src_alpha
          blendDstAlpha: one_minus_src_alpha
      rasterizerState:
        cullMode: none
      properties:
        alphaThreshold: { value: 0.5 }
}%

CCProgram sprite-vs %{
  precision highp float;
  #include &lt;cc-global&gt;
  #if USE_LOCAL
    #include &lt;cc-local&gt;
  #endif
  #if SAMPLE_FROM_RT
    #include &lt;common&gt;
  #endif
  in vec3 a_position;
  in vec2 a_texCoord;
  in vec4 a_color;

  out vec4 color;
  out vec2 uv0;

  vec4 vert () {
    vec4 pos = vec4(a_position, 1);

    #if USE_LOCAL
      pos = cc_matWorld * pos;
    #endif

    #if USE_PIXEL_ALIGNMENT
      pos = cc_matView * pos;
      pos.xyz = floor(pos.xyz);
      pos = cc_matProj * pos;
    #else
      pos = cc_matViewProj * pos;
    #endif

    uv0 = a_texCoord;
    #if SAMPLE_FROM_RT
      CC_HANDLE_RT_SAMPLE_FLIP(uv0);
    #endif
    color = a_color;

    return pos;
  }
}%
CCProgram sprite-fs %{
  precision highp float;
  #include &lt;embedded-alpha&gt;
  #include &lt;alpha-test&gt;

  in vec4 color;

  #if USE_TEXTURE
    in vec2 uv0;
    #pragma builtin(local)
    layout(set = 2, binding = 11) uniform sampler2D cc_spriteTexture;
  #endif

  float getNum(vec2 uv){
      return clamp((.5-distance(uv,vec2(.5)))/0.01,0.0,1.0);
  }
  vec4 frag () {
    vec4 o = vec4(1,1,1,1);
    #if USE_TEXTURE
      float num=getNum(uv0);
      o = vec4(1,1, 1, num);
      o *= CCSampleWithAlphaSeparated(cc_spriteTexture, uv0);
    #endif
    o *= color;
    ALPHA_TEST(o);
    return o;
  }
}%

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们尝试更改一下ditance里的距离点的位置，探索一下好玩的东西，那么我们定义一个变量来让这个点可以被修改把<br> 我们在 properties里添加两个属性</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  valueX: { value: 0.5 }
  valueY: { value: 0.5 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>并在sprite-fs 接收这两个值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    uniform Constant{
      float valueX;
      float valueY;
    };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候我们就可以在编辑器看到材质里，有这两个参数，并且可以被修改<br> 那么我们就写个脚本来修改这两个值，尝试用代码控制shader<br> 这里，我们需要把精灵的锚点改到左下角，方便计算触摸点在图片上的比例，然后我们编写一个touchMove函数并把脚本绑定在节点下<br> 脚本代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> touchMove(target: EventTouch) {
        let points = v3(target.getUILocation().x, target.getUILocation().y, 0);
        let width = this.node.getComponent(UITransform).width;
        let height = this.node.getComponent(UITransform).height;
        let point = this.node.getComponent(UITransform).convertToNodeSpaceAR(points);
        point.x = point.x &lt; 0 ? 0 : point.x;
        point.y = point.y &lt; 0 ? 0 : point.y;
        point.x = point.x &gt; width ? width : point.x;
        point.y = point.y &gt; height ? height : point.y;
  this.node.getComponent(Sprite).customMaterial.setProperty(&quot;valueX&quot;, point.x / width);
        this.node.getComponent(Sprite).customMaterial.setProperty(&quot;valueY&quot;, 1 - point.y / height);
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25);function a(r,c){return e(),n("div",null,[s(" more "),v])}const m=i(d,[["render",a],["__file","从零开始-2d.html.vue"]]);export{m as default};
