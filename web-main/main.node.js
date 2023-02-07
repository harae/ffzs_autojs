"ui";

const ui = require('ui');
const { showToast } = require("toast");
require('rhino').install();
const $java = $autojs.java
$java.loadJar('../jar/alipaySdk-20180601.jar').catch(console.error);

// const float_window = require("../float.node.js");
const WebActivity = require("./web_ui.js")

// 主方法启动
async function main(){
    // await float_window.main()
    // 启动页面
    ui.setMainActivity(WebActivity);
}
main().catch(console.error);
