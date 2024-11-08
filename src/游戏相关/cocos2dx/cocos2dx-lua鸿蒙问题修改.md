---
title: cocos2dx-lua鸿蒙问题修改
# icon: gears
order: 4
category:
  - cocos2dx
---
<!-- more -->
#### 修改鸿蒙取字体高度不够导致有切边的问题
原文件Quick-Cocos2dx-Community\cocos\platform\ohos\CCTextBitmap.cpp找到绘制函数createCCTextBitmap

```cpp
CCTextBitmap* CCTextBitmap::createCCTextBitmap(const char *text,  const char *pFontName, const int fontSize,
            const float fontTintA, const float fontTintR, const float fontTintG, const float fontTintB,
            const Device::TextAlign eAlignMask, const int pWidth, const int pHeight, const bool shadow,
            const float shadowDX, const float shadowDY, const float shadowBlur, const bool stroke,
            const float strokeR, const float strokeG, const float strokeB, const float strokeSize)
{
    CCTextBitmap *cCTextBitmap = new CCTextBitmap();
    
    // Manages typographical styles, such as text orientation.
    cCTextBitmap->_typographyStyle = OH_Drawing_CreateTypographyStyle();
    // Set the text to be displayed from left to right.
    OH_Drawing_SetTypographyTextDirection(cCTextBitmap->_typographyStyle, TEXT_DIRECTION_LTR);
    int align = processTextAlign((int)eAlignMask);
    // Set text alignment
    OH_Drawing_SetTypographyTextAlign(cCTextBitmap->_typographyStyle, align);
    // Used to load fonts
    cCTextBitmap->_fontCollection = OH_Drawing_CreateFontCollection();
    // Creates a pointer to the OH_Drawing_TypographyCreate object
    cCTextBitmap->_typographyCreate = OH_Drawing_CreateTypographyHandler(cCTextBitmap->_typographyStyle,
		cCTextBitmap->_fontCollection);
    // Used to manage font colors, decorations, etc.
    cCTextBitmap->_textStyle = OH_Drawing_CreateTextStyle();
    
    // Set Text Color
    OH_Drawing_SetTextStyleColor(cCTextBitmap->_textStyle, OH_Drawing_ColorSetArgb(fontTintA, fontTintR, fontTintG, fontTintB));
    
    // Set text size
    OH_Drawing_SetTextStyleFontSize(cCTextBitmap->_textStyle, fontSize == 0 ? DEFAULT_FONTSIZE : fontSize) ;
    // Set word weight
    OH_Drawing_SetTextStyleFontWeight(cCTextBitmap->_textStyle, FONT_WEIGHT_400);
    // Set the font baseline position. TEXT_BASELINE_ALPHABotic is used to display phonetic characters and the baseline position is lower in the middle. TEXT_BASELINE_IDEOGRAPHIC for ideographic text with baseline at bottom
    OH_Drawing_SetTextStyleBaseLine(cCTextBitmap->_textStyle, TEXT_BASELINE_ALPHABETIC);
    // Set font height
    OH_Drawing_SetTextStyleFontHeight(cCTextBitmap->_textStyle, 1);
    const char *fontFamilies[] = {pFontName};
    // Set the font type
    OH_Drawing_SetTextStyleFontFamilies(cCTextBitmap->_textStyle, 1, fontFamilies);
    // Set the font style. The font style is not italicized. FONT_EVEN_ITALIC Italic
    OH_Drawing_SetTextStyleFontStyle(cCTextBitmap->_textStyle, FONT_STYLE_NORMAL);
    // Setting the Language Area
    OH_Drawing_SetTextStyleLocale(cCTextBitmap->_textStyle, "en");
    
    // Set the typesetting style
    OH_Drawing_TypographyHandlerPushTextStyle(cCTextBitmap->_typographyCreate, cCTextBitmap->_textStyle);
    // Set text content
    OH_Drawing_TypographyHandlerAddText(cCTextBitmap->_typographyCreate, text);
    // Typesetting pop-up
    OH_Drawing_TypographyHandlerPopTextStyle(cCTextBitmap->_typographyCreate);

    // Used to create OH_Drawing_Typography, which is used to manage the layout and display of typesetting.
    cCTextBitmap->_typography = OH_Drawing_CreateTypography(cCTextBitmap->_typographyCreate);
 
    // The input width of the outer layer is preferentially used. If the input width is not used, the calculated width is used.
    int layoutWidth = pWidth;
    if(pWidth == 0) {
        // In NAPI mode, call the ArkTS function to calculate the text width. Here, 400 is the word weight, which corresponds to the value of OH_Drawing_SetTextStyleFontWeight.
        layoutWidth = JSFunction::getFunction("StringUtils.getWidth").invoke<int>(text, fontSize, 400);
    }
    // typographic layout, setting maximum text width
    OH_Drawing_TypographyLayout(cCTextBitmap->_typography, layoutWidth);
    
    // Obtains the maximum inherent width.
    int realWidth = OH_Drawing_TypographyGetMaxIntrinsicWidth(cCTextBitmap->_typography);
    // Obtaining the height
    int realHeight = OH_Drawing_TypographyGetHeight(cCTextBitmap->_typography);
    int textWidth = pWidth != 0 ? pWidth : realWidth;
    int textHeight = pHeight != 0 ? pHeight : realHeight;

    // Format used to describe the bit pixel, including color type and transparency type.
    cCTextBitmap->_bitmap = OH_Drawing_BitmapCreate();
    // COLOR_FORMAT_RGBA_8888：Each pixel is represented by a 32-bit quantity. 8 bits indicate transparency, 8 bits indicate red, 8 bits indicate green, and 8 bits indicate blue.
    // ALPHA_FORMAT_OPAQUE：Bitmap has no transparency
    OH_Drawing_BitmapFormat cFormat = {COLOR_FORMAT_RGBA_8888, ALPHA_FORMAT_OPAQUE};
    
    // Initializes the width and height of the bitmap object, and sets the pixel format for the bitmap.
    OH_Drawing_BitmapBuild(cCTextBitmap->_bitmap, textWidth, textHeight , &cFormat);
    
    // Create a canvas object
    cCTextBitmap->_canvas = OH_Drawing_CanvasCreate();
    // Bind a bitmap object to the canvas so that the content drawn on the canvas is output to the bitmap (i.e., CPU rendering).
    OH_Drawing_CanvasBind(cCTextBitmap->_canvas, cCTextBitmap->_bitmap);
        
    double xStart = calxStartPosition(align, layoutWidth, realWidth, textWidth);
    double yStart = calyStartPosition((int)eAlignMask, realHeight, textHeight);
    double position[2] = {xStart, yStart};
    // Uses the specified color to clear the canvas. OH_Drawing_ColorSetArgb: Converts four variables (respectively describing transparency, red, green, and blue) to a 32-bit (ARGB) variable that describes colors.
    OH_Drawing_CanvasClear(cCTextBitmap->_canvas, OH_Drawing_ColorSetArgb(0x00, 0xFF, 0x00, 0x00));
    // Display Text
    OH_Drawing_TypographyPaint(cCTextBitmap->_typography, cCTextBitmap->_canvas, position[0], position[1]);
    
    constexpr uint32_t stride = 4;
    int32_t addrSize = pWidth * pHeight * stride;
    // Obtains the pixel address of a specified bitmap. The pixel data of the bitmap can be obtained based on the pixel address.
    cCTextBitmap->pixelAddr = OH_Drawing_BitmapGetPixels(cCTextBitmap->_bitmap);
    cCTextBitmap->width = textWidth;
    cCTextBitmap->height = textHeight;
    return cCTextBitmap;
}
```
添加paddingH字段，让绘制时上下高度都扩充paddingH值
修改后
```cpp
CCTextBitmap* CCTextBitmap::createCCTextBitmap(const char *text,  const char *pFontName, const int fontSize,
            const float fontTintA, const float fontTintR, const float fontTintG, const float fontTintB,
            const Device::TextAlign eAlignMask, const int pWidth, const int pHeight, const bool shadow,
            const float shadowDX, const float shadowDY, const float shadowBlur, const bool stroke,
            const float strokeR, const float strokeG, const float strokeB, const float strokeSize)
{
    CCTextBitmap *cCTextBitmap = new CCTextBitmap();
    
    // Manages typographical styles, such as text orientation.
    cCTextBitmap->_typographyStyle = OH_Drawing_CreateTypographyStyle();
    // Set the text to be displayed from left to right.
    OH_Drawing_SetTypographyTextDirection(cCTextBitmap->_typographyStyle, TEXT_DIRECTION_LTR);
    int align = processTextAlign((int)eAlignMask);
    // Set text alignment
    OH_Drawing_SetTypographyTextAlign(cCTextBitmap->_typographyStyle, align);
    // Used to load fonts
    cCTextBitmap->_fontCollection = OH_Drawing_CreateFontCollection();
    // Creates a pointer to the OH_Drawing_TypographyCreate object
    cCTextBitmap->_typographyCreate = OH_Drawing_CreateTypographyHandler(cCTextBitmap->_typographyStyle,
		cCTextBitmap->_fontCollection);
    // Used to manage font colors, decorations, etc.
    cCTextBitmap->_textStyle = OH_Drawing_CreateTextStyle();
    
    // Set Text Color
    OH_Drawing_SetTextStyleColor(cCTextBitmap->_textStyle, OH_Drawing_ColorSetArgb(fontTintA, fontTintR, fontTintG, fontTintB));
    
    // Set text size
    OH_Drawing_SetTextStyleFontSize(cCTextBitmap->_textStyle, fontSize == 0 ? DEFAULT_FONTSIZE : fontSize) ;
    // Set word weight
    OH_Drawing_SetTextStyleFontWeight(cCTextBitmap->_textStyle, FONT_WEIGHT_400);
    // Set the font baseline position. TEXT_BASELINE_ALPHABotic is used to display phonetic characters and the baseline position is lower in the middle. TEXT_BASELINE_IDEOGRAPHIC for ideographic text with baseline at bottom
    OH_Drawing_SetTextStyleBaseLine(cCTextBitmap->_textStyle, TEXT_BASELINE_ALPHABETIC);
    // Set font height
    OH_Drawing_SetTextStyleFontHeight(cCTextBitmap->_textStyle, 1);
    const char *fontFamilies[] = {pFontName};
    // Set the font type
    OH_Drawing_SetTextStyleFontFamilies(cCTextBitmap->_textStyle, 1, fontFamilies);
    // Set the font style. The font style is not italicized. FONT_EVEN_ITALIC Italic
    OH_Drawing_SetTextStyleFontStyle(cCTextBitmap->_textStyle, FONT_STYLE_NORMAL);
    // Setting the Language Area
    OH_Drawing_SetTextStyleLocale(cCTextBitmap->_textStyle, "en");
    
    // Set the typesetting style
    OH_Drawing_TypographyHandlerPushTextStyle(cCTextBitmap->_typographyCreate, cCTextBitmap->_textStyle);
    // Set text content
    OH_Drawing_TypographyHandlerAddText(cCTextBitmap->_typographyCreate, text);
    // Typesetting pop-up
    OH_Drawing_TypographyHandlerPopTextStyle(cCTextBitmap->_typographyCreate);

    // Used to create OH_Drawing_Typography, which is used to manage the layout and display of typesetting.
    cCTextBitmap->_typography = OH_Drawing_CreateTypography(cCTextBitmap->_typographyCreate);
 
    // The input width of the outer layer is preferentially used. If the input width is not used, the calculated width is used.
    int layoutWidth = pWidth;
    if(pWidth == 0) {
        // In NAPI mode, call the ArkTS function to calculate the text width. Here, 400 is the word weight, which corresponds to the value of OH_Drawing_SetTextStyleFontWeight.
        layoutWidth = JSFunction::getFunction("StringUtils.getWidth").invoke<int>(text, fontSize, 400);
    }
    // typographic layout, setting maximum text width
    OH_Drawing_TypographyLayout(cCTextBitmap->_typography, layoutWidth);
    
    // Obtains the maximum inherent width.
    int realWidth = OH_Drawing_TypographyGetMaxIntrinsicWidth(cCTextBitmap->_typography);
    // Obtaining the height
    int realHeight = OH_Drawing_TypographyGetHeight(cCTextBitmap->_typography);
    int paddingH = 4;
    int textWidth = (pWidth != 0 ? pWidth : realWidth);
    int textHeight = (pHeight != 0 ? pHeight : realHeight) + paddingH * 2;

    // Format used to describe the bit pixel, including color type and transparency type.
    cCTextBitmap->_bitmap = OH_Drawing_BitmapCreate();
    // COLOR_FORMAT_RGBA_8888：Each pixel is represented by a 32-bit quantity. 8 bits indicate transparency, 8 bits indicate red, 8 bits indicate green, and 8 bits indicate blue.
    // ALPHA_FORMAT_OPAQUE：Bitmap has no transparency
    OH_Drawing_BitmapFormat cFormat = {COLOR_FORMAT_RGBA_8888, ALPHA_FORMAT_OPAQUE};
    
    // Initializes the width and height of the bitmap object, and sets the pixel format for the bitmap.
    OH_Drawing_BitmapBuild(cCTextBitmap->_bitmap, textWidth, textHeight , &cFormat);
    
    // Create a canvas object
    cCTextBitmap->_canvas = OH_Drawing_CanvasCreate();
    // Bind a bitmap object to the canvas so that the content drawn on the canvas is output to the bitmap (i.e., CPU rendering).
    OH_Drawing_CanvasBind(cCTextBitmap->_canvas, cCTextBitmap->_bitmap);
        
    double xStart = calxStartPosition(align, layoutWidth, realWidth, textWidth);
    double yStart = calyStartPosition((int)eAlignMask, realHeight, textHeight) + paddingH;
    double position[2] = {xStart, yStart};
    // Uses the specified color to clear the canvas. OH_Drawing_ColorSetArgb: Converts four variables (respectively describing transparency, red, green, and blue) to a 32-bit (ARGB) variable that describes colors.
    OH_Drawing_CanvasClear(cCTextBitmap->_canvas, OH_Drawing_ColorSetArgb(0x00, 0xFF, 0x00, 0x00));
    // Display Text
    OH_Drawing_TypographyPaint(cCTextBitmap->_typography, cCTextBitmap->_canvas, position[0], position[1]);
    
    constexpr uint32_t stride = 4;
    int32_t addrSize = pWidth * pHeight * stride;
    // Obtains the pixel address of a specified bitmap. The pixel data of the bitmap can be obtained based on the pixel address.
    cCTextBitmap->pixelAddr = OH_Drawing_BitmapGetPixels(cCTextBitmap->_bitmap);
    cCTextBitmap->width = textWidth;
    cCTextBitmap->height = textHeight;
    return cCTextBitmap;
}
```

