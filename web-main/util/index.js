

const {showToast} = require('toast');

// 处理系统返回按键
let isCanFinish = false;
let isCanFinishTimeout;
function backPressed(webview, {finish}){
    if(webview.canGoBack()){
        webview.goBack();
    }else if(!isCanFinish){
        showToast('连续两次返回键退出应用')
        isCanFinish = true;
        isCanFinishTimeout = setTimeout(() => {
            isCanFinish = false;
        }, 700);
        clearTimeout(isCanFinishTimeout)
    }else{
        clearTimeout(isCanFinishTimeout);
        finish && finish()
    }    
}

const fs = require('fs');
const path = require('path');
async function readAutoJsString(){
    try{
       return await fs.readFileSync(path.join(__dirname,'autojs.js'))
    }catch(e){
        console.error('Error reading', e);
        return ''
    }
}

module.exports = {
    backPressed: backPressed,
    readAutoJsString: readAutoJsString
}