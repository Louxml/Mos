let express = require("express")
let app = express()
let path = require("path")
let fs = require("fs");
const { config } = require("process");
var http = require('http').createServer(app);

app.use(express.json())
app.use('/public',express.static('public'));
// app.all("*", function(req, res, next){
//     res.header("Access-Control-Allow-Origin","*");    //允许的header类型
//     res.header("Access-Control-Allow-Headers","content-type");    //跨域允许的请求方式 
//     res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
//     if (req.method.toLowerCase() == 'options')
//         res.sendStatus(200);  //让options尝试请求快速结束
//     else
//         next();
// })

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/appList", function(req, res){
    let pathName = "./public/app"
    let result = []
    fs.readdir(pathName, function(err, files){
        for(let f of files){
            let confPath = pathName + "/" + f + "/config.json";
            let appPath = pathName + "/" + f + "/index.html"
            if(fs.existsSync(appPath)){
                if(fs.existsSync(confPath)){
                    let config = JSON.parse(fs.readFileSync(confPath).toString())
                    result.push({
                        name: config["name"],
                        icon: "./public/app/" + f + "/" + config["icon"],
                        app: "./public/app/" + f + "/index.html",
                        width: config["width"],
                        height: config["height"],
                        only: config["only"]
                    })
                }else{
                    result.push({
                        name: "应用",
                        icon: "./public/app/src/app.svg",
                        app: "./public/" + f + "/index.html",
                        width :500,
                        height: 500,
                        only: true
                    })
                }
            }
        }
        res.send(JSON.stringify(result))
    })
})


// 聊天室服务
var io = require("socket.io")(http);
let chat = io.of('/Chat2');

let userList = {
	length:0
};

chat.on('connection',(socket) => {
	userConnect(socket.id);
	chat.emit('online',userList.length);
	socket.on("disconnect",() => {
		userDisconnect(socket.id);
		chat.emit('online',userList.length);
	});
	socket.on('name',(data) => {
		if(checkName(data)){
			userList[socket.id] = data;
			socket.emit("name",{r:true,data:data});
		}else{
			socket.emit("name",{r:false,data:userList});
		}
	});
	socket.on('message',(data) => {
		chat.emit('message',{name:userList[socket.id],data:data});
	});
});

function userConnect(id){
	userList[id] = id;
	userList["length"]++;
}
function userDisconnect(id){
	if(userList[id]){
		userList["length"]--;
		delete userList[id];
	}else{
		console.log("用户不存在");
	}
}
function checkName(name){
	for(let i in userList){
		if(userList[i] == name)return false;
	}
	return true;
}

let server = http.listen(6080, function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("开启服务 http:://%s:%s", host, port)
})