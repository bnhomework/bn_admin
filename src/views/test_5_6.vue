<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <h2>PROJECTS LIST</h2>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-input placeholder="" v-model="filterValue">
              <el-select v-model="selectedFilterOption" slot="prepend" placeholder="请选择">
                <el-option v-for="item in filterOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-button slot="append" icon="search"></el-button>
            </el-input>
          </div>
          <div v-for="p in projects" :key="p.trackingNumber" @click="()=>{selectedProject=p.trackingNumber;}" class="project-preview" :class="{'active':selectedProject==p.trackingNumber}">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                {{p.name}}
              </div>
              <el-row :gutter="20">
                <el-col :span="6">
                  <div style="font-size: 30px;font-weight: bold;text-align: center">{{p.samples.length}}</div>
                  <div style="font-size: 20px;text-align: center">samples</div>
                </el-col>
                <el-col :span="18">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content">Created: {{p.opened}}</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content"></div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content">{{p.account}}</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">{{p.customer}}</div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <h2>PROJECTS DETAILS</h2>
        <el-button type="primary" @click="()=>{showNewProject=true}">CREATE NEW PROJECT<span class='bn-icon' style="color:white">&#xe65a;</span></el-button>
        <span style="float: right" v-if="showNewProject">
          <el-button type="primary">SAVE</el-button>
          <el-button @click="()=>{showNewProject=false}">CANCEL</el-button>
        </span>
        <div> &nbsp </div>
        <div v-if="showNewProject">
          <el-input placeholder="Enter Project Name" style="width:250px"></el-input>
        <div> &nbsp </div>
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-label">Account</div>
            </el-col>
            <el-col :span="6">
              <!-- <div class="grid-content">Jennifer</div> -->
              <el-input :disabled="true" v-model="Jennifer">Jennifer</el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-label">Opened</div>
            </el-col>
            <el-col :span="6">
              <el-input :disabled="true" v-model="cdate"></el-input>
            </el-col>
            <el-col :span="6">
              <div class="grid-label">Closed</div>
            </el-col>
            <el-col :span="6">
              <el-date-picker v-model="value1" type="date">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-label">Customer</div>
            </el-col>
            <el-col :span="6">
              <el-input></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-label">Priority</div>
            </el-col>
            <el-col :span="6">
              <el-select v-model="selectedPriority">
                <el-option v-for="item in priorityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <div style="width:100%;margin-bottom: 20px;min-height: 50px;border-bottom: 1px solid gray"></div>
          <h2>SUBMIT REACTIONS</h2>
          <el-button type="primary">UPLOAD REACTIONS</el-button>
          <el-button background-color="gray">MODIFY REACTIONS</el-button>
          <div>
            <div> &nbsp </div>
            <a href="javascript:void" style="color:blue;text-decoration: underline">download template</a>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="width:100%;margin-bottom: 20px;min-height: 50px;border-bottom: 1px solid gray"></div>
    <h2>REACTION DETAILS</h2>
    <span style="float:right">
      <el-button type="primary">Add</el-button>
      <el-button type="danger">Delete</el-button>
    </span>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="samplename" label="Sample Name" width="180">
      </el-table-column>
      <el-table-column prop="reactionlabel" label="Reaction Label" width="170">
      </el-table-column>
      <el-table-column prop="sampletype" label="Sample Type" width="170">
      </el-table-column>
      <el-table-column prop="primername" label="Primer Name" width="170">
      </el-table-column>
      <el-table-column prop="vector" label="Vector" width="170">
      </el-table-column>
      <el-table-column prop="returnrequirment" label="Return Requirment" width="220">
      </el-table-column>
      <el-table-column prop="isdiscard" label="Is Discard" width="120">
      </el-table-column>
      <el-table-column prop="comments" label="Comments" width="120">
      </el-table-column>
      <el-table-column prop="reactionstatus" label="Reaction Status" width="220">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import dummy from '@/utils/dummy.js'
export default {
  data() {
    return {
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
.bg-purple {
  background: #d3dce6;
}

.el-select .el-input {
  width: 150px;
}

.el-card__header {
  padding: 9px 10px;
}

.el-card__body {
  padding: 10px;
  max-height: 500px;
  overflow-y: auto;
}

.grid-content {
  font-size: 15px;
  font-weight: bold;
  line-height: 40px
}

.project-preview {
  margin-bottom: 10px;
}

.project-preview.active .el-card__header {
  background-color: #8492A6;
  color: white;
  font-weight: bold
}

.project-preview.active .el-card {
  border-color: #8492A6;
}

.grid-label {
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  line-height: 40px
}

.el-table__fixed,
.el-table__fixed-right {
  overflow-y: hidden;
}

</style>