#### 修改鸿蒙editbox聚焦时，onKeyboardHeightCallBack函数多次被触发的问题
解决方案，在Quick-Cocos2dx-Community\cocos\ui\UIEditBox\UIEditBoxImpl-ohos.cpp中添加一个activeEditBoxIndex静态变量，并且只有触发onBeginCallBack时进行赋值，后续处理Quick-Cocos2dx-Community\cocos\platform\ohos\napi\modules\InputNapi.cpp
中的keyboardHeightOnChangeCB函数时进行判断，如果当前触发的editbox的index和activeEditBoxIndex一致，才进行后续处理。

Quick-Cocos2dx-Community\cocos\ui\UIEditBox\UIEditBoxImpl-ohos.h文件修改如下
```cpp
#ifndef __UIEDITBOXIMPLOHOS_H__
#define __UIEDITBOXIMPLOHOS_H__

#include "platform/CCPlatformConfig.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_OHOS)

#include "ui/UIEditBox/UIEditBoxImpl-common.h"

NS_CC_BEGIN

class Label;

namespace ui {

    class EditBox;

    class EditBoxImplOhos : public EditBoxImplCommon
    {
    public:
        /**
         * @js NA
         */
        EditBoxImplOhos(EditBox* pEditText);
        /**
         * @js NA
         * @lua NA
         */
        virtual ~EditBoxImplOhos();

        virtual bool isEditing() override;
        virtual void createNativeControl(const Rect& frame) override;
        virtual void setNativeFont(const char* pFontName, int fontSize) override ;
        virtual void setNativeFontColor(const Color4B& color) override ;
        virtual void setNativePlaceholderFont(const char* pFontName, int fontSize) override ;
        virtual void setNativePlaceholderFontColor(const Color4B& color) override ;
        virtual void setNativeInputMode(EditBox::InputMode inputMode) override ;
        virtual void setNativeInputFlag(EditBox::InputFlag inputFlag) override ;
        virtual void setNativeReturnType(EditBox::KeyboardReturnType returnType)override ;
        virtual void setNativeTextHorizontalAlignment(cocos2d::TextHAlignment alignment) override {};
        virtual void setNativeText(const char* pText) override ;
        virtual void setNativePlaceHolder(const char* pText) override ;
        virtual void setNativeVisible(bool visible) override ;
        virtual void updateNativeFrame(const Rect& rect) override ;
        virtual const char* getNativeDefaultFontName() override ;
        virtual void nativeOpenKeyboard() override ;
        virtual void nativeCloseKeyboard() override ;
        virtual void setNativeMaxLength(int maxLength) override;
        
        static void onBeginCallBack(int index);
        static void onChangeCallBack(int index, const std::string& text);
        static void onEnterCallBack(int index, const std::string& text);
    
        static void onKeyboardHeightCallBack(int index, const int height);
		
		virtual void setNativeTextVerticalAlignment(cocos2d::TextVAlignment alignment);

		virtual void setNativeTextVisible(bool isVisible);

		virtual float getNativeChangeFieldHeight();
        static int activeEditBoxIndex;
    private:
        virtual void doAnimationWhenKeyboardMove(float duration, float distance)override {};
        int _editBoxIndex;
    };


}


NS_CC_END

#endif /* #if (CC_TARGET_PLATFORM == CC_PLATFORM_OHOS) */

#endif /* __UIEDITBOXIMPLOHOS_H__ */
```

