// const BASE_URL = 'http://rap2api.taobao.org/app/mock/274436'
const BASE_URL='https://localhost:44398'
export const myRequsest = (option) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + option.url,
			method: option.method || 'GET',
			data: option.data || {},
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
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}
