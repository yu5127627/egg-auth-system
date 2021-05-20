import Vue from "vue";
import moment from "moment";

Vue.filter("moment", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});
