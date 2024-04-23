---
title: cocos2dx-lua构建鸿蒙
# icon: gears
order: 4
category:
  - cocos2dx
---
<!-- more -->
#### 编译cocos2dx-lua鸿蒙测试项目
1.将使用鸿蒙修改的cocos2dx仓库克隆到本地，仓库地址：https://gitee.com/openharmony-sig/cocos2dx
2.准备好鸿蒙开发环境，DevEco Studio NEXT版本，SDK使用HarmonyOS NEXT Developer Preview0（目前需要申请权限，具体申请流程联系市场部诸葛文俊）
3.使用DevEco Studio打开cocos2dx\tests\lua-tests\project\proj.ohos 项目
4.使用DevEco Studio新建一个空项目，然后将hvigor文件夹替换掉 cocos2dx\tests\lua-tests\project\proj.ohos下的hvigor文件夹（这里如果编译出问题再执行第四步）
5.找到proj.ohos下的build-profile.json5文件，将signingConfigs下的证书替换成自己的证书，然后使用真机编译即可
 
#### 资源
lua代码和图片资源目录在==cocos2dx\tests\lua-tests\project\proj.ohos\entry\src\main\resources\rawfile==下，这个文件夹的生成，可参考
==cocos2dx\tests\lua-tests\project\CMakeLists.tx==t文件

#### cpp代码和库文件
项目里引入的cpp代码，可参考==cocos2dx\tests\lua-tests\project\proj.ohos\entry\src\main\cpp\CMakeLists.txt==文件

#### 测试问题
1.EditBox点击输入调用键盘时，第一下点击可以使editbox聚焦，但是不能弹出键盘，第二下点击才可以弹出键盘
2.webView组件目前loadURL接口不能加载网页，但是loadFile加载本地网页是可以生效的
3.videoPlayer组件，加载后位置不准确


#### lua与鸿蒙交互
参考==VibrateTest.lua== ，首先lua先与cpp交互，调用 ```
cc.Device:vibrate(duration)
然后我们找到cocos2dx中platform对ohos的Device实现，==CCDevice-ohos.cpp==文件中的vibrate方法，使用了`JSFunction::getFunction("DeviceUtils.startVibration").invoke<void>(duration);`
然后我们可以找到项目中==libSysCapabilities==库中==DeviceUtils.ts==文件，查看startVibration的鸿蒙实现
```
  static startVibration(time: number) {
    try {
      vibrator.startVibration({
        type: 'time',
        duration: time * 1000, // 秒转毫秒
      }, {
        id: 0,
        usage: 'unknown'
      }, (error) => {
        if (error) {
          log.error('vibrate fail, error.code: %{public}d, error.message: %{public}s', error.code, error.message);
          return;
        }
      });
    } catch (err) {
      log.error('error.code: %{public}d, error.message: %{public}s', err.code, err.message);
    }
  }
```
对于DeviceUtils初始化，在项目下的==CocosWorker.ts==文件中，对于startVibration的函数注册，在==libSysCapabilities==库中==NapiHelper.ts==文件中，这一部分建议大家自己研究。另外，暂时没有发现==cocos2dx\cocos\scripting\lua-bindings\manual\platform==的鸿蒙文件，没有类似luac和luaj的使用。

#### 鸿蒙调用cocos
参考键盘输入，这里用editBoxOnChange举例
鸿蒙这边使用postMessage发送事件，如  
```
this.cocosWorker.postMessage({type: "editBoxOnChange", viewTag: this.textInputInfo.viewTag, value: value});
```
这里，我们需要在==CocosWorker.ts==文件中处理==editBoxOnChange==这个函数，
```
case "editBoxOnChange":
            inputNapi.editBoxOnChangeCB(data.viewTag, data.value);
            break;
```
并执行对应Napi的回调函数，这里建议补全==entry\src\main\cpp\types\libentry\index.d.ts==函数名.然后我们去查看==cocos2dx\cocos\platform\ohos\napi\modules\InputNapi.cpp==的cpp实现。这里能反射成功，需要我们去查看==cocos2dx\cocos\platform\ohos\napi\plugin_manager.cpp的GetContext函数==这里记得同步鸿蒙和cpp中的ContextType枚举

