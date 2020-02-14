var info, height, modeList
async function higher() {
	console.log('higher')
	document.getElementById("dimmer").className = "ui active dimmer";
	await getHeight()
	await modifyHeight(1)
	await getHeight()
	setTimeout(function () { document.getElementById("dimmer").className = "ui disabled dimmer" }, 4000);
}

async function lower() {
	document.getElementById("dimmer").className = "ui active dimmer";
	console.log('lower')
	await getHeight()
	await modifyHeight(-1)
	await getHeight()
	setTimeout(function () { document.getElementById("dimmer").className = "ui disabled dimmer" }, 4000);
}

function on() {
	document.getElementById("dimmer").className = "ui active dimmer";
	getHeight();
	$.ajax({
		url: "/turnOn",
		type: "GET",
		error: function () {
			console.log("Error in ajax")
		}
	});
	setTimeout(function () { document.getElementById("dimmer").className = "ui disabled dimmer" }, 4000);
}

function off() {
	document.getElementById("dimmer").className = "ui active dimmer";
	$.ajax({
		url: "/turnOff",
		type: "GET",
		error: function (xhr, status, error) {
			console.log("Error in ajax")
			console.log(error)
		}
	});
	setTimeout(function () { document.getElementById("dimmer").className = "ui disabled dimmer" }, 2000);
}


function shutdown() {
	document.getElementById("dimmer").className = "ui active dimmer";
	$.ajax({
		url: "/shutDown",
		type: "GET",
		error: function (xhr, status, error) {
			console.log("Error in ajax")
			console.log(error)
		}
	});
	setTimeout(function () { document.getElementById("dimmer").className = "ui disabled dimmer" }, 2000);
}

function reboot() {
	document.getElementById("dimmer").className = "ui active dimmer";
	$.ajax({
		url: "/reboot",
		type: "GET",
		error: function (xhr, status, error) {
			console.log("Error in ajax")
			console.log(error)
		}
	});
	setTimeout(function () { document.getElementById("dimmer").className = "ui disabled dimmer" }, 2000);
}

function mode1() {
	modifyMode(1);
}

function mode2() {
	modifyMode(2);
}

function mode3() {
	modifyMode(3);
}

function mode4() {
	modifyMode(4);
}

function mode5() {
	modifyMode(5);
}

$(document).ready(function () {
	getHeight();
	getModeName();
});

function modifyHeight(num) {
	tmp_height = parseInt(height, 10) + num
	info = info.split(',')
	tmp = info[3].split("(")
	tmp[0] = tmp_height.toString() + '\n'
	tmp = tmp.join('(')
	info[3] = tmp
	info = info.join(',')
	console.log('after' + info)
	$.ajax({
		url: "/modifyHeight",
		type: "POST",
		data: {
			info: info
		},
		success: function (txt) {
			console.log(txt);
			getHeight()
		},
		error: function (xhr, status, error) {
			console.log("Error in ajax")
			console.log(error)
		}
	});
}

function getHeight() {
	$.ajax({
		url: "/getHeight",
		type: "GET",
		success: function (txt) {
			info = txt
			height = txt.split(",")[3].split("(")[0]
			document.getElementById("height_info").innerHTML = "目前高度 : " + height
			console.log(height)
		},
		error: function () {
			console.log("Error in ajax")
		}
	});
}

function getModeName() {
	$.ajax({
		url: "/getModeName",
		type: "GET",
		success: function (txt) {
			modeList = txt.split(",")
			for (var i = 1; i < 6; i++) {
				document.getElementById("mode" + i.toString()).innerHTML = modeList[i - 1]
			}
		},
		error: function () {
			console.log("Error in ajax")
		}
	});
}

function modifyMode(mode) {
	document.getElementById("dimmer").className = "ui active dimmer";
	console.log('modifyMode : ' + mode)
	$.ajax({
		url: "/modifyMode",
		type: "POST",
		data: {
			mode: mode
		},
		success: function (txt) {
			console.log(txt);
			document.getElementById("mode_info").innerHTML = "目前模式 : " + modeList[mode - 1]
		},
		error: function (xhr, status, error) {
			console.log("Error in ajax")
			console.log(error)
		}
	});
	setTimeout(function () { document.getElementById("dimmer").className = "ui disabled dimmer" }, 4000);
}
