export default {
//	decrement() {
//		this.$store.dispatch('decrement')
//	},
// 上面缩写如下
//	increment: ({commit}) => commit('increment'),
	login: ({commit}) => commit('login'),
	getCaptchaCode:({commit}) => commit('getCaptchaCode'),
}
