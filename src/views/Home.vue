<template>
	<div class="home">
		<div class="wrap">
			<div v-for="(item, index) in list" :key="index" class="item">
				<img :src="require('@/assets/images/' + item.url)" alt="" />
				<h4>{{ item.title }}</h4>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'

export default {
	name: 'Home',
	setup() {
		const list = ref([
			{ url: '1.jpg', title: '三叶巫女' },
			{ url: '2.jpeg', title: '标题标题' },
			{ url: '3.jpeg', title: '标题标题' },
			{ url: '4.jpeg', title: '标题标题' },
			{ url: '5.jpeg', title: '标题标题' }
		])
		return {
			list
		}
    },
}
</script>

<style lang="less" scope>
@media screen and( min-width:768px) {
	.home {
		max-width: 1200px;
		margin: 0 auto;
		text-align: left;
		overflow: hidden;
		padding: 20px;
		box-sizing: border-box;

		.wrap {
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			& > div {
				position: relative;
				&:hover {
					box-shadow: 0 0 20px #fff;
					z-index: 9999;
				}
			}
			& img {
				margin: 3px;
				padding: 5px;
				height: 280px;
				background: rgb(243, 243, 243);
				flex-grow: 1;
				object-fit: cover;
				transition: 0.3s;
				cursor: pointer;
			}
			&:after {
				display: block;
				content: '';
				flex-grow: 9999;
			}
		}
	}
}

@media screen and( max-width:414px) {
   
	// .item {
	// 	width: 172.5px;
    //     margin-bottom: 10px;
    //     margin-left: auto;
	// 	-moz-page-break-inside: avoid;
	// 	-webkit-column-break-inside: avoid;
	// 	break-inside: avoid;
	// 	background: #909090;
	// 	& > img {
	// 		width: 100%;
	// 	}
	// }   

	// .wrap {
	// 	-moz-column-count: 2;
	// 	/* Firefox */
	// 	-webkit-column-count: 2;
	// 	/* Safari 和 Chrome */
	// 	column-count: 2;
	// 	-moz-column-gap: 1em;
	// 	-webkit-column-gap: 1em;
	// 	column-gap: 1em;
    // }
    

    .wrap {
        display: flex;  
        flex-flow:column wrap;
        height: 100vh;
      }
      .item {
          margin: 10px;
          width: calc(100%/2 - 20px);
      }
      .item img{
          width: 100%;
        }
      
}

.height-100 {
	height: 100px;
	background: rgb(71, 169, 248);
}

.height-50 {
	height: 50px;
	background: rgb(71, 169, 248);
}
.height-120 {
	height: 120px;
	background: rgb(71, 169, 248);
}
.height-80 {
	background: rgb(71, 169, 248);
	height: 80px;
}

</style>
