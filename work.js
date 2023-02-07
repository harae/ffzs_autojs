// 此项目在project.json指定了type: node，因此所有文件默认以nodejs模式运行
// This project specifies type: node in project.json, so all files run in nodejs mode by default
"nodejs";

const fs = require("fs");
const axios = require("axios");
const util = require("util");
const { requestScreenCapture } = require('media_projection');
const imageUtil = require("./images.util")
const fileUtil = require("./fileUtil")

const { showToast } = require("toast");
const ui = require("ui");
const console = require("console");
const { accessibility, click, home, toggleRecents, swipe, longClick, press, performGesture, performGestures, StrokeDescription, back, currentPackage } = require('accessibility');

const { delay } = require("lang");
const device = require('device');
const { findImage } = require("image");
const context = $autojs.androidContext;
const { addDailyTask } = require("work_manager");
const { createDatastore } = require('datastore');
const app = require("app");

global.datastore = createDatastore('./data.config');

var width = 0;
var height = 0;
global.adaptationPackageName = "com.caihonghezi.www";
global.multiplePackageName = "com.excelliance.dualaid";
global.isStandalone = true
global.multipleAppId = 7
global.script_config = {
    startDate: '',
    endDate: '',
    appId: 1,
    multipleAppIds: [7],
    txtWaitTime: 2,
    txtTotalNum: 5,
    videoNum: 5,
    videoCloseNum: 5,
    continuousWaitNum: 2,
    repetitionNum: 0,
    // 是否清理后台，默认清理后台 0 不清理 1 清理
    clearBackground: 1,
    intellectualizedJudge: false,
    cron: '',
    adaptationAppName: '彩虹盒子',

}

// 默认参数
const waitTime = 4000;
global.token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3JvbGUiOiJtZW1iZXIiLCJteV90aW1lIjoxNjczOTYzMzA3MTE2LCJ1c2VyX2lkIjoyLCJ1c2VyX3Bob25lIjoiMTgwMzU5MTgzNzEiLCJleHAiOjE2NzQwMDY1MDd9.aKY7bxo6kbvI0aXzfp7zdLSbK2afRPq_peyQ9PfLChYsHwST2VTjEPrREDUrigmct3_Trh26hf8zFCNbz7NzWw"
global.baseUrl = "http://118.31.32.48:8080/"
global.appName = ""
global.multipleAppName = ""
global.startTime = ""
global.status = "运行中"
global.instanceNum = 0

async function work() {
    width = device.device.screenWidth;
    height = device.device.screenHeight;
    while (accessibility.enabled != true) {
        await accessibility.enableService({
            toast: true
        })
    }


    if (await vaildMember() != true) {
        showToast("你还不是会员，请充值会员")
        return
    }

    // 创建本地存储，其名称为example.test

    global.startTime = new Date().getTime()

    var resConfig = await getScriptConfig()
    if (resConfig != null) {
        global.script_config = resConfig
    }
    global.appName = global.script_config.adaptationAppName
    var multipleAppInfoList = await getMultipleInfo(global.script_config.multipleAppIds)

    console.log(global.script_config)
    writeLogFile(global.script_config);

    // 程序开始跑
    await closeBakground()

    for (let i = 0; i < multipleAppInfoList.length; i++) {
        global.multiplePackageName = multipleAppInfoList[i].packageName
        global.multipleAppName = multipleAppInfoList[i].appName
        global.multipleAppId = multipleAppInfoList[i].id
        console.log("%j 开始运行", global.multipleAppName)
        writeLogFile(resConfig)
        await execScript()
        await delay(1000)
        console.log("%j 运行结束", global.multipleAppName)
    }
}

async function execScript() {
    // console.log("versions:", process.versions);
    var list = new Array()
    switch (global.multiplePackageName) {
        case "com.excelliance.dualaid":
        case "com.qihoo.magic":
            // case "cn.chuci.and.wkfenshen":
            await imageUtil.startDuoKaiApp(global.multiplePackageName);
            while (!await imageUtil.isContainPage()) {

            }
            list = await getNoStandalonePackage();
            console.log("app list = %j", list)
            writeLogFile(list)
            await doNoStandalonePackage(list)
            break;
        case "com.bly.dkplat":
            list = await getStandalonePackage("dkplugin", "com.bly.dkplat");
            console.log("package list = %j", list)
            await doStandalonePackage(list)
            break;
        default:
            console.log("暂不支持这种多开app");
            return;
    }

}

