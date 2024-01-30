import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as n,b as s,a as l}from"./app-xbmAELm3.js";const v={},r=l(`<p>今天研究一个卡片效果，让一个物体正反有两种不同的贴图</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
CCEffect %{
  techniques:
  - name: opaque
    passes:
    - vert: general-vs:vert #指定顶点着色器
      frag: unlit-fs:frag #指定像素着色器
      properties: &amp;props
         mainTexture: { value : white }
         otherTexture: { value : white }
         skyCube : { value: white }
      migrations: &amp;migrations
        properties:
}%

CCProgram unlit-fs %{
  //定义默认精度
  precision highp float;
  #include &lt;output&gt;
  in vec2 v_uv;
  in vec3 v_position;
  in vec3 v_normal;
  uniform sampler2D mainTexture;
  uniform sampler2D otherTexture;
  uniform samplerCube skyCube;
  vec4 frag () {
    //声明一个颜色
    vec4 color =vec4(1,1,1,1);
    vec3 viewDir=normalize(cc_cameraPos.xyz-v_position);
    bool isBack=dot(v_normal,viewDir)&lt;=0.0;
    if(isBack){
    	//判断是反面，则贴图的X轴反向一下
        color*=texture(otherTexture,vec2((1.-v_uv.x),v_uv.y));
    }else{
      color*=texture(mainTexture,v_uv);
    }
    //输出颜色
    return CCFragOutput(color);
  }
}%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function d(a,c){return i(),n("div",null,[s(" more "),r])}const t=e(v,[["render",d],["__file","正反贴图不同的shader-3d.html.vue"]]);export{t as default};
