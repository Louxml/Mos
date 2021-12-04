<template>
	<Background />
	<Desktop />
</template>

<script>
import Background from "./components/Background/Background.vue"
import Desktop from "./components/Desktop/Desktop.vue"

export default {
	name: 'App',
	components: {
		Background,
		Desktop,
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
