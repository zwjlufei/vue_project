import {Toast,MessageBox} from 'mint-ui'
import axios from "axios/index";
import Vue from 'vue'
var vue = new Vue
export function toast(title,duration){
    Toast({
        message: title,
        duration: duration?duration:2000
    });
}

export function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function GetToken() {
    var URL = 'http://test.www.ayi800.com'
    var token = {}
    return new Promise((resolve,reject)=>{
        axios(`${URL}/j/s/n`)
            .then(res=>{
                token.name = res.data
                axios(`${URL}/j/s/t`)
                    .then(res=>{
                        token.value = res.data
                        resolve(token)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            })
            .catch(err=>{
                console.log(err);
            })

    })

}

export function user_status() {
    var user_id = JSON.parse(sessionStorage.getItem('user_id' || []))
    return new Promise((resolve,reject)=>{
        if (!user_id.customer_id || user_id.customer_id == 0){
            MessageBox.confirm('亲，您还没有注册，赶快去注册吧').then(action => {
                reject(user_id.openid)
            }).catch(()=>{})
        }else{
            resolve(user_id)
        }
    })
}

export function timeout(err){
    if(err.request.readyState == 4 && err.request.status == 0){
        toast('请求超时')
    }
}

export function title(title){
    document.title = title
}

