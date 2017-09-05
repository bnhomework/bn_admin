import common from './common'
import project from './project'
import message from './message'
export const api = {
	common,
	project,
	message
};
var install = function(Vue) {
	if (install.installed) return
	install.installed = true
	Object.defineProperty(Vue.prototype, '$api', {
		get() {
			return api
		}
	})
}
// export api
export default {
	install
}