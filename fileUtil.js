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
const app = require("app");
const FormData = require("form-data")

async function sendLog() {
    const formData = new FormData();
    // 获取文件
    var endTime = new Date().getTime()
    formData.append("logFile", fs.createReadStream("./video_brush.log"));
    var urlPara = "appInstanceName=" + global.multipleAppName + "&appName=" +
        global.appName + "&startTime=" + global.startTime + "&endTime=" + endTime + "&status=" + global.status
    var encodePara = urlEncode(urlPara)

    const formHeaders = formData.getHeaders();

    axios.post(global.baseUrl + '/script/exec/log?' + encodePara, formData, {
        headers: {
            'Authorization': global.token,
            ...formHeaders,
        },
    })
        .then(response => response)
        .catch(error => {
            console.log(error)
        })
}

function urlEncode(url) {
    url = encodeURIComponent(url);
    url = url.replace(/\%3A/g, ":");
    url = url.replace(/\%2F/g, "/");
    url = url.replace(/\%3F/g, "?");
    url = url.replace(/\%3D/g, "=");
    url = url.replace(/\%26/g, "&");

    return url;
}


module.exports = {
    sendLog,
    urlEncode
}