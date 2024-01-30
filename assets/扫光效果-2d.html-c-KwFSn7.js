import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as e,b as l,a as s}from"./app-tJmeP4ne.js";const d={},v=s(`<p>2d 扫光效果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
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
        addColor: { value: [1,1,1,1 ] , editor: {type: color } }
        anchorPoint: { value : [ .5,.5]}
        rotation: {  
          value: 45.0,
          editor: {
            tooltip: &quot;光束倾斜角度&quot;,
            range: [0.0, 360.0],
            } 
          }
        lightWidth : { value : .5}
       
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

  uniform Constant {
    vec4 addColor;
    vec2 anchorPoint;
     float rotation;
    float lightWidth;
    // float enableFog;
    // float cropAlpha;
    // float enableGradient;
  };
  #if USE_TEXTURE
    in vec2 uv0;
    #pragma builtin(local)
    layout(set = 2, binding = 11) uniform sampler2D cc_spriteTexture;
  #endif


 vec4 addLightColor(vec4 textureColor, vec4 lightColor, vec2 lightCenterPoint, float lightAngle, float lightWidth) {
    // 边界值处理，没有宽度就返回原始颜色
    #if USE_TEXTURE
    if (lightWidth &lt;= 0.0) {
      return textureColor;
    }

    // 计算当前 uv 到 光束 的距离
    float angleInRadians = radians(lightAngle);

    // 角度0与非0不同处理
    float dis = 0.0;
    if (mod(lightAngle, 180.0) != 0.0) {
      // 计算光束中心线下方与X轴交点的X坐标
      // 1.0 - lightCenterPoint.y 是将转换为OpenGL坐标系，下文的 1.0 - y 类似
      float lightOffsetX = lightCenterPoint.x - ((1.0 - lightCenterPoint.y) / tan(angleInRadians));

      // 以当前点画一条平行于X轴的线，假设此线和光束中心线相交的点为D点
      // 那么
      // D.y = uv0.y
      // D.x = lightOffsetX + D.y / tan(angle)
      float dx = lightOffsetX + (1.0 - uv0.y) / tan(angleInRadians);

      // D 到当前 uv0 的距离就是
      // dis = |uv0.x - D.x|
      float offsetDis = abs(uv0.x - dx);

      // 当前点到光束中心线的的垂直距离就好算了
      dis = sin(angleInRadians) * offsetDis;
    } else {
      dis = abs(uv0.y - lightCenterPoint.y);
    }
    
    float a = 1.0 ;
    // 裁剪掉透明区域上的点光
    #if cropAlpha
      a *= step(0.01, textureColor.a);
    #endif
    // 裁剪掉光束范围外的uv（迷雾效果）
    #if enableFog
      a *= step(dis, lightWidth * 0.5);
    #endif
    // 加入从中心往外渐变的效果
     #if enableGradient
      a *= 1.0 - dis / (lightWidth * 0.5);
    #endif
    // 计算出扩散范围内，不同 uv 对应的实际扩散颜色值
    vec4 finalLightColor = lightColor * a;
    // 混合颜色：在原始图像颜色上叠加扩散颜色
    return textureColor * textureColor.a + finalLightColor;
    #endif
  }

  vec4 frag () {
    vec4 o = vec4(1, 1, 1, 1);

    #if USE_TEXTURE
      o *= CCSampleWithAlphaSeparated(cc_spriteTexture, uv0);
      o=addLightColor(o,addColor,anchorPoint,rotation,lightWidth);
    #endif
    o *= color;
  
    ALPHA_TEST(o);
    return o;
  }
}%

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function a(r,c){return n(),e("div",null,[l(" more "),v])}const t=i(d,[["render",a],["__file","扫光效果-2d.html.vue"]]);export{t as default};
