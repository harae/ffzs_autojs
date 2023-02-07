'ui';
const ui = require('ui');
const path = require('path');
require('rhino').install();
const $java = $autojs.java
$java.loadJar('../jar/alipaySdk-20180601.jar')
const H5PayCallback = com.alipay.sdk.app.H5PayCallback
const PayTask = com.alipay.sdk.app.PayTask;
const WebView = android.webkit.WebView;
const WebViewClient = android.webkit.WebViewClient;
const CookieManager = android.webkit.CookieManager;
const Intent = android.content.Intent;
const LinearLayout = android.widget.LinearLayout;
const LayoutParams = android.widget.LinearLayout.LayoutParams;
const Build = android.os.Build;
const console = require('console');
const { showToast } = require("toast");
const Window = android.view.Window;
const TextUtils = android.text.TextUtils;
const Uri = android.net.Uri;



// class MyRunnable extends Runnable {
//     run(){
        
//     }
// }

class MyH5PayCallback extends H5PayCallback{
    constructor(instance){
        super();
        this.PayTask = instance
    }
    onPayResult(result){
        console.log('支付result：',result)
        const url = result.getReturnUrl();
        console.log('支付返回的URL：', url)

        if (!TextUtils.isEmpty(url)) {
            // PayDemoActivity.runOnUiThread(new Runnable() {
            //     public void run() {
            //         view.loadUrl(url);
            //     }
            // });
        }
    }
}

class MyWebViewClient extends WebViewClient {
    constructor(instance) {
        super();
        this.PayActivity = instance;
    }

    onPageStarted(view, url, favicon) {
        console.log("onPageStarted");
    }

    onPageFinished(view, url) {
    console.log("onPageFinished");
    }

    shouldOverrideUrlLoading(webview, urlJava){
        const context = this.PayActivity;
        const url = urlJava.getUrl().toString()
        // ------  对alipays:相关的scheme处理 -------
        if(url.startsWith("alipays:") || url.startsWith("alipay")) {
            try {
                context.startActivity(new Intent("android.intent.action.VIEW", Uri.parse(url)));
            } catch (error) {
                console.warn(error, 'error')
                showToast("未检测到支付宝客户端，请安装后重试。")
                // new AlertDialog.Builder(context)
                //         .setMessage("未检测到支付宝客户端，请安装后重试。")
                //         .setPositiveButton("立即安装", new DialogInterface.OnClickListener() {
                //             @Override
                //             public void onClick(DialogInterface dialog, int which) {
                //                 Uri alipayUrl = Uri.parse("https://d.alipay.com");
                //                 context.startActivity(new Intent("android.intent.action.VIEW", alipayUrl));
                //             }
                //         }).setNegativeButton("取消", null).show();
            }
            return true;
        }

        if (!(url.startsWith("http") || url.startsWith("https"))) {
            return true;
        }

        const task = new PayTask(this.PayActivity)
        const isIntercepted = task.payInterceptorWithUrl(url, true, new MyH5PayCallback(this))
        console.log('runOnUiThread：',this.PayActivity.runOnUiThread)

        webview.loadUrl(url);

        return true;
    }
}



class PayDemoActivity extends ui.Activity {
    constructor(){
        super();
        this.orderInfo = ''
    }

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
        const m = new MyWebViewClient(this)
        this.webview.setWebViewClient(m)
        const url = `file://${path.join(__dirname, 'dist')}/index.html`
        this.webview.loadUrl(url);
        //  // 监听WebView的控制台消息，打印到控制台
        this.webview.on('console_message', (event, msg) => {
            console.log(`${path.basename(msg.sourceId())}:${msg.lineNumber()}: ${msg.message()}`);
        });
    }
}

async function main(){
    await $java.defineClass(MyWebViewClient);
    ui.setMainActivity(PayDemoActivity)
}

main().catch(console.log);
console.log(new PayDemoActivity())