// 双开助手微分身版 com.excelliance.dualaid
// 分身大师多开软件 com.qihoo.magic
// 猴子分身 cn.chuci.and.wkfenshen
// 小x分身 com.bly.dkplat
async function getAllCaiHongHezi() {



}
async function doNoStandalonePackage(points) {
    global.isStandalone = false
    for (let m = 0; m < global.script_config.repetitionNum + 1; m++) {
        for (let i = 0; i < points.length; i++) {
            let tmp = i + 1
            if (await queryIntanceStatus(tmp) == true) {
                showToast("实例" + tmp + "  今天该实例已经看过了，自动跳过")
                console.log("实例" + tmp + "  今天该实例已经看过了，自动跳过")
                await delay(1000);

            } else {
                showToast("实例" + tmp + "  正在执行")
                console.log("实例" + tmp + "  正在执行")
                await delay(500);
                global.instanceNum = points[i].instanceNum
                // 如果卡在了当前页，一直等待
                while (await imageUtil.isContainPage()) {
                    await click(points[i].x, points[i].y)
                }
                await lookVideo(tmp);
                await imageUtil.startDuoKaiApp(global.multiplePackageName);
                await delay(1000)
            }

        }
    }
}

async function doStandalonePackage(points) {
    global.isStandalone = true
    for (let m = 0; m < global.script_config.repetitionNum + 1; m++) {
        for (let i = 0; i < points.length; i++) {
            let tmp = i + 1
            if (await queryIntanceStatus(tmp) == true) {
                showToast("实例" + tmp + "  今天该实例已经看过了，自动跳过")
                console.log("实例" + tmp + "  今天该实例已经看过了，自动跳过")
                await delay(1000);

            } else {
                showToast("实例" + tmp + "  正在执行")
                console.log("实例" + tmp + "  正在执行")
                await delay(500);
                // 如果卡在了当前页，一直等待
                var res = app.launch(points[i])
                console.log("package = %j,res = %j ", points[i], res)
                await delay(500)
                await lookVideo(tmp);
            }

        }
    }
}

async function getNoStandalonePackage() {
    while (true) {
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
                if (child.text != null && child.text != '' && child.text.indexOf("彩虹盒子") != -1) {
                    console.log("发现彩红盒子坐标  x==", x + "y==", y)
                    num += 1
                    if (child.packageName == "com.qihoo.magic") {
                        y = child.parent.parent.boundsInScreen.centerY
                    }
                    var point = { "instanceNum": num, "x": x, "y": y }
                    points.push(point)
                }
            }
        }

        if (currentPackage(false) == global.multiplePackageName) {
            return points.reverse()
        }
    }
}

// 适配小x分身
async function getStandalonePackage(packageLikeName, packageName) {
    var packages = app.getInstalledPackages({
        get: ["meta_data"],
        match: []
    })
    var list = new Array()
    for (let i = 0; i < packages.length; i++) {
        if (packages[i].packageName.indexOf(packageLikeName) != -1 && packages[i].packageName != packageName) {
            list.push(packages[i].packageName)
        }
    }
    list.reverse
    return list
}



async function lookVideo(index) {
    // await imageUtil.startCaiHongHezi();
    // 点击跳过
    await delay(500)
    console.log("点击跳过")
    writeLogFile("点击跳过")
    await imageUtil.findSkipAndClick()

    // 处理特殊情况  直接到了去观看页面
    var vm
    while ((vm = await imageUtil.findWorkPage()) == true) {
        if (await imageUtil.getVideoNumber() == global.script_config.videoCloseNum) {
            showToast('今日视频已看完');
            await closeBakground()
            updateIntanceStatus(index, "已运行");
            if (global.isStandalone == false) {
                await imageUtil.startDuoKaiApp(global.multiplePackageName);
                await delay(1000)
            }
            return
        }

        // 去观看
        console.log("寻找观看页面")
        writeLogFile("寻找观看页面")
        await imageUtil.findGoLook()
        console.log("开始观看视频")
        writeLogFile("开始观看视频")
        await delay(20000)
        await imageUtil.closeVideo()
        await delay(500)
        return
    }

    await delay(1000)

    // 判断是否有登录状态，如果没有则记录当前实例的状态，下次直接跳过
    var scriptLoginStatus = await imageUtil.isLogin()
    if (scriptLoginStatus == false) {
        showToast("该实例未登录，即将跳过")
        writeLogFile("该实例未登录，即将跳过")
        updateIntanceStatus(index, "未运行");
        if (global.isStandalone == false) {
            await imageUtil.startDuoKaiApp(global.multiplePackageName);
            await delay(50)
        }
        return
    }


    // 找到find并点击
    console.log("找到find并点击")
    writeLogFile("找到find并点击")
    await imageUtil.findCaihongFind();

    // 找到彩虹计划并点击
    console.log("找到彩虹计划并点击")
    writeLogFile("找到彩虹计划并点击")
    await imageUtil.findCaiHongPlanner();

    while (await imageUtil.getVideoNumber() != global.script_config.videoCloseNum) {
        console.log("开始观看视频")
        writeLogFile("开始观看视频")
        // 去观看
        console.log("去观看")
        await imageUtil.findGoLook()
        await delay(20000)
        await imageUtil.closeVideo()
        await delay(500)

    }

    showToast('今日视频已看完');
    await closeBakground()
    updateIntanceStatus(index, "已运行");

}


