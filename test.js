"nodejs";

const fs = require("fs");
const axios = require("axios");
const util = require("util");
const { requestScreenCapture } = require('media_projection');

const { showToast } = require("toast");
const ui = require("ui");
const console = require("console");
const { accessibility, click, swipe, longClick, press, performGesture, performGestures, StrokeDescription, back } = require('accessibility');

const { delay } = require("lang");
const app = require("app");
const device = require('device');
const { findImage, readImage, matchFeatures, matchTemplateSync } = require('image');
const { viewFile, openUrl } = require('app');
const { imageLoader } = require('ui');
const { UiObject } = require("ui_object")
const { UiSelector } = require('ui_selector');


var width = 0
var height = 0
async function test() {

    await accessibility.enableService({
        toast: true
    });
    width = device.device.screenWidth;
    height = device.device.screenHeight;
    console.log("device     width ==" + width + "        height==" + height)
    var root = accessibility.rootOrNull()

    app.launch("dkplugin.zll.crm")

    while (true) {
        if (root == null) {
            return
        }
        // var list = getImageView(root);
        // for (let i = 0; i < list.length; i++) {
        //     var imageView = list.pop()
        //     var res = imageView.click()
        //     var x = imageView.boundsInScreen.centerX;
        //     var y = imageView.boundsInScreen.centerY
        //     console.log("res", res)
        //     console.log("boundsInScreen", imageView.className)
        //     console.log("x==", x + "y==", y)
        //     await click(x, y)
        // }
        await closeHomePage();
        await delay(5000)
        console.log("执行一波结束")
    }


    // 读取小图
    const template = await readImage('./images/cha2.png');
    // 请求截图权限
    const image = await readImage('./images/测试数据2.png');
    // const image = await readImage('./images/cha4.png');
    var grayCap = image.grayscaleSync()
    var grayTemplate = template.grayscaleSync()


    showToast("开始找图");

    console.log("width==" + image.width, +"height===" + image.height)

    const result = await findImage(grayCap, grayTemplate, {
        threshold: 0,
        level: 5
    });
    if (result) {
        console.log('findImage: ', result);
    } else {
        console.log("没有匹配到")
    }

    // let threshold = 175;
    // let thresholdImg = images.threshold(grayImg, threshold, 255);

    const start = Date.now();
    // 计算大图的特征。若在特征匹配时无法搜索到正确结果，可以调整这里的参数，比如{scale: 1}
    // 也可以在这里指定{region: [...]}参数只计算这个区域的特征提高效率
    const sceneFeatures = await image.detectAndComputeFeatures((
        grayscale = true,
        scale = 1,
        region = [200, 200, 200, 200]
    ));

    viewFile(sceneFeatures)

    var mtOptions = {
        method: 1,
        weakThreshold: 0.1,
        threshold: 0.1,
        level: 100,
        max: 100,
        useTransparentMask: false
    };
    // 特征匹配
    // 最后一次匹配时，我们将特征和匹配绘制出来，在调试时更容易看出匹配效果，但会增加耗时
    const drawMatches = './matches.jpg';
    var objectFeatures = await template.detectAndComputeFeatures((
        grayscale = true
    ))
    const result2 = matchTemplateSync(sceneFeatures, objectFeatures, {
        method: 1,
        weakThreshold: 0.1,
        threshold: 0.1,
        level: 100,
        max: 100,
        useTransparentMask: false
    });
    const end = Date.now();
    // 打印结果和中心点
    console.log(result2, result2?.center);

    // 回收特征对象
    sceneFeatures.recycle();

    console.log("找图结束！")
}

async function closeHomePage() {
    var root = accessibility.rootOrNull()
    if (root == null) {
        return
    }
    var list = getImageView(root);
    console.log("getImageView  size == " + list.length)
    for (let i = 0; i < list.length; i++) {
        var imageView = list[i]
        console.log("id = " + imageView.id + "imageView == " + imageView)
        if ("close_iv" == imageView.id) {
            var x = imageView.boundsInScreen.centerX;
            var y = imageView.boundsInScreen.centerY
            console.log("closeHomePage   x==", x + "y==", y)
            await click(x, y)
        }
    }
}

function getImageView(root) {
    var uiObjectList = new Array()
    var list = root.tree();
    for (let i = 0; i < list.length; i++) {
        var child = list[i];
        if (child.childCount == 0) {
            var x = child.boundsInScreen.centerX
            var y = child.boundsInScreen.centerY
            if ((child.className == "android.widget.ImageView" || child.className == "android.widget.Image")
                && x != 0 && y != 0) {
                if ((x > (width / 4 * 3)) && (y < (height / 5))) {
                    console.log(x + "===========" + y)
                    uiObjectList.push(child)
                }
            }
        }
    }
    return uiObjectList;

    // for (let i = 0; i < root.childCount; i++) {
    //     var child = await root.children[i]
    //     if (child.childCount == 0) {
    //         if ((await child.className == "android.widget.ImageView" || await child.className == "android.widget.Image")
    //             && await child.centerX != 0 && await child.centerY != 0) {
    //             console.log("width==" + width + "height==" + height)
    //             if ((await child.centerX > (width / 2)) && (await child.centerY < (height / 2))) {
    //                 console.log(child.centerX + "===========" + child.centerY)
    //                 list.push(child)
    //             }
    //         }
    //     }
    //     await getImageView(child, list)
    // }

}

test().catch(console.error)