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
          <el-button type="success">SAVE</el-button>
          <el-button @click="()=>{showNewProject=false}">CANCEL</el-button>
        </span>
        <div> &nbsp </div>
        <div v-if="showNewProject">
          <el-input placeholder="Enter Project Name" style="width:250px"></el-input>
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-label">Account</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">Jennifer</div>
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
          <h2>SUBMIT SAMPLES</h2>
          <el-button type="primary">UPLOAD SAMPLES</el-button>
          <el-button background-color="gray">MODIFY SAMPLES</el-button>
          <div>
            <div> &nbsp </div>
            <a href="javascript:void" style="color:blue;text-decoration: underline">download template</a>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="width:100%;margin-bottom: 20px;min-height: 50px;border-bottom: 1px solid gray"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filterOptions: [{ value: 'All' }, { value: 'Project Name' }, { value: 'Account' }],
      priorityOptions: [{ value: 'Standard' }, { value: 'High' }, { value: 'Low' }],
      selectedPriority: 'Standard',
      selectedFilterOption: 'All',
      filterValue: '',
      cdate: '2017-10-23',
      showNewProject: false,

      selectedProject: '',

      projects: [{ name: '20171025RodZ_S69 mutants', samples: [], account: 'Jennifer', customer: 'Yingjie', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36110205' },
        { name: 'FALL2017/MICRO PURIFIED', samples: [], account: 'Jennifer', customer: 'THU', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36109507' },
        { name: 'FALL2017/MICRO PURIFIED', samples: [], account: 'Jennifer', customer: 'THU', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36109355' },
        { name: 'FALL2017/MICRO UNPURIFIED', samples: [], account: 'Jennifer', customer: 'THU', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36107407' },
        { name: 'FALL2017/MICRO-UNPURIFIED WITH BLANK', samples: [], account: 'Jennifer', customer: 'THU', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36106555' },
        { name: 'Phong Lu', samples: [], account: 'Jennifer', customer: 'Phong', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36103533' },
        { name: 'FALL2017/BIO221', samples: [], account: 'Jennifer', customer: 'THU', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36102618' },
        { name: 'CC', samples: [], account: 'Jennifer', customer: 'Thach', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36100629' },
        { name: 'DIL BD #10/25/17 TRT 2 RACKS', samples: [], account: 'Jennifer', customer: 'SD', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36098268' },
        { name: 'Cheryl Goldbeck Merck #30-31566249', samples: [], account: 'Jennifer', customer: 'SF', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36097346' },
        { name: 'BD_QC_102517_SEA', samples: [], account: 'Jennifer', customer: 'Seattle', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36097124' },
        { name: 'Cheryl Goldbeck Merck #30-31566249', samples: [], account: 'Jennifer', customer: 'SF', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36096535' },
        { name: 'Meirong', samples: [], account: 'Jennifer', customer: 'Dengke', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36095468' },
        { name: 'Myo_ITS3_LR3', samples: [], account: 'Jennifer', customer: 'YOU', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36094809' },
        { name: 'MT', samples: [], account: 'Jennifer', customer: 'David', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36093368' },
        { name: 'Big Dye Dilution Buffer QC 25Oct2017', samples: [], account: 'Jennifer', customer: 'RTP', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36091968' },
        { name: 'Big Dye QC 25Oct2017', samples: [], account: 'Jennifer', customer: 'RTP', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36091746' },
        { name: 'e-syt1', samples: [], account: 'Jennifer', customer: 'Andres', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36091413' },
        { name: 'ISO QC 25OCT2017', samples: [], account: 'Jennifer', customer: 'RTP', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36091046' },
        { name: 'yFZ 004-B C', samples: [], account: 'Jennifer', customer: 'Yunfeng', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36090457' },
        { name: 'yFZ 004-b yFZ004-c Sequencing', samples: [], account: 'Jennifer', customer: 'Yunfeng', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36089204' },
        { name: 'SUB-90158', samples: [], account: 'Jennifer', customer: 'Anne', opened: '20171026', finish: '', priority: 'Standard', trackingNumber: '36089059' },
        { name: 'Jeff Mazur Cell Design Labs #30-35150356', samples: [], account: 'Jennifer', customer: 'SF', opened: '20171025', finish: '', priority: 'Standard', trackingNumber: '36088837' },
        { name: 'trx_chi', samples: [], account: 'Jennifer', customer: 'Jan', opened: '20171025', finish: '', priority: 'Standard', trackingNumber: '36088248' },
        { name: 'Intro to Bio Fall 2017', samples: [], account: 'Jennifer', customer: 'Dawn', opened: '20171025', finish: '', priority: 'Standard', trackingNumber: '36088026' },
        { name: 'SUB-90157', samples: [], account: 'Jennifer', customer: 'Roger', opened: '20171025', finish: '', priority: 'Standard', trackingNumber: '36087659' },
        { name: 'SUB-90157', samples: [], account: 'Jennifer', customer: 'Roger', opened: '20171025', finish: '', priority: 'Standard', trackingNumber: '36087215' },
        { name: 'SUB-90157', samples: [], account: 'Jennifer', customer: 'Roger', opened: '20171025', finish: '', priority: 'Standard', trackingNumber: '36087437' },
        { name: 'sng-1::BFP', samples: [], account: 'Jennifer', customer: 'Sarah', opened: '20171025', finish: '', priority: 'Standard', trackingNumber: '36087063' },
        { name: 'pCS6-PSD95-Cerulean - CMV-Forward 1', samples: [], account: 'Jennifer', customer: 'Sylvia', opened: '20171025', finish: '', priority: 'Standard', trackingNumber: '36086404' }
      ],
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

</style>
