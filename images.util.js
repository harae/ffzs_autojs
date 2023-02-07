"nodejs";

const { requestScreenCapture } = require('media_projection');
const { findImage, readImage } = require('image');
const app = require("app");
const { click, back, swipe, currentPackage, longClick, press, performGesture, performGestures, StrokeDescription, accessibility, openNotifications } = require('accessibility');
const { delay } = require('lang');
const device = require('device');
const { UiObject } = require('ui_object');
const { R } = require('ui');
const { showToast } = require('toast');

const myImageOptions = (
    threshold = 0.1
)

var width = device.device.screenWidth;
var height = device.device.screenHeight;

async function startZanYou(capturer) {
    app.launch("zanyouninesix.say");
    await closeHomePage()

    // await delay(2000)
    // var res;
    // accessibility
    // while ((res = await existImages(capturer, "./images/shouping.png", 10000)) != false) {
    //     console.log("res ======", res)
    //     // 1.29大概的比例高度
    //     console.log("x ==" + device.device.screenWidth / 2)
    //     console.log("y ==" + device.device.screenHeight / 1.29)
    //     await click(device.device.screenWidth / 2, device.device.screenHeight / 1.29);
    //     await sleep(500);
    // }
    const template = await readImage("./images/my2.png");
    for (let i = 0; i < 10; i++) {
        const img = await capturer.latestImage();
        var point = await findImage(img, template);
        if (point != null) {
            await click(point.x, point.y);
            break
        }
    }
    template.recycle()



}

async function startCaiHongHezi() {
    app.launch("com.caihonghezi.www");

}

async function startDuoKaiApp(packageName) {
    var res = await app.launch(packageName);
    if (res == false) {
        showToast("打开%j多开app失败", packageName)
    }
}


async function existImages(capturer, imagesPath, waitTime) {
    const template = await readImage(imagesPath);
    var time = waitTime / 1000;
    for (let i = 0; i < time; i++) {
        const img = await capturer.latestImage();
        var point = await findImage(img, template, {
            threshold: 0.9
        });
        if (point != null) {
            return point;
        }
        await sleep(1000);
    }
    return false;
}



// 是否还在当前页
async function isContainPage() {

    var points = new Array()
    let num = 0;
    var root = accessibility.rootOrNull()
    if (root == null) {
        return
    }
    var list = root.tree();
    for (let i = 0; i < list.length; i++) {
        var child = list[i];
        if (child.childCount == 0) {
            var x = child.boundsInScreen.centerX
            var y = child.boundsInScreen.centerY
            if (child.text == '任性放弃' && child.packageName == 'com.excelliance.dualaid') {
                await click(x, y)
            }
            if (child.className == "android.widget.ImageView" && child.column == -1 && child.depth == 8 &&
                child.enabled == true && child.indexInParent == 0 && child.text == null) {
                await click(x, y)
            }
            if (child.text == '双开助手' || child.id == 'img_logo' || child.text == '多开') {
                root.recycle()
                return true;
            }
        }
    }
    root.recycle()
    return false;

}


/**
 * 
 * @param {*} imagesPathList pathList
 * @param {*} waitTime ms
 * @returns 
 */
async function existImagesList(capturer, imagesPathList, waitTime) {
    var images = new Array();
    for (let index = 0; index < imagesPathList.length; index++) {
        const template = await readImage(imagesPathList[index]);
        images.push(template)
    }
    const img = await capturer.latestImage();
    for (let index = 0; index < images.length; index++) {
        var point = await findImage(img, images[index]);
        if (point != null) {
            console.log("在列表中找到图片 = " + imagesPathList[index] + "    point =" + point)
            images[index].recycle()
            return point;
        }
        images[index].recycle()
        await sleep(1000);
    }
    return false;
}

