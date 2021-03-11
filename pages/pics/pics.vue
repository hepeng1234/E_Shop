<template>
	<view class="pics">
		<scroll-view class="left" scroll-y="true">
			<!-- <view @click="active=index" :class="active===index?'active':''" v-for="(item,index) in date" :key='item.id'> -->
			<view @click="leftClickHandle(index,item.id)" :class="{'active':active===index}" v-for="(item,index) in date" :key='item.id'>
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="(item,index) in urlDate" :key="index">
				<image @click="previewImg(item.url)" :src="item.url" loop="true"></image>
				<view>{{item.id}}</view>
			</view>
			<text v-if="!urlDate.length">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: [],
				active: 0,
				urlDate: []
			}
		},
		methods: {
			async getPicsCate() {
				const res = await this.$myRequsest({
					url: '/E_Shop/navBar_Left'
				})
				this.date = res.data.data
			},
			async leftClickHandle(index=0, item=1) {
				this.active = index
				const res = await this.$myRequsest({
					url: '/E_Shop/navBar_Right' + item
				})
				this.urlDate = res.data.data
			},
			previewImg(url){
				var urls=this.urlDate.map(item=>{
					return item.url
				})
				uni.previewImage({
					current:url,
					urls,
					indicator:'default',
					loop:true
				})
			}
		},
		onLoad() {
			this.getPicsCate()
			this.leftClickHandle()
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pics {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;

			view {
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				background-color: $shop-color;
				color: #fff;
			}
		}

.right{
	height: 100%;
	width: 530rpx;
	margin: 0 auto;
	.item{
		image{
			width: 530rpx;
			height: 530rpx;
			border-radius: 5px;
		}
	}
}
	}
</style>
