import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as d,c as l,b as r,d as n,e,f as t,a as c}from"./app-Rouzxneo.js";const o={},v={href:"https://github.com/meltingice/psd.js",target:"_blank",rel:"noopener noreferrer"},u=c(`<h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install psd.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const PSD = require(&#39;psd&#39;);
const path = require(&#39;path&#39;);
const output = &#39;./output&#39;;

function psdToPng(psdPath) {
    // 读取 PSD 文件
    PSD.open(psdPath).then(psd =&gt; {
        // 获取所有图层
        const layers = psd.tree().descendants();

        // 逐个导出每个图层
        layers.forEach(layer =&gt; {
            // 导出图层为 PNG 文件
            const layerName = layer.name;
            let type = layer.type;
            if (type == &quot;group&quot;) {
                return;
            }
            const outputFileName = \`\${layerName}.png\`;
            const outputPath = path.join(output, outputFileName); // 输出文件夹路径
            layer.saveAsPng(outputPath);
            console.log(\`Exported layer: \${layerName} to \${outputPath}\`);
        });

        console.log(&#39;All layers exported successfully.&#39;);
    }).catch(err =&gt; {
        console.error(err);
    });
}


psdToPng(&#39;./test.psd&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function m(p,b){const s=a("ExternalLinkIcon");return d(),l("div",null,[r(" more "),n("p",null,[e("尝试使用 "),n("a",v,[e("psd.js"),t(s)]),e("对psd文件进行解析，以下是输出所有png")]),u])}const g=i(o,[["render",m],["__file","PSD文件处理.html.vue"]]);export{g as default};
