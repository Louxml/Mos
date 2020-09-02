let Mos = {
	app:[],
	appBox:[],
	Onload:function(){
		let that = this;
		this.Ajax("cmd=appList",function(e){
			this.app = e;
			let box = $("#appList");
			for(let i in e){
				this.app[i].open = 0;
				box.append(this.Temp.appicon(i,e[i].app,e[i].width,e[i].height,e[i].icon,e[i].name));
			}
		}.bind(this));
	},
	Ajax:function(data,fn){
		let xhr=new XMLHttpRequest();
		xhr.open('POST',"php/index.php",true);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.onreadystatechange=function(){
			if (xhr.readyState==4){
				if (xhr.status==200 || xhr.status==304){
					fn(JSON.parse(xhr.responseText));
				}
			}
		}
		xhr.send(data);
	},
	Temp:{
		appicon:function(i,src,w,h,icon,name){
			return "<div class='appIcon' onclick='Mos.open("+i+",\""+src+"\",\""+w+"\",\""+h+"\")'><img src='"+icon+"'><span>"+name+"</span></div>";
		},
		appbox:function(i,j,src,w,h,name){
			return "<div class='app' style='width:"+w+"px;height:"+h+"px;top:"+((window.innerHeight-h)/2|0)+"px;left:"+((window.innerWidth-w)/2|0)+"px;'><div class='header'><div class='left' onclick='Mos.min("+j+")'></div><div class='right' onclick='Mos.close("+i+","+j+")'></div><span class='title'>"+name+"</span></div><iframe src='"+src+"'></iframe><div class='footer'></div></div>";
		}
	},
	Input:{
		DragTarget:{
			target:null,
			x:0,y:0
		},
		onLoad:function(){
			$(document).mousedown(function(e){
				if($(e.target).hasClass("title")){
					this.DragTarget = {
						target:e.target.parentNode.parentNode,
						x:e.clientX-e.target.parentNode.parentNode.offsetLeft,y:e.clientY-e.target.parentNode.parentNode.offsetTop
					}
					$(e.target).parent().parent().addClass("drag");
				}
			}.bind(this));
			$(document).mousemove(function(e){
				if(this.DragTarget.target != null){
					let target = this.DragTarget.target;
					let x = e.clientX - this.DragTarget.x;
					let y = e.clientY - this.DragTarget.y;
					target.style.left = x + "px";
					target.style.top = y + "px";
				}
			}.bind(this));
			$(document).mouseup(function(e){
				if(this.DragTarget.target != null){
					$(this.DragTarget.target).removeClass("drag");
					this.DragTarget = {
						target:null,
						x:0,y:0
					};
				}
			}.bind(this));
		}
	},
	open:function(i,src,w=500,h=500){
		let app = this.app[i];
		if(!app.only || app.open == 0){
			app.open++;
			let box = $(this.Temp.appbox(i,this.appBox.length,src,w,h,app.name));
			box.mousedown(function(e){
				this.active(e.currentTarget);
			}.bind(this));
			this.appBox[this.appBox.length] = {target:box[0],width:w,height:h,isMin:false};
			this.active(box[0]);
			$("#deskTop").append(box);
		}
	},
	close:function(i,j){
		let app = this.app[i];
		app.open--;
		app = this.appBox[j].target;
		$(app).remove();
		this.appBox.splice(j,1);
	},
	min:function(j){
		let app = this.appBox[j];
		if(!app.isMin){
			$(app.target).addClass("min");
			$(app.target).css("height","0px");
		}else{
			$(app.target).removeClass("min");
			$(app.target).css("height",app.height+"px");
		}
		app.isMin = !app.isMin;
	},
	active:function(div){
		$("#deskTop .app.active").removeClass("active");
		$(div).addClass("active");
	}
};
Mos.Onload();
window.onload = function(e){
	Mos.Input.onLoad();
}