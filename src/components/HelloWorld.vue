<template>
	<div class="hello">
		{{ test }}
		<h1>{{ test2 }}</h1>
		{{ gg }}
	</div>
</template>

<script>
import { useStore } from 'vuex'
export default {
	name: 'HelloWorld',
	props: {
		msg: String
	},
	setup() {
		const store = useStore()
        console.log("🚀 ~ file: HelloWorld.vue ~ line 18 ~ setup ~ store", store)

		return {
			...store.state
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
