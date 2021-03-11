<template>
	<view class="setting">
		<view class="user">
			<image mode="aspectFill" src="https://tva2.sinaimg.cn/large/0072Vf1pgy1fodqowkp8sj31fy10hhdt.jpg"></image>
			<text>用户123</text>
		</view>
		<view class="set">
			<view class="set_row">
				<view>地址管理</view>
				<image src="../../static/member/arrow.png"></image>
			</view>
			<view class="set_row">
				<view>账号与安全</view>
				<image src="../../static/member/arrow.png"></image>
			</view>
			<view class="set_row">
				<view>设置字体大小</view>
				<image src="../../static/member/arrow.png"></image>
			</view>
			<view class="set_row">
				<view>支付设置</view>
				<image src="../../static/member/arrow.png"></image>
			</view>
			<view class="signIn">
				<view>退出登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.setting {
		background-color: #eee;

		.user {
			background-color: #fff;
			height: 150rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			margin-bottom: 1px;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			text {
				font-size: 35rpx;
				margin-left: 40rpx;
			}
		}

		.set_row {
			background-color: #fff;
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			margin-bottom: 1px;

			view {
				font-size: 36rpx;
			}

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.signIn {
			background-color: #fff;
			color: $shop-color;
			text-align: center;
			padding: 20rpx 0;
			border-bottom: 1px #eee solid;
		}
	}
</style>
