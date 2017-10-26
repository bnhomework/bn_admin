<template>
  <div>
    <div>
</div>
<el-row :gutter="20">
  <el-col :span="12" :offset="6">
  <el-input placeholder=" scan project number" v-model="input3">
    <template slot="prepend">Project Number</template>
  </el-input></el-col>
</el-row>

        <div> &nbsp </div>
        <div> &nbsp </div>
     <el-transfer
    v-model="value3"
    filterable
    :left-default-checked="[2, 3]"
    :right-default-checked="[1]"
    :titles="['Public Queue', 'My Queue']"
    :button-texts="[ 'Move To Public Queue','Move To My Queue']"
    :footer-format="{
      noChecked: '${total}',
      hasChecked: '${checked}/${total}'
    }"
    @change="handleChange"
    :data="samplelist">
    <el-button class="transfer-footer" slot="left-footer" size="small">Remove</el-button>
    <!-- <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
  </el-transfer>
  </div>
</template>
<script>
import dummy from '@/utils/dummy.js'
export default {
  data() { 
    return {
        value3: [1],
      filterOptions: [{ value: 'All' }, { value: 'Project Name' }, { value: 'Account' }],
      priorityOptions: [{ value: 'Standard' }, { value: 'High' }, { value: 'Low' }],
      selectedPriority: 'Standard',
      selectedFilterOption: 'All',
      filterValue: '',
      cdate: '2017-10-23',
      Jennifer:'Jennifer',
      showNewProject: true,

      selectedProject: '',
      tableData: dummy.samples,
      projects: dummy.projects,
      points: [],
      input3: '',
      input4: '',
      input5: '',
      select: ''
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {

    },
        renderFunc(h, option) {
          return `<span>${ option.samplename } - ${ option.primername }</span>`;
        },handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      }

  },
  computed: {
    samplelist(){
     return dummy.samples.map(function(s,i){
        return {key:i,label:s.samplename+'_'+s.primername}
      })
    }
  },
  components: {

  },
  mounted() {

  },
  destory() {}
}

</script>
<style>
.el-transfer-panel{
  width: 40%
}
.el-transfer-panel__body{
    height: 430px
}
.el-transfer-panel__list.is-filterable{
  height: 400px
}
</style>
