<template>
	<view class="cart">
		<checkbox-group @change='checkChange'>
			<view class="info" v-for="(item,index) in data" :key="index">
				<view class="tit">
					京东自营
				</view>
				<view class="info_cen">
					<view class="check">
						<checkbox checked :value="item.id"></checkbox>
					</view>
					<view class="img">
						<image :src="item.src"></image>
					</view>
					<view class="info_right">
						<view class="info_right_top">
							{{item.title}}
						</view>
						<view class="info_right_bottom">
							<view class="info_price">
								￥{{item.price}}
							</view>
							<view class="info_number">
								<view class="info_number_reduce" v-if="!(item.proname==1)" @click="setReduce(item)">-</view>
								<view class="info_number_sel">
									<input v-model="item.proname" />
								</view>
								<view class="info_number_plue" @click="setPlue(item)">+</view>
							</view>
						</view>
					</view>
				</view>
				<view class="info_bottom" @click="getClear">
					删除
				</view>
			</view>
		</checkbox-group>
		<view class="settlement">
			<text>总计：￥{{price}}</text>
			<button size="mini" type="warn" @click="settlement">去结算</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				array: []
			}
		},
		methods: {
			async getCartData() {
				const res = await this.$myRequsest({
					url: '/E_Shop/Cart'
				})
				this.data = res.data.data
				// console.log(this.data)
				this.array = res.data.data.map((e) => {
					return parseInt(e.id)
				})
			},
			setReduce(item) {
				item.proname -= 1
			},
			setPlue(item) {
				item.proname += 1
			},
			getClear() {
				uni.showToast({
					title: '已删除'
				})
			},
			settlement() {
				uni.showToast({
					title: '已成功结算' + this.price + '元'
				})
			},
			checkChange(e) {
				this.array = e.detail.value.map((e) => {
					return parseInt(e)
				})
				console.log(this.array)
			}
		},
		onLoad() {
			this.getCartData()
		},
		created() {},
		computed: {
			price() {
				let price = 0
				let a = []
				a = this.array.map((e) => {
					return this.data[e]
				})
				a.map((value) => {
					price += value.price * value.proname
				})
				return price
			}
		}
	}
</script>

<style lang="scss">
	.cart {
		height: 667rpx;

		.info {
			display: flex;
			flex-direction: column;

			.tit {}

			.info_cen {
				display: flex;
				flex-direction: row;
				height: 200rpx;
				width: 750rpx;

				.check {
					line-height: 200rpx;
				}

				.img {
					flex: 1;
					width: 200px;
					height: 100%;
					box-shadow: 0 0 10px 0 rgba(0, 0, 0, .05);

					image {
						width: 100%;
						height: 100%;
					}
				}

				.info_right {
					flex: 3;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.info_right_top {
						font-size: 25rpx;
					}

					.info_right_bottom {
						display: flex;
						justify-content: space-between;
						padding: 20rpx;

						.info_number {
							display: flex;
							view{
								margin: 0 10rpx;
							}

							.info_number_sel {
								width: 72rpx;
								text-align: center;
							}
						}
					}
				}
			}

			.info_bottom {
				margin-left: 650rpx;
			}
		}

		.settlement {
			background: hsla(0, 0%, 100%, .95);
			// display: flex;
			height: 80rpx;
			position: fixed;
			//#ifdef MP-WEIXIN
			bottom: 1rpx;
			//#endif
			//#ifndef MP-WEIXIN
			bottom: 100rpx;
			//#endif

			text {
				line-height: 80rpx;
				font-size: 35rpx;
				width: 100%;
			}

			button {
				width: 226rpx;
				line-height: 80rpx;
				border-radius: 20px;
				position: fixed;
				right: 0;
			}
		}
	}
</style>
