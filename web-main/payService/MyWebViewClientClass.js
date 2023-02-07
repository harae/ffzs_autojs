
'nodejs'

require('rhino').install();

const WebViewClient = android.webkit.WebViewClient;
const { readAutoJsString } = require('../util/index.js');
const Uri = android.net.Uri;
const Intent = android.content.Intent;
const { showToast } = require("toast");
const H5PayCallback = com.alipay.sdk.app.H5PayCallback
const PayTask = com.alipay.sdk.app.PayTask;
const TextUtils = android.text.TextUtils;

// class MyH5PayCallback extends H5PayCallback{
//     constructor(instance){
//         super();
//         this.PayTask = instance
//     }
//     onPayResult(result){
//         console.log('支付result：',result)
//         const url = result.getReturnUrl();
//         console.log('支付返回的URL：', url)

//         if (!TextUtils.isEmpty(url)) {
//             // PayDemoActivity.runOnUiThread(new Runnable() {
//             //     public void run() {
//             //         view.loadUrl(url);
//             //     }
//             // });
//         }
//     }
// }

class MyH5PayCallback {}


class MyWebViewClient extends WebViewClient {
    constructor(instance) {
        super();
        this.PayActivity = instance;
    }

    onPageStarted(view, url, favicon) {
        console.log("onPageStarted");
    }

    async onPageFinished(view, url) {
        console.log("onPageFinished");
        const fileString = await readAutoJsString().catch(console.error)
        console.log(fileString);
        view.loadUrl("javascript:"+ fileString)
        console.log("插入javascript完成");
    }

    shouldOverrideUrlLoading(webview, urlJava){
        const context = this.PayActivity;
        const url = urlJava.getUrl().toString()
        console.log("------监听页面内Url--------：", url);

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

        // await $java.defineClass(MyH5PayCallback);
        // const task = new PayTask(this.PayActivity)
        // const isIntercepted = task.payInterceptorWithUrl(url, true, new MyH5PayCallback(this))
        // todo callback 还没写完
        // console.log('runOnUiThread：',this.PayActivity.runOnUiThread)

        webview.loadUrl(url);

        return true;
    }
}


module.exports = MyWebViewClient;


