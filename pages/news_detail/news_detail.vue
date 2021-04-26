<template>
	<view class="news_detail">
		<text class="title">{{data.news1.title}}</text>
		<view class="info">
			<text v-if="data.news1.time">
				发表时间：{{data.news1.time |formatDate}}
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
				data:{
					content:"",
					news1:{
						title:"数据加载中，请稍等",
						time:""
					}
				}
			}
		},
		methods: {
			async getNewsDetail(id){
				const res=await this.$myRequsest({
					url:'/api/CarouselPicture/GetNewDetail',
					data:{
						id
					}
				})
				this.data=res.data
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
