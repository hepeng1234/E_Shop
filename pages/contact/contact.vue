<template>
	<view class="contact">
		<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：123-456-7891(点击拨打)</view>
			<view>地址：重庆市璧山区</view>
		</view>
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers" :scale="scale"></map>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				longitude:116.397128,
				latitude:39.916527,
				scale:15,
				markers:[]
			}
		},
		methods: {
			phone(){
				uni.makePhoneCall({
					phoneNumber:'123-456-7891'
				})
			}
		},
		onLoad() {
			uni.getLocation({
			    type: 'wgs84',
			    success:  (res)=> {
					this.longitude=res.longitude
					this.latitude=res.latitude
					this.markers=[]
					this.markers.push({
						longitude:res.longitude,
						latitude:res.latitude,
						iconPath:'../../static/tabber/home(1).png',
						width:30,
						height:30
					})
			    }
			});
		},
		created(){
			
		}
	}
</script>

<style lang="scss">
	.contact {
		image {
			width: 750rpx;
			height: 320rpx;
		}

		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;

			view {
				line-height: 80rpx;
				border-bottom: 1px solid #eee;
			}
		}
		.map{
			width: 750rpx;
			height: 735rpx;
		}
	}
</style>
