'nodejs';

require('rhino').install();

const ui = require('ui');
const path = require('path');
const MyWebViewClient = require('./payService/MyWebViewClientClass.js');
const { showToast } = require('toast');
const { backPressed } = require('./util/index.js');
const {start} = require('../main.js')

class WebActivity extends ui.Activity {
    get initialStatusBar() {
        return { color: '#ffffff', light: true };
    }

    get layoutXml() {
        return `
            <vertical>
                <webview id="web" w="*" h="*"/>
            </vertical>
        `
    }

    async onContentViewSet(contentView) {
        this.webview = contentView.binding.web;
        // 监听页面的生命周期，并且监听url变化，实现支付
        await $java.defineClass(MyWebViewClient).catch(console.error)
        const m = new MyWebViewClient(this)
        this.webview.setWebViewClient(m)
        
        // 初始化页面
        this._initializeWebView(this.webview);
    }

    /* 物理返回键 */
    onBackPressed(){
        backPressed(this.webview, {finish: this.finish});
    }

    _initializeWebView(webview) {
        // 加载前端页面
        webview.loadUrl(`http://118.31.32.48:8888/`);

        // 监听WebView的控制台消息，打印到控制台
        webview.on('console_message', (event, msg) => {
            // console.log(`${path.basename(msg.sourceId())}:${msg.lineNumber()}: ${msg.message()}`);
        });       

        const jsBridge = webview.jsBridge;
        jsBridge.handle('run', (event, args)=>{
            showToast('自动执行脚本, 暂时测试关闭后续流程')
            console.log('进入run', event);
            return
            const token = event.arguments.token || ''
            // start(token).catch(console.error)
        })

        jsBridge.handle('finish', () => {
            this.finish()
        })
    }
}



module.exports = WebActivity