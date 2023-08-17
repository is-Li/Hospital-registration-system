<template>
  <div class="search">
    <el-autocomplete
        @select="goDetail"
        :trigger-on-focus="false"
        clearable
        placeholder="请你输入医院名称"
        class="form"
        v-model="hosname"
        :fetch-suggestions="fetchData"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
// 引入element-plus提供图标
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
// 引入请求方法
import { reqHospitalInfo } from "@/api/home";
import type { HospitalInfo } from "@/api/home/type";
import { ref } from "vue";

//创建路由器对象
let $router = useRouter();

//获取搜索框中输入的数据
let hosname = ref<string>("");
//根据用户的输入值获取相应的后台数据，然后设置成需要分格式，然后进行展示在搜索的时候(相关搜索)
const fetchData = async (keyword: string, cb: any) => {
  //当用户输入完关键字次函数会执行一次，发请求获取需要展示的数据即可
  let result: HospitalInfo = await reqHospitalInfo(keyword);
  //整理数据，变成人家组件需要数据格式
  let showData = result.data.map((item) => {
    return {
      value: item.hosname, //展示的医院的名字
      hoscode: item.hoscode, //存储医院的编码
    };
  });
  console.log(result.data);
  //给组件提供展示的户数
  cb(showData);
};

//点击某一个推荐项
const goDetail = (item: any) => {
  //点击推荐项目进入医院详情页,将来需要携带query参数(医院的编码)
  $router.push({ path: "/hospital/register",query:{hoscode:item.hoscode}});
};

</script>

<script lang="ts">
export default {
  name: "Search",
};
</script>

<style lang="scss" scoped>
// 深度选择器：为了修改第三方插件的样式(由于scoped的限制，本组件的样式只能影响本组件)
// 原生 >>>  less /deep/ scss ::v-deep 

.search{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;

  ::v-deep(.el-input__wrapper){
    width: 600px;
    margin-right: 10px;
  }
}

</style>