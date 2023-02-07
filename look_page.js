// 此项目在project.json指定了type: node，因此所有文件默认以nodejs模式运行
// This project specifies type: node in project.json, so all files run in nodejs mode by default
"nodejs";

const fs = require("fs");
const axios = require("axios");
const util = require("util");
const { requestScreenCapture } = require('media_projection');
const imageUtil = require("./images.util")

const { showToast } = require("toast");
const ui = require("ui");
const console = require("console");
const { accessibility, click, swipe, longClick, press, performGesture, performGestures, StrokeDescription, back } = require('accessibility');

const { delay } = require("lang");
const device = require('device');
const { findImage } = require("image");
const context = $autojs.androidContext;
const { addDailyTask } = require("work_manager");
const { createDatastore } = require('datastore');
var width = 0;
var height = 0;
const script_config = {
    startDate: '',
    endDate: '',
    multipleAppInfoId: '',
    txtWaitTime: 2,
    txtTotalNum: 5,
    videoNum: 5,
    videoCloseNum: 3,
    continuousWaitNum: 2,
    repetitionNum: 0,
    clearBackground: false,
    intellectualizedJudge: false,
    cron: '',
    adaptationAppName: ''
}

function getScriptConfig() {
    return script_config;
}

// 默认参数
const waitTime = 4000;

async function main() {

    const datastore = createDatastore('data.config');
    var value = await datastore.get("hello");
    console.log("config ===" + value)
    width = device.device.screenWidth;
    height = device.device.screenHeight;
    await accessibility.enableService({
        toast: true
    });
    const capturer = await requestScreenCapture();

    await imageUtil.startZanYou(capturer)
    console.log("startZanYou exec over:");
    await lookPage(capturer)
}



// 回到应用的首页
async function backToPage(capturer) {
    var imagesPathList = getBackImagePaths();
    var point
    while ((point = await imageUtil.existImages(capturer, "./images/my2.png", waitTime)) == false) {
        console.log("backToPage 没有发现主页信息  point = " + point)
        const backPoint = await imageUtil.existImagesList(capturer, imagesPathList, waitTime);
        if (backPoint != false) {
            console.log("backToPage 发现了可关闭的信息  backPoint = " + backPoint)
            await click(backPoint.x, backPoint.y)
            break;
        }
        imageUtil.closeVideo()
        await delay(1000)
    }
    console.log("backToPage 发现到了主页  point " + point)
    imageUtil.closeHomePage()

}

function getBackImagePaths() {
    var imagesPathList = new Array
    imagesPathList.push("./images/cha.png")
    imagesPathList.push("./images/cha2.png")
    imagesPathList.push("./images/cha3.png")
    imagesPathList.push("./images/cha4.png")
    imagesPathList.push("./images/cha5.png")
    imagesPathList.push("./images/back.png")
    imagesPathList.push("./images/back1.png")
    imagesPathList.push("./images/back2.png")
    imagesPathList.push("./images/back3.png")
    imagesPathList.push("./images/back4.png")
    imagesPathList.push("./images/back5.png")
    imagesPathList.push("./images/back6.png")
    imagesPathList.push("./images/back7.png")
    imagesPathList.push("./images/fangqifuli.png")
    imagesPathList.push("./images/skip2.png")
    imagesPathList.push("./images/cancel.png")
    return imagesPathList;
}

// 阅读  361*542   1.21*1.76
// 观看 361 434   1.21*2.20
async function lookPage(capturer) {
    await imageUtil.clickImages(capturer, "./images/find.png", 2000);
    // await imageUtil.clickImages(capturer, "./images/go_read.png", 2000);
    await imageUtil.sleep(2000)
    await click(width / 1.21, height / 1.76)
    console.log("width == " + width / 1.21 + " height ==" + height / 1.76)
    await imageUtil.sleep(1000)
    var config = getScriptConfig();
    for (let index = 0; index < config.txtTotalNum; index++) {
        await swipe(device.device.screenWidth / 2, device.device.screenHeight / 4,
            device.device.screenWidth / 2, device.device.screenHeight / 4 * 3, config.txtWaitTime * 1000)
        await imageUtil.sleep(config.continuousWaitNum * 1000)
    }
    back()
}

// 阅读  361*542   1.21*1.76
// 观看 361 434   1.21*2.20
// 视频叉号 402*96  1.09*9.94
async function lookVideo(capturer) {
    var config = getScriptConfig();
    var list = getBackImagePaths();
    for (let index = 0; index < config.videoNum; index++) {
        await imageUtil.clickImages(capturer, "./images/find.png", 2000);

        await click(width / 1.21, height / 2.20)

        var point
        // while ((point = await imageUtil.existImagesList(capturer, list, 2000)) == false) {
        //     if (await imageUtil.existImages(capturer, "./images/my2.png", 2000) != false) {
        //         break;
        //     }
        //     console.log("lookVideo 没有发现可以关闭的信息啦")
        //     await delay(1000)
        // }
        // console.log("lookVideo 发现可以关闭的信息啦  point = ", point)
        // if (point != false) {
        //     await click(point.x, point.y);
        // }
        await delay(30 * 1000)
        await backToPage(capturer)
        await delay(config.continuousWaitNum * 1000)
    }
}

main().catch(console.error);
