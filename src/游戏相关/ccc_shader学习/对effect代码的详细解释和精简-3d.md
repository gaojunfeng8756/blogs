---
title: 对effect代码的详细解释和精简-3d
# icon: gears
order: 4
category:
  - ccc_shader学习
---
<!-- more -->


简单总结一些shader内容
我们以3.4.1为例子，我们新建了一个3d的effect来看下3d相关的shader
```
CCEffect %{
  techniques:
  - name: opaque
    passes:
    - vert: general-vs:vert # builtin header
      frag: unlit-fs:frag
      properties: &props
        mainTexture:    { value: white }
        mainColor:      { value: [1, 1, 1, 1], editor: { type: color } }
  - name: transparent
    passes:
    - vert: general-vs:vert # builtin header
      frag: unlit-fs:frag
      blendState:
        targets:
        - blend: true
          blendSrc: src_alpha
          blendDst: one_minus_src_alpha
          blendSrcAlpha: src_alpha
          blendDstAlpha: one_minus_src_alpha
      properties: *props
}%

CCProgram unlit-fs %{
  precision highp float;
  #include <output>
  #include <cc-fog-fs>

  in vec2 v_uv;
  in vec3 v_position;

  uniform sampler2D mainTexture;

  uniform Constant {
    vec4 mainColor;
  };

  vec4 frag () {
    vec4 col = mainColor * texture(mainTexture, v_uv);
    CC_APPLY_FOG(col, v_position);
    return CCFragOutput(col);
  }
}%

```

我们尝试编写把他修改成最简单的一个shader文件，作为
==编写模板==
```

CCEffect %{
  techniques:
  - name: opaque
    passes:
    - vert: unlit-vs:vert #指定顶点着色器
      frag: unlit-fs:frag #指定像素着色器
      properties: &props
      migrations: &migrations
        properties:
}%

CCProgram unlit-vs %{
  //定义默认精度
  precision highp float;
  #include <input>
  #include <cc-global>
  #include <cc-local-batch>
  vec4 vert(){
    //获取顶点位置位置信息，本地坐标系
    vec4 position;
    CCVertInput(position);
    //获取世界矩阵
    mat4 matWorld;
    CCGetWorldMatrix(matWorld);

    //cc_matProj 投影矩阵
    //cc_matView 摄像机矩阵
    //matWorld 世界矩阵
    /**
    根据矩阵变换规则，顶点需要经过如下变换
    本地空间 -> 世界空间 -> 摄像机空间 -> 投影
    下面的代码是左乘，原因在于position为行向量，且矩阵为行矩阵

    注：
    虽然在openGL或者webGL中默认是列向量和列矩阵
    但是由于显卡一个寄存器是4分量，刚好可以存储一个行向量
    所以向量和矩阵在显卡里面是按行向量存储的，D3D采用行矩阵和行向量就是迎合显卡特性
    */
    //输出位置
    return cc_matProj*(cc_matView*matWorld)*position;
  }
}%

CCProgram unlit-fs %{
  //定义默认精度
  precision highp float;
  #include <output>
  vec4 frag () {
    //声明一个颜色
    vec4 col =vec4(1,0,1,1);    
    //输出颜色
    return CCFragOutput(col);
  }
}%

```


我们从模板出发往回推，发现顶点着色器cocos已经帮我们写好一个比较详细的了，这里我们可以把代码再次精简，用cocos自带的顶点着色器片段（一般来说顶点着色器修改小）
修改后的代码
```

CCEffect %{
  techniques:
  - name: opaque
    passes:
    - vert: general-vs:vert #指定顶点着色器
      frag: unlit-fs:frag #指定像素着色器
      properties: &props
      migrations: &migrations
        properties:
}%



CCProgram unlit-fs %{
  //定义默认精度
  precision highp float;
  #include <output>

  in vec2 v_uv;
  uniform sampler2D mainTexture;
  vec4 frag () {
    //声明一个颜色
    vec4 col =vec4(1,1,1,1);
    //输出颜色
    return CCFragOutput(col);
  }
}%

```

这里我们也贴一下==内置的顶点着色器代码片段==，方便后续查询
同时他暴露的参数后续在像素着色器里也是可以使用的

```
precision highp float;
#include <input-standard>
#include <cc-global>
#include <cc-local-batch>
#include <input-standard>
#include <cc-fog-vs>
#include <cc-shadow-map-vs>

in vec4 a_color;
#if HAS_SECOND_UV
 in vec2 a_texCoord1;
#endif

out vec3 v_position;
out vec3 v_normal;
out vec3 v_tangent;
out vec3 v_bitangent;
out vec2 v_uv;
out vec2 v_uv1;
out vec4 v_color;

vec4 vert () {
 StandardVertInput In;
 CCVertInput(In);

 mat4 matWorld, matWorldIT;
 CCGetWorldMatrixFull(matWorld, matWorldIT);

 vec4 pos = matWorld * In.position;

 v_position = pos.xyz;
 v_normal = normalize((matWorldIT * vec4(In.normal, 0.0)).xyz);
 v_tangent = normalize((matWorld * vec4(In.tangent.xyz, 0.0)).xyz);
 v_bitangent = cross(v_normal, v_tangent) * In.tangent.w; // note the cross order

 v_uv = a_texCoord;
 #if HAS_SECOND_UV
   v_uv1 = a_texCoord1;
 #endif
 v_color = a_color;

 CC_TRANSFER_FOG(pos);
 CC_TRANSFER_SHADOW(pos);

 return cc_matProj * (cc_matView * matWorld) * In.position;
}
```

