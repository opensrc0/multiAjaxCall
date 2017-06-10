let clear, i;

function timer () {
	i = 0;
	document.querySelector("#timer").innerHTML = 'Please wait... We are fetching the Data | Time :- ' + i + ' sec';
	clear = setInterval(() => {
		document.querySelector("#timer").innerHTML = 'Please wait... We are fetching the Data | Time :- ' + ++i + ' sec';
	}, 1000)
}

timer();

ajaxCall('multiCall', 'GET').then((response) => {
	document.querySelector("#container").innerHTML = response;
	clearInterval(clear);
	document.querySelector("#timer").innerHTML = 'You got data in ' + i + ' sec';
});

