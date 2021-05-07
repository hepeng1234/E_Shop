<template>
	<view class="home">
		<swiper indicator-dots autoplay circular>
			<swiper-item v-for="item in pircture" :key='item.id'>
				<image :src="item.url"></image>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key='index' @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot_goods">
			<view class="tit">推荐商品</view>
			<Product-list class='productList' :goods='goods' @son-fun="goGoodsDetail"></Product-list>
			<view :class="hot_tit">刷新中...</view>
			<view :class="hot_di">---到底啦---</view>
		</view>
	</view>
</template>

<script>
	import Productlist from '../../components/Product_information_list.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				goods: [],
				a: true,
				pageNo:0,
				pageSize:5,
				count:0,
				pircture: [],
				hot_tit: "hot_tit1",
				hot_di: 'hot_di1',
				navs: [{
						icon: 'icon icon-supermarket',
						title: '京东超市',
						path: '/pages/goods/goods'
					},
					{
						icon: 'icon icon-contactus',
						title: '联系我们',
						path: '/pages/contact/contact'
					},
					{
						icon: 'icon icon-Communitypictures',
						title: '社区图片',
						path: '/pages/pics/pics'
					},
					{
						icon: 'icon icon-Learningvideos',
						title: '学习视频',
						path: '/pages/videos/videos'
					}
				]
			}
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods(this.pageNo,this.pageSize)
		},
		methods: {
			async getSwipers() { //图片轮播
				let res = await this.$myRequsest({ //使用封装方法
					url:'/api/CarouselPicture/CarouselPicture'
				})
				this.pircture = res.data
			},
			async getHotGoods(pageNo,pageSize) { //商品信息
				let res = await this.$myRequsest({
					url: '/api/CarouselPicture/ProductInfo',
					data:{
						pageNo,
						pageSize
					}
				})
				// this.count=res.data.data.count
				if(this.goods.length==0){
					this.goods=res.data.info;
				}else{
					this.goods.push(...res.data.info)
				}
			},
			navItemClick(url) { //导航点击的处理函数
				uni.navigateTo({
					url
				})
			},
			//跳转到商品详情页
			goGoodsDetail(id){
				uni.navigateTo({
					url:'/pages/goods_detail/goods_detail?id='+id
				})
			}
		},
		components: {
			'Product-list': Productlist
		},
		onReachBottom() {
			console.log("页面触底了")
			if (this.a) {
				this.a = false
				if (this.goods.length < this.count) {
					this.hot_tit = "hot_tit"
					setTimeout(() => {
						this.hot_tit = "hot_tit1"
						this.pageNo+=5
						this.getHotGoods(this.pageNo,this.pageSize)
						this.a = true
					}, 2000)
				} else {
					this.hot_di='hot_di'
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.nav {
			display: flex;
			justify-content: space-evenly;

			.nav_item {
				text-align: center;
				margin: 10rpx;

				.icon {
					width: 100rpx;
					height: 100rpx;
					background-size: 100%;
					margin: 10rpx auto;
				}

				text {
					font-size: 30rpx;
				}

				.icon-supermarket {
					background-image: url(../../static/index/supermarket.png);
				}

				.icon-contactus {
					background-image: url(../../static/index/contact_us.png);
				}

				.icon-Communitypictures {
					background-image: url(../../static/index/Community_pictures.png);
				}

				.icon-Learningvideos {
					background-image: url(../../static/index/Learning_videos.png);
				}
			}
		}

		.hot_goods {
			background: #eee;
			overflow: hidden;
			margin-top: 10rpx;

			.tit {
				height: 75rpx;
				line-height: 75rpx;
				color: $shop-color; //在uni.scss中定义的颜色变量
				text-align: center;
				letter-spacing: 30rpx;
				background-color: #FFFFFF;
				margin: 5rpx 0;
				font-size: 40rpx;
			}

			.productList {
				width: 100%;
				height: 100%;
			}

			.hot_tit {
				width: 750rpx;
				height: 100rpx;
				background: #fff;
				line-height: 100rpx;
				text-align: center;
			}

			.hot_tit1 {
				display: none;
			}

			.hot_di {
				width: 750rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
			}

			.hot_di1 {
				display: none;
			}
		}

	}
</style>
