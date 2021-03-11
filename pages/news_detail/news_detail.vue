<template>
	<view class="news_detail">
		<text class="title">{{data.title}}</text>
		<view class="info">
			<text v-if="data.time">
				发表时间：{{data.time |formatDate}}
			</text>
		</view>
		<view class="content">
			<rich-text :nodes="data.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{}
			}
		},
		methods: {
			async getNewsDetail(id){
				const res=await this.$myRequsest({
					url:'/E_Shop/details_page/'+id
				})
				this.data=res.data.data[0]
				console.log(this.data)
			}
		},
		onLoad(options) {
			this.getNewsDetail(options.id)
		}
	}
</script>

<style lang="scss">
.news_detail{
	font-size: 30rpx;
	padding: 0 20rpx;
	.title{
		text-align: center;
		display: block;
		padding: 20rpx 0;
	}
}
</style>