async function closeBakground() {
    if (global.script_config.clearBackground == 1) {
        toggleRecents()
        delay(500)
        for (let m = 0; m < 20; m++) {
            var root = accessibility.rootOrNull()
            if (root == null) {
                console.error("没有找到root")
                return
            }
            var list = root.tree();
            for (let i = 0; i < list.length; i++) {
                var child = list[i];
                if (child.childCount == 0 && "clear_all_recents_image_button" == child.id) {
                    var x = child.boundsInScreen.centerX
                    var y = child.boundsInScreen.centerY
                    console.log("closeBakground x==" + x + "y==" + y)
                    await click(x, y)
                    await delay(1000)
                    return
                }
            }
        }
        await delay(500)
    }
}

function writeLogFile(msg) {
    msg = new Date() + "[multipleAppName : " + multipleAppName + "]" + " [appName : " + appName + " ] " + msg + " \n"
    // msg = new Date() + "[multipleAppName : " + multipleAppName + "]" + " [appName : " + appName + " ] " + msg + " \n"
    fs.appendFile("./video_brush.log", msg, 'UTF-8', function (err) {
        // 如果err为true，则文件写入失败，并返回失败信息
        if (err) {
            return console.log('文件写入失败！' + err.message)
        }
    })
}


async function vaildMember() {
    try {
        const res = await axios.get(global.baseUrl + '/user', {
            headers: {
                'Authorization': token
            }
        });
        console.log(res.data)
        if (res.data.data.type == "member") {
            return true
        }
    } catch (e) {
        console.error(e);
    }
    return false
}


async function updateIntanceStatus(index, execStatus) {
    try {
        const res = await axios.post(global.baseUrl + '/app/multiple/instance',
            {
                "adaptationAppName": global.appName,
                "instanceName": global.multipleAppName + "_" + global.appName + "_" + index,
                "multipleAppInfoId": global.multipleAppId,
                "packageName": global.adaptationPackageName,
                "status": execStatus,
                "userName": "",
                "userPwd": ""
            },
            {
                headers: {
                    'Authorization': global.token,
                    'Content-Type': 'application/json'
                }
            });
        console.log('updateIntanceStatus == %j', res.data)
        console.log('%j', res.data)
        if (res.data.code == 200) {
            return true
        }
    } catch (e) {
        console.error(e);
    }
    return false
}

