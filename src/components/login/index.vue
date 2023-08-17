<template>
    <div class="login_container">
        <!-- title: 对话框左上角的标题 v-model:控制对话框的显示与隐藏 -->
        <el-dialog v-model="userStore.visiable" title="用户登录" ref="dialog" @close="close">
            <!-- 对话框身体部分解构 -->
            <el-row>
                <!-- 左侧解构：收集号码登录、微信扫一扫登录 -->
                <el-col :span="12">
                    <div class="login">
                        <div v-show="scene == 0">
                            <el-form :model="loginParam" :rules="rules" ref="form">
                                <ei-form-item prop="phone">
                                    <el-input placeholder="请输入手机号码" :prefix-icon="User" v-model="loginParam.phone"></el-input>
                                </ei-form-item>
                                <ei-form-item prop="code">
                                    <el-input placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
                                </ei-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone||flag ?true:false" @click="getCode">
                                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag"/>
                                        <span v-else>获取验证码</span>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <el-button style="width: 100%" type="primary" size="default" :disabled="!isPhone" @click="login">用户登录</el-button>
                            <div class="bottom" @click="changeScene">
                                <p>微信扫码登录</p>
                                <svg t="1685263287521" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2450" width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="2451"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="2452"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="webchat" v-show="scene==1">
                            <!-- 在这个容器中显示微信扫码登录页面 -->
                            <div id="login_container"></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="leftContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/images/code_app.png" alt="" />
                                <svg t="1685263287521" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2450" width="16" height="16">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#cdcdcd" p-id="2451"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#cdcdcd" p-id="2452"></path>
                                </svg>
                                <p>微信扫一扫关注</p>
                                <p>“快速预约挂号”</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png" alt="" />
                                <svg t="1685263518283" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="3668" width="16" height="16">
                                    <path
                                        d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                                        fill="#000000" p-id="3669"></path>
                                </svg>
                                <p>扫一扫下载</p>
                                <p>“预约挂号”APP</p>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <template #footer>
                <el-button type="primary" size="default" @click="close">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">

// 引入wx扫码登录参数请求
import {reqWxLogin} from '@/api/hospital'

import { User, Lock } from '@element-plus/icons-vue'
import { ref,reactive,computed,watch } from 'vue';
import type {WXLoginResponseData} from '@/api/hospital/type'

// 引入倒计时组件
import CountDown from '../countdown/index.vue';

// 获取user仓库的数据(visiable)可以控制login组件的对话框显示与隐藏
import useUserStore from "@/store/modules/user";
import { ElMessage } from 'element-plus';
let userStore = useUserStore();
// 定义一个响应式数据控制倒计时组件显示与隐藏
let flag = ref<boolean>(false); // flag如果为真，开启倒计时 

let scene = ref<number>(0); // 0代表收集号码登录 如果是1 微信扫码登录
// 获取form组件实例
let form = ref<any>()
// 收集表单数据--- 手机号码
let loginParam = reactive({
    phone:'', // 收集手机数据
    code:'', // 收集验证码
});
// 计算出当前表单元素收集的内容是否是手机号格式
let isPhone = computed(()=>{
    const reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
    return reg.test(loginParam.phone)
});

// 点击微信扫码登录 | 微信小图标切换为微信扫码登录
const changeScene = async() =>{
    scene.value = 1;
    // 发请求获取微信扫码二维码需要参数
    // 咱们向硅谷学习的服务器发请求，获取微信扫码登录页面参数
    // 还需要携带一个参数：告诉学校服务器用户授权成功以后重定向项目的某一个页面
    let redirect_URL = encodeURIComponent(window.location.origin + '/wxlogin');
    let result:WXLoginResponseData = await reqWxLogin(redirect_URL);
    // 生成微信扫码登录二维码页面
    // @ts-ignore
    new WxLogin({
        self_redirect: true,
        id: "login_container",
        appid: result.data.appid, // 应用表示 appid
        scope: "snsapi_login",
        redirect_uri:result.data.redirectUri,
        state: result.data.state,
        style:"black",
        href: "",
    });
};

// 获取验证码按钮的回调
const getCode = async ()=>{
    // 开启倒计时模式，倒计时组件显示出来
    flag.value = true;

    //通知pinia仓库存储验证码
    try {
        // 获取验证码成功
        await userStore.getCode(loginParam.phone);
        loginParam.code = userStore.code;
    } catch (error) {
        // 获取验证码失败
    }
};

// 计数器子组件绑定的自定义事件
// 当倒计时为0的时候，通知父组件倒计时组件隐藏
const getFlag = (val:boolean)=>{
    // 倒计时模式结束
    flag.value = val;
}

// 点击用户登录按钮回调
const login = async () => {
    // 保证表单校验两项都符合条件
    await form.value.validate();
    // 发起登录请求
    // 登录请求成功：顶部组件需要展示用户名字、对话框关闭
    // 登录请求失败：弹出对应登录失败的错误信息
    try {
        // 用户登录成功
        await userStore.userLogin(loginParam);
        // 关闭对话框
        userStore.visiable = false;
    } catch (error) {
        ElMessage({
            type:'error',
            message:(error as Error).message
        })
    }
};

// 自定义校验规则：手机号码自定义校验规则
const validatorPhone = (value: any, callBack: any) => {
    // rule: 即为表单校验规则对象
    // value:即为当前文本的内容
    // callBack:回调函数
    const reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
    if (reg.test(value)) {
        callBack();
    }else{
        callBack( new Error('请输入正确的手机号码格式') )
    }
}

// 验证码自定义校验规则
const validatorCode = (value: any, callBack: any) => {
    // rule: 即为表单校验规则对象
    // value:即为当前文本的内容
    // callBack:回调函数
    if (/^\d{6}$/.test(value)) {
        callBack();
    }else{
        callBack( new Error('请输入正确的手机号码格式') )
    }
}

// 表单校验的规则对象
const rules = {
    // 手机号校验规则
    // required: 代表当前字段务必进行校验
    // message: 代表的校验错误的提示信息
    // trigger: 代表表单校验触发的时机  change:文本发生变化的时候进行校验 blur:失去焦点的时候触发校验
    // min:代表的是最小位数
    // max:代表的是最大的位置
    // phone:[{required:true, message:"手机校验务必11位",trigger:"change",min:11 }],
    // code: [{required:true, message: "验证码务必6位",trigger: "blur", min: 6 }],

    // element-plus组件中的自定义校验规则
    phone:[{trigger:'change',validator:validatorPhone}],
    code:[{trigger:'change',validator:validatorCode}]
}

// 对话框关闭事件的回调
const close = () =>{
    // 清空收集的数据
    Object.assign(loginParam,{phone:'',code:''});
}

// 监听场景的数据
watch(()=>scene.value,(val:number)=>{
    if(val===1){
        userStore.queryState();
    }
})

</script>

<script lang="ts">

export default {
    name: 'Login'
}

</script>

<style scoped lang="scss">
.login_container {

    // 深度选择器 ,当给组件设置scoped的时候，css样式只会影响到自身，对子组件的内容不会生效，深度选择器就是让样式对子组件生效。
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .login {
        padding: 20px;
        border: 1px solid #ccc;

        .webchat {
            display: flex;
            flex-direction: column;
            align-items: center;

            .phone {
                display: flex;
                flex-direction: column;
                align-items: center;

                p {
                    margin: 10px 0px;
                }
            }
        }
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0px;
        }
    }

    .leftContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    height: 130px;
                }

                p {
                    margin: 5px 0px;
                }
            }
        }
    }

}</style>