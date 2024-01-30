import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as e,b as s,a as l}from"./app-06SqjBkx.js";const d={},v=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
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
        magnifierCenterPoint: {
          value: [0.2, 0.2],
          editor: {
            tooltip: &quot;放大镜中心点坐标&quot; 
          }
        }
        magnifierRadius: {
          value: 0.5,
          editor: {
            tooltip: &quot;放大镜半径&quot; 
          }
        }
        magnifierScale: {
          value: 0.6,
          editor: {
            tooltip: &quot;放大镜倍数&quot; 
          }
        }
        nodeTextureProportion: {
          value: 0.56,
          editor: {
            tooltip: &quot;节点宽高比比例&quot; 
          }
        }
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
  #include &lt;cc-global&gt;

  in vec4 color;

  uniform Magnifier {
    // 放大镜中心点坐标
    vec2 magnifierCenterPoint;
    // 放大镜半径
    float magnifierRadius;
    // 放大镜放大倍数
    float magnifierScale;
    // 节点的宽高比
    float nodeTextureProportion;
  };

  #if USE_TEXTURE
    in vec2 uv0;
    #pragma builtin(local)
    layout(set = 2, binding = 10) uniform sampler2D cc_spriteTexture;
  #endif

 // 缩放中心点
  const vec2 centerPoint = vec2(0.5, 0.75);
  // 缩放比例
  const float scaleDegree = 0.6;
  // 展示缩放距离中心点的位置
  const float toCenterDis = 0.3;
  // 图片宽高比
  const float textureProportion = 0.56;

  // 获得应该渲染的纹理位置
  vec2 getTextPos(vec2 uv, vec2 center, float scale, float degree){
    vec2 tPos = uv;
    tPos.x = (uv.x - center.x) * (scale+degree*0.1) + center.x;
    tPos.y = (uv.y - center.y) * (scale+degree*0.1) + center.y;
    return tPos;
  }
  // 通过放大镜距离获得纹理
  vec2 getDisTextPos(vec2 uv, vec2 center, float scale, float radius){
    float dis = pow(abs(uv.x - center.x)*abs(uv.x - center.x) + (abs(uv.y - center.y)/nodeTextureProportion)*(abs(uv.y - center.y)/nodeTextureProportion),0.5);
    if(dis &lt;= radius){
      float deg = smoothstep(radius - 0.03, radius, dis);
      return getTextPos(uv, center, scale, deg);
    }
    return uv;
  }
  vec4 frag () {
    vec4 o = vec4(1, 1, 1, 1);
    //vec2 tempCenter = vec2(0.5,abs(sin(cc_time.x)));
    #if USE_TEXTURE
      vec2 uv = getDisTextPos(uv0, magnifierCenterPoint, magnifierScale, magnifierRadius); 
      o *= CCSampleWithAlphaSeparated(cc_spriteTexture, uv);
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function r(a,c){return n(),e("div",null,[s(" more "),v])}const t=i(d,[["render",r],["__file","放大镜效果-2d.html.vue"]]);export{t as default};
