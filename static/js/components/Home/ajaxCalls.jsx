const { dispatch } = require('../../reducers/reducers.js')

var ajaxCalls = {}

ajaxCalls.getSongCount = (successFunc) => {
	$.ajax({
		type: "GET",
		url: "/api/songs/",
		success: (response) => {
			console.log(response)
			successFunc(response)
		},
		error: (e) => {
			console.log(error)
		}
	})
	
}

module.exports = ajaxCalls