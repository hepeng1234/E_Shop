<template>
	<view class="goods_list">
		<view class="goods_item" v-for="(item,index) in goods" :key="index" @click="navigator(index)">
			<image :src="item.url"></image>
			<view class="name">
				{{item.msg}}
			</view>
			<view class="price">
				<text>{{item.price.new_price}}</text>
				<text>{{item.price.old_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['goods'],
		data() {
			return {
			};
		},
		mounted() {
		},
		methods:{
			navigator(id){
				this.$emit('son-fun',id)
			}
		}
	}
</script>

<style lang="scss">
	.goods_list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;

		.goods_item {
			background: #fff;
			width: 355rpx;
			margin: 10rpx 0;
			padding: 15rpx;
			box-sizing: border-box;

			image {
				width: 100%;
				height: 300rpx;
				display: block;
				margin: auto;
			}

			.price {
				color: $shop-color;
				font-size: 36rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
				}
			}
		}

		.name {
			font-size: 28rpx;
			line-height: 1.3;
			padding-top: 10rpx;
			display: -webkit-box; //值必须为-webkit-box或者-webkit-inline-box
			-webkit-box-orient: vertical; //值必须为vertical
			-webkit-line-clamp: 2; //值为数字，表示一共显示几行
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