Quick-Cocos2dx-Community\cocos\ui\UIEditBox\UIEditBoxImpl-ohos.cpp文件修改如下
```cpp
#include "ui/UIEditBox/UIEditBoxImpl-ohos.h"
#include <string>

#if (CC_TARGET_PLATFORM == CC_PLATFORM_OHOS)

#include "ui/UIEditBox/UIEditBox.h"
#include "2d/CCLabel.h"
#include "base/ccUTF8.h"
#include "math/Vec2.h"
#include "ui/UIHelper.h"
#include "base/CCDirector.h"
#include "platform/CCFileUtils.h"
#include "platform/ohos/napi/helper/NapiHelper.h"
#include "platform/ohos/CCLogOhos.h"


NS_CC_BEGIN

namespace ui {

    static std::unordered_map<int, EditBoxImplOhos*> s_allEditBoxes;
    static int curIndex = 0;
    int EditBoxImplOhos::activeEditBoxIndex = -1;
    EditBoxImpl* __createSystemEditBox(EditBox* editBox)
    {
        return new EditBoxImplOhos(editBox);
    }

    void EditBoxImplOhos::createNativeControl(const Rect& frame)
    {
        OHOS_LOGD("create textinput");

        auto director = cocos2d::Director::getInstance();
        auto glView = director->getOpenGLView();
        auto frameSize = glView->getFrameSize();

        auto winSize = director->getWinSize();
        auto leftBottom = _editBox->convertToWorldSpace(Point::ZERO);

        auto contentSize = frame.size;
        auto rightTop = _editBox->convertToWorldSpace(Point(contentSize.width, contentSize.height));
        auto uiLeft = frameSize.width / 2 + (leftBottom.x - winSize.width / 2) * glView->getScaleX();
        auto uiTop = frameSize.height / 2 - (rightTop.y - winSize.height / 2) * glView->getScaleY();
        auto uiWidth = (rightTop.x - leftBottom.x) * glView->getScaleX();
        auto uiHeight = (rightTop.y - leftBottom.y) * glView->getScaleY();
        auto paddingW = (int)(5 * glView->getScaleX());
        auto paddingH = (int)(uiHeight * 0.33f / 2);

        s_allEditBoxes[curIndex] = this;
        _editBoxIndex = curIndex;
        JSFunction::getFunction("CocosEditBox.createCocosEditBox").invoke<void>(_editBoxIndex, uiLeft, uiTop, uiWidth, uiHeight, paddingW, paddingH);
        curIndex++;
    }

    EditBoxImplOhos::EditBoxImplOhos(EditBox* pEditText)
        : EditBoxImplCommon(pEditText)
        , _editBoxIndex(-1)
    {

    }

    EditBoxImplOhos::~EditBoxImplOhos()
    {
        s_allEditBoxes.erase(_editBoxIndex);
        JSFunction::getFunction("CocosEditBox.removeCocosEditBox").invoke<void>(_editBoxIndex);
    }

    bool EditBoxImplOhos::isEditing()
    {
        return false;
    }

    void EditBoxImplOhos::setNativeText(const char* pText)
    {
        JSFunction::getFunction("CocosEditBox.setCurrentText").invoke<void>(_editBoxIndex, pText);
    }

    void EditBoxImplOhos::setNativeFont(const char* pFontName, int fontSize)
    {
        auto director = cocos2d::Director::getInstance();
        auto glView = director->getOpenGLView();
        auto isFontFileExists = cocos2d::FileUtils::getInstance()->isFileExist(pFontName);
        std::string realFontPath = pFontName;
        if (isFontFileExists) {
            realFontPath = cocos2d::FileUtils::getInstance()->fullPathForFilename(pFontName);
            if (realFontPath.find("rawfile/") == 0)
            {
                realFontPath = realFontPath.substr(strlen("rawfile/"));   // Chop out the 'assets/' portion of the path.
            }
        }
        auto realFontsize = fontSize * glView->getScaleX();
        JSFunction::getFunction("CocosEditBox.setEditBoxFontSize").invoke<void>(_editBoxIndex, realFontsize);
        JSFunction::getFunction("CocosEditBox.setEditBoxFontPath").invoke<void>(_editBoxIndex, realFontPath);
    }

    void EditBoxImplOhos::setNativeFontColor(const Color4B& color)
    {
        JSFunction::getFunction("CocosEditBox.setEditBoxFontColor").invoke<void>(_editBoxIndex, (int)color.r, (int)color.g, (int)color.b, (int)color.a);
    }

    void EditBoxImplOhos::setNativePlaceHolder(const char* pText)
    {
        JSFunction::getFunction("CocosEditBox.setEditBoxPlaceHolder").invoke<void>(_editBoxIndex, pText);
    }

    void EditBoxImplOhos::setNativePlaceholderFont(const char* pFontName, int fontSize)
    {
        auto director = cocos2d::Director::getInstance();
        auto glView = director->getOpenGLView();
        auto isFontFileExists = cocos2d::FileUtils::getInstance()->isFileExist(pFontName);
        std::string realFontPath = pFontName;
        if (isFontFileExists) {
            realFontPath = cocos2d::FileUtils::getInstance()->fullPathForFilename(pFontName);
            if (realFontPath.find("rawfile/") == 0)
            {
                realFontPath = realFontPath.substr(strlen("rawfile/"));   // Chop out the 'assets/' portion of the path.
            }
        }
        auto realFontsize = fontSize * glView->getScaleX();
        JSFunction::getFunction("CocosEditBox.setEditBoxPlaceHolderFontSize").invoke<void>(_editBoxIndex, realFontsize);
        JSFunction::getFunction("CocosEditBox.setEditBoxPlaceHolderFontPath").invoke<void>(_editBoxIndex, realFontPath);
    }

    void EditBoxImplOhos::setNativePlaceholderFontColor(const Color4B& color)
    {
        JSFunction::getFunction("CocosEditBox.setEditBoxPlaceHolderFontColor").invoke<void>(_editBoxIndex, (int)color.r, (int)color.g, (int)color.b, (int)color.a);
    }

    void EditBoxImplOhos::setNativeMaxLength(int maxLength)
    {
        JSFunction::getFunction("CocosEditBox.setEditBoxMaxLength").invoke<void>(_editBoxIndex, maxLength);
    }

    void EditBoxImplOhos::setNativeInputMode(EditBox::InputMode inputMode)
    {
        JSFunction::getFunction("CocosEditBox.setNativeInputMode").invoke<void>(_editBoxIndex, static_cast<int>(inputMode));
    }

    void EditBoxImplOhos::setNativeInputFlag(EditBox::InputFlag inputFlag)
    {
        JSFunction::getFunction("CocosEditBox.setNativeInputFlag").invoke<void>(_editBoxIndex, static_cast<int>(inputFlag));
    }

    void EditBoxImplOhos::setNativeReturnType(EditBox::KeyboardReturnType returnType)
    {
        OHOS_LOGW("OHOS not support returnType %{public}d", returnType);
    }

    void EditBoxImplOhos::setNativeVisible(bool visible)
    {   
        JSFunction::getFunction("CocosEditBox.setEditBoxVisible").invoke<void>(_editBoxIndex, visible);
    }

    void EditBoxImplOhos::updateNativeFrame(const Rect& rect)
    {
        JSFunction::getFunction("CocosEditBox.setEditBoxViewRect").invoke<void>(_editBoxIndex, (int)rect.origin.x, (int)rect.origin.y, (int)rect.size.width, (int)rect.size.height);
    }

    void EditBoxImplOhos::nativeOpenKeyboard()
    {
        JSFunction::getFunction("CocosEditBox.setEditBoxVisible").invoke<void>(_editBoxIndex, true);
    }

    void EditBoxImplOhos::nativeCloseKeyboard()
    {
        JSFunction::getFunction("CocosEditBox.setEditBoxVisible").invoke<void>(_editBoxIndex, false);
    }

    void EditBoxImplOhos::onBeginCallBack(int index)
    {
        OHOS_LOGD("textinput editBoxEditingDidBegin");
        CCLOG("EditBoxImplOhos onBeginCallBack:%i",index);
        auto it = s_allEditBoxes.find(index);
        if (it != s_allEditBoxes.end())
        {
            activeEditBoxIndex = index;
            s_allEditBoxes[index]->editBoxEditingDidBegin();
        }
    }

    void EditBoxImplOhos::onChangeCallBack(int index, const std::string& text)
    {
        OHOS_LOGD("textinput onChangeCallBack");
        auto it = s_allEditBoxes.find(index);
        if (it != s_allEditBoxes.end())
        {
            s_allEditBoxes[index]->editBoxEditingChanged(text);
        }
    }

    void EditBoxImplOhos::onEnterCallBack(int index, const std::string& text)
    {
        OHOS_LOGD("textinput onEnterCallBack");
        JSFunction::getFunction("CocosEditBox.setEditBoxVisible").invoke<void>(index, false);
        auto it = s_allEditBoxes.find(index);
        if (it != s_allEditBoxes.end())
        {
            s_allEditBoxes[index]->editBoxEditingDidEnd(text);
        }
    }
        
    void EditBoxImplOhos::onKeyboardHeightCallBack(int index, const int height) {
        OHOS_LOGD("textinput onKeyboardHeightCallBack");
        auto it = s_allEditBoxes.find(index);
        if (it != s_allEditBoxes.end())
        {
            CCLOG("EditBoxImplOhos onKeyboardHeightCallBack:%i",index);
            s_allEditBoxes[index]->getKeyboardInfo(true, height);
        }
    }

    const char* EditBoxImplOhos::getNativeDefaultFontName()
    {
        return "sans-serif";
    }

void EditBoxImplOhos::setNativeTextVerticalAlignment(cocos2d::TextVAlignment alignment) {
    
}

void EditBoxImplOhos::setNativeTextVisible(bool isVisible) {
    
}

float EditBoxImplOhos::getNativeChangeFieldHeight() {
    return 0;
}

}

NS_CC_END

#endif /* #if (CC_TARGET_PLATFORM == CC_PLATFORM_OHOS) */
```

