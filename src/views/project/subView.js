import baseView from '@/extends/baseView';
import customerTableHeader from '@/extends/el/customerTableHeader';
import _ from 'underscore';
let mixinSubView = {
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
  methods: {
    handleSelectionChange(val) {
      this.selectedRows = val;
    }
  },
  computed: {
    dataInGrid: function() {
      var total = this.tableData.length;
      var skip = this.pagesize * (this.currentPage - 1) || 0;
      var end = skip + this.pagesize;
      return this.tableData.slice(skip, end);
    }
  }
};
export default () => {
  return {
    mixins: [mixinSubView, baseView, customerTableHeader],

    created() {
      console.log('sub view created')
    },
    methods: {
      init: function() {
        console.log('sub view init')
      },
    },
    watch: {
      orderId() {
        this.init();
      }
    }
  }
}
