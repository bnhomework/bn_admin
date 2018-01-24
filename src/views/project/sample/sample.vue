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
      <el-table-column fixed :label="$t('Sample Name')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.allowEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.SampleName"></el-input>
          </template>
          <span v-else>{{scope.row.SampleName}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('SNPrefix')" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.allowEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.SNPrefix"></el-input>
          </template>
          <span v-else>{{scope.row.SNPrefix}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Serial Number')" width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.allowEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.SerialNumber"></el-input>
          </template>
          <span v-else>{{scope.row.SerialNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Received Time')" width="250">
        <template slot-scope="scope">
          <span>{{scope.row.ReceivedTime}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Receiving Operator')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select clearable v-model="scope.row.ReceivedBy">
              <el-option v-for="item in $store.state.Enums.ReceivingOperator" :key="item.ItemValue" :label="$t(item.ItemName)" :value="item.ItemValue" :disabled="!item.IsActive">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{$bn_enum('ReceivingOperator',scope.row.ReceivedBy)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Shipping Condition')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select clearable v-model="scope.row.Shipping">
              <el-option v-for="item in $store.state.Enums.ShippingCondition" :key="item.ItemValue" :label="$t(item.ItemName)" :value="item.ItemValue" :disabled="!item.IsActive">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{$bn_enum('ShippingCondition',scope.row.Shipping)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Container Condition')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select clearable v-model="scope.row.Container">
              <el-option v-for="item in $store.state.Enums.ContainerCondition" :key="item.ItemValue" :label="$t(item.ItemName)" :value="item.ItemValue" :disabled="!item.IsActive">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{$bn_enum('ContainerCondition',scope.row.Container)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Freezer')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select clearable v-model="scope.row.Freezer">
              <el-option v-for="item in $store.state.Enums.Freezer" :key="item.ItemValue" :label="$t(item.ItemName)" :value="item.ItemValue" :disabled="!item.IsActive">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{$bn_enum('Freezer',scope.row.Freezer)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Sample Type')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select clearable v-model="scope.row.SampleType">
              <el-option v-for="item in $store.state.Enums.SampleType" :key="item.ItemValue" :label="$t(item.ItemName)" :value="item.ItemValue" :disabled="!item.IsActive">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{$bn_enum('SampleType',scope.row.SampleType)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Species')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.Species"></el-input>
          </template>
          <span v-else>{{scope.row.Species}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Con.')" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.Con"></el-input>
          </template>
          <span v-else>{{scope.row.Con}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Nucleic Acid Storage Method')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select clearable v-model="scope.row.NucleicAcidStorageMethod">
              <el-option v-for="item in $store.state.Enums.NucleicAcidStorageMethod" :key="item.ItemValue" :label="$t(item.ItemName)" :value="item.ItemValue" :disabled="!item.IsActive">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{$bn_enum('NucleicAcidStorageMethod',scope.row.NucleicAcidStorageMethod)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Volumn')" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.Volumn"></el-input>
          </template>
          <span v-else>{{scope.row.Volumn}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Project Type')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select clearable v-model="scope.row.ProjectType">
              <el-option v-for="item in $store.state.Enums.ProjectType" :key="item.ItemValue" :label="$t(item.ItemName)" :value="item.ItemValue" :disabled="!item.IsActive">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{$bn_enum('ProjectType',scope.row.ProjectType)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('BI Analysis')" width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select clearable v-model="scope.row.NeedBI">
              <el-option v-for="item in $store.state.Enums.BooleanList" :key="item.ItemValue" :label="$t(item.ItemName)" :value="item.ItemValue" :disabled="!item.IsActive">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{$bn_enum('BooleanList',scope.row.NeedBI)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Plate from')" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select clearable v-model="scope.row.RunFormat">
              <el-option v-for="item in $store.state.Enums.Platform" :key="item.ItemValue" :label="$t(item.ItemName)" :value="item.ItemValue" :disabled="!item.IsActive">
              </el-option>
            </el-select>
          </template><span v-else>{{$bn_enum('Platform',scope.row.RunFormat)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Data Volume')" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.DataVolume"></el-input>
          </template>
          <span v-else>{{scope.row.DataVolume}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Comments')" width="280">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.Comments"></el-input>
          </template>
          <span v-else>{{scope.row.Comments}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('Actions')" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.edit==true">
            <el-button @click="enableEdit(scope.row,false)" type="text" size="small">Done</el-button>
          </template>
          <el-button v-else @click="enableEdit(scope.row,true)" type="text" size="small">Eidt</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
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

export default {
  name: 'sample-receive',
  data() {
    return {
      samplepopover: {},
      selctableFalgs: {},
      sampleDialogVisible: false
    }
  },
  extends: subView,
  // props: ['orderId'],
  created() {
    this.init();
  },
  methods: {
    init: function() {
      this.getSamplesByOrderId(this.orderId);
    },
    enableEdit(r, v) {
      this.$set(r, 'edit', v);
      // r.edit=true;
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
          this.tableData = res.data.data;
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
}

</script>
<style scoped>
.actions-warpping {
  margin-bottom: 10px;
  float: right;
}

</style>