Quick-Cocos2dx-Community\cocos\platform\ohos\napi\modules\InputNapi.cpp文件修改如下
```cpp
//
// Created on 2023/4/19.
//
// Node APIs are not fully supported. To solve the compilation error of the interface cannot be found,
// please include "napi/native_api.h".

#include <js_native_api.h>
#include <js_native_api_types.h>
#include "InputNapi.h"
#include "platform/ohos/napi/plugin_manager.h"
#include "../../CCLogOhos.h"
#include "ui/UIEditBox/UIEditBoxImpl-ohos.h"
#include "base/CCIMEDispatcher.h"

napi_value InputNapi::editBoxOnFocusCB(napi_env env, napi_callback_info info) {

    OHOS_LOGI("InputNapi::editBoxOnFocusCB");
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    NAPI_CALL(env, napi_get_cb_info(env, info, &argc, args, nullptr, nullptr));
    if (argc != 1) {
        napi_throw_type_error(env, NULL, "Wrong number of arguments");
        return nullptr;
    }

    napi_valuetype valuetype;
    status = napi_typeof(env, args[0], &valuetype);
    if (status != napi_ok) {
        return nullptr;
    }
    if (valuetype != napi_number) {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return nullptr;
    }

    int32_t index;
    NAPI_CALL(env, napi_get_value_int32(env, args[0], &index));

    cocos2d::ui::EditBoxImplOhos::onBeginCallBack(index);
    return nullptr;
}

napi_value InputNapi::editBoxOnChangeCB(napi_env env, napi_callback_info info) {
    OHOS_LOGI("InputNapi::editBoxOnChangeCB");

    napi_status status;
    size_t argc = 2;
    napi_value args[2];
    NAPI_CALL(env, napi_get_cb_info(env, info, &argc, args, nullptr, nullptr));
    if (argc != 2) {
        napi_throw_type_error(env, NULL, "Wrong number of arguments");
        return nullptr;
    }

    napi_valuetype valuetype;
    status = napi_typeof(env, args[0], &valuetype);
    if (status != napi_ok) {
        return nullptr;
    }
    if (valuetype != napi_number) {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return nullptr;
    }

    status = napi_typeof(env, args[1], &valuetype);
    if (status != napi_ok) {
        return nullptr;
    }
    if (valuetype != napi_string) {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return nullptr;
    }

    int32_t index;
    NAPI_CALL(env, napi_get_value_int32(env, args[0], &index));
    size_t pInt;
    char text[256];
    NAPI_CALL(env, napi_get_value_string_utf8(env, args[1], text, 256, &pInt));

    cocos2d::ui::EditBoxImplOhos::onChangeCallBack(index, text);
    return nullptr;
}

napi_value InputNapi::keyboardHeightOnChangeCB(napi_env env, napi_callback_info info) {

    OHOS_LOGI("InputNapi::keyboardHeightOnChangeCB");
    napi_status status;
    size_t argc = 2;
    napi_value args[2];
    NAPI_CALL(env, napi_get_cb_info(env, info, &argc, args, nullptr, nullptr));
    if (argc != 2) {
        napi_throw_type_error(env, NULL, "Wrong number of arguments");
        return nullptr;
    }

    napi_valuetype valuetype;

    // 检查第一个参数是否为数字
    status = napi_typeof(env, args[0], &valuetype);
    if (status != napi_ok) {
        return nullptr;
    }
    if (valuetype != napi_number) {
        napi_throw_type_error(env, NULL, "First argument must be a number");
        return nullptr;
    }

    // 检查第二个参数是否为数字（替换之前的字符串类型）
    status = napi_typeof(env, args[1], &valuetype);
    if (status != napi_ok) {
        return nullptr;
    }
    if (valuetype != napi_number) {
        napi_throw_type_error(env, NULL, "Second argument must be a number");
        return nullptr;
    }

    // 获取第一个参数的数值
    int32_t index;
    NAPI_CALL(env, napi_get_value_int32(env, args[0], &index));

    // 获取第二个参数的数值（改为获取整数）
    int32_t intValue;
    NAPI_CALL(env, napi_get_value_int32(env, args[1], &intValue));

    // 调用回调，将两个整数传递进去
    if (index == cocos2d::ui::EditBoxImplOhos::activeEditBoxIndex){
        cocos2d::ui::EditBoxImplOhos::onKeyboardHeightCallBack(index, intValue);
    }
    
    return nullptr;
}

napi_value InputNapi::editBoxOnEnterCB(napi_env env, napi_callback_info info) {

    napi_status status;
    size_t argc = 2;
    napi_value args[2];
    NAPI_CALL(env, napi_get_cb_info(env, info, &argc, args, nullptr, nullptr));
    if (argc != 2) {
        napi_throw_type_error(env, NULL, "Wrong number of arguments");
        return nullptr;
    }

    napi_valuetype valuetype;
    status = napi_typeof(env, args[0], &valuetype);
    if (status != napi_ok) {
        return nullptr;
    }
    if (valuetype != napi_number) {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return nullptr;
    }

    status = napi_typeof(env, args[1], &valuetype);
    if (status != napi_ok) {
        return nullptr;
    }
    if (valuetype != napi_string) {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return nullptr;
    }

    int32_t index;
    NAPI_CALL(env, napi_get_value_int32(env, args[0], &index));
    size_t pInt;
    char text[256];
    NAPI_CALL(env, napi_get_value_string_utf8(env, args[1], text, 256, &pInt));

    cocos2d::ui::EditBoxImplOhos::onEnterCallBack(index, text);
    return nullptr;
}

napi_value InputNapi::textFieldTTFOnChangeCB(napi_env env, napi_callback_info info) {

    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    NAPI_CALL(env, napi_get_cb_info(env, info, &argc, args, nullptr, nullptr));
    if (argc != 1) {
        napi_throw_type_error(env, NULL, "Wrong number of arguments");
        return nullptr;
    }

    napi_valuetype valuetype;
    status = napi_typeof(env, args[0], &valuetype);
    if (status != napi_ok) {
        return nullptr;
    }
    if (valuetype != napi_string) {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return nullptr;
    }

    const char* oldStr = cocos2d::IMEDispatcher::sharedDispatcher()->getContentText().c_str();
    size_t pInt;
    char text[256];
    NAPI_CALL(env, napi_get_value_string_utf8(env, args[0], text, 256, &pInt));

    // 计算出差异位置
    int oldIndex = 0;
    int newIndex = 0;
    while(oldIndex < strlen(oldStr) && newIndex < strlen(text)) {
        if(oldStr[oldIndex] != text[newIndex]) {
            break;
        }
        oldIndex++;
        newIndex++;
    }

    // 删除原字符串差异位置之后的字符
    int oldLength = strlen(oldStr);
    for(; oldIndex < oldLength; oldIndex++) {
        cocos2d::IMEDispatcher::sharedDispatcher()->dispatchDeleteBackward();
    }

    // 截取新字符串差异位置后的部分，并插入
    if(strlen(text) > newIndex) {
        std::string newStr(text, sizeof(text));
        const char* modify = newStr.substr(newIndex).c_str();
        cocos2d::IMEDispatcher::sharedDispatcher()->dispatchInsertText(modify, strlen(modify));
    }

    return nullptr;
}
```
