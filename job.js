// 此项目在project.json指定了type: node，因此所有文件默认以nodejs模式运行
// This project specifies type: node in project.json, so all files run in nodejs mode by default
"nodejs";

const fs = require("fs");
const axios = require("axios");
const util = require("util");
const { requestScreenCapture } = require('media_projection');
const myWork = require("./work.js")
const fileUtil = require("./fileUtil.js")

const { showToast } = require("toast");
const ui = require("ui");
const console = require("console");
const { accessibility, click, home, toggleRecents, swipe, longClick, press, performGesture, performGestures, StrokeDescription, back } = require('accessibility');

const { delay } = require("lang");
const device = require('device');
const { findImage } = require("image");
const context = $autojs.androidContext;
const { addDailyTask } = require("work_manager");
const { createDatastore } = require('datastore');
const app = require("app");

main()

async function main() {
    try {
        myWork.work()
    } catch (error) {
        global.status = "失败"
        console.error(error)
        myWork.writeLogFile(error)
    }
    global.status = "成功"
    fileUtil.sendLog()
}
