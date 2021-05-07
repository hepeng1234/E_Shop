<template>
	<view class="goods_detail">
		<swiper indicator-dots>
			<swiper-item v-for="(item,index) in pircture" :key='index'>
				<image :src="item"></image>
			</swiper-item>
		</swiper>
		<view class="Price">
			<view class="new_Price">￥{{goods_data.newPrice}}</view>
			<view class="old_Price">￥{{goods_data.oldPrice}}</view>
		</view>
		<view class="title">
			{{goods_data.msg}}
		</view>
		<view class="img">
			<image :src="infoSrc"></image>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				pircture: [],
				goods_data: [],
				ProductInfoId:0,
				infoSrc:"",
				options: [{
					icon: '../../static/goods_detail/service.png',
					text: '客服'
				}, {
					icon: '../../static/goods_detail/shop.png',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: '../../static/goods_detail/cart.png',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			async getSwipers(id) { //图片轮播
				let res=await this.$myRequsest({
					url:'/api/CarouselPicture/ProductDetailed',
					data:{
						id:id
					}
				})
				this.pircture = res.data.productCarousel1
				this.goods_data=res.data.getProductInfo
				this.infoSrc=res.data.infoSrc
				// this.goods_data = data.data.data[0]
				// console.log(this.goods_data)
			},
			async getCartCount(){
				let res=await this.$myRequsest({
					url:'/api/CarouselPicture/GetCart'
				})
				this.options[2].info=res.data.length
			},
			async addCart(ProductInfoId,Count){
				let res=await this.$myRequsest({
					url:'/api/CarouselPicture/PostAddCart',
					method:"post",
					header:{
						'Content-type':'application/x-www-form-urlencoded',
					},
					data:{
						ProductInfoId,
						Count
					}
				})
				this.getCartCount()
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
				if(e.index===2){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				console.log(e)
				if(e.index==0){
					this.addCart(this.ProductInfoId,1)
				}else if(e.index==1){
					uni.showToast({
						title: '已购买'
					})
				}
			}
		},
		onLoad(options) {
			this.ProductInfoId=options.id
			this.getSwipers(options.id)
			this.getCartCount()
		},
		components: {
			uniGoodsNav
		},
		created() {
			// #ifdef MP-WEIXIN
			this.options.map((e)=>{
				e.icon='../../'+e.icon
			})
			console.log("微信")
			// #endif
			
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		background-color: #eee;

		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.Price {
			display: flex;
			background-color: #fff;
			padding: 20rpx 0;

			.new_Price {
				color: $shop-color;
				font-size: 50rpx;
			}

			.old_Price {
				color: #ccc;
				text-decoration: line-through;
				font-size: 40rpx;
				margin-top: 10rpx;
				margin-left: 10rpx;
			}
		}

		.title {
			background-color: #fff;
			padding: 20rpx 0;
		}

		.img {
			padding-bottom: 100rpx;
			height: 1000rpx;
			background-color: #fff;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.goods_nav {
			position: fixed;
			bottom: 0;
			width: 100%;
			// // #ifndef APP-NVUE
			// display: flex;
			// // #endif  
			// background-color: #FFFFFF;
			// text-align: center;
			// width: 100%;
			// position: fixed;
			// bottom: 0;
			// flex-direction: row;
		}
	}
</style>
