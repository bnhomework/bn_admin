<template>
  <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
    <el-form-item :label="$t('Tracking Number')">
      <el-input v-model="searchCondition.TrackingNumber" :placeholder="$t('Tracking Number')"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="searchCondition.region" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSearch">{{$t('Search')}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import baseView from '@/extends/baseView';
export default {
  extends: baseView,
  data() {
    return {
      searchCondition: {
        user: '',
        region: ''
      },
      orders: []
    }
  },
  methods: {
    onSearch() {
      console.log('submit!');
    }
  }
}

</script>
