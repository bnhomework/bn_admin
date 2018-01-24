import baseView from '@/extends/baseView';
import _ from 'underscore';
export default {
  data() {
    return {
      loading: false,
      pagesize: 100,
      currentPage: 1,
      tableData: [],
      selectedRows: [],
    };
  },
  props: ['orderId'],
  extends: baseView,
  created() {
    console.log('sub view created')
  },
  methods: {
    init: function() {
      console.log('sub view init')
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    }
  },
  computed: {
    dataInGrid: function() {
      var total = this.tableData.length;
      var skip = this.pagesize * (this.currentPage - 1) || 0;
      var end = skip + this.pagesize;
      var result= this.tableData.slice(skip, end);
      return result;
    }
  },
  watch: {
    orderId() {
      this.init();
    }
  }
}