async function closeVideo() {
    console.log("进入到了closeVideo")
    while (true) {

        var root = accessibility.rootOrNull()
        if (root == null) {
            return
        }
        var list = root.tree();
        for (let i = 0; i < list.length; i++) {
            var child = list[i];
            if (child.childCount == 0) {
                var x = child.boundsInScreen.centerX
                var y = child.boundsInScreen.centerY
                if ("close" == child.id) {
                    console.log("closeVideo  x==", x + "y==", y)
                    await click(x, y)
                    return
                }
                if (x != 0 && y != 0) {
                    if (child.indexInParent == 0 &&
                        x > (width / 10 * 8) && y < (height / 5)) {
                        console.log("closeVideo  x==", x + "y==", y)
                        await click(x, y)
                        return
                    }
                }
                if ("放弃福利" == child.text && child.indexInParent == 3 && child.depth == 10 && child.className == "android.widget.TextView") {
                    console.log("closeVideo  x==", x + "y==", y)
                    await click(x, y)
                    return
                }
                
                if (!child.packageName == global.adaptationPackageName) {
                    back()
                    return
                }

                if (!child.text == "登录") {
                    back()
                    back()
                    return
                }

                if (child.id == 'im_left_topbar') {
                    await click(x, y)
                    return
                }
            }
        }
        root.recycle()
        await sleep(500)

    }

}

async function findCaihongFind() {

    for (let m = 0; m < 50; m++) {
        var root = accessibility.rootOrNull()
        if (root == null) {
            console.error("没有找到root")
            return
        }
        var list = root.tree();
        for (let i = 0; i < list.length; i++) {
            var child = list[i];
            if (child.childCount == 0 && child.className == "android.widget.RadioButton" && "发现" == child.text) {
                var x = child.boundsInScreen.centerX
                var y = child.boundsInScreen.centerY
                console.log("findCaihongFind x==" + x + "y==" + y)
                click(x, y)
                child.recycle()
                return
            }
        }
        await delay(500)
        root.recycle()
    }

}

async function findSkipAndClick() {
    for (let m = 0; m < 10; m++) {
        var root = accessibility.rootOrNull()
        if (root == null) {
            console.error("没有找到root")
            return
        }
        var list = root.tree();
        for (let i = 0; i < list.length; i++) {
            var child = list[i];
            if (child.childCount == 0 && child.className == "android.widget.TextView" && "跳过" == child.text) {
                var x = child.boundsInScreen.centerX
                var y = child.boundsInScreen.centerY
                console.log("findSkipAndClick x==" + x + "y==" + y)
                await click(x, y)
                child.recycle()
                return
            }
        }
        root.recycle()
        await delay(500)
    }

}

async function isLogin() {
    for (let m = 0; m < 60; m++) {
        var root = accessibility.rootOrNull()
        if (root == null) {
            console.error("没有找到root")
            return false
        }
        var list = root.tree();
        for (let i = 0; i < list.length; i++) {
            var child = list[i];
            if (child.childCount == 0 && child.className == "android.widget.TextView" && "登录" == child.text) {
                return false
            }
            if (child.childCount == 0 && child.className == "android.widget.RadioButton" && "我的" == child.text) {
                return true
            }
        }
        await delay(500)
    }
    return true
}

async function closeHomePage() {
    for (let m = 0; m < 20; m++) {
        var root = accessibility.rootOrNull()
        if (root == null) {
            return
        }
        var list = root.tree();
        for (let i = 0; i < list.length; i++) {
            var child = list[i];
            if (child.childCount == 0) {
                var x = child.boundsInScreen.centerX
                var y = child.boundsInScreen.centerY
                if ((child.className == "android.widget.ImageView" || child.className == "android.widget.Image")
                    && x != 0 && y != 0) {
                    if ("close_iv" == child.id) {
                        child.click()
                        return
                    }
                }
            }
        }
        await sleep(500)
    }
}

function getImageView() {
    var root = accessibility.rootOrNull()
    if (root == null) {
        return
    }
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
                    uiObjectList.push(child)
                }
            }
        }
    }
    return uiObjectList;
}

function getBigImageView() {
    var root = accessibility.rootOrNull()
    if (root == null) {
        return
    }
    var uiObjectList = new Array()
    var list = root.tree();
    for (let i = 0; i < list.length; i++) {
        var child = list[i];
        if (child.childCount == 0) {
            var x = child.boundsInScreen.centerX
            var y = child.boundsInScreen.centerY
            var childWidth = child.boundsInScreen.width
            var childHeight = child.boundsInScreen.height
            if ((child.className == "android.widget.ImageView")
                && x != 0 && y != 0) {
                if ((childWidth > (width / 10 * 8)) && (childHeight > (height / 6 * 1)) &&
                    child.depth == 12 && child.indexInParent == 1 && child.id == "image") {
                    uiObjectList.push(child)
                }
            }
        }
    }
    return uiObjectList;
}


