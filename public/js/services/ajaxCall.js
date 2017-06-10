function ajaxCall (url, requestType, data = '', sync = true) {
	
	return new Promise((resolve, reject) => {
		let http = new XMLHttpRequest()
		http.open(requestType, url, sync);
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http.onload = function () {
			if(http.status == 200) {
				resolve(http.response); 
			} else {
				reject(new Error(http.statusText));
			}
		}

		http.onerror = function () {
			reject(new Error("Network Error"));
		}

		http.send(JSON.stringify(data));
	})

}