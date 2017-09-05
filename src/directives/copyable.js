import _ from 'underscore';
import utils from '@/utils';

function bindClick(el,bindData,row,columnKey,ctx){
	el.onclick=function(event){
        if(event.type=='click'){
            var index=_.indexOf(bindData,row);
            var selectKey='selectable_'+columnKey; 
           
            if(event.altKey==false&&event.ctrlKey==false&&event.shiftKey==false){
                
                var isSelected=!row[selectKey];
                if(isSelected){
                    ctx.selctableFalgs[selectKey]=index;
                }else{
                    ctx.selctableFalgs[selectKey]=-1;
                }
                _.each(bindData,(x)=>{ ctx.$set(x,selectKey,false)});                
                ctx.$set(row,selectKey,isSelected);
            }else if (event.altKey==false&&event.ctrlKey==true&&event.shiftKey==false) {
                var isSelected=!row[selectKey];
                ctx.$set(row,selectKey,isSelected);
                var sourceIndex=ctx.selctableFalgs[selectKey];
                if(isSelected
                    &&sourceIndex!=undefined&&sourceIndex>-1){
                    console.log(index+'|'+sourceIndex)
                    bindData[index][columnKey]=bindData[sourceIndex][columnKey]
                }
            }
            //todo use shiftkey
            else if((event.altKey==true&&event.shiftKey==false)&&event.ctrlKey==false)
            {
                if(ctx.selctableFalgs[selectKey]!=undefined&&ctx.selctableFalgs[selectKey]>-1){
                    var sourceIndex=ctx.selctableFalgs[selectKey];
                    var source=Math.min(sourceIndex,index);
                    var target=Math.max(sourceIndex,index);
                    var value=bindData[sourceIndex][columnKey];               
                    for (var i = source; i <= target; i++) {                          
                        bindData[i][columnKey]= value;  
                        ctx.$set(bindData[i],selectKey,true);
                    }
                }
            }
        }
	}
    // el.onmouseenter=function(event){
    //     console.log('---------enter---------')
    //     console.log(event);
    // }
}
function CheckStatus(el, binding, vnode){
		var v = binding.value;
		var selectableKey='selectable_'+v.property
		var data=v.data;
		if(data[selectableKey]==true){
			utils.dom.addClass(el,'selectable-active')
		}else{
			utils.dom.removeClass(el,'selectable-active')
		};

}
export default {
	bind:function(el, binding, vnode) {
		var ctx=vnode.context;
		var targetElement=el;
		var v = binding.value;
		
		if(!ctx.selctableFalgs){
			ctx.selctableFalgs={};
		}
		bindClick(targetElement,v.dataList,v.data,v.property,ctx)
		utils.dom.addClass(targetElement,'selectable')

		CheckStatus(targetElement,binding,vnode);
	},
	update:function(el, binding, vnode){	
		CheckStatus(el,binding,vnode);
	},
    // inserted:function(el,binding,vnode){
    //      console.log(el.parentNode)
    // }
}