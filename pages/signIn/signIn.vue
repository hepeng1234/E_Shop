<template>
	<view class="signIn">
		<view>登录</view>
		<input placeholder="请输入账号" type="text" v-model="Account">
		<input placeholder="请输入密码" type="text" password="true" v-model="Pwd">
		<view class="button">
			<button @click="signIn">确定</button>
			<button @click="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Account: "",
				Pwd: ""
			}
		},
		methods: {
			register(){
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			async signIn() {
				if (!this.Account || !this.Pwd) {
					uni.showToast({
						title: "请输入账号密码"
					})
				} else {
					let res = await this.$myRequsest({
						url: '/api/CarouselPicture/SignIn',
						method: "post",
						header: {
							'Content-type': 'application/x-www-form-urlencoded',
						},
						data: {
							Account: this.Account,
							Pwd: this.Pwd
						}
					})
					if (res.data.code == 0) {
						uni.showToast({
							title: "账号或密码错误"
						})
					} else if (res.data.code == 1) {
						uni.showToast({
							title: "登录成功"
						})
						console.log(res)
						try {
						    uni.setStorageSync('UserName', res.data.userName);
						    uni.setStorageSync('UserPicture', res.data.userPicture);
							uni.reLaunch({
								url:'/pages/member/member'
							})
						} catch (e) {
						    console.log(e)
						}
						
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.signIn {
		font-size: 40rpx;
		height: 200rpx;
		padding-top: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		view {
			margin-bottom: 10rpx;
		}

		input {
			margin-bottom: 10rpx;
			text-align: left;
			border: 1px #000 solid;
		}

		.button {
			display: flex;
		}
	}
</style>
