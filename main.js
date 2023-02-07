// 此项目在project.json指定了type: node，因此所有文件默认以nodejs模式运行
// This project specifies type: node in project.json, so all files run in nodejs mode by default
"nodejs";

const power_manager = require("power_manager");
const ui = require('ui');
const path = require('path');
const { showToast } = require("toast");
const console = require("console");
const { accessibility } = require('accessibility');
const { Deferred } = require("lang");
const device = require('device');
const work_manager = require("work_manager");
const { createDatastore } = require('datastore');
const myWork = require("./work.js");
// const float_window = require("./float.node.js");
const fileUtil = require("./fileUtil")
const config = require('./config/index.js')

const plugins = require("plugins");

const getToken = new Deferred();

global.datastore = createDatastore('./data.config');

var width = 0;
var height = 0;
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
global.token = ""
global.baseUrl = config.baseUrl
global.appName = ""
global.multipleAppName = ""
global.startTime = ""
global.status = "运行中"
global.instanceNum = 0
global.version = "1.0.0"


async function main() {
    width = device.device.screenWidth;
    height = device.device.screenHeight;
    while (accessibility.enabled != true) {
        await accessibility.enableService({
            toast: true
        })
    }

    // await float_window.main()
    // ui.startActivity(WebActivity)

}

async function start(token) {
    global.token = token
    if (await myWork.vaildMember() != true) {
        showToast("你还不是会员，请充值会员")
        return
    }

    // 创建本地存储，其名称为example.test

    global.startTime = new Date().getTime()

    var resConfig = await myWork.getScriptConfig()
    if (resConfig != null) {
        global.script_config = resConfig
    }

    try {
        if (global.script_config.cron != undefined && global.script_config.cron != '' && global.script_config.cron != null) {
            while (!power_manager.isIgnoringBatteryOptimizations()) {
                console.log("未开启忽略电池优化");
                power_manager.requestIgnoreBatteryOptimizations();
            }
            var cornStr = global.script_config.cron;
            var strSplit = cornStr.split(",")
            if (strSplit.length == 6) {
                var file = process.cwd() + "/job.js";
                console.log(file);
                const tasks = await work_manager.queryTimedTasks({
                    path: file
                });
                console.log("定时任务" + tasks)
                tasks.forEach(t => {
                    console.log("delete:", t);
                    console.log(work_manager.removeTimedTask(t.id));
                });
                await work_manager.addDailyTask({
                    path: file,
                    time: new Date(0, 0, 0, strSplit[3], strSplit[4], strSplit[5]),
                    // time: new Date(0, 0, 0, 19, 51, 0),
                }).then(task => console.log(task));
                showToast(cornStr + "定时任务添加成功")
            } else {
                showToast(cornStr + "定时任务配置有误")
                myWork.writeLogFile(cornStr + "定时任务配置有误")
            }
            return
        }
    } catch {
        showToast(cornStr + "定时任务配置有误")
        console.log("添加定时任务出现异常")
        return
    }

    // 程序开始跑
    await myWork.closeBakground()

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

// 显示Web的界面
class WebActivity extends ui.Activity {
    get initialStatusBar() { return { color: '#ffffff', light: true } }

    get layoutXml() {
        return `
        <vertical>
            <input id="phone" hint="请输入手机号" text="18035918371"/>
            <input id="pwd" hint="请输入密码" text="hzj123456"/>
            <button id="login" text="登录"/>
            <button id="pay" text="支付"/>
            <webview id="web" w="*" h="*"/>
        </vertical>`
    }

    onContentViewSet(contentView) {
        this.webview = contentView.findView('web');
        // 监听WebView的控制台消息，打印到控制台
        this.webview.on('console_message', (event, msg) => {
            console.log(`${path.basename(msg.sourceId())}:${msg.lineNumber()}: ${msg.message()}`);
        });

        this.loginBtn = contentView.findView('login');
        this.loginBtn.on('click', (event, msg) => {
            console.log(event, msg);

            this.phone = contentView.findView('phone');
            this.pwd = contentView.findView('pwd');
            var phoneValue = this.phone.getText().toString()
            var pwdValue = this.pwd.getText().toString()
            console.log("phoneValue==%j", phoneValue)
            console.log("pwdValue==%j", pwdValue)
            var token = myWork.login(phoneValue, pwdValue)
            getToken.resolve(token)
            getToken.promise().then(token => {
                if (token == false) {
                    return
                }
                global.token = token
                start()
            })
        });

        this.payBtn = contentView.findView('pay');
        this.payBtn.on('click', (event, msg) => {
            console.log(event, msg)
            callAlipay()
        })
    }
}

async function callAlipay(){
    try{
        const alipay = await plugins.load("com.alipay.sdk.pay.demo");
        let res = await alipay.pay("dsadsadsad")

        console.log(res)
    }catch(e){
        console.warn(2, e)
    }
}

// main().catch(console.error);
module.exports = {
    start: start
}