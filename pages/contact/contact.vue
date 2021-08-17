<template>
	<view class="contact">
		<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：123-456-7891(点击拨打)</view>
			<view>地址：{{address}}</view>
		</view>
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers" :scale="scale"></map>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				longitude: 116.397128,
				latitude: 39.916527,
				scale: 15,
				address: '',
				markers: []
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '123-456-7891'
				})
			}
		},
		onLoad() {
			uni.getLocation({
				type: 'wgs84',
				geocode: 'true',
				success: (res) => {
					if (res.address) {
						this.address = res.address.province + res.address.city + res.address.district
					} else {
						uni.request({
							url: 'https://restapi.amap.com/v3/ip?key=5993732db87ed6c48dd3606712410416',//高德ip定位api
							// url:`http://apis.map.qq.com/ws/geocoder/v1`,
							method:'get',
							// data:{
							// 	location:`${res.latitude},${res.longitude}`,
							// 	key:'BMSBZ-Q24WX-IBF4E-T4PIY-KSXQZ-V2FFQ',
							// },
							success: res => {
								console.log(res)
								this.address = res.data.city
							},
							fail: err => {
								console.log(err);
							}
						});
					}
					this.longitude = res.longitude
					this.latitude = res.latitude
					this.markers = []
					this.markers.push({
						longitude: res.longitude,
						latitude: res.latitude,
						iconPath: '../../static/tabber/home(1).png',
						width: 30,
						height: 30
					})
				}
			});

		},
		created() {

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

		.map {
			width: 750rpx;
			height: 735rpx;
		}
	}
</style>
