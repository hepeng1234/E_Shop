<template>
	<view class="setting">
		<view class="user">
			<image mode="aspectFill" :src="userSrc"></image>
			<text v-show="!sign">未登录</text>
			<text v-show="sign">{{user}}</text>
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
				<view v-show="sign" @click="signOut">退出登录</view>
				<view v-show="!sign" @click="signIn">登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				userSrc:'../../static/member/user.png',
				sign:false
			}
		},
		methods: {
			signOut() {
				uni.removeStorageSync('UserName');
				uni.removeStorageSync('UserPicture');
				uni.reLaunch({
					url: '/pages/emptyIndex/emptyIndex'
				})
			},
			signIn() {
				uni.redirectTo({
					url: '/pages/signIn/signIn'
				})
			}
		},
		onLoad(e) {
			try {
				let value = uni.getStorageSync('UserName');
				let src = uni.getStorageSync('UserPicture');
				if (value) {
					this.user = value
					this.userSrc=src
					this.sign=!this.sign
				}
			} catch (e) {
				console.log(e)
			}
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
