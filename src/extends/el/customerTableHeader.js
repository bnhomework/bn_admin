// import _ from 'underscore'
export default {
  methods: {     	
    renderCopyDownHeader:function(h, scope) {
        var handleCopyDown=function(event) {
            event.stopPropagation();
            var prop=scope.column.property;
            var dataInTable=scope.store.table.data;
            if(dataInTable&&dataInTable.length>0) {
                var source=dataInTable[0][prop];
                for (var i=dataInTable.length - 1;
                i > 0;
                i--) {
                    dataInTable[i][prop]=source;
                }
            }
        }
        return h('span', null, [scope.column.label, h('span', {
            'class': 'fa fa-arrow-circle-down', on: {
                click: handleCopyDown
            }
        }
        )])
    }
  }
};