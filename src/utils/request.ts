// 二次封装axios的目的
// 1、利用 请求、响应拦截器
import axios from 'axios';

// 引入用户相关的仓库
import useUserStore from '@/store/modules/user';

// 错误弹窗
import { ElMessage } from 'element-plus';
// 创建axios实例：可以设置基础路径和超时时间
const request = axios.create({
    baseURL:'/api',
    timeout:5000 
});

// 请求拦截器
request.interceptors.request.use((config)=>{
    // 获取用户仓库
    let userStore = useUserStore();
    // token: 公共参数，如果用户登录了需要携带
    if(userStore.userInfo.token){
        config.headers.token = userStore.userInfo.token;
    }

    // 请求拦截器回调的配置对象。
    return config;  //header
})

// 响应拦截器
request.interceptors.response.use((response)=>{
    // 响应拦截器成功的回调
    return response.data;
}, (error) => {
    // console.log(error)
    // 处理http网络错误
    let status = error.response.status; //错误状态码
    console.log('出错了');
    switch(status) {
        case 404:
            // 错误信息提示
            ElMessage({
                type:'error',
                message: '请求失败路径出现问题'
            })
            break;
    }
    return Promise.reject(new Error(error.message))
})

export default request;