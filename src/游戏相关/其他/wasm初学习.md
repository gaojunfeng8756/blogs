---
title: wasm初学习
# icon: gears
order: 4
category:
  - 其他
---

<!-- more -->

首先安装 Emscripten

```shell
git clone https://github.com/emscripten-core/emsdk.git
# 进入目录
cd emsdk
# 下载最新 SDK 工具
./emsdk install latest
# 版本设置为最新
./emsdk activate latest
# 将相关命令行工具加入到 PATH 环境变量中（临时）
source ./emsdk_env.sh
```

然后我们把下列的update_triangle.cpp文件，编译成wasm文件，这里暴露updateTriangle和updateColor两个方法给js来改点顶点和颜色

```cpp
#include <functional>

#include <SDL.h>
#include <stdio.h>

#define GL_GLEXT_PROTOTYPES 1
#include <SDL_opengles2.h>
// wasm 需要暴露方法给 js，引入这个头文件
#include <emscripten.h>

const char *vertexShaderSource =
    "attribute vec4 a_position;\n"
    "void main() {\n"
    "    gl_Position = a_position;\n"
    "}\n";

const char *fragmentShaderSource =
    "precision mediump float;\n"
    "uniform vec4 color;\n" // 添加一个 uniform 变量来接收颜色值
    "void main() {\n"
    "    gl_FragColor = color;\n" // 使用传入的颜色值
    "}\n";

GLfloat vertices[] = {0.0f, 0.5f, -0.5f, -0.5f, 0.5f, -0.5f};
GLfloat color[4] = {1.0f, 1.0f, 0.0f, 1.0f};

void render()
{
    printf("渲染三角形~~~\n");

    SDL_Window *window;
    SDL_CreateWindowAndRenderer(400, 400, 0, &window, nullptr);

    GLuint vao;
    glGenVertexArraysOES(1, &vao);
    glBindVertexArrayOES(vao);

    GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, 1, &vertexShaderSource, nullptr);
    glCompileShader(vertexShader);

    GLuint fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, 1, &fragmentShaderSource, nullptr);
    glCompileShader(fragmentShader);

    GLuint program = glCreateProgram();
    glAttachShader(program, vertexShader);
    glAttachShader(program, fragmentShader);
    glLinkProgram(program);
    glUseProgram(program);

    GLuint vbo;
    glGenBuffers(1, &vbo);
    glBindBuffer(GL_ARRAY_BUFFER, vbo);
    glBufferData(GL_ARRAY_BUFFER, 24, vertices, GL_STATIC_DRAW);

    GLint position = glGetAttribLocation(program, "a_position");
    glVertexAttribPointer(position, 2, GL_FLOAT, GL_FALSE, 0, 0);
    glEnableVertexAttribArray(position);

    GLuint colorLocation = glGetUniformLocation(program, "color");
    glUniform4fv(colorLocation, 1, color);
    glClearColor(0, 0, 1, 0);
    glClear(GL_COLOR_BUFFER_BIT);

    glDrawArrays(GL_TRIANGLES, 0, 3);

    glDeleteBuffers(1, &vbo);
}

int main()
{
    render();
}

// 定义一个 updateColor 方法给 js 用。全局会出现一个 _updateColor 方法。
// EMSCRIPTEN_KEEPALIVE 宏防止方法编译时被优化掉
extern "C" void EMSCRIPTEN_KEEPALIVE updateTriangle(float n1, float n2)
{
    printf("n1: %f, n2: %f\n", n1, n2);
    vertices[0] = n1;
    vertices[1] = n2;
    render();
}

extern "C" void EMSCRIPTEN_KEEPALIVE updateColor(float n1, float n2, float n3, float n4)
{
    color[0] = n1;
    color[1] = n2;
    color[2] = n3;
    color[3] = n4;
    render();
}

```
运行编译代码
```shell
emcc update_triangle.cpp -std=c++11 -s WASM=1 -s USE_SDL=2 -O3 -o updateTriangle.js 
```

生成了updateTriangle.js和updateTriangle.wasm两个文件后，我们写一个index.html来进行使用
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>更新三角形</title>
  </head>
  <body>
    <canvas width="400" height="400"></canvas>
    <script>
      const canvas = document.querySelector('canvas');
      var Module = {
        // 指定要渲染的画布元素
        canvas: canvas,
      };
    </script>
    <script src="updateTriangle.js"></script>
  </body>
</html>

```
在web页面，我们可以通过使用_updateTriangle和_updateColor方法来更新三角形和颜色。


