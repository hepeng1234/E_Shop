<template>
	<view class="member">
		<view class="user">
			<image mode="aspectFill" src="https://tva2.sinaimg.cn/large/0072Vf1pgy1fodqowkp8sj31fy10hhdt.jpg"></image>
			<text>用户123</text>
		</view>
		<view @click="scanning" class="scanningImg">
			<image mode="aspectFit" src="../../static/member/scanning.png"></image>
		</view>
		<view class="center">
			<view class="center_icon">
				<image src="../../static/member/payment.png"></image>
				<text>待付款</text>
			</view>
			<view class="center_icon">
				<image src="../../static/member/received.png"></image>
				<text>待收货</text>
			</view>
			<view class="center_icon">
				<image src="../../static/member/evaluated.png"></image>
				<text>待评价</text>
			</view>
		</view>
		<view class="buttom">
			<view class="setting" @click="setting">
				<view>设置</view>
				<image src="../../static/member/arrow.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			setting() {
				console.log("设置")
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			},
			scanning() {
				console.log("扫码")
				uni.scanCode({
					scanType: ['qrCode'],
					success: (res) => {
						uni.showToast({title:res.scanType})
						uni.showToast({title:res.result})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.member {
		.user {
			height: 300rpx;
			display: flex;
			align-items: center;
			margin: 0 20rpx;
			border-bottom: 2px #eee solid;

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}

			text {
				font-size: 40rpx;
				margin-left: 40rpx;
			}
		}

		.scanningImg {
			width: 80rpx;
			height: 80rpx;
			position: absolute;
			top: 0;
			right: 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.center {
			height: 200rpx;
			display: flex;
			justify-content: space-evenly;
			border-bottom: 1px solid #eee;
			align-items: center;

			.center_icon {
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.buttom {

			border-bottom: 1px solid #eee;
			border-top: 1px solid #eee;
			margin-top: 100rpx;

			.setting {
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;

				view {
					font-size: 36rpx;
				}

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>
