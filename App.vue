<script>
	import { musictable } from './pages/music/musiclib.js'
 	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.request({
				url: "http://r-wiki-api.sg.21hz.top/music/latest?page=1&size=200",
				header: {
					accept: 'application/json'
				},
				method: 'GET',
				success: res => {
					console.log("请求成功", res.data);
					musictable.data = res.data.data;
				},
				fail: err => {
					console.log("请求失败", err);
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
