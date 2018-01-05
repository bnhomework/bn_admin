<template>
	<div>
		<div class="projectHeader">
			<h4>{{$t('Project Info')}}</h4>
			<el-row :gutter="20">
				<el-col :span="6">
					<div>
						<span class="title">{{$t('Tracking Number')}} :</span>
						<span>{{projectHeader.TrackingNumber}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div>
						<span class="title">{{$t('Status')}} :</span>
						<span>{{projectHeader.Status}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div>
						<span class="title">{{$t('Service Type')}} :</span>
						<span>{{projectHeader.ServiceType}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div>
						<span class="title">{{$t('Confirmed Date')}} :</span>
						<span>{{projectHeader.ConfirmedDate}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div>
						<span class="title">{{$t('Customer')}} :</span>
						<span>{{projectHeader.LoginName}}</span>
					</div>
				</el-col>
				<el-col :span="6">
					<div>
						<span class="title">{{$t('Institution')}} :</span>
						<span>{{projectHeader.Compamy}}</span>
					</div>
				</el-col>
			</el-row>
			<br/>
		</div>
		<div class="projectDetail">
			<el-tabs  type="border-card" @tab-click="handleTabClick" :active-name="activeTab">
				<el-tab-pane name="SampleRecevie">
					<span slot="label">
						{{$t('Sample Receive')}} (
						<span class="stepStatus">{{projectStepProgress.SampleRecevie}}</span>
						)
					</span>

					<div v-if="loadedTabs.SampleRecevie">
						<sample :orderId="orderId"></sample>
					</div>
				</el-tab-pane>
				<el-tab-pane name="QC">
					<span slot="label">
						{{$t('Sample QC')}} (
						<span class="stepStatus">{{projectStepProgress.SampleQC}}</span>
						)
					</span>
					<div v-if="loadedTabs.QC">
						<qc ref="qc"></qc>
					</div>
				</el-tab-pane>
				<el-tab-pane name="SampleLibrary">
					<span slot="label">
						{{$t('Sample Library')}} (
						<span class="stepStatus">{{projectStepProgress.SampleLibrary}}</span>
						)
					</span>
					<div v-if="loadedTabs.SampleLibrary">
						<sample-library></sample-library>
					</div>
				</el-tab-pane>
				<el-tab-pane name="SampleSequencing">
					<span slot="label">
						{{$t('Sample Sequencing')}} (
						<span class="stepStatus">{{projectStepProgress.SampleSequencing}}</span>
						)
					</span>					
					<div v-if="loadedTabs.SampleSequencing">
						<sample-sequencing></sample-sequencing>
					</div>
				</el-tab-pane>
				<el-tab-pane  name="BIQC">
					<span slot="label">
						{{$t('BI QC')}} (
						<span class="stepStatus">{{projectStepProgress.BIDataQC}}</span>
						)
					</span>				
					<div v-if="loadedTabs.BIQC">
						<bi-qc></bi-qc>
					</div>
				</el-tab-pane>
				<el-tab-pane name="BIAnalysis">
					<span slot="label">
						{{$t('BI Analysis')}} (
						<span class="stepStatus">{{projectStepProgress.BIDataAnalysis}}</span>
						)
					</span>							
					<div v-if="loadedTabs.BIAnalysis">
						<bi-analysis></bi-analysis>
					</div>
				</el-tab-pane>
				<el-tab-pane name="Deliver">
					<span slot="label">
						{{$t('Deliver')}} (
						<span class="stepStatus">{{projectStepProgress.BIDataDelivery}}</span>
						)
					</span>												
					<div v-if="loadedTabs.Deliver">
						<deliver></deliver>
					</div>
				</el-tab-pane>

			</el-tabs>
		</div>
	</div>
</template>
<script> 
import baseView from '@/extends/baseView';
import { mapGetters, mapActions } from 'vuex'
export default {
    mixins: [baseView],
    name: 'project-list',
    data () {
        return {
        	orderId:'',
            activeTab:'',
            projectHeader: {},
            loadedTabs: {}
        }
    },
    created () {
        this.init()
    }
    ,
    methods: {
        init: function() {
        	this.loadedTabs={};
            if(this.$route.params.tab) {
                this.activeTab=this.$route.params.tab;
            }
            else {
                this.activeTab='SampleRecevie';
            }
            this.$set(this.loadedTabs, this.activeTab, true);
            this.orderId=this.$route.params.oid;
            this.getProjectHeaderById(this.orderId);
            this.$store.dispatch('project/progressChange',this.orderId);
        }
        ,
        getProjectHeaderById: function(id) {
        	this.$api.project.GetProjectHeaderInfo(id).then((res)=> {
                this.projectHeader=res.data;
            }
            );
        }
        ,
        handleTabClick: function(tab) {
            this.activeTab=tab.name;
        }
    },
    computed:mapGetters('project',{
    	projectStepProgress:'projectStepProgress'
    })
    ,
    watch: {
        activeTab:function(tab) {
            this.$set(this.loadedTabs, tab, true);
        },
	    '$route.params.oid'(newId, oldId) {
	        this.init()
	    }
    },
    events:{
    	projectChanged:function(tab){
    		console.log('event from:'+tab)
    	}
    }
    ,
    components: {
        sample:(resolve)=> {
            require(['@/views/project/sample/sample.vue'], resolve)
        }
        ,
        qc: (resolve)=> {
            require(['@/views/project/qc/qc.vue'], resolve)
        }
        ,
        SampleLibrary: (resolve)=> {
            require(['@/views/project/lib/lib.vue'], resolve)
        }
        ,
        SampleSequencing: (resolve)=> {
            require(['@/views/project/seq/seq.vue'], resolve)
        }
        ,
        biQc: (resolve)=> {
            require(['@/views/project/bi/bi.vue'], resolve)
        }
        ,
        biAnalysis: (resolve)=> {
            require(['@/views/project/biAnalysis/biAnalysis.vue'], resolve)
        }
        ,
        Deliver: (resolve)=> {
            require(['@/views/project/deliver/deliver.vue'], resolve)
        }
    }
}

</script>

<style scoped>
	.stepStatus{
		color: red
	}
	.el-tabs span{
		font-size: 8px;
		font-weight: bolder;
	}
</style>