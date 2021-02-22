<template>
	<router-view />
</template>

<style lang="less">
@import './global.less';
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
    height: 100%;
	color: #2c3e50;
}

#nav {
    margin-bottom: 10px;
	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
    }
    .logo{
        width: 100%;
        margin: 0 auto;
    }
}




// @media screen and (max-width: 568px) {
// 	.xs-hide {
// 		display: none;
// 	}

// 	.xs-show {
// 		display: block;
// 	}
// }

// @media screen and (min-width: 568px) {
// 	.xs-hide {
// 		display: block;
// 	}

// 	.xs-show {
// 		display: none;
// 	}
// }
</style>
