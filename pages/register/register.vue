<template>
	<view class="register">
		<view>注册</view>
		<input placeholder="请输入昵称" type="text" v-model="UserName">
		<input placeholder="请输入账号" type="text" v-model="Account">
		<input placeholder="请输入密码" type="text" password v-model="Pwd">
		<input placeholder="请确认密码" type="text" password v-model="Pwds">
		<view class="button">
			<button @click="determine">确定</button>
			<button @click="cancel">取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				UserName: '',
				Account: '',
				Pwd: '',
				Pwds: ''
			}
		},
		methods: {
			async determine() {
				if (this.UserName || this.Account || this.Pwd || this.Pwds) {
					var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
					var reg1 = /\s/;
					if (reg.test(this.Account) || reg1.test(this.Account)) {
						uni.showToast({
							title: "有汉字或空格"
						})
					} else {
						if (this.Pwd == this.Pwds) {
							let res = await this.$myRequsest({
								url: '/api/CarouselPicture/Register',
								method: "post",
								header: {
									'Content-type': 'application/x-www-form-urlencoded',
								},
								data: {
									UserName: this.UserName,
									Account: this.Account,
									Pwd: this.Pwd
								}
							})
							if (res.data == 0) {
								uni.showToast({
									title: "该账户已注册"
								})
							} else {
								uni.showToast({
									title: "注册成功"
								})
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/signIn/signIn'
									})
								}, 1000)

							}
						} else
							uni.showToast({
								title: "两次密码输入不同"
							})
					}
				} else {
					uni.showToast({
						title: "不能为空"
					})
				}
			},
			cancel() {
				uni.reLaunch({
					url: '/pages/signIn/signIn'
				})
			}
		}
	}
</script>

<style lang="scss">
	.register {
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