function getTextView() {
    var root = accessibility.rootOrNull()
    if (root == null) {
        return
    }
    var uiObjectList = new Array()
    var list = root.tree();
    for (let i = 0; i < list.length; i++) {
        var child = list[i];
        if (child.childCount == 0) {
            var x = child.boundsInScreen.centerX
            var y = child.boundsInScreen.centerY
            if ((child.className == "android.widget.TextView")
                && x != 0 && y != 0) {
                uiObjectList.push(child)
            }
        }
    }
    return uiObjectList;
}


/**
 * 点击图片
 * @param {*} imagesPath path
 * @param {*} waitTime ms
 * @returns 
 */
async function clickImages(capturer, imagesPath, waitTime) {
    const template = await readImage(imagesPath);
    var time = waitTime / 1000;
    for (let i = 0; i < time; i++) {
        const img = await capturer.latestImage();
        var point = await findImage(img, template);
        if (point != null) {
            console.log("image===" + imagesPath + "==point" + point)
            click(point.x, point.y)
            break
        }
        await sleep(1000);
    }
}



async function findCaiHongPlanner() {
    for (let m = 0; m < 50; m++) {
        var root = accessibility.rootOrNull()
        if (root == null) {
            return
        }
        var list = getBigImageView();
        var listSize = list.length
        if (list.length > 1) {
            var x = list[listSize - 1].boundsInScreen.centerX
            var y = list[listSize - 1].boundsInScreen.centerY
            console.log("找到了planner" + list[listSize - 1])
            console.log("findCaiHongPlanner  x==" + x + "y==" + y)
            await click(x, y)
            list[listSize - 1].recycle()
            return
        }
        root.recycle()
        await delay(500)

    }
}


async function findGoLook() {
    console.log("进入到了寻找观看按钮的逻辑")
    for (let m = 0; m < 50; m++) {
        var root = accessibility.rootOrNull()
        if (root == null) {
            return
        }
        var list = getTextView();
        for (let i = 0; i < list.length; i++) {
            var myUiObject = list[i]
            if (myUiObject.text == "去观看") {
                click(myUiObject.boundsInScreen.centerX, myUiObject.boundsInScreen.centerY)
                await delay(500)
                myUiObject.recycle()
                return
            }
            myUiObject.recycle()
        }
        root.recycle()
        await delay(500)
    }
}

async function getVideoNumber() {
    for (let m = 0; m < 20; m++) {
        var root = accessibility.rootOrNull()
        if (root == null) {
            return
        }
        var list = getTextView();
        for (let i = 0; i < list.length; i++) {
            var myUiObject = list[i]
            if (myUiObject.text.indexOf("已观看") != -1) {
                var arr = myUiObject.text.split("已观看")
                console.log("arr == " + arr)
                var tem = arr[1].split("/");
                console.log("tem == " + tem)
                var lookNum = tem[0];
                console.log("lookNum == " + lookNum)
                myUiObject.recycle()
                return lookNum;
            }
            myUiObject.recycle()
        }
        root.recycle()
        await sleep(500)
    }
    console.log("getVideoNumber == " + null)
    return null
}


// find 彩虹糖余额 工作页面
async function findWorkPage() {
    var root = accessibility.rootOrNull()
    if (root == null) {
        return false
    }
    var list = root.tree();
    for (let i = 0; i < list.length; i++) {
        var myUiObject = list[i]
        if (myUiObject.text == "彩虹糖余额") {
            return true;
        }
    }
    root.recycle()
    return false
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


module.exports = {
    startZanYou,
    existImages,
    clickImages,
    existImagesList,
    sleep,
    closeVideo,
    closeHomePage,
    findCaihongFind,
    findCaiHongPlanner,
    findGoLook,
    getVideoNumber,
    startCaiHongHezi,
    findSkipAndClick,
    startDuoKaiApp,
    isLogin,
    isContainPage,
    findWorkPage
}