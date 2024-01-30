import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as e,a as l}from"./app-zOn3ROHE.js";const s={},v=l(`<p>官方提供的头像框遮罩shader，适合宽高比不同的图片</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CCEffect %{
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
        # 自定义参数
        wh_ratio: {
          value: 1, editor: { tooltip: &quot;宽高比&quot; }
        }
        blur: {
          value: 0.01, editor: { tooltip: &quot;光圈模糊程度&quot; }
        }
        radius: {
          value: 0.5, editor: { tooltip: &quot;光圈半径&quot; }
        }
        center: {
          value: [0.5, 0.5], editor: { tooltip: &quot;光圈起点&quot; }
        }
}%


CCProgram sprite-vs %{
  precision highp float;
  #include &lt;cc-global&gt;
  #if USE_LOCAL
    #include &lt;cc-local&gt;
  #endif

  in vec3 a_position;
  in vec2 a_texCoord;
  in vec4 a_color;

  out vec4 v_color;
  out vec2 v_uv0;

  #if USE_TEXTURE
    in vec2 a_uv0;
  #endif

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

    #if USE_TEXTURE
      v_uv0 = a_uv0;
    #endif

    v_color = a_color;
    v_uv0 = a_texCoord;

    return pos;
  }
}%

CCProgram sprite-fs %{
  precision highp float;
  #include &lt;embedded-alpha&gt;
  #include &lt;alpha-test&gt;

  in vec4 v_color;
  in vec2 v_uv0;

  #if USE_TEXTURE
    #pragma builtin(local)
    layout(set = 2, binding = 11) uniform sampler2D cc_spriteTexture;
  #endif

  uniform ARGS{
    float radius;
    float blur;
    vec2 center;
    float wh_ratio;
  };

  vec4 frag () {
    vec4 o = vec4(1, 1, 1, 1);
    o *= CCSampleWithAlphaSeparated(cc_spriteTexture, v_uv0);
    o *= v_color;

    ALPHA_TEST(o);

    // 圆心在纹理中心 vec2(0.5, 0.5), 让让圆心距离超过半径的像素丢弃或者透明度设置为0
    float circle = radius * radius;
    float rx = center.x * wh_ratio;
    float ry = center.y;
    float uv_x = v_uv0.x * wh_ratio;
    float uv_y = v_uv0.y;
    // 使用勾股定理计算圆外的像素
    float a2 = (uv_x - rx) * (uv_x - rx);
    float b2 = (uv_y - ry) * (uv_y - ry);
    float dis = a2 + b2;
    // 使用内部插值函数 smoothstep(min, max, x) 优化边缘锯齿，达到边缘羽化效果
    o.a = smoothstep(circle, circle - blur, dis) * o.a;
    return o;
  }
}%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),d=[v];function a(r,c){return n(),e("div",null,d)}const b=i(s,[["render",a],["__file","头像遮罩.html.vue"]]);export{b as default};
