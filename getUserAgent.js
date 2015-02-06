var http = require("http");
var fs = require("fs");
var headers = 'Date, User Agent\n';

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
  
}).listen(8888);

server.on('request', function(request, response){
	var userAgent = request.headers['user-agent'];
	userAgent = userAgent.replace(',',';');
	var date = new Date();
	var data = date + ',' + userAgent + '\n';
	if(request.url == '/'){
		createFile('userAgentData.csv', headers);
		appendToFile('userAgentData.csv', data);
		response.end();
	}
	
});

function createFile(filename, headers){
	fs.writeFile(filename, headers, function(err){
		if(err){
			throw err;
		}else{
			console.log("The file has been created with your chosen headers.");
		}
	});
}

function appendToFile(filename, data){
	fs.appendFile(filename, data, function(err){
		if(err){
			throw err;
		}else{
			console.log("The user agent data was appended to the csv file.");
		}
	});
}
