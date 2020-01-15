const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')
const spawn = require('child_process').spawn;

const url = "/home/user/src/SARndbox-2.3/etc/SARndbox-2.3/BoxLayout.txt"
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(__dirname + '/public'));
app.listen(8080, function () {
	console.log('app is running on port 8080!');}
);

app.get('/', function (req, res) {
	res.sendFile('./index.html',{ root: __dirname });
});

app.get('/getHeight',function(req,res){
  var data = fs.readFileSync(url,'utf8');  
  console.log(data)
	return res.end(data)
});

app.post('/modifyHeight',function(req,res){
	console.log('info : '+req.body.info)
	fs.writeFile(url, req.body.info , function (err) {
    if(err)
        console.log(err);
    else
        console.log('Write operation complete.');
	});

	runcmd()
	return res.sendStatus(200)
});

app.get('/turnOn',function(req,res){
	console.log('on')
	cmd('../SARndbox',['-uhm'])
	return res.sendStatus(200)
});

app.get('/turnOff',function(req,res){
	console.log('off')
  cmd('killall',['SARndbox'])
});


async function runcmd(){
	await cmd('killall',['SARndbox'])
  await cmd('../SARndbox',['-uhm'])
	
}

function cmd(c,p){
		
	var ls_var = spawn(c, p);
	ls_var.stdout.on('data', function(data){
  	console.log('stdout: ' + data);
	});

	// 監聽 error 事件：
	ls_var.on('error', function(code){
  	console.log('error with code ' + code);
	});

	// 監聽 close 事件：
	ls_var.on('close', function(code){
  	console.log('closed with code ' + code);
	});

	// 監聽 exit 事件：
	ls_var.on('exit', function(code){
  	console.log('exited with code ' + code);
	});
}
