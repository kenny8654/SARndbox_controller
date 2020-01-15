var info 
var height
function higher(){
  console.log('higher')
	modifyHeight(1)
}


function lower(){
	console.log('lower')	
	modifyHeight(-1)
}

function on(){
  $.ajax({
    url: "/turnOn",
    type: "GET",
		error: function () {
    	console.log("Error in ajax")
		}
	});	
}


function off(){
  $.ajax({
    url: "/turnOff",
    type: "GET",
		error: function (xhr, status, error) {
    	console.log("Error in ajax")
			console.log(error)
		}
	});	
}

$( document ).ready(function() {
	getHeight();
});

function modifyHeight(num){
	
	tmp_height = parseInt(height,10) + num
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
		data:{
			info:info
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

function getHeight(){	
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
