<template>
	<view>
		<view @click="sonFun(item.id)" class="news_item" v-for="item in news" :key="item.id">
			<image :src="item.url"></image>
			<view class="right">
				<view class="tit">{{item.title}}</view>
				<view class="info">
					<text>发表时间：{{item.time |formatDate}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['news'],
		data() {
			return {

			};
		},
		filters: {
			formatDate(value) {
				value=value.slice(5)
				return value
			}
		},
		methods:{
			sonFun(date){
				this.$emit("son-fun",date)
			}
		}
	}
</script>

<style lang="scss">
	.news_item {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid $shop-color;

		image {
			min-width: 200rpx;
			max-width: 200rpx;
			height: 150rpx;
		}

		.right {
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.tit {
				font-size: 30rpx;
			}

			.info {
				font-size: 24rpx;
			}
		}
	}
</style>
