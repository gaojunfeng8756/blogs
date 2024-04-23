import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as e,a as s}from"./app-IllzmeZ8.js";const l={},d=s(`<p>图片溶解</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

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
        # 自定义参数
        # 溶解比例
        fade_pct: {
          value: 1.0,
          editor: {
            tooltip: &quot;溶解比例&quot;
          }
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

  #if USE_TEXTURE
    in vec2 v_uv0;
    #pragma builtin(local)
    layout(set = 2, binding = 10) uniform sampler2D cc_spriteTexture;
  #endif

  uniform ARGS {
    float fade_pct;
  };

  vec4 frag () {
    vec4 o = vec4(1, 1, 1, 1);
    o *= CCSampleWithAlphaSeparated(cc_spriteTexture, v_uv0);

    #if USE_TEXTURE
      #if CC_USE_ALPHA_ATLAS_TEXTURE
        o.a *= CCSampleWithAlphaSeparated(cc_spriteTexture, v_uv0 + vec2(0, 0.5)).r;
        // o.a *= texture2D(texture, v_uv0 + vec2(0, 0.5)).r;
      #endif
    #endif

    // 当颜色小于溶解的程度，则直接抛弃
		if(o.b &lt; fade_pct) discard;
    if(o.b &lt; fade_pct + 0.1) {
      // 对溶解的边缘做处理，变色或者改透明度等等
			o = o * vec4(0.92, 0.8, 0.95, o.a);
		}

    return o;
  }
}%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),v=[d];function a(c,r){return n(),e("div",null,v)}const b=i(l,[["render",a],["__file","图片溶解.html.vue"]]);export{b as default};
