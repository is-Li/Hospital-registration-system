// 根组件
<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop />
    <!-- 展示路由组件的区域 -->
    <div class="content">
      <!-- 展示路由组件的区域 -->
      <router-view></router-view>
    </div>
    <HospitalBottom />
    <!-- 登录组件 -->
    <Login/>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request';
import { onMounted } from "vue";

onMounted(() => {
  request.get('/hosp/hospital/1/10').then(res => {
    console.log('APP组件展示获取的数据',res);
  })
});

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    width: 1200px;
    // 最小高度，低于的不在变小
    min-height: 700px;
  }
}
</style>