async function login(phone, pwd) {
    try {
        const res = await axios.post(global.baseUrl + '/user/login',
            {
                "phone": phone,
                "password": pwd
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        console.log('login == %j', res.data)
        if (res.data.code == 200) {
            return res.data.data.token
        }
    } catch (e) {
        console.error(e);
    }
    return false
}


// true 已经运行过 false 为还未运行
async function queryIntanceStatus(index) {
    try {
        var para =
            "adaptationAppName=" + encodeURI(global.appName) +
            "&instanceName=" + encodeURI(global.multipleAppName + "_" + global.appName + "_" + index) +
            "&multipleAppInfoId=" + encodeURI(global.script_config.multipleAppIds) +
            "&packageName=" + encodeURI(global.adaptationPackageName)
        console.log(global.baseUrl + '/app/multiple/instance?' + para)
        const res = await axios.get(global.baseUrl + '/app/multiple/instance?' + para,
            {
                headers: {
                    'Authorization': global.token
                }
            });
        console.log('%j', res.data)
        writeLogFile(res.data)
        if (await res.data.code == 0) {
            if (res.data.data == null || res.data.data.length == 0) {
                return false
            } else {
                if (res.data.data[0].status == "已运行") {
                    console.log("实例 " + index + "走跳过逻辑")
                    return true;
                } else {
                    return false;
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
    return false
}


async function getScriptConfig() {

    try {
        const res = await axios.get(global.baseUrl + '/config/script', {
            headers: {
                'Authorization': global.token
            }
        });
        var config = res.data.data[0]
        console.log(config)
        if (config != null) {
            return config.scriptConfig
        }
    } catch (e) {
        console.error(e);
    }
    return null
}

async function getMultipleInfo(multipleAppIds) {

    try {
        const res = await axios.get(global.baseUrl + '/app/multiple', {
            headers: {
                'Authorization': global.token
            }
        });
        var multipleAppInfo = res.data.data
        var myMultipleAppInfo = new Array()
        var multipleAppIds = eval(multipleAppIds)
        if (multipleAppInfo != null) {
            for (let i = 0; i < multipleAppInfo.length; i++) {
                for (let j = 0; j < multipleAppIds.length; j++) {
                    if (multipleAppInfo[i].id == multipleAppIds[j]) {
                        myMultipleAppInfo.push(multipleAppInfo[i])
                    }
                }
            }
            return myMultipleAppInfo.reverse()
        }
    } catch (e) {
        console.error(e);
    }
    return null
}





// // 回到应用的首页
// async function backToPage(capturer) {
//     var imagesPathList = getBackImagePaths();
//     var point
//     while ((point = await imageUtil.existImages(capturer, "./images/my2.png", waitTime)) == false) {
//         console.log("backToPage 没有发现主页信息  point = " + point)
//         const backPoint = await imageUtil.existImagesList(capturer, imagesPathList, waitTime);
//         if (backPoint != false) {
//             console.log("backToPage 发现了可关闭的信息  backPoint = " + backPoint)
//             await click(backPoint.x, backPoint.y)
//             break;
//         }
//         imageUtil.closeVideo()
//         await delay(1000)
//     }
//     console.log("backToPage 发现到了主页  point " + point)
//     imageUtil.closeHomePage()

// }

// // 阅读  361*542   1.21*1.76
// // 观看 361 434   1.21*2.20
// async function lookPage(capturer) {
//     await imageUtil.clickImages(capturer, "./images/find.png", 2000);
//     // await imageUtil.clickImages(capturer, "./images/go_read.png", 2000);
//     await imageUtil.sleep(2000)
//     await click(width / 1.21, height / 1.76)
//     console.log("width == " + width / 1.21 + " height ==" + height / 1.76)
//     await imageUtil.sleep(1000)
//     var config = getScriptConfig();
//     for (let index = 0; index < config.txtTotalNum; index++) {
//         await swipe(device.device.screenWidth / 2, device.device.screenHeight / 4,
//             device.device.screenWidth / 2, device.device.screenHeight / 4 * 3, config.txtWaitTime * 1000)
//         await imageUtil.sleep(config.continuousWaitNum * 1000)
//     }
//     back()
// }

// 阅读  361*542   1.21*1.76
// // 观看 361 434   1.21*2.20
// // 视频叉号 402*96  1.09*9.94
// async function lookVideo(capturer) {
//     var config = getScriptConfig();
//     var list = getBackImagePaths();
//     for (let index = 0; index < config.videoNum; index++) {
//         await imageUtil.clickImages(capturer, "./images/find.png", 2000);

//         await click(width / 1.21, height / 2.20)

//         var point
//         // while ((point = await imageUtil.existImagesList(capturer, list, 2000)) == false) {
//         //     if (await imageUtil.existImages(capturer, "./images/my2.png", 2000) != false) {
//         //         break;
//         //     }
//         //     console.log("lookVideo 没有发现可以关闭的信息啦")
//         //     await delay(1000)
//         // }
//         // console.log("lookVideo 发现可以关闭的信息啦  point = ", point)
//         // if (point != false) {
//         //     await click(point.x, point.y);
//         // }
//         await delay(30 * 1000)
//         await backToPage(capturer)
//         await delay(config.continuousWaitNum * 1000)
//     }
// }

module.exports = {
    work,
    vaildMember,
    getScriptConfig,
    getMultipleInfo,
    writeLogFile,
    closeBakground,
    login

}
