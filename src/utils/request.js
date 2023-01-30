
const BASE_URL = 'http://118.31.32.48:8080'

export const request = (options) => {
	return new Promise((resolve, reject) => {

		var token = uni.getStorageSync('token') || ""



		console.log("options:", options)
		console.log("token:", token)

		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'POST',
			header: {
				"Authorization": token,
			},
			data: options.data || {},
			success: (res) => {
				const data = res.data

		
				if (data.code == 200) {


				} else if (data.code == 401) {
				
					uni.showToast({
						icon: 'error',
						title: data.message
					})
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/login/login'
						})
					}, 1000); //延迟1000毫米
					return
				} else if (data.code == 435) {
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/login/login'
						})
					}, 1000); //延迟1000毫米
					return
				} else {
					uni.showToast({
						icon: 'error',
						title: data.message
					})
				}

				resolve(data)
			},
			fail: (error) => {
				uni.showToast({
					icon: 'error',
					title: '系统错误'
				})

				reject(error)

			}
		})



	})


}
