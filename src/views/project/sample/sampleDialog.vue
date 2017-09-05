<template>
    <el-dialog title="收货地址"  :visible="visible" :before-close="close" >
      <el-form :model="sample"  :rules="rules" ref="ruleForm">
        <el-form-item label="活动名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="sample.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth" prop="region">
          <el-select v-model="sample.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
</template>
<script>
import baseView from '@/extends/baseView';
import _ from 'underscore';
export default {
    mixins: [baseView],
    name: 'sample-dialog',
    data() {
        return {
            loading: false,
            sample: {
                region: '', name: ''
            }
            ,rules: {
                name: [ {
                    required: true, message: '请输入活动名称', trigger: 'blur'
                },
                {
                    min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'
                }],
                region: [ {
                    required: true, message: '请选择活动区域', trigger: 'change'
                }]
            }
            ,formLabelWidth:'120px'
        }
    }
    ,
    props: ['visible'],
    created() {}
    ,
    methods: {
        close() {
            this.$emit('colseDialog');
        }
        ,
        save() {
            var vm=this;
            this.$refs["ruleForm"].validate((valid)=> {
                if (valid) {
                    vm.$emit('save', vm.sample);
                    vm.$emit('colseDialog', '');
                }
                else {
                    return false;
                }
            }
            );
        }
    }
}



</script>
<style scoped>

</style>