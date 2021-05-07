<template>
	<view class="news">
		<news-item :news="data" @son-fun="goDetail"></news-item>
	</view>
</template>

<script>
	import newsItem from '../../components/news_item.vue'
	export default {
		data() {
			return {
				data: {}
			}
		},
		methods: {
			async newsDate() {
				const res = await this.$myRequsest({
					url: "/api/CarouselPicture/New"
				})
				console.log(res.data)
				this.data = res.data
			},
			goDetail(data){
				var url='/pages/news_detail/news_detail?id='+data
				uni.navigateTo({
					url
				})
			}
		},
		onLoad() {
			this.newsDate()
		},
		components: {
			'news-item': newsItem
		}
	}
</script>

<style lang="scss">

</style>
