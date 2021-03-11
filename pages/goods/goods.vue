<template>
	<view class="goods_list">
		<Product-list @son-fun='goDetil' :goods='goods'></Product-list>
		<view :class="hot_tit">刷新中...</view>
		<view :class="hot_di">---到底啦---</view>
	</view>
</template>

<script>
	import ProductList from '../../components/Product_information_list.vue'
	export default {
		data() {
			return {
				goods: [],
				a: true,
				hot_tit: 'hot_tit1',
				hot_di:'hot_di1'
			}
		},
		methods: {
			async getGoodList(callback) {
				const res = await this.$myRequsest({
					url: '/E_Shop/Product_information'
				})
				this.goods = res.data.data
				// if(callback){
				// 	callback()
				// }
				callback && callback()
			},
			goDetil(id){
				uni.navigateTo({
					url:'/pages/goods_detail/goods_detail?id='+id
				})
			}
		},
		components: {
			'Product-list': ProductList
		},
		onLoad() {
			this.getGoodList()
		},
		onReachBottom() {
			console.log("页面触底了")
			if (this.a) {
				this.a = false
				if (this.goods.length < 40) {
					this.hot_tit = "hot_tit"
					setTimeout(() => {
						this.hot_tit = "hot_tit1"
						this.goods.push(...this.goods)
						this.a = true
					}, 2000)
				} else {
					this.hot_di = 'hot_di'
				}
			}
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				this.goods=[]
				this.getGoodList(()=>{
					uni.stopPullDownRefresh()
				})
			},2000)
		}
	}
</script>

<style lang="scss">
	.goods_list {
		background: #eee;

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
</style>
