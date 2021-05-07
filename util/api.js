// const BASE_URL = 'http://rap2api.taobao.org/app/mock/274436'
const BASE_URL='https://localhost:44398'
export const myRequsest = (option) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + option.url,
			method: option.method || 'GET',
			data: option.data || {},
			header:option.header||{},
			// dataType:"json",
			success: (res) => {
				if (res.statusCode != 200) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求失败，请检查网络'
				})
				reject(err)
			}
		})
	})
}
