<template>
	<Background />
	<Desktop />
</template>

<script>
// 数据
import MosDataMgr from "./data/MosDataMgr"

// 系统组件
import Background from "./components/Background/Background.vue"
import Desktop from "./components/Desktop/Desktop.vue"

export default {
	name: 'App',
	components: {
		Background,
		Desktop,
	},
	created(){
		MosDataMgr.init()
	}
}
</script>

<style>
html,body,#app{
	position:absolute;
	width:100%;
	height:100%;
	margin:0;
	padding:0;
	overflow:hidden;
}
</style>
