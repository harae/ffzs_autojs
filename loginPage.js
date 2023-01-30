"ui";

const ui = require('ui');
const fs = require('fs');
const { myEngine } = require('engines');
const path = require('path');
const {
    exec,
    createShell
} = require('shell');
const { Deferred } = require('lang');

const getUrl = new Deferred();

// 显示Web的界面
class WebActivity extends ui.Activity {
    get initialStatusBar() { return { color: '#ffffff', light: true } }

    get layoutXml() {
        return `
        <vertical>
            <webview id="userName" w="*" h="*"/>
            <webview id="pwd" w="*" h="*"/>
            <Button id="web" w="*" h="*"/>
        </vertical>`
    }

    onContentViewSet(contentView) {
        this.webview = contentView.findView('web');
        // 监听WebView的控制台消息，打印到控制台
        this.webview.on('console_message', (event, msg) => {
            console.log(`${path.basename(msg.sourceId())}:${msg.lineNumber()}: ${msg.message()}`);
        });
        getUrl.promise().then(url => {
            console.log(`loadUrl:`, url);
            this.webview.loadUrl(url);
        });
    }
}

// 调试模式显示的加载与日志页面
class LoadingActivity extends ui.Activity {
    get initialStatusBar() { return { color: '#ffffff', light: true } }

    get layoutXml() {
        return `
<vertical>
    <progressbar id="progressbar" indeterminate="true" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
    <globalconsole id="console" w="*" h="*"/>
</vertical>
`
    }

    onCreate(savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 一旦url已准备好加载，就结束本页面
        getUrl.promise().then(() => this.finish());
    }
}

// ui.activityLifecycle.on('all_activities_destroyed', () => {
//     process.exit();
// });