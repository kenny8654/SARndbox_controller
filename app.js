const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')
const spawn = require('child_process').spawn;
const robot = require("robotjs");

const url = "/home/user/src/SARndbox-2.7/etc/SARndbox-2.7/BoxLayout.txt"
var m = main()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(__dirname + '/public'));
app.use('/semantic', express.static(__dirname + '/semantic'));
app.use('/node_modules/jquery/dist', express.static(__dirname + '/node_modules/jquery/dist'));
app.listen(8080, function () {
	console.log('app is running on port 8080!');
}
);

app.get('/', function (req, res) {
	res.sendFile('./index.html', { root: __dirname });
});

app.get('/getHeight', function (req, res) {
	var data = fs.readFileSync(url, 'utf8');
	console.log(data)
	return res.end(data)
});

app.post('/modifyHeight', function (req, res) {
	console.log('modify height');
	console.log('info : ' + req.body.info)
	fs.writeFile(url, req.body.info, function (err) {
		if (err)
			console.log(err);
		else {
			console.log('Write operation complete.');
			//runcmd()
			turnOn()
		}
	});

	return res.sendStatus(200)
});

app.get('/turnOn', function (req, res) {
	console.log('on')
	turnOn()
	return res.sendStatus(200)
});

app.get('/turnOff', function (req, res) {
	console.log('off')
	cmd('killall', ['SARndbox'])
	cmd('killall', ['-9', 'SARndbox'])
});


app.get('/shutDown', function (req, res) {
	console.log('off')
	cmd('shutdown', ['-h', 'now'])
});


app.get('/reboot', function (req, res) {
	console.log('systemctl', ['reboot'])
	cmd('reboot', [''])
});

app.get('/getModeName', function (req, res) {
	var modeNameUrl = "/home/user/src/SARndbox-2.7/etc/SARndbox-2.7/ColorMapMode/map.txt"
	var data = fs.readFileSync(modeNameUrl, 'utf8');
	console.log(data)
	return res.end(data)
});

app.post('/modifyMode', function (req, res) {
	console.log("modifyMode : " + req.body.mode)
	var modeUrl = "/home/user/src/SARndbox-2.7/etc/SARndbox-2.7/ColorMapMode/HeightColorMap" + req.body.mode + ".cpt"
	var mode = "/home/user/src/SARndbox-2.7/etc/SARndbox-2.7/HeightColorMap.cpt"
	cmd('cp', [modeUrl, mode]).then(turnOn())
	//turnOn();
	return res.sendStatus(200)
});

async function turnOn() {
	//await cmd('killall',['SARndbox'])
	//await cmd('killall',['KinectUtil'])
	await cmd('killall', ['-9', '-w', 'SARndbox'])
	//await cmd('killall',['-9','SARndbox'])
	//await cmd('killall',['SARndbox'])
	//await cmd('KinectUtil',['reset','all'])
	//await cmd('../SARndbox',['-uhm'])
	await setTimeout(function () { cmd('killall', ['SARndbox']); }, 300);
	await setTimeout(function () { cmd('killall', ['../SARndbox']); }, 500);
	await setTimeout(function () { cmd('KinectUtil', ['reset', 'all']); }, 800);
	await setTimeout(function () { cmd('KinectUtil', ['reset', 'all']); }, 1300);
	await setTimeout(function () { cmd('/home/user/src/SARndbox-2.7/bin/SARndbox', ['-uhm']); }, 2000);
	await setTimeout(function () { robot.keyTap("f11"); }, 4000);

}

async function runcmd() {
	//await cmd('killall',['SARndbox'])
	//await cmd('killall',['KinectUtil'])
	await cmd('killall', ['-9', '-w', 'SARndbox'])
	//await cmd('killall',['-9','SARndbox'])	
	//await cmd('killall',['SARndbox'])
	await cmd('KinectUtil', ['reset', 'all'])
	await cmd('/home/user/src/SARndbox-2.7/bin/SARndbox', ['-uhm'])
	await setTimeout(function () { robot.keyTap("f11"); }, 2000);
}

async function cmd(c, p) {
	console.log('cmd runnung : ' + c + p)
	var ls_var = spawn(c, p);
	await ls_var.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
		return 0
	});

	ls_var.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
		return 0
	});

	// 監聽 error 事件：
	ls_var.on('error', function (code) {
		console.log('error with code ' + code);
	});

	// 監聽 close 事件：
	ls_var.on('close', function (code) {
		console.log('closed with code ' + code);

	});

	// 監聽 exit 事件：
	ls_var.on('exit', function (code) {
		console.log('exited with code ' + code);
	});
}

function main() {
	//turnOn();
}
