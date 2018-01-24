<template>
  <div>
    <div>{{orderId}}</div>
    <div>{{selectedRows}}</div>
    test qc
  </div>
</template>
<script>
import subView from '@/views/project/subView';
import _ from 'underscore';
export default {
  name: 'qc',
  extends:subView,
  methods:{
  	init(){
  		console.log('init from qc')
  	}
  }
}
</script>
