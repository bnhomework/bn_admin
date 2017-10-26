<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form label-position="top" label-width="80px">
          <el-form-item label="Samples In Project">
            <el-input v-model="formLabelAlign.name"></el-input>
            <el-button type="primary">Load</el-button>
          </el-form-item>
          <el-form-item label="Samples In Queue">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-form label-position="top" label-width="80px" model="top">
          <el-form-item label="Operation Sheet">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="Samples In Queue">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div v-for="r in 9">
          <div>
            <span class="cell-header"><div  class="cell-header">{{r==1?'':String.fromCharCode(r-1+64)}}</div></span>
            <span v-for="c in 12"><div tooltip="aa"  :class="{'cell':r!=1,'cell-header':r==1,'put':c<6}">{{r==1?c:'&nbsp'}}</div></span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import dummy from '@/utils/dummy.js'
export default {
  data() {
    return {
formLabelAlign:{}
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {

    }

  },
  computed: {},
  components: {

  },
  mounted() {

  },
  destory() {}
}

</script>
<style>
.cell-header {
  /*background-color: #235678*/
  font-weight: bold
}

.cell,
.cell-header {
  display: inline-block;
  min-height: 40px;
  line-height: 40px;
  min-width: 40px;
  text-align: center;
  margin: 5px;
}

.cell.put {
  background-color: #1146a1
}

.cell {
  border: 1px solid #0067b1;
  border-radius: 20px;
  cursor: pointer;
}

</style>
