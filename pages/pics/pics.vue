<template>
	<view class="pics">
		<scroll-view class="left" scroll-y="true">
			<!-- <view @click="active=index" :class="active===index?'active':''" v-for="(item,index) in date" :key='item.id'> -->
			<view @click="leftClickHandle(index,item.id)" :class="{'active':active===index}" v-for="(item,index) in date" :key='item.id'>
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view v-if="ifitem" class="item" v-for="(item,index) in urlDate" :key="index">
				<image @click="previewImg(item.pictureUrl)" :src="item.pictureUrl" loop="true"></image>
				<view>{{item.msg}}</view>
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
				ifitem:true,
				urlDate: []
			}
		},
		methods: {
			async getPicsCate() {
				const res = await this.$myRequsest({
					url: '/api/CarouselPicture/NavbarLeft'
				})
				console.log(res)
				this.date = res.data
			},
			async leftClickHandle(index=0, item=1) {
				this.active = index
				this.ifitem=false
				const res = await this.$myRequsest({
					url: '/api/CarouselPicture/NavbarRight',
					data:{
						NavbarLeftId:item
					}
				})
				console.log(res)
				this.urlDate = res.data
				this.ifitem=true
			},
			previewImg(url){
				var urls=this.urlDate.map(item=>item.pictureUrl)
				uni.previewImage({
					current:url,
					urls,
					indicator:'number',
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
