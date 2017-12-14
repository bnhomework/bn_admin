<template>
	<div>
		<div>
			<el-popover ref="popover4" placement="top"  trigger="click" @show="show" @hide="close">
			<div  class="edit-warpper">
				<div class="editable-inputs">
					<div v-if="type=='textbox'">
					<el-input v-model="temValue"></el-input>
					</div>
					<div v-else-if="type=='textarea'">
						<el-input  type="textarea"  :rows="textareaRows"  v-model="temValue"></el-input>
					</div>
					<div v-else-if="type=='date-picker'">
						<el-date-picker v-model="temValue" type="date" ></el-date-picker>
					</div>
					<div v-else-if="type=='dropdown'">
						<el-select v-model="temValue" >
							<el-option v-for="item in dpOptions":key="item.value":label="item.label":value="item.value":disabled="item.disabled">				
							</el-option>
						</el-select>
					</div>
					<div v-else></div>
				</div>
				<div class="editable-buttons">
					<el-button type="primary" @click="save"><i class="fa fa-check"></i></el-button>
					<el-button type="danger" @click="closePop"><i class="fa fa-close"></i></el-button>
				</div>
			</div>
				
			</el-popover>
		</div>
		<div class="display-warpper" ><span v-popover:popover4>{{displayValue}}</span></div>
	</div>
</template>
<script>
	export default{
		data (){
			return {
				temValue:undefined,
				visible:true,
				defaultValue:'Empty'
			};
		},
		props:{
			v:{ validator:v=>true
			},
			type:{ type: String,
				default: 'textbox',
				validator: value => ['textbox', 'textarea', 'dropdown','date-picker'].indexOf(value) > -1
			},
			textareaRows:{
				type:Number,
				default:3
			},
			dpOptions:{
				type:Array
			}
		},
		mounted(){
			this.temValue=this.v;
		},
		methods:{
			save:function(){
				this.$emit('update:v',this.temValue,this);
				this.closePop();
			},
			closePop:function(){				
				this.$refs.popover4.doClose();
			},
			show:function(){
				this.temValue=this.v;
			},
			close:function(){
			},
		  	pad(val, len) {
			    val = String(val);
			    len = len || 2;
			    while (val.length < len) {
			      val = '0' + val;
			    }
			    return val;
		  	}
					},
		computed:{
			displayValue(){
				var vm=this;
				if(this.v==''||this.v==undefined){
					return this.defaultValue;
				}
				if(this.type=='dropdown'){
					var selectedOption=this.dpOptions.filter(function(x){return x.value==vm.v});
					if(selectedOption.length>0){
						return selectedOption[0].label;
					}
					return this.defaultValue;
				}
				if(this.type=='date-picker'){
					var yyyy=this.v.getFullYear()
					var mm=vm.pad(vm.v.getMonth()+1)
					var dd=vm.pad(vm.v.getDate())
					return yyyy+'-'+mm+'-'+dd;
				}
				return this.v;
			}
		}
	}
</script>
<style scoped>
	.display-warpper span{
		border-bottom: dashed 1px #0088cc;
		cursor: pointer;
	}
	 .edit-warpper, .editable-inputs,.editable-buttons{
		display: inline-block;
	}
	.el-button{
		margin-left: 0px
	}
</style>