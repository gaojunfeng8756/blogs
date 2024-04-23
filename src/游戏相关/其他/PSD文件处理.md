---
title: PSD文件处理
# icon: gears
order: 4
category:
  - 其他
---
<!-- more -->
尝试使用 [psd.js](https://github.com/meltingice/psd.js)对psd文件进行解析，以下是输出所有png

## 环境
```
npm install psd.js
```
## 代码

```
const PSD = require('psd');
const path = require('path');
const output = './output';

function psdToPng(psdPath) {
    // 读取 PSD 文件
    PSD.open(psdPath).then(psd => {
        // 获取所有图层
        const layers = psd.tree().descendants();

        // 逐个导出每个图层
        layers.forEach(layer => {
            // 导出图层为 PNG 文件
            const layerName = layer.name;
            let type = layer.type;
            if (type == "group") {
                return;
            }
            const outputFileName = `${layerName}.png`;
            const outputPath = path.join(output, outputFileName); // 输出文件夹路径
            layer.saveAsPng(outputPath);
            console.log(`Exported layer: ${layerName} to ${outputPath}`);
        });

        console.log('All layers exported successfully.');
    }).catch(err => {
        console.error(err);
    });
}


psdToPng('./test.psd');
```
