<template>
  <div>
    <div>{{orderId}}</div>
    <div class="actions-warpping">
        <span>
            <el-button type="primary" icon="document" @click="exportSample">{{$t('Export')}}</el-button>
            <el-button type="primary" icon="plus" @click="addNewSample">{{$t('New Sample')}}</el-button>
            <el-button type="primary" icon="check" @click="updateSampleStatusToReceived">{{$t('Batch Receive')}}</el-button>
            <el-button type="danger" icon="delete" @click="discardSample">{{$t('Discard')}}</el-button>
            <el-button type="primary" @click="moveSampleToQC">{{$t('QC')}}</el-button>
        </span>
    </div>
    <!-- <el-date-picker v-model="beginDate" type="date" placeholder="选择日期"></el-date-picker> -->
    <el-table :data="dataInGrid" border max-height="600" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :label="$t('Sample#')" width="180" prop="dataName" :render-header="renderCopyDownHeader">
        <template slot-scope="scope">
          <div v-copyable="{dataList:dataInGrid,data:scope.row,property:'dataName'}">
            <pop-edit :v="scope.row.SampleName" @update:v="(v,ctx)=>ctx.$set(scope.row,'SampleName',v)"></pop-edit>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Sample Name')" width="180" property="SampleName" :render-header="renderCopyDownHeader">
        <template slot-scope="scope">
          <div v-copyable="{dataList:dataInGrid,data:scope.row,property:'SampleName'}">
            <pop-edit :v="scope.row.SampleName" @update:v="(v,ctx)=>ctx.$set(scope.row,'SampleName',v)"></pop-edit>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Rec Date')" width="180">
        <template slot-scope="scope">
          <pop-edit type="textarea" :v="scope.row.SampleName" @update:v="(v,ctx)=>ctx.$set(scope.row,'SampleName',v)"></pop-edit>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Receiver')" width="180">
        <template slot-scope="scope">
          <pop-edit type="date-picker" :v="scope.row.ReceiveDate" @update:v="(v,ctx)=>ctx.$set(scope.row,'ReceiveDate',v)"></pop-edit>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Status')" width="180">
        <template slot-scope="scope">
          <pop-edit type="dropdown" :v="scope.row.Status" :dpOptions="enumStatus" @update:v="(v,ctx)=>ctx.$set(scope.row,'Status',v)"></pop-edit>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Shipping')" width="180">
        <template slot-scope="scope">
          <el-button type="text" v-on:click="goToException(scope.row.dataName)">{{ scope.row.Exception }}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Status')" width="180">
        <template slot-scope="scope">{{ scope.row.Inqueue }}</template>
      </el-table-column>
      <el-table-column :label="$t('Status')" width="180">
        <template slot-scope="scope">{{ scope.row.Inqueue }}</template>
      </el-table-column>
      <el-table-column :label="$t('Status')" width="180">
        <template slot-scope="scope">{{ scope.row.Inqueue }}</template>
      </el-table-column>
      <el-table-column :label="$t('Status')" width="180">
        <template slot-scope="scope">{{ scope.row.Inqueue }}</template>
      </el-table-column>
      <el-table-column :label="$t('Status')" width="180">
        <template slot-scope="scope">{{ scope.row.Inqueue }}</template>
      </el-table-column>
      <el-table-column :label="$t('Status')" width="180">
        <template slot-scope="scope">{{ scope.row.Inqueue }}</template>
      </el-table-column>
      <el-table-column :label="$t('Status')" width="180">
        <template slot-scope="scope">{{ scope.row.Inqueue }}</template>
      </el-table-column>
      <el-table-column :label="$t('Status')" width="180">
        <template slot-scope="scope">{{ scope.row.Inqueue }}</template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="function(val){pagesize = val;}" @current-change="function(val){currentPage = val;}" :current-page="currentPage" :page-sizes="[10,50,100, 200]" :page-size="pagesize" layout="total, sizes,->, prev, pager, next, jumper" :total="tableData.length"></el-pagination>
    <div>
      <sample-dialog @update:v="addSampleSuccess" :visible="sampleDialogVisible" @colseDialog="sampleDialogVisible=false"></sample-dialog>
    </div>
  </div>
</template>
<script>
import subView from '@/views/project/subView';
import _ from 'underscore';
import popEdit from '@/components/popEditor.vue';
import copyable from '@/directives/copyable';
import sampleDialog from '@/views/project/sample/sampleDialog.vue';

export default _.extend(subView(),{
  name: 'sample-receive',
  data() {
    return {
      samplepopover: {},
      selctableFalgs: {},
      sampleDialogVisible: false,
      enumStatus: [{ value: '1', label: "a" }, { value: '2', label: "aa" }, { value: '3', label: "aaa" }, { value: '4', label: "aaaa" }]
    }
  },
  props: ['orderId'],
  created() {
    this.init();
  },
  methods: {
    init: function() {
      this.getSamplesByOrderId(this.orderId);
    },
    updateSampleStatusToReceived: function() {},
    moveSampleToQC: function() {},
    discardSample: function() {},
    exportSample: function() {
      console.log(this.selectedRows)
    },
    addNewSample: function() {
      this.sampleDialogVisible = true
    },
    colseSampleDialog() {
      this.sampleDialogVisible = false
    },
    addSampleSuccess(s) {
      console.log(s)
    },
    getSamplesByOrderId: function(id) {
      this.loading = true;
      this.$api.project.LoadSampleInfo(id)
        .then((res) => {
          this.tableData = res.data;
          this.loading = false;
        })
    },
  },
  components: {
    popEdit: popEdit,
    sampleDialog: sampleDialog
  },
  directives: {
    copyable: copyable
  }
})

</script>
<style scoped>
.actions-warpping {
  margin-bottom: 10px;
  float: right;
}

</style>
