import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as i,b as s,a as l}from"./app-EhFI_Uqi.js";const d={},r=l(`<p>我们在生成item的时候，很容易造成页面动画卡顿，这个时候，我们需要考虑去分帧加载，可以参考以下代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//初始化item
initItem(index){

}
  /**
 * 实现分帧加载
 */
    async framingLoad(length: number) {
        await this.executePreFrame(this._getItemGenerator(length), 1);
    }

    private *_getItemGenerator(length: number) {
        for (let i = 0; i &lt; length; i++) {
            yield this.initItem(i);
        }
    }

    /**
     * 分帧执行 Generator 逻辑
     *
     * @param generator 生成器
     * @param duration 持续时间（ms）
     *          每次执行 Generator 的操作时，最长可持续执行时长。
     *          假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
     */
    private executePreFrame(generator: Generator, duration: number) {
        return new Promise((resolve, reject) =&gt; {
            let gen = generator;
            // 创建执行函数
            let execute = () =&gt; {

                // 执行之前，先记录开始时间戳
                let startTime = new Date().getTime();

                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                for (let iter = gen.next(); ; iter = gen.next()) {

                    // 判断是否已经执行完所有 Generator 的小代码段
                    // 如果是的话，那么就表示任务完成
                    if (iter == null || iter.done) {
                        resolve(null);
                        return;
                    }

                    // 每执行完一段小代码段，都检查一下是否
                    // 已经超过我们分配给本帧，这些小代码端的最大可执行时间
                    if (new Date().getTime() - startTime &gt; duration) {

                        // 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
                        this.scheduleOnce(() =&gt; {
                            execute();
                        });
                        return;
                    }
                }
            };

            // 运行执行函数
            execute();
        });
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(a,m){return n(),i("div",null,[s(" more "),r])}const u=e(d,[["render",v],["__file","分帧加载.html.vue"]]);export{u as default};